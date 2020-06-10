
const ansi = require('ansi-styles')
const utils = require('../commons/utils')
const constants = require('../commons/constants')

/**
 * Construct an array of functions that colourise provided text.
 */
const displayText = constants.displayColours.map(colour => {
  return (text, options) => {
    if (options.invert) {
      return `${ansi.inverse.open}${ansi[colour].open}${text}${ansi[colour].close}${ansi.inverse.close}`
    } else {
      return `${ansi[colour].open}${text}${ansi[colour].close}`
    }
  }
})

/**
 * Check whether two elements have the same id.
 *
 * @param {any} elem0 a character element
 * @param {any} elem1 a character element
 *
 * @returns {Boolean}
 */
const hasSameId = (elem0, elem1) => {
  return elem0.id === elem1.id
}

const formatText = (chars, id, options) => {
  if (Number.isInteger(id)) {
    const colourId = id % displayText.length
    return displayText[colourId](chars, options)
  } else {
    return chars
  }
}

/**
 * Print regular expression or string matches.
 *
 * Matches
 *
 * @param {Array<string | regexp>} patterns an array of patterns
 * @param {string} line a line of text
 * @param {Object} options any additional options.
 */
const printLine = (patterns, line, options) => {
  const allMatches = []

  let id = 0
  // -- match each pattern as many times as possible using `matchAll`
  for (const pattern of patterns) {
    const matches = [...line.matchAll(pattern)]

    matches.forEach(match => {
      allMatches.push({
        start: match.index,
        end: match.index + match[0].length,
        id
      })
    })
    ++id
  }

  // -- convert to characters and indices.
  const sequence = line.split('').map((char, index) => {
    return {
      char,
      index
    }
  })

  // -- tag each character by match, preferring later matches.
  for (const match of allMatches) {
    for (const data of sequence) {
      if (data.index >= match.start && data.index < match.end) {
        data.id = match.id
      }
    }
  }

  let output = ''

  // -- colourise and sequence by id.
  utils
    .sequenceBy(hasSameId, sequence)
    .map(stretch => {
      const chars = stretch.map(stretchData => stretchData.char).join('')
      const id = stretch[0].id

      output += formatText(chars, id, options)
    })

  return output
}

module.exports = printLine
