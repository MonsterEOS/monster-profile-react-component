import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ActionType } from './utils/enums'
import * as THREE from 'three'
import GLTFLoader from './utils/GLTFLoader'
import OBJLoader from './utils/OBJLoader'
import OrbitControls from './utils/OrbitControls'
import injectSheet from 'react-jss'
import styles from './styles'

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
    const { background, path, zoom, lightIntensity } = this.props

    // default values
    const defaultBackground = { color: "#322e3a", alpha: 1 }
    const canvasBackground = { ...defaultBackground, ...background }

    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    this.ambientalLightIntensity = 0.15

    // add scene
    this.scene = new THREE.Scene()

    // add camera
    this.camera = new THREE.PerspectiveCamera(70, width / height, 0.25, 1000)
    this.camera.updateProjectionMatrix()

    // setting controls
    this.controls = new OrbitControls(this.camera, this.mount)
    this.controls.target.set(0, 0, 0)
    this.controls.screenSpacePanning = true
    this.controls.enableZoom = zoom
    this.controls.update()

    // add renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setClearColor(canvasBackground.color, canvasBackground.alpha)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(width, height)
    this.renderer.gammaOutput = true
    this.mount.appendChild(this.renderer.domElement)

    // add ambiental white light
    this.light = new THREE.AmbientLight(0xffffff, this.ambientalLightIntensity)
    this.light.position.set(0, 1, 0)
    this.scene.add(this.light)

    // add point white light
    const pointLightSphere = new THREE.SphereBufferGeometry(20, 16, 8)

    this.pointLight = new THREE.PointLight(0xffffff, lightIntensity, 1000)
    this.pointLight.add(new THREE.Mesh(
      pointLightSphere,
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    ))

    // make it child of the camera and add it to the scene
    this.camera.add(this.pointLight)
    this.scene.add(this.camera)

    // loading monster with GLTF loader
    const gltfLoader = new GLTFLoader()
    gltfLoader.load(
      path,
      this.loadMonster,
      // TODO: add a loader.
      event => {
        const percentage = (event.loaded / event.total) * 100
        console.log(`Loading 3D model... ${Math.round(percentage)}%`)
      },
      console.error.bind(console)
    )

    // start scene
    this.start()
  }

  loadMonster = gltf => {
    this.model = gltf
    this.monster = this.model.scene.children[0]

    const { rotation, action } = this.props
    const defaultRotation = { x: -0.1, y: 0.6, z: 0 }
    const monsterRotation = { ...defaultRotation, ...rotation }

    this.monster.updateMatrixWorld()

    // center monster
    const box = new THREE.Box3().setFromObject(this.monster)
    const size = box.getSize(new THREE.Vector3()).length()
    const center = box.getCenter(new THREE.Vector3())

    this.monster.position.x += (this.monster.position.x - center.x)
    this.monster.position.y += (this.monster.position.y - center.y)
    this.monster.position.z += (this.monster.position.z - center.z)

    // get it closer (makes the rotation weird)
    this.monster.position.z += 80
    this.monster.position.x += 55

    // set model initial rotation
    this.monster.rotation.x = monsterRotation.x
    this.monster.rotation.y = monsterRotation.y
    this.monster.rotation.z = monsterRotation.z

    this.controls.maxDistance = size * 1
    this.controls.reset()

    this.camera.near = size / 100
    this.camera.far = size * 100

    this.camera.position.copy(center)
    this.camera.lookAt(center)
    this.camera.position.x += size / 2.0
    this.camera.position.y += size / 14
    this.camera.position.z += size / 1.5

    this.camera.updateProjectionMatrix()
    // backup camera to restore it later
    this.backupCamera = this.camera.clone()

    // add scene
    this.scene.add(this.monster)

    // darken or clear the monster according to current 'action'
    this.monsterColorState(action)

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

  darkenMonster = () => {
    // resetting camera
    this.camera.position.x = this.backupCamera.position.x
    this.camera.position.y = this.backupCamera.position.y
    this.camera.position.z = this.backupCamera.position.z
    this.camera.rotation.set(this.backupCamera.rotation)
    this.camera.updateProjectionMatrix()
    // dark light
    this.light.color.setHex(0x0f0f0f)
    this.pointLight.color.setHex(0x000000)
    // disable controls
    this.controls.enabled = false
  }

  clearMonster = () => {
    const { lightIntensity } = this.props
    // white light
    this.light.color.setHex(0xffffff)
    this.light.intensity = this.ambientalLightIntensity
    this.pointLight.color.setHex(0xffffff)
    this.pointLight.intensity = lightIntensity
    // enable controls
    this.controls.enabled = true
  }

  monsterColorState = (action) => {
    if (
      action === ActionType.SLEEPING ||
      action === ActionType.DEAD
    ) {
      this.darkenMonster()
    } else {
      this.clearMonster()
    }
    this.onWindowsResize
  }

  applyPropertyUpdate = () => {
    const { autoRotate, autoRotateSpeed, action } = this.props
    // controls
    this.controls.autoRotate = autoRotate
    this.controls.autoRotateSpeed = autoRotateSpeed

    // action (state animation)
    this.monsterColorState(action)
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
    const { size, classes } = this.props

    if (this.mount) {
      this.applyPropertyUpdate()
      this.changeStateAnimation()
    }

    return (
      <div
        className={classes.profile3D}
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
  autoRotateSpeed: PropTypes.number,
  zoom: PropTypes.bool,
  lightIntensity: PropTypes.number
}

Monster3DProfile.defaultProps = {
  action: ActionType.IDLE,
  size: {
    width: "auto",
    height: "600px"
  },
  autoRotate: false,
  autoRotateSpeed: -10,
  zoom: true,
  lightIntensity: 1.7
}

Monster3DProfile = injectSheet(styles)(Monster3DProfile)

export { Monster3DProfile, ActionType }