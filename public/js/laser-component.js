AFRAME.registerComponent('laser', {
  schema: {
    speed: { default: 0.5 }
  },
  init: function () {
    this.el.addEventListener('raycaster-intersection', function (e) {
      e.detail.els[0].emit('hit')
      this.sceneEl.removeChild(this)
    });
  },
  tick: function() {
    this.el.object3D.translateZ(-this.data.speed);
  }
});
