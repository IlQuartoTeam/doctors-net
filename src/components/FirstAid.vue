<template>
    <canvas ref="webgl" class="webgl"></canvas>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
export default {
    mounted() {

        /**
         * Base
         */
        // Debug
        // const gui = new dat.GUI()

        // Canvas
        const canvas = this.$refs.webgl

        // Scene
        const scene = new THREE.Scene()

        /**
         * Models
         */

        // let mixer = null
        let modelLoaded = null

        const gltfLoader = new GLTFLoader()
        gltfLoader.load(
            '/threeObjects/first-aid.gltf',
            (gltf) => {
                /*  const children = [...gltf.scene.children]
                for (const child of children)
                {
                 scene.add(child)
                } */
                /*  mixer = new THREE.AnimationMixer(gltf.scene)
                const action = mixer.clipAction(gltf.animations[2])
                action.play() */
                modelLoaded = gltf.scene
            },
            (progress) => {

            },
            (error) => {

            }
        )
        /* MODEL */
        setTimeout(() => {
            if (modelLoaded != null) {
                console.log(modelLoaded);
                modelLoaded.scale.set(0.4, 0.4, 0.4)

                // adding shadow
                modelLoaded.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                    }
                });

                modelLoaded.position.set(0, 0, 0)
                scene.add(modelLoaded)
            }
        }, 1000)


        /**
         * Floor
         */
        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10),
            new THREE.MeshStandardMaterial({
                color: '#ffffff',
                metalness: 0,
                roughness: 0.5
            })
        )
        floor.receiveShadow = true
        floor.position.set(0, -2, 0)
        floor.rotation.x = - Math.PI * 0.5
        // scene.add(floor)

        /**
         * Lights
         */
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
        directionalLight.castShadow = true
        directionalLight.shadow.mapSize.set(1024, 1024)
        directionalLight.shadow.camera.far = 15
        directionalLight.shadow.camera.left = - 7
        directionalLight.shadow.camera.top = 7
        directionalLight.shadow.camera.right = 7
        directionalLight.shadow.camera.bottom = - 7
        directionalLight.position.set(5, 5, 5)
        scene.add(directionalLight)

        /**
         * Sizes
         */
        console.log(this.$refs.webgl);
        const sizes = {
            width: this.$refs.webgl.offsetWidth ?? 400,
            height: this.$refs.webgl.offsetHeight ?? 400
        }

        window.addEventListener('resize', () => {
            // Update sizes
            sizes.width = this.$refs.webgl.offsetWidth ?? 400
            sizes.height = this.$refs.webgl.offsetHeight ?? 400

            // Update camera
            camera.aspect = sizes.width / sizes.height
            camera.updateProjectionMatrix()

            // Update renderer
            renderer.setSize(sizes.width, sizes.height)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })



        /**
         * Camera
         */
        // Base camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        camera.position.set(2, 2, 2)
        camera.lookAt(0, 0, 0)
        scene.add(camera)

        // Controls
        // const controls = new OrbitControls(camera, canvas)
        // controls.target.set(0, 0.75, 0)
        // controls.enableDamping = true

        /**
         * Renderer
         */
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true
        })
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        /**
         * Animate
         */
        const clock = new THREE.Clock()
        let previousTime = 0

        const position = { x: 0, y: 0 }
        window.addEventListener('mousemove', (e) => {
            position.x = e.clientX
            position.y = e.clientY
        })

        const tick = () => {
            const elapsedTime = clock.getElapsedTime()
            const deltaTime = elapsedTime - previousTime
            previousTime = elapsedTime

            // Update controls
            // controls.update()

            // Update Mixer
            /*  if (mixer){
                 mixer.update(deltaTime)
             } */


            if (modelLoaded) {
                const maxRotation = Math.PI / 12;
                const rotationX = (position.y / sizes.height) * maxRotation - maxRotation / 2;
                const rotationY = (position.x / sizes.width) * maxRotation - maxRotation / 2;

                modelLoaded.rotation.set(- Math.PI * 0.05 + rotationX, - Math.PI * 0.55 + rotationY, -Math.PI * 0.06)
            }


            // Render
            renderer.render(scene, camera)

            // Call tick again on the next frame
            window.requestAnimationFrame(tick)
        }

        tick()
    }
}
</script>

<style lang="scss" scoped>
$width: 600px;
canvas{
    max-width: $width;
    height: $width - 200px;
}
</style>