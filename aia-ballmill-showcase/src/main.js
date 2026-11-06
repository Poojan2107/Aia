import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import anime from './anime.es.js';
import { MaterialManager, MATERIAL_MODES } from './materials.js';
import { BallMillAssembly, AIA_PARTS_METADATA, AIA_PRODUCTS_CATALOG } from './ballMillModel.js';
import { ProductViewer } from './productViewer.js';

console.log('--- [MAIN.JS] Initializing High-Precision 3D Ball Mill Digital Twin ---');

// =============================================================================
// THREE.JS SCENE SETUP
// =============================================================================
const canvas = document.getElementById('webgl-canvas');
const scene = new THREE.Scene();

// High-end neutral CAD Studio background
scene.background = new THREE.Color(0x131924);
scene.fog = new THREE.FogExp2(0x131924, 0.012);

const camera = new THREE.PerspectiveCamera(
  38,
  window.innerWidth / window.innerHeight,
  0.1,
  150
);
camera.position.set(16.5, 7.0, 17.0);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  powerPreference: 'high-performance'
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.35;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

// OrbitControls (Always responsive for free inspection)
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 3.0;
controls.maxDistance = 55;
controls.maxPolarAngle = Math.PI / 2 + 0.02;
controls.target.set(0, -0.4, 0);
controls.enabled = true;

// =============================================================================
// BRIGHT 4-POINT INDUSTRIAL CAD STUDIO LIGHTING RIG
// =============================================================================
const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
scene.add(ambientLight);

const hemiLight = new THREE.HemisphereLight(0xe8f0fe, 0x1e2638, 0.9);
scene.add(hemiLight);

const keyLight = new THREE.DirectionalLight(0xfffaed, 2.2);
keyLight.position.set(22, 28, 18);
keyLight.castShadow = true;
keyLight.shadow.mapSize.width = 2048;
keyLight.shadow.mapSize.height = 2048;
keyLight.shadow.bias = -0.0003;
const d = 16;
keyLight.shadow.camera.left = -d;
keyLight.shadow.camera.right = d;
keyLight.shadow.camera.top = d;
keyLight.shadow.camera.bottom = -d;
scene.add(keyLight);

const frontFill = new THREE.DirectionalLight(0xffffff, 1.4);
frontFill.position.set(0, 12, 26);
scene.add(frontFill);

const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
rimLight.position.set(-20, 16, -18);
scene.add(rimLight);

const bounceLight = new THREE.DirectionalLight(0x94a3b8, 0.7);
bounceLight.position.set(0, -15, 0);
scene.add(bounceLight);

// Internal illumination for internal liners & tumbling balls
const internalLight = new THREE.PointLight(0xfff3d6, 3.8, 16);
internalLight.position.set(0, 0.5, 0);
scene.add(internalLight);

// Studio Contact Shadow Floor & Grid
const floorGeom = new THREE.PlaneGeometry(80, 80);
const floorMat = new THREE.MeshStandardMaterial({
  color: 0x0b101a,
  roughness: 0.85,
  metalness: 0.15
});
const floor = new THREE.Mesh(floorGeom, floorMat);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -4.1;
floor.receiveShadow = true;
scene.add(floor);

const grid = new THREE.GridHelper(80, 80, 0x3b82f6, 0x1e293b);
grid.position.y = -4.09;
scene.add(grid);

// =============================================================================
// MANAGERS & ASSEMBLY INITIALIZATION
// =============================================================================
const materialManager = new MaterialManager();
const ballMill = new BallMillAssembly(scene, materialManager);
window.ballMill = ballMill;

// Initialize 3D Product Inspector Mini Viewer
const productCanvas = document.getElementById('product-3d-canvas');
const productPreviewBox = document.getElementById('product-preview-box');
let productViewer = null;
if (productCanvas) {
  productViewer = new ProductViewer(productCanvas);
}

