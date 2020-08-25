import AFRAME from 'aframe';

AFRAME.registerComponent('countdown-timer', {
  init: function() {
    var time = 0
    var interval;

    this.el.addEventListener('start', function() {
      this.setAttribute('text', `align: center; value: Time: 0`)
      time = 0;
      interval = setInterval(function() {
        this.setAttribute('text', `align: center; value: Time: ${time.toFixed(1)}`);
        time += 0.1;
      }.bind(this), 100);
    });

    this.el.addEventListener('stop', function() {
      this.el.setAttribute('text', `align: center; value: Score: ${time.toFixed(1)}`)
      clearInterval(interval)
      interval = null
    }.bind(this));
  }
})

