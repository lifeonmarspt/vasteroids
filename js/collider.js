import AFRAME from "aframe"

AFRAME.registerComponent('collider', {
  schema: {},

  init: function() {
    console.log("init collider")
  },

  tick: function() {
    this.update()
  },

  update: function() {

    var sceneEl = this.el.sceneEl;
    var mesh = this.el.getObject3D('mesh');
    var geometry = mesh.geometry
    var object3D = this.el.object3D
    var originPoint = this.el.object3D.position.clone();
    if (geometry instanceof AFRAME.THREE.BufferGeometry)
      geometry = new THREE.Geometry().fromBufferGeometry( geometry );

    if (geometry.vertices)
    {
      for (var vertexIndex = 0; vertexIndex < geometry.vertices.length; vertexIndex++)
      {
        var localVertex = geometry.vertices[vertexIndex].clone();
        var globalVertex = localVertex.applyMatrix4( object3D.matrix );
        var directionVector = globalVertex.sub( object3D.position );

        var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
        var collisionResults = ray.intersectObjects( sceneEl.object3D.children, true );
        collisionResults.forEach(collision => {
          if (collision.object === object3D)
          {
            return;
          }
          if (collision.distance < directionVector.length())
          {
            if (!collision.object.el) { return; }
            console.log("we got one")
            collision.object.el.emit('hit');
          };
        })
      }
    }
  }
});
