#!/bin/bash
#
# Runs unit tests using Google JS Test

gjstest --js_files=umukino.dev.js,test/mocks.js,\
test/Vector2Test.js,\
test/Vector3Test.js,\
test/TimerTest.js,\
test/ResourcesTest.js