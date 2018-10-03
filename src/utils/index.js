import GLTFLoader from './GLTFLoader';
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


export const gltfLoader = (path, monster) => new Promise((resolve, reject) => {
    const gltfLoader = new GLTFLoader()
        gltfLoader.load(
          path,
          monster,
          event => {
            const percentage = (event.loaded / event.total) * 100
            console.log(`Loading 3D monster model... ${Math.round(percentage)}%`)
          },
          reject
        )
});