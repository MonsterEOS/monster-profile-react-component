import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ActionType } from './utils/enums'
import * as THREE from 'three'
import GLTFLoader from './utils/GLTFLoader'
import OrbitControls from './utils/OrbitControls'


class Monster3DProfile extends Component {
  constructor(props) {
    super(props)
    this.setMountNodeRef = element => {
      this.mount = element
    }
    window.addEventListener(
      "resize",
      this.onWindowsResize,
      false
    )
  }

  componentDidMount() {
    const { background, path } = this.props
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    // add scene
    this.scene = new THREE.Scene()

    // add camera
    this.camera = new THREE.PerspectiveCamera(90, width / height, 0.25, 20)
    this.camera.position.set(0, 0, 1.5);
    this.camera.updateProjectionMatrix()

    // setting controls
    const controls = new OrbitControls(this.camera, this.mount)
    controls.target.set(0, -0.2, -0.2)
    controls.autoRotate = false
    controls.autoRotateSpeed = -10
    controls.screenSpacePanning = true
    controls.update()

    // add renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setClearColor(background.color, background.alpha)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(width, height)
    this.renderer.gammaOutput = true
    this.mount.appendChild(this.renderer.domElement)

    // add light
    const light = new THREE.AmbientLight(0xffffff, 1.1)
    light.position.set(0, 1, 0)
    this.scene.add(light)

    // loading monster with GLTF loader
    const loader = new GLTFLoader()

    loader.load(path, function (gltf) {
      const monster = gltf.scene.children[0]

      monster.updateMatrixWorld()

      // center monster
      const box = new THREE.Box3().setFromObject(monster)
      const center = box.getCenter(new THREE.Vector3())

      monster.position.x += (monster.position.x - center.x)
      monster.position.y += (monster.position.y - center.y)
      monster.position.z += (monster.position.z - center.z)

      controls.reset()

      // add scene
      this.scene.add(gltf.scene)
    }.bind(this), undefined, console.error.bind(console))

    this.start()
  }

  onWindowsResize = () => {
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }

  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop = () => {
    cancelAnimationFrame(this.frameId)
  }

  animate = () => {
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    const { size } = this.props

    return (
      <div
        style={{
          width: size.width,
          height: size.height
        }}
        ref={this.setMountNodeRef}
      />
    )
  }
}

Monster3DProfile.propTypes = {
  typeId: PropTypes.string.isRequired,
  action: PropTypes.oneOf(
    Object.keys(ActionType).map(
      key => ActionType[key]
    )
  ),
  path: PropTypes.string.isRequired,
  size: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string
  }),
  background: PropTypes.shape({
    color: PropTypes.string,
    alpha: PropTypes.number
  })
}

Monster3DProfile.defaultProps = {
  action: ActionType.SLEEPING,
  size: {
    width: "600px",
    height: "600px"
  },
  background: {
    color: "#00000",
    alpha: 1
  }
}

export { Monster3DProfile, ActionType }