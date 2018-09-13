# react-monstereos-profile

## How to install
Execute:
```
npm install --save https://github.com/VertexStudio/monster-profile-react-component
```

Then, install its peer dependencies:
```
npm install --save react@16.x three@^0.96.0
```

## Usage

```javascript
import React from 'react'
import { Monster3DProfile, ActionType } from 'react-monstereos-profile'

const Monster = () =>
    <Monster3DProfile
        typeId={554845454654474}
        action={ActionType.IDLE}
        path={monster3D}
        size={{ height: "500px" }}
        background={{ color: "#322e3a", alpha: 1 }}
        zoom={false}
    />
```

### Component properties
| Name            | Type     | Default                              | Description                                    |
| --------------- | -------- | ------------------------------------ | ---------------------------------------------- |
| typeId          | `number` |                                      | Monster ID.                                    |
| action          | `string` | `IDLE`                               | Monster state (animation name).                |
| path            | `string` |                                      | Path to .gltf file (monster 3D model).         |
| rotation        | `object` | `{ x: -0.1, y: 0.7, z: 0 }`          | Initial monster's rotation.                    |
| autoRotate      | `bool`   | `false`                              | Enables autorotation.                          |
| autoRotateSpeed | `number` | `-10`                                | If autorotation is enabled, defines its speed. |
| zoom            | `bool`   | `true`                               | Enables zoom.                                  |
| size            | `object` | `{ width: "auto", height: "600px" }` | Canvas dimensions.                             |
| background      | `object` | `{ color: "#00000", alpha: 1 }`      | Canvas background configuration.               |
| lightIntensity  | `number` | `1.7`                                | Point light intensity.                         |


## Run demo

1. Clone the repository.
2. `cd` into the directory of the repo.
3. Execute `npm install`.
4. Execute `npm start`.