
const chalk = require('chalk')
const Footer = require('./components/footer')

const showSelectionStats = (state) => {

}

class Screen {
  constructor (state, streams) {
    this._state = state
    this._streams = streams
  }
  clear () {
    this._streams.out.write('\x1B[2J\x1B[0f\n')
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
    const header = new Header(this._streams, {

    })
    header.render()

  }
  footer () {
    const footer = new Footer(this._streams, {

    })
    footer.render()
  }
  logLines () {
    const stdoutRows = process.stdout.rows || 20
    const headerLines = 3
    const footerlines = 2
    return stdoutRows - (headerLines + footerlines + 1)
  }
}

module.exports = Screen
