
const chalk = require('chalk')

class Screen {
  constructor (state) {
    this._state = state
  }
  clear () {
    console.log('\x1B[2J\x1B[0f')
  }
  showSelectionStats () {
    const selectionCount = this._state.selectionCount || 0
    const totalLineCount = this._state.totalLineCount || 0
    const percentage = Math.round(100 * (selectionCount / totalLineCount), 1)

    const boundTop = this._state.boundsTop.toLocaleString()

    let message = `\nKALE    line ${boundTop}    ${selectionCount.toLocaleString()} / ${totalLineCount.toLocaleString()} lines (${percentage}%)`

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
  focus () {
    return this._state.focus
  }
  swapFocus () {
    if (this._state.focus === 'highlightText') {
      this._state.focus = 'selectText'
    } else {
      this._state.focus = 'highlightText'
    }
  }
  header (pattern) {
    this.showSelectionStats()
    this.showHighlightText(pattern)
    this.showFilterText(pattern)
    console.log('\n')
  }
  footer () {
    const patternMode = 'RegExp'
    const footer = [
      chalk.inverse('Ctrl + A') + ' Select Field',
      chalk.inverse('Ctrl + C') + ' Exit',
      chalk.inverse('Ctrl + F') + ` Use ${patternMode}`,
      chalk.inverse('Ctrl + G') + ` Jump to End`
    ]

    console.log(footer.join('    '))
  }
  logLines () {
    const stdoutRows = process.stdout.rows || 20
    const headerLines = 3
    const footerlines = 2
    return stdoutRows - (headerLines + footerlines + 1)
  }
}

module.exports = Screen
