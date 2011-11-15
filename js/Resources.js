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
	this.image = new Object();
	this.audio = new Object();
	this.count = 0
	this.loadedCount = 0;
	this.onLoaded = onLoaded;

	/**
	 * Adds an audio resource
	 */
	this.addAudio = function(key, src) {
		this.audio[key] = new Audio();
		this.audio[key].preload = 'none';
		this.audio[key].src = src;
		++this.count;
	};
	
	/**
	 * Loads all resources
	 */
	this.load = function() {
		this.loadedCount = 0;
		
		// Load all audio resources
		for (var key in this.audio) {
			var a = this.audio[key];
			this._bindEvent(a, "canplaythrough", this._onResourceLoad);
			a.load();
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
		
		if (loader.loadedCount == loader.count)
			loader.onLoaded();
	};
}