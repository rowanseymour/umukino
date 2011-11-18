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
 
// Globals   	
var CANVAS_SIZE_X = 500;
var CANVAS_SIZE_Y = 500;
var CELL_SIZE = 10;
var CELLS_X = CANVAS_SIZE_X / CELL_SIZE;
var CELLS_Y = CANVAS_SIZE_Y / CELL_SIZE;
var TICK_MS = 100;
var INIT_TAIL_SIZE = 5;
var MOVE_UP = new Vector(0, -1);
var MOVE_DOWN = new Vector(0, 1);
var MOVE_LEFT = new Vector(-1, 0);
var MOVE_RIGHT = new Vector(1, 0);
 
/**
 * Game content
 */
var game = {
	items: [],
		
	/**
	 * Starts a new game
	 */ 
	onStart: function() {
		this.snake = new Snake(new Vector(CELLS_X / 2, CELLS_Y / 2), INIT_TAIL_SIZE);
		this.items = new Array(new Item(this.randomFreeCell()));
		
		$('#score').text("0");
	},

	/**
	 * Updates the game every frame
	 */
	onUpdate: function(time) {	
		if (this.host.state == STATE_READY) {
			this._drawReady(time);
		} if (this.host.state == STATE_RUNNING) {
			this._updateRunning(time);
		} else if (this.host.state == STATE_PAUSED) {
			//this._drawPaused();
		} else if (this.host.state == STATE_FINISHED) {
			//this._drawFinished();
		}
	},
	
	_updateRunning: function(time) {
		this.snake.update(this.host.keys);
		
		// Has snake eaten an item?
		for (var i = 0; i < this.items.length; ++i) {
			var item = this.items[i];
			if (this.snake.head.equals(item.position)) {
				// Remove this item and add another
				this.items.splice(i, 1);
				this.items.push(new Item(this.randomFreeCell()));
				
				// Grow the snake
				this.snake.grow();
			
				// Update the score and play sound
				$('#score').html(parseInt($('#score').html()) + 1);
				resources.audio.munch.play();
			}
		}
		
		// Has the snake eaten itself? If so game over
		if (this.snake.dead) {
			resources.audio.explosion.play();
			this.host.finish();
		}
			
		this._draw();
		
		$("#fps").html(this.host.getFPS());
	},
	
	/**
	 * Draws the canvas
	 */
	_draw: function() {
		var gfx = this.host.canvas.getContext("2d");
	
		board.draw(gfx);
		
		// Draw items
		for (var i = 0; i < this.items.length; ++i)
			this.items[i].draw(gfx);
		
		// Draw the snake
		this.snake.draw(gfx);
	},
	
	/**
	 * Draws the ready screen
	 */
	_drawReady: function(time) {
		var gfx = this.host.canvas.getContext("2d");
		gfx.font = "bold 20px arial,sans-serif";
		
		// Clear canvas
		gfx.fillStyle = "#000";
		gfx.fillRect(0, 0, this.host.canvas.width, this.host.canvas.height);
	
		// Draw logo
		var img = resources.image.logo;
		var x = this.host.canvas.width / 2 - img.width / 2;
		var y = this.host.canvas.height / 2 - img.height / 2;
		gfx.drawImage(img, x, y);
		
		// Draw flashing start message
		if ((Math.floor(time / 500) % 2) == 0) {
			var message = "PRESS START";
			var msgWidth = gfx.measureText(message).width;
			gfx.fillStyle = "#FFF";
			gfx.fillText(message, this.host.canvas.width / 2 - msgWidth / 2, 3 * this.host.canvas.height / 4);
		}
	},
	
	/**
	 * Returns a random free cell, i.e. not occupied by the snake or any other item 
	 */
	randomFreeCell: function() {
		while (true) {
			var cell = new Vector(Math.floor(Math.random() * CELLS_X), Math.floor(Math.random() * CELLS_Y));
			
			// Check this cell isn't occupied by the snake
			if (this.snake.hitTest(cell))
				continue;
			
			// Or another item	
			for (var i = 0; i < this.items.length; ++i) {
				if (cell.equals(this.items[i].position))
					continue;
			}
			
			return cell;
		}
	}
}