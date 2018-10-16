/**
 * ideal configuration for every monster 3D model.
 */
export default (model) => {
    switch (model) {
        case "baal":
            return {
                model,
                position: { y: 0, x: 0 },
                rotation: { y: 0 },
                cameraPosition: { z: -320 }
            }
        case "bear":
            return {
                model,
                position: { y: -10, x: 0 },
                rotation: { y: 0.7 },
                cameraPosition: { z: -250 }
            }
        case "butterfly":
            return {
                model,
                position: { y: -70, x: 0 },
                rotation: { y: 0 },
                cameraPosition: { z: -70 }
            }
        case "cactus":
            return {
                model,
                position: { y: 0 },
                rotation: { y: 0 },
                cameraPosition: { z: -100 }
            }
        case "duck":
            return {
                model,
                position: { y: 0, x: 0 },
                rotation: { y: 0.35 },
                cameraPosition: { z: -80 }
            }
        case "cerberus":
            return {
                model,
                position: { y: 0 },
                rotation: { y: 0.3, x: -0.2 },
                cameraPosition: { z: -110 }
            }
        case "devil":
            return {
                model,
                position: { y: -20 },
                rotation: { y: 0 },
                cameraPosition: { z: -120 }
            }
        case "dwarf":
            return {
                model,
                position: { y: 0, x: 0 },
                rotation: { y: 0 },
                cameraPosition: { z: -40 }
            }
        case "frog":
            return {
                model,
                position: { y: 0, x: 0 },
                rotation: { x: 0.5 },
                cameraPosition: { z: 0 }
            }
        case "ghost":
            return {
                model,
                position: { y: -30 },
                rotation: { y: 0 },
                cameraPosition: { z: -40 }
            }
        case "minion":
            return {
                model,
                position: { y: 0, x: 0 },
                rotation: { y: 0 },
                cameraPosition: { z: -60 }
            }
        case "metal-guitar":
            return {
                model,
                position: { y: 0, x: 0 },
                rotation: { y: 1 },
                cameraPosition: { z: -165 }
            }
        case "ness":
            return {
                model,
                position: { y: 0 },
                rotation: { y: 0 },
                cameraPosition: { z: -630 }
            }
        case "ogre":
            return {
                model,
                position: { y: -30, x: -10 },
                rotation: { y: 0 },
                cameraPosition: { z: -150 }
            }
        case "rock-worm":
            return {
                model,
                position: { y: -110, x: 10 },
                rotation: { y: 0.5, x: 0.2 },
                cameraPosition: { z: -530 }
            }
        case "rocky":
            return {
                model,
                position: { y: 0, x: 20 },
                rotation: { y: 0 },
                cameraPosition: { z: -150 }
            }
        case "scorpion":
            return {
                model,
                position: { y: 30, x: -10 },
                rotation: { y: 0.5, x: 0.5 },
                cameraPosition: { z: -180 }
            }
        case "serpent":
            return {
                model,
                position: { y: -40, x: 0 },
                rotation: { y: 0.3 },
                cameraPosition: { z: -280 }
            }
        case "spider":
            return {
                model,
                position: { y: 0, x: -10 },
                rotation: { y: 0 },
                cameraPosition: { z: -80 }
            }
        case "the-thing":
            return {
                model,
                position: { y: 0, x: 0 },
                rotation: { y: 0 },
                cameraPosition: { z: -150 }
            }
        case "tree":
            return {
                model,
                position: { y: 10, x: 0 },
                rotation: { y: 0 },
                cameraPosition: { z: -200 }
            }
        case "troll":
            return {
                model,
                position: { y: 10, x: 0 },
                rotation: { y: 0.5 },
                cameraPosition: { z: -300 }
            }
        case "tucan":
            return {
                model,
                position: { y: -50 },
                rotation: { y: 1, x: 0.4 },
                cameraPosition: { z: -100 }
            }
        case "worm":
            return {
                model,
                position: { y: 40, x: 0 },
                rotation: { y: 0, x: 0.5 },
                cameraPosition: { z: -80 }
            }
        default:
            return {
                model,
                position: { y: 0, x: 0 },
                rotation: { y: 0 },
                cameraPosition: { z: -40 }
            }
    }
}