import React, { Fragment } from 'react'
import Monster3DProfile from './Monster3DProfile'
import { ActionType } from '../utils/enums'
import monster3D from '../assets/models/Devil.gltf'

const App = ({ typeId, action }) =>
    <Fragment>
        <h1>Monster3DProfile</h1>
        <Monster3DProfile
            typeId="aa5a4sd4d5as4d"
            action={ActionType.IDLE}
            path={monster3D}
        />
    </Fragment>

export default App