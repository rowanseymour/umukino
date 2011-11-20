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
};