import AFRAME from 'aframe'

AFRAME.registerComponent('laser', {

  init: function () {
    this.el.addEventListener('raycaster-intersection', function (e) {
      e.detail.els[0].emit('hit')
      this.sceneEl.removeChild(this)
    });
  },

  tick: function() {
    var object3D = this.el.object3D;
    this.el.object3D.translateZ(-0.5);
  }
});
