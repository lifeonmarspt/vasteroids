AFRAME.registerComponent('spawner', {
  schema: {
    on: { default: 'click' },
  },

  update: function () {
    this.el.sceneEl.addEventListener(this.data.on, this.spawn.bind(this));
  },

  spawn: function () {
    const camPos = this.el.getAttribute('position');
    const camRot = this.el.getAttribute('rotation');

    const entity = document.createElement('a-entity');

    entity.setAttribute('geometry', "primitive: box; height: 0.1; width: 0.1; depth: 1; buffer: false;");
    entity.setAttribute('position', camPos);
    entity.setAttribute('rotation', camRot);
    entity.setAttribute('laser', {});
    entity.setAttribute('distance-limiter', {});
    entity.setAttribute('sound', "src: #laser-sound; autoplay: true");
    entity.setAttribute('raycaster', 'far: 0.5; objects: .collidable;')

    this.el.sceneEl.appendChild(entity);
  }
});
