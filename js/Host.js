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
 * Host to run the given game
 */
function Host(game, resources, canvasId, updateMs) {
	this.game = game;
	this.game.host = this;
	this.resources = resources;
	this.canvas = null;
	
	this.loadingScreen = new LoadingScreen();
	
	this.state = STATE_LOADING;
	this.id = ++game_count;
	this.timerId = 0;
	
	this.updateMs = updateMs;
	this.time = new Date().getTime();
	this.updatePrevTime = 0;
	this.updateTimeAvg = 0;
	
	// Create a global var that references this object,
	// which we can use in the setTimeout callback
	eval("$host_" + this.id + " = this;");
	
	// Create a local var that references this object,
	// which we can use inside callbacks
	var host = this;
	
	// Have jQuery call our load method when the DOM is ready
	$(document).ready(function() { host.load(); });
	
	// Setup key event listening
	this.keys = new Array();
	document.onkeydown = function(event) { host.keys[event.keyCode] = true; event.preventDefault(); }
	document.onkeyup = function(event) { host.keys[event.keyCode] = false; event.preventDefault(); }
	
	/**
	 * Loads the game so it's ready to start
	 */
	this.load = function() {
		this.canvas = document.getElementById(canvasId);
	
		// Load resources
		if (this.resources) {
			this.resources.load(host._onFinishLoad, function(progress) {
				host.loadingScreen.drawProgress(host.canvas, progress);
			});
		}
		else
			this._onFinishLoad();
	};
	
	this._onFinishLoad = function() {
		// Load game
		if (typeof host.game.onLoad === 'function') {
			host.game.onLoad();
		}
		
		$('#start').show();
		
		host.state = STATE_READY;
	}
	
	/**
	 * Starts the game
	 */
	this.start = function() {
		if (typeof this.game.onStart === 'function') {
			this.game.onStart();
		}
		
		this.resume();
		
		$('#start').hide();
		$('#restart').show();
	};
	
	/**
	 * Updates the game every frame
	 */
	this.update = function() {
		// Get the timestamp for this update
		this.time = new Date().getTime();
		
		if (typeof this.game.onUpdate === 'function') {
			this.game.onUpdate();	
		}
		
		// Request next frame if game is still running
		if (this.state == STATE_RUNNING) {
			this._requestNextUpdate();
		}
		
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
	this.restart = function() {
		clearTimeout(this.timerId);
		
		$('#start').show();
		$('#pause').hide();
		$('#resume').hide();
		$('#restart').hide();
		
		this.start();
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
		this.timerId = setTimeout("$host_" + this.id + ".update()", this.updateMs);
	}
}