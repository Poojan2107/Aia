import * as THREE from 'three';

// Procedural micro-texture for cast steel bump
function createCastMetalTexture() {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(256, 256);
  for (let i = 0; i < imgData.data.length; i += 4) {
    const val = 128 + Math.floor((Math.random() - 0.5) * 35);
    imgData.data[i] = val;
    imgData.data[i + 1] = val;
    imgData.data[i + 2] = val;
    imgData.data[i + 3] = 255;
  }
  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

const bumpMap = createCastMetalTexture();

export const MATERIAL_MODES = {
  PRODUCTION: 'production',
  CAD: 'cad',
  WIREFRAME: 'wireframe',
  XRAY: 'xray'
};

// Clean Engineering CAD Solid Colors (Professional Workstation Palette)
const CAD_COLORS = {
  shell: 0x3ba5b8,          // Udokan Baikal Saturated Teal Shell
  stiffener: 0x244252,      // Structural stiffener ring
  shellLiner: 0x8198ab,     // Hardened High-Chrome Alloy Cast Steel
  lifterBar: 0x64748b,      // Lifter Bar Steel
  endLinerInner: 0x94a3b8,  // Inner Throat Liner
  endLinerOuter: 0x78889b,  // Outer Head Liner
  headDischarge: 0x5a6978,  // Machined Cast Alloy Steel Head
  headFeed: 0x5a6978,       // Machined Cast Alloy Steel Head
  pulpLifter: 0x0284c7,     // AIA EEPL Polyurethane / Cast Scoop
  gratePlate: 0x475569,     // Slotted Grate Steel
  grindingMedia: 0xf1f5f9,  // Mirror Chrome Steel Grinding Ball
  girthGear: 0x334155,      // Forged Alloy Steel Gear Ring
  pinion: 0x475569,         // Pinion Shaft
  fasteners: 0xd4af37,      // High-Tensile 10.9 Zinc/Gold Dichromate Fasteners
  bearings: 0x1e293b,       // Cast Iron Pillow Block Pedestal
  feedChute: 0x475569       // Slurry Chute
};

// Production PBR Materials (Bright, realistic Keyshot / CAD Studio grade)
const PROD_MATERIALS = {
  // Cylindrical shell: Premium industrial teal/cyan enamel matching Udokan Baikal CAD
  shell: new THREE.MeshStandardMaterial({
    color: 0x3ba5b8,
    metalness: 0.4,
    roughness: 0.35,
    side: THREE.DoubleSide
  }),
  shellCutaway: new THREE.MeshStandardMaterial({
    color: 0x3ba5b8,
    metalness: 0.4,
    roughness: 0.35,
    side: THREE.DoubleSide
  }),
  stiffener: new THREE.MeshStandardMaterial({
    color: 0x244252,
    metalness: 0.6,
    roughness: 0.32,
    side: THREE.DoubleSide
  }),
  // Wave liners: Cast High-Chromium White Iron (20-27% Cr)
  shellLiner: new THREE.MeshStandardMaterial({
    color: 0x8a99a8,
    metalness: 0.85,
    roughness: 0.26,
    bumpMap: bumpMap,
    bumpScale: 0.003,
    side: THREE.DoubleSide
  }),
  // Stepped lifter bars
  lifterBar: new THREE.MeshStandardMaterial({
    color: 0x718096,
    metalness: 0.88,
    roughness: 0.22,
    bumpMap: bumpMap,
    bumpScale: 0.004,
    side: THREE.DoubleSide
  }),
  endLinerInner: new THREE.MeshStandardMaterial({
    color: 0x8a99a8,
    metalness: 0.82,
    roughness: 0.28,
    bumpMap: bumpMap,
    bumpScale: 0.003,
    side: THREE.DoubleSide
  }),
  endLinerOuter: new THREE.MeshStandardMaterial({
    color: 0x7a8999,
    metalness: 0.82,
    roughness: 0.28,
    bumpMap: bumpMap,
    bumpScale: 0.003,
    side: THREE.DoubleSide
  }),
  // Dish Heads & Trunnion Journals: Machined cast engineering alloy steel
  headDischarge: new THREE.MeshStandardMaterial({
    color: 0x606f7b,
    metalness: 0.78,
    roughness: 0.30,
    bumpMap: bumpMap,
    bumpScale: 0.003,
    side: THREE.DoubleSide
  }),
  headFeed: new THREE.MeshStandardMaterial({
    color: 0x606f7b,
    metalness: 0.78,
    roughness: 0.30,
    bumpMap: bumpMap,
    bumpScale: 0.003,
    side: THREE.DoubleSide
  }),
  pulpLifter: new THREE.MeshStandardMaterial({
    color: 0x0284c7, // AIA EEPL Polyurethane/Cast Chrome
    metalness: 0.65,
    roughness: 0.32,
    side: THREE.DoubleSide
  }),
  gratePlate: new THREE.MeshStandardMaterial({
    color: 0x4a5568, // Cast Cr-Mo Slotted Grate
    metalness: 0.8,
    roughness: 0.32,
    side: THREE.DoubleSide
  }),
  // Grinding Media: Polished Mirror Chrome Steel Spheres
  grindingMedia: new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    metalness: 0.98,
    roughness: 0.10
  }),
  girthGear: new THREE.MeshStandardMaterial({
    color: 0x334155, // Forged Gear Ring
    metalness: 0.85,
    roughness: 0.28,
    side: THREE.DoubleSide
  }),
  pinion: new THREE.MeshStandardMaterial({
    color: 0x475569,
    metalness: 0.9,
    roughness: 0.22
  }),
  fasteners: new THREE.MeshStandardMaterial({
    color: 0xd4af37, // Zinc / Gold Plated High-Tensile 10.9 Steel
    metalness: 0.88,
    roughness: 0.22
  }),
  bearings: new THREE.MeshStandardMaterial({
    color: 0x1e293b, // Cast Iron Bearing Pedestal
    metalness: 0.55,
    roughness: 0.50
  }),
  feedChute: new THREE.MeshStandardMaterial({
    color: 0x475569,
    metalness: 0.5,
    roughness: 0.45
  })
};

