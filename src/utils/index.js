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