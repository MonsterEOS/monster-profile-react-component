import React, { Fragment, Component } from 'react'
import { render } from 'react-dom'
import monster3D from './assets/models/monster-5.gltf'
import { Monster3DProfile, ActionType } from '../../src'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentAnimation: ActionType.IDLE
    }
  }

  handleChange = (event) => {
    this.setState({ currentAnimation: event.target.value })
  }

  render() {
    const { currentAnimation } = this.state

    return (
      <Fragment>
        <h1>Monster3DProfile</h1>
        <Monster3DProfile
          typeId={5454543545454}
          path={monster3D}
          action={currentAnimation}
          size={{ height: "600px" }}
          background={{ alpha: 1 }}
          exposure={2}
          ambientColor={0x000000}
          directIntensity={2}
          directColor={0x4c0000}
          zoom={true}
        />
        <select
          value={currentAnimation}
          onChange={this.handleChange}
        >
          {Object.keys(ActionType).map(
            action => (
              <option
                key={action}
                value={ActionType[action]}>
                {action}
              </option>
            )
          )}
        </select>
        <p><b>NOTE:</b> FEEDING doesn't have yet the <b>Chomp Chomp</b> animation.</p>
        <p>And DEAD is only a black monster. Maybe it should have a "DEAD word" animation. </p>
      </Fragment>
    )
  }
}

render(
  <App />,
  document.querySelector('#demo')
)