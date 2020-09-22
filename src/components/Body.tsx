
import React from 'react'
import ink from 'ink'

const {
  Text
} = ink

export class Body extends React.PureComponent<any> {
  trimLine(line:string, cursor:any, screen:{columns: number}) {
    const start = cursor.column
    const end = start + screen.columns

    return line.slice(start, end)
  }
  selectDisplayLines (lines:any, cursor:any, screen:any) {
    // -- TODO move to Body
    const occupied = 5
    const lower = cursor.position + (screen.rows - occupied)

    return lines.slice(cursor.position, lower)
  }
  render () {
    const {
      cursor,
      lines,
      screen
    } = this.props

    const elems = []

    const displayLines = this.selectDisplayLines(lines, cursor, screen)
    for (const { text, id } of displayLines) {
      const isSelected = cursor.position === id
      const trimmed = this.trimLine(text, cursor, screen)

      elems.push(<Text key={id} inverse={isSelected}>{trimmed}</Text>)
    }

    return <>{elems}</>
  }
}
