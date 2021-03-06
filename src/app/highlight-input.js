
const events = require('events')
const ansi = require('ansi-styles')
const utils = require('../commons/utils')
const patternUtils = require('./patterns')
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

const matchPatterns = (line, pattern) => {
  const lineType = Object.prototype.toString.call(pattern).slice(8, -1).toLowerCase()

  if (lineType === 'string') {
    // -- return matches for string literals. Not implemented by default
    let id = 0
    const results = [ ]

    for (let ith = 0; ith < line.length - pattern.length; ++ith) {
      let sliced = line.slice(ith, line.length)

      if (sliced.startsWith(pattern)) {
        results.push({
          start: ith,
          end: ith + pattern.length,
          id
        })

        ith += pattern.length
        id++
      }
    }

    return results
  } else if (lineType === 'regexp') {
    const results = [...line.matchAll(pattern)].map((match, ith) => {
      return {
        start: match.index,
        end: match.index + match[0].length,
        id: ith
      }
    })

    return results
  } else {
    throw new Error('.')
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

  const lineType = Object.prototype.toString.call(line).slice(8, -1).toLowerCase()

  if (lineType !== 'string') {
    throw new TypeError(`line was not a string; was a ${lineType}`)
  }

  let id = 0
  // -- match each pattern as many times as possible using `matchAll`
  for (const pattern of patterns.filter(pattern => pattern.length >0)) {
    // -- note: does not work with strings;
    allMatches.push(...matchPatterns(line, pattern))
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

  if (options.displayWholeLine && allMatches.length > 0) {
    const maxId = allMatches[allMatches.length - 1].id
    return displayText[maxId](line, options)
  }

  // -- colourise and sequence by id.
  utils
    .sequenceBy(hasSameId, sequence)
    .forEach(stretch => {
      const chars = stretch.map(stretchData => stretchData.char).join('')
      const id = stretch[0].id

      output += formatText(chars, id, options)
    })

  return output
}

const highlightInput = (args, reader) => {
  const outEmitter = new events.EventEmitter()

  // -- a function to determine how text is printed.
  const patterns = patternUtils.getPatterns(args)

  reader(line => {
    // -- format the text to print
    const formatted = printLine(patterns, line, {
      invert: args.invert,
      displayWholeLine: args.displayWholeLine
    })

    // print the text
    if (args.display) {
      const fd = fs.openSync('/dev/tty', 'r+')
      const ttyOut = tty.WriteStream(fd, { })

      ttyOut.write(formatted + '\n')
    }

    // emit the line
    outEmitter.emit('line', {
      before: line,
      after: formatted
    })
  })

  return outEmitter
}

module.exports = {
  highlightInput,
  printLine
}
