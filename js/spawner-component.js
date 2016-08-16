import AFRAME from 'aframe'

AFRAME.registerComponent('spawner', {
  schema: {
    on: { default: 'click' },
    mixin: { default: '' }
  },

  update: function (oldData) {
    if (this.data.on === oldData.on) { return; }

    var spawn = this.spawn.bind(this);

    this.el.removeEventListener(oldData.on, spawn);
    this.el.addEventListener(this.data.on, spawn);
  },

  spawn: function () {
    console.log("click! spawn")

    var camPos = this.el.getAttribute('position');
    var camRot = this.el.getAttribute('rotation')

    var entity = document.createElement('a-entity');

    entity.setAttribute('geometry', "primitive: box; height: 0.1; width: 0.1; depth: 2");
    entity.setAttribute('position', camPos);
    entity.setAttribute('rotation', camRot);

    entity.setAttribute('laser', true);
    entity.setAttribute('collider', true);
    entity.setAttribute('distance-limiter', true);

    this.el.sceneEl.appendChild(entity);
    window.laser = entity;
  }
});
