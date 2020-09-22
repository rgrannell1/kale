
import {
  KaleProps
} from '../types'

import {
  hasName,
  hasSequence
} from './utils.js'

const mappings = new Map()

const runCommand = (state:any, command:string) => {
  return {
    mode: 'ShowCommand',
    command: ''
  }
}

mappings.set(hasName('return'), (elem:React.Component) => {
  elem.setState((state:KaleProps) => {
    if (state.mode === 'EnterCommand') {
      return runCommand(state, state.command)
    }
  })
})

mappings.set(hasName('backspace'), (elem:React.Component) => {
  elem.setState((state:KaleProps) => {
    return {
      command: state.command.slice(0, -1)
    }
  })
})

mappings.set(hasName('escape'), (elem:React.Component) => {
  elem.setState((state:KaleProps) => {
    return {
      mode: 'Default',
      command: ''
    }
  })
})

mappings.set(hasName('q'), (elem:React.Component) => {
  elem.setState((state:KaleProps) => {
    if (state.mode === 'Default') {
      process.kill(process.pid, 'SIGINT')
    } else {
      return {
        command: state.command + 'q'
      }
    }
  })
})

mappings.set(hasSequence('?'), (elem:React.Component) => {

})

mappings.set(hasSequence('/'), (elem:React.Component) => {
  elem.setState((state:KaleProps) => {
    if (state.mode === 'Default') {
      return {
        mode: 'EnterCommand'
      }
    } else if (state.mode === 'EnterCommand') {
      return {
        command: state.command + '/'
      }
    }
  })
})


export default mappings
