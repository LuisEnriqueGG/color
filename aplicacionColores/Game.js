import * as THREE from '../three.js-master/build/three.module.js';
import { GUI } from '../three.js-master/examples/jsm/libs/lil-gui.module.min.js'
        import { GLTFLoader } from '../three.js-master/examples/jsm/loaders/GLTFLoader.js';
        import { OrbitControls } from '../three.js-master/examples/jsm/controls/OrbitControls.js';
        import * as dat from './dat.gui/build/dat.gui.module.js';
        import {RGBELoader} from '../three.js-master/examples/jsm/loaders/RGBELoader.js';

        const hdrTexture = new URL('/HDRI/fondo.hdr', import.meta.url);
        const fileUrl = new URL('../aplicacionColores/Objetos3D/Ejem1.glb', import.meta.url);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xA3A3A3);
        document.body.appendChild(renderer.domElement);

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            10000
        );
        camera.position.set(0, 20, 30);
        

        const orbit = new OrbitControls(camera, renderer.domElement);
        orbit.target.set(0, 8, 0);
        //orbit.enablePan = false;
        //orbit.maxPolarAngle = Math.PI /2;
        //orbit.enableDamping = true;
        //orbit.update();



        //////
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;
        const loader7 = new RGBELoader();
        loader7.load(hdrTexture, function(texture){
             texture.mapping = THREE.EquirectangularRefractionMapping;
             scene.background = texture;
             scene.environment = texture;
             
        });
        /////


        
        const grid = new THREE.GridHelper(50, 50);
        grid.material.opacity = 0.2;
        //grid.material.depthWrite = true;
        grid.material.transparent = true;
        scene.add(grid);

        const skyColor = 0xB1E1FF; // light blue
        const groundColor = 0xFFFFFF; // brownish orange
        const intensity1 = 0.5;
        const light = new THREE.HemisphereLight( skyColor, groundColor, intensity1);
        scene.add(light);

        const color = 0xFFFFFF;
        const intensity = 1;
        const light1 = new THREE.DirectionalLight(color, intensity);
        light1.position.set(0, 10, 7);
        scene.add(light1);

        const color2 = 0xFFFFFF;
        const intensity2 = 1;
        const light2 = new THREE.DirectionalLight(color2, intensity2);
        light2.position.set(0, 10, -7);
        scene.add(light2);
        
        

        const gui = new GUI();

        const folder = gui.addFolder( 'Colores' );

        
        

        const assetLoader = new GLTFLoader();

        assetLoader.load(fileUrl.href, function (gltf) {

            const model = gltf.scene;
            scene.add(model);
            console.log(model);
            console.log(model.getObjectByName('Mesh176'));
            console.log(model.getObjectByName('Mesh176_1'));



            const folderParams = {

                mytub: function() { model.getObjectByName('Mesh176').material.color.setHex('5420101');},
                myecal: function() { model.getObjectByName('Mesh176_1').material.color.setHex('710810');},
                myecaltwo: function() { model.getObjectByName('Mesh176_2').material.color.setHex('1273173');},
            
            };
             
    
            folder.addColor( { Color: 0xaa00ff }, 'Color' ).disable();
            folder.add( folderParams, 'mytub' );
            folder.addColor( { Color: 0xaa00ff }, 'Color' ).disable();
            folder.add( folderParams, 'myecal' );
            folder.addColor( { Color: 0xaa00ff }, 'Color' ).disable();
            folder.add( folderParams, 'myecaltwo' );
            


        }, undefined, function (error) {
            console.error(error);
        });

        function animate() {
            renderer.render(scene, camera);
        }

        renderer.setAnimationLoop(animate);

        window.addEventListener('resize', function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });