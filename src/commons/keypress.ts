
import {
  KaleProps
} from './types'

const truth = () => true

const mappings = new Map()

const asKeyBinding = (key:any) => {
  if (!key) {
    return
  }

  let id = ''

  if (key.ctrl) {
    id += 'ctrl + '
  }

  if (key.shift) {
    id += 'ctrl + '
  }

  const foo = new Set(['escape', 'backspace'])

  if (foo.has(key.name)) {
    return key.name
  }

  if (key.sequence) {
    id += key.sequence
  }

  return id
}

const keypress = (binding:string) => {
  return (key:any) => {
    return asKeyBinding(key) === binding
  }
}

mappings.set(keypress('left'), (elem:React.Component) => { })
mappings.set(keypress('right'), (elem:React.Component) => { })
mappings.set(keypress('up'), (elem:React.Component) => { })
mappings.set(keypress('down'), (elem:React.Component) => { })

mappings.set(keypress('ctrl + a'), (elem:React.Component) => {
  process.kill(process.pid, 'SIGINT')
})

mappings.set(keypress('ctrl + c'), (elem:React.Component) => {
  process.kill(process.pid, 'SIGINT')
})

mappings.set(keypress('ctrl + z'), (elem:React.Component) => {
  process.kill(process.pid, 'SIGSTP')
})

mappings.set(keypress('ctrl + g'), (elem:React.Component) => {
  elem.setState((state:KaleProps) => {
    return {
      cursor: {
        ...state.cursor,
        position: 28
      }
    }
  })
})

mappings.set(keypress('backspace'), (elem:React.Component) => {
  elem.setState((state:KaleProps) => {
    return {
      command: state.command.slice(0, -1)
    }
  })
})

mappings.set(keypress('escape'), (elem:React.Component) => {
  elem.setState((state:KaleProps) => {
    if (state.mode === 'EnterCommand') {
      return {
        mode: 'Default',
        command: ''
      }
    }
  })
})

mappings.set(keypress('q'), (elem:React.Component) => {
  elem.setState((state:KaleProps) => {
    if (state.mode === 'Default') {
      process.kill(process.pid, 'SIGINT')
    }
  })
})

mappings.set(keypress('?'), (elem:React.Component) => {

})

mappings.set(keypress('/'), (elem:React.Component) => {
  elem.setState((state:KaleProps) => {
    if (state.mode === 'Default') {
      return {
        mode: 'EnterCommand'
      }
    }
  })
})

mappings.set(truth, (elem:React.Component, key:any) => {
  elem.setState((state:KaleProps) => {
    if (state.mode === 'EnterCommand' && !key.ctrl && !key.meta) {
      return {
        command: state.command + key.sequence
      }
    }
  })
})

export default mappings
