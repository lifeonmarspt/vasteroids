import AFRAME from 'aframe'

AFRAME.registerComponent('spawner', {
  schema: {
    on: { default: 'click' },
    mixin: { default: '' }
  },

  update: function () {

    var el = this.el;
    var spawn = this.spawn.bind(this);

    if (this.on === this.data.on) { return; }

    el.removeEventListener(this.on, spawn);
    el.addEventListener(this.data.on, spawn);

    this.on = this.data.on;
  },

  spawn: function () {
    console.log("click! spawn")
    var el = this.el;
    var matrixWorld = el.object3D.matrixWorld;

    var camPos = document.getElementById('player').getAttribute('position');
    var camRot = document.getElementById('player').getAttribute('rotation')
    var entity = document.createElement('a-entity');

    entity.setAttribute('geometry', "primitive: box; height: 0.1; width: 0.1; depth: 2");
    entity.setAttribute('position', camPos);
    entity.setAttribute('rotation', camRot);

    entity.setAttribute('laser', true);
    entity.setAttribute('collider', true);



    window.laser = entity
    el.sceneEl.appendChild(entity);
  }
});
