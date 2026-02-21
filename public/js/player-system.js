import polar2cartesian from "./polar2cartesian.js";
import normal_random from "./normal-random.js";

AFRAME.registerSystem('player', {
  schema: {
    lives: {type: 'number', default: 5},
    spawnSpeed: {type: "number", default: 5000},
    spawnSpeedMultiplier: {type: "number", default: 0.99}
  },

  removeLife: function() {
    this.data.lives -= 1;

    if (this.data.lives == 0) {
      document.querySelector('[flasher]').emit('final-flash')
      this.stop_asteroids()
      this.data.lives = 5
    } else {
      document.querySelector('[flasher]').emit('flash')
    }
  },

  stop_asteroids: function() {
    clearTimeout(this.timeout)
    this.timeout = null
    document.querySelector('[start-button]').emit('restart');
    document.querySelector('#text').emit('stop');
    Array.prototype.forEach.call(document.querySelectorAll('[asteroid]'), function(ast) {
      ast.emit('hit')
    })

  },

  start_asteroids: function() {

    document.getElementById('text').emit('start');

    var ent = document.createElement('a-entity')
    ent.setAttribute('flasher', {})
    ent.setAttribute('position', "0 0 -0.5")
    document.querySelector('a-camera').appendChild(ent)

    this.spawn_asteroid.bind(this)

    this.timeout = setTimeout(this.spawn_asteroid.bind(this), this.data.spawnSpeed)
  },

  spawn_asteroid: function() {
    var longitude = normal_random(2) * Math.PI * 2;
    var latitude = normal_random(10) * Math.PI/2 - Math.PI/4;

    var ast = document.createElement('a-entity');
    ast.setAttribute('asteroid', "player: #player");
    ast.setAttribute('class', 'collidable');
    ast.setAttribute('geometry', 'primitive: asteroid; skipCache: true; buffer: false;')
    ast.setAttribute('material', 'metalness: 0;');
    ast.setAttribute("position", polar2cartesian(longitude, latitude, 100.0));
    ast.setAttribute('sound', "src: #explosion-sound; on: hit; volume: 10;");

    ast.setAttribute("animation__rotation", {
      property: 'rotation',
      dur: 1000,
      to: '0 360 0',
      easing: 'linear',
      loop: true,
      pauseEvents: 'hit',
    });

    ast.setAttribute("animation__translation", {
      property: 'position',
      dur: 10000,
      to: '0 0 0',
      easing: 'linear',
      pauseEvents: 'hit',
    });

    ast.setAttribute("animation__color", {
      property: 'material.color',
      dur: 10000,
      from: '#a8a190',
      to: '#ba4c4c',
      easing: 'linear',
      pauseEvents: 'hit',
    });

    document.querySelector('#asteroids').appendChild(ast);
    if (this.timeout !== null) {

      if (this.data.spawnSpeed > 300)
        this.data.spawnSpeed = this.data.spawnSpeed * this.data.spawnSpeedMultiplier

      this.timeout = setTimeout(this.spawn_asteroid.bind(this), this.data.spawnSpeed)
    }
  }
})
