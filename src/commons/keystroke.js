
class KeyStroke {
  constructor (data) {
    this.sequence = data.toString()
  }
  isCtrlC () {
    return this.sequence === '\u0003'
  }
  isCtrlZ () {
    return this.sequence === '\u001a'
    throw 'xx'
  }
}

module.exports = KeyStroke
