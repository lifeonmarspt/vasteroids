import AFRAME from "aframe"

AFRAME.registerComponent('collider', {
  schema: {
    targetSet: { type: 'selector' }
  },

  tick: function() {
    var collisions = [];


    var sceneEl = this.el.sceneEl;
    var mesh = this.el.getObject3D('mesh');
    var geometry = mesh.geometry
    var object3D = this.el.object3D
    var originPoint = this.el.object3D.position.clone();
    if (geometry instanceof AFRAME.THREE.BufferGeometry)
      geometry = new THREE.Geometry().fromBufferGeometry( geometry );

    if (geometry.vertices) {
      for (var vertexIndex = 0; vertexIndex < geometry.vertices.length; vertexIndex++) {
        var localVertex = geometry.vertices[vertexIndex].clone();
        var globalVertex = localVertex.applyMatrix4( object3D.matrix);
        var directionVector = globalVertex.sub(object3D.position);

        var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize(), 0, directionVector.length());
        var collisionResults = ray.intersectObjects( this.data.targetSet.object3D.children, true );
        collisionResults.forEach(collision => {
          if (collision.distance < directionVector.length()) {
            collisions.push(collision.object.el);
          };
        });
      }
    }

    [...new Set(collisions)].forEach(obj => { obj.emit('hit'); });
  }
});
