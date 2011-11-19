#!/bin/bash
#
# Minifies the Javascript using Googe's Closure Compiler

java -jar tools/compiler.jar \
	--js=js/utils.js \
	--js=js/Vector2.js \
	--js=js/Timer.js \
	--js=js/Resources.js \
	--js=js/ui/Component.js \
	--js=js/ui/Screen.js \
	--js=js/ui/Panel.js \
	--js=js/ui/LoadingScreen.js \
	--js=js/Host.js \
	--js_output_file=umukino.min.js \
	--compilation_level=WHITESPACE_ONLY \
	--output_wrapper="/* Umukino :: Copyright Rowan Seymour 2011 */ %output%"
	
cat js/utils.js \
	js/Vector2.js \
	js/Timer.js \
	js/Resources.js \
	js/ui/Component.js \
	js/ui/Screen.js \
	js/ui/Panel.js \
	js/ui/LoadingScreen.js \
	js/Host.js \
	> umukino.dev.js
