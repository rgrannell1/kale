
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
  isCtrlC () {
    return this._sequence === '\u0003'
  }
  isCtrlZ () {
    return this._sequence === '\u001a'
  }
  isDelete () {
    return this._sequence.codePointAt() === 27
  }
  isBackspace () {
    return this._sequence.codePointAt() === 127
  }
}

module.exports = KeyStroke
