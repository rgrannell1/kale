
const command = {
  name: 'pre-commit',
  // -- note: linting is disabled for the moment
  dependencies: ['depcheck']
}

command.cli = `
Usage:
  script pre-commit

Description:
  Run precommit checks against this repository.

Options:
  --params PARAMS
`

command.task = async args => { }

module.exports = command
