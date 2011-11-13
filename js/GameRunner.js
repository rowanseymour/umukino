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
 
// Globals 
var STATE_NOTREADY = 0;
var STATE_READY = 1;
var STATE_RUNNING = 2;
var STATE_PAUSED = 3;
var STATE_FINISHED = 4;
var runner_count = 0;

/**
 * Creates a game runner for the given game
 */
function GameRunner(game, updateMs) {
	this.game = game;
	this.game.runner = this;
	this.updateMs = updateMs;
	this.state = STATE_NOTREADY;
	this.id = ++runner_count;
	this.timerId = 0;
	
	// Create a global var that references this object,
	// which we can use in the setTimeout callback
	eval("runner_" + this.id + " = this;");
	
	/**
	 * Initializes the game so it's ready to start
	 */
	this.init = function() {
		if (typeof this.game.init === 'function')
			this.game.init();
		
		this.state = STATE_READY;
	};
	
	/**
	 * Updates the game every frame
	 */
	this.update = function() {
		if (typeof this.game.update === 'function')
			this.game.update();	
		
		// Request next frame if game is still running
		if (this.state == STATE_RUNNING)
			this._requestNextUpdate();
	};
	
	/**
	 * Starts the game
	 */
	this.start = function() {
		this.resume();
		
		$('#start').hide();
		$('#pause').show();
		$('#reset').show();
	};
	
	/**
	 * Pauses the game
	 */
	this.pause = function() {
		clearTimeout(this.timerId);
		
		this.state = STATE_PAUSED;
		
		$('#pause').hide();
		$('#resume').show();
		
		if (typeof this.game.pause === 'function')
			this.game.pause();	
	};
	
	/**
	 * Resumes the game
	 */
	this.resume = function() {
		this.state = STATE_RUNNING;
		
		$('#pause').show();
		$('#resume').hide();
		
		this._requestNextUpdate();
	};
	
	/**
	 * Finishes the game
	 */
	this.finish = function() {
		clearTimeout(this.timerId);
		
		this.state = STATE_FINISHED;
		
		$('#pause').hide();
		
		if (typeof this.game.finish === 'function')
			this.game.finish();
	}
	
	/**
	 * Resets the game
	 */
	this.reset = function() {
		clearTimeout(this.timerId);
		
		$('#start').show();
		$('#pause').hide();
		$('#resume').hide();
		$('#reset').hide();
		
		if (typeof this.game.reset === 'function')
			this.game.reset();
		
		this.init();
	};
	
	/**
	 * Requests the next update call
	 */
	this._requestNextUpdate = function() {
		this.timerId = setTimeout("runner_" + this.id + ".update()", this.updateMs);
	}
}