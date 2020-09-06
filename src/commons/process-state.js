
class ProcessState {
  constructor (lines) {
    const args = {
      invert: false,
      displayWholeLine: false,
      display: true,
      patterns: ['a']
    }

    this._lines = lines
    this._state = {
      highlightText: [],
      selectText: [],
      args
    }
  }
  args () {
    return this._state.args
  }
  lines () {
    return this._lines
  }
  clearScreen () {
    console.log('\x1B[2J\x1B[0f')
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

    // -- remove from the selected text buffer.
    if (event.isBackspace()) {
      console.log('hii')
    }

    console.log(event.sequence().codePointAt())

  }
}

module.exports = ProcessState
