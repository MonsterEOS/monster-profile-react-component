import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ActionType } from './utils/enums'
import * as THREE from 'three'
import GLTFLoader from './utils/GLTFLoader'
import OrbitControls from './utils/OrbitControls'
import injectSheet from 'react-jss'
import styles from './styles'
import sleeping from '../models/ZZZ.gltf'
import { debounce, gltfLoader } from './utils'
import VertexStudioMaterial from './utils/VextexStudioMaterial'

class Monster3DProfile extends Component {
  constructor(props) {
    super(props)
    this.setMountNodeRef = element => {
      this.mount = element
    }
    window.addEventListener(
      "resize", this.onWindowsResize, false
    )
    // used to calculate the delta between frames
    this.prevTime = 0
  }

 componentDidMount() {
    const { background, path, ambientIntensity, ambientColor, directIntensity, directColor, zoom } = this.props

    // default values
    const defaultBackground = { color: "#322e3a", alpha: 1 }
    const canvasBackground = { ...defaultBackground, ...background }

    // DOM element (canvas) dimensions
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    // add scene
    this.scene = new THREE.Scene()

    // add camera
    this.camera = new THREE.PerspectiveCamera(70, width / height, 0.25, 1000)

    // setting controls
    this.controls = new OrbitControls(this.camera, this.mount)
    this.controls.target.set(0, 0, 0)
    this.controls.screenSpacePanning = true
    this.controls.enableKeys = false
    this.controls.enablePan = false
    this.controls.enableZoom = zoom
    this.controls.update()

    // add renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true, premultipliedAlpha: false })
    this.renderer.setClearColor(canvasBackground.color, canvasBackground.alpha)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)

    // add ambiental light
    this.light = new THREE.AmbientLight(ambientColor, ambientIntensity)
    this.light.position.set(0, 1, 0)
    this.scene.add(this.light)

    // add point light
    const pointLightSphere = new THREE.SphereBufferGeometry(20, 16, 8)
    this.pointLight = new THREE.PointLight(directColor, directIntensity, 1000)
    this.pointLight.add(new THREE.Mesh(
      pointLightSphere,
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    ))

    // make it child of the camera and add it to the scene
    this.camera.add(this.pointLight)
    this.scene.add(this.camera)
    
    VertexStudioMaterial()
      .then( async VertexStudioMaterial  => {
        this.monsterMaterial = VertexStudioMaterial
        try {
          const mons = await gltfLoader(path, this.loadMonster);
        } catch (error) {
          console.log(error)
        }
      })

