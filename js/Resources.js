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
function Resources(onLoaded) {
	this.imagePaths = new Array();
	this.audioPaths = new Array();
	this.count = 0
	this.loadedCount = 0;
	this.onLoaded = onLoaded;
	
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
	this.load = function() {
		this.loadedCount = 0;
		this.image = new Object();
		this.audio = new Object();
		
		// Load all image resources
		for (var a = 0; a < this.imagePaths.length; ++a) {
			var key = this.imagePaths[a][0];
			var src = this.imagePaths[a][1];		
			this.image[key] = new Image(src);		
			this._bindEvent(this.image[key], "onload", this._onResourceLoad);
			this.image[key].load();
		}
		
		// Load all audio resources
		for (var a = 0; a < this.audioPaths.length; ++a) {
			var key = this.audioPaths[a][0];
			var src = this.audioPaths[a][1];		
			this.audio[key] = new Audio(src);		
			this._bindEvent(this.audio[key], "canplaythrough", this._onResourceLoad);
			this.audio[key].load();
		}
	};
	
	/**
	 * Binds a callback to an event on a DOM element, so that it will
	 * only be called once and will get this loader as an argument
	 */
	this._bindEvent = function(elem, name, callback, arguments) {
		// Thanks to Javascript weirdness, the callback might not get this object
		// as it's this reference, so we have to explicitly pass it as an argument
		var loader = this;
		
		return elem.addEventListener(name, function listener() {
			elem.removeEventListener(name, listener);
			return callback.apply(this, [loader]);
		}, true);
	};
	
	/**
	 * Called when a resource has been loaded
	 */
	this._onResourceLoad = function(loader) {		
		++loader.loadedCount;
		
		if (loader.loadedCount == loader.count && typeof loader.onLoaded == 'function') {
			loader.onLoaded();
		}
	};
}