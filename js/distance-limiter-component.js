import AFRAME from 'aframe';

AFRAME.registerComponent('distance-limiter', {
  schema: {
    maxDistance: { type: 'int', default: 50 },
    minDistance: { type: 'number', default: 0.1 },
    minDistanceTarget: { type: 'selector' }

  },

  tick: function () {
    if (this.el.object3D.position.length() > this.data.maxDistance) {
      this.el.parentNode.removeChild(this.el);
    } else if (this.el.object3D.position.length() < this.data.minDistance) {
      document.getElementById('player').emit('hit')
      this.el.parentNode.removeChild(this.el);
    }
  }
});
