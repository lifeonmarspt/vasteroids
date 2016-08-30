import AFRAME from 'aframe';

AFRAME.registerComponent('countdown-timer', {
	init: function() {
		var time = 0
		var interval;

		this.el.addEventListener('start', function(){
			this.setAttribute('text', `text: Time: 0`)
			time = 0
			interval = setInterval(function(){
			//console.log("ooo")
			this.setAttribute('text', `text: Time: ${time}`)
			time += 1
		}.bind(this), 1000)
		})

		this.el.addEventListener('stop', function(){
			this.el.setAttribute('text', `text: END OF LINE, score: ${time}`)
			clearInterval(interval)
			interval = null
		}.bind(this))

	}
})

