import AFRAME from 'aframe';
import Vasteroids from './vasteroids-logic.js'

AFRAME.registerComponent('start-button', {
  init: function() {
  	var self = this
    this.el.addEventListener('hit', this.startTimer.bind(this));
    this.el.addEventListener('restart', this.restart.bind(this));
  },
  startTimer: function() {
  	if (this.el.getAttribute('material').visible == "false")
  		return
  	this.el.setAttribute('class', "not-collidable");
  	this.el.setAttribute('material', 'visible: false;');
    document.getElementById('text').emit('start');
    document.querySelector('[flasher]').setAttribute('sound', "src: #shield-sound; on: flash;")
    Vasteroids.start_asteroids();
  },
  restart: function() {
 	this.el.setAttribute('material', 'visible: true;');
 	this.el.setAttribute('class', "collidable");
 }
})
