import AFRAME from 'aframe'

AFRAME.registerComponent('spawner', {
  schema: {
    on: { default: 'click' },
  },

  update: function () {
    this.el.sceneEl.addEventListener(this.data.on, this.spawn.bind(this));
  },

  spawn: function () {
    var camPos = this.el.getAttribute('position');
    var camRot = this.el.getAttribute('rotation');

    var entity = document.createElement('a-entity');

    //TODO: Extract to mixin, if possible
    //dependency on camPos and camRot might make that difficult, investigate
    entity.setAttribute('geometry', "primitive: box; height: 0.1; width: 0.1; depth: 1; buffer: false;");
    entity.setAttribute('position', camPos);
    entity.setAttribute('rotation', camRot);
    entity.setAttribute('laser', true);
    entity.setAttribute('distance-limiter', true);
    entity.setAttribute('sound', "src: #laser-sound; autoplay: true");
    entity.setAttribute('raycaster', 'near: 0.1; far: 1; objects: .collidable;')

    this.el.sceneEl.appendChild(entity);
  }
});
