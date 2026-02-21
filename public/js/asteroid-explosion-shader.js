AFRAME.registerShader('asteroid-explosion', {
  schema: {
    amplitude: {type: 'float', default: 0.0, is: 'uniform'},
    customColor: {type: 'vec3', default: {x: 0.953, y: 0.514, z: 0.075}, is: 'uniform'},
    displacement: {type: 'vec3', is: 'attribute'}
  },

  vertexShader: `
    uniform float amplitude;
    attribute vec3 displacement;
    void main() {
      vec3 newPosition = position + normal * amplitude * displacement;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,

  fragmentShader: `
    uniform vec3 customColor;
    void main() {
      gl_FragColor = vec4(customColor, 1.0);
    }
  `
});
