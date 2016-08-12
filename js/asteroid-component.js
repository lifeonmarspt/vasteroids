import AsteroidGeometry from "./asteroidGeometry.js";
import AFRAME from 'aframe';
import _ from 'lodash'


AFRAME.registerComponent('asteroid', {
  init: function() {
    var el = this.el;

    var material = new THREE.MeshPhongMaterial( {
      color: 0x000000,
      emissive: 0xa8a190,
      shininess: 7.5,
      side: THREE.DoubleSide,
      shading: THREE.FlatShading
    });

    var clumps = [];

    clumps.push(new THREE.Mesh(new AsteroidGeometry(1.0+0.5*Math.random(), 10, 10), material));

    for (var i = 0; i < 2+Math.random()*10; i++) {
      var radius = 1.1 + 0.5*Math.random();

      var geometry = new AsteroidGeometry(radius, 10, 10);
      var asteroid = new THREE.Mesh(geometry, material);

      asteroid.position.x = _.random(-1.5*radius, 1.5*radius, true);
      asteroid.position.y = _.random(-1.5*radius, 1.5*radius, true);
      asteroid.position.z = _.random(-1.5*radius, 1.5*radius, true);

      clumps.push(asteroid);
    }

    var object3D = new THREE.Object3D();
    _.each(clumps, function (clump) { object3D.add(clump); });

    el.setObject3D('mesh', object3D);

  }
});


