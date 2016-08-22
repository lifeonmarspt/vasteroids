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
    var camPos = this.el.getAttribute('position');
    var camRot = this.el.getAttribute('rotation')

    var entity = document.createElement('a-entity');

    entity.setAttribute('geometry', "primitive: box; height: 0.1; width: 0.1; depth: 2");
    entity.setAttribute('position', camPos);
    entity.setAttribute('rotation', camRot);

    entity.setAttribute('laser', true);
    entity.setAttribute('collider', "targetSet: #asteroids");
    entity.setAttribute('distance-limiter', true);
    entity.setAttribute('sound', "src: #laser-sound; autoplay: true");

    this.el.sceneEl.appendChild(entity);
    window.laser = entity;
  }
});
