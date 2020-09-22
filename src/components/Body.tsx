
import React from 'react'
import ink from 'ink'

const {
  Text
} = ink

export class Body extends React.PureComponent<any> {
  trimLine(line:string, screen:{columns: number}) {
    return line.slice(0, screen.columns)
  }
  render () {
    const {
      cursor,
      displayLines,
      screen
    } = this.props

    const elems = []

    for (const { text, id } of displayLines) {
      const isSelected = cursor.position === id
      const trimmed = this.trimLine(text, screen)

      elems.push(<Text key={id} inverse={isSelected}>{trimmed}</Text>)
    }

    return <>{elems}</>
  }
}
