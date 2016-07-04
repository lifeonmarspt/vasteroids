(function () {
  window.AsteroidGeometry = function (radius, widthSegments, heightSegments, phiLength, thetaLength) {
    THREE.BufferGeometry.call( this );

    this.type = 'AsteroidGeometry';

    this.parameters = {
      radius: radius,
      widthSegments: widthSegments,
      heightSegments: heightSegments,
      phiLength: phiLength,
      thetaLength: thetaLength
    };

    radius = radius || 50;

    widthSegments = Math.max( 3, Math.floor( widthSegments ) || 8 );
    heightSegments = Math.max( 2, Math.floor( heightSegments ) || 6 );

    phiLength = phiLength !== undefined ? phiLength : Math.PI * 2;

    thetaLength = thetaLength !== undefined ? thetaLength : Math.PI;

    var vertexCount = ( ( widthSegments + 1 ) * ( heightSegments + 1 ) );

    var positions = new THREE.BufferAttribute( new Float32Array( vertexCount * 3 ), 3 );
    var normals = new THREE.BufferAttribute( new Float32Array( vertexCount * 3 ), 3 );
    var uvs = new THREE.BufferAttribute( new Float32Array( vertexCount * 2 ), 2 );

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

        var px = - derpedRadius * Math.cos( u * phiLength ) * Math.sin( v * thetaLength );
        var py = derpedRadius * Math.cos( v * thetaLength );
        var pz = derpedRadius * Math.sin( u * phiLength ) * Math.sin( v * thetaLength );

        normal.set( px, py, pz ).normalize();

        positions.setXYZ( index, px, py, pz );
        normals.setXYZ( index, normal.x, normal.y, normal.z );
        uvs.setXY( index, u, 1 - v );

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
              vertices[y][(x+1)%widthSegments],
              vertices[y+1][0]);
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
    this.addAttribute( 'uv', uvs );
  }

  AsteroidGeometry.prototype = Object.create( THREE.BufferGeometry.prototype );
  AsteroidGeometry.prototype.constructor = AsteroidGeometry;
 
}());
