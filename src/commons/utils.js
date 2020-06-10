
const utils = { }

/**
 * Group adjacent elements into a sequence if they match a binary predicate.
 *
 * @param {function} pred a predicate function
 * @param {Array<any>} coll a collection of arbitrary elements
 */
utils.sequenceBy = (pred, coll) => {
  let out

  if (coll.length === 0) {
    return []
  } else if (coll.length === 1) {
    return [coll]
  } else {
    // -- create an initial sequence
    const sequences = [[coll[0]]]

    for (let ith = 1; ith < coll.length; ++ith) {
      const elem = coll[ith]
      // -- the previous target collection.
      const target = sequences[sequences.length - 1]

      const isMatch = pred(target[target.length - 1], elem)
      if (isMatch) {
        target.push(elem)
      } else {
        // -- didn't match; group on its own for now.
        sequences.push([elem])
      }
    }

    out = sequences
  }

  return out
}

module.exports = utils
