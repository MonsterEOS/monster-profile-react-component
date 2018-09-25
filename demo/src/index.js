import React, { Fragment, Component } from 'react'
import { render } from 'react-dom'
import monster3D from './assets/models/Devil.gltf'
import { Monster3DProfile, ActionType } from '../../src'

const monsterDecors = {
  neutral: {
    shader: {
      diffuse: 0x808080,
      emissive: 0x000000,
      hue: 0.0,
      saturation: 1.0,
      rimPower: 0.4,
      rimIntensity: 0.4,
      rimColor: 0x00aedb,
    }
  },
  fire: {
    shader: {
      diffuse: 0xff5555,
      emissive: 0x211111,
      hue: 0.0,
      saturation: 1.2,
      rimPower: 0.5,
      rimIntensity: 3.0,
      rimColor: 0xff3311,
    }
  },
  ice: {
    shader: {
      diffuse: 0x8888ee,
      emissive: 0x000000,
      hue: 0.0,
      saturation: 0.5,
      rimPower: 0.4,
      rimIntensity: 2.0,
      rimColor: 0x00aeeb,
    }
  },
  metal: {
    shader: {
      diffuse: 0x555577,
      emissive: 0x222222,
      hue: 0.0,
      saturation: 0.3,
      rimPower: 0.3,
      rimIntensity: 1.0,
      rimColor: 0xffffff,
    }
  }
}

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
          typeId="devil"
          path={monster3D}
          action={currentAnimation}
          size={{ height: "600px" }}
          background={{ alpha: 1 }}
          exposure={2}
          ambientColor={0xffffff}
          directIntensity={3}
          directColor={0xffffff}
          zoom={true}
          decor={monsterDecors.neutral}
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