import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import * as THREE from "three";
import geradorFallback from "@/assets/gerador-grande-porte.png";

/* ─── Generator dimensions ──────────────────────────────────────────────── */
const GW = 3.0;   // width
const GH = 1.8;   // height
const GD = 1.5;   // depth

/* ─── Internal component definitions ────────────────────────────────────── */
interface PartDef {
  restPos: [number, number, number];
  explodedPos: [number, number, number];
  label: string;
}

const PART_DEFS: PartDef[] = [
  { restPos: [-0.55, -0.05,  0.05], explodedPos: [-4.5,  1.5, -1.0], label: "Motor Diesel" },
  { restPos: [ 0.85, -0.10,  0.00], explodedPos: [ 4.5,  0.5,  1.0], label: "Alternador" },
  { restPos: [ 0.00, -0.67,  0.00], explodedPos: [ 0.0, -4.0,  0.0], label: "Tanque de Combustível" },
  { restPos: [ 0.00,  0.05, -0.62], explodedPos: [ 0.0,  3.0, -4.0], label: "Radiador" },
  { restPos: [-0.30,  0.48,  0.00], explodedPos: [-2.5,  4.5,  1.5], label: "Sistema de Arrefecimento" },
  { restPos: [ 1.10,  0.05,  0.62], explodedPos: [ 4.0,  1.0,  3.5], label: "Painel de Controle" },
  { restPos: [ 0.00, -0.88,  0.00], explodedPos: [ 0.0, -5.5,  0.0], label: "Base em Aço Carbono" },
  { restPos: [-0.50,  0.73, -0.15], explodedPos: [-1.5,  5.0, -1.0], label: "Escapamento" },
];

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/* ─── Component ──────────────────────────────────────────────────────────── */
const ThreeGeneratorSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const labelEls   = useRef<(HTMLDivElement | null)[]>([]);
  const [webGLOk, setWebGLOk] = useState<boolean | null>(null);

  /* WebGL detection */
  useEffect(() => {
    try {
      const t  = document.createElement("canvas");
      const gl = t.getContext("webgl2") || t.getContext("webgl");
      setWebGLOk(!!gl);
    } catch { setWebGLOk(false); }
  }, []);

  /* Three.js */
  useEffect(() => {
    if (!webGLOk) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    /* ── Renderer ── */
    // Resolve initial dimensions with fallback: clientWidth/Height may be 0 under Suspense/lazy
    const container = canvas.parentElement;
    const getSize = () => {
      if (container) {
        const rect = container.getBoundingClientRect();
        const w = rect.width  || container.clientWidth  || window.innerWidth;
        const h = rect.height || container.clientHeight || window.innerHeight;
        return { w: w || 800, h: h || 600 };
      }
      return { w: window.innerWidth || 800, h: window.innerHeight || 600 };
    };

    const initSize = getSize();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    } catch { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(initSize.w, initSize.h);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type    = THREE.PCFSoftShadowMap;
    renderer.toneMapping        = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;

    /* ── Scene ── */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000d1a);
    scene.fog = new THREE.Fog(0x000d1a, 22, 42);

    /* ── Camera ── */
    const camera = new THREE.PerspectiveCamera(42, initSize.w / initSize.h, 0.1, 100);
    camera.position.set(5, 3, 7);
    camera.lookAt(0, 0, 0);

    /* ── Lights ── */
    scene.add(new THREE.AmbientLight(0xffffff, 2.0));

    const dirMain = new THREE.DirectionalLight(0xffffff, 2.5);
    dirMain.position.set(8, 8, 8);
    dirMain.castShadow = true;
    dirMain.shadow.mapSize.set(1024, 1024);
    dirMain.shadow.camera.near = 0.5;
    dirMain.shadow.camera.far  = 40;
    dirMain.shadow.camera.left  = -8;
    dirMain.shadow.camera.right = 8;
    dirMain.shadow.camera.top   = 8;
    dirMain.shadow.camera.bottom = -8;
    scene.add(dirMain);

    const dirFill = new THREE.DirectionalLight(0xadd8ff, 1.5);
    dirFill.position.set(-5, 4, -5);
    scene.add(dirFill);

    const frontLight = new THREE.PointLight(0xffffff, 2.0, 18);
    frontLight.position.set(0, 2, 7);
    scene.add(frontLight);

    const accentLight = new THREE.PointLight(0x5599ff, 1.5, 14);
    accentLight.position.set(-4, 3, 4);
    scene.add(accentLight);

    /* ── Ground + grid ── */
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 40),
      new THREE.MeshStandardMaterial({ color: 0x001122, metalness: 0.9, roughness: 0.4 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.05;
    ground.receiveShadow = true;
    scene.add(ground);

    const grid = new THREE.GridHelper(30, 24, 0x00496d, 0x001530);
    grid.position.y = -1.04;
    (grid.material as THREE.LineBasicMaterial).transparent = true;
    (grid.material as THREE.LineBasicMaterial).opacity     = 0.30;
    scene.add(grid);

    /* ══════════════════════════════════════════════════════════════════
       MATERIALS
    ══════════════════════════════════════════════════════════════════ */
    const matBlue    = new THREE.MeshStandardMaterial({ color: 0x1e6fbf, metalness: 0.55, roughness: 0.3 });
    const matBlueDark = new THREE.MeshStandardMaterial({ color: 0x155090, metalness: 0.55, roughness: 0.4 });
    const matBlack   = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.75, roughness: 0.3 });
    const matMotor   = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.80, roughness: 0.2 });
    const matAlt     = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.90, roughness: 0.1 });
    const matRadiator = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.60, roughness: 0.4 });
    const matPanel   = new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.30, roughness: 0.5 });
    const matBase    = new THREE.MeshStandardMaterial({ color: 0x0d0d0d, metalness: 0.80, roughness: 0.3 });
    const matExhaust = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.90, roughness: 0.15 });
    const matCooling = new THREE.MeshStandardMaterial({ color: 0x445566, metalness: 0.70, roughness: 0.3 });
    const matLogo    = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.05, roughness: 0.8 });
    const matAccent  = new THREE.MeshStandardMaterial({
      color: 0xf7d92e, metalness: 0.1, roughness: 0.55,
      emissive: new THREE.Color(0xf7d92e), emissiveIntensity: 0.25,
    });
    const matLED = new THREE.MeshStandardMaterial({
      color: 0x00ff66, emissive: new THREE.Color(0x00ff66), emissiveIntensity: 1.2,
      roughness: 1, metalness: 0,
    });
    const matScreen = new THREE.MeshStandardMaterial({
      color: 0x004466, emissive: new THREE.Color(0x001f33), emissiveIntensity: 0.6,
      roughness: 0.8, metalness: 0.2,
    });
    const matHinge  = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.9, roughness: 0.2 });
    const matHandle = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.7, roughness: 0.4 });

    /* ══════════════════════════════════════════════════════════════════
       ENCLOSURE — BLUE CANOPIED SHELL
    ══════════════════════════════════════════════════════════════════ */

    /* Top lid */
    const encTopGroup = new THREE.Group();
    const topMesh = new THREE.Mesh(new THREE.BoxGeometry(GW + 0.12, 0.09, GD + 0.12), matBlue);
    encTopGroup.add(topMesh);
    const topStripe = new THREE.Mesh(new THREE.BoxGeometry(GW + 0.12, 0.026, GD + 0.12), matAccent);
    topStripe.position.y = -0.058;
    encTopGroup.add(topStripe);
    encTopGroup.position.set(0, GH / 2 - 0.045, 0);
    scene.add(encTopGroup);

    /* Back panel */
    const encBack = new THREE.Mesh(new THREE.BoxGeometry(GW, GH, 0.07), matBlueDark);
    encBack.position.set(0, 0, -GD / 2);
    scene.add(encBack);

    /* Left side panel */
    const encLeft = new THREE.Mesh(new THREE.BoxGeometry(0.07, GH, GD), matBlue);
    encLeft.position.set(-GW / 2, 0, 0);
    scene.add(encLeft);

    /* Right side panel with ventilation louvers */
    const encRightGroup = new THREE.Group();
    encRightGroup.add(new THREE.Mesh(new THREE.BoxGeometry(0.07, GH, GD), matBlue));
    for (let i = 0; i < 9; i++) {
      const louver = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.05, GD * 0.72), matBlueDark);
      louver.position.set(0.04, -0.62 + i * 0.16, 0);
      encRightGroup.add(louver);
    }
    encRightGroup.position.set(GW / 2, 0, 0);
    scene.add(encRightGroup);

    /* Front LEFT door — hinged on left edge (x = -GW/2, z = GD/2) */
    const frontDoorLGroup = new THREE.Group();
    frontDoorLGroup.position.set(-GW / 2, 0, GD / 2);
    // Door body
    const doorLMesh = new THREE.Mesh(new THREE.BoxGeometry(GW / 2, GH, 0.07), matBlue);
    doorLMesh.position.set(GW / 4, 0, 0.035);
    frontDoorLGroup.add(doorLMesh);
    // Small window
    const winMesh = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.24, 0.03), matBlack);
    winMesh.position.set(GW / 4 + 0.22, 0.38, 0.08);
    frontDoorLGroup.add(winMesh);
    // Hinges
    for (const hy of [-0.58, 0.0, 0.58]) {
      const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.11, 8), matHinge);
      hinge.rotation.z = Math.PI / 2;
      hinge.position.set(0.03, hy, 0.045);
      frontDoorLGroup.add(hinge);
    }
    // Handle
    const handleL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.22, 0.055), matHandle);
    handleL.position.set(GW / 2 - 0.10, 0, 0.10);
    frontDoorLGroup.add(handleL);
    scene.add(frontDoorLGroup);

    /* Front RIGHT door — hinged on right edge (x = GW/2, z = GD/2) */
    const frontDoorRGroup = new THREE.Group();
    frontDoorRGroup.position.set(GW / 2, 0, GD / 2);
    // Door body
    const doorRMesh = new THREE.Mesh(new THREE.BoxGeometry(GW / 2, GH, 0.07), matBlue);
    doorRMesh.position.set(-GW / 4, 0, 0.035);
    frontDoorRGroup.add(doorRMesh);
    // Logo plate
    const logoPlate = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.26, 0.025), matLogo);
    logoPlate.position.set(-GW / 4, 0.22, 0.08);
    frontDoorRGroup.add(logoPlate);
    // Accent stripe at door bottom
    const doorStripeR = new THREE.Mesh(new THREE.BoxGeometry(GW / 2, 0.07, 0.07), matAccent);
    doorStripeR.position.set(-GW / 4, -GH / 2 + 0.035, 0.035);
    frontDoorRGroup.add(doorStripeR);
    // Hinges
    for (const hy of [-0.58, 0.0, 0.58]) {
      const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.11, 8), matHinge);
      hinge.rotation.z = Math.PI / 2;
      hinge.position.set(-0.03, hy, 0.045);
      frontDoorRGroup.add(hinge);
    }
    // Handle
    const handleR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.22, 0.055), matHandle);
    handleR.position.set(-GW / 2 + 0.10, 0, 0.10);
    frontDoorRGroup.add(handleR);
    // Center latch
    const latch = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.13, 0.06), matHandle);
    latch.position.set(-0.03, 0, 0.085);
    frontDoorRGroup.add(latch);
    scene.add(frontDoorRGroup);

    /* Chassis / base (permanent, does not move) */
    const chassis = new THREE.Mesh(
      new THREE.BoxGeometry(GW + 0.18, 0.13, GD + 0.12),
      matBase
    );
    chassis.position.set(0, -GH / 2 - 0.065, 0);
    chassis.castShadow = true;
    scene.add(chassis);
    // Accent stripe at top of chassis
    const chassisStripe = new THREE.Mesh(new THREE.BoxGeometry(GW + 0.18, 0.04, GD + 0.12), matAccent);
    chassisStripe.position.set(0, -GH / 2 + 0.02, 0);
    scene.add(chassisStripe);
    // Feet
    const feetCoords: [number, number][] = [[-1.3, -0.6], [1.3, -0.6], [-1.3, 0.6], [1.3, 0.6]];
    for (const [cx, cz] of feetCoords) {
      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, 0.16), matBlack);
      foot.position.set(cx, -GH / 2 - 0.11, cz);
      scene.add(foot);
    }

    /* ══════════════════════════════════════════════════════════════════
       INTERNAL COMPONENTS
    ══════════════════════════════════════════════════════════════════ */
    type PartEntry = { obj: THREE.Object3D } & PartDef;
    const parts: PartEntry[] = [];

    const addPart = (obj: THREE.Object3D, def: PartDef) => {
      obj.position.set(...def.restPos);
      obj.visible = false; // hidden inside closed enclosure
      scene.add(obj);
      parts.push({ obj, ...def });
    };

    /* 0 — Motor Diesel */
    const motorGrp = new THREE.Group();
    motorGrp.add(new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.74, 0.86), matMotor));
    for (let i = 0; i < 4; i++) {
      const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.30, 10), matMotor);
      cyl.position.set(-0.3 + i * 0.2, 0.52, 0);
      motorGrp.add(cyl);
    }
    const airFilter = new THREE.Mesh(
      new THREE.CylinderGeometry(0.10, 0.10, 0.28, 10),
      new THREE.MeshStandardMaterial({ color: 0x333344, metalness: 0.5, roughness: 0.5 })
    );
    airFilter.position.set(0.1, 0.60, 0.12);
    motorGrp.add(airFilter);
    // Pulley belt on right side
    const beltRing = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.02, 6, 20), new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.3, roughness: 0.8 }));
    beltRing.rotation.y = Math.PI / 2;
    beltRing.position.set(0.46, -0.1, 0);
    motorGrp.add(beltRing);
    addPart(motorGrp, PART_DEFS[0]);

    /* 1 — Alternador */
    const altGrp = new THREE.Group();
    const altBody = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 1.05, 32), matAlt);
    altBody.rotation.z = Math.PI / 2;
    altGrp.add(altBody);
    for (let i = 0; i < 14; i++) {
      const ang = (i / 14) * Math.PI * 2;
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.38, 1.0), matAlt);
      fin.position.set(Math.cos(ang) * 0.36, Math.sin(ang) * 0.36, 0);
      fin.rotation.z = ang;
      altGrp.add(fin);
    }
    const endCap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.20, 0.20, 0.10, 16),
      new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.8, roughness: 0.2 })
    );
    endCap.rotation.z = Math.PI / 2;
    endCap.position.set(-0.58, 0, 0);
    altGrp.add(endCap);
    addPart(altGrp, PART_DEFS[1]);

    /* 2 — Tanque de Combustível */
    const tankGrp = new THREE.Group();
    tankGrp.add(new THREE.Mesh(new THREE.BoxGeometry(2.45, 0.28, 1.08), matBlueDark));
    const fuelCap = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.07, 8), matHandle);
    fuelCap.position.set(0.8, 0.175, 0.2);
    tankGrp.add(fuelCap);
    addPart(tankGrp, PART_DEFS[2]);

    /* 3 — Radiador */
    const radGrp = new THREE.Group();
    radGrp.add(new THREE.Mesh(new THREE.BoxGeometry(2.55, 1.38, 0.10), matRadiator));
    const barMat = new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.7, roughness: 0.3 });
    for (let r = 0; r < 10; r++) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(2.44, 0.025, 0.04), barMat);
      bar.position.set(0, -0.62 + r * 0.138, 0.065);
      radGrp.add(bar);
    }
    for (let c = 0; c < 16; c++) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.025, 1.3, 0.04), barMat);
      bar.position.set(-1.19 + c * 0.158, 0, 0.065);
      radGrp.add(bar);
    }
    addPart(radGrp, PART_DEFS[3]);

    /* 4 — Sistema de Arrefecimento */
    const coolGrp = new THREE.Group();
    coolGrp.add(new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.44, 14), matCooling));
    const coolCap = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.06, 14), matHandle);
    coolCap.position.y = 0.25;
    coolGrp.add(coolCap);
    const coolHose = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.35, 8), new THREE.MeshStandardMaterial({ color: 0x221100, metalness: 0.2, roughness: 0.9 }));
    coolHose.rotation.x = Math.PI / 4;
    coolHose.position.set(0.1, -0.32, -0.1);
    coolGrp.add(coolHose);
    addPart(coolGrp, PART_DEFS[4]);

    /* 5 — Painel de Controle */
    const panelGrp = new THREE.Group();
    panelGrp.add(new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.76, 0.10), matPanel));
    const pAccent = new THREE.Mesh(new THREE.BoxGeometry(0.57, 0.03, 0.10), matAccent);
    pAccent.position.y = 0.385;
    panelGrp.add(pAccent);
    const screenMesh = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.22, 0.02), matScreen);
    screenMesh.position.set(0, 0.15, 0.06);
    panelGrp.add(screenMesh);
    for (let i = 0; i < 4; i++) {
      const led = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 6), matLED);
      led.position.set(-0.12 + i * 0.08, -0.10, 0.06);
      panelGrp.add(led);
    }
    const btnColors = [0xff2200, 0x00cc44, 0xffcc00] as const;
    btnColors.forEach((c, i) => {
      const btn = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 0.04, 10),
        new THREE.MeshStandardMaterial({ color: c, metalness: 0.3, roughness: 0.5 })
      );
      btn.rotation.x = Math.PI / 2;
      btn.position.set(-0.08 + i * 0.08, -0.27, 0.065);
      panelGrp.add(btn);
    });
    addPart(panelGrp, PART_DEFS[5]);

    /* 6 — Base em Aço Carbono */
    const baseGrp = new THREE.Group();
    baseGrp.add(new THREE.Mesh(new THREE.BoxGeometry(GW, 0.12, GD), matBase));
    const railMat = new THREE.MeshStandardMaterial({ color: 0x0d0d0d, metalness: 0.85, roughness: 0.2 });
    for (const rx of [-1.1, 1.1]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.06, GD + 0.1), railMat);
      rail.position.set(rx, 0.09, 0);
      baseGrp.add(rail);
    }
    addPart(baseGrp, PART_DEFS[6]);

    /* 7 — Escapamento */
    const exhaustGrp = new THREE.Group();
    exhaustGrp.add(new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.55, 12), matExhaust));
    const exhaustCap = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.07, 0.08, 12), matExhaust);
    exhaustCap.position.y = 0.315;
    exhaustGrp.add(exhaustCap);
    const elbowMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.9, roughness: 0.15 });
    const elbow = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.28, 10), elbowMat);
    elbow.rotation.x = Math.PI / 2;
    elbow.position.set(0.0, -0.35, 0.14);
    exhaustGrp.add(elbow);
    addPart(exhaustGrp, PART_DEFS[7]);

    /* ── Resize handler ── */
    const handleResize = () => {
      const { w, h } = getSize();
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    // ResizeObserver: fires as soon as the container gets real layout dimensions,
    // even on first mount under Suspense/lazy where window "resize" never fires.
    const resizeObserver = new ResizeObserver(() => handleResize());
    if (container) resizeObserver.observe(container);

    window.addEventListener("resize", handleResize, { passive: true });

    // rAF-deferred call: guarantees layout is painted before we read dimensions
    const rafInit = requestAnimationFrame(() => handleResize());

    /* ── Animation loop ── */
    let time = 3.5;  // start at a 3/4 angle
    let rafId: number;

    const getScrollProgress = () => {
      const section = sectionRef.current;
      if (!section) return 0;
      const rect   = section.getBoundingClientRect();
      const totalH = section.offsetHeight - window.innerHeight;
      return Math.max(0, Math.min(1, -rect.top / totalH));
    };

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      time += 0.007;

      const progress = getScrollProgress();

      /* Enclosure open: 0.10 → 0.50, hold, close at 0.82 → 1.0 */
      let encOpen = 0;
      if (progress < 0.10) {
        encOpen = 0;
      } else if (progress < 0.50) {
        encOpen = easeInOutCubic((progress - 0.10) / 0.40);
      } else if (progress < 0.82) {
        encOpen = 1;
      } else {
        encOpen = 1 - easeInOutCubic((progress - 0.82) / 0.18);
      }

      /* Component explode: 0.40 → 0.72, hold, reassemble with enclosure */
      let compExplode = 0;
      if (progress < 0.40) {
        compExplode = 0;
      } else if (progress < 0.72) {
        compExplode = easeInOutCubic((progress - 0.40) / 0.32);
      } else if (progress < 0.82) {
        compExplode = 1;
      } else {
        compExplode = 1 - easeInOutCubic((progress - 0.82) / 0.18);
      }

      /* ── Animate enclosure panels ── */
      frontDoorLGroup.rotation.y = -(Math.PI / 2) * encOpen;
      frontDoorRGroup.rotation.y =  (Math.PI / 2) * encOpen;
      encTopGroup.position.y     = (GH / 2 - 0.045) + encOpen * 3.0;
      encBack.position.z         = -GD / 2 - encOpen * 2.6;
      encLeft.position.x         = -GW / 2 - encOpen * 2.6;
      encRightGroup.position.x   =  GW / 2 + encOpen * 2.6;

      /* ── Show / hide internal components ── */
      const showParts = encOpen > 0.28;
      for (const part of parts) {
        part.obj.visible = showParts;
      }

      /* ── Animate internal components ── */
      for (const part of parts) {
        part.obj.position.x = part.restPos[0] + (part.explodedPos[0] - part.restPos[0]) * compExplode;
        part.obj.position.y = part.restPos[1] + (part.explodedPos[1] - part.restPos[1]) * compExplode;
        part.obj.position.z = part.restPos[2] + (part.explodedPos[2] - part.restPos[2]) * compExplode;
      }

      /* ── Camera orbit, pull back when exploded ── */
      const camR = 8.0 - compExplode * 1.8;
      camera.position.x = camR * Math.sin(time * 0.15);
      camera.position.z = camR * Math.cos(time * 0.15);
      camera.position.y = 3.0 + compExplode * 1.2;
      camera.lookAt(0, 0.2 + compExplode * 0.6, 0);

      /* ── HTML labels ── */
      const labelOpacity = Math.max(0, Math.min(1, (compExplode - 0.55) / 0.3));
      for (let i = 0; i < parts.length; i++) {
        const el = labelEls.current[i];
        if (!el) continue;
        const wp = new THREE.Vector3(
          parts[i].obj.position.x,
          parts[i].obj.position.y,
          parts[i].obj.position.z
        );
        wp.project(camera);
        if (wp.z > 1) { el.style.opacity = "0"; continue; }
        const cw = canvas.clientWidth, ch = canvas.clientHeight;
        const sx = ((wp.x + 1) / 2) * cw;
        const sy = ((-wp.y + 1) / 2) * ch;
        el.style.left    = `${Math.max(80, Math.min(cw - 80, sx))}px`;
        el.style.top     = `${Math.max(50, Math.min(ch - 50, sy))}px`;
        el.style.opacity = String(labelOpacity);
      }

      /* ── Pulse front accent light ── */
      frontLight.intensity = 2.0 + Math.sin(time * 1.3) * 0.35;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(rafInit);
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [webGLOk]);

  /* ── Fallback (WebGL not available) ── */
  if (webGLOk === false) {
    return (
      <section className="py-28 bg-[#000d1a] relative overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(0,160,220,0.08) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Text side */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                <div className="h-px w-12 bg-accent" aria-hidden="true" />
                <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">Tecnologia e Inovação</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Engenharia de <span className="text-accent">Precisão</span>
              </h2>
              <p className="text-white/60 mb-10 max-w-xl mx-auto lg:mx-0 text-lg leading-relaxed">
                30 anos de inovação em energia — equipamentos de alta performance para cada necessidade.
              </p>
              <Link
                to="/produtos"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-bold px-8 py-3 rounded-full hover:bg-accent/90 transition-colors shadow-accent"
              >
                Conheça Nossa Frota <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            {/* Image side */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <img
                src={geradorFallback}
                alt="Gerador de grande porte PROJEMAC"
                className="w-full max-w-lg object-contain drop-shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={sectionRef} style={{ height: "280vh" }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#000d1a]">

        {/* Header overlay */}
        <div className="absolute top-0 left-0 right-0 z-20 text-center pt-10 px-4 pointer-events-none">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px w-12 bg-accent" aria-hidden="true" />
            <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">Tecnologia e Inovação</span>
            <div className="h-px w-12 bg-accent" aria-hidden="true" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
            Engenharia de <span className="text-accent">Precisão</span>
          </h2>
          <p className="text-white/55 text-sm md:text-base max-w-xl mx-auto">
            30 anos de inovação — tecnologia que não para
          </p>
        </div>

        {/* Three.js canvas */}
        {webGLOk && (
          <canvas ref={canvasRef} className="w-full h-full block" aria-hidden="true" />
        )}

        {/* Part labels */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {PART_DEFS.map((def, i) => (
            <div
              key={i}
              ref={(el) => { labelEls.current[i] = el; }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ opacity: 0, left: "50%", top: "50%" }}
            >
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-accent shadow-accent mb-1" />
                <div className="w-px h-4 bg-accent/50 mb-1" />
                <div className="bg-primary/90 backdrop-blur-sm border border-accent/30 rounded-lg px-3 py-1.5 whitespace-nowrap">
                  <span className="text-xs text-white font-semibold">{def.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="absolute bottom-0 left-0 right-0 z-20 text-center pb-10 pointer-events-none">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-5">
            Role para explodir o gerador
          </p>
          <div className="pointer-events-auto inline-flex">
            <Link
              to="/produtos"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-bold px-8 py-3 rounded-full hover:bg-accent/90 transition-colors shadow-accent"
            >
              Conheça Nossa Frota
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-3"
          aria-hidden="true"
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/25 to-transparent" />
          <span
            className="text-white/30 text-[9px] font-medium tracking-[0.25em] uppercase"
            style={{ writingMode: "vertical-rl" }}
          >
            Scroll para explodir
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/25 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default ThreeGeneratorSection;
