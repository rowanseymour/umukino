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
 * Basic 2D vector class
 */
function Vector2(x, y) {
	this.x = x;
	this.y = y;
	
	/**
	 * Clones this array
	 */
	this.clone = function() {
		return new Vector2(this.x, this.y);
	};
	
	/**
	 * Adds the given vector to this vector and returns the result
	 */
	this.add = function(v) {
		return new Vector2(this.x + v.x, this.y + v.y);
	};
	
	/**
	 * Subtracts the given vector from this vector and returns the result
	 */
	this.subtract = function(v) {
		return new Vector2(this.x - v.x, this.y - v.y);
	};
	
	/**
	 * Scales this vector and returns the result
	 */
	this.scale = function(s) {
		return new Vector2(this.x * s, this.y * s);
	};
	
	/**
	 * Gets the dot product of this vector and the given vector
	 */
	this.dot = function(v) {
		return this.x * v.x + this.y * v.y;
	};
	
	/**
	 * Calculates the length of this vector
	 */
	this.length = function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	};
	
	/**
	 * Calculates the squared length of this vector
	 */
	this.length2 = function() {
		return this.x * this.x + this.y * this.y;
	};
	
	/**
	 * Equality test
	 */
	this.equals = function(v) {
		return this.x == v.x && this.y == v.y;
	};
}