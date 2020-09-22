
import React from 'react'
import readline from 'readline'

import * as tty from 'tty'
import * as fs from 'fs'

import { Header } from '../components/Header.js'
import { Footer } from '../components/Footer.js'
import { Body } from '../components/Body.js'

import mappings from './keypress.js'
import {
  KaleProps
} from '../commons/types'

export class Kale extends React.Component<KaleProps, any> {
  constructor (props:KaleProps) {
    super(props)

    const fd = fs.openSync('/dev/tty', 'r+')
    const ttyIn = new tty.ReadStream(fd, { })

    this.state = {
      ttyIn
    }
  }
  componentDidMount () {
    readline.emitKeypressEvents(this.state.ttyIn)
    this.state.ttyIn.on('keypress', this.handleKeyPress.bind(this))
    this.state.ttyIn.setRawMode(true)
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
      selection,
      mode,
      command
    } = this.props

    return <>
      <Header cursor={cursor} selection={selection}/>
      <Body/>
      <Footer mode={mode} command={command}/>
    </>
  }
}
