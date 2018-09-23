import * as THREE from 'three'
import vertexstudio_vert from './utils/vertexstudio_vert.glsl'
import vertexstudio_frag from './utils/vertexstudio_frag.glsl'


const VertexStudioMaterial = (function () {
	var material = new THREE.ShaderMaterial({

		uniforms: {

			time: { value: 1.0 },
			resolution: { value: new THREE.Vector2() }

		},

		vertexShader: vertexstudio_vert,

		fragmentShader: vertexstudio_frag

	});
	return material;
}
)();

export default VertexStudioMaterial


