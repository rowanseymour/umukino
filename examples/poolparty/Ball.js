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
 * Ball objects which have a position and velocity
 */
function Ball(position, velocity, color) {
	this.position = position;
	this.velocity = velocity;
	this.color = color;
	
	/**
	 * Draws the ball
	 */
	this.draw = function(gfx) {
		// Draw sphere
		gfx.beginPath();
		gfx.arc(this.position.x, this.position.y, BALL_RADIUS, 0, 2 * Math.PI, false);
		gfx.fillStyle = this.color;
		gfx.fill();
		
		// Draw highlight
		var offsetX = 5 * (this.position.x - game.spotlight.x) / CANVAS_SIZE_X;
		var offsetY = 5 * (this.position.y - game.spotlight.y) / CANVAS_SIZE_Y;
		gfx.beginPath();
		gfx.arc(this.position.x - offsetX, this.position.y - offsetY, BALL_RADIUS / 3, 0, 2 * Math.PI, false);
		gfx.fillStyle = "rgba(255, 255, 255, 0.75)";
		gfx.fill();
	};
	
	/**
	 * Draws the shadow
	 */
	this.drawShadow = function(gfx) {
		var offsetX = 15 * (this.position.x - game.spotlight.x) / CANVAS_SIZE_X;
		var offsetY = 15 * (this.position.y - game.spotlight.y) / CANVAS_SIZE_Y;
		gfx.beginPath();
		gfx.arc(this.position.x + offsetX, this.position.y + offsetY, BALL_RADIUS, 0, 2 * Math.PI, false);
		gfx.fillStyle = "rgba(0, 0, 0, 0.25)";
		gfx.fill();
	};
}