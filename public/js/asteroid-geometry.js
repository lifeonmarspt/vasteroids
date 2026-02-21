function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setupExplosion(geometry) {
  const numFaces = geometry.faces.length;
  geometry = new AFRAME.THREE.BufferGeometry().fromGeometry(geometry);
  geometry.computeVertexNormals();

  const displacement = new Float32Array(numFaces * 9);

  for (let f = 0; f < numFaces; f++) {
    const d = randomFloat(-5.0, 5.0);
    for (let i = 0; i < 9; i++) {
      displacement[9 * f + i] = d;
    }
  }

  geometry.setAttribute('displacement', new AFRAME.THREE.BufferAttribute(displacement, 3));
  return geometry;
}

function distortedSphereGeometry(radius, widthSegments, heightSegments) {
  const geometry = new AFRAME.THREE.SphereGeometry(radius, widthSegments, heightSegments);

  for (let i = 0; i < geometry.vertices.length; i++) {
    const x = i % (widthSegments + 1);
    const y = i / (widthSegments + 1);

    // don't touch the seams to avoid tearing
    if (y > 1 && y < heightSegments && (x % widthSegments) != 0) {
      geometry.vertices[i].multiplyScalar(randomFloat(0.75, 1.5));
    }
  }

  return geometry;
}

AFRAME.registerGeometry('asteroid', {
  init: function() {
    const finalGeometry = distortedSphereGeometry(randomFloat(1.0, 1.5), 20, 10);

    for (let i = 0; i < randomInt(2, 12); i++) {
      const radius = randomFloat(1.0, 1.5);
      const geometry = distortedSphereGeometry(radius, 20, 10);

      const x = radius * randomFloat(-1.5, 1.5);
      const y = radius * randomFloat(-1.5, 1.5);
      const z = radius * randomFloat(-1.5, 1.5);

      finalGeometry.merge(geometry, new AFRAME.THREE.Matrix4().makeTranslation(x, y, z));
    }

    this.geometry = setupExplosion(finalGeometry);
  }
});

console.log(AFRAME.geometries);
