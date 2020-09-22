
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

  const state = {
    cursor: {
      position: 10
    },
    selection: {
      count: 10,
      total: 100
    },
    mode: 'Default',
    command: 'my string'
  }

  const {
    cursor,
    selection,
    mode,
    command
  } = state

  render(<Kale cursor={cursor} selection={selection} mode={mode} command={command}/>)
}

main()
