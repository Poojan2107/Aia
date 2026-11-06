import * as THREE from 'three';

const lerp = (a, b, t) => a + (b - a) * t;

export const CHAPTERS = [
  {
    id: 'chap-overview',
    title: 'AIA 8.26m Industrial Ball Mill',
    subtitle: 'Primary Heavy Comminution System',
    tag: 'SYSTEM OVERVIEW',
    range: [0.0, 0.14],
    expansion: 0.0,
    cameraPos: new THREE.Vector3(14, 6.5, 15),
    cameraTarget: new THREE.Vector3(0, -0.5, 0),
    operating: true,
    desc: 'High-capacity 8.26m (26ft) diameter x 8.5m length mining ball mill. Engineered by AIA Engineering & Vega Industries for severe abrasive gold, copper, and iron ore processing circuits.',
    specs: [
      { label: 'Mill Diameter', val: '8.26 m (26 ft)' },
      { label: 'Effective Volume', val: '385 m³' },
      { label: 'Installed Power', val: '6,500 kW (Dual Drive)' },
      { label: 'Operational Speed', val: '14.5 RPM (74% Critical)' }
    ]
  },
  {
    id: 'chap-shell',
    title: 'Cylindrical Shell & Girth Gear',
    subtitle: 'Structural Core & Dual Drive Kinematics',
    tag: 'SHELL & DRIVE',
    range: [0.14, 0.28],
    expansion: 0.20,
    cameraPos: new THREE.Vector3(10.5, 4.2, 5.0),
    cameraTarget: new THREE.Vector3(1.2, 0.0, 1.8),
    operating: false,
    desc: 'Shell fabricated from 65mm normalized ASTM A516 Gr 70 boiler quality plate with full-penetration submerged-arc welding. Split circumferential Girth Gear (9.4m pitch diameter, 44 tonnes) distributes heavy torsional grinding loads.',
    specs: [
      { label: 'Plate Thickness', val: '65 mm Normalized' },
      { label: 'Girth Gear MOC', val: 'Cast Cr-Ni-Mo Steel' },
      { label: 'Tooth Flank Hardness', val: '280 - 320 HB' },
      { label: 'Total Shell Mass', val: '115,000 kg' }
    ]
  },
  {
    id: 'chap-liners',
    title: 'AIA High-Chrome Wave Liners',
    subtitle: 'Stepped Profile & Cataracting Dynamics',
    tag: 'ADVANCED LINING',
    range: [0.28, 0.44],
    expansion: 0.48,
    cameraPos: new THREE.Vector3(6.5, 3.2, -1.2),
    cameraTarget: new THREE.Vector3(0, 0, 0),
    operating: false,
    desc: 'AIA double-wave stepped liner plates (W9_5396_90) and lifter bars (W9_5396_92). The steep 55° lift angle propels the ball charge into an aggressive cataracting trajectory, maximizing high-energy impact breakage.',
    specs: [
      { label: 'Liner Metallurgy', val: 'Hi-Cr White Iron (20-27% Cr)' },
      { label: 'Microstructure', val: 'Martensite + Eutectic Carbides' },
      { label: 'Surface Hardness', val: '62 - 66 HRC (700+ HB)' },
      { label: 'Wear Life Multiplier', val: '2.4x vs Cr-Mo Steel' }
    ]
  },
  {
    id: 'chap-charge',
    title: 'High-Chromium Grinding Media',
    subtitle: 'AIA Vega Hyper-Chrome Alloy Balls',
    tag: 'GRINDING MEDIA',
    range: [0.44, 0.58],
    expansion: 0.58,
    cameraPos: new THREE.Vector3(4.2, -0.4, 2.0),
    cameraTarget: new THREE.Vector3(0, -1.8, 1.0),
    operating: false,
    desc: 'AIA Engineering is the global leader in High-Chromium grinding media. Graded charge (30mm to 90mm) filling 38% of mill volume delivers optimal particle size reduction with negligible breakage and zero spalling.',
    specs: [
      { label: 'Ball Charge Weight', val: '240 Metric Tons' },
      { label: 'Filling Degree', val: '38% Internal Volume' },
      { label: 'Core Hardness', val: '60 - 64 HRC' },
      { label: 'Consumption Rate', val: '35-50% Lower than Forged' }
    ]
  },
  {
    id: 'chap-discharge',
    title: 'EEPL Curved Pulp Lifters & Grate',
    subtitle: 'Energy-Efficient Pulp Evacuation',
    tag: 'DISCHARGE SYSTEM',
    range: [0.58, 0.72],
    expansion: 0.76,
    cameraPos: new THREE.Vector3(8.5, 4.0, 10.5),
    cameraTarget: new THREE.Vector3(0, 0, 4.5),
    operating: false,
    desc: 'Patented AIA Energy Efficient Pulp Lifter (EEPL, W9_5350_57_C) and slotted grate diaphragm (W9_5350_103). Eliminates slurry pooling inside the mill, ensuring instant pulp discharge into the trunnion throat.',
    specs: [
      { label: 'Slurry Evacuation', val: 'Zero Backflow Pooling' },
      { label: 'Power Reduction', val: '8% - 12% Dead Power Saved' },
      { label: 'Throughput Boost', val: '+10% to +15% Capacity' },
      { label: 'Grate Slots', val: '12mm - 25mm Relief Taper' }
    ]
  },
  {
    id: 'chap-feed',
    title: 'Feed Head & Archimedean Spiral',
    subtitle: 'Slurry Intake & Trunnion Protection',
    tag: 'FEED SYSTEM',
    range: [0.72, 0.84],
    expansion: 0.88,
    cameraPos: new THREE.Vector3(-8.5, 4.2, -10.5),
    cameraTarget: new THREE.Vector3(0, 0, -4.5),
    operating: false,
    desc: 'Large feed trunnion throat equipped with continuous Archimedean helical flight liner. Propels fresh slurry and ball additions straight into the grinding chamber while sealing the hydrodynamic journal bearing.',
    specs: [
      { label: 'Feed Throat Ø', val: '2.10 m Clear Bore' },
      { label: 'Intake Velocity', val: '3.2 m/s Smooth Feed' },
      { label: 'End Liners', val: '24 Outer + 12 Inner Rings' },
      { label: 'Head Cast Mass', val: '38,500 kg Alloy Steel' }
    ]
  },
  {
    id: 'chap-fasteners',
    title: 'Precision Fastening System',
    subtitle: 'Anti-Rotation T-Bolts & Conical Seals',
    tag: 'FASTENERS & SEALING',
    range: [0.84, 0.94],
    expansion: 0.95,
    cameraPos: new THREE.Vector3(6.5, 4.5, 3.0),
    cameraTarget: new THREE.Vector3(4.2, 1.2, 1.5),
    operating: false,
    desc: 'Forged Grade 10.9 alloy steel T-bolts (BM_OVFL_20 / BM_NGDS_34) with anti-rotation shanks, spherical cup washers, vulcanized elastomeric seal grommets, and locking nylock nuts. 100% leak-free under severe cyclic impact.',
    specs: [
      { label: 'Bolt Specification', val: 'M36 / M52 Grade 10.9' },
      { label: 'Tensile Strength', val: '1,040 N/mm²' },
      { label: 'Seal Design', val: 'Conical Molded Elastomer' },
      { label: 'Torque Rating', val: '2,800 Nm Hyd. Tensioned' }
    ]
  },
  {
    id: 'chap-inspect',
    title: 'Interactive CAD Inspection Mode',
    subtitle: 'Complete 3D Digital Twin Exploration',
    tag: 'FREE CAD INSPECTION',
    range: [0.94, 1.0],
    expansion: 1.0,
    cameraPos: new THREE.Vector3(13, 7, 14),
    cameraTarget: new THREE.Vector3(0, 0, 0),
    operating: false,
    desc: 'Full interactive 3D inspection unlocked! Orbit, zoom, and pan around the AIA Ball Mill assembly. Use the Exploded View slider to scrub split positions, toggle component layers, switch view modes, or click any part to review engineering drawing codes and metallurgy.',
    specs: [
      { label: 'Orbit Controls', val: 'Active (Left-drag / Pinch)' },
      { label: 'Explosion Scrub', val: 'Fully Dynamic (0 - 100%)' },
      { label: 'Click to Inspect', val: 'AIA Drawing Codes Active' },
      { label: 'CAD Render Modes', val: 'Production / CAD / Wire / X-Ray' }
    ]
  }
];