    // start scene
    this.start()
  }

  shouldComponentUpdate(newProps, newState){    
    //return !( this.props.path === newProps.path );
    //TODO find a way to update animations while update monsters
    // The select element is changing when you select the same value?
    return true;
  }

  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
    window.removeEventListener(
      "resize", this.onWindowsResize, false
    )
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop = () => {
    cancelAnimationFrame(this.frameId)
  }

  renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }

  animate = (time) => {
    this.frameId = window.requestAnimationFrame(this.animate)
    const delta = (time - this.prevTime) / 1000

    this.monsterMixer && this.monsterMixer.update(delta)
    this.sleepingMixer && this.sleepingMixer.update(delta)
    this.controls.update()
    this.renderScene()
    this.prevTime = time
  }

  onWindowsResize = debounce(200)(() => {
    // DOM element (canvas) dimensions
    if (this.mount) {
      const width = this.mount.clientWidth
      const height = this.mount.clientHeight

      this.camera.aspect = width / height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(width, height)
    }
  })

  loadMonster = gltf => {
    this.model = gltf
    this.monster = this.model.scene

    const { rotation, action, position, cameraPosition } = this.props
    const defaultValues = { x: 0, y: 0, z: 0 }
    const monsterRot = { ...defaultValues, ...rotation }
    const monsterPos = { ...defaultValues, ...position }
    const cameraPos = { ...defaultValues, ...cameraPosition }

    // center monster
    const box = new THREE.Box3().setFromObject(this.monster)
    const size = box.getSize(new THREE.Vector3()).length()
    const center = box.getCenter(new THREE.Vector3())

    // clipping planes
    this.camera.near = size / 1000
    this.camera.far = size * 1000

    //restart position of monster
    //this.monster.position.set(0,0,0);

    // set monster initial position
    this.monster.position.x += (this.monster.position.x - center.x)
    this.monster.position.y += (this.monster.position.y - center.y)
    this.monster.position.z += (this.monster.position.z - center.z)

    // set monster position relative to initial position
    this.monster.position.x += monsterPos.x
    this.monster.position.y += monsterPos.y
    this.monster.position.z += monsterPos.z

    // set model initial rotation
    this.monster.rotation.x += monsterRot.x
    this.monster.rotation.y += monsterRot.y
    this.monster.rotation.z += monsterRot.z

    // updates global transform of the monster
    this.monster.updateMatrixWorld()

    this.monster.traverse(child => {
      if (child.isMesh) {
        if (child.material[0]) {
          child.material.forEach((material, idx) => {
            if (material.map) {
              child.material[idx] = this.monsterMaterial(material.map, this.props.decor)
            }
          })
        }
        else {
          if (child.material.map) {
            child.material = this.monsterMaterial(child.material.map, this.props.decor)
          }
        }
      }
    })

    // how far you can dolly out
    this.controls.maxDistance = size * 10

    // set camera initial position
    this.camera.lookAt(center)
    //default camera position:
    this.camera.position.set(0,0,0);
    this.camera.position.z += size

    // set camera position relative to initial position
    this.camera.position.x += cameraPos.x
    this.camera.position.y += cameraPos.y
    this.camera.position.z += cameraPos.z

    // update camera parameters
    this.camera.updateProjectionMatrix()

    // backup camera to restore it later
    this.backupCamera = this.camera.clone()


    //saving the reference of the showing monster
    this.lastMonster = this.monster;

    // add monster to scene
    this.scene.add(this.monster)

    // start animation
    this.monsterMixer = new THREE.AnimationMixer(this.monster)
    this.loadSleepingObject()
  }

  dettachMonster = () => {
    this.camera.remove(this.sleepingObject)
    this.scene.remove(this.lastMonster);
  }

  loadSleepingObject = () => {
    // loading Z's model with GLTF loader
    const gltfLoader = new GLTFLoader()
    gltfLoader.load(
      sleeping,
      gltf => {
        this.zModel = gltf
        this.sleepingObject = this.zModel.scene
        this.camera.add(this.sleepingObject)

        const { action } = this.props
        // update camera parameters
        this.camera.updateProjectionMatrix()

        // centering the sleeping z's
        this.sleepingObject.position.x -= 0.4
        this.sleepingObject.position.y -= 1.2
        this.sleepingObject.position.z -= 4

        // basic material to avoid light effect
        this.sleepingObject.traverse(child => {
          const basicMaterial = new THREE.MeshBasicMaterial()
          basicMaterial.skinning = true
          if (child.isMesh) {
            child.material = basicMaterial
          }
        })

        // playing its only animation
        this.sleepingMixer = new THREE.AnimationMixer(this.sleepingObject)
        if (action === ActionType.SLEEPING) {
          this.sleepingMixer.clipAction(
            this.zModel.animations[0]
          ).play()
        } else {
          this.camera.remove(this.sleepingObject)
        }
        // darken or light the monster according to current 'action' -----
        this.monsterLightColor(action)
        this.changeStateAnimation()
      },
      // TODO: add a loader.
      event => {
        const percentage = (event.loaded / event.total) * 100
        console.log(`Loading 3D sleeping model... ${Math.round(percentage)}%`)
      },
      console.error.bind(console)
    )
  }

  darkenMonster = () => {
    // resetting camera
    if (this.backupCamera) {
      this.camera.position.x = this.backupCamera.position.x
      this.camera.position.y = this.backupCamera.position.y
      this.camera.position.z = this.backupCamera.position.z
      this.camera.rotation.set(this.backupCamera.rotation)
      this.camera.updateProjectionMatrix()
    }

    // all lights to black
    this.light.color.setHex(0x000000)
    this.pointLight.color.setHex(0x000000)

    // disable controls
    this.controls.enabled = false
  }

  lightMonster = () => {
    const { ambientIntensity, ambientColor, directIntensity, directColor } = this.props

    // all lights to custom params
    this.light.color.setHex(ambientColor)
    this.light.intensity = ambientIntensity
    this.pointLight.color.setHex(directColor)
    this.pointLight.intensity = directIntensity

    // enable controls
    this.controls.enabled = true
  }

  // darkens or lights the monster, and adds
  // or not, the sleeping z's model.
  monsterLightColor = (action) => {
    console.log(action);
    if (
      action === ActionType.SLEEPING ||
      action === ActionType.DEAD
    ) {
      console.log("Sleeping or dead")
      this.darkenMonster()
      if (action !== ActionType.DEAD) {
        if (this.sleepingObject) {
          this.camera.add(this.sleepingObject)
          this.sleepingMixer.clipAction(
            this.zModel.animations[0]
          ).play()
        }
      } else {
        this.sleepingMixer &&
          this.sleepingMixer.stopAllAction()
        this.camera.remove(this.sleepingObject)
        console.log("was the Sleeping object remove?")
      }
    } else {
      this.lightMonster()
      this.sleepingMixer &&
        this.sleepingMixer.stopAllAction()
      this.camera.remove(this.sleepingObject)
    }
  }

  applyPropertyUpdate = async () => {
    const { autoRotate, autoRotateSpeed, action, path } = this.props

    // controls
    this.controls.autoRotate = autoRotate
    this.controls.autoRotateSpeed = autoRotateSpeed

    this.dettachMonster();   
    //loading the new monster.
    //Refactoring late
    try {
      const mons = await gltfLoader(path, this.loadMonster);
    } catch (error) {
      console.log(error)
    }

    // darken or light the monster according to current 'action'
    this.monsterLightColor(action)
    
  }

  // plays the requested animation by the 'action' prop
  changeStateAnimation = () => {
    const { action } = this.props
    // any of them trigger 'Idle' action, as those do 
    // not have their own single animation
    const triggerIdle = [
      ActionType.SLEEPING,
      ActionType.FEEDING,
    ]

    if (this.monsterMixer) {
      this.monsterMixer.stopAllAction()
      if (action === ActionType.DEAD) {
        this.monsterMixer.clipAction(
          THREE.AnimationClip.findByName(
            this.model.animations,
            ActionType.IDLE
          )
        ).play()
        setTimeout(
          () => this.monsterMixer.stopAllAction(),
          300)
      } else {
        this.monsterMixer.clipAction(
          THREE.AnimationClip.findByName(
            this.model.animations,
            triggerIdle.includes(action)
              ? ActionType.IDLE
              : action
          )
        ).play()
      }
    }
  }

  render() {
    const { size, classes, path } = this.props
    
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
  typeId: PropTypes.string.isRequired,
  action: function (props, propName, componentName) {
    const validActions = Object.keys(ActionType).map(
      key => ActionType[key]
    )
    if (!validActions.includes(props[propName])) {
      return new Error(
        `Invalid ${propName} supplied to ${componentName}. ` +
        `Use the ActionType enum to supply a valid value. ` +
        `Valid values are: Idle, Attack, HitReact, Sleeping, ` +
        `Feeding and Dead.`
      )
    }
  },
  path: PropTypes.string.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number
  }),
  rotation: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number
  }),
  autoRotate: PropTypes.bool,
  autoRotateSpeed: PropTypes.number,
  cameraPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number
  }),
  zoom: PropTypes.bool,
  ambientIntensity: PropTypes.number,
  ambientColor: PropTypes.number,
  directIntensity: PropTypes.number,
  directColor: PropTypes.number,
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
  action: ActionType.IDLE,
  size: {
    width: "auto",
    height: "600px"
  },
  autoRotate: false,
  autoRotateSpeed: -10,
  zoom: true,
  ambientIntensity: 0.15,
  ambientColor: 0xffffff,
  directIntensity: 1.7,
  directColor: 0xffffff,
  darkeningColor: 0x000000
}

Monster3DProfile = injectSheet(styles)(Monster3DProfile)

export { Monster3DProfile, ActionType }