
const chalk = require('chalk')

class Footer {
  constructor (streams, state) {
    this._streams = streams
    this._state = state
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

    this._streams.out.write(header + '\n')
  }
  showSelectionStats () {
    const selectionCount = this._state.selectionCount || 0
    const totalLineCount = this._state.totalLineCount || 0
    let percentage = Math.round(100 * (selectionCount / totalLineCount), 1)

    if (Number.isNaN(percentage)) {
      percentage = 100
    }

    const boundTop = this._state.boundsTop.toLocaleString()

    let message = `\nKALE    line ${boundTop}    ${selectionCount.toLocaleString()} / ${totalLineCount.toLocaleString()} lines (${percentage}%)\n`

    this._streams.out.write(message)
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

    this._streams.out.write(header + '\n')
  }
  render (patterns) {
    this.showSelectionStats()
    this.showHighlightText(pattern)
    this.showFilterText(pattern)
    this._streams.out.write('\n\n')

  }
}

module.exports = Footer
