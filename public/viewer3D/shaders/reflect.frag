#ifdef TEXTURELOD
#extension GL_EXT_shader_texture_lod : enable
#endif

varying vec3 pos, view;
varying vec2 vUv;
varying mat3 tbnMatrix;
uniform samplerCube envMap;
uniform sampler2D normalMap;
uniform sampler2D detailNormalMap;
uniform sampler2D diffuseMap;
uniform sampler2D specularMap;
uniform float bumpiness;
uniform float roughness;

uniform vec3 cubeMapSize;
//const vec3 cubeMapSize = vec3( 24.557362, 8.410262, 6.32 );
//const vec3 cubeMapSize = vec3( 24.557362, 8.410262, 7.961074 );
const vec3 cubeMapPos = vec3( 0, 0., 0 );

vec3 gamma(vec3 color){
	return pow(color, vec3(1.0/2.0));
}

vec3 parallaxCorrectNormal( vec3 v, vec3 cubeSize, vec3 cubePos ) {

	vec3 nDir = normalize(v);
	vec3 rbmax = (   .5 * ( cubeSize - cubePos ) - pos ) / nDir;
	vec3 rbmin = ( - .5 * ( cubeSize - cubePos ) - pos ) / nDir;

	vec3 rbminmax;
	rbminmax.x = ( nDir.x > 0. )?rbmax.x:rbmin.x;
	rbminmax.y = ( nDir.y > 0. )?rbmax.y:rbmin.y;
	rbminmax.z = ( nDir.z > 0. )?rbmax.z:rbmin.z;

	float correction = min(min(rbminmax.x, rbminmax.y), rbminmax.z);
	vec3 boxIntersection = pos + nDir * correction;

	return boxIntersection - cubePos;
}

vec3 r( vec3 I, vec3 N ) {

	return I - 2.0 * dot(N, I) * N;

}

void main()  {

	vec3 vVec = normalize( view );

	vec4 bumpNormal;
	vec3 nVec;

	bumpNormal = mix( texture2D( normalMap, vUv ), texture2D( detailNormalMap, 50. * vUv ), .5 );
	vec3 n = bumpNormal.rgb * 2.0 - 1.0;
	vec3 modifiedTangent = normalize( vec3( n.xy * bumpiness, sqrt( 1. - n.y * n.y - n.x * n.x ) ) );
	nVec = tbnMatrix * modifiedTangent;

	vec3 rVec = parallaxCorrectNormal( r( vVec, nVec ), cubeMapSize, cubeMapPos );
	#ifdef TEXTURELOD
	vec3 env = textureCubeLodEXT( envMap, rVec ).rgb;
	#else
	vec3 env = textureCube( envMap, rVec ).rgb;
	#endif

	float rim = 1. - abs( dot( nVec, vVec) );

	vec3 diffuse = texture2D( diffuseMap, vUv ).rgb;
	vec3 specular = texture2D( specularMap, vUv ).rgb;
	float r = clamp( specular.r + .2 * rim, 0., 1. );
	vec3 base = mix( diffuse, env, r );

	gl_FragColor = vec4( base, 1. );

}