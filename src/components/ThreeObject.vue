<template>
    <div id="container" ref="container"></div>
</template>
  
<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default {
    /**
     *l'oggeto prenderà le dimensione che "gli diamo"
     *
     * w, h e path sono OBBLIGATORIE
     * 
     * w: width del "contenitore"
     * h: height del "contenitore"
     * è importante dargliele considerando il ratio che vogliamo abbia il nostro oggetto
     * 
     * path: path dell'oggetto
     * xRot: rotazione x dell'oggetto, consigliato un valore da 0.00 a 3
     * yRot: stesso discorso, ricordo che ruotare sull'asse y vuol dire ruotare verso destra e sinistra
     * far: distanza della camera, più il numero e grande, più l'oggetto risulterà piccolo
     * piccoli esempi:
     * 
     * <ThreeObject w="500" h="250" yRot="0.7" xRot="0.004" path="/threeObjects/firstAid.gltf"/>
     * <ThreeObject w="500" h="250" yRot="0.5" xRot="-0.01" path="/threeObjects/medicalRecord.gltf"/>
     * <ThreeObject w="300" h="150" yRot="0.5" xRot="-0.01" far="8" path="/threeObjects/pills.gltf"/>
     * 
     * 
     * boh apposto potete usare sto minghia di oggetto, bella pe voi
     * 
     * 
     */
    props: ['w', 'h', 'path', 'yRot', 'xRot', 'far'],
    methods: {
        initScene() {
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, this.w / this.h, 0.1, 1000);
            if (this.far) this.camera.position.z = this.far
            else this.camera.position.z = 7;
            //this.camera.lookAt();
            this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            this.renderer.setSize(this.w, this.h);
            this.$refs.container.appendChild(this.renderer.domElement);

            const ambientLight = new THREE.AmbientLight(0x404040);
            this.scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xfafafa, 3);
            directionalLight.position.set(0, 1, 10);
            directionalLight.rotateX(-(Math.PI * .5))
            //const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2, '#000000')
            this.scene.add(directionalLight);
            //this.scene.add(lightHelper);
        },
        loadModel() {
            const loader = new GLTFLoader();
            loader.load(this.path, (gltf) => {
                if (this.yRot) gltf.scene.rotation.y = -(Math.PI * this.yRot);
                if (this.xRot) gltf.scene.rotation.x = -(Math.PI * this.xRot);
                this.scene.add(gltf.scene);
            });
        },
        animate() {
            requestAnimationFrame(this.animate);
            this.renderer.render(this.scene, this.camera);
        },
        handleMouseMove(event) {
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            const rotationSpeed = 0.0001;
            this.scene.rotation.y = mouseX * rotationSpeed;
            this.scene.rotation.x = mouseY * rotationSpeed;
        },
        createBackDrop() {
            const planeGeometry = new THREE.PlaneGeometry(20, 20); 
            const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); 
            const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
            planeMesh.position.z = -3; 
            this.scene.add(planeMesh);
        },
    },
    beforeDestroy() {
        window.removeEventListener('mousemove', this.handleMouseMove);
    },
    mounted() {
        this.initScene();
        this.loadModel();
        this.animate();
        window.addEventListener('mousemove', this.handleMouseMove);
        //this.createBackDrop()
    }
};
</script>
  
<style>
#container {
}
</style>
  