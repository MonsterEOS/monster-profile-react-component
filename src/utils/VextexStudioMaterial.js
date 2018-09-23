import * as THREE from 'three'
import vertexstudio_vert from './vertexstudio_vert.glsl'
import vertexstudio_frag from './vertexstudio_frag.glsl'


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


