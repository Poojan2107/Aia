import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// =============================================================================
// AIA ENGINEERING OFFICIAL TECHNICAL CATALOG METADATA (1:1 CAD PARITY)
// =============================================================================
export const AIA_PRODUCTS_CATALOG = {
  w9_5498_34: {
    id: 'w9_5498_34',
    name: 'AIA High-Chrome Wave Shell Liner',
    code: 'W9_5498_34',
    category: 'Shell Liners',
    moc: 'High-Chromium Martensitic White Iron (20-27% Cr, Mo, Ni)',
    hardness: '62 - 68 HRC (700+ HB)',
    weight: '480 kg per segment',
    desc: 'Double-wave stepped shell liner plates engineered by AIA to optimize grinding kinetics. High angle lifter face propels ball charge to 55° for maximum cataracting impact breakage.',
    advantage: 'Up to 2.4x longer wear life compared to standard chrome-moly steel. Low wear profile maintains continuous grinding efficiency over campaign life.',
    glbUrl: '/models/products/product_w9_5498_34.glb',
    colorHex: 0x8a99a8,
    metalness: 0.85,
    roughness: 0.28
  },
  w9_5724_9_b: {
    id: 'w9_5724_9_b',
    name: 'Composite Hi-Cr / Rubber Wave Lifter',
    code: 'W9_5724_9_B',
    category: 'Composite Liners',
    moc: 'Vega High-Chromium Inserts vulcanized in High-Tear Rubber Matrix',
    hardness: '64 HRC Inserts / 60 Shore A Rubber',
    weight: '315 kg per segment',
    desc: 'Hybrid composite liner system combining extreme gouging wear resistance of high-chrome white iron with the impact dampening and elasticity of rubber.',
    advantage: '40% weight reduction compared to solid steel liners, reducing mill drive power draw and relining downtime by 50%.',
    glbUrl: '/models/products/product_w9_5724_9_b.glb',
    colorHex: 0x3b82f6,
    metalness: 0.65,
    roughness: 0.35
  },
  w9_5780_4: {
    id: 'w9_5780_4',
    name: 'Heavy-Duty Rubber Shell Lifter Bar',
    code: 'W9_5780_4',
    category: 'Rubber Liners',
    moc: 'Special Anti-Abrasion Natural/Polybutadiene Rubber Blend',
    hardness: '65 ± 5 Shore A',
    weight: '142 kg per segment',
    desc: 'Profiled elastomeric lifter bar equipped with integrated aluminum clamping channel for rigid bolted retention against the mill shell.',
    advantage: 'Superior acoustic dampening (reduces noise by 10-15 dB) and zero corrosion degradation under low pH slurry conditions.',
    glbUrl: '/models/products/product_w9_5780_4.glb',
    colorHex: 0x334155,
    metalness: 0.2,
    roughness: 0.8
  },
  w9_5724_6: {
    id: 'w9_5724_6',
    name: 'Composite Hi-Cr & Rubber End Liner',
    code: 'W9_5724_6',
    category: 'End Liners',
    moc: 'High-Chrome White Cast Iron Embedded in Premium Rubber',
    hardness: '62 - 66 HRC / 65 Shore A',
    weight: '210 kg per segment',
    desc: 'Radial segmental end liners protecting the mill feed and discharge dish heads from direct charge gouging and axial abrasion.',
    advantage: 'Optimized wear profile eliminates gouging hollows near trunnion corners.',
    glbUrl: '/models/products/product_w9_5724_6.glb',
    colorHex: 0x78889b,
    metalness: 0.82,
    roughness: 0.28
  },
  w9_5724_4: {
    id: 'w9_5724_4',
    name: 'Channel-Bolted Rubber End Liner',
    code: 'W9_5724_4',
    category: 'End Liners',
    moc: 'High-Tear Synthetic / Natural Rubber Elastomer',
    hardness: '60 Shore A',
    weight: '85 kg per segment',
    desc: 'Precision molded rubber head liner with vulcanized steel spine for channel clamping directly onto the mill head ribs.',
    advantage: 'Rapid replacement without torch cutting; prevents slurry wash against the structural head.',
    glbUrl: '/models/products/product_w9_5724_4.glb',
    colorHex: 0x1e293b,
    metalness: 0.15,
    roughness: 0.85
  },
  bm_ovfl_18: {
    id: 'bm_ovfl_18',
    name: 'Through-Bolting M36 Assembly & Cup Washer',
    code: 'BM_OVFL_18',
    category: 'Fasteners',
    moc: 'High-Tensile Forged Alloy Steel Grade 10.9 (Zinc Dichromate Plated)',
    hardness: '32 - 38 HRC',
    weight: '5.4 kg per assembly',
    desc: 'M36 oval-head through-bolt with rubber sealing washer, spherical cup washer, and heavy hex locking nylock nut.',
    advantage: '100% leak-free shell sealing with resilient cup washer preventing bolt fatigue failure under cyclic bending moments.',
    glbUrl: '/models/products/product_bm_ovfl_18.glb',
    colorHex: 0xd4af37,
    metalness: 0.88,
    roughness: 0.22
  },
  bm_ovfl_19: {
    id: 'bm_ovfl_19',
    name: 'Channel Clamp Fastener Bolting',
    code: 'BM_OVFL_19',
    category: 'Fasteners',
    moc: 'High-Tensile Heat-Treated Carbon Alloy Steel Grade 8.8 / 10.9',
    hardness: '28 - 34 HRC',
    weight: '3.8 kg per assembly',
    desc: 'Clamping T-bolt designed to slide into vulcanized rubber liner aluminum tracking channels for secure external tightening.',
    advantage: 'Eliminates bolt holes penetrating the wet chamber, eliminating leakage paths through the shell.',
    glbUrl: '/models/products/product_bm_ovfl_19.glb',
    colorHex: 0xd4af37,
    metalness: 0.88,
    roughness: 0.22
  },
  bm_ovfl_20: {
    id: 'bm_ovfl_20',
    name: 'T-Type Anti-Rotation Heavy Bolt Assembly',
    code: 'BM_OVFL_20',
    category: 'Fasteners',
    moc: 'Forged Cr-Mo Alloy Steel with Protective Anti-Seize Zinc Coating',
    hardness: '34 - 39 HRC',
    weight: '6.1 kg per assembly',
    desc: 'Heavy T-head anti-rotation bolt locking directly into liner cast recesses to permit single-operator torquing from the mill exterior.',
    advantage: 'Halves liner bolting torque installation time and prevents liner spin during tightening.',
    glbUrl: '/models/products/product_bm_ovfl_20.glb',
    colorHex: 0xd4af37,
    metalness: 0.88,
    roughness: 0.22
  },
  shell: {
    name: '3-Segment Cylindrical Mill Shell',
    code: 'BM_OVFL_SHELL [Udokan / Akyem / RG Gold]',
    moc: 'Rolled Boiler Quality Steel Plate (ASTM A516 Gr 70)',
    hardness: '160 - 190 HB',
    weight: '124,500 kg',
    desc: 'Heavy 68mm rolled steel shell fabricated in 3 distinct cylindrical sections joined by circumferential stiffening ring flanges. Studded with radial Grade 10.9 liner bolt patterns. Precision normalized and stress-relieved.',
    advantage: 'Engineered for 30+ year fatigue life under severe cascading dynamic charge loads.'
  },
  headDischarge: {
    name: 'Discharge Mill Head & Trunnion Journal',
    code: 'DE_TRUNION_RG GOLD / AIA Discharge Assembly',
    moc: 'Cast Engineering Alloy Steel (BS 3100 Gr A2 / Cr-Mo)',
    hardness: '220 - 260 HB',
    weight: '41,200 kg',
    desc: 'Integral conical dish-head with hollow trunnion journal and bolt flanges. Features concentric rings of liner bolt holes and internal seating faces for radial end liners and discharge diaphragm.',
    advantage: 'Reinforced fillet geometry eliminates stress concentrations at the trunnion-to-flange transition.'
  },
  headFeed: {
    name: 'Feed Mill Head & Trunnion Journal',
    code: 'FE_TRUNION_RG GOLD / AIA Feed Assembly',
    moc: 'Cast Engineering Alloy Steel (BS 3100 Gr A2 / Cr-Mo)',
    hardness: '220 - 260 HB',
    weight: '41,200 kg',
    desc: 'Heavy cast dish head with large diameter trunnion throat housing the internal Archimedean spiral conveyor flight for continuous ore slurry intake.',
    advantage: 'Optimum slurry intake velocity without back-spill or premature journal wash.'
  },
  pulpLifter: {
    name: 'AIA EEPL Energy-Efficient Pulp Lifter',
    code: 'W9_5350_57_C / W9_5350_58_C',
    moc: 'Cast Cr-Mo Alloy with Polyurethane Flow Liners',
    hardness: '56 - 60 HRC',
    weight: '520 kg per scoop',
    desc: 'Curved Pulp Lifter (EEPL) technology. Scoops ground pulp slurry from the periphery of the grate discharge and discharges directly into the center discharge cone with zero slurry backflow or pooling.',
    advantage: 'Eliminates pulp pooling inside the mill, reducing dead power consumption by 8-12% and increasing mill throughput by up to 15%.'
  },
  gratePlate: {
    name: 'Slotted Grate Discharge Diaphragm Plate',
    code: 'W9_5350_103 / W9_960_71_B',
    moc: 'High-Chrome White Cast Iron (Vega Alloy)',
    hardness: '60 - 64 HRC',
    weight: '310 kg per plate',
    desc: 'Precision tapered discharge grate plates with relief slots (12mm to 25mm aperture) that allow correctly ground slurry into the pulp lifters while retaining grinding media inside the chamber.',
    advantage: 'Non-blinding tapered slot geometry prevents pebble pegging and maintains stable slurry discharge pressure.'
  },
  grindingMedia: {
    name: 'AIA High-Chromium Cast Grinding Balls',
    code: 'AIA VEGA HYPER-CHROME (40mm - 90mm)',
    moc: 'High-Chromium Alloy Steel (18% - 28% Cr, 2.5-3.2% C)',
    hardness: '62 - 66 HRC (Core to Surface)',
    weight: '260 Metric Tons (38% Mill Volume)',
    desc: 'World-benchmark high chrome grinding media. Martensitic matrix densely populated with hard eutectic chromium carbides (M7C3). Graded size distribution for maximum breakage kinetics.',
    advantage: 'Lowest consumption rate globally. 40-50% lower wear rate than forged steel, negligible breakage, and favorable chemical redox environment for mineral flotation.'
  },
  girthGear: {
    name: 'Heavy Split Circumferential Girth Gear',
    code: 'BM_DRIVE_GIRTH_GEAR_MOD30',
    moc: 'High-Integrity Ductile Cast Iron / Cast Cr-Ni-Mo Steel',
    hardness: '280 - 320 HB (Induction Hardened Teeth)',
    weight: '48,000 kg',
    desc: 'Precision helical cut split ring gear (pitch diameter ~8.8m) flanged to the mill shell. Driven by dual pinions coupled to 6,500 kW variable speed electric drives.',
    advantage: 'Tangential spring-plate mounting absorbs shell thermal expansion while preserving gear mesh alignment.'
  },
  bearings: {
    name: 'Hydrodynamic Trunnion Bearings & Pedestals',
    code: 'BM_TRUNNION_BEARING_HOUSING',
    moc: 'Heavy Cast Iron Housing with Babbitt / White Metal Bushings',
    hardness: 'Babbitt Lining Grade 2',
    weight: '19,500 kg each',
    desc: 'Massive split bearing pedestals with pressurized hydrostatic jacking oil lift pockets for low-torque starting and hydrodynamic floating oil film during operation.',
    advantage: 'Near-zero start-up friction, protecting the trunnion journal from metal-to-metal wear.'
  }
};

