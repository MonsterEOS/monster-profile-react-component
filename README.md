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
        typeId="aa5a4sd4d5as4d"
        action={ActionType.IDLE}
        path={monster3D}
        size={{ width: "400px", height: "500px" }}
        background={{ color: "#322e3a", alpha: 1 }}
    />
```
### Component properties
| Name       | Type     | Default                             | Description                            |
| ---------- | -------- | ----------------------------------- | -------------------------------------- |
| typeId     | `string` |                                     | Monster ID.                            |
| action     | `number` | `0`                                 | IDLE monster state.                    |
| path       | `string` |                                     | Path to .gltf file (monster 3D model). |
| size       | `object` | `{width: "600px", height: "600px"}` | Canvas dimensions.                     |
| background | `object` | `{color: "#00000", alpha: 1 }`      | Canvas background configuration        |
