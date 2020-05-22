
const ansi = require('ansi-styles')
const utils = require('../commons/utils')
const constants = require('../commons/constants')
const matchPatterns = require('../app/match-patterns')

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

const hasSameId = (elem0, elem1) => {
  return elem0.id === elem1.id
}

const printLine = { }

/**
 * Print regular expression or string matches
 *
 * @param {Function} matcher a functino to match patterns in a line of text.
 * @param {Array<string | regexp>} patterns an array of patterns
 * @param {string} line a line of text
 * @param {Object} options any additional options.
 */
const printHighlightedLine = (matcher, patterns, line, options) => {
  const matchIndices = matcher(patterns, line, options)

  // -- tag each character with a pattern id (default to -1)
  const chars = line.split('').map(char => ({ char, id: -1 }))

  for (const val of matchIndices) {
    for (let ith = val.start; ith <= val.end; ++ith) {
      chars[ith].id = val.id
    }
  }

  // -- group adjacent matching id's into sublists,
  // -- then colourise each id and print the message.
  const displayLine = utils
    .sequenceBy(hasSameId, chars)
    .map(sequence => {

      // -- get the sequence id; sequence will always be length one or greater.
      const id = sequence[0].id
      // -- join the sequence letters into a line
      const charSequence = sequence.map(val => val.char).join('')

      const isMissing = id === -1

      // -- modulo the match id so one of the colour functions can be used.
      const colourId = id % displayText.length

      return isMissing
        ? charSequence
        : displayText[colourId](charSequence, options)
    })
    .join('')

  return displayLine
}

/**
 * Format a string to highlight string-literal patterns
 *
 * @param {Array<string>} patterns an array of strings to match
 * @param {string} line a line of text
 * @param {Object} options an object of additional options
 */
printLine.literalString = (patterns, line, options) => {
  return printHighlightedLine(matchPatterns.literalString, patterns, line, options)
}

/**
 * Format a string to highlight regexp patterns
 *
 * @param {Array<string>} patterns an array of regexp to match
 * @param {string} line a line of text
 * @param {Object} options an object of additional options
 */
printLine.regexp = (patterns, line, options) => {
  return printHighlightedLine(matchPatterns.regexp, patterns, line, options)
}

module.exports = printLine
