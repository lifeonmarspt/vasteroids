AFRAME.registerComponent('flasher', {
  init: function() {
    this.el.setAttribute('material', 'transparent: true; opacity: 0.0;')
    this.el.setAttribute('geometry', 'primitive: box; width: 1; height: 1; depth: 0.5;')
    this.el.setAttribute('sound', "src: #shield-sound; on: flash;")
    this.el.addEventListener('flash', this.flash.bind(this))
    this.el.addEventListener('final-flash', this.finalFlash.bind(this))
    this.el.addEventListener("animationcomplete", () => { this.el.removeAttribute('animation'); }, false);
  },
  flash: function() {
    this.el.setAttribute('material', 'transparent: true; opacity: 1.0;')
    this.el.setAttribute('animation', {
      property: 'material.opacity',
      dur: 750,
      easing: 'linear',
      loop: 0,
      from: 1,
      to: 0,
    });
  },
  finalFlash: function() {
    this.el.setAttribute('material', 'transparent: true; opacity: 1.0;')
    this.el.setAttribute('sound', "src: #final-shield-sound; autoplay: true")
    this.el.setAttribute('animation', {
      property: 'material.opacity',
      dur: 1250,
      easing: 'linear',
      loop: 0,
      from: 1,
      to: 0,
    });
  }
})
