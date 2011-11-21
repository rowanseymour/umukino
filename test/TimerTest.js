/**
 * This file is part of Umukino
 * 
 * Umukino is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Umukino is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Umukino.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Copyright Rowan Seymour 2011
 */

/**
 * Mock version as Google JS Testing doesn't include DOM functions
 */
function setTimeout(script, time) {
	eval(script);
}

/**
 * Mock version as Google JS Testing doesn't include DOM functions
 */
function clearTimeout(script, time) {
}
 
function TimerTest() {
	this.onTick = createMockFunction();
	this.timer1 = new umu.Timer(this.onTick, 1);
	this.timer2 = new umu.Timer(this.onTick, 1000);
}

registerTestSuite(TimerTest);

TimerTest.prototype.checkInit = function() {	
	// Check that global vars are created
	expectEq(2, umu.timerCount);
	expectEq(this.timer1, umu.timer[0]);
	expectEq(this.timer2, umu.timer[1]);
}

TimerTest.prototype.checkCallback = function() {
	// Check that callback gets called
	var timer = this.timer1;
	expectCall(this.onTick)(_).willOnce(function(){ timer.stop(); });
	
	this.timer1.start();
}
