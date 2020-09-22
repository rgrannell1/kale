
import React from 'react'
import readline from 'readline'

import * as tty from 'tty'
import * as fs from 'fs'
import split from 'split'
import through from 'through'

import { Header } from '../components/Header.js'
import { Footer } from '../components/Footer.js'
import { Body } from '../components/Body.js'

import CircularBuffer from './circular-buffer.js'

import mappings from './keypress.js'
import {
  KaleProps
} from '../commons/types'

import ink from 'ink'
const { Newline } = ink

const lineMatchesPattern = (pattern:string, line:string):Boolean => {
  return line.includes(pattern)
}

export class Kale extends React.Component<{}, any> {
  constructor (props:KaleProps) {
    super(props)

    const fd = fs.openSync('/dev/tty', 'r+')
    const ttyIn = new tty.ReadStream(fd, { })
    const lines = new CircularBuffer(20_000)

    this.state = {
      screen: {
        rows: process.stdout.rows,
        columns: process.stdout.columns
      },
      cursor: {
        position: 0
      },
      selection: {
        count: 0,
        total: 0
      },
      patterns: {
        search: '',
        highlight: ''
      },
      mode: 'Default',
      command: '',
      ttyIn,
      lines,
      displayLines: []
    }
  }
  readKeyStrokes () {
    readline.emitKeypressEvents(this.state.ttyIn)
    this.state.ttyIn.on('keypress', this.handleKeyPress.bind(this))
    this.state.ttyIn.setRawMode(true)
  }
  selectDisplayLines (lines:any, cursor:any, screen:any) {
    const occupied = 5
    return lines.slice(cursor.position, screen.rows - occupied)
  }
  readStdin () {
    let idx = 0

    process.stdin
      .pipe(split())
      .pipe(through(line => {
        this.setState((state:KaleProps) => {
          // -- todo update count based on selection pattern.
          const isMatch = lineMatchesPattern(state.patterns.search, line)
          const selection = {
            count: state.selection.count + (isMatch ? 1 : 0),
            total: state.selection.total + 1
          }

          state.lines.add({
            text: line,
            id: idx++
          })

          return {
            console: {
              rows: process.stdout.rows,
              columns: process.stdout.columns
            },
            selection,
            lines: state.lines,
            displayLines: this.selectDisplayLines(state.lines, state.cursor, state.screen)
          }
        })
      }))
  }
  componentDidMount () {
    this.readKeyStrokes()
    this.readStdin()
  }
  componentWillUnmount () {
    this.state.ttyIn.removeListener('keypress', this.handleKeyPress)
  }
  handleKeyPress (ch:any, key:any) {
    for (const [pred, handler] of mappings.entries()) {
      if (pred(key)) {
        return handler(this, key)
      }
    }

    throw new Error(key)
  }
  render () {
    const {
      cursor,
      screen,
      selection,
      mode,
      command,
      displayLines
    } = this.state

    return <>
      <Header cursor={cursor} selection={selection}/>
      <Body cursor={cursor} displayLines={displayLines} screen={screen}/>
      <Newline/>
      <Footer mode={mode} command={command}/>
    </>
  }
}
