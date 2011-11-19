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
 
umu.ui.Panel = function(parent, x, y, width, height, fillStyle) {
	__extends(umu.ui.Component, this, [parent, x, y, width, height]);
	
	this.fillStyle = fillStyle;
	
	this.draw = function(gfx) {
		gfx.fillStyle = fillStyle;
		gfx.fillRect(0, 0, this.width, this.height);
	};
};

umu.ui.Label = function(parent, x, y, width, height, fillStyle, text) {
	__extends(umu.ui.Panel, this, [parent, x, y, width, height, fillStyle]);
	
	this.text = text;
	
	this.draw = function(gfx) {
		gfx.fillStyle = fillStyle;
		gfx.fillRect(0, 0, this.width, this.height);
		
		gfx.textAlign = "center";
		gfx.textBaseline = "middle";
		gfx.fillStyle = "#000";
		gfx.fillText(this.text, this.width / 2, this.height / 2);
	};
};