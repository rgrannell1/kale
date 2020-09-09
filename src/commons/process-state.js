
const Screen = require('./screen')
const generalCategory = require('general-category')

const categories = {
  controlCharacter: 'Cc'
}

const isValid = key => {
  const category = generalCategory(key.sequence())

  if (category === categories.controlCharacter) {
    return false
  }

  return true
}

const filterLine = (selectText, line) => {
  return line.includes(selectText)
}


// TODO dumb class, refactor.
class ProcessState {
  constructor (lines) {
    const args = {
      invert: false,
      displayWholeLine: false,
      display: true,
      patterns: ['']
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
  selection () {
    return this._state.selectText.join('')
  }
  lines () {
    const values = this._lines.values()
    const filteredSelection = values
      .filter(filterLine.bind(null, this.selection()))

    this._state.selectionCount = filteredSelection.length
    this._state.totalLineCount = values.length

    return filteredSelection
  }
  // -- update state based on the key input.
  input (key) {
    // -- CTRL-C: proxy sigint
    if (key.isCtrlC()) {
      process.kill(process.pid, 'SIGINT')
      return
    }

    // -- CTRL-Z: proxy sigtstp
    if (key.isCtrlZ()) {
      process.kill(process.pid, 'SIGTSTP')
      return
    }

    // -- CTRL-A: select current line and display
    if (key.isCtrlA()) {
      this._state.isSelectAll = true
    }

    // -- drop useless signals
    if (key.isEnter() || key.isTab()) {

    } else if (key.isUp() || key.isDown()) {
      // -- move up or down between search bars
      this.screen.swapFocus()
    } else if (key.isBackspace()) {
      const target = this.screen.focus()

      // -- remove from the selected text buffer.
      // -- either delete the full line, or just the last character.
      if (this._state.isSelectAll) {
        this._state[target] = []
        this._state.isSelectAll = false
      } else {
        this._state[target].splice(-1, 1)
      }
    } else if (key.isDelete()) {
      const target = this.screen.focus()
      // -- delete everything, or do nothing.
      if (this._state.isSelectAll) {
        this._state[target] = []
        this._state.isSelectAll = false
      }
    } else if (isValid(key)) {
      // -- do nothing for now
      const target = this.screen.focus()
      this._state[target].push(key.sequence())
    }

    // -- move to screen.
    const target = this.screen.focus()
    const pattern = this._state.highlightText.join('')

    this.screen.showSelectionStats()
    this.screen.showHighlightText(pattern)

    const selected = this.selection()

    this.screen.showFilterText(selected)

    this.setPatterns([pattern])
  }
}

module.exports = ProcessState
