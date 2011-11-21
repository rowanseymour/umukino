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
	expectEq(1, vec2.x);
	expectEq(2, vec2.y);
	expectEq(3, vec2.z);
};

Vector3Test.prototype.add = function() {
	var vec1 = new Vector3(1, 2, 3);
	var vec2 = new Vector3(3, 4, 5);
	var vec3 = vec1.add(vec2);
	expectEq(4, vec3.x);
	expectEq(6, vec3.y);
	expectEq(8, vec3.z);
};

Vector3Test.prototype.subtract = function() {
	var vec1 = new Vector3(1, 2, 3);
	var vec2 = new Vector3(3, 6, 1);
	var vec3 = vec1.subtract(vec2);
	expectEq(-2, vec3.x);
	expectEq(-4, vec3.y);
	expectEq(2, vec3.z);
};

Vector3Test.prototype.scale = function() {
	var vec1 = new Vector3(1, 2, 3);
	var vec2 = vec1.scale(0.5);
	expectEq(0.5, vec2.x);
	expectEq(1, vec2.y);
	expectEq(1.5, vec2.z);
};

Vector3Test.prototype.dot = function() {
	var vec1 = new Vector3(1, 2, 3);
	var vec2 = new Vector3(3, 4, 5);
	expectEq(26, vec1.dot(vec2));
};

Vector3Test.prototype.length = function() {
	var vec1 = new Vector3(3, 4, 5);
	expectEq(Math.sqrt(50), vec1.length());
};

Vector3Test.prototype.length2 = function() {
	var vec1 = new Vector3(3, 4, 5);
	expectEq(50, vec1.length2());
};

Vector3Test.prototype.equals = function() {
	var vec1 = new Vector3(1, 2, 3);
	var vec2 = new Vector3(1, 2, 3);
	var vec3 = new Vector3(3, 4, 5);
	expectTrue(vec1.equals(vec2));
	expectFalse(vec1.equals(vec3));
};
