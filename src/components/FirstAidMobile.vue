<template>
    <div>
        <canvas ref="webgl" class="webgl w-100 h-100"></canvas>
    </div>
    
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
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
            '/threeObjects/first-aid-new.gltf',
            (gltf) => {

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
                //modelLoaded.scale.set(0.4, 0.4, 0.4)

                // adding shadow
                modelLoaded.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                    }
                });

                modelLoaded.position.set(0, 0, 0)
                modelLoaded.rotateX(-Math.PI * 0.05)
                modelLoaded.rotateY(Math.PI * 0.25)
                modelLoaded.rotateZ(Math.PI * 0.15)
                

                scene.add(modelLoaded)
            }
        }, 1200)


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
        const sizes = {
            width: this.$refs.webgl.offsetWidth,
            height: this.$refs.webgl.offsetHeight
        }

        window.addEventListener('resize', () => {


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
        camera.position.set(2, 1, 3)
        camera.lookAt(0, 0, 0)
        scene.add(camera)

        //Controls
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


        const tick = () => {
            const elapsedTime = clock.getElapsedTime()
            const deltaTime = elapsedTime - previousTime
            previousTime = elapsedTime


             if (modelLoaded && this.$route.path === '/') {
                modelLoaded.rotation.x += (- Math.PI) * 0.008 * deltaTime
                modelLoaded.rotation.y += Math.PI * 0.05 * deltaTime
                
                //modelLoaded.rotation.set((- Math.PI) * 0.08 * elapsedTime, Math.PI * 0.16 * elapsedTime, Math.PI * 0.1 * elapsedTime)
                 
                }


            // Render
            renderer.render(scene, camera)

            // Call tick again on the next frame
            if(this.$route.path === '/')
            {
                window.requestAnimationFrame(tick)
            }
           
        }

        tick()
    }
}
</script>

<style lang="scss" scoped>
    div {
        width: 300px;
        height: 300px;

        @media screen and (min-width: 768px) {
            width: 400px;
            height: 400px;
        }

        @media screen and (min-width: 992px) {
            width: 600px;
            height: 600px;
        }
    }
</style>

