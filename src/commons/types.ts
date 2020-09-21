
export interface Bounds {
  top: () => number,
  bottom: () => number,
  left: () => number,
  right: () => number
}

export interface Inputs {
  matchType: string
}

export interface State {
  bounds: Bounds,
  inputs: Inputs
}
