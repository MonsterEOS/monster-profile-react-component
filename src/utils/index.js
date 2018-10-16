import GLTFLoader from './GLTFLoader'

/**
 * Returns a function that will be invoked until the timeout is over.
 * This timeout restarts evertime the function gets invoked before
 * the interval stablished.
 * 
 * @param {Number} [ms=500] Interval of time to wait for next
 * invocation of the function.
 */
export const debounce = (ms = 500) => f => {
    let inDebounce
    return function debounced(...params) {
        clearTimeout(inDebounce)
        inDebounce = setTimeout(
            () => f.apply(null, params),
            ms
        )
    }
}

/**
 * Applies a shader to the 3D model.
 * 
 * @param {Object} object3D 3D object model loaded.
 * @param {Object} shader Shader to apply to the material.
 * @param {Object} decor Parameters to configure the shader.
 */
export const applyShader = (object3D, shader, decor) => {
    object3D.traverse(child => {
        if (child.isMesh) {
            if (child.material[0]) {
                child.material.forEach((material, idx) => {
                    if (material.map) {
                        child.material[idx] = shader(
                            material.map,
                            decor
                        )
                    }
                })
            }
            else {
                if (child.material.map) {
                    child.material = shader(
                        child.material.map,
                        decor
                    )
                }
            }
        }
    })
}

/**
 * Loads GLTF files.
 * 
 * @param {String} path Path to the .gltf file.
 */
export const gltfLoader = path => new Promise((resolve, reject) => {
    const gltfLoader = new GLTFLoader()
    gltfLoader.load(
        path,
        resolve,
        event => {
            const percentage = (event.loaded / event.total) * 100
            console.log(`Loading 3D monster model... ${Math.round(percentage)}%`)
        },
        reject
    )
})