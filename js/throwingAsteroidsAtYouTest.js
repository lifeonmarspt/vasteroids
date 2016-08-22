function normal_random(n) {
  var x = 0;
  for (var i = 0; i < n; i++) {
    x += Math.random();
  }

  return x / n;
}

function polar2cartesian(longitude, latitude, radius) {
  return {
    x: radius * Math.sin(longitude) * Math.cos(latitude),
    z: -radius * Math.cos(longitude) * Math.cos(latitude),
    y: radius * Math.sin(latitude)
   }
}

setInterval(() => {
  var longitude = normal_random(2) * Math.PI * 2;
  var latitude = normal_random(10) * Math.PI/2 - Math.PI/4;

  var ast = document.createElement('a-entity');
  ast.setAttribute('asteroid', true);
  ast.setAttribute('distance-limiter', "maxDistance: 100");
  ast.setAttribute("position", polar2cartesian(longitude, latitude, 50.0));
  ast.setAttribute('sound', "src: #explosion-sound; on: hit");

  var animRot = document.createElement('a-animation');
  animRot.setAttribute('attribute', 'rotation');
  animRot.setAttribute('dur', '1000');
  animRot.setAttribute('fill', 'forwards');
  animRot.setAttribute('to', '0 360 0');
  animRot.setAttribute('easing', 'linear');
  animRot.setAttribute('repeat', 'indefinite');

  var animTrans = document.createElement('a-animation');
  animTrans.setAttribute('dur', '10000');
  animTrans.setAttribute('attribute', 'position');
  animTrans.setAttribute('fill', 'forwards');
  animTrans.setAttribute('easing', 'linear');
  animTrans.setAttribute('to', '0 0 0');

  ast.appendChild(animTrans);
  ast.appendChild(animRot);

  document.querySelector('#asteroids').appendChild(ast);
}, 2000);
