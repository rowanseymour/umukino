/**
 * Basic 2D vector class
 */
function Vector(x, y) {
	this.x = x;
	this.y = y;
	
	/**
	 * Clones this array
	 */
	this.clone = function() {
		return new Vector(this.x, this.y);
	}
	
	/**
	 * Adds the given vector to this vector and returns the result
	 */
	this.add = function(v) {
		return new Vector(this.x + v.x, this.y + v.y);
	};
	
	/**
	 * Subtracts the given vector from this vector and returns the result
	 */
	this.subtract = function(v) {
		return new Vector(this.x - v.x, this.y - v.y);
	};
	
	/**
	 * Scales this vector and returns the result
	 */
	this.scale = function(s) {
		return new Vector(this.x * s, this.y * s);
	};
	
	/**
	 * Gets the dot product of this vector and the given vector
	 */
	this.dot = function(v) {
		return this.x * v.x + this.y * v.y;
	};
	
	/**
	 * Gets the inverse of this vector
	 */
	this.inverse = function() {
		return new Vector(-this.x, -this.y);
	}
	
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