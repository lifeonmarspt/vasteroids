Vasteroids.Asteroid = (function () {
  var create = function (longitude, latitude, distance) {
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

    var coeff = 0.001+0.03*Math.random();

    return {
      mesh: object3D,
      rotations: [
        coeff*Math.random(),
        coeff*Math.random(),
        coeff*Math.random()
      ],

      distance: distance,
      longitude: longitude,
      latitude: latitude
    };
  };

  var move = function(asteroid) {
    asteroid.distance -= 0.1;

    asteroid.mesh.rotateX(asteroid.rotations[0]);
    asteroid.mesh.rotateY(asteroid.rotations[1]);
    asteroid.mesh.rotateZ(asteroid.rotations[2]);

    asteroid.mesh.position.set(
      asteroid.distance * Math.sin(asteroid.longitude),
      asteroid.distance * Math.sin(asteroid.latitude),
      asteroid.distance * Math.cos(asteroid.longitude)
    );

    asteroid.mesh.updateMatrix();
  };

  return {
    create : create,
    move: move
  }
}());
