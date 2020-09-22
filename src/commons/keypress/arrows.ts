
import {
  KaleProps
} from '../types'

import { hasName } from './utils.js'

const mappings = new Map()

mappings.set(hasName('up'), (elem:React.Component) => {
  elem.setState((state:KaleProps) => {
    return {
      cursor: {
        position: Math.max(state.cursor.position - 1, 0),
        column: state.cursor.column
      }
    }
  })
})

mappings.set(hasName('down'), (elem:React.Component) => {
  elem.setState((state:KaleProps) => {
    return {
      cursor: {
        position: state.cursor.position + 1,
        column: state.cursor.column
      }
    }
  })
})

mappings.set(hasName('right'), (elem:React.Component) => {
  elem.setState((state:KaleProps) => {
    return {
      cursor: {
        position: state.cursor.position,
        column: state.cursor.column + 2
      }
    }
  })
})

mappings.set(hasName('left'), (elem:React.Component) => {
  elem.setState((state:KaleProps) => {
    return {
      cursor: {
        position: state.cursor.position,
        column: Math.max(state.cursor.column - 2, 0)
      }
    }
  })
})

export default mappings