export const AIA_PARTS_METADATA = AIA_PRODUCTS_CATALOG;

// =============================================================================
// HELPER: CREATE HOLLOW ANNULAR FLANGE / SPLIT RING GEOMETRY
// =============================================================================
function createSemiFlangeGeometry(innerRadius, outerRadius, depth, isUpper = true, segments = 64) {
  const shape = new THREE.Shape();
  const startAngle = isUpper ? 0 : Math.PI;
  const endAngle = isUpper ? Math.PI : Math.PI * 2;
  shape.absarc(0, 0, outerRadius, startAngle, endAngle, false);
  shape.absarc(0, 0, innerRadius, endAngle, startAngle, true);

  const geom = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: false,
    curveSegments: segments
  });
  geom.translate(0, 0, -depth / 2);
  return geom;
}

// =============================================================================
// MAIN BALL MILL ASSEMBLY CLASS
// =============================================================================
export class BallMillAssembly {
  constructor(scene, materialManager) {
    this.scene = scene;
    this.materialManager = materialManager;
    this.rootGroup = new THREE.Group();
    this.scene.add(this.rootGroup);

    // Rotating assembly (Shell, heads, liners, lifters, girth gear)
    this.rotatingAssembly = new THREE.Group();
    this.rootGroup.add(this.rotatingAssembly);

    // Dynamic grinding charge assembly (Physics simulated inside mill chamber)
    this.chargeAssembly = new THREE.Group();
    this.rootGroup.add(this.chargeAssembly);

    // Static foundation assembly (Pedestals, pinion drive, floor)
    this.staticAssembly = new THREE.Group();
    this.rootGroup.add(this.staticAssembly);

    this.components = {
      shellUpper: null,
      shellLower: null,
      headDischarge: null,
      headFeed: null,
      endLinersDE: null,
      endLinersFE: null,
      shellLinersLower: null,
      shellLinersUpper: null,
      fastenersLower: null,
      fastenersUpper: null,
      pulpLifters: [],
      gratePlates: [],
      grindingMedia: null,
      girthGearUpper: null,
      girthGearLower: null,
      pinion: null,
      bearingsDE: null,
      bearingsFE: null
    };

    this.interactiveObjects = [];
    this.isLoaded = false;
    this.expansionProgress = 0.0;
    this.activeShellVariant = 'udokan'; // 'udokan', 'akyem', 'rggold'

    // Crushing charge physics state
    this.ballChargeParticles = [];
    this.ballDummy = new THREE.Object3D();
  }

