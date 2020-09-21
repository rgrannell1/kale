
import {
  State
} from './types'

const truth = () => true

const mappings = new Map()

const asKeyBinding = (key:any) => {
  let id = ''

  if (key.ctrl) {
    id += 'ctrl + '
  }

  if (key.shift) {
    id += 'ctrl + '
  }

  if (key.name) {
    id += key.name
  }

  return id
}

const keypress = (binding:string) => {
  return (key:any) => {
    return asKeyBinding(key) === binding
  }
}

mappings.set(keypress('ctrl + c'), (state:State) => {
  process.kill(process.pid, 'SIGINT')
})

mappings.set(keypress('ctrl + z'), (state:State) => {
  process.kill(process.pid, 'SIGSTP')
})

mappings.set(keypress('ctrl + g'), (state:State) => {

})

mappings.set(truth, (state:State) => {

})

export const handleKeyPress = (state:State) => {
  return (ch:any, key:any) => {
    for (const [pred, handler] of mappings.entries()) {
      if (pred(key)) {
        return handler(state)
      }

      throw new Error(key)
    }
  }
}
