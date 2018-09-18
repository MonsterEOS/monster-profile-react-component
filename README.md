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
        typeId={5454543545454}
        path={monster3D}
        action={ActionType.IDLE}
        position={{ y: -50 }}
        size={{ height: "600px" }}
        background={{ alpha: 1 }}
        zoom={false}
    />
```

### Component properties
| Name             | Type     | Default                              | Description                                                                                        |
| ---------------- | -------- | ------------------------------------ | -------------------------------------------------------------------------------------------------- |
| typeId           | `number` |                                      | Monster ID.                                                                                        |
| path             | `string` |                                      | Path to .gltf file (monster 3D model).                                                             |
| action           | `string` | `Idle`                               | Monster state (animation name). Valid values are: Idle, Attack, HitReact, Sleeping, Feeding, Dead. |
| position         | `object` | `{ x: 0, y: 0, z: 0 }`               | Initial monster's position.                                                                        |
| rotation         | `object` | `{ x: 0, y: 0, z: 0 }`               | Initial monster's rotation. Values must be in radians.                                             |
| cameraPosition   | `object` | `{ x: 0, y: 0, z: 0 }`               | Initial cameras's position.                                                                        |
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
