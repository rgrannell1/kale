
'use strict'

const utils = { }

/*
	group adjacent elements that match a predicate.
*/

utils.sequenceBy = (pred, coll) => {
  var out

  if (coll.length === 0) {
    out = []
  } else if (coll.length === 1) {
    out = [coll]
  } else {
    const sequences = [[coll[0]]]

    for (let ith = 1; ith < coll.length; ++ith) {
      const elem = coll[ith]
      const target = sequences[sequences.length - 1]

      if (pred(target[target.length - 1], elem)) {
        target.push(elem)
      } else {
        sequences.push([elem])
      }
    }

    out = sequences
  }

  return out
}

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
