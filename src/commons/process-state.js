
const Screen = require('./screen')
const generalCategory = require('general-category')

const categories = {
  controlCharacter: 'Cc'
}

const isNonControlKey = key => {
  const category = generalCategory(key.sequence())

  if (category === categories.controlCharacter) {
    return false
  }

  return true
}

const filterLine = (selectText, line) => {
  return line.includes(selectText)
}

const handlers = { }

handlers.right = state => {
  state.boundsLeft += 5
}

handlers.left = state => {
  state.boundsLeft = Math.max(state.boundsLeft -= 5, 0)
}

handlers.ctrlC = () => {
  process.kill(process.pid, 'SIGINT')
}

handlers.ctrlZ = () => {
  process.kill(process.pid, 'SIGTSTP')
}

handlers.ctrlG = (state, selectedLines) => {
  state.boundsTop = selectedLines - process.stdout.rows
}

handlers.ctrlUp = state => {
  state.boundsTop = Math.max(state.boundsTop -= 5, 0)
}

handlers.ctrlDown = state => {
  state.boundsTop += 5
}

handlers.down = screen => {
  screen.swapFocus()
}

handlers.ctrlA = state => {
  this._state.isSelectAll = true
}

handlers.up = screen => {
  screen.swapFocus()
}

handlers.backspace = (state, screen) => {
  const target = screen.focus()

  // -- remove from the selected text buffer.
  // -- either delete the full line, or just the last character.
  if (state.isSelectAll) {
    state[target] = []
    state.isSelectAll = false
  } else {
    state[target].splice(-1, 1)
  }
}

handlers.up = screen => {
  // -- move up or down between search bars
  screen.swapFocus()
}

handlers.delete = state => {
  const target = this.screen.focus()
  // -- delete everything, or do nothing.
  if (state.isSelectAll) {
    state[target] = []
    state.isSelectAll = false
  }
}

// TODO dumb class, refactor.
class ProcessState {
  constructor (lines) {
    const args = {
      invert: false,
      displayWholeLine: false,
      display: true,
      patterns: undefined
    }

    this._lines = lines
    this._state = {
      // -- track the starting bound to control left-right flow.
      boundsLeft: 0,
      boundsTop: 0,

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
  selectionLineCount () {
    return this._state.selectionCount || 0
  }
  bounds () {
    return {
      left: this._state.boundsLeft,
      right: this._state.boundsLeft + process.stdout.columns,
      top: this._state.boundsTop
    }
  }
  // -- update state based on the key input.
  input (key) {
    if (key.isCtrlC()) {
      handlers.ctrlC()
    } else if (key.isCtrlZ()) {
      handlers.ctrlZ()
    } else if (key.isCtrlA()) {
      handlers.ctrlA(this._state)
    } else if (key.isEnter() || key.isTab()) {
      // -- drop useless signals
    } else if (key.isUp()) {
      handlers.up(this.screen)
    } else if (key.isDown()) {
      handlers.down(this.screen)
    } else if (key.isCtrlUp()) {
      handlers.ctrlUp(this._state)
    } else if (key.isCtrlDown()) {
      handlers.ctrlDown(this._state)
    } else if (key.isLeft()) {
      handlers.left(this._state)
    } else if (key.isRight()) {
      handlers.right(this._state)
    } else if (key.isBackspace()) {
      handlers.backspace(this._state, this.screen)
    } else if (key.isDelete()) {
      handlers.delete(this._state)
    } else if (key.isCtrlG()) {
      handlers.ctrlG(this._state, this.selectionLineCount())
    } else if (false) {
      // TODO binding to switch to regular expression
    } else if (isNonControlKey(key)) {
      // -- do nothing for now
      const target = this.screen.focus()
      this._state[target].push(key.sequence())
    }

    // -- move to screen.
    const target = this.screen.focus()
    const pattern = this._state.highlightText.join('')

    this.screen.showSelectionStats()
    // -- TODO bug, these are out of date due to selection being updated below
    this.setPatterns([pattern])

    this.screen.showHighlightText(this.args().patterns[0] || '')

    const selected = this.selection()

    this.screen.showFilterText(selected)
  }
}

module.exports = ProcessState
