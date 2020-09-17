
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
  isCtrlUp () {
    return this._sequence === '\u001b[1;5A'
  }
  isCtrlDown () {
    return this._sequence === '\u001b[1;5B'
  }
  isUp () {
    return this._sequence === '\x1B[A'
  }
  isDown () {
    return this._sequence === '\x1B[B'
  }
  isRight () {
    return this._sequence === '\u001b[C'
  }
  isLeft () {
    return this._sequence === '\u001b[D'
  }
  isEnter () {
    return this._sequence === '\r'
  }
  isTab () {
    return this._sequence === '\t'
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
