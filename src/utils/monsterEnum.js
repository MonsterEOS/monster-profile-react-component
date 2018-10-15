import Baal from '../../models/baal.gltf'
import BadChicken from  '../../models/bad-chicken.gltf'
import Bat from  '../../models/bat.gltf'
import Bear from '../../models/bear.gltf'
import Beetle from '../../models/beetle.gltf'
import Butterfly from '../../models/butterfly.gltf'
import Cactus from '../../models/cactus.gltf'
import Cerberus from '../../models/cerberus.gltf'
import Devil from '../../models/devil.gltf'
import Duck from '../../models/duck.gltf'
import Dwarf from '../../models/dwarf.gltf'
import Egg from '../../models/egg.gltf'
import Frog from '../../models/frog.gltf'
import Ghost from '../../models/ghost.gltf'
import MetalGuitar from '../../models/metal-guitar.gltf'
import Minion from '../../models/minion.gltf'
import Ness from '../../models/ness.gltf'
import Ogre from '../../models/ogre.gltf'
import Penguin from '../../models/penguin.gltf'
import RockWorm from '../../models/rock-worm.gltf'
import Rocky from '../../models/rocky.gltf'
import Scorpion from '../../models/scorpion.gltf'
import Serpent from '../../models/serpent.gltf'
import Spider from '../../models/spider.gltf'
import TheThing from '../../models/the-thing.gltf'
import Toad from '../../models/toad.gltf'
import Tree from '../../models/tree.gltf'
import Troll from '../../models/troll.gltf'
import Tucan from '../../models/tucan.gltf'
import Vampire from '../../models/vampire.gltf'
import Wolf from '../../models/wolf.gltf'
import Worm from '../../models/worm.gltf'

export default monster => {
    switch (monster) {
        case "baal":
            return Baal;
        case "bad-chicken":
            return BadChicken;
        case "bat":
            return Bat;
        case "bear":
            return Bear;
        case "beetle":
            return Beetle;
        case "butterfly":
            return Butterfly;
        case "cactus":
            return Cactus;
        case "cerberus":
            return Cerberus;
        case "devil":
            return Devil;
        case "duck":
            return Duck;
        case "dwarf":
            return Dwarf;
        case "egg":
            return Egg;
        case "frog":
            return Frog;
        case "ghost":
            return Ghost;
        case "metal-guitar":
            return MetalGuitar;
        case "minion":
            return Minion;
        case "ness":
            return Ness;
        case "ogre":
            return Ogre;
        case "penguin":
            return Penguin;
        case "rock-worm":
            return RockWorm;
        case "rocky":
            return Rocky;
        case "scorpion":
            return Scorpion;
        case "serpent":
            return Serpent;
        case "spider":
            return Spider;
        case "the-thing":
            return TheThing;
        case "toad":
            return Toad;
        case "tree":
            return Tree;
        case "troll":
            return Troll;
        case "tucan":
            return Tucan;
        case "vampire":
            return Vampire;
        case "wolf":
            return Wolf;
        case "worm":
            return Worm;
    }
}
/*
export default (model) =>
    import(`../../models/${model}.gltf`)
        .then(module => module)
        .catch(console.log)*/