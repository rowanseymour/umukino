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
 * Game content
 */
var game = {	
	/**
	 * Starts a new game
	 */ 
	onStart: function() {
	},
	
	/**
	 * Updates the game every frame
	 */ 	
	onUpdate: function(time) {
		this._draw(time);
	},
	
	/**
	 * Draws the canvas
	 */
	_draw: function(time) { 
		var states = ["Loading", "Ready", "Hello world!", "Paused", "Finished"];
	
		var gfx = this.host.canvas.getContext("2d");
		gfx.font = "20pt Courier";
		
		// Draw  background
		gfx.fillStyle = "#000";
		gfx.fillRect(0, 0, this.host.canvas.width, this.host.canvas.height);
		
		// Draw text
		var green = Math.floor(127 * (Math.sin(time / 50) + 1));
		gfx.fillStyle = "rgb(0, " + green + ", 0)";
		gfx.fillText(states[this.host.state], 5, 30);
	}
}
