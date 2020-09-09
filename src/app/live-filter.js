#!/usr/bin/env node

const fs = require('fs')
const tty = require('tty')
const through = require('through');
const split = require('split');
const patternUtils = require('./patterns')

const {
  highlightInput,
  printLine
} = require('./highlight-input')
const CircularBuffer = require('../commons/circular-buffer')
const ProcessState = require('../commons/process-state')
const KeyStroke = require('../commons/keystroke');
const chalk = require('chalk');

const onKeystroke = (proc, _, input) => {
  proc.screen.clear()
  proc.input(new KeyStroke(input))

  const args = proc.args()
  const patterns = patternUtils.getPatterns(args)

  // --TODO push into screen or process
  proc.lines()
    .slice(-proc.screen.logLines())
    .forEach(line => {
      const formatted = printLine(patterns, line, {
        invert: args.invert,
        displayWholeLine: args.displayWholeLine
      })

      console.log(formatted)
    })

  const footer = [
    chalk.inverse('Ctrl + C') + ' exit'
  ]

  console.log(footer.join(' '))
}

const readStdin = opts => {
  const lines = new CircularBuffer(opts.maxCapacity)

  process.stdin
    .pipe(split())
    .pipe(through(line => lines.add(line)))

  return lines
}

const main = async opts => {
  const fd = fs.openSync('/dev/tty', 'r+')
  const ttyIn = tty.ReadStream(fd, { })
  const ttyOut = tty.WriteStream(fd, { })

  const lines = readStdin(opts)
  const proc = new ProcessState(lines)
  proc.screen.showUsagePrompt()

  ttyIn.setRawMode(true)
  ttyIn.on('data', onKeystroke.bind(null, proc, opts))
}

const opts = {
  maxCapacity: 1000
}

main(opts).catch(err => {
  console.error(err)
  process.exit(1)
})
