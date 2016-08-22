document.getElementsByTagName('body')[0].addEventListener('keydown', () => {
  var ast = document.createElement('a-entity');
  ast.setAttribute('asteroid', true);
  ast.setAttribute('distance-limiter', "maxDistance: 100");
  ast.setAttribute("position", '0 0 -50');

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
});
