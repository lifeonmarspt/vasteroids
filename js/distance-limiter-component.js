import AFRAME from 'aframe';

AFRAME.registerComponent('distance-limiter', {
  schema: {
    maxDistance: { type: 'int', default: 50 },
    minDistance: { type: 'number', default: 0.1 }
  },

  tick: function () {
    if (this.el.object3D.position.length() > this.data.maxDistance ||
        this.el.object3D.position.length() < this.data.minDistance) {
      this.el.parentNode.removeChild(this.el);
    }
  }
});
