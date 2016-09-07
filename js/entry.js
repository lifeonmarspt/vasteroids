//This file is the entrypoint for webpack, the module bundler we're using in this project
//Just require the files you'll be using and they'll all be bundled together in one single file

require('aframe');
require('aframe-text-component');
require('./spawner-component.js');
require('./mobile-safari-sound-support.js');
//require('./extras/asteroid-geometry.js')
//require('./extras/asteroid-explosion-shader.js')
