#!/usr/bin/env node

const fs = require('fs')
const tty = require('tty')
const through = require('through');
const split = require('split');
const CircularBuffer = require('../commons/circular-buffer')

const onInput = (lines, data) => {
  console.log('\033[2J')
  console.log('\033[H')

  console.log(lines.values().join('\n'))
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
  ttyIn.on('data', onInput.bind(null, lines))
}

const opts = {
  maxCapacity: 10
}

main(opts).catch(err => {
  console.error(err)
  process.exit(1)
})
