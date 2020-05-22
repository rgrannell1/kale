
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

/**
 * Return all regexp matches within a string.
 *
 * NOTE: This can be probably refactored to .matchAll
 *
 * @param {regexp|string} regexp a pattern to match
 * @param {string} a string to search
 *
 * @returns {Array<>} an array of matches.
 */
utils.regexMatches = (regexp, string) => {
  var matches = []
  var currentMatch

  while ((currentMatch = regexp.exec(string)) !== null) {
    matches.push(currentMatch)
  }

  return matches.map(match => {
    const matchData = {
      match: null,
      captureGroups: [],
      index: match.index
    }

    Object.keys(match).forEach(key => {
      const numericKey = parseInt(key, 10)

      if (numericKey === 0) {
        matchData.match = match[0]
      } else if (numericKey === numericKey) {
        matchData.captureGroups[numericKey - 1] = match[numericKey]
      }
    })

    return matchData
  })
}

module.exports = utils
