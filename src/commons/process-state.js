
const Screen = require('./screen')

const handleKeys = { }

class ProcessState {
  constructor (lines) {
    const args = {
      invert: false,
      displayWholeLine: false,
      display: true,
      patterns: ['test']
    }

    this._lines = lines
    this._state = {
      isStarted: false,
      isSelectAll: false,
      highlightText: [],
      selectText: [],
      focus: 'highlightText',
      args
    }
    this.screen = new Screen(this._state)
  }
  setPatterns (patterns) {
    this._state.args.patterns = patterns
  }
  args () {
    return this._state.args
  }
  headers () {
    return this._state.highlightText
  }
  lines () {
    return this._lines.values()
  }
  footers () {
    return []
  }

  // -- update state based on the key input.
  input (event) {
    // -- CTRL-C: proxy sigint
    if (event.isCtrlC()) {
      process.kill(process.pid, 'SIGINT')
      return
    }

    // -- CTRL-Z: proxy sigtstp
    if (event.isCtrlZ()) {
      process.kill(process.pid, 'SIGTSTP')
      return
    }

    // -- CTRL-A: select current line and display
    if (event.isCtrlA()) {
      this._state.isSelectAll = true
    }

    if (event.isUp() || event.isDown()) {
      // -- move up or down between search bars
      this.screen.swapFocus()
    } else if (event.isBackspace()) {
      const target = this.screen.focus()

      console.log(target)

      // -- remove from the selected text buffer.
      // -- either delete the full line, or just the last character.
      if (this._state.isSelectAll) {
        this._state[target] = []
        this._state.isSelectAll = false
      } else {
        this._state[target].splice(-1, 1)
      }
    } else {
      const target = this.screen.focus()
      this._state[target].push(event.sequence())
    }

    const target = this.screen.focus()
    const pattern = this._state.highlightText.join('')

    this.screen.showHighlightText(pattern)

    const selected = this._state.selectText.join('')

    this.screen.showFilterText(selected)

    this.setPatterns([pattern])
  }
}

module.exports = ProcessState
