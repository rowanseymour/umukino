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
 
function Vector3Test() {}

registerTestSuite(Vector3Test);

Vector3Test.prototype.clone = function() {
	var vec1 = new Vector3(1, 2, 3);
	var vec2 = vec1.clone();
	expectEq(vec2.x, 1);
	expectEq(vec2.y, 2);
	expectEq(vec2.z, 3);
};

Vector3Test.prototype.add = function() {
	var vec1 = new Vector3(1, 2, 3);
	var vec2 = new Vector3(3, 4, 5);
	var vec3 = vec1.add(vec2);
	expectEq(vec3.x, 4);
	expectEq(vec3.y, 6);
	expectEq(vec3.z, 8);
};

Vector3Test.prototype.subtract = function() {
	var vec1 = new Vector3(1, 2, 3);
	var vec2 = new Vector3(3, 6, 1);
	var vec3 = vec1.subtract(vec2);
	expectEq(vec3.x, -2);
	expectEq(vec3.y, -4);
	expectEq(vec3.z, 2);
};

Vector3Test.prototype.scale = function() {
	var vec1 = new Vector3(1, 2, 3);
	var vec2 = vec1.scale(0.5);
	expectEq(vec2.x, 0.5);
	expectEq(vec2.y, 1);
	expectEq(vec2.z, 1.5);
};

Vector3Test.prototype.dot = function() {
	var vec1 = new Vector3(1, 2, 3);
	var vec2 = new Vector3(3, 4, 5);
	expectEq(vec1.dot(vec2), 26);
};

Vector3Test.prototype.length = function() {
	var vec1 = new Vector3(3, 4, 5);
	expectEq(vec1.length(), Math.sqrt(50));
};

Vector3Test.prototype.length2 = function() {
	var vec1 = new Vector3(3, 4, 5);
	expectEq(vec1.length2(), 50);
};

Vector3Test.prototype.equals = function() {
	var vec1 = new Vector3(1, 2, 3);
	var vec2 = new Vector3(1, 2, 3);
	var vec3 = new Vector3(3, 4, 5);
	expectTrue(vec1.equals(vec2));
	expectFalse(vec1.equals(vec3));
};
