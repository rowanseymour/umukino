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
 * Used as a namespace hierarchy
 */
var umu = { ui: {} };
 
/**
 * Syntactic sugar for Javascript pseudo-inheritance
 */
function __extends(clazz, obj, params) {
	// Call "sub class" constructor on the given object
	clazz.apply(obj, params);
}

/**
 * Used to retain a super class method on the __super object
 */
function __retain(fname, obj) {
	eval("obj.super$" + fname + " = obj." + fname);
}/**
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
 * Basic 2D vector class
 */
function Vector2(x, y) {
	this.x = x;
	this.y = y;
}

/**
 * Clones this vector
 */
Vector2.prototype.clone = function() {
	return new Vector2(this.x, this.y);
};

/**
 * Adds the given vector to this vector and returns the result
 */
Vector2.prototype.add = function(v) {
	return new Vector2(this.x + v.x, this.y + v.y);
};

/**
 * Subtracts the given vector from this vector and returns the result
 */
Vector2.prototype.subtract = function(v) {
	return new Vector2(this.x - v.x, this.y - v.y);
};

/**
 * Scales this vector and returns the result
 */
Vector2.prototype.scale = function(s) {
	return new Vector2(this.x * s, this.y * s);
};

/**
 * Gets the dot product of this vector and the given vector
 */
Vector2.prototype.dot = function(v) {
	return this.x * v.x + this.y * v.y;
};

/**
 * Calculates the length of this vector
 */
Vector2.prototype.length = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y);
};

/**
 * Calculates the squared length of this vector
 */
Vector2.prototype.length2 = function() {
	return this.x * this.x + this.y * this.y;
};

/**
 * Equality test
 */
Vector2.prototype.equals = function(v) {
	return (this == v) || (this.x == v.x && this.y == v.y);
};/**
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
 * Basic 3D vector class
 */
function Vector3(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
}

/**
 * Clones this vector
 */
Vector3.prototype.clone = function() {
	return new Vector3(this.x, this.y, this.z);
};

/**
 * Adds the given vector to this vector and returns the result
 */
Vector3.prototype.add = function(v) {
	return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
};

/**
 * Subtracts the given vector from this vector and returns the result
 */
Vector3.prototype.subtract = function(v) {
	return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
};

/**
 * Scales this vector and returns the result
 */
Vector3.prototype.scale = function(s) {
	return new Vector3(this.x * s, this.y * s, this.z * s);
};

/**
 * Gets the dot product of this vector and the given vector
 */
Vector3.prototype.dot = function(v) {
	return this.x * v.x + this.y * v.y + this.z * v.z;
};

/**
 * Calculates the length of this vector
 */
Vector3.prototype.length = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
};

/**
 * Calculates the squared length of this vector
 */
Vector3.prototype.length2 = function() {
	return this.x * this.x + this.y * this.y + this.z * this.z;
};

/**
 * Equality test
 */
Vector3.prototype.equals = function(v) {
	return (this == v) || (this.x == v.x && this.y == v.y && this.z == v.z);
};/**
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
umu.Timer = function(host, callback, idleMs) {
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
}/**
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
 * Loads and manages resources
 */
umu.Resources = function() {
	this.imagePaths = new Array();
	this.audioPaths = new Array();
	this.count = 0
	this.loadedCount = 0;
	
	// Create local var for callbacks
	var resources = this;
	
	/**
	 * Adds an image resource
	 */
	this.addImage = function(key, src) {
		this.imagePaths.push([key, src]);
		++this.count;
	};

	/**
	 * Adds an audio resource
	 */
	this.addAudio = function(key, src) {
		this.audioPaths.push([key, src]);
		++this.count;
	};
	
	/**
	 * Loads all resources
	 */
	this.load = function(onLoaded, onProgress) {
		this.loadedCount = 0;
		this.onLoaded = onLoaded;
		this.onProgress = onProgress;
		this.image = new Object();
		this.audio = new Object();
		
		// Load all image resources
		for (var r = 0; r < this.imagePaths.length; ++r) {
			var key = this.imagePaths[r][0];
			var src = this.imagePaths[r][1];		
			this.image[key] = new Image();		
			//this._bindEvent(this.image[key], "onload", this._onResourceLoad);
			this.image[key].onload = this._onResourceLoad;
			this.image[key].src = src;
		}
		
		// Load all audio resources
		for (var r = 0; r < this.audioPaths.length; ++r) {
			var key = this.audioPaths[r][0];
			var src = this.audioPaths[r][1];		
			this.audio[key] = new Audio(src);		
			this._bindEvent(this.audio[key], "canplaythrough", this._onResourceLoad);
			this.audio[key].load();
		}
	};
	
	/**
	 * Binds a callback to an event on a DOM element, so that it will
	 * only be called once and will get this loader as an argument
	 */
	this._bindEvent = function(elem, name, callback) {
		return elem.addEventListener(name, function listener() {
			elem.removeEventListener(name, listener);
			return callback();
		}, true);
	};
	
	/**
	 * Called when a resource has been loaded
	 */
	this._onResourceLoad = function() {
		++resources.loadedCount;
		
		// Invoke the progress callback with the percentage of resources loaded
		if (typeof resources.onProgress === 'function') {
			resources.onProgress(100.0 * resources.loadedCount / resources.count);
		}
		
		// Invoke loaded callback if all resources are loaded
		if (resources.loadedCount == resources.count && typeof resources.onLoaded === 'function') {
			resources.onLoaded();
		}
	};
};/**
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

umu.ui.Component = function(parent, x, y, width, height) {
	this.parent = parent;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.children = [];
	this.layout_x = parent ? parent.layout_x + x: 0;
	this.layout_y = parent ? parent.layout_y + y: 0;
	
	if (this.parent) {
		this.parent.children.push(this);
	}
	
	this.draw = function(gfx) {};
	
	this.drawChildren = function(gfx) {
		for (var c = 0; c < this.children.length; ++c) {
			var child = this.children[c];
			gfx.translate(child.x, child.y);
			child.draw(gfx);
			child.drawChildren(gfx);
			gfx.translate(-child.x, -child.y);
		}
	}
};/**
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
 
umu.ui.Screen = function(canvas) {
	__extends(umu.ui.Component, this, [null, 0, 0, canvas.width, canvas.height]);
	
	this.canvas = canvas;
	
	this.draw = function() {
		this.drawChildren(this.canvas.getContext("2d"));
	};
};/**
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
 
umu.ui.Panel = function(parent, x, y, width, height, fillStyle) {
	__extends(umu.ui.Component, this, [parent, x, y, width, height]);
	
	this.fillStyle = fillStyle;
	
	this.draw = function(gfx) {
		gfx.fillStyle = this.fillStyle;
		gfx.fillRect(0, 0, this.width, this.height);
	};
};

umu.ui.Label = function(parent, x, y, width, height, fillStyle, text) {
	__extends(umu.ui.Panel, this, [parent, x, y, width, height, fillStyle]);
	__retain("draw", this);
	
	this.text = text;

	this.draw = function(gfx) {
		this.super$draw(gfx);
		
		gfx.textAlign = "center";
		gfx.textBaseline = "middle";
		gfx.fillStyle = "#000";
		gfx.fillText(this.text, this.width / 2, this.height / 2);
	};
};/**
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
 * Loading screen
 */
