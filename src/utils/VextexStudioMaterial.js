import * as THREE from 'three'
import vertexstudio_vert from '../../shaders/vertexstudio_vert.glsl'
import vertexstudio_frag from '../../shaders/vertexstudio_frag.glsl'


const request = async (resource) => {
	const response = await fetch(resource)
	const text = await response.text()
	return text
}

const VertexStudioMaterial = async () => {
	let vert = await request(vertexstudio_vert)
	let frag = await request(vertexstudio_frag)

	return (function (map) {
		return new THREE.ShaderMaterial({
			uniforms: {
				diffuse: { value: new THREE.Color(0xff8080) },
				emissive: { value: new THREE.Color(0x000000) },
				opacity: { value: 1.0 },
				map: { value: map },
				uvTransform: { value: new THREE.Matrix3() },
				time: { value: 1.0 },
				resolution: { value: new THREE.Vector2() },
				rimPower: { value: 0.4},
				rimIntensity: { value: 1.5},
				rimColor: { value: new THREE.Color(0xff8000) },
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
