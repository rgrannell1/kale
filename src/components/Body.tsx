
import React from 'react'
import ink from 'ink'

const {
  Text
} = ink

export class Line extends React.PureComponent<any> {
  render () {
    return <Text>{this.props.content}</Text>
  }
}

export class Body extends React.PureComponent<any> {
  render () {
    const {
      cursor,
      displayLines
    } = this.props

    const elems = []

    for (const { text, id } of displayLines) {
      // -- change id
      elems.push(<Line key={id} content={text}/>)
    }

    return <>{elems}</>
  }
}