umu.ui.LoadingScreen = function(canvas) {
	__extends(umu.ui.Screen, this, [canvas]);
	
	this.progress = 0;

	this.draw = function() {
		var gfx = this.canvas.getContext("2d");
		gfx.font = "20pt Courier";
		
		// Clear canvas
		gfx.fillStyle = "#000";
		gfx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		
		// Write progress
		gfx.fillStyle = "#FFF";;
		gfx.fillText("Loading:" + this.progress + "%", 5, this.canvas.height - 5);
	};
};/**
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
umu.Host = function(game, resources, canvasId, idleMs) {
	this.game = game;
	this.game.host = this;
	this.resources = resources;
	this.canvas = null;
	
	this.state = STATE_LOADING;
	this.id = ++game_count;
	
	this.updatePrevTime = 0;
	this.updateTimeAvg = 0;
	
	// Create a local var that references this object,
	// which we can use inside callbacks
	var host = this;
	
	// Have jQuery call our _init method when the DOM is ready
	$(document).ready(function() { host._init(idleMs); });
	
	// Setup key event listening
	this.keys = new Array();
	document.onkeydown = function(event) { host.keys[event.keyCode] = true; event.preventDefault(); }
	document.onkeyup = function(event) { host.keys[event.keyCode] = false; event.preventDefault(); }
	
	/**
	 * Initializes the game so it's ready to start
	 */
	this._init = function(idleMs) {
		this.timer = new umu.Timer(this, this.update, idleMs);
		this.canvas = document.getElementById(canvasId);
		this.loadingScreen = new umu.ui.LoadingScreen(this.canvas);
	
		// Load resources
		if (this.resources) {
			this.resources.load(host._onFinishLoad, function(progress) {
				host.loadingScreen.progress = progress;
				host.loadingScreen.draw();
			});
		}
		else
			this._onFinishLoad();
	};
	
	this._onFinishLoad = function() {
		// Invoke game callback to load anything extra
		if (typeof host.game.onLoaded === 'function') {
			host.game.onLoaded();
		}
		
		$('#start').show();
		
		host.state = STATE_READY;
		
		// Start timer to get updates
		host.timer.start();
	};
	
	/**
	 * Starts the game
	 */
	this.start = function() {
		if (typeof host.game.onStart === 'function') {
			host.game.onStart();
		}
		
		host.resume();
		
		$('#start').hide();
		$('#restart').show();
	};
	
	/**
	 * Updates the game every frame
	 */
	this.update = function(time) {
		// Invoke game's update
		if (typeof host.game.onUpdate === 'function') {
			host.game.onUpdate(time);
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
	};
	
	/**
	 * Finishes the game
	 */
	this.finish = function() {
		this.state = STATE_FINISHED;
		
		$('#pause').hide();
		
		if (typeof this.game.onFinish === 'function')
			this.game.onFinish();
	}
	
	/**
	 * Restarts the game
	 */
	this.restart = function() {		
		$('#start').show();
		$('#pause').hide();
		$('#resume').hide();
		$('#restart').hide();
		
		this.state = STATE_READY;
		
		if (typeof this.game.onRestart === 'function')
			this.game.onRestart();
	};
	
	/**
	 * Calulates the smoothed FPS
	 */
	this.getFPS = function() {
		return this.updateTimeAvg == 0 ? 0 : Math.floor(1000 / this.updateTimeAvg);
	};
};