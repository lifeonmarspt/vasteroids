import AFRAME from 'aframe';

AFRAME.registerComponent('distance-limiter', {
  schema: {
    maxDistance: { type: 'int', default: 100 }
  },

  tick: function () {
    if (this.el.object3D.position.length() > this.data.maxDistance) {
      this.el.parentNode.removeChild(this.el);
    }
  }
});
