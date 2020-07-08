
const path = require('path')
const depcheck = require('@rgrannell/depcheck')

const command = {
  name: 'depcheck',
  dependencies: []
}

command.cli = `
Usage:
  script depcheck

Description:
  Assert there are no unused dependencies in the the project
`

command.task = async args => {
  const fpath = path.join(__dirname, '../../')
  await depcheck(fpath)
}

module.exports = command
