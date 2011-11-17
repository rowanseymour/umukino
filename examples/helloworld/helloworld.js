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
 
var CANVAS_SIZE_X = 400;
var CANVAS_SIZE_Y = 200;
var TICK_MS = 25;

/**
 * Game content
 */
var helloworld = {	
	/**
	 * Initializes the game
	 */
	onInit: function() {	
		this.draw();
	},

	/**
	 * Updates the game every frame
	 */ 	
	onUpdate: function() {
		this.draw();
	},
	
	/**
	 * Draws the canvas
	 */
	draw: function() {
		var canvas = document.getElementById("canvas");  
		var gfx = canvas.getContext("2d");
		gfx.font = "20pt Courier";
		
		// Draw  background
		gfx.fillStyle = "#000";
		gfx.fillRect(0, 0, CANVAS_SIZE_X, CANVAS_SIZE_Y);
		
		// Draw text
		var green = Math.floor(127 * (Math.sin(this.host.time / 50) + 1));
		gfx.fillStyle = "rgb(0, " + green + ", 0)";;
		gfx.fillText("Hello world!", 5, 30);
	}
}
