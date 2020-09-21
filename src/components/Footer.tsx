
import React from 'react'
import ink from 'ink'

const {
  Box,
  Text ,
  Newline,
} = ink

import {
  State
} from '../commons/types'

export const Command = (props:any) => {
  const {
    keybinding,
    description
  } = props

  return <Box>
    <Text inverse>{keybinding}</Text><Text> {description}</Text>
  </Box>
}

const keybindings = (state:any) => {
  return [
    {
      keybinding: 'Ctrl + A',
      description: 'Select Field'
    },
    {
      keybinding: 'Ctrl + C',
      description: 'Exit'
    },
    {
      keybinding: 'Ctrl + F',
      description: 'Use DynamicProperty'
    },
    {
      keybinding: 'Ctrl + G',
      description: 'Jump to End'
    }
  ]
}

export const Footer = (props:any) => {
  const { state } = props
  const components = [ ]

  for (const { keybinding, description } of keybindings(state)) {
    components.push(<Command key={keybinding} keybinding={keybinding} description={description}></Command>)
  }

  return <Box justifyContent="space-between">
    {components}
  </Box>
}
