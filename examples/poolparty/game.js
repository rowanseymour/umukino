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
 
var CANVAS_SIZE_X = 600;
var CANVAS_SIZE_Y = 300;
var NUM_BALLS = 20;
var BALL_RADIUS = 10;
var TICK_MS = 25;
var colors = [ "#F00", "#F00", "#F00", "#FF0", "#F0F", "#0FF", "00F" ];
 
/**
 * Game content
 */
var game = {
	spotlight: new Vector2(CANVAS_SIZE_X / 2, CANVAS_SIZE_Y / 2),
	balls: [],
	 
	/**
	 * Starts a new game
	 */ 
	onStart: function() {
		// Create the balls
		this.balls = [];
		for (var b = 0; b < NUM_BALLS; ++b) {
			var randPosX = (CANVAS_SIZE_X - BALL_RADIUS * 2) * Math.random() + BALL_RADIUS;
			var randPosY = (CANVAS_SIZE_Y - BALL_RADIUS * 2) * Math.random() + BALL_RADIUS;
			var randVelX = (Math.random() - 0.5) * 6;
			var randVelY = (Math.random() - 0.5) * 6;
			var randColor = colors[Math.floor(Math.random() * colors.length)];
			this.balls.push(new Ball(new Vector2(randPosX, randPosY), new Vector2(randVelX, randVelY), randColor));
		}
	},

	/**
	 * Updates the game every frame
	 */ 	
	onUpdate: function(time) {
		if (this.host.state == STATE_READY) {
			this._drawReady();
		} if (this.host.state == STATE_RUNNING) {
			this._updateRunning(time);
		} else if (this.host.state == STATE_PAUSED) {
			this._drawPaused();
		} else if (this.host.state == STATE_FINISHED) {
			this._drawFinished();
		}
	},
	
	_updateRunning: function(time) {
		// Update spotlight
		this.spotlight.x = Math.floor(CANVAS_SIZE_X / 2 + 30 * Math.sin(time / 200));
		this.spotlight.y = Math.floor(CANVAS_SIZE_Y / 2 + 30 * Math.cos(123 + time / 300));
	
		// Update balls
		for (var b1 = 0; b1 < NUM_BALLS; ++b1) {
			var ball1 = this.balls[b1];
			var ball1NewPos = ball1.position.add(ball1.velocity);
			
			// Check for collisions with walls
			if (ball1NewPos.x - BALL_RADIUS < 0 || ball1NewPos.x + BALL_RADIUS > CANVAS_SIZE_X){
	  			ball1.velocity.x = -ball1.velocity.x;
			}
			if (ball1NewPos.y - BALL_RADIUS < 0 || ball1NewPos.y + BALL_RADIUS > CANVAS_SIZE_Y){
	  			ball1.velocity.y = -ball1.velocity.y;
			}
			
			// Check for collisions with other balls
			for (var b2 = b1 + 1; b2 < NUM_BALLS; ++b2) {		
				var ball2 = this.balls[b2];
				
				// Check bounding boxes of new positions first
				var ball2NewPos = ball2.position.add(ball2.velocity);
				var delta = ball1NewPos.subtract(ball2NewPos);
				if ((Math.abs(delta.x) < BALL_RADIUS * 2) && (Math.abs(delta.y) < BALL_RADIUS * 2)) {
					
					// Then check distance to be more accurate (slower)
					if (delta.length2() < (BALL_RADIUS * BALL_RADIUS * 4)) {
						
						// Calculate vector from first ball to second ball
						var between = ball2.position.subtract(ball1.position);
						var betLength = between.length();
						var cosTh = between.x / betLength;
						var sinTh = between.y / betLength;
						
						// Calculate each ball's velocity along that vector
						var vc1 = new Vector2(ball1.velocity.x * cosTh + ball1.velocity.y * sinTh, ball1.velocity.y * cosTh - ball1.velocity.x * sinTh);
						var vc2 = new Vector2(ball2.velocity.x * cosTh + ball2.velocity.y * sinTh, ball2.velocity.y * cosTh - ball2.velocity.x * sinTh);
						// Check signs for collision (i.e. are the balls moving together or apart)
						if ((vc1.x < 0 && vc2.x > 0) || (!vc1.x && !vc2.x))
							continue;
							
						// Calculate new velocities away from collision
						var vc1n = new Vector2(vc2.x, vc1.y);
						var vc2n = new Vector2(vc1.x, vc2.y);
	
						// Transform velocities back into xy space
						ball1.velocity.x = vc1n.x * cosTh - vc1n.y * sinTh;
						ball1.velocity.y = vc1n.x * sinTh + vc1n.y * cosTh;
					
						ball2.velocity.x = vc2n.x * cosTh - vc2n.y * sinTh;
						ball2.velocity.y = vc2n.x * sinTh + vc2n.y * cosTh;
						
						resources.audio.ballhit.play();
					}
				}
			}
			
			// Update ball position based on calculated velocity 
			ball1.position = ball1.position.add(ball1.velocity);
		}
		
		this._applyFriction(1.5);
	
		this._draw();
		
		$("#fps").html(this.host.getFPS());
	},
	
	/**
	 * Draws the canvas
	 */
	_draw: function() { 
		var gfx = this.host.canvas.getContext("2d");
		
		// Draw table cloth
		gfx.fillStyle = "#070";
		gfx.fillRect(0, 0, CANVAS_SIZE_X, CANVAS_SIZE_Y);
		
		// Draw ball shadows
		for (var b = 0; b < NUM_BALLS; ++b) {
			this.balls[b].drawShadow(gfx);
		}
		
		// Draw spotlight
		var spotGrad = gfx.createRadialGradient(this.spotlight.x, this.spotlight.y, 0, this.spotlight.x, this.spotlight.y, 150);
    	spotGrad.addColorStop(0, "rgba(255,255,255,0.5)");
    	spotGrad.addColorStop(0.25, "rgba(255,255,255,0.25)");
    	spotGrad.addColorStop(0.5, "rgba(255,255,255,0.125)");
    	spotGrad.addColorStop(0.75, "rgba(255,255,255,0.00625)");
    	spotGrad.addColorStop(1, "rgba(255,255,255,0)");
    	gfx.fillStyle = spotGrad;
    	gfx.fillRect(0, 0, CANVAS_SIZE_X, CANVAS_SIZE_Y);
		
		// Draw lines on table
		gfx.beginPath();
		gfx.arc(450, 150, 50, 3 * Math.PI / 2, Math.PI / 2, false);
		gfx.closePath();
		gfx.moveTo(450, 0);
		gfx.lineTo(450, 300);
		gfx.stroke();
		
		// Draw balls
		for (var b = 0; b < NUM_BALLS; ++b) {
			this.balls[b].draw(gfx);
		}
	},
	
	_drawReady: function() {
		var gfx = this.host.canvas.getContext("2d");
	},
	
	_drawPaused: function() {
		var gfx = this.host.canvas.getContext("2d");
	},
	
	_drawFinished: function() {
		var gfx = this.host.canvas.getContext("2d");
	},
	
	/** 
	 * Applies friction to slow the balls and returns whether all the balls have stopped moving
	 */
	_applyFriction: function(minSpeed) {
		var minSpeed2 = minSpeed * minSpeed;
		var allStopped = true;
		for (var b = 0; b < NUM_BALLS; ++b) {
			var ball = this.balls[b];
			
			// Scale velocity
			ball.velocity = ball.velocity.scale(0.99);
			
			// Apply min speed threshold
			if (ball.velocity.length2 < minSpeed2) {
				ball.velocity = new Vector2(0, 0);
			} else {
				allStopped = false;
			}
		}
		return allStopped;
	}
}
