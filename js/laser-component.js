import AFRAME from 'aframe'

AFRAME.registerComponent('laser', {
  schema: {
    speed: { default: 0.5 }
  },

  tick: function() {
    var object3D = this.el.object3D;
    this.el.object3D.translateZ(-this.data.speed);
  }
});
