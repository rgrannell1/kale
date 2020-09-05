
class CircularBuffer {
  constructor (capacity) {
    this.idx = 0
    this._size = 0
    this._capacity = capacity
    this.buffer = new Array(capacity)
  }
  size () {
    return this._size
  }
  capacity () {
    return this._capacity
  }
  add (elem) {
    this.buffer[this.idx % this._capacity] = elem
    this.idx++
    this._size = Math.min(this._size + 1, this._capacity)
  }
  values () {
    // -- start with the oldest modded by size
    let next = this.idx % this._size

    let elems = [ ]
    // -- retrieve #size elements
    for (let ith = 0; ith < this._size; ++ith) {
      // -- construct a circular index starting from the oldest element
      let idx = (next + ith) % this._size
      let elem = this.buffer[idx]
      elems.push(elem)
    }

    return elems
  }
}

module.exports = CircularBuffer
