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
 * Class for creating repeated callbacks with some idle time in between
 */
function Timer(host, callback, idleMs) {
	this.host = host;
	this.callback = callback;
	this.idleMs = idleMs;
	this.timerId = 0;

	// Create a global var that references this object,
	// which we can use in the setTimeout callback
	eval("$timer_" + this.id + " = this;");
	
	/**
	 * Starts the timer
	 */
	this.start = function() {
		this._requestNextTick();
	};
	
	/**
	 * Stops the timer
	 */
	this.stop = function() {
		clearTimeout(this.timerId);
	};
	
	/**
	 * Request next timer tick after some idle time
	 */
	this._requestNextTick = function() {
		this.timerId = setTimeout("$timer_" + this.id + "._tick()", this.idleMs);
	};
	
	/**
	 * Called each timer tick
	 */
	this._tick = function() {
		var time = new Date().getTime();
		this.callback.apply(this.host, [time]);
		
		// Request next timer tick
		this._requestNextTick();
	};
}