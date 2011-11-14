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

	this.addAudio = function(key, src) {
		this.audio[key] = new Audio();
		this.audio[key].preload = 'none';
		this.audio[key].src = src;
		++this.count;
	};
	
	this.load = function() {
		this.loadedCount = 0;
		
		// Load all audio resources
		for (var key in this.audio) {
			var a = this.audio[key];
			this._bindEvent(a, "canplaythrough", this._onResourceLoad);
			a.load();
		}
	};
	
	this._bindEvent = function(elem, evName, callback){
		return elem.addEventListener(evName, function listener() {
			elem.removeEventListener(evName, listener);
			return callback.apply(this, arguments);
		}, true);
	};
	
	this._onResourceLoad = function() {
		++this.loadedCount;
		
		if (this.loadedCount == this.count)
			this.onLoaded();
	};
}