  async loadCADModels(onProgress) {
    const loader = new GLTFLoader();
    const loadGLB = (path) => new Promise((resolve, reject) => {
      loader.load(path, (gltf) => resolve(gltf), (xhr) => {
        if (onProgress && xhr.total) {
          onProgress(xhr.loaded / xhr.total);
        }
      }, reject);
    });

    try {
      const [
        shellUpperGltf,
        shellLowerGltf,
        headDEGltf,
        headFEGltf,
        endLinersDEGltf,
        endLinersFEGltf,
        shellLinersLowerGltf,
        shellLinersUpperGltf,
        fastenersLowerGltf,
        fastenersUpperGltf,
        pulpLifterGltf,
        grateGltf
      ] = await Promise.all([
        loadGLB('/models/cad_shell_upper.glb'),
        loadGLB('/models/cad_shell_lower.glb'),
        loadGLB('/models/cad_head_discharge.glb'),
        loadGLB('/models/cad_head_feed.glb'),
        loadGLB('/models/cad_end_liners_de.glb'),
        loadGLB('/models/cad_end_liners_fe.glb'),
        loadGLB('/models/cad_shell_liners_lower.glb'),
        loadGLB('/models/cad_shell_liners_upper.glb'),
        loadGLB('/models/cad_fasteners_lower.glb'),
        loadGLB('/models/cad_fasteners_upper.glb'),
        loadGLB('/models/pulp_lifter_outer.glb'),
        loadGLB('/models/grate_plate.glb')
      ]);

      const extractMesh = (gltf) => {
        let found = null;
        gltf.scene.traverse((c) => {
          if (!found && c.isMesh) found = c;
        });
        return found || gltf.scene.children[0];
      };

      this.buildFullMill({
        shellUpper: extractMesh(shellUpperGltf),
        shellLower: extractMesh(shellLowerGltf),
        headDE: extractMesh(headDEGltf),
        headFE: extractMesh(headFEGltf),
        endLinersDE: extractMesh(endLinersDEGltf),
        endLinersFE: extractMesh(endLinersFEGltf),
        shellLinersLower: extractMesh(shellLinersLowerGltf),
        shellLinersUpper: extractMesh(shellLinersUpperGltf),
        fastenersLower: extractMesh(fastenersLowerGltf),
        fastenersUpper: extractMesh(fastenersUpperGltf),
        pulpLifter: extractMesh(pulpLifterGltf),
        gratePlate: extractMesh(grateGltf)
      });

      this.isLoaded = true;
    } catch (err) {
      console.error('Error loading CAD models:', err);
    }
  }

