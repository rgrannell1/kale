
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

export const CursorLinePosition = (props:any) => {
  const { state } = props

  return <Box minWidth={10}>
    <Text>
      line {state.bounds.top()}
    </Text>
  </Box>
}

export const SelectionSummary = (props:any) => {
  const selected = 10
  const total = 100

  const ratio = Number.isNaN(selected / total)
    ? 100
    : Math.round((selected / total) * 100)

  const strings = {
    ratio: ratio.toLocaleString(),
    total: total.toLocaleString(),
    selected: selected.toLocaleString()
  }

  return <Text>
    {strings.selected} / {strings.total} ({strings.ratio}%)
  </Text>
}

export const Header = (props:any) => {
  const { state } = props

  return <Box>
    <Box minWidth={8}>
      <Text>KALE<Newline/></Text>
    </Box>
    <CursorLinePosition state={state}></CursorLinePosition>
    <SelectionSummary state={state}></SelectionSummary>
  </Box>
}
