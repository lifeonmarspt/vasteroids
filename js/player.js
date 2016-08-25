import AFRAME from 'aframe'
import { stop_asteroids } from './throwingAsteroidsAtYouTest.js'

AFRAME.registerComponent('player', {
	schema: {
		lives: {type: 'number', default: 5}
	},
	init: function() {
		this.el.addEventListener('hit', this.removeLife.bind(this))
	},
	removeLife: function(){
		this.data.lives -= 1;
		console.log("now has " + this.data.lives)

		document.querySelector('[flasher]').emit('flash')
		if (this.data.lives == 0)
		{
			stop_asteroids()
			document.querySelector('[start-button]').emit('restart');
			document.querySelector('#text').emit('stop');
			this.data.lives = 5
		}
	}
})
