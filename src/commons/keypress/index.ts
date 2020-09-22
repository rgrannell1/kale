
import {
  KaleProps
} from '../types'

import arrowMappings from './arrows.js'
import signalMappings from './signals.js'
import commandMappings from './commands.js'

const mappings = new Map()

mappings.set(() => true, (elem:React.Component, key:any) => {
  elem.setState((state:KaleProps) => {
    if (state.mode === 'EnterCommand' && !key.ctrl && !key.meta) {
      return {
        command: state.command + key.sequence
      }
    }
  })
})

const appMappings = new Map([
  ...arrowMappings,
  ...signalMappings,
  ...commandMappings,
  ...mappings
])

export default appMappings
