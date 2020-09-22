
import React from 'react'
import ink from 'ink'

const {
  Box,
  Text,
  Newline,
} = ink

interface EnterProps {
  command: string
}

export class EnterCommand extends React.PureComponent<EnterProps> {
  render () {
    const { command } = this.props
    return <Box>
      <Text inverse>&gt; {command}</Text>
    </Box>

  }
}

interface ShowProps {
  command: string
  output: string
}

export class ShowCommand extends React.PureComponent<ShowProps> {
  render () {
    const { output } = this.props
    return <Box>
      <Text inverse>&gt; things ran</Text>
    </Box>

  }
}

export class DefaultFooter extends React.PureComponent<{}> {
  render () {
    return <Box>
      <Text inverse>Press / to run command, q to exit, '?' for help</Text>
    </Box>
  }
}

interface FooterProps {
  mode: string,
  command: string,
  output: string
}

export class Footer extends React.PureComponent<FooterProps> {
  render () {
    const { mode, command, output } = this.props

    if (mode === 'EnterCommand') {
      return <EnterCommand command={command}/>
    } else if (mode === 'ShowCommand') {
      return <ShowCommand output={output} command={command}/>
    } else {
      return <DefaultFooter ></DefaultFooter>
    }
  }
}
