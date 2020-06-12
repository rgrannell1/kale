
const stripAnsiStream = require('strip-ansi-stream')
const split = require('split')
const {
  console,
  process
} = require('../commons/builtins')

const handleErrors = source => error => {
  console.error('')
  console.error(`Kale received a stream error from the stream "${source}":`)
  console.error(error.message)
  console.error('+++++++++++')
  console.error(error.stack)
  console.error('')
  process.exit(1)
}

/**
 * Read content from standard input, delimited by lines.
 *
 * @param {Function} onLine a function to process each line of text from stdin
 */
const readStdin = onLine => {
  process.stdin
    .on('error', handleErrors('stdin'))
    .pipe(stripAnsiStream())
    .on('error', handleErrors('strip-ansi-stream'))
    .pipe(split())
    .on('error', handleErrors('split'))
    .on('data', onLine)
    .on('end', () => {
      process.exit(0)
    })
}

module.exports = readStdin
