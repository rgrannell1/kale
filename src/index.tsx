
import React from 'react'
import ink from 'ink'

import { Header } from './components/Header.js'
import { Footer } from './components/Footer.js'
import { Body } from './components/Body.js'
import { constant } from './commons/utils.js'

const {
  render,
  Box,
  Text
} = ink

const Kale = (props:any) => {
  return <>
    <Header state={state}/>
    <Body state={state}/>
    <Footer state={state}/>
  </>
}

const state = {
  bounds: {
    top: constant(0),
    bottom: constant(0),
    left: constant(0),
    right: constant(0)
  }
}

render(<Kale state={state}/>)
