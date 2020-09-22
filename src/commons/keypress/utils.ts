

export const hasName = (val:string) => {
  return (key:any) => {
    return key.name === val
  }
}

export const hasSequence = (val:string) => {
  return (key:any) => {
    return key.sequence === val
  }
}

const asKeyBinding = (key:any) => {
  if (!key) {
    return
  }

  let id = ''

  if (key.ctrl) {
    id += 'ctrl + '
  }

  if (key.shift) {
    id += 'shift + '
  }

  if (key.sequence) {
    id += key.sequence
  } else if (key.name) {
    id += key.name
  }

  return id
}

export const keypress = (binding:string) => {
  return (key:any) => {
    return asKeyBinding(key) === binding
  }
}