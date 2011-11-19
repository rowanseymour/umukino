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

umu.ui.Component = function(parent, x, y, width, height) {
	this.parent = parent;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.children = [];
	this.layout_x = parent ? parent.layout_x + x: 0;
	this.layout_y = parent ? parent.layout_y + y: 0;
	
	if (this.parent) {
		this.parent.children.push(this);
	}
	
	this.draw = function(gfx) {};
	
	this.drawChildren = function(gfx) {
		for (var c = 0; c < this.children.length; ++c) {
			var child = this.children[c];
			gfx.translate(child.x, child.y);
			child.draw(gfx);
			child.drawChildren(gfx);
			gfx.translate(-child.x, -child.y);
		}
	}
};