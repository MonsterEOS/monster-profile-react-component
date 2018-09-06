import React, { Fragment } from 'react'
import Monster3DProfile from './Monster3DProfile'
import { ActionType } from '../utils/enums'

const App = ({ typeId, action }) =>
    <Fragment>
        <h1>Monster3DProfile</h1>
        <Monster3DProfile
            typeId={25}
            action={ActionType.IDLE}
        />
    </Fragment>

export default App