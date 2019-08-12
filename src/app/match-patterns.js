
'use strict'

const is = require('is')
const utils = require('../commons/utils')

const matchPatterns = { }

matchPatterns.literalString = (patterns, line, options) => {
  return patterns.reduce((acc, text, id) => {
    var currentMatchIndex
    var previousIndex = -1
    const matchIndices = []

    // get the start index of each match in the line.

    if (options.displayWholeLine) {
      if (line.indexOf(text) !== -1) {
        matchIndices.push(0)
      }
    } else {
      while ((currentMatchIndex = line.indexOf(text, previousIndex + 1)) !== -1) {
        matchIndices.push(currentMatchIndex)
        previousIndex = currentMatchIndex
      }
    }

    // accumulate all new match-indices.

    return acc.concat(matchIndices.map(matchIndex => {
      return {
        id,
        start: matchIndex,
        end: options.displayWholeLine
          ? Math.min(line.length - 1)
          : Math.min(line.length - 1, matchIndex + text.length - 1)
      }
    }))
  }, [])
}

matchPatterns.regexp = (patterns, line, options) => {
  return patterns.reduce((acc, pattern, id) => {
    const regexp = is.regexp(pattern)
      ? pattern
      : new RegExp(pattern, 'g')

    if (options.displayWholeLine) {
      const hasMatch = regexp.test(line)

      if (hasMatch) {
        return acc.concat({
          id,
          start: 0,
          end: line.length - 1
        })
      } else {
        return acc
      }
    } else {
      const matches = utils.regexMatches(regexp, line)

      return acc.concat(matches.map(match => {
        return {
          id,
          start: match.index,
          end: match.index + (match.match.length - 1)
        }
      }))
    }
  }, [])
}

module.exports = matchPatterns
