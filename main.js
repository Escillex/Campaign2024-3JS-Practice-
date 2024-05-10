import './style.css'


import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight,0.1,1000);

const renderer= new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);

renderer.render(scene,camera)




const geometrytorus= new THREE.TorusGeometry(10,3,16,100)
const materialtorus = new THREE.MeshStandardMaterial({color:0xff0000});
const torus = new THREE.Mesh(geometrytorus,materialtorus);

scene.add(torus);

const pointLight = new THREE.PointLight(0xe6b400,40);
pointLight.position.set(5,12,8);

const ambientLight= new THREE.AmbientLight(0xffffff,0.2);


scene.add(pointLight,ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x+=0.01;
  torus.rotation.y+=0.005;
  torus.rotation.z+=0.01;
  renderer.render(scene,camera);
}

animate();

