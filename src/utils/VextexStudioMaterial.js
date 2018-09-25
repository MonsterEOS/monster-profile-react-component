import * as THREE from 'three'
import vertexstudio_vert from './vertexstudio_vert.glsl'
import vertexstudio_frag from './vertexstudio_frag.glsl'


const request = async (resource) => {
	const response = await fetch(resource)
	const text = await response.text()
	return text
}

const VertexStudioMaterial = async () => {
	let vert = await request(vertexstudio_vert)
	let frag = await request(vertexstudio_frag)

	return (function (map, decor) {
		return new THREE.ShaderMaterial({
			uniforms: {
				diffuse: { value: new THREE.Color(decor.shader.diffuse) },
				emissive: { value: new THREE.Color(decor.shader.emissive) },
				opacity: { value: 1.0 },
				hue: { value: decor.shader.hue },
				saturation: { value: decor.shader.saturation },
				map: { value: map },
				uvTransform: { value: new THREE.Matrix3() },
				time: { value: 1.0 },
				resolution: { value: new THREE.Vector2() },
				rimPower: { value: decor.shader.rimPower},
				rimIntensity: { value: decor.shader.rimIntensity},
				rimColor: { value: new THREE.Color(decor.shader.rimColor) },
				ambientLightColor: { value: [] },
				directionalLights: {
					value: [], properties: {
						direction: {},
						color: {},
						shadow: {},
						shadowBias: {},
						shadowRadius: {},
						shadowMapSize: {}
					}
				},
				directionalShadowMap: { value: [] },
				directionalShadowMatrix: { value: [] },
				spotLights: {
					value: [], properties: {
						color: {},
						position: {},
						direction: {},
						distance: {},
						coneCos: {},
						penumbraCos: {},
						decay: {},

						shadow: {},
						shadowBias: {},
						shadowRadius: {},
						shadowMapSize: {}
					}
				},
				spotShadowMap: { value: [] },
				spotShadowMatrix: { value: [] },

				pointLights: {
					value: [], properties: {
						color: {},
						position: {},
						decay: {},
						distance: {},

						shadow: {},
						shadowBias: {},
						shadowRadius: {},
						shadowMapSize: {},
						shadowCameraNear: {},
						shadowCameraFar: {}
					}
				},
				pointShadowMap: { value: [] },
				pointShadowMatrix: { value: [] },
				hemisphereLights: {
					value: [], properties: {
						direction: {},
						skyColor: {},
						groundColor: {}
					}
				},
				rectAreaLights: {
					value: [], properties: {
						color: {},
						position: {},
						width: {},
						height: {}
					}
				}
			},
			defines: {
				USE_MAP: ''
			},
			opacity: 1.0,
			fog: false,
			lights: true,
			skinning: true,
			transparent: false,
			vertexShader: vert,
			fragmentShader: frag

		})
	})
}

export default VertexStudioMaterial
