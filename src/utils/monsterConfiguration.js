export default (model) => {
    switch (model) {
        case "Baal":
            return {
                model,
                position: { y: 0, x: 0 },
                rotation: { y: 0 },
                cameraPosition: { z: -320 }
            }
        case "Bear":
            return {
                model,
                position: { y: -10, x: 0, z: 0 },
                rotation: { y: 0.7, x: 0, z:0 },
                cameraPosition: { z: -250 }
            }
        case "Butterfly":
            return {
                model,
                position: { y: -70, x: 0 },
                rotation: { y: 0 },
                cameraPosition: { z: -70 }
            }
        case "Cactus":
            return {
                model,
                position: { y: 0 },
                rotation: { y: 0 },
                cameraPosition: { z: -100 }
            }
        case "Duck":
            return {
                model,
                position: { y: 0, x: 0 },
                rotation: { y: 0.35 },
                cameraPosition: { z: -80 }
            }
        case "Cerberus":
            return {
                model,
                position: { y: 0 },
                rotation: { y: 0.3, x: -0.2 },
                cameraPosition: { z: -110 }
            }
        case "Devil":
            return {
                model,
                position: { y: -20 },
                rotation: { y: 0 },
                cameraPosition: { z: -120 }
            }
        case "Dwarf":
            return {
                model,
                position: { y: 0, x: 0 },
                rotation: { y: 0 },
                cameraPosition: { z: -40 }
            }
        case "Frog":
            return {
                model,
                position: { y: 0, x: 0 },
                rotation: { x: 0.5 },
                cameraPosition: { z: 0 }
            }
        case "Ghost":
            return {
                model,
                position: { y: -30 },
                rotation: { y: 0 },
                cameraPosition: { z: -40 }
            }
        case "Minion":
            return {
                model,
                position: { y: 0, x: 0 },
                rotation: { y: 0 },
                cameraPosition: { z: -60 }
            }
        case "MetalGuitar":
            return {
                model,
                position: { y: 0, x: 0 },
                rotation: { y: 1 },
                cameraPosition: { z: -165 }
            }
        case "Ness":
            return {
                model,
                position: { y: 0 },
                rotation: { y: 0 },
                cameraPosition: { z: -630 }
            }
        case "Ogre":
            return {
                model,
                position: { y: -30, x: -10 },
                rotation: { y: 0 },
                cameraPosition: { z: -150 }
            }
        case "RockWorm":
            return {
                model,
                position: { y: -110, x: 10 },
                rotation: { y: 0.5, x: 0.2 },
                cameraPosition: { z: -530 }
            }
        case "Rocky":
            return {
                model,
                position: { y: 0, x: 20 },
                rotation: { y: 0 },
                cameraPosition: { z: -150 }
            }
        case "Scorpion":
            return {
                model,
                position: { y: 30, x: -10 },
                rotation: { y: 0.5, x: 0.5 },
                cameraPosition: { z: -180 }
            }
        case "Serpent":
            return {
                model,
                position: { y: -40, x: 0 },
                rotation: { y: 0.3 },
                cameraPosition: { z: -280 }
            }
        case "Spider":
            return {
                model,
                position: { y: 0, x: -10 },
                rotation: { y: 0 },
                cameraPosition: { z: -80 }
            }
        case "TheThing":
            return {
                model,
                position: { y: 0, x: 0 },
                rotation: { y: 0 },
                cameraPosition: { z: -150 }
            }
        case "Tree":
            return {
                model,
                position: { y: 10, x: 0 },
                rotation: { y: 0 },
                cameraPosition: { z: -200 }
            }
        case "Troll":
            return {
                model,
                position: { y: 10, x: 0 },
                rotation: { y: 0.5 },
                cameraPosition: { z: -300 }
            }
        case "Tucan":
            return {
                model,
                position: { y: -50 },
                rotation: { y: 1, x: 0.4 },
                cameraPosition: { z: -100 }
            }
        case "Worm":
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