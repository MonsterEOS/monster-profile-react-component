export default (model) =>
    import(`../../models/${model}.gltf`)
        .then(module => module)
        .catch(console.log)