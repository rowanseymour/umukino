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
 * Class for loading and managing resources
 */
function Resources() {
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
}