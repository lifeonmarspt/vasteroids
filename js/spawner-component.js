import AFRAME from 'aframe'

AFRAME.registerComponent('spawner', {

  init: function () {
    this.el.sceneEl.addEventListener("click", this.spawn.bind(this));
  },

  spawn: function () {
    var camPos = this.el.getAttribute('position');
    var camRot = this.el.getAttribute('rotation');

    var entity = document.createElement('a-entity');

    entity.setAttribute('geometry', "primitive: box; height: 0.1; width: 0.1; depth: 1; buffer: false;");
    entity.setAttribute('position', camPos);
    entity.setAttribute('rotation', camRot);
    entity.setAttribute('laser', true);
    entity.setAttribute('distance-limiter', true);
    entity.setAttribute('sound', "src: #laser-sound; autoplay: true");
    entity.setAttribute('raycaster', 'far: 0.5; objects: .collidable;')

    this.el.sceneEl.appendChild(entity);
  }
});
