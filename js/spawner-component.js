import AFRAME from 'aframe';


/*
  https://aframe.io/docs/master/core/component.html#methods
*/
AFRAME.registerComponent('spawner', {
  schema: {
    //You can declare properties (and their types and default values) here, read the docs for more information
  },
  init: function() {
    //Invoked when the component is initialized
  },
  update: function() {
    //Invoked whenever there is a properties update (setAttribute)
  },
  tick: function() {
    //Invoked every frame
  },
  remove: function() {
    //Invoked when removed from DOM
  }
})
