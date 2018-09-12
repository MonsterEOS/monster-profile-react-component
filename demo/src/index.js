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
          size={{ height: "500px" }}
          background={{ alpha: 0 }}
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
                {action}
              </option>
            )
          )}
        </select>
        <p><b>NOTE:</b> SLEEPING, FEEDING and DEAD are defaulting to <mark>IDLE</mark> for now.</p>
        <p>IDLE action is triggering the dark screen (it's supposed to happen for SLEEPING and DEAD).</p>
      </Fragment>
    )
  }
}

render(
  <App />,
  document.querySelector('#demo')
)