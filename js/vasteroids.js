var Vasteroids = (function () {
  var scene,
      camera,
      renderer,
      controls,
      effect,
      sceneOrtho,
      cameraOrtho;

  var asteroids = [];

  var setup = function () {
    scene = new THREE.Scene();

    // renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // asteroids
    for (var i = 0; i < 50; i++) {
      var longitude = Math.random() * 2 * Math.PI;
      var latitude = Math.random() * Math.PI / 2 - Math.PI / 4;

      var asteroid = Vasteroids.Asteroid.create(longitude, latitude, 100.0);

      asteroid.mesh.translateX(100 * Math.sin(longitude));
      asteroid.mesh.translateY(100 * Math.sin(latitude));
      asteroid.mesh.translateZ(100 * Math.cos(longitude));
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

    controls = new THREE.DeviceOrientationControls(camera);

    effect = new THREE.StereoEffect(renderer);
    effect.setSize(window.innerWidth, window.innerHeight);

    cameraOrtho = new THREE.OrthographicCamera(
        - window.innerWidth / 2, window.innerWidth / 2,
        window.innerHeight / 2, - window.innerHeight / 2,
        1, 10);

    cameraOrtho.position.z = 10;

    sceneOrtho = new THREE.Scene();

    var textureLoader = new THREE.TextureLoader();

    textureLoader.load( "crosshair.png", function(texture) {
      var material = new THREE.SpriteMaterial({ map: texture });

      var width = material.map.image.width;
      var height = material.map.image.height;

      spriteTL = new THREE.Sprite(material);
      spriteTL.scale.set(width, height, 1);
      sceneOrtho.add(spriteTL);

      spriteTL.position.set( - window.innerWidth + width,   window.innerHeight - height, 1 ); // top left

    });
  };

  var renderCycle = function () {
    requestAnimationFrame(renderCycle);

    controls.update();
    _.each(asteroids, Vasteroids.Asteroid.move);

    effect.render(sceneOrtho, cameraOrtho);
    effect.render(scene, camera);
  };

  var run = function () {
    setup();
    renderCycle();
  };

  return {
    run : run
  }
}());
