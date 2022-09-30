//Importando "Movements" desde movements.js
import Movements from "./movements.js";
import blockchain from "./Web3.js"; 

//Declaración de una nueva escena con Three.js
const scene = new THREE.Scene(); 
scene.background = new THREE.Color(0xBFD1E5) //todos los colores deben empezar por 0x para ser renderizados de la forma correcta

//Configuración de la cámara y el renderizado
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); 
const renderer = new THREE.WebGLRenderer(); 
renderer.setSize( window.innerWidth, window.innerHeight ); 
document.body.appendChild( renderer.domElement );

//Configuración de luces de escena
const ambient_light = new THREE.AmbientLight(0xBDA355);
const direction_light = new THREE.DirectionalLight(0XFFFFFF, 1);
ambient_light.add(direction_light);
scene.add(ambient_light)

//Configuración del espacio del metaverso
const geometry_space = new THREE.BoxGeometry(100, 0.2, 50);
const material_space = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
const space = new THREE.Mesh(geometry_space, material_space);
scene.add(space);

//Figura geométrica representada en el metaverso: Cubo
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
//const material = new THREE.MeshBasicMaterial( { color: 0x0167B1 } );
const material = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
const cube = new THREE.Mesh( geometry, material );
cube.position.set(-20, 5, 0)
scene.add( cube );
camera.position.z = 5;

//Figura geométrica representada en el metaverso: Cono 
const geometry_cone = new THREE.ConeGeometry( 5, 5, 32 );
const material_cone = new THREE.MeshPhongMaterial( {color: 0xE84E0E} );
const cone = new THREE.Mesh( geometry_cone, material_cone );
cone.position.set(-10, 5, 0)
scene.add( cone );

//Figura geométrica representada en el metaverso: Cilindro
const geometry_cilindro = new THREE.CylinderGeometry( 5, 5, 5, 50 );
const material_cilindro = new THREE.MeshPhongMaterial( {color: 0x8000FF} );
const cylinder = new THREE.Mesh( geometry_cilindro, material_cilindro );
cylinder.position.set(20, 5, 0)
scene.add( cylinder );


camera.position.set(10, 5, 40);

function animate() {
    cube.rotation.x += 0.003;
    cube.rotation.y += 0.003;

    cone.rotation.x += 0.001;
    cone.rotation.y += 0.001;

    cylinder.rotation.x += 0.01;

    //camera.position.x += 0.01
	requestAnimationFrame( animate );

    //Movimiento a la izquierda
    if (Movements.isPressed(37)) {
        camera.position.x -= 0.5;
    }
    //Movimiento hacia arriba
    if (Movements.isPressed(38)) {
        camera.position.x += 0.5;
        camera.position.y += 0.5;
    }
    //Movimiento a la derecha
    if (Movements.isPressed(39)) {
         camera.position.x += 0.5;
    }
    //Movimiento hacia abajo
    if (Movements.isPressed(40)) {
        camera.position.x -= 0.5;
        camera.position.y -= 0.5;
    }

     //Movimiento a la izquierda con la letra A
     if (Movements.isPressed(65)) {
        camera.position.x -= 0.5;
    }
    //Movimiento hacia arriba con la letra W
    if (Movements.isPressed(87)) {
        //camera.position.x += 0.5;
        camera.position.y += 0.5;
    }
    //Movimiento a la derecha con la letra D
    if (Movements.isPressed(68)) {
         camera.position.x += 0.5;
    }
    //Movimiento hacia abajo con la letra S
    if (Movements.isPressed(83)) {
        //camera.position.x -= 0.5;
        camera.position.y -= 0.5;
    }
    
    camera.lookAt(space.position);
	renderer.render( scene, camera );
}
animate();

// Web3 connection to the data generated in the blockchain to be represented in the Metaverse
blockchain.then((result) => {
    //Por cada building pagado en el Smart Contract una representación gráfica se hará en el Metaverso
    result.building.forEach((building, index) => {
        if(index <= result.supply) {
            //Representación de NFT Tokens como cajas
            const boxGeometry = new THREE.BoxGeometry(building.w, building.h, building.d);
            const boxMaterial = new THREE.MeshPhrongMaterial({color: 0x33fffc});
            const nft = new THREE.Mesh(boxGeometry, boxMaterial);
            nft.position.set(building.x, building.y, building.z);
            scene.add(nft);
        }
    });
});
