import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ActionType } from '../utils/enums'
import monster3D from '../assets/models/Devil.gltf'
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

        loader.load(monster3D, function (gltf) {
            // gltf.scene.traverse(function (child) {
            //     if (child.isMesh) {
            //         child.material.envMap = envMap;
            //     }
            // });
            const object = gltf.scene.children[0]

            object.updateMatrixWorld();
            
            const box = new THREE.Box3().setFromObject(object);
            const center = box.getCenter(new THREE.Vector3());

            controls.reset();

            object.position.x += (object.position.x - center.x);
            object.position.y += (object.position.y - center.y);
            object.position.z += (object.position.z - center.z);

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
    typeId: PropTypes.number,
    action: PropTypes.oneOf(
        Object.keys(ActionType).map(
            key => ActionType[key]
        )
    )
}

export default Monster3DProfile

