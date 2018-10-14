export default (decoration) => {

  switch (decoration) {
    case "neutral":
      return {
        shader: {
          diffuse: 0x808080,
          emissive: 0x000000,
          hue: 0.0,
          saturation: 1.5,
          rimPower: 0.4,
          rimIntensity: 0.4,
          rimColor: 0x00aedb,
        }
      }
    case "animal":
    return {
        shader: {
          diffuse: 0x809080,
          emissive: 0x000000,
          hue: 0.0,
          saturation: 2.0,
          rimPower: 0.4,
          rimIntensity: 1.0,
          rimColor: 0xA1B41B,
        }
    }
    case "fire":
    return {
      shader: {
        diffuse: 0xff5555,
        emissive: 0x211111,
        hue: 0.0,
        saturation: 1.2,
        rimPower: 0.5,
        rimIntensity: 3.0,
        rimColor: 0xff3311,
      }
    }
    case "ice":
    return {
      shader: {
        diffuse: 0x8888ee,
        emissive: 0x000000,
        hue: 0.0,
        saturation: 0.5,
        rimPower: 0.4,
        rimIntensity: 2.0,
        rimColor: 0x00aeeb,
      }
    }
    case "metal": 
      return {
        shader: {
          diffuse: 0x555577,
          emissive: 0x222222,
          hue: 0.0,
          saturation: 0.3,
          rimPower: 0.3,
          rimIntensity: 1.0,
          rimColor: 0xffffff,
        }
      }
    
    case "poison" : 
      return {
        shader: {
          diffuse: 0xA69752,
          emissive: 0x000000,
          hue: 0.0,
          saturation: 1.0,
          rimPower: 0.8,
          rimIntensity: 0.0,
          rimColor: 0xB9FF2C,
        }
      }
    
    case "water" : 
      return {
        shader: {
          diffuse: 0x2790B0,
          emissive: 0x111122,
          hue: 0.0,
          saturation: 1.0,
          rimPower: 0.8,
          rimIntensity: 0.0,
          rimColor: 0x55C3DC,
        }
      }    
    
    case "earth" : 
      return {
        shader: {
          diffuse: 0x764C22,
          emissive: 0x222222,
          hue: 0.0,
          saturation: 1.0,
          rimPower: 0.6,
          rimIntensity: 1.0,
          rimColor: 0xCDA658,
        }
      }
    

    case "wood" : 
      return {
        shader: {
          diffuse: 0x574632,
          emissive: 0x574632,
          hue: 0.0,
          saturation: 0.2,
          rimPower: 0.9,
          rimIntensity: 1.0,
          rimColor: 0xBBA37D,
        }
      }
    

    case "light" : 
      return {
        shader: {
          diffuse: 0xFBB829,
          emissive: 0x111111,
          hue: 0.0,
          saturation: 0.4,
          rimPower: 0.6,
          rimIntensity: 3.0,
          rimColor: 0xFBB829,
        }
      }
    

    case "undead" : 
      return {
        shader: {
          diffuse: 0x808080,
          emissive: 0x111111,
          hue: 0.0,
          saturation: 0.2,
          rimPower: 0.1,
          rimIntensity: -0.3,
          rimColor: 0x00aedb,
        }
      }
    

    case "dead" : 
      return {
        shader: {
          diffuse: 0x808080,
          emissive: 0x000000,
          hue: 0.0,
          saturation: 0.1,
          rimPower: 0.4,
          rimIntensity: 0.2,
          rimColor: 0x00aedb,
        }
      }
    
    }
    
  } 