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

    var material = new THREE.MeshPhongMaterial( {
      color: 0x000000,
      emissive: 0xa8a190,
      shininess: 7.5,
      side: THREE.DoubleSide,
      shading: THREE.FlatShading
    });

    this.uniforms = {

        amplitude: { value: 0.0 },
        opacity: { value: 1.0 }

    };

    var shaderMaterial = new THREE.ShaderMaterial( {

      uniforms:       this.uniforms,
      shading: THREE.FlatShading,
      blending: THREE.SubtractiveBlending,
      side: THREE.FrontSide,
      vertexShader:   document.getElementById( 'vertexshader' ).textContent,
      fragmentShader: document.getElementById( 'fragmentshader' ).textContent
    });


    el.object3D.updateMatrix();
    el.addEventListener("sound-ended", () => {
      this.explode()
    }, false);

  },
  explode: function() {
    if (this.el === undefined)
      return

    console.log("poof!");

    //clear animations, which are children nodes
    while (this.el.hasChildNodes())
      this.el.removeChild(this.el.lastChild);

    var clear = setInterval( () => {
      this.uniforms.amplitude.value += 0.0075
      this.uniforms.opacity.value -= 0.075

      if (this.uniforms.opacity.value < 0 && this.el.parentNode) {
        this.el.parentNode.removeChild(this.el);
        clearTimeout(clear)
      }
    }, 25)

  }
});


