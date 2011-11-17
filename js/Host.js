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
var STATE_LOADING = 0;
var STATE_READY = 1;
var STATE_RUNNING = 2;
var STATE_PAUSED = 3;
var STATE_FINISHED = 4;
var game_count = 0;

/**
 * Hosts the given game
 */
function Host(game, updateMs) {
	this.game = game;
	this.game.host = this;
	
	this.state = STATE_LOADING;
	this.id = ++game_count;
	this.timerId = 0;
	
	this.time = new Date().getTime();
	this.updateMs = updateMs;
	this.updatePrevTime = 0;
	this.updateTimeAvg = 0;
	
	this.keys = new Array();
	
	// Create a global var that references this object,
	// which we can use in the setTimeout callback
	eval("game_" + this.id + " = this;");
	
	/**
	 * Initializes the game so it's ready to start
	 */
	this.init = function() {
		if (typeof this.game.onInit === 'function')
			this.game.onInit();
			
		var host = this;		
		document.onkeydown = function(event) { host.keys[event.keyCode] = true; event.preventDefault(); }
		document.onkeyup = function(event) { host.keys[event.keyCode] = false; event.preventDefault(); }
		
		this.state = STATE_READY;
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
	 * Updates the game every frame
	 */
	this.update = function() {
		// Get the timestamp for this update
		this.time = new Date().getTime();
		
		if (typeof this.game.onUpdate === 'function')
			this.game.onUpdate();	
		
		// Request next frame if game is still running
		if (this.state == STATE_RUNNING)
			this._requestNextUpdate();
		
		// Calculate smoothed frame update time
		var updateTime = (new Date()).getTime();
		if (this.updatePrevTime > 0) {
			if (this.updateTimeAvg > 0)
				this.updateTimeAvg = this.updateTimeAvg * 0.95 + (updateTime - this.updatePrevTime) * 0.05;
			else 
				this.updateTimeAvg = updateTime - this.updatePrevTime;
		}
		this.updatePrevTime = updateTime;
	};
	
	/**
	 * Pauses the game
	 */
	this.pause = function() {
		clearTimeout(this.timerId);
		
		this.state = STATE_PAUSED;
		
		$('#pause').hide();
		$('#resume').show();
		
		if (typeof this.game.onPause === 'function')
			this.game.onPause();	
	};
	
	/**
	 * Resumes the game
	 */
	this.resume = function() {
		if (typeof this.game.onResume === 'function')
			this.game.onResume();	
			
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
		
		if (typeof this.game.onFinish === 'function')
			this.game.onFinish();
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
		
		if (typeof this.game.onReset === 'function')
			this.game.onReset();
		
		this.init();
	};
	
	/**
	 * Calulates the smoothed FPS
	 */
	this.getFPS = function() {
		return this.updateTimeAvg == 0 ? 0 : Math.floor(1000 / this.updateTimeAvg);
	};
	
	/**
	 * Requests the next update call
	 */
	this._requestNextUpdate = function() {
		this.timerId = setTimeout("game_" + this.id + ".update()", this.updateMs);
	}
}