  buildFullMill(cadParts) {
    const SHELL_RADIUS = 3.711;
    const SHELL_HALF_LEN = 5.584;

    // =========================================================================
    // 1. GENUINE CYLINDRICAL SHELL (FROM USER CAD FILE)
    // =========================================================================
    // Upper Half Shell (Lifts vertically on expansion)
    const upperShell = cadParts.shellUpper.clone();
    this.materialManager.register(upperShell, 'shell');
    upperShell.userData = {
      metaKey: 'shell',
      basePos: upperShell.position.clone(),
      isUpper: true
    };
    this.rotatingAssembly.add(upperShell);
    this.components.shellUpper = upperShell;
    this.interactiveObjects.push(upperShell);

    // Lower Half Shell (Seated firmly on foundation)
    const lowerShell = cadParts.shellLower.clone();
    this.materialManager.register(lowerShell, 'shell');
    lowerShell.userData = {
      metaKey: 'shell',
      basePos: lowerShell.position.clone(),
      isUpper: false
    };
    this.rotatingAssembly.add(lowerShell);
    this.components.shellLower = lowerShell;
    this.interactiveObjects.push(lowerShell);

    // =========================================================================
    // 2. DISCHARGE HEAD & END LINERS (GENUINE CAD MATCH)
    // =========================================================================
    const headDE = cadParts.headDE.clone();
    this.materialManager.register(headDE, 'headDischarge');
    headDE.userData = {
      metaKey: 'headDischarge',
      basePos: headDE.position.clone()
    };
    this.rotatingAssembly.add(headDE);
    this.components.headDischarge = headDE;
    this.interactiveObjects.push(headDE);

    const endLinersDE = cadParts.endLinersDE.clone();
    this.materialManager.register(endLinersDE, 'w9_5724_6');
    endLinersDE.userData = {
      metaKey: 'w9_5724_6',
      basePos: endLinersDE.position.clone()
    };
    this.rotatingAssembly.add(endLinersDE);
    this.components.endLinersDE = endLinersDE;
    this.interactiveObjects.push(endLinersDE);

    // =========================================================================
    // 3. FEED HEAD & END LINERS (GENUINE CAD MATCH)
    // =========================================================================
    const headFE = cadParts.headFE.clone();
    this.materialManager.register(headFE, 'headFeed');
    headFE.userData = {
      metaKey: 'headFeed',
      basePos: headFE.position.clone()
    };
    this.rotatingAssembly.add(headFE);
    this.components.headFeed = headFE;
    this.interactiveObjects.push(headFE);

    const endLinersFE = cadParts.endLinersFE.clone();
    this.materialManager.register(endLinersFE, 'w9_5724_6');
    endLinersFE.userData = {
      metaKey: 'w9_5724_6',
      basePos: endLinersFE.position.clone()
    };
    this.rotatingAssembly.add(endLinersFE);
    this.components.endLinersFE = endLinersFE;
    this.interactiveObjects.push(endLinersFE);

    // =========================================================================
    // 4. SHELL LINERS & LIFTERS (FROM USER CAD FILE P00476)
    // =========================================================================
    const shellLinersLower = cadParts.shellLinersLower.clone();
    this.materialManager.register(shellLinersLower, 'w9_5498_34');
    shellLinersLower.userData = {
      metaKey: 'w9_5498_34',
      basePos: shellLinersLower.position.clone(),
      isUpper: false
    };
    this.rotatingAssembly.add(shellLinersLower);
    this.components.shellLinersLower = shellLinersLower;
    this.interactiveObjects.push(shellLinersLower);

    const shellLinersUpper = cadParts.shellLinersUpper.clone();
    this.materialManager.register(shellLinersUpper, 'w9_5498_34');
    shellLinersUpper.userData = {
      metaKey: 'w9_5498_34',
      basePos: shellLinersUpper.position.clone(),
      isUpper: true
    };
    this.rotatingAssembly.add(shellLinersUpper);
    this.components.shellLinersUpper = shellLinersUpper;
    this.interactiveObjects.push(shellLinersUpper);

    // =========================================================================
    // 5. FASTENERS (M36 BOLTS & SLEEVES FROM USER CAD FILE)
    // =========================================================================
    const fastenersLower = cadParts.fastenersLower.clone();
    this.materialManager.register(fastenersLower, 'bm_ovfl_18');
    fastenersLower.userData = {
      metaKey: 'bm_ovfl_18',
      basePos: fastenersLower.position.clone(),
      isUpper: false
    };
    this.rotatingAssembly.add(fastenersLower);
    this.components.fastenersLower = fastenersLower;
    this.interactiveObjects.push(fastenersLower);

    const fastenersUpper = cadParts.fastenersUpper.clone();
    this.materialManager.register(fastenersUpper, 'bm_ovfl_18');
    fastenersUpper.userData = {
      metaKey: 'bm_ovfl_18',
      basePos: fastenersUpper.position.clone(),
      isUpper: true
    };
    this.rotatingAssembly.add(fastenersUpper);
    this.components.fastenersUpper = fastenersUpper;
    this.interactiveObjects.push(fastenersUpper);

    // =========================================================================
    // 6. DISCHARGE DIAPHRAGM: EEPL CURVED PULP LIFTERS & SLOTTED GRATES
    // =========================================================================
    const numPulpLifters = 16;
    const pulpRadius = 2.35;
    for (let i = 0; i < numPulpLifters; i++) {
      const angle = (i * Math.PI * 2) / numPulpLifters;
      const px = Math.cos(angle) * pulpRadius;
      const py = Math.sin(angle) * pulpRadius;

      // Pulp Lifter (positioned behind grate plates)
      const pl = cadParts.pulpLifter.clone();
      pl.position.set(px, py, 5.15);
      pl.rotation.z = angle;
      this.materialManager.register(pl, 'pulpLifter');
      pl.userData = {
        metaKey: 'pulpLifter',
        basePos: pl.position.clone()
      };
      this.rotatingAssembly.add(pl);
      this.components.pulpLifters.push(pl);
      this.interactiveObjects.push(pl);

      // Slotted Grate Plate
      const gp = cadParts.gratePlate.clone();
      gp.position.set(px, py, 4.75);
      gp.rotation.z = angle;
      this.materialManager.register(gp, 'gratePlate');
      gp.userData = {
        metaKey: 'gratePlate',
        basePos: gp.position.clone()
      };
      this.rotatingAssembly.add(gp);
      this.components.gratePlates.push(gp);
      this.interactiveObjects.push(gp);
    }

    // =========================================================================
    // 7. INTERNAL GRINDING CHARGE (DAVIS TRAJECTORY CRUSHING PHYSICS)
    // =========================================================================
    const ballCount = 450;
    const ballGeom = new THREE.SphereGeometry(1, 16, 16);
    const ballInstanced = new THREE.InstancedMesh(ballGeom, null, ballCount);
    this.materialManager.register(ballInstanced, 'grindingMedia');

    const ballRadii = [0.07, 0.085, 0.10, 0.12];
    this.ballChargeParticles = [];

    for (let i = 0; i < ballCount; i++) {
      const radius = ballRadii[i % ballRadii.length];
      const maxR = 3.20 - radius;
      const r = 1.25 + Math.random() * (maxR - 1.25);
      const theta = (-140 + Math.random() * 165) * (Math.PI / 180);
      const z = (Math.random() - 0.5) * (SHELL_HALF_LEN * 2 - 2.2);

      const p = {
        r,
        maxR,
        theta,
        z,
        scale: radius,
        state: 'bed',
        vx: 0,
        vy: 0,
        x: Math.cos(theta) * r,
        y: Math.sin(theta) * r
      };

      this.ballChargeParticles.push(p);

      this.ballDummy.position.set(p.x, p.y, p.z);
      this.ballDummy.scale.set(radius, radius, radius);
      this.ballDummy.updateMatrix();
      ballInstanced.setMatrixAt(i, this.ballDummy.matrix);
    }

    ballInstanced.instanceMatrix.needsUpdate = true;
    ballInstanced.userData = { metaKey: 'grindingMedia' };
    this.chargeAssembly.add(ballInstanced);
    this.components.grindingMedia = ballInstanced;
    this.interactiveObjects.push(ballInstanced);

    // =========================================================================
    // 8. DRIVE SYSTEM & BEARINGS (STATIC ASSEMBLY & SPLIT GIRTH GEAR)
    // =========================================================================
    const gearUpperGeom = createSemiFlangeGeometry(SHELL_RADIUS - 0.02, SHELL_RADIUS + 0.65, 0.85, true, 64);
    const girthGearUpper = new THREE.Mesh(gearUpperGeom);
    girthGearUpper.position.set(0, 0, 1.86);
    this.materialManager.register(girthGearUpper, 'girthGear');
    girthGearUpper.userData = { metaKey: 'girthGear', basePos: girthGearUpper.position.clone(), isUpper: true };
    this.rotatingAssembly.add(girthGearUpper);
    this.components.girthGearUpper = girthGearUpper;
    this.interactiveObjects.push(girthGearUpper);

    const gearLowerGeom = createSemiFlangeGeometry(SHELL_RADIUS - 0.02, SHELL_RADIUS + 0.65, 0.85, false, 64);
    const girthGearLower = new THREE.Mesh(gearLowerGeom);
    girthGearLower.position.set(0, 0, 1.86);
    this.materialManager.register(girthGearLower, 'girthGear');
    girthGearLower.userData = { metaKey: 'girthGear', basePos: girthGearLower.position.clone(), isUpper: false };
    this.rotatingAssembly.add(girthGearLower);
    this.components.girthGearLower = girthGearLower;
    this.interactiveObjects.push(girthGearLower);

    // Drive Pinion
    const pinionGeom = new THREE.CylinderGeometry(0.55, 0.55, 1.1, 32);
    pinionGeom.rotateX(Math.PI / 2);
    const pinion = new THREE.Mesh(pinionGeom);
    pinion.position.set(SHELL_RADIUS + 0.65 + 0.52, -1.35, 1.86);
    this.materialManager.register(pinion, 'pinion');
    pinion.userData = { metaKey: 'pinion' };
    this.staticAssembly.add(pinion);
    this.components.pinion = pinion;

    // Trunnion Bearing Pedestals
    const pedestalGeom = new THREE.BoxGeometry(4.2, 2.6, 1.6);
    const bearingDE = new THREE.Mesh(pedestalGeom);
    bearingDE.position.set(0, -2.79, 6.55);
    this.materialManager.register(bearingDE, 'bearings');
    bearingDE.userData = { metaKey: 'bearings' };
    this.staticAssembly.add(bearingDE);
    this.components.bearingsDE = bearingDE;
    this.interactiveObjects.push(bearingDE);

    const bearingFE = new THREE.Mesh(pedestalGeom);
    bearingFE.position.set(0, -2.79, -6.55);
    this.materialManager.register(bearingFE, 'bearings');
    bearingFE.userData = { metaKey: 'bearings' };
    this.staticAssembly.add(bearingFE);
    this.components.bearingsFE = bearingFE;
    this.interactiveObjects.push(bearingFE);
  }