export class ScrollController {
  constructor(ballMillAssembly, camera, controls, uiCallbacks) {
    this.mill = ballMillAssembly;
    this.camera = camera;
    this.controls = controls;
    this.uiCallbacks = uiCallbacks;

    this.scrollProgress = 0.0;
    this.currentChapterIndex = 0;
    this.targetCameraPos = new THREE.Vector3();
    this.targetCameraTarget = new THREE.Vector3();

    this.isFreeInspect = false;
    this.manualExplosion = null;

    this.setupScrollListener();
  }

  setupScrollListener() {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      this.scrollProgress = Math.max(0, Math.min(1, scrollY / maxScroll));
      this.updateFromScroll();
    }, { passive: true });
  }

  updateFromScroll() {
    if (this.manualExplosion !== null) {
      return;
    }

    let activeIdx = 0;
    for (let i = 0; i < CHAPTERS.length; i++) {
      const c = CHAPTERS[i];
      if (this.scrollProgress >= c.range[0] && this.scrollProgress <= c.range[1]) {
        activeIdx = i;
        break;
      }
      if (i === CHAPTERS.length - 1 && this.scrollProgress > c.range[1]) {
        activeIdx = i;
      }
    }

    const chap = CHAPTERS[activeIdx];
    const prevIdx = this.currentChapterIndex;
    this.currentChapterIndex = activeIdx;

    const span = chap.range[1] - chap.range[0];
    const localT = span > 0 ? (this.scrollProgress - chap.range[0]) / span : 0;

    let targetExpansion = chap.expansion;
    if (activeIdx < CHAPTERS.length - 1) {
      const nextChap = CHAPTERS[activeIdx + 1];
      targetExpansion = lerp(chap.expansion, nextChap.expansion, localT);
    }
    this.mill.applyExpansion(targetExpansion);

    if (!this.isFreeInspect) {
      if (activeIdx < CHAPTERS.length - 1) {
        const nextChap = CHAPTERS[activeIdx + 1];
        this.targetCameraPos.lerpVectors(chap.cameraPos, nextChap.cameraPos, localT);
        this.targetCameraTarget.lerpVectors(chap.cameraTarget, nextChap.cameraTarget, localT);
      } else {
        this.targetCameraPos.copy(chap.cameraPos);
        this.targetCameraTarget.copy(chap.cameraTarget);
      }

      this.camera.position.lerp(this.targetCameraPos, 0.08);
      this.controls.target.lerp(this.targetCameraTarget, 0.08);
      if (!this.controls.enabled) {
        this.camera.lookAt(this.controls.target);
      }
    }

    if (activeIdx !== prevIdx) {
      this.uiCallbacks.onChapterChange(chap, activeIdx);
    }

    this.uiCallbacks.onScrollProgress(this.scrollProgress, targetExpansion);
  }

  jumpToChapter(index) {
    if (index < 0 || index >= CHAPTERS.length) return;
    const chap = CHAPTERS[index];
    const targetScrollY = chap.range[0] * (document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  }

  setManualExplosion(factor) {
    this.manualExplosion = factor;
    this.mill.applyExpansion(factor);
    this.uiCallbacks.onScrollProgress(this.scrollProgress, factor);
  }

  releaseManualExplosion() {
    this.manualExplosion = null;
    this.updateFromScroll();
  }

  toggleFreeInspect(enable) {
    this.isFreeInspect = enable;
    this.controls.enabled = enable;
  }
}
