
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
      'kale (live view) 🥬',
      '',
      'hit ANY KEY to begin',
      '',
      'Backspace, Delete',
      'Ctrl + A:  Select Text',
      'Ctrl + C:  Exit'
    ]

    console.log(message.join('\n'))
  }
  showSelectionStats () {
    const selectionCount = this._state.selectionCount || 0
    const totalLineCount = this._state.totalLineCount || 0
    const percentage = Math.round(100 * (selectionCount / totalLineCount), 1)

    let message = `showing ${selectionCount.toLocaleString()} / ${totalLineCount.toLocaleString()} lines (${percentage}%)`

    console.log(message)
  }
  showHighlightText (pattern) {
    const target = this._state.focus

    let header = '✨ >'
    const isSelectAll = this._state.isSelectAll && target === 'highlightText'

    if (isSelectAll) {
      header += chalk.inverse(pattern)
    } else {
      header += pattern
    }

    if (target === 'highlightText') {
      header += chalk.inverse(' ')
    }

    console.log(header)
  }
  showFilterText (pattern) {
    const target = this._state.focus

    let header = '🔍 >'
    const isSelectAll = this._state.isSelectAll && target === 'selectText'

    if (isSelectAll) {
      header += chalk.inverse(pattern)
    } else {
      header += pattern
    }

    if (target === 'selectText') {
      header += chalk.inverse(' ')
    }

    console.log(header)
  }
  focus() {
    return this._state.focus
  }
  swapFocus () {
    if (this._state.focus === 'highlightText') {
      this._state.focus = 'selectText'
    } else {
      this._state.focus = 'highlightText'
    }
  }
}

module.exports = Screen