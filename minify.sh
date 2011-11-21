#!/bin/bash
#
# Minifies the Javascript using the Google Closure Compiler
#
# First do simple file concatenation to create 'dev' version...
# 

cat js/utils.js \
	js/Vector2.js \
	js/Vector3.js \
	js/Timer.js \
	js/Resources.js \
	js/ui/Component.js \
	js/ui/Screen.js \
	js/ui/Panel.js \
	js/ui/LoadingScreen.js \
	js/Host.js \
	> umukino.dev.js

#
# The minify the hell out of it!!!
#

java -jar tools/compiler.jar \
	--js=umukino.dev.js \
	--js_output_file=umukino.min.js \
	--output_wrapper="/* Umukino :: Copyright Rowan Seymour 2011 :: https://github.com/rowanseymour/umukino */ %output%"
	