let isOperating = true;
let isZenMode = false;
let isLightTheme = false;
let currentRenderMode = MATERIAL_MODES.PRODUCTION;

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const explosionSlider = document.getElementById('explosion-slider');
const explosionVal = document.getElementById('explosion-val');
const inspectorCard = document.getElementById('inspector-card');
const btnRotate = document.getElementById('btn-rotate');
const btnZen = document.getElementById('btn-zen');
const btnZenFloating = document.getElementById('btn-zen-floating');
const btnTheme = document.getElementById('btn-theme');
const btnResetCam = document.getElementById('btn-reset-cam');
const modeButtons = document.querySelectorAll('.mode-btn');

function hideLoadingScreen() {
  if (!loadingScreen) return;
  loadingScreen.style.opacity = '0';
  loadingScreen.style.pointerEvents = 'none';
  setTimeout(() => {
    loadingScreen.style.display = 'none';
  }, 400);
}

// Start loading genuine CAD models
ballMill.loadCADModels((progress) => {
  const loadingSub = document.querySelector('.loading-sub');
  if (loadingSub && progress) {
    loadingSub.textContent = `Assembling Genuine CAD Geometry (${Math.round(progress * 100)}%)`;
  }
}).then(() => {
  console.log('Ball mill CAD digital twin assembled successfully!');
  hideLoadingScreen();
}).catch((err) => {
  console.error('Model loading encountered error:', err);
  hideLoadingScreen();
});

setTimeout(hideLoadingScreen, 1500);

// =============================================================================
// UI CONTROLS & EVENT LISTENERS
// =============================================================================

// 1. View / Render Modes
modeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    modeButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const mode = btn.dataset.mode;
    currentRenderMode = mode;
    materialManager.setMode(mode);
    if (productViewer) productViewer.setMode(mode);

    if (mode === MATERIAL_MODES.WIREFRAME) {
      scene.background.setHex(0x050a14);
      scene.fog.color.setHex(0x050a14);
    } else if (isLightTheme) {
      scene.background.setHex(0xdbe3ec);
      scene.fog.color.setHex(0xdbe3ec);
    } else {
      scene.background.setHex(0x131924);
      scene.fog.color.setHex(0x131924);
    }
  });
});

// 2. Shell Variant Selector (Udokan Baikal Teal / Newmont Akyem Tan / RG Gold Gray)
document.querySelectorAll('.variant-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.variant-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const variant = btn.dataset.variant;
    ballMill.setShellVariant(variant);
  });
});

// 3. Play / Stop Rotation Control
if (btnRotate) {
  btnRotate.addEventListener('click', () => {
    isOperating = !isOperating;
    btnRotate.classList.toggle('active', isOperating);
    const span = btnRotate.querySelector('span');
    if (span) {
      span.textContent = isOperating ? '14.5 RPM Active' : 'Rotation Paused';
    }
  });
}

// 4. Zen Mode Toggle (Cleanest viewport possible, 100% full screen 3D)
function toggleZenMode() {
  isZenMode = !isZenMode;
  if (btnZen) btnZen.classList.toggle('active', isZenMode);
  document.body.classList.toggle('zen-mode', isZenMode);
}

if (btnZen) btnZen.addEventListener('click', toggleZenMode);
if (btnZenFloating) btnZenFloating.addEventListener('click', toggleZenMode);

// 5. Studio Theme Toggle (Dark Technical CAD vs Bright Neutral Daylight Studio)
if (btnTheme) {
  btnTheme.addEventListener('click', () => {
    isLightTheme = !isLightTheme;
    btnTheme.classList.toggle('active', isLightTheme);
    if (isLightTheme) {
      scene.background.setHex(0xdbe3ec);
      scene.fog.color.setHex(0xdbe3ec);
      ambientLight.intensity = 1.45;
      floorMat.color.setHex(0xcfd8dc);
      document.documentElement.style.setProperty('--bg-card', 'rgba(240, 245, 250, 0.90)');
      document.documentElement.style.setProperty('--text-main', '#0f172a');
    } else {
      scene.background.setHex(0x131924);
      scene.fog.color.setHex(0x131924);
      ambientLight.intensity = 1.25;
      floorMat.color.setHex(0x0b101a);
      document.documentElement.style.setProperty('--bg-card', 'rgba(19, 25, 36, 0.85)');
      document.documentElement.style.setProperty('--text-main', '#f8fafc');
    }
  });
}

