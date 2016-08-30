import AFRAME from 'aframe';
import _ from 'lodash';

function setupExplosion(geometry) {
  var numFaces = geometry.faces.length;
  geometry = new AFRAME.THREE.BufferGeometry().fromGeometry(geometry);
  geometry.computeVertexNormals();

  var displacement = new Float32Array(numFaces * 9);

  for (var f = 0; f < numFaces; f++) {
    var d = _.random(-5.0, 5.0, true);
    for (var i = 0; i < 9; i++) {
      displacement[9 * f + i] = d;
    }
  }

  geometry.addAttribute('displacement', new AFRAME.THREE.BufferAttribute(displacement, 3));
  return geometry;
}

function distortedSphereGeometry(radius, widthSegments, heightSegments) {
  var geometry = new AFRAME.THREE.SphereGeometry(radius, widthSegments, heightSegments);

  for (var i = 0; i < geometry.vertices.length; i++) {
    var x = i % (widthSegments + 1);
    var y = i / (widthSegments + 1);

    // don't touch the seams to avoid tearing
    if (y > 1 && y < heightSegments && (x % widthSegments) != 0) {
      geometry.vertices[i].multiplyScalar(_.random(0.75, 1.5, true));
    }
  }

  return geometry;
}

AFRAME.registerGeometry('asteroid', {
  init: function() {
    var finalGeometry = distortedSphereGeometry(_.random(1.0, 1.5, true), 20, 10);

    for (var i = 0; i < _.random(2, 12); i++) {
      var radius = _.random(1.0, 1.5, true);
      var geometry = distortedSphereGeometry(radius, 20, 10);

      var x = radius * _.random(-1.5, 1.5, true);
      var y = radius * _.random(-1.5, 1.5, true);
      var z = radius * _.random(-1.5, 1.5, true);

      finalGeometry.merge(geometry, new AFRAME.THREE.Matrix4().makeTranslation(x, y, z));
    }

    this.geometry = setupExplosion(finalGeometry);
  }
});