/**
 * AICore3D
 * -----------------------------------------------------------------------
 * 3D AI Neural Core (Three.js)
 *  - Pulsing icosahedron core with displaced wireframe
 *  - 36 neural nodes orbiting on a sphere with per-node pulse
 *  - Dynamic connection lines between nearby nodes (neural-net feel)
 *  - 3 orbital rings on different axes
 *  - Inner swirling particle cloud + outer star field
 *  - Mouse parallax + scroll-driven spin
 *
 * Wraps the original init3DAICore() function. THREE is loaded as a global
 * via a classic <script> tag before this module runs.
 */
export class AICore3D {
    constructor() {
        this.ACCENT = 0xc5a059;
        this.ACCENT_LIGHT = 0xe8c98a;
        this.ACCENT_DARK = 0x8c6f3d;

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.core = null;
        this.coreInner = null;
        this.coreWire = null;
        this.brandSprite = null;
        this.nodeGroup = null;
        this.nodes = [];
        this.connectionLines = null;
        this.ringsGroup = null;
        this.rings = [];
        this.innerParticles = null;
        this.outerParticles = null;
        this.innerSpeeds = null;

        this.mouseX = 0;
        this.mouseY = 0;
        this.lerpMouseX = 0;
        this.lerpMouseY = 0;
        this.scrollSpeed = 0;
        this.time = 0;

        this.container = null;
        this.tmpVec = null;
    }

    init() {
        this.container = document.getElementById('ai-core-canvas-container');
        if (!this.container || typeof THREE === 'undefined') return;

        this.tmpVec = new THREE.Vector3();
        this.#setup();

        window.addEventListener('mousemove', (e) => {
            this.mouseX = (e.clientX - window.innerWidth / 2) / 100;
            this.mouseY = (e.clientY - window.innerHeight / 2) / 100;
        });

        window.addEventListener('scroll', () => {
            this.scrollSpeed = window.scrollY * 0.0005;
        });

        window.addEventListener('resize', () => {
            if (!this.camera || !this.renderer) return;
            this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        });
    }

    #setup() {
        const container = this.container;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
        this.camera.position.z = 6.2;

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(this.renderer.domElement);

        // ---------- CORE ----------
        this.core = new THREE.Group();

        const innerGeom = new THREE.IcosahedronGeometry(1.25, 5);
        const innerMat = new THREE.MeshBasicMaterial({
            color: this.ACCENT,
            transparent: true,
            opacity: 0.14,
        });
        this.coreInner = new THREE.Mesh(innerGeom, innerMat);
        this.core.add(this.coreInner);

        const wireGeom = new THREE.IcosahedronGeometry(1.5, 4);
        const wireMat = new THREE.MeshBasicMaterial({
            color: this.ACCENT,
            wireframe: true,
            transparent: true,
            opacity: 0.32,
        });
        this.coreWire = new THREE.Mesh(wireGeom, wireMat);
        this.core.add(this.coreWire);

        // Brand "S" sprite at center
        const canvas = document.createElement('canvas');
        canvas.width = 512; canvas.height = 512;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#1a1714';
        ctx.font = 'bold 380px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('S', 256, 256);

        this.brandSprite = new THREE.Sprite(new THREE.SpriteMaterial({
            map: new THREE.CanvasTexture(canvas),
            transparent: true,
            opacity: 0.92,
            depthTest: false,
        }));
        this.brandSprite.scale.set(1.3, 1.3, 1);
        this.brandSprite.renderOrder = 20;
        this.core.add(this.brandSprite);

        this.scene.add(this.core);

        // ---------- NEURAL NODES ----------
        this.nodeGroup = new THREE.Group();
        const nodeCount = 36;
        const nodeGeomShared = new THREE.SphereGeometry(0.05, 16, 16);

        for (let i = 0; i < nodeCount; i++) {
            // Fibonacci-sphere distribution for even spread
            const phi = Math.acos(1 - 2 * (i + 0.5) / nodeCount);
            const theta = Math.PI * (1 + Math.sqrt(5)) * i;
            const radius = 2.55 + (Math.random() - 0.5) * 0.35;

            const node = new THREE.Mesh(
                nodeGeomShared,
                new THREE.MeshBasicMaterial({
                    color: this.ACCENT_LIGHT,
                    transparent: true,
                    opacity: 0.95,
                })
            );
            node.userData = {
                phi,
                theta,
                radius,
                speed: 0.0006 + Math.random() * 0.0009,
                pulseOffset: Math.random() * Math.PI * 2,
            };
            node.position.set(
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.sin(phi) * Math.sin(theta),
                radius * Math.cos(phi)
            );
            this.nodeGroup.add(node);
            this.nodes.push(node);
        }
        this.scene.add(this.nodeGroup);

