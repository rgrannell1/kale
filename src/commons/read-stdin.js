
const readline = require('readline')

/**
 * Read content from standard input, delimited by lines.
 *
 * @param {Function} onLine a function to process each line of text from stdin
 */
const readStdin = onLine => {
  readline.createInterface({ input: process.stdin })
    .on('line', onLine)
    .on('close', () => {
      process.exit(0)
    })
}

module.exports = readStdin
