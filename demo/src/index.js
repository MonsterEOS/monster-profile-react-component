import React, { Fragment, Component } from 'react'
import { render } from 'react-dom'
import { monsters } from './utils/monsterEnum'
import { Monster3DProfile, ActionType } from '../../src'
import isSnaps from './utils/env'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentAnimation: ActionType.IDLE,
      currentMonster: 72,
      selectedMonster: monsters[0],
      currentShader: "neutral"
    }
  }

  handleChange = (event) => {
    this.setState({ currentAnimation: event.target.value })
  }

  handleMonsterChange = (event) => {
    //this.setState({ currentMonster: parseInt(event.target.value) })
  }

  render() {
    const { currentAnimation, currentMonster, currentShader } = this.state

    return (
      <Fragment>
        <h1>Monster3DProfile</h1>
        <Monster3DProfile
          typeId={isSnaps ? this.props.monster : currentMonster }          
          action={currentAnimation}
          size={{ height: "600px" }}
          background={{ alpha: isSnaps ? 0 : 1}}
          exposure={2}
          ambientColor={0xffffff}
          directIntensity={3}
          directColor={0xffffff}
          zoom={true}
          decor={currentShader}
          isDead = {false}
        />
        <br /><br />
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
        <br/>
        <select
          value={currentMonster}
          onChange={this.handleMonsterChange}
        >
          {Object.keys(monsters).map(
            action => (
              <option
                key={action}
                value={action}>
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
