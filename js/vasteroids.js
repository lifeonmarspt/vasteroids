var Vasteroids = (function () {
  var scene,
      camera,
      renderer;

  var asteroids = [];

  var setup = function () {
    scene = new THREE.Scene();

    // renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // asteroids
    for (var i = 0; i < 50; i++) {
      var asteroid = Vasteroids.Asteroid.create();
      asteroid.mesh.translateX(8*(i%8)-25);
      asteroid.mesh.translateY(8*(i/8)-25);
      asteroids.push(asteroid);
      scene.add(asteroid.mesh);
    }

    // lights
    var lights = [];
    lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0, 0 );
    lights[ 0 ].position.set( 0, 50, 50 );
    scene.add( lights[ 0 ] );

    // camera
    var cameraOptions = {
      fov: 75,
      aspectRatio: window.innerWidth / window.innerHeight,
      clippingPlane: {
        near: 0.1,
        far: 1000
      }
    };

    camera = new THREE.PerspectiveCamera(
      cameraOptions.fov,
      cameraOptions.aspectRatio,
      cameraOptions.clippingPlane.near,
      cameraOptions.clippingPlane.far
    );

    camera.position.z = 50;
  };

  var renderCycle = function () {
    requestAnimationFrame(renderCycle);

    _.each(asteroids, Vasteroids.Asteroid.rotate);

    renderer.render(scene, camera);
  };

  var run = function () {
    setup();
    renderCycle();
  };

  return {
    run : run
  }
}());
