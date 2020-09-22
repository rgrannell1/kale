
import CircularBuffer from "./circular-buffer";

export interface LineData {
  text: string,
  id: number
}

export interface KaleProps {
  cursor: {
    position: number
  },
  selection: {
    count: number,
    total: number
  },
  patterns: {
    search: string,
    highlight: string
  },
  mode: string,
  command: string,
  lines: CircularBuffer<LineData>
}

