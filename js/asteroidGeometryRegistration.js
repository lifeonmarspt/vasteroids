(function(){

  AFRAME.registerGeometry('example', {
  schema: {
    radius: {default: 1.0+0.5*Math.random()},
    widthSegments: {default: 10},
    heightSegments: {default: 10},
    phiLength: {default: undefined},
    thetaLength: {default: undefined}
  },
  init: function (data) {

    //radius, widthSegments, heightSegments, phiLength, thetaLength
    this.geometry = new AsteroidGeometry(data.radius, data.widthSegments, data.heightSegments)
  }
  });

})()
