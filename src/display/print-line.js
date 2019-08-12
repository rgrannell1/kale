
'use strict'

const ansi = require('ansi-styles')
const utils = require('../commons/utils')
const matchPatterns = require('../app/match-patterns')

const displayText = [

  'green',
  'red',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'black',
  'white',
  'gray',
  'grey'

].map(colour => {
  return (text, options) => {
    if (options.invert) {
      return ansi.inverse.open + ansi[colour].open + text + ansi[colour].close + ansi.inverse.close
    } else {
      return ansi[colour].open + text + ansi[colour].close
    }
  }
})

const printLine = { }

const printHighlightedLine = (matcher, patterns, line, options) => {
  const matchIndices = matcher(patterns, line, options)

  // tag each character with a pattern id (default to -1)

  const chars = line.split('').map(char => ({ char, id: -1 }))

  for (const val of matchIndices) {
    for (let ith = val.start; ith <= val.end; ++ith) {
      chars[ith].id = val.id
    }
  }

  // group adjacent matching id's into sublists,
  // then colourise each id and print the message.

  const displayLine = utils
    .sequenceBy(
      (elem0, elem1) => elem0.id === elem1.id, chars)
    .map(sequence => {
      const id = sequence[0].id
      const charSequence = sequence.map(val => val.char).join('')

      return id === -1
        ? charSequence
        : displayText[id % displayText.length](charSequence, options)
    })
    .join('')

  return displayLine
}

printLine.literalString = printHighlightedLine.bind({ }, matchPatterns.literalString)

printLine.regexp = printHighlightedLine.bind({ }, matchPatterns.regexp)

module.exports = printLine
