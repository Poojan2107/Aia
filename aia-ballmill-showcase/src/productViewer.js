import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class ProductViewer {
  constructor(canvas) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    
    // Transparent background to blend into glassmorphic panel
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(this.canvas.clientWidth || 320, 180);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.3;

    this.camera = new THREE.PerspectiveCamera(40, (this.canvas.clientWidth || 320) / 180, 0.05, 50);
    this.camera.position.set(2.4, 1.8, 2.8);

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 2.0;
    this.controls.enableZoom = true;
    this.controls.minDistance = 1.2;
    this.controls.maxDistance = 6.0;

    // Studio Lighting
    const ambLight = new THREE.AmbientLight(0xffffff, 1.3);
    this.scene.add(ambLight);

    const dirLight1 = new THREE.DirectionalLight(0xfffaed, 2.2);
    dirLight1.position.set(5, 8, 5);
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 1.5);
    dirLight2.position.set(-5, 4, -4);
    this.scene.add(dirLight2);

    const dirLight3 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight3.position.set(0, -5, 4);
    this.scene.add(dirLight3);

    this.currentModel = null;
    this.loader = new GLTFLoader();
    this.cache = new Map();
    this.activeMode = 'production';
    this.isRendering = false;

    this.resizeObserver = new ResizeObserver(() => this.onResize());
    this.resizeObserver.observe(this.canvas);

    this.animate = this.animate.bind(this);
    this.startRender();
  }

  onResize() {
    const width = this.canvas.clientWidth || 320;
    const height = this.canvas.clientHeight || 180;
    if (width === 0 || height === 0) return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  startRender() {
    if (!this.isRendering) {
      this.isRendering = true;
      requestAnimationFrame(this.animate);
    }
  }

  animate() {
    if (!this.isRendering) return;
    requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  async loadModel(url, colorHex = 0x8a99a8, metalness = 0.85, roughness = 0.28) {
    if (this.currentModel) {
      this.scene.remove(this.currentModel);
      this.currentModel = null;
    }

    let gltf = this.cache.get(url);
    if (!gltf) {
      try {
        gltf = await new Promise((resolve, reject) => {
          this.loader.load(url, resolve, undefined, reject);
        });
        this.cache.set(url, gltf);
      } catch (err) {
        console.warn('Failed to load product model:', url, err);
        return;
      }
    }

    const modelGroup = gltf.scene.clone();

    // Center and normalize model dimensions to fit neatly within viewing sphere
    const box = new THREE.Box3().setFromObject(modelGroup);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetScale = maxDim > 0 ? 1.8 / maxDim : 1.0;

    modelGroup.position.sub(center.multiplyScalar(targetScale));
    modelGroup.scale.multiplyScalar(targetScale);

    // Apply materials
    modelGroup.traverse(child => {
      if (child.isMesh) {
        child.userData.baseColor = colorHex;
        child.userData.metalness = metalness;
        child.userData.roughness = roughness;
        this.applyMeshMaterial(child);
      }
    });

    this.currentModel = modelGroup;
    this.scene.add(this.currentModel);

    // Reset camera position smoothly
    this.camera.position.set(2.4, 1.8, 2.8);
    this.controls.target.set(0, 0, 0);
  }

  setMode(mode) {
    this.activeMode = mode;
    if (this.currentModel) {
      this.currentModel.traverse(child => {
        if (child.isMesh) this.applyMeshMaterial(child);
      });
    }
  }

  applyMeshMaterial(mesh) {
    const baseColor = mesh.userData.baseColor || 0x8a99a8;
    const metalness = mesh.userData.metalness !== undefined ? mesh.userData.metalness : 0.85;
    const roughness = mesh.userData.roughness !== undefined ? mesh.userData.roughness : 0.28;

    if (this.activeMode === 'wireframe') {
      mesh.material = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.85
      });
    } else if (this.activeMode === 'cad') {
      mesh.material = new THREE.MeshStandardMaterial({
        color: baseColor,
        metalness: 0.3,
        roughness: 0.45,
        side: THREE.DoubleSide
      });
    } else if (this.activeMode === 'xray') {
      mesh.material = new THREE.MeshPhysicalMaterial({
        color: 0x38bdf8,
        transmission: 0.75,
        transparent: true,
        opacity: 0.4,
        roughness: 0.2,
        side: THREE.DoubleSide
      });
    } else {
      // Production PBR
      mesh.material = new THREE.MeshStandardMaterial({
        color: baseColor,
        metalness: metalness,
        roughness: roughness,
        side: THREE.DoubleSide
      });
    }
  }
}

