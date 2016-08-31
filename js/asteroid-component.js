import AFRAME from 'aframe';

AFRAME.registerComponent('asteroid', {
  schema: {
    player: {type: "selector"}
  },

  init: function() {
    this.el.object3D.updateMatrix();
    this.hitListener = () => { this.explode(); };
    this.el.addEventListener("hit", this.hitListener, false);
  },

  tick: function() {
    if (this.el.object3D.position.length() < 2) {
      this.data.player.emit('hit')
      this.el.parentNode.removeChild(this.el);
    }
  },

  explode: function() {
    console.log("boom!");
    this.el.removeEventListener("hit", this.hitListener);
    this.el.setAttribute("material", "shader: asteroid-explosion;");

    var explosion = document.createElement('a-animation');
    explosion.setAttribute('dur', '300');
    explosion.setAttribute('attribute', 'material.amplitude');
    explosion.setAttribute('fill', 'forwards');
    explosion.setAttribute('easing', 'linear');
    explosion.setAttribute('to', '0.8');

    this.el.appendChild(explosion);
    this.el.addEventListener("animationend", () => { this.disappear(); }, false);
  },

  disappear: function() {
    console.log("poof!");
    this.el.parentNode.removeChild(this.el);
  }
});
