import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ActionType } from '../utils/enums'
import * as THREE from 'three'
import GLTFLoader from '../utils/GLTFLoader'
import OrbitControls from '../utils/OrbitControls'


class Monster3DProfile extends Component {
    componentDidMount() {
        const width = this.mount.clientWidth
        const height = this.mount.clientHeight

        // add scene
        this.scene = new THREE.Scene()

        // add camera
        this.camera = new THREE.PerspectiveCamera(
            90,
            width / height,
            0.25,
            20
        )
        this.camera.position.set(0, 0, 1.5);

        // setting controls
        const controls = new OrbitControls(this.camera, this.mount);
        controls.target.set(0, -0.2, -0.2);
        controls.autoRotate = false;
        controls.autoRotateSpeed = -10;
        controls.screenSpacePanning = true;
        controls.update();

        // add renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setClearColor('#322e3a')
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(width, height)
        this.renderer.gammaOutput = true;
        this.mount.appendChild(this.renderer.domElement)

        const light = new THREE.AmbientLight(0xffffff, 1.1)
        light.position.set(0, 1, 0);
        this.scene.add(light);

        // loading monster with GLTF loader
        const loader = new GLTFLoader()

        loader.load(this.props.path, function (gltf) {
            const monster = gltf.scene.children[0]

            monster.updateMatrixWorld();
            
            const box = new THREE.Box3().setFromObject(monster);
            const center = box.getCenter(new THREE.Vector3());

            controls.reset();

            monster.position.x += (monster.position.x - center.x);
            monster.position.y += (monster.position.y - center.y);
            monster.position.z += (monster.position.z - center.z);

            this.scene.add(gltf.scene);
        }.bind(this), undefined, function (e) {
            console.error(e);
        });


        this.start()
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
        return (
            <div
                style={{ width: '600px', height: '600px' }}
                ref={(mount) => { this.mount = mount }}
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
    path: PropTypes.string.isRequired
}

Monster3DProfile.defaultProps = {
    action: ActionType.SLEEPING
}

export default Monster3DProfile

