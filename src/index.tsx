
import React from 'react'
import ink from 'ink'
import keypress from 'keypress'

import * as tty from 'tty'
import * as fs from 'fs'

import { Header } from './components/Header.js'
import { Footer } from './components/Footer.js'
import { Body } from './components/Body.js'
import { constant } from './commons/utils.js'
import { handleKeyPress } from './commons/keypress.js'

const {
  render,
  Box,
  Text
} = ink

import {
  State
} from './commons/types'

const Kale = (props:any) => {
  const {state} = props
  return <>
    <Header state={state}/>
    <Body state={state}/>
    <Footer state={state}/>
  </>
}



const main = () => {
  const state = {
    bounds: {
      top: constant(0),
      bottom: constant(0),
      left: constant(0),
      right: constant(0)
    },
    inputs: {
      matchType: 'Literal'
    }
  }

  const fd = fs.openSync('/dev/tty', 'r+')
  const ttyIn = new tty.ReadStream(fd, { })
  const ttyOut = new tty.WriteStream(fd)

  keypress(ttyIn)
  ttyIn.on('keypress', handleKeyPress(state))
  ttyIn.setRawMode(true)

  render(<Kale state={state}/>)
}

main()