  // ===========================================================================
  // DYNAMIC CRUSHING CHARGE KINEMATICS (TEXTBOOK DAVIS CATARACTING/CASCADING)
  // ===========================================================================
  updateBallChargePhysics(delta, isOperating) {
    if (!this.isLoaded || !this.components.grindingMedia) return;

    const omega = isOperating ? 1.45 : 0.0;
    const gravity = 9.8;
    const mesh = this.components.grindingMedia;
    const innerLinerR = 3.22;

    for (let i = 0; i < this.ballChargeParticles.length; i++) {
      const p = this.ballChargeParticles[i];

      if (isOperating) {
        if (p.state === 'bed') {
          const climbRate = omega * (0.80 + (p.r / p.maxR) * 0.25);
          p.theta += climbRate * delta;
          p.x = Math.cos(p.theta) * p.r;
          p.y = Math.sin(p.theta) * p.r;

          const shoulderAngle = (48 + (p.r / p.maxR) * 16) * (Math.PI / 180);
          if (p.theta >= shoulderAngle) {
            if (p.r > 2.3) {
              p.state = 'fall';
              const speed = omega * p.r * 1.05;
              p.vx = -Math.sin(p.theta) * speed;
              p.vy = Math.cos(p.theta) * speed;
            } else {
              p.state = 'cascade';
              p.vx = -2.6 * (0.8 + Math.random() * 0.4);
              p.vy = -1.8 * (0.8 + Math.random() * 0.4);
            }
          }
        } else if (p.state === 'fall') {
          p.x += p.vx * delta;
          p.vy -= gravity * delta;
          p.y += p.vy * delta;

          const currentR = Math.hypot(p.x, p.y);
          if (currentR >= p.maxR - 0.05 || (p.x < -0.8 && p.y <= -1.4)) {
            p.state = 'bed';
            p.theta = Math.atan2(p.y, p.x);
            p.r = Math.min(p.maxR - 0.06, Math.max(1.25, currentR));
            p.x = Math.cos(p.theta) * p.r;
            p.y = Math.sin(p.theta) * p.r;
          }
        } else if (p.state === 'cascade') {
          p.x += p.vx * delta;
          p.vy += p.vy * delta;

          const currentR = Math.hypot(p.x, p.y);
          if (currentR >= p.maxR - 0.05 || p.x < -0.9 || p.y <= -1.6) {
            p.state = 'bed';
            p.theta = Math.atan2(p.y, p.x);
            p.r = Math.min(p.maxR - 0.08, Math.max(1.25, currentR));
            p.x = Math.cos(p.theta) * p.r;
            p.y = Math.sin(p.theta) * p.r;
          }
        }
      }

      // Strict containment clamp: balls NEVER exit the cylinder chamber
      const dist = Math.hypot(p.x, p.y);
      const maxAllowed = innerLinerR - p.scale;
      if (dist > maxAllowed) {
        p.x = (p.x / dist) * maxAllowed;
        p.y = (p.y / dist) * maxAllowed;
      }
      if (p.z < -4.8) p.z = -4.8;
      if (p.z > 4.5) p.z = 4.5;

      this.ballDummy.position.set(p.x, p.y, p.z);
      this.ballDummy.scale.set(p.scale, p.scale, p.scale);
      this.ballDummy.updateMatrix();
      mesh.setMatrixAt(i, this.ballDummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  }

  // ===========================================================================
  // ORDERED MECHANICAL DISASSEMBLY (PART-BY-PART SHOWCASE SEQUENCE)
  // ===========================================================================
  applyExpansion(progress) {
    if (!this.isLoaded) return;
    const t = Math.max(0, Math.min(1, progress));
    this.expansionProgress = t;

    // When expanding, rotation must be 0 so upper parts lift straight up along World Y
    if (t > 0.001) {
      this.rotatingAssembly.rotation.z = 0;
    }

    // STAGE 1: Shell Cutaway Lift (t from 0.0 to 0.35)
    // Upper shell lifts straight up (+Y) by 4.8m, revealing interior cavity.
    const tStage1 = Math.min(1.0, t / 0.35);
    const maxShellLift = 4.8;

    if (this.components.shellUpper) {
      this.components.shellUpper.position.y =
        this.components.shellUpper.userData.basePos.y + (maxShellLift * tStage1);
    }

    // Upper wave liners, fasteners, and upper girth gear lift with upper shell
    if (this.components.shellLinersUpper) {
      this.components.shellLinersUpper.position.y =
        this.components.shellLinersUpper.userData.basePos.y + (maxShellLift * tStage1);
    }

    if (this.components.fastenersUpper) {
      this.components.fastenersUpper.position.y =
        this.components.fastenersUpper.userData.basePos.y + (maxShellLift * tStage1);
    }

    if (this.components.girthGearUpper) {
      this.components.girthGearUpper.position.y =
        this.components.girthGearUpper.userData.basePos.y + (maxShellLift * tStage1);
    }

    // STAGE 2: Axial Extraction of Mill Heads & Diaphragms (t from 0.35 to 0.75)
    const tStage2 = Math.max(0.0, Math.min(1.0, (t - 0.35) / 0.40));
    const maxHeadAxial = 4.8;
    const maxLinersAxial = 3.2;
    const maxPulpAxial = 2.4;
    const maxGrateAxial = 1.6;

    // Discharge Head & End Liners draw out along +Z
    if (this.components.headDischarge) {
      this.components.headDischarge.position.z =
        this.components.headDischarge.userData.basePos.z + (maxHeadAxial * tStage2);
    }

    if (this.components.endLinersDE) {
      this.components.endLinersDE.position.z =
        this.components.endLinersDE.userData.basePos.z + (maxLinersAxial * tStage2);
    }

    // Feed Head & End Liners draw out along -Z
    if (this.components.headFeed) {
      this.components.headFeed.position.z =
        this.components.headFeed.userData.basePos.z - (maxHeadAxial * tStage2);
    }

    if (this.components.endLinersFE) {
      this.components.endLinersFE.position.z =
        this.components.endLinersFE.userData.basePos.z - (maxLinersAxial * tStage2);
    }

    // Diaphragm Slotted Grates & EEPL Pulp Lifters step out along +Z
    this.components.gratePlates.forEach(gp => {
      gp.position.z = gp.userData.basePos.z + (maxGrateAxial * tStage2);
    });

    this.components.pulpLifters.forEach(pl => {
      pl.position.z = pl.userData.basePos.z + (maxPulpAxial * tStage2);
    });

    // STAGE 3: Full Exploded Separation (t from 0.75 to 1.0)
    const tStage3 = Math.max(0.0, (t - 0.75) / 0.25);
    if (this.components.fastenersUpper) {
      this.components.fastenersUpper.position.y =
        this.components.fastenersUpper.userData.basePos.y + maxShellLift + (1.2 * tStage3);
    }
    if (this.components.fastenersLower) {
      this.components.fastenersLower.position.y =
        this.components.fastenersLower.userData.basePos.y - (0.8 * tStage3);
    }
  }

  updateRotation(delta, isOperating) {
    if (!this.isLoaded) return;

    // If expanded or cutaway, ensure mill rests level at 0 rad
    if (this.expansionProgress > 0.001) {
      if (Math.abs(this.rotatingAssembly.rotation.z) > 0.001) {
        let angle = this.rotatingAssembly.rotation.z % (Math.PI * 2);
        if (angle > Math.PI) angle -= Math.PI * 2;
        if (angle < -Math.PI) angle += Math.PI * 2;
        this.rotatingAssembly.rotation.z = THREE.MathUtils.lerp(angle, 0, Math.min(1.0, delta * 12));
      } else {
        this.rotatingAssembly.rotation.z = 0;
      }
      return;
    }

    if (!isOperating) return;
    const rpm = 14.5;
    const radPerSec = (rpm * 2 * Math.PI) / 60;
    this.rotatingAssembly.rotation.z += radPerSec * delta * 0.35;
    if (this.components.pinion) {
      this.components.pinion.rotation.z -= radPerSec * delta * 0.35 * 8;
    }
  }

  setShellVariant(variant) {
    this.activeShellVariant = variant;
    let colorHex = 0x3ba5b8; // default udokan teal
    if (variant === 'akyem') {
      colorHex = 0xc4ab8e; // tan/desert sand from Akyem CAD Assistant screenshot
    } else if (variant === 'rggold') {
      colorHex = 0x606f7b; // industrial machined alloy steel gray
    }

    this.materialManager.updateShellColor(colorHex);
  }

  setComponentVisibility(category, visible) {
    if (!this.isLoaded) return;
    switch (category) {
      case 'shell':
        if (this.components.shellUpper) this.components.shellUpper.visible = visible;
        if (this.components.shellLower) this.components.shellLower.visible = visible;
        break;
      case 'heads':
        if (this.components.headDischarge) this.components.headDischarge.visible = visible;
        if (this.components.headFeed) this.components.headFeed.visible = visible;
        if (this.components.endLinersDE) this.components.endLinersDE.visible = visible;
        if (this.components.endLinersFE) this.components.endLinersFE.visible = visible;
        break;
      case 'shellLiners':
        if (this.components.shellLinersLower) this.components.shellLinersLower.visible = visible;
        if (this.components.shellLinersUpper) this.components.shellLinersUpper.visible = visible;
        break;
      case 'pulpDischarge':
        this.components.pulpLifters.forEach(l => l.visible = visible);
        this.components.gratePlates.forEach(l => l.visible = visible);
        break;
      case 'grindingMedia':
        if (this.components.grindingMedia) this.components.grindingMedia.visible = visible;
        break;
      case 'drive':
        if (this.components.girthGearUpper) this.components.girthGearUpper.visible = visible;
        if (this.components.girthGearLower) this.components.girthGearLower.visible = visible;
        if (this.components.pinion) this.components.pinion.visible = visible;
        break;
      case 'fasteners':
        if (this.components.fastenersLower) this.components.fastenersLower.visible = visible;
        if (this.components.fastenersUpper) this.components.fastenersUpper.visible = visible;
        break;
      case 'bearings':
        if (this.components.bearingsDE) this.components.bearingsDE.visible = visible;
        if (this.components.bearingsFE) this.components.bearingsFE.visible = visible;
        break;
    }
  }
}
