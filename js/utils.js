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
 * Used as a namespace hierarchy
 */
var umu = { ui: {} };
 
/**
 * Syntactic sugar for Javascript pseudo-inheritance
 */
function __extends(clazz, obj, params) {
	// Call "sub class" constructor on the given object
	clazz.apply(obj, params);
}

/**
 * Used to retain a super class method on the __super object
 */
function __retain(fname, obj) {
	eval("obj.super$" + fname + " = obj." + fname);
}