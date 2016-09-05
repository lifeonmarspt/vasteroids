import AFRAME from 'aframe'
import polar2cartesian from "./polar2cartesian.js";
import normal_random from "./normal-random.js";

AFRAME.registerSystem('player', {
	schema: {
		lives: {type: 'number', default: 5}
	},

	removeLife: function() {
		this.data.lives -= 1;

		if (this.data.lives == 0)
		{
			document.querySelector('[flasher]').emit('final-flash')
			this.stop_asteroids()
			this.data.lives = 5
		}
		else
			document.querySelector('[flasher]').emit('flash')
	},

	stop_asteroids: function() {

		clearInterval(this.interval)
		this.interval = null
		document.querySelector('[start-button]').emit('restart');
		document.querySelector('#text').emit('stop');
		document.querySelectorAll('[asteroid]').forEach(function(ast) {
			ast.emit('hit')
		})
	},

	start_asteroids: function() {

	document.getElementById('text').emit('start');
    document.querySelector('[flasher]').setAttribute('sound', "src: #shield-sound; on: flash;")

	this.interval = setInterval(() => {
		var longitude = normal_random(2) * Math.PI * 2;
		var latitude = normal_random(10) * Math.PI/2 - Math.PI/4;

		var ast = document.createElement('a-entity');
		ast.setAttribute('asteroid', "player: #player");
		ast.setAttribute('class', 'collidable');
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
})
