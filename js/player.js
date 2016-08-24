import AFRAME from 'aframe'
import { stop_asteroids } from './throwingAsteroidsAtYouTest.js'

AFRAME.registerComponent('player', {
	schema: {
		lives: {type: 'number', default: 5}
	},
	init: function() {
		var self = this
		this.el.addEventListener('hit', function() {
			self.removeLife()
		})
	},
	removeLife: function(){
		this.data.lives -= 1;
		console.log("now has " + this.data.lives)

		if (this.data.lives == 0)
		{
			stop_asteroids()
			document.getElementById('text').emit('stop');
		}
	}
})
