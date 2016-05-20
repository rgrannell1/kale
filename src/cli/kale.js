#!/usr/bin/env node

"use strict"





const constants = require('../commons/constants')





const docs = `
Name:
	kale — hightlight streamed text.
Usage:
	kale [-e | --regexp] [-f | --fixed-string] [-g | --group-regexp] <pattern>...
	kale [-d | --default]
	kale (-h | --help | --version)

Description:

	Kale (colour-tail -> cail -> kale) behaves similarily to tail's live-follow mode, but with
	extra support for highlighting streamed text.

	1. Each literal string or regexp match is automatically highlighted with a seperate style.
	2. Capturing groups can be treated as seperate matches.

Options:
	-d, --default         Default, log-format agnostic highlighting.
	-e, --regexp          Treat provided patterns as non-capture group regular expressions.
	-f, --fixed-string    Treat provided patterns as literal strings.
	-g, --group-regexp    Treat provided patterns as capture group regular expressions.
	-h, --help            Display this documentation.
	--version             Display the package version.

Arguments:
	<pattern>...          The text or regular expression pattern(s) to highlight.

Authors:
	${ constants.packageJson.author }

Version:
	v${ constants.packageJson.version }

Copyright:

	The MIT License

	Copyright (c) 2016 Ryan Grannell

	Permission is hereby granted, free of charge, to any person obtaining a copy of this
	software and associated documentation files (the "Software"), to deal in the Software
	without restriction, including without limitation the rights to use, copy, modify, merge,
	publish, distribute, sublicense, and/or sell copies of the Software, and to permit
	persons to whom the Software is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies
	or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
	INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
	PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
	OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	OTHER DEALINGS IN THE SOFTWARE.

`





const docopt  = require('docopt').docopt
const callApp = require('../cli/call-app')





const args = docopt(docs)





callApp(args)
