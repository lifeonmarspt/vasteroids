import AsteroidGeometry from "./asteroidGeometry.js";
import AFRAME from 'aframe';
import _ from 'lodash';

function setupExplosion(geometry) {
  var numFaces = geometry.faces.length;
  geometry = new THREE.BufferGeometry().fromGeometry(geometry);

  var displacement = new Float32Array( numFaces * 3 * 3 );

  for ( var f = 0; f < numFaces; f ++ ) {
    var index = 9 * f;
    var d = 10 * ( 0.5 - Math.random() );

    for ( var i = 0; i < 3; i ++ ) {
      displacement[ index + ( 3 * i )     ] = d;
      displacement[ index + ( 3 * i ) + 1 ] = d;
      displacement[ index + ( 3 * i ) + 2 ] = d;
    }
  }

  geometry.addAttribute( 'displacement', new THREE.BufferAttribute( displacement, 3 ) );
  return geometry
}


AFRAME.registerGeometry('asteroid-geometry', {
  init: function() {
    var clumps = [];
    var firstGeometry = new AsteroidGeometry(1.0+0.5*Math.random(), 10, 10)

    clumps.push(new THREE.Mesh(firstGeometry));

    for (var i = 0; i < 2+Math.random()*10; i++) {

      var radius = 1.1 + 0.5*Math.random();
      var geometry = new AsteroidGeometry(radius, 10, 10);

      var asteroid = new THREE.Mesh(geometry);

      asteroid.position.x = _.random(-1.5*radius, 1.5*radius, true);
      asteroid.position.y = _.random(-1.5*radius, 1.5*radius, true);
      asteroid.position.z = _.random(-1.5*radius, 1.5*radius, true);

      clumps.push(asteroid);
    }

    var finalGeometry = new THREE.Geometry();
    _.each(clumps, function (clumpMesh) {
      clumpMesh.updateMatrix()
      clumpMesh.geometry = new THREE.Geometry().fromBufferGeometry(clumpMesh.geometry)
      finalGeometry.merge(clumpMesh.geometry, clumpMesh.matrix)
    });

    finalGeometry = setupExplosion(finalGeometry)
    this.geometry = finalGeometry;
  }
})

AFRAME.registerComponent('asteroid', {
  init: function() {
    var el = this.el;

    el.object3D.updateMatrix();
    el.addEventListener("animationend", () => { this.disappear(); }, false);
  },

  disappear: function() {
    console.log("poof!");
    this.el.parentNode.removeChild(this.el);
  }
});
