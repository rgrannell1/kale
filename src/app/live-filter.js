#!/usr/bin/env node

const fs = require('fs')
const tty = require('tty')
const through = require('through');
const split = require('split');

const highlightInput = require('./highlight-input')
const CircularBuffer = require('../commons/circular-buffer')
const ProcessState = require('../commons/process-state')
const KeyStroke = require('../commons/keystroke')

const onKeystroke = (proc, input) => {
  proc.screen.clear()
  proc.input(new KeyStroke(input))

  highlightInput(proc.args(), onLine => {
    proc.lines().forEach(line => {
      onLine(line)
    })
  })
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

  ttyIn.setRawMode(true)
  ttyIn.on('data', onKeystroke.bind(null, proc))
}

const opts = {
  maxCapacity: 10
}

main(opts).catch(err => {
  console.error(err)
  process.exit(1)
})
