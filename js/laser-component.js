import AFRAME from 'aframe'

AFRAME.registerComponent('laser', {
  schema: {
    speed: { default: 1 }
  },

  init: function () {
    this.el.sceneEl.addBehavior(this);
    this.originalRotation = document.getElementById('player').object3D.rotation
    this.el.object3D.setRotationFromEuler(this.originalRotation)
    this.el.object3D.rotateX(Math.PI / 2)
    this.el.object3D.rotationAutoUpdate = false


    window.laser = this
  },

  tick: function() {
    this.update()
  },

  update: function () {
    var object3D = this.el.object3D;
    //this.el.object3D.translateY(-1)
  }
});