        // ---------- DYNAMIC NEURAL CONNECTIONS ----------
        const maxLines = 100;
        const linePositions = new Float32Array(maxLines * 2 * 3);
        const lineGeom = new THREE.BufferGeometry();
        lineGeom.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        lineGeom.setDrawRange(0, 0);
        this.connectionLines = new THREE.LineSegments(
            lineGeom,
            new THREE.LineBasicMaterial({
                color: this.ACCENT,
                transparent: true,
                opacity: 0.4,
            })
        );
        this.scene.add(this.connectionLines);

        // ---------- ORBITAL RINGS ----------
        this.ringsGroup = new THREE.Group();
        const ringConfigs = [
            { radius: 2.85, axis: new THREE.Vector3(1, 0.2, 0).normalize(), spin: 0.0025 },
            { radius: 3.15, axis: new THREE.Vector3(0.3, 1, 0.1).normalize(), spin: -0.0018 },
            { radius: 3.45, axis: new THREE.Vector3(0.6, 0.6, 0.5).normalize(), spin: 0.0014 },
        ];
        const up = new THREE.Vector3(0, 0, 1);
        ringConfigs.forEach((cfg) => {
            const ringGeom = new THREE.TorusGeometry(cfg.radius, 0.005, 12, 220);
            const ringMat = new THREE.MeshBasicMaterial({
                color: this.ACCENT,
                transparent: true,
                opacity: 0.22,
            });
            const ring = new THREE.Mesh(ringGeom, ringMat);
            ring.quaternion.setFromUnitVectors(up, cfg.axis);
            ring.userData = { spin: cfg.spin };
            this.rings.push(ring);
            this.ringsGroup.add(ring);
        });
        this.scene.add(this.ringsGroup);

        // ---------- INNER PARTICLE CLOUD ----------
        const innerCount = 380;
        const innerPos = new Float32Array(innerCount * 3);
        this.innerSpeeds = new Float32Array(innerCount);
        for (let i = 0; i < innerCount; i++) {
            const r = 1.7 + Math.random() * 1.6;
            const t = Math.random() * Math.PI * 2;
            const p = Math.acos(1 - 2 * Math.random());
            innerPos[i * 3] = r * Math.sin(p) * Math.cos(t);
            innerPos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
            innerPos[i * 3 + 2] = r * Math.cos(p);
            this.innerSpeeds[i] = 0.0015 + Math.random() * 0.0035;
        }
        const innerGeomP = new THREE.BufferGeometry();
        innerGeomP.setAttribute('position', new THREE.BufferAttribute(innerPos, 3));
        this.innerParticles = new THREE.Points(innerGeomP, new THREE.PointsMaterial({
            size: 0.025,
            color: this.ACCENT_LIGHT,
            transparent: true,
            opacity: 0.6,
            sizeAttenuation: true,
        }));
        this.scene.add(this.innerParticles);

        // ---------- OUTER STAR FIELD ----------
        const outerCount = 700;
        const outerPos = new Float32Array(outerCount * 3);
        for (let i = 0; i < outerCount * 3; i++) outerPos[i] = (Math.random() - 0.5) * 22;
        const outerGeom = new THREE.BufferGeometry();
        outerGeom.setAttribute('position', new THREE.BufferAttribute(outerPos, 3));
        this.outerParticles = new THREE.Points(outerGeom, new THREE.PointsMaterial({
            size: 0.018,
            color: this.ACCENT_DARK,
            transparent: true,
            opacity: 0.32,
        }));
        this.scene.add(this.outerParticles);

