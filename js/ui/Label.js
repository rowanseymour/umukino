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
 
umu.ui.Label = function(parent, x, y, width, height, fillStyle, text) {
	__extends(umu.ui.Panel, this, [parent, x, y, width, height, fillStyle]);
	__retains("Panel$draw", this);
	
	this.text = text;

	this.draw = function(gfx) {
		this.Panel$draw(gfx);
		
		gfx.textAlign = "center";
		gfx.textBaseline = "middle";
		gfx.fillStyle = "#000";
		gfx.fillText(this.text, this.width / 2, this.height / 2);
	};
};