// 6. Reset Camera Framing
if (btnResetCam) {
  btnResetCam.addEventListener('click', () => {
    anime({
      targets: camera.position,
      x: 16.5,
      y: 7.0,
      z: 17.0,
      duration: 750,
      easing: 'easeOutQuad'
    });
    anime({
      targets: controls.target,
      x: 0,
      y: -0.4,
      z: 0,
      duration: 750,
      easing: 'easeOutQuad'
    });
  });
}

// 7. CAD View Angle Preset Buttons
document.querySelectorAll('.cad-view-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cad-view-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const view = btn.dataset.view;

    let targetPos = new THREE.Vector3(16.5, 7.0, 17.0);
    let targetLook = new THREE.Vector3(0, -0.4, 0);

    if (view === 'iso') {
      targetPos.set(16.5, 7.0, 17.0);
      targetLook.set(0, -0.4, 0);
    } else if (view === 'side') {
      targetPos.set(16.5, 0.0, 0.0);
      targetLook.set(0, 0, 0);
    } else if (view === 'feed') {
      targetPos.set(0.0, 1.2, -16.5);
      targetLook.set(0, 0, 0);
    } else if (view === 'discharge') {
      targetPos.set(0.0, 1.2, 16.5);
      targetLook.set(0, 0, 0);
    } else if (view === 'top') {
      targetPos.set(0.0, 19.5, 0.01);
      targetLook.set(0, 0, 0);
    } else if (view === 'cutaway') {
      targetPos.set(8.5, 5.0, 6.0);
      targetLook.set(0, 0, 0);
      if (explosionSlider) {
        explosionSlider.value = 35;
        ballMill.applyExpansion(0.35);
        if (explosionVal) explosionVal.textContent = '35%';
      }
    }

    anime({
      targets: camera.position,
      x: targetPos.x,
      y: targetPos.y,
      z: targetPos.z,
      duration: 800,
      easing: 'easeOutQuad'
    });
    anime({
      targets: controls.target,
      x: targetLook.x,
      y: targetLook.y,
      z: targetLook.z,
      duration: 800,
      easing: 'easeOutQuad'
    });
  });
});

// 8. CAD Explosion Slider Scrubbing
if (explosionSlider) {
  explosionSlider.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    if (explosionVal) explosionVal.textContent = `${Math.round(val)}%`;
    ballMill.applyExpansion(val / 100.0);
  });
}

// 9. Explosion Preset Buttons (0%, 35%, 75%, 100%)
document.querySelectorAll('.preset-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetVal = parseFloat(btn.dataset.preset);
    const startVal = parseFloat(explosionSlider ? explosionSlider.value : 0);
    const dummyObj = { val: startVal };

    anime({
      targets: dummyObj,
      val: targetVal,
      duration: 650,
      easing: 'easeOutQuad',
      update: () => {
        if (explosionSlider) explosionSlider.value = Math.round(dummyObj.val);
        if (explosionVal) explosionVal.textContent = `${Math.round(dummyObj.val)}%`;
        ballMill.applyExpansion(dummyObj.val / 100.0);
      }
    });
  });
});

// 10. Mouse Wheel / Trackpad Scroll to Control Explosion Progress
window.addEventListener('wheel', (e) => {
  if (e.target.closest('.inspector-panel') || e.target.closest('.bottom-dock') || e.target.closest('.products-catalog-bar')) return;

  if (explosionSlider) {
    let currentVal = parseFloat(explosionSlider.value);
    const delta = e.deltaY > 0 ? 3 : -3;
    currentVal = Math.max(0, Math.min(100, currentVal + delta));
    explosionSlider.value = currentVal;
    if (explosionVal) explosionVal.textContent = `${Math.round(currentVal)}%`;
    ballMill.applyExpansion(currentVal / 100.0);
  }
}, { passive: true });

// 11. Component Hierarchy Filter Checkboxes
document.querySelectorAll('.layer-item input').forEach(input => {
  input.addEventListener('change', () => {
    const layer = input.dataset.layer;
    ballMill.setComponentVisibility(layer, input.checked);
  });
});

