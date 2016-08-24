import AFRAME from 'aframe';
var THREE = AFRAME.THREE

class AsteroidGeometry extends THREE.BufferGeometry {
  constructor(radius, widthSegments, heightSegments) {
    super();

    this.type = 'AsteroidGeometry';

    radius = radius || 50;

    widthSegments = Math.max( 3, Math.floor( widthSegments ) || 8 );
    heightSegments = Math.max( 2, Math.floor( heightSegments ) || 6 );

    var vertexCount = ( ( widthSegments + 1 ) * ( heightSegments + 1 ) );

    var positions = new THREE.BufferAttribute( new Float32Array( vertexCount * 3 ), 3 );
    var normals = new THREE.BufferAttribute( new Float32Array( vertexCount * 3 ), 3 );

    var index = 0, vertices = [], normal = new THREE.Vector3();

    for ( var y = 0; y <= heightSegments; y ++ ) {

      var verticesRow = [];

      var v = y / heightSegments;

      var xpto = widthSegments;
      if (y == 0) xpto = 1;
      if (y == heightSegments) xpto = 1;

      for ( var x = 0; x < xpto; x ++ ) {

        var u = x / widthSegments;

        var derpedRadius = radius + (radius * Math.random() / 2);

        var px = - derpedRadius * Math.cos( u * Math.PI * 2) * Math.sin( v * Math.PI );
        var py = derpedRadius * Math.cos( v * Math.PI);
        var pz = derpedRadius * Math.sin( u * Math.PI * 2) * Math.sin( v * Math.PI);

        normal.set( px, py, pz ).normalize();

        positions.setXYZ( index, px, py, pz );
        normals.setXYZ( index, normal.x, normal.y, normal.z );

        verticesRow.push( index );

        index ++;
      }

      vertices.push( verticesRow );
    }

    var indices = [];

    for ( var y = 0; y < heightSegments; y ++ ) {
      for ( var x = 0; x < widthSegments; x ++ ) {
        if (y == 0) {
          indices.push(
              vertices[y][0],
              vertices[y+1][x],
              vertices[y+1][(x+1)%widthSegments]);
        } else if (y == heightSegments - 1) {
          indices.push(
              vertices[y][x],
              vertices[y+1][0],
              vertices[y][(x+1)%widthSegments]);
        } else {
          var v1 = vertices[ y ][ (x + 1) % widthSegments ];
          var v2 = vertices[ y ][ x ];
          var v3 = vertices[ y + 1 ][ x ];
          var v4 = vertices[ y + 1 ][ (x + 1) % widthSegments ];

          indices.push( v1, v2, v4 );
          indices.push( v2, v3, v4 );
        }
      }
    }

    this.setIndex( new ( positions.count > 65535 ? THREE.Uint32Attribute : THREE.Uint16Attribute )( indices, 1 ) );
    this.addAttribute( 'position', positions );
    this.addAttribute( 'normal', normals );
  }
}

export default AsteroidGeometry;
