
import {
  KaleProps
} from '../types'

import {
  hasName,
  hasSequence
} from './utils.js'

const mappings = new Map()

const runCommand = (state:any, command:string) => {
  // -- execute line jumps, and other things.

}

mappings.set(hasSequence('return'), (elem:React.Component) => {
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
    if (state.mode === 'EnterCommand') {
      return {
        mode: 'Default',
        command: ''
      }
    }
  })
})

mappings.set(hasName('q'), (elem:React.Component) => {
  elem.setState((state:KaleProps) => {
    if (state.mode === 'Default') {
      process.kill(process.pid, 'SIGINT')
    } else {
      console.log(Object.keys(state))
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
    }
  })
})


export default mappings