        this.#animate();
    }

    #updateConnections() {
        const positions = this.connectionLines.geometry.attributes.position.array;
        const maxPairs = positions.length / 6;
        const maxDistSq = 1.0 * 1.0;
        let pair = 0;

        for (let i = 0; i < this.nodes.length && pair < maxPairs; i++) {
            const a = this.nodes[i].position;
            for (let j = i + 1; j < this.nodes.length && pair < maxPairs; j++) {
                const b = this.nodes[j].position;
                const dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z;
                if (dx * dx + dy * dy + dz * dz < maxDistSq) {
                    const o = pair * 6;
                    positions[o] = a.x;     positions[o + 1] = a.y; positions[o + 2] = a.z;
                    positions[o + 3] = b.x; positions[o + 4] = b.y; positions[o + 5] = b.z;
                    pair++;
                }
            }
        }
        this.connectionLines.geometry.setDrawRange(0, pair * 2);
        this.connectionLines.geometry.attributes.position.needsUpdate = true;
    }

    #animateCore() {
        // Breathing scale
        const breath = 1 + Math.sin(this.time * 1.5) * 0.04;
        this.core.scale.setScalar(breath);
        this.core.rotation.y += 0.0035 + this.scrollSpeed * 0.05;
        this.core.rotation.x += 0.0012;

        // Wireframe vertex displacement (organic ripple)
        const wp = this.coreWire.geometry.attributes.position;
        const baseLen = 1.5;
        for (let i = 0; i < wp.count; i++) {
            this.tmpVec.fromBufferAttribute(wp, i);
            const noise =
                Math.sin(this.tmpVec.x * 1.4 + this.time * 1.2) *
                Math.cos(this.tmpVec.y * 1.2 + this.time * 0.9) *
                Math.sin(this.tmpVec.z * 1.6 + this.time) * 0.10;
            this.tmpVec.normalize().multiplyScalar(baseLen + noise);
            wp.setXYZ(i, this.tmpVec.x, this.tmpVec.y, this.tmpVec.z);
        }
        wp.needsUpdate = true;
    }

    #animateNodes() {
        this.nodeGroup.rotation.y += 0.0015 + this.scrollSpeed * 0.025;
        this.nodeGroup.rotation.x = this.lerpMouseY * 0.3;
        this.nodeGroup.rotation.z = this.lerpMouseX * 0.15;

        for (let i = 0; i < this.nodes.length; i++) {
            const n = this.nodes[i];
            const ud = n.userData;
            ud.theta += ud.speed;
            const r = ud.radius + Math.sin(this.time * 1.5 + ud.pulseOffset) * 0.07;
            const sp = Math.sin(ud.phi);
            n.position.set(
                r * sp * Math.cos(ud.theta),
                r * sp * Math.sin(ud.theta),
                r * Math.cos(ud.phi)
            );
            const pulse = 0.65 + 0.35 * Math.sin(this.time * 2 + ud.pulseOffset);
            n.material.opacity = pulse;
            n.scale.setScalar(0.85 + 0.4 * pulse);
        }
    }

    #animateInnerParticles() {
        const ip = this.innerParticles.geometry.attributes.position;
        for (let i = 0; i < ip.count; i++) {
            const x = ip.getX(i);
            const z = ip.getZ(i);
            const a = this.innerSpeeds[i];
            const cos = Math.cos(a);
            const sin = Math.sin(a);
            ip.setX(i, x * cos - z * sin);
            ip.setZ(i, x * sin + z * cos);
        }
        ip.needsUpdate = true;
        this.innerParticles.rotation.x = this.lerpMouseY * 0.1;
    }

    #animate() {
        requestAnimationFrame(() => this.#animate());
        this.time += 0.008;

        this.lerpMouseX += (this.mouseX - this.lerpMouseX) * 0.06;
        this.lerpMouseY += (this.mouseY - this.lerpMouseY) * 0.06;

        this.#animateCore();
        this.#animateNodes();
        this.#updateConnections();
        this.#animateInnerParticles();

        // Rings spin on their oriented axis (local Z)
        for (let i = 0; i < this.rings.length; i++) {
            this.rings[i].rotation.z += this.rings[i].userData.spin;
        }
        this.ringsGroup.rotation.y += 0.0006;

        // Outer field slow drift
        this.outerParticles.rotation.y -= 0.00025;
        this.outerParticles.rotation.x += 0.00012;

        // Camera parallax follows mouse
        this.camera.position.x += (this.lerpMouseX * 0.6 - this.camera.position.x) * 0.04;
        this.camera.position.y += (-this.lerpMouseY * 0.6 - this.camera.position.y) * 0.04;
        this.camera.lookAt(0, 0, 0);

        this.scrollSpeed *= 0.94;
        this.renderer.render(this.scene, this.camera);
    }
}