// CAD Engineering Solid Materials
const CAD_MATERIALS = {};
Object.keys(CAD_COLORS).forEach(key => {
  CAD_MATERIALS[key] = new THREE.MeshStandardMaterial({
    color: CAD_COLORS[key],
    metalness: 0.3,
    roughness: 0.40,
    side: THREE.DoubleSide
  });
});

// Wireframe Blueprint Materials
const WIREFRAME_MATERIALS = {};
Object.keys(CAD_COLORS).forEach(key => {
  WIREFRAME_MATERIALS[key] = new THREE.MeshBasicMaterial({
    color: key.includes('shell') ? 0x00d2ff : (key.includes('Liner') ? 0xf59e0b : 0x38bdf8),
    wireframe: true,
    transparent: true,
    opacity: 0.8
  });
});

// X-Ray Cutaway Materials (Translucent outer shell, vivid glowing internals)
const XRAY_MATERIALS = {
  shell: new THREE.MeshPhysicalMaterial({
    color: 0x3ba5b8,
    metalness: 0.1,
    roughness: 0.15,
    transmission: 0.85,
    transparent: true,
    opacity: 0.25,
    depthWrite: false,
    side: THREE.DoubleSide
  }),
  shellCutaway: new THREE.MeshPhysicalMaterial({
    color: 0x3ba5b8,
    metalness: 0.1,
    roughness: 0.15,
    transmission: 0.85,
    transparent: true,
    opacity: 0.25,
    depthWrite: false,
    side: THREE.DoubleSide
  }),
  stiffener: new THREE.MeshPhysicalMaterial({
    color: 0x244252,
    transmission: 0.8,
    transparent: true,
    opacity: 0.3,
    depthWrite: false,
    side: THREE.DoubleSide
  }),
  headDischarge: new THREE.MeshPhysicalMaterial({
    color: 0x0284c7,
    transmission: 0.82,
    transparent: true,
    opacity: 0.28,
    depthWrite: false,
    side: THREE.DoubleSide
  }),
  headFeed: new THREE.MeshPhysicalMaterial({
    color: 0x0284c7,
    transmission: 0.82,
    transparent: true,
    opacity: 0.28,
    depthWrite: false,
    side: THREE.DoubleSide
  }),
  // Internals glow brightly inside X-Ray
  shellLiner: new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    emissive: 0xb45309,
    emissiveIntensity: 0.7,
    metalness: 0.6,
    roughness: 0.25,
    side: THREE.DoubleSide
  }),
  lifterBar: new THREE.MeshStandardMaterial({
    color: 0xf97316,
    emissive: 0xc2410c,
    emissiveIntensity: 0.8,
    metalness: 0.6,
    roughness: 0.25,
    side: THREE.DoubleSide
  }),
  endLinerInner: new THREE.MeshStandardMaterial({
    color: 0xec4899,
    emissive: 0xbe185d,
    emissiveIntensity: 0.7,
    side: THREE.DoubleSide
  }),
  endLinerOuter: new THREE.MeshStandardMaterial({
    color: 0xef4444,
    emissive: 0xb91c1c,
    emissiveIntensity: 0.7,
    side: THREE.DoubleSide
  }),
  pulpLifter: new THREE.MeshStandardMaterial({
    color: 0x06b6d4,
    emissive: 0x0e7490,
    emissiveIntensity: 0.85,
    side: THREE.DoubleSide
  }),
  gratePlate: new THREE.MeshStandardMaterial({
    color: 0x10b981,
    emissive: 0x047857,
    emissiveIntensity: 0.7,
    side: THREE.DoubleSide
  }),
  grindingMedia: new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0x94a3b8,
    emissiveIntensity: 0.6,
    metalness: 0.95,
    roughness: 0.1
  }),
  girthGear: new THREE.MeshStandardMaterial({
    color: 0x8b5cf6,
    metalness: 0.7,
    roughness: 0.3,
    side: THREE.DoubleSide
  }),
  pinion: new THREE.MeshStandardMaterial({
    color: 0xa855f7,
    metalness: 0.7,
    roughness: 0.3
  }),
  fasteners: new THREE.MeshStandardMaterial({
    color: 0xfacc15,
    emissive: 0xa16207,
    emissiveIntensity: 0.9
  }),
  bearings: new THREE.MeshPhysicalMaterial({
    color: 0x1e293b,
    transmission: 0.8,
    transparent: true,
    opacity: 0.35
  }),
  feedChute: new THREE.MeshPhysicalMaterial({
    color: 0x334155,
    transmission: 0.8,
    transparent: true,
    opacity: 0.3
  })
};

