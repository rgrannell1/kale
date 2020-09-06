
class KeyStroke {
  constructor (data) {
    this.sequence = data.toString()
  }
  isCtrlC () {
    return this.sequence === '\u0003'
  }
}

module.exports = KeyStroke
