import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ActionType } from './utils/enums'
import * as THREE from 'three'
import GLTFLoader from './utils/GLTFLoader'
import OrbitControls from './utils/OrbitControls'
import "./index.css"

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
    this.prevTime = 0
  }

  componentDidMount() {
    const { background, path } = this.props

    // default values
    const defaultBackground = { color: "#322e3a", alpha: 1 }
    const canvasBackground = { ...defaultBackground, ...background }

    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    // add scene
    this.scene = new THREE.Scene()

    // add camera
    this.camera = new THREE.PerspectiveCamera(70, width / height, 0.25, 1000)
    this.camera.updateProjectionMatrix()

    // setting controls
    this.controls = new OrbitControls(this.camera, this.mount)
    this.controls.target.set(0, -0.2, -0.2)
    this.controls.screenSpacePanning = true
    this.controls.update()

    // add renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setClearColor(canvasBackground.color, canvasBackground.alpha)
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

    loader.load(
      path,
      this.loadMonster,
      undefined,
      console.error.bind(console)
    )

    // start scene
    this.start()
  }

  loadMonster = gltf => {
    this.model = gltf

    const { rotation, action } = this.props
    const defaultRotation = { x: -0.1, y: 0.7, z: 0 }
    const monsterRotation = { ...defaultRotation, ...rotation }

    this.monster = this.model.scene
    this.monster.updateMatrixWorld()

    // center this.monster
    const box = new THREE.Box3().setFromObject(this.monster)
    const size = box.getSize(new THREE.Vector3()).length()
    const center = box.getCenter(new THREE.Vector3())

    this.monster.position.x += (this.monster.position.x - center.x)
    this.monster.position.y += (this.monster.position.y - center.y)
    this.monster.position.z += (this.monster.position.z - center.z)

    // set model initial rotation
    this.monster.rotation.x = monsterRotation.x
    this.monster.rotation.y = monsterRotation.y
    this.monster.rotation.z = monsterRotation.z

    this.controls.maxDistance = size * 10
    this.controls.reset()

    this.camera.near = size / 100
    this.camera.far = size * 100
    this.camera.updateProjectionMatrix()

    this.camera.position.copy(center);
    this.camera.position.x += size / 2.0;
    this.camera.position.y += size / 14.0;
    this.camera.position.z += size / 1.5;
    this.camera.lookAt(center);

    // add scene
    this.scene.add(this.monster)

    // start animation
    this.mixer = new THREE.AnimationMixer(this.monster)
    this.mixer.clipAction(
      THREE.AnimationClip.findByName(
        this.model.animations, action
      )
    ).play()
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

  animate = (time) => {
    this.frameId = window.requestAnimationFrame(this.animate)
    const delta = (time - this.prevTime) / 1000

    this.mixer && this.mixer.update(delta)
    this.controls.update()
    this.renderScene()
    this.prevTime = time
  }

  applyPropertyUpdate = () => {
    const { autoRotate, autoRotateSpeed } = this.props
    // controls
    this.controls.autoRotate = autoRotate
    this.controls.autoRotateSpeed = autoRotateSpeed
  }

  changeStateAnimation = () => {
    this.mixer.stopAllAction()
    this.mixer.clipAction(
      THREE.AnimationClip.findByName(
        this.model.animations,
        this.props.action
      )
    ).play()
  }

  renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    const { size } = this.props

    if (this.mount) {
      this.applyPropertyUpdate()
      this.changeStateAnimation()
    }

    return (
      <div
        id="canvas-3d"
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
  typeId: PropTypes.number.isRequired,
  action: PropTypes.oneOf(
    Object.keys(ActionType).map(
      key => ActionType[key]
    )
  ),
  path: PropTypes.string.isRequired,
  rotation: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number
  }),
  size: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string
  }),
  background: PropTypes.shape({
    color: PropTypes.string,
    alpha: PropTypes.number
  }),
  autoRotate: PropTypes.bool,
  autoRotateSpeed: PropTypes.number
}

Monster3DProfile.defaultProps = {
  action: ActionType.SLEEPING,
  size: {
    width: "auto",
    height: "600px"
  },
  autoRotate: false,
  autoRotateSpeed: -10
}

export { Monster3DProfile, ActionType }