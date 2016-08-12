import AFRAME from 'aframe'

AFRAME.registerComponent('laser', {
  schema: {
    speed: { default: 1 }
  },

  tick: function() {
    this.update();
  },


  update: function () {
    var object3D = this.el.object3D;
    this.el.object3D.translateZ(-0.5);
  }
});
