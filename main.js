import './style.css'


import * as THREE from 'three';

//import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight,0.1,1000);

const renderer= new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);

renderer.render(scene,camera)




const geometrytorusknot= new THREE.TorusKnotGeometry(10,2,300,50)
const materialtorusknot= new THREE.MeshStandardMaterial({color:0x4682b4});
const torusknot = new THREE.Mesh(geometrytorusknot,materialtorusknot);
torusknot.position.setX(-6);
torusknot.position.setY(-6);
scene.add(torusknot);


const geometryrock= new THREE.DodecahedronGeometry(8,0);
const materialrock = new THREE.MeshPhysicalMaterial({color:0x708090});
const rock1 = new THREE.Mesh(geometryrock,materialrock);
rock1.position.set(6,-30,0);
const rock2 = new THREE.Mesh(geometryrock,materialrock);
rock2.position.set(-6,-50,0);
const rock3 = new THREE.Mesh(geometryrock,materialrock);
rock3.position.set(12,-70,0);
scene.add(rock1,rock2);

const geotor= new THREE.TorusGeometry(10,3,16,100);
const mattor= new THREE.MeshStandardMaterial({color:0xff0000});
const torus = new THREE.Mesh(geotor,mattor);
torus.position.set(12,-70,0);
scene.add(torus);


function createPointLight(x,y,z,color,i){

const pointLight = new THREE.PointLight(color,i);
pointLight.position.set(x,y,z);
const lightHelper = new THREE.PointLightHelper(pointLight);
//scene.add(lightHelper);
scene.add(pointLight);

}

createPointLight(-6,8,8,0xe6b400,80);
createPointLight(10,-40,0,0x0000ff,150);
createPointLight(12,-70,0,0x00ff00,150);

const ambientLight= new THREE.AmbientLight(0xffffff,0.1);


scene.add(ambientLight);

//This is for helping correct lighting and positioning
//const gridHelper = new THREE.GridHelper(200,50);
//scene.add(gridHelper);

//const controls = new OrbitControls(camera, renderer.domElement);
//end of helpers

function scrollCamera(){
const td = document.body.getBoundingClientRect().top;

  //camera.position.z=td*-0.1;
  camera.position.y=td*0.15;
 //camera.position.x+=td*-0.001;
}

document.body.onscroll = scrollCamera;
scrollCamera();

function animate(){
  requestAnimationFrame(animate);
  torusknot.rotation.x+=0.005;
  torusknot.rotation.y+=0.001;
  torusknot.rotation.z+=0.005;
  torus.rotation.x+=0.005;
  torus.rotation.y+=0.001;
  torus.rotation.z+=0.005;
  rock1.rotation.y+=0.005;
  rock2.rotation.z+=0.010;
  rock3.rotation.x+=0.02;
  //controls.update();
  renderer.render(scene,camera);
}
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function render(time) {
  time *= 0.001;
 
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
}

render(1);
animate();

