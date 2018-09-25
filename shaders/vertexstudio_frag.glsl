uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;

varying vec3 vLightFront;
varying vec3 rim;

#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <map_fragment>
	#include <color_fragment>

	// accumulation
	reflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );
	reflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );
	reflectedLight.directDiffuse = vLightFront;
	reflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;

	gl_FragColor = vec4( outgoingLight + rim, diffuseColor.a );

	// vec4 skinColor = texture2D( map, vUv );
	// gl_FragColor = vec4(skinColor.rgb, 1.0);
	// gl_FragColor = vec4(outgoingLight, 1.0);
	// gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
	// gl_FragColor = vec4( vUv.x, vUv.y, 1.0, 1.0 );
	// gl_FragColor = diffuseColor;

}