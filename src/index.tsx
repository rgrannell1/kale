
import React from 'react'
import ink from 'ink'
import readline from 'readline'

import * as tty from 'tty'
import * as fs from 'fs'

import { Kale } from './commons/kale.js'

const {
  render
} = ink

const main = () => {
  const fd = fs.openSync('/dev/tty', 'r+')
  const ttyIn = new tty.ReadStream(fd, { })

  readline.emitKeypressEvents(ttyIn)

  render(<Kale/>)
}

main()
