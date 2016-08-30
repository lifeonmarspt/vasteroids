import AFRAME from 'aframe'
import Vasteroids from './vasteroids-logic.js'

AFRAME.registerComponent('player', {
	schema: {
		lives: {type: 'number', default: 5}
	},
	init: function() {
		this.el.addEventListener('hit', this.removeLife.bind(this))
	},
	removeLife: function(){
		this.data.lives -= 1;

		if (this.data.lives == 0)
		{
			document.querySelector('[flasher]').emit('final-flash')
			Vasteroids.stop_asteroids()
			document.querySelector('[start-button]').emit('restart');
			document.querySelector('#text').emit('stop');
			this.data.lives = 5
		}
		else
			document.querySelector('[flasher]').emit('flash')
	}
})