// 12. AIA CAD Catalog Quick-Pills
document.querySelectorAll('.cat-pill').forEach(pill => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    const prodKey = pill.dataset.product;

    if (prodKey === 'assembly') {
      if (inspectorCard) inspectorCard.classList.remove('visible');
      anime({
        targets: camera.position,
        x: 16.5,
        y: 7.0,
        z: 17.0,
        duration: 750,
        easing: 'easeOutQuad'
      });
      anime({
        targets: controls.target,
        x: 0,
        y: -0.4,
        z: 0,
        duration: 750,
        easing: 'easeOutQuad'
      });
    } else if (AIA_PRODUCTS_CATALOG[prodKey]) {
      showInspectorCard(AIA_PRODUCTS_CATALOG[prodKey]);
    }
  });
});

// =============================================================================
// CLICK-TO-INSPECT RAYCASTING
// =============================================================================
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function handlePointerClick(event) {
  if (event.target !== canvas) return;

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(ballMill.interactiveObjects, true);

  if (intersects.length > 0) {
    let hitObj = intersects[0].object;
    while (hitObj && !hitObj.userData?.metaKey && hitObj.parent) {
      hitObj = hitObj.parent;
    }

    const metaKey = hitObj?.userData?.metaKey;
    if (metaKey && AIA_PARTS_METADATA[metaKey]) {
      showInspectorCard(AIA_PARTS_METADATA[metaKey]);

      // Sync active catalog pill
      document.querySelectorAll('.cat-pill').forEach(pill => {
        pill.classList.toggle('active', pill.dataset.product === metaKey);
      });
    }
  }
}

window.addEventListener('click', handlePointerClick);

function showInspectorCard(data) {
  if (!inspectorCard) return;
  const title = document.getElementById('insp-title');
  const code = document.getElementById('insp-code');
  const moc = document.getElementById('insp-moc');
  const hardness = document.getElementById('insp-hardness');
  const weight = document.getElementById('insp-weight');
  const desc = document.getElementById('insp-desc');
  const adv = document.getElementById('insp-advantage');

  if (title) title.textContent = data.name;
  if (code) code.textContent = data.code;
  if (moc) moc.textContent = data.moc;
  if (hardness) hardness.textContent = data.hardness;
  if (weight) weight.textContent = data.weight;
  if (desc) desc.textContent = data.desc;
  if (adv) adv.textContent = `★ AIA Advantage: ${data.advantage}`;

  // Load into 3D Product Inspector
  if (productViewer && data.glbUrl) {
    if (productPreviewBox) productPreviewBox.style.display = 'block';
    productViewer.loadModel(data.glbUrl, data.colorHex, data.metalness, data.roughness);
    productViewer.setMode(currentRenderMode);
  } else if (productPreviewBox) {
    productPreviewBox.style.display = 'none';
  }

  inspectorCard.classList.add('visible');
}

const inspClose = document.getElementById('insp-close');
if (inspClose) {
  inspClose.addEventListener('click', () => {
    if (inspectorCard) inspectorCard.classList.remove('visible');
    document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
    const assyPill = document.querySelector('.cat-pill[data-product="assembly"]');
    if (assyPill) assyPill.classList.add('active');
  });
}

// =============================================================================
// WINDOW RESIZE HANDLER
// =============================================================================
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// =============================================================================
// RENDER LOOP WITH CRUSHING CHARGE KINEMATICS
// =============================================================================
let lastTime = performance.now();

function animateLoop(now) {
  requestAnimationFrame(animateLoop);
  const delta = Math.min((now - lastTime) / 1000, 0.1);
  lastTime = now;

  // 1. Mill mechanical rotation (Shell, liners, heads, girth gear)
  ballMill.updateRotation(delta, isOperating);

  // 2. Grinding media charge crushing physics (tumbling, climbing & cataracting inside)
  ballMill.updateBallChargePhysics(delta, isOperating);

  // 3. OrbitControls update
  controls.update();

  // 4. Render frame
  renderer.render(scene, camera);
}

requestAnimationFrame(animateLoop);
