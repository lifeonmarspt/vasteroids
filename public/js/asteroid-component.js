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
      this.el.sceneEl.systems['player'].removeLife()
      this.el.removeAttribute('sound')
      this.el.parentNode.removeChild(this.el);
    }
  },

  explode: function() {
    console.log("boom!");
    this.el.removeEventListener("hit", this.hitListener);
    this.el.setAttribute("material", "shader: asteroid-explosion;");

    this.el.setAttribute("animation", {
      property: 'material.amplitude',
      dur: 300,
      easing: 'linear',
      to: 0.8,
    });

    this.el.addEventListener("animationcomplete", () => { this.disappear(); }, false);
  },

  disappear: function() {
    console.log("poof!");
    this.el.parentNode.removeChild(this.el);
  }
});
