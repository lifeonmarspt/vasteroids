( () => { var i = 0
      AFRAME.registerComponent('click-color-change', {
        init: function () {
          var COLORS = ['red', 'green', 'blue'];
          this.el.addEventListener('click', function () {
            var randomIndex = Math.floor(Math.random() * COLORS.length);
            this.setAttribute('material', 'color', COLORS[randomIndex]);
            console.log('I was clicked!');
          });
        }
      });
      setInterval( () => {
      ++i
      var scene = document.querySelector('#layout');
      var ast = document.createElement('a-entity');
      ast.setAttribute('geometry', 'primitive: example; buffer: false; skipCache: true;');
      ast.setAttribute('material', 'color: gray;');
      ast.setAttribute('click-color-change', 'yes?')

      var animRot = document.createElement('a-animation');
      animRot.setAttribute('attribute', 'rotation')
      animRot.setAttribute('dur', '1000')
      animRot.setAttribute('fill', 'forwards')
      animRot.setAttribute('to', '0 360 0')
      animRot.setAttribute('easing', 'linear')
      animRot.setAttribute('repeat', 'indefinite')

      var animTrans = document.createElement('a-animation')
      //<a-animation dur="100000" attribute="position" fill="forwards" to="0 0 0"></a-animation>
      animTrans.setAttribute('dur', '10000')
      animTrans.setAttribute('attribute', 'position')
      animTrans.setAttribute('fill', 'forwards')
      animTrans.setAttribute('to', '0 0 0')

      ast.appendChild(animTrans)
      ast.appendChild(animRot)
      scene.appendChild(ast);
      }, 2000)
})()
