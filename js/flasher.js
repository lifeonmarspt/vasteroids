import AFRAME from 'aframe';

AFRAME.registerComponent('flasher', {
	init: function() {
		this.el.setAttribute('material', 'transparent: true; opacity: 0.0;')
		this.el.setAttribute('geometry', 'primitive: box; width: 1000; height: 1000; depth: 0.5;')
		this.el.addEventListener('flash', this.flash.bind(this))
		this.el.addEventListener('final-flash', this.finalFlash.bind(this))
	},
	flash: function() {
		this.el.setAttribute('material', 'transparent: true; opacity: 1.0;')
		var opacity = document.createElement('a-animation');
		opacity.setAttribute('dur', '750');
		opacity.setAttribute('attribute', 'material.opacity');
		opacity.setAttribute('fill', 'forwards');
		opacity.setAttribute('easing', 'ease-out');
		opacity.setAttribute('from', '1');
		opacity.setAttribute('to', '0');

		this.el.appendChild(opacity)
	},
	//TODO: I'm pretty sure this is the name of an attack on dragon ball or something
	finalFlash: function() {
		this.el.setAttribute('material', 'transparent: true; opacity: 1.0;')
		this.el.setAttribute('sound', "src: #final-shield-sound; autoplay: true")
		var opacity = document.createElement('a-animation');
		opacity.setAttribute('dur', '1250');
		opacity.setAttribute('attribute', 'material.opacity');
		opacity.setAttribute('fill', 'forwards');
		opacity.setAttribute('easing', 'ease-out');
		opacity.setAttribute('from', '1');
		opacity.setAttribute('to', '0');

		this.el.appendChild(opacity)
	}
})
