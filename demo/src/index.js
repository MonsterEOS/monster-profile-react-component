import React, { Fragment, Component } from 'react'
import { render } from 'react-dom'
import {monster3D, monsters} from './utils/monsterEnum';
//import monster3D from './assets/models/Tucan.gltf'
import { Monster3DProfile, ActionType } from '../../src'
import monsterDecors from './utils/monsterDecorators';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentAnimation: ActionType.IDLE,
      currentMonster : monster3D("Baal"),
      selectedMonster : monsters[0]
    }
  }

  handleChange = (event) => {
    this.setState({ currentAnimation: event.target.value })
  }

  handleMonsterChange = (event) => {
    //console.log(monster3D(event.target.value));
    this.setState({ currentMonster : monster3D(event.target.value) });
  }

  render() {
    const { currentAnimation, currentMonster } = this.state
    console.log(monster3D(this.props.monster))
    return (
      <Fragment>
        <h1>Monster3DProfile</h1>
        <Monster3DProfile
          typeId="devil"
          path={currentMonster} for outside of express
          //path={monster3D(this.props.monster)} for express
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
        <label>Select monster's state:</label>
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
        <br/>
        <label>Select monster: </label>
        <select onChange={this.handleMonsterChange}>
          {monsters.map(
            action => (
              <option value={action}>{action}</option>
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


/* For snaps only
window.renderIt = (monster, node) => {
  render(
    <App monster={monster}/>,
    node
  );
}*/