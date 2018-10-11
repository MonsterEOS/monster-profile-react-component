//require('dotenv').config()
import React, { Fragment, Component } from 'react'
import { render } from 'react-dom'
import { monster3D, monsters } from './utils/monsterEnum'
import { Monster3DProfile, ActionType } from '../../src'
import monsterDecors from './utils/monsterDecorators'
import isSnaps from './utils/env'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentAnimation: ActionType.IDLE,
      currentMonster: monster3D("Baal"),
      selectedMonster: monsters[0]
    }
  }

  handleChange = (event) => {
    this.setState({ currentAnimation: event.target.value })
  }

  handleMonsterChange = (event) =>
    this.setState({ currentMonster: monster3D(event.target.value) })

  render() {
    const { currentAnimation, currentMonster } = this.state

    return (
      <Fragment>
        <h1>Monster3DProfile</h1>
        <Monster3DProfile
          typeId="devil"
          path={isSnaps ? monster3D(this.props.monster) : currentMonster }
          action={currentAnimation}
          size={{ height: "600px" }}
          background={{ alpha: isSnaps ? 0 : 1}}
          exposure={2}
          ambientColor={0xffffff}
          directIntensity={3}
          directColor={0xffffff}
          zoom={true}
          decor={monsterDecors.neutral}
        />
        <br />
        <label>Select monster: </label>
        <select onChange={this.handleMonsterChange}>
          {monsters.map(
            monster => (
              <option
                key={monster}
                value={monster}>
                {monster}
              </option>
            )
          )}
        </select>
        <br />
        <label>Select monster's state: </label>
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
if(isSnaps){
  window.renderIt = (monster, node) => {
    render(
      <App monster={monster}/>,
      node
    )}
}else{
  render(
    <App />,
    document.querySelector('#demo')
  )
}
