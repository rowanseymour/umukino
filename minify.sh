#!/bin/bash
#
# Minifies the Javascript using Googe's Closure Compiler

java -jar tools/compiler.jar \
	--js=js/utils.js \
	--js=js/Vector2.js \
	--js=js/Timer.js \
	--js=js/LoadingScreen.js \
	--js=js/Resources.js \
	--js=js/Host.js \
	--js_output_file=umukino.min.js \
	--output_wrapper="/* Umukino :: Copyright Rowan Seymour 2011 */ %output%"
