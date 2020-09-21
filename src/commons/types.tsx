
export interface Bounds {
  top: () => number,
  bottom: () => number,
  left: () => number,
  right: () => number
}

export interface State {
  bounds: Bounds
}
