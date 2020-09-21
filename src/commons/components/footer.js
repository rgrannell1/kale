
const chalk = require('chalk')

class Footer {
  constructor (streams, state) {
    this._streams = streams
    this._state = state
  }
  entries () {
    const patternMode = 'RegExp'

    return [
      chalk.inverse('Ctrl + A') + ' Select Field',
      chalk.inverse('Ctrl + C') + ' Exit',
      chalk.inverse('Ctrl + F') + ` Use ${patternMode}`,
      chalk.inverse('Ctrl + G') + ` Jump to End`
    ]
  }
  render () {
    const footer = this.entries().join('    ')
    this._streams.out.write(`${footer}\n`)
  }
}

module.exports = Footer
