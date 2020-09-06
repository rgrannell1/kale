
const chalk = require('chalk')

class Screen {
  constructor (state) {
    this._state = state
  }
  clear () {
    console.log('\x1B[2J\x1B[0f')
  }
  showUsagePrompt () {
    let message = [
      'kale (live view)',
      '',
      'hit ENTER to begin',
      '',
      'Backspace: Delete',
      'Ctrl + A:  Select Text',
      'Ctrl + C:  Exit'
    ]

    console.log(message.join('\n'))
  }
  showHighlightText (pattern, opts) {
    let header = '✨ >'

    if (opts.isSelectAll) {
      header += chalk.inverse(pattern)
    } else {
      header += pattern
    }

    console.log(header)
  }
}

module.exports = Screen
