
class KeyStroke {
  constructor (data) {
    this._raw = data
    this._sequence = data.toString()
  }
  raw () {
    return this._raw
  }
  sequence () {
    return this._sequence
  }
  isUp () {
    return this._sequence === '\x1B[A'
  }
  isDown () {
    return this._sequence === '\x1B[B'
  }
  isCtrlA () {
    return this._sequence.codePointAt() === 1
  }
  isCtrlC () {
    return this._sequence === '\u0003'
  }
  isCtrlZ () {
    return this._sequence === '\u001a'
  }
  isDelete () {
    return this._sequence === '\x1B[3~'
  }
  isBackspace () {
    return this._sequence === '\x7F'
  }
}

module.exports = KeyStroke
