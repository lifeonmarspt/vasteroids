import AFRAME from 'aframe';
import { start_asteroids } from './throwingAsteroidsAtYouTest.js'

AFRAME.registerComponent('start-button', {
  init: function() {

    this.el.addEventListener('hit', function() {

      this.parentNode.removeChild(this);
      document.getElementById('text').emit('start');
      start_asteroids();
    }, false)
  }
})
