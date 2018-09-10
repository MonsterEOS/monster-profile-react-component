import React, { Fragment } from 'react'
import { render } from 'react-dom'
import monster3D from './assets/models/Devil.gltf'
import { Monster3DProfile, ActionType } from '../../src'

const App = () =>
  <Fragment>
    <h1>Monster3DProfile</h1>
    <Monster3DProfile
      typeId="aa5a4sd4d5as4d"
      action={ActionType.IDLE}
      path={monster3D}
      size={{ width: "400px", height: "500px" }}
      background={{ color: "#322e3a", alpha: 1 }}
    />
  </Fragment>

render(
  <App />,
  document.querySelector('#demo')
)
