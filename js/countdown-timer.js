import AFRAME from 'aframe';

AFRAME.registerComponent('countdown-timer', {
	init: function() {
		var time = 0
		var self = this;
		var interval;

		this.el.addEventListener('start', function(){

		    var animTrans = document.createElement('a-animation');
		    animTrans.setAttribute('dur', '750');
		    animTrans.setAttribute('attribute', 'position');
		    animTrans.setAttribute('fill', 'forwards');
		    animTrans.setAttribute('easing', 'ease-out');
		    animTrans.setAttribute('to', '0 5 -15');

		    self.el.appendChild(animTrans)

			interval = setInterval(function(){
			//console.log("ooo")
			self.el.setAttribute('text', `text: Time: ${time}`)
			time += 50
		}, 50)
		})

		this.el.addEventListener('stop', function(){
			clearInterval(interval)
			interval = null
		})

	}
})
