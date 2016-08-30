//TODO: classify
import polar2cartesian from "./polar2cartesian.js";
import normal_random from "./normal-random.js";

class Vasteroids{

  constructor(){
    this.interval = null;
  }

  stop_asteroids() {

    clearInterval(this.interval)
    this.interval = null
    document.querySelectorAll('[asteroid]').forEach(function(ast) {
      ast.emit('hit')
    })
  }

  start_asteroids() {

    this.interval = setInterval(() => {
      var longitude = normal_random(2) * Math.PI * 2;
      var latitude = normal_random(10) * Math.PI/2 - Math.PI/4;

      var ast = document.createElement('a-entity');
      ast.setAttribute('asteroid', true);
      ast.setAttribute('class', 'collidable');
      ast.setAttribute('distance-limiter', "maxDistance: 100; minDistance: 5;");
      ast.setAttribute('geometry', 'primitive: asteroid; skipCache: true; buffer: false;')
      ast.setAttribute('material', 'metalness: 0;');
      ast.setAttribute("position", polar2cartesian(longitude, latitude, 50.0));
      ast.setAttribute('sound', "src: #explosion-sound; on: hit; volume: 10;");

      var animRot = document.createElement('a-animation');
      animRot.setAttribute('attribute', 'rotation');
      animRot.setAttribute('dur', '1000');
      animRot.setAttribute('fill', 'forwards');
      animRot.setAttribute('to', '0 360 0');
      animRot.setAttribute('easing', 'linear');
      animRot.setAttribute('repeat', 'indefinite');
      animRot.setAttribute('end', 'hit');

      var animTrans = document.createElement('a-animation');
      animTrans.setAttribute('dur', '10000');
      animTrans.setAttribute('attribute', 'position');
      animTrans.setAttribute('fill', 'forwards');
      animTrans.setAttribute('easing', 'linear');
      animTrans.setAttribute('to', '0 0 0');
      animTrans.setAttribute('end', 'hit');

      var redness = document.createElement('a-animation');
      redness.setAttribute('dur', '10000');
      redness.setAttribute('attribute', 'material.color');
      redness.setAttribute('fill', 'forwards');
      redness.setAttribute('easing', 'linear');
      redness.setAttribute('from', '#a8a190');
      redness.setAttribute('to', '#ba4c4c');
      redness.setAttribute('end', 'hit');

      ast.appendChild(animTrans);
      ast.appendChild(animRot);
      ast.appendChild(redness);

      document.querySelector('#asteroids').appendChild(ast);
    }, 2000);

  }
}

export default new Vasteroids()

