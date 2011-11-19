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
};