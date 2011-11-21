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
 
function ResourcesTest() {
	this.resources = new umu.Resources();
	this.onLoaded = createMockFunction();
	this.onProgress = createMockFunction();	
}

registerTestSuite(ResourcesTest);

ResourcesTest.prototype.add = function() {
	this.resources.addImage("image1", "test.png");
	this.resources.addImage("image2", "test.gif");
	this.resources.addAudio("audio1", "test.mp3");
	this.resources.addAudio("audio2", "test.ogg");
	
	expectEq(4, this.resources.count);
};

ResourcesTest.prototype.load = function() {
	this.resources.addImage("image1", "test.png");
	this.resources.addAudio("audio1", "test.mp3");
	
	this.resources.load(this.onLoaded, this.onProgress);
	
	expectTrue(this.resources.image.image1 instanceof Image);
	expectTrue(this.resources.audio.audio1 instanceof Audio);
};