export class MaterialManager {
  constructor() {
    this.currentMode = MATERIAL_MODES.PRODUCTION;
    this.registeredMeshes = [];
  }

  register(mesh, category) {
    this.registeredMeshes.push({ mesh, category });
    this.applyMaterial(mesh, category, this.currentMode);
  }

  setMode(mode) {
    this.currentMode = mode;
    this.registeredMeshes.forEach(({ mesh, category }) => {
      this.applyMaterial(mesh, category, mode);
    });
  }

  updateShellColor(colorHex) {
    if (PROD_MATERIALS.shell) PROD_MATERIALS.shell.color.setHex(colorHex);
    if (PROD_MATERIALS.shellCutaway) PROD_MATERIALS.shellCutaway.color.setHex(colorHex);
    if (CAD_MATERIALS.shell) CAD_MATERIALS.shell.color.setHex(colorHex);
    if (XRAY_MATERIALS.shell) XRAY_MATERIALS.shell.color.setHex(colorHex);
    this.registeredMeshes.forEach(({ mesh, category }) => {
      if (category === 'shell') {
        this.applyMaterial(mesh, category, this.currentMode);
      }
    });
  }

  applyMaterial(mesh, category, mode) {
    // Map product IDs to standard material slots
    let catKey = category;
    if (category.startsWith('w9_5498') || category.startsWith('w9_5724_9')) catKey = 'shellLiner';
    else if (category.startsWith('w9_5780')) catKey = 'lifterBar';
    else if (category.startsWith('w9_5724_6') || category.startsWith('w9_5724_4')) catKey = 'endLinerOuter';
    else if (category.startsWith('bm_ovfl')) catKey = 'fasteners';

    let mat;
    if (mode === MATERIAL_MODES.PRODUCTION) {
      mat = PROD_MATERIALS[catKey] || PROD_MATERIALS.shell;
    } else if (mode === MATERIAL_MODES.CAD) {
      mat = CAD_MATERIALS[catKey] || CAD_MATERIALS.shell;
    } else if (mode === MATERIAL_MODES.WIREFRAME) {
      mat = WIREFRAME_MATERIALS[catKey] || WIREFRAME_MATERIALS.shell;
    } else if (mode === MATERIAL_MODES.XRAY) {
      mat = XRAY_MATERIALS[catKey] || XRAY_MATERIALS.shell;
    }
    if (mat) {
      mesh.material = mat;
    }
  }
}
