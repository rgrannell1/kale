#!/usr/bin/env node

"use strict"





const constants = require('../commons/constants')





const docs = `
Name:
	kale — test network connections to a URL.
Usage:
	kale [-e | --regexp] [-f | --fixed-string] [-g | --group-regexp] <pattern>...
	kale (-h | --help | --version)

Description:

	Kale (colour-tail -> cail -> kale) behaves similarily to tail's live-follow mode, but with
	extra support for highlighting streamed text.

	1. Each literal string or regexp match is automatically highlighted with a seperate style.
	2. A style can be manually provided for each match.
	3. Capturing groups can be treated as seperate matches.

Options:
	-e, --regexp                               Treat provided patterns as non-capture group regular expressions.
	-f, --fixed-string                         Treat provided patterns as literal strings.
	-g, --group-regexp                         Treat provided patterns as capture group regular expressions.
	-h, --help                                 Display this documentation.
	--version                                  Display the package version.

Arguments:
	<pattern>...                              The pattern to match with.

Authors:
	${constants.packageJson.author}

Version:
	v${constants.packageJson.version}
`




const docopt  = require('docopt').docopt
const callApp = require('../cli/call-app')





const args = Object.assign({

}, docopt(docs))





callApp(args)
