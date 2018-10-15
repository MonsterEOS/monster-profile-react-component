# react-monstereos-profile

## How to install
Execute:
```
npm install --save https://github.com/VertexStudio/monster-profile-react-component
```
or
```
yarn add https://github.com/VertexStudio/monster-profile-react-component
```

Then, install its peer dependencies:
```
npm install --save react@16.x three@^0.96.0
```

## Usage

```javascript
import React from 'react'
import monster3D from './assets/models/vampire.gltf'
import { Monster3DProfile, ActionType } from 'react-monstereos-profile'

const Monster = () =>
    <Monster3DProfile
        typeId = 0        
        action={ActionType.IDLE}
        decor="ice"
        size={{ height: "600px" }}
        background={{ alpha: 1 }}
        zoom={false}
    />
```

### Component properties
| Name             | Type     | Default                              | Description                                                                                        |
| ---------------- | -------- | ------------------------------------ | -------------------------------------------------------------------------------------------------- |
| typeId           | `string` | 0                               | Monster type id               |
| decor            | `string` | `neutral`                            | Name of the type of monster to apply, examples: "metal", "neutral", "fire".                        |
| isDead            | `boolean` | `false`                            | Applied is the monster is dead                        | 
| action           | `string` | `Idle`                               | Monster state (animation name). Valid values are: Idle, Attack, HitReact, Sleeping, Feeding, Dead. |
| autoRotate       | `bool`   | `false`                              | Enables autorotation.                                                                              |
| autoRotateSpeed  | `number` | `-10`                                | If autorotation is enabled, defines its speed.                                                     |
| exposure         | `number` | `1`                                  | Exposure level of tone mapping.                                                                    |
| ambientIntensity | `number` | `0.15`                               | Ambient light intensity.                                                                           |
| ambientColor     | `number` | `0xffffff`                           | Ambient light color. It's a hex color number.                                                      |
| directIntensity  | `number` | `1.7`                                | Point light intensity. It gives contour and shape to the monster.                                  |
| directColor      | `number` | `0xffffff`                           | Point light color. It's a hex color number.                                                        |
| zoom             | `bool`   | `true`                               | Enables zoom.                                                                                      |
| size             | `object` | `{ width: "auto", height: "600px" }` | Canvas dimensions.                                                                                 |
| background       | `object` | `{ color: "#00000", alpha: 1 }`      | Canvas background configuration.                                                                   |


## Run demo

1. `git clone https://github.com/VertexStudio/monster-profile-react-component`.
2. `cd monster-profile-react-component`.
3. `npm install`.
4. `npm start`.
5. Demo running at `http://localhost:3000/`. 

## Generating PNG files

1) Change the property to `true` into the file `demo/src/utils/env.js`
2) Change execution permissions on `snaps.sh` file with: `chmod u+x snaps.sh`
3) Navigate to snapshots folder `cd snapshots/` and type `npm install`
4) Go back to the main directory `cd ../`
5) Run the script `./snaps.sh`
6) Wait...
7) This command will generate a images folder inside snapshots directory containing the png files of all monsters.
8) Do not forget to change the property on the file `demo/src/utils/env.js` to `false`