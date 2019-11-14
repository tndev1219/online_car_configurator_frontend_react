attribute vec4 tangent;
varying vec3 pos, view;
varying mat3 tbnMatrix;
varying vec2 vUv;
uniform vec2 repeatUV;
uniform float bumpiness;

mat3 m3( mat4 mIn ) {

	mat3 mOut;

	mOut[ 0 ][ 0 ] = mIn[ 0 ][ 0 ];
	mOut[ 0 ][ 1 ] = mIn[ 0 ][ 1 ];
	mOut[ 0 ][ 2 ] = mIn[ 0 ][ 2 ];

	mOut[ 1 ][ 0 ] = mIn[ 1 ][ 0 ];
	mOut[ 1 ][ 1 ] = mIn[ 1 ][ 1 ];
	mOut[ 1 ][ 2 ] = mIn[ 1 ][ 2 ];

	mOut[ 2 ][ 0 ] = mIn[ 2 ][ 0 ];
	mOut[ 2 ][ 1 ] = mIn[ 2 ][ 1 ];
	mOut[ 2 ][ 2 ] = mIn[ 2 ][ 2 ];

	return mOut;
}

void main()  {

	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
	pos = vec3(modelMatrix * vec4( position, 1. ) );

	if( bumpiness != 0. ){
		vec3 correctedTangent = m3( modelMatrix ) * tangent.xyz;
		vec3 binormal = m3( modelMatrix ) * cross(normal, correctedTangent.xyz );
		vec3 normal = m3( modelMatrix ) * normal;

		tbnMatrix = mat3( normalize( correctedTangent ), normalize( binormal ), normalize( normal ) );
	} else {
		tbnMatrix = mat3( normal, normal, normal );
	}

	view = pos - cameraPosition;

	vUv = uv * repeatUV;

}