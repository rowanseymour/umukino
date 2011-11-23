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
 
function utilsTest() {
	this.a = new A(123);
	this.b = new B(456);
}

registerTestSuite(utilsTest);

/**
 * Base class with one field and two methods
 */
A = function(val) {
	this.aVal = val;
	
	this.noOverrideFunc = function() { return 'a'; };
	this.overriddenFunc = function() { return 'A'; };
};

/**
 * Subclass B that adds anew field and overrides one of A's methods
 */	
B = function(val) {
	__extends(A, this, [789]);
	__retains("A$overriddenFunc", this);
	
	this.bVal = val;
	
	this.overriddenFunc = function() { return 'B'; };	
};

/**
 * Tests that a subclass contains its fields plus that of its superclass
 */
utilsTest.prototype.extendsFields = function() {
	expectEq(123, this.a.aVal);
	expectEq(789, this.b.aVal);
	expectEq(456, this.b.bVal);
};

/**
 * Tests that a subclass contains its methods plus that of its superclass, and
 * methods with the same name are overridden in the subclass
 */
utilsTest.prototype.extendsMethods = function() {
	expectEq('a', this.a.noOverrideFunc());
	expectEq('A', this.a.overriddenFunc());
	expectEq('a', this.b.noOverrideFunc());
	expectEq('B', this.b.overriddenFunc());
};

/**
 * Tests that a superclass method can be retained with the specified new identifier
 */
utilsTest.prototype.retainsMethod = function() {
	expectEq('A', this.b.A$overriddenFunc());
};