import AFRAME from 'aframe';

AFRAME.registerShader('asteroid-explosion', {
  schema: {
    opacity: {type: 'float', default: 1.0, is: 'uniform'},
    amplitude: {type: 'float', default: 100.0, is: 'uniform'},
    customColor: {type: 'vec3', default: "0.5 0.5 0.5", is: 'uniform'},
    displacement: {type: 'vec3'}
  },
  vertexShader:
    `uniform float amplitude;
    attribute vec3 displacement;
    varying vec3 vNormal;
    void main() {
      vNormal = normal;
      vec3 newPosition = position + normal * amplitude * displacement;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
  }`,

  fragmentShader:
    `uniform float opacity;
    varying vec3 vNormal;
    uniform vec3 customColor;
    void main() {
      const float ambient = 0.4;
      vec3 light = vec3( 1.0 );
      light = normalize( light );
      float directional = max( dot( vNormal, light ), 0.0 );
      gl_FragColor = vec4( customColor, 1.0 );
    }`
});




