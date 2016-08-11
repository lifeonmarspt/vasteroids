import AFRAME from 'aframe'

AFRAME.registerComponent('spawner', {
  schema: {
    on: { default: 'click' },
    mixin: { default: '' }
  },

  update: function () {

    var el = this.el;
    var spawn = this.spawn.bind(this);
    var hovered = this.hovered.bind(this)

    if (this.on === this.data.on) { return; }

    el.removeEventListener(this.on, spawn);
    el.addEventListener(this.data.on, spawn);
    el.addEventListener('raycaster-intersected', hovered);
    this.on = this.data.on;
  },

  hovered: function() {
    console.log("thanks for hovering me!")
  },

  spawn: function () {

    var el = this.el;
    var matrixWorld = el.object3D.matrixWorld;
    var position = new THREE.Vector3();
    position.setFromMatrixPosition(matrixWorld);
    var entity = document.createElement('a-entity');
    entity.setAttribute('position', position);
    entity.setAttribute('mixin', this.data.mixin);
    el.sceneEl.appendChild(entity);
  }
});
