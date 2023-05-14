// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// GLTF Loader

var loader = new THREE.GLTFLoader();
var obj;
loader.load(
  // resource URL
  "laptop.glb",
  // called when the resource is loaded
  function (gltf) {
    obj = gltf.scene;
    scene.add(obj);
    obj.scale.set(1, 1, 1);
  }
);

// Lights
const light = new THREE.AmbientLight(0xffffff, 1); // soft white light
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 2, 0);
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight2.position.set(-1, 2, 0);
scene.add(directionalLight2);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 1.4;
scene.add(camera);

//Controls
// const controls = new THREE.OrbitControls(camera, canvas);
// controls.enableDamping = true;
// controls.enableZoom = false;
// controls.keys = {
//   LEFT: "ArrowLeft", //left arrow
//   UP: "ArrowUp", // up arrow
//   RIGHT: "ArrowRight", // right arrow
//   BOTTOM: "ArrowDown", // down arrow
// };

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

document.addEventListener("mousemove", onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowX;
  mouseY = event.clientY - windowY;
}

//  const updateOnScroll = (event) => {
//      obj.position.z = window.scrollY *.002
//  }

//  window.addEventListener('scroll', updateOnScroll)

const clock = new THREE.Clock();

const tick = () => {
  window.requestAnimationFrame(tick);
  const deltaTime = clock.getDelta();
  //if ( mixer1 ) mixer1.update( deltaTime);

  targetX = mouseX * 0.0001;
  targetY = mouseY * 0.0001;

  // Update objects
  if (obj) obj.rotation.y += 0.05 * (targetX - obj.rotation.y);
  if (obj) obj.rotation.x += 0.05 * (targetY - obj.rotation.x);
  //obj.rotation.z += -0.05 * (targetY - obj.rotation.x)

  // Update Orbital Controls
  // controls.update();
  renderer.render(scene, camera);

  // Call tick again on the next frame
};

tick();
