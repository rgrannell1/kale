
const Screen = require('./screen')

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

//console.log(event.sequence().codePointAt()

    // -- CTRL-A: select current line and display
    if (event.isCtrlA()) {
      this._state.isSelectAll = true
    }

    // -- remove from the selected text buffer.
    if (event.isBackspace()) {
      // -- either delete the full line, or just the last character.
      if (this._state.isSelectAll) {
        this._state.highlightText = []
        this._state.isSelectAll = false
      } else {
        this._state.highlightText.splice(-1, 1)
      }
    } else {
      this._state.highlightText.push(event.sequence())
    }

    const pattern = this._state.highlightText.join('')

    this.screen.showHighlightText(pattern, {
      isSelectAll: this._state.isSelectAll
    })

    this.setPatterns([pattern])
  }
}

module.exports = ProcessState
