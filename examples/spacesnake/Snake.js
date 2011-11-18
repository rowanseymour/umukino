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
 
var TRAIL_LENGTH = 15;

/**
 * The snake
 */
function Snake(head, length) {
	this.head = head;
	this.tail = new Array();
	this.flare = new Array();
	this.movement = MOVE_RIGHT;
	this.dead = false;
	
	// Build the initial tail
	for (var t = 1; t <= length; ++t){
		this.tail.push(new Vector2(head.x - t, head.y));
	}
	
	// Build the flare
	for (var t = length + 1; t <= length + TRAIL_LENGTH; ++t){
		this.flare.push(new Vector2(head.x - t, head.y));
	}
	
	/**
	 * Updates the snake every frame
	 */
	this.update = function(keys) {
		// Change snake movement based on keys. Don't allow snake to move back on
		// itself and give priority to a change in direction, i.e. a different key
		// than the last update
		if (37 in keys && keys[37] && this.movement != MOVE_LEFT && this.movement != MOVE_RIGHT) {
			this.movement = MOVE_LEFT;
		} else if (38 in keys && keys[38] && this.movement != MOVE_UP && this.movement != MOVE_DOWN) {
			this.movement = MOVE_UP;
		} else if (39 in keys && keys[39] && this.movement != MOVE_RIGHT && this.movement != MOVE_LEFT) {
			this.movement = MOVE_RIGHT;
		} else if (40 in keys && keys[40] && this.movement != MOVE_DOWN && this.movement != MOVE_UP) {
			this.movement = MOVE_DOWN;
		}
		
		// Update tail
		this.tail.unshift(this.head.clone());
		var tailEnd = this.tail.pop();
		
		// Update flare
		this.flare.unshift(tailEnd);
		this.flare.pop();
		
		// Move head to new position
		this.head = this.head.add(this.movement);
		
		// Wrap back into board
		if (this.head.x >= CELLS_X)
			this.head.x = 0;
		if (this.head.x < 0)
			this.head.x = CELLS_X - 1;
		if (this.head.y >= CELLS_Y)
			this.head.y = 0;
		if (this.head.y < 0)
			this.head.y = CELLS_Y - 1;
			
		// Check to see if we've eaten ourself
		for (var t = 0; t < this.tail.length; ++t) {
			if (this.head.equals(this.tail[t]))
				this.dead = true;
		}
	};
	
	/**
	 * Draws the snake
	 */
	this.draw = function(gfx) {
		// Draw trail
		for (var t = 0; t < this.flare.length; ++t) {
			var alpha = (this.flare.length - t) / (this.flare.length * 2);
			board.drawCell(gfx, this.flare[t].x, this.flare[t].y, "rgba(255, 128, 0, " + alpha + ")");
		}
			
		// Draw tail
		for (var t = 0; t < this.tail.length; ++t)
			board.drawCell(gfx, this.tail[t].x, this.tail[t].y, "#d4ad68");
		
		// Then the head
		board.drawCell(gfx, this.head.x, this.head.y, this.dead ? "#F00" : "#FFF");
	};
	
	/**
	 * Grows the snake
	 */
	this.grow = function() {
		// Duplicate the head as a new start of tail
		this.tail.unshift(this.head.clone());
	};
	
	/**
	 * Test to see if given cell is part of the snake
	 */
	this.hitTest = function(cell) {
		if (this.head.equals(cell))
			return true;
		for (var t = 0; t < this.tail.length; ++t) {
			if (this.tail[t].equals(cell))
				return true;
		}
		return false;
	};
}