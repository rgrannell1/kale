
const {
  console,
  process
} = require('../commons/builtins')

const userFailingErrorMesasage = `Something has went terribly wrong!
Please report the following error message to https://github.com/rgrannell1/kale/issues,
(along with the input text if possible):
`

const handleErrors = err => {
  if (err.code) {
    console.error(err.message)
  } else {
    console.error(userFailingErrorMesasage)

    console.error(err.message)
    console.error(err.stack)
  }

  process.exit(1)
}

module.exports = handleErrors
