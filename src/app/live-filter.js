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

const displayKale = proc => {
  const args = proc.args()
  const patterns = patternUtils.getPatterns(args)

  const bounds = proc.bounds()
  const logLines = proc.screen.logLines()

  const boundsTop = bounds.top
  const boundsBottom = bounds.top + logLines


  const selection = proc.lines()
    .slice(boundsTop, boundsBottom)

  const columns = process.stdout.columns

  // todo select

  const maxLineLength = selection.reduce((max, curr) => {
    return Math.max(max, curr.length)
  }, 0)

  // -- avoid streaming to avoid flickering,
  let message = ''

  for (const line of selection) {
    const formatted = printLine(patterns, line, {
      invert: args.invert,
      displayWholeLine: args.displayWholeLine
    })

    // -- TODO avoid chopping ANSI highlights.

    // -- trim to fit in the tty window.
    const displayed = formatted.slice(bounds.left, bounds.right)
    message += `${displayed}\n`
  }

  const fd = fs.openSync('/dev/tty', 'r+')
  const ttyOut = tty.WriteStream(fd, { })

  ttyOut.write(message + '\n')

  proc.screen.footer()
}

const onKeystroke = (proc, _, input, x, y) => {
  proc.screen.clear()
  proc.input(new KeyStroke(input))

  displayKale(proc)
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
  const proc = new ProcessState(lines, {
    in: ttyIn,
    out: ttyOut
  })

  displayKale(proc)

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
