import React, { Fragment, Component } from 'react'
import { render } from 'react-dom'
import monster3D from './assets/models/Devil.gltf'
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
    return (
      <Fragment>
        <h1>Monster3DProfile</h1>
        <Monster3DProfile
          typeId={5454543545454}
          action={this.state.currentAnimation}
          path={monster3D}
          size={{ width: "400px", height: "500px" }}
          background={{ color: "#322e3a", alpha: 1 }}
        />
        <select
          value={this.state.currentAnimation}
          onChange={this.handleChange}
        >
          {Object.keys(ActionType).map(
            action => (
              <option
                key={action}
                value={ActionType[action]}>
                {ActionType[action]}
              </option>
            )
          )}
        </select>
      </Fragment>
    )
  }
}

render(
  <App />,
  document.querySelector('#demo')
)