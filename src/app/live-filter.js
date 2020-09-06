#!/usr/bin/env node

const fs = require('fs')
const tty = require('tty')
const through = require('through');
const split = require('split');

const highlightInput = require('./highlight-input')
const CircularBuffer = require('../commons/circular-buffer');
const KeyStroke = require('../commons/keystroke');
const { fn } = require('moment');

const args = {
  invert: false,
  displayWholeLine: false,
  display: true,
  patterns: ['a']
}

const clearTerminal = () => {
  console.log('\033[2J')
  console.log('\033[H')
}

// -- note: what if ctrl + c is rebound?
const handleInterrupts = event => {
  // -- CTRL-C: proxy sigint
  if (event.isCtrlC()) {
    process.kill(process.pid, 'SIGINT')
  }

  // -- CTRL-Z: proxy sigtstp
  if (event.isCtrlZ()) {
    process.kill(process.pid, 'SIGTSTP')
  }

}

const onKeystroke = (lines, input) => {
  clearTerminal()
  const event = new KeyStroke(input)

  handleInterrupts(event)

  // -- interpret keystroke

  highlightInput(args, onLine => {
    lines.values().forEach(line => onLine(line))
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

  ttyIn.setRawMode(true)
  ttyIn.on('data', onKeystroke.bind(null, lines))
}

const opts = {
  maxCapacity: 10
}

main(opts).catch(err => {
  console.error(err)
  process.exit(1)
})
