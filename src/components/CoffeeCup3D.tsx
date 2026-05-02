"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Decal } from "@react-three/drei";
import * as THREE from "three";
import { useScroll, useTransform } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   useBrandTexture — Generates a premium "CLICK CAFE" canvas texture

   Uses Playfair Display (already loaded by Next.js layout) to
   render copper text with a fired-into-ceramic effect:
     • Multi-layer shadow for intaglio depth
     • Subtle noise grain for kiln-fired texture
     • High-DPR canvas for pin-sharp rendering at any distance
═══════════════════════════════════════════════════════════════ */
function useBrandTexture() {
    const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

    useEffect(() => {
        const generate = () => {
            const canvas = document.createElement("canvas");
            const dpr = Math.min(window.devicePixelRatio || 1, 2);

            // High-res canvas — 2048 wide for razor-sharp text on curved surfaces
            const W = 2048;
            const H = 512;
            canvas.width = W * dpr;
            canvas.height = H * dpr;

            const ctx = canvas.getContext("2d")!;
            ctx.scale(dpr, dpr);

            // ── Fully transparent background (critical for decal projection)
            ctx.clearRect(0, 0, W, H);

            // ── Subtle ceramic noise grain across the entire canvas
            //    This gives the decal a kiln-fired, slightly imperfect quality
            const imageData = ctx.getImageData(0, 0, W * dpr, H * dpr);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                if (Math.random() < 0.03) {
                    const grain = Math.floor(Math.random() * 15);
                    data[i] = grain;       // R
                    data[i + 1] = grain;   // G
                    data[i + 2] = grain;   // B
                    data[i + 3] = 8;       // Very faint alpha
                }
            }
            ctx.putImageData(imageData, 0, 0);

            // ── Typography setup
            const fontStack = '"Playfair Display", Georgia, "Times New Roman", serif';
            const fontSize = 164;
            const letterSpacing = 18;
            const text = "THE BLUE RIBBON";
            const chars = text.split("");

            ctx.font = `700 ${fontSize}px ${fontStack}`;
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";

            // Measure total width including manual tracking
            let totalWidth = 0;
            chars.forEach((char, i) => {
                totalWidth += ctx.measureText(char).width;
                if (i < chars.length - 1) totalWidth += letterSpacing;
            });

            const startX = (W - totalWidth) / 2;
            const centerY = H / 2;

            // ── Layer 1: Deep shadow — simulates the intaglio depression
            ctx.save();
            ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
            ctx.shadowBlur = 6;
            ctx.shadowOffsetX = 1.5;
            ctx.shadowOffsetY = 2;
            ctx.fillStyle = "rgba(60, 35, 20, 0.35)";
            let x = startX;
            chars.forEach((char) => {
                ctx.fillText(char, x, centerY + 1.5);
                x += ctx.measureText(char).width + letterSpacing;
            });
            ctx.restore();

            // ── Layer 2: Inner highlight — subtle top-light catch
            ctx.save();
            ctx.shadowColor = "rgba(255, 220, 180, 0.15)";
            ctx.shadowBlur = 2;
            ctx.shadowOffsetX = -0.5;
            ctx.shadowOffsetY = -0.5;
            ctx.fillStyle = "rgba(200, 160, 120, 0.2)";
            x = startX;
            chars.forEach((char) => {
                ctx.fillText(char, x, centerY - 0.5);
                x += ctx.measureText(char).width + letterSpacing;
            });
            ctx.restore();

            // ── Layer 3: Primary copper fill — the hero text
            //    Uses a vertical gradient from warm copper to darker
            //    bronze, mimicking uneven glaze pooling
            const gradient = ctx.createLinearGradient(0, centerY - fontSize / 2, 0, centerY + fontSize / 2);
            gradient.addColorStop(0, "#C4956F");    // Lighter copper (top, catches light)
            gradient.addColorStop(0.4, "#B38466");  // Core copper
            gradient.addColorStop(1, "#8A6248");    // Darker bronze (bottom, shadow)

            ctx.save();
            ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
            ctx.shadowBlur = 1;
            ctx.shadowOffsetX = 0.5;
            ctx.shadowOffsetY = 0.5;
            ctx.fillStyle = gradient;
            x = startX;
            chars.forEach((char) => {
                ctx.fillText(char, x, centerY);
                x += ctx.measureText(char).width + letterSpacing;
            });
            ctx.restore();

            const tex = new THREE.CanvasTexture(canvas);
            tex.anisotropy = 16;
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.minFilter = THREE.LinearMipmapLinearFilter;
            tex.magFilter = THREE.LinearFilter;
            tex.generateMipmaps = true;
            setTexture(tex);
        };

        // Wait for Playfair Display to load before rendering
        document.fonts.ready.then(generate);
    }, []);

    return texture;
}

/* ═══════════════════════════════════════════════════════════════
   createCupProfile — Generates a lathe profile path for the mug

   Creates a refined cross-section that is revolved around the
   Y-axis to produce a realistic cup shell:
     • Exterior taper (wider at top, narrower at base)
     • Rounded bottom transition
     • Interior cavity walls
     • Rim lip with subtle thickness
═══════════════════════════════════════════════════════════════ */
function createCupProfile(): THREE.Vector2[] {
    const points: THREE.Vector2[] = [];

    // ── Exterior profile (bottom to top, right side)
    // Flat base
    points.push(new THREE.Vector2(0, -1.25));         // Center bottom
    points.push(new THREE.Vector2(0.75, -1.25));      // Base edge
    // Rounded bottom-to-wall transition
    points.push(new THREE.Vector2(0.82, -1.15));
    points.push(new THREE.Vector2(0.87, -1.0));
    // Tapered wall rising outward
    points.push(new THREE.Vector2(0.92, -0.6));
    points.push(new THREE.Vector2(0.98, -0.2));
    points.push(new THREE.Vector2(1.05, 0.2));
    points.push(new THREE.Vector2(1.12, 0.6));
    points.push(new THREE.Vector2(1.18, 0.9));
    points.push(new THREE.Vector2(1.2, 1.05));
    // Lip / rim (slightly flared)
    points.push(new THREE.Vector2(1.22, 1.15));
    points.push(new THREE.Vector2(1.24, 1.25));       // Top outer edge
    // Rim top surface
    points.push(new THREE.Vector2(1.18, 1.25));        // Top inner edge
    // ── Interior profile (top to bottom)
    points.push(new THREE.Vector2(1.14, 1.15));
    points.push(new THREE.Vector2(1.1, 0.9));
    points.push(new THREE.Vector2(1.04, 0.6));
    points.push(new THREE.Vector2(0.97, 0.2));
    points.push(new THREE.Vector2(0.91, -0.2));
    points.push(new THREE.Vector2(0.85, -0.6));
    points.push(new THREE.Vector2(0.8, -0.9));
    // Interior bottom curve
    points.push(new THREE.Vector2(0.72, -1.05));
    points.push(new THREE.Vector2(0.5, -1.1));
    points.push(new THREE.Vector2(0, -1.1));           // Center interior bottom

    return points;
}

/* ═══════════════════════════════════════════════════════════════
   createLiquidGeometry — Creates a concave liquid surface

   Generates a circle geometry with a subtle meniscus curve:
   the center is slightly depressed, edges ride up the cup
   wall — mimicking real liquid surface tension.
═══════════════════════════════════════════════════════════════ */
function createLiquidGeometry(radius: number, segments: number): THREE.BufferGeometry {
    const geo = new THREE.CircleGeometry(radius, segments);
    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const dist = Math.sqrt(x * x + y * y) / radius; // 0 at center, 1 at edge

        // Meniscus curve: edges rise slightly, center dips
        // Cubic easing for natural-looking surface tension
        const meniscus = dist * dist * dist * 0.06;
        pos.setZ(i, meniscus);
    }

    pos.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
}

/* ═══════════════════════════════════════════════════════════════
   CoffeeCup3D — The Premium Branded Ceramic Mug + Liquid Fill

   Geometry:
     • Lathe-revolved cup body with proper wall thickness & rim
     • Ergonomic torus handle at natural grip angle
     • CLICK CAFE copper decal via <Decal /> projection
     • Concave liquid coffee surface with meniscus & shimmer

   Animation:
     • Scroll-driven spatial transforms (Framer Motion)
     • Gentle bob oscillation
     • Liquid surface subtle vertex animation
═══════════════════════════════════════════════════════════════ */
export function CoffeeCup3D() {
    const groupRef = useRef<THREE.Group>(null);
    const cupMeshRef = useRef<THREE.Mesh>(null);
    const liquidRef = useRef<THREE.Mesh>(null);
    const { scrollYProgress } = useScroll();
    const brandTexture = useBrandTexture();

    // ─── Scroll-driven Spatial Translation (x, y, z) ───
    const xTransform = useTransform(scrollYProgress, [0, 1], [-4, 4]);
    const yTransform = useTransform(scrollYProgress, [0, 1], [3, -3]);
    const zTransform = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0, 1.5, 0.5, -1]);

    // ─── Scroll-driven True 3D Rotation ───
    const rotateYTransform = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);
    const rotateZTransform = useTransform(
        scrollYProgress,
        [0, 0.25, 0.5, 0.75, 1],
        [0, -0.2, 0.1, -0.15, 0.2]
    );
    const rotateXTransform = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.4, 0.15]);

    // ─── Per-Frame Updates ───
    useFrame(({ clock }) => {
        if (!groupRef.current) return;

        const t = clock.getElapsedTime();

        // Spatial translations with gentle bob
        groupRef.current.position.x = xTransform.get();
        const bob = Math.sin(t * 1.5) * 0.15;
        groupRef.current.position.y = yTransform.get() + bob;
        groupRef.current.position.z = zTransform.get();

        // Rotations
        groupRef.current.rotation.x = rotateXTransform.get();
        groupRef.current.rotation.y = rotateYTransform.get();
        groupRef.current.rotation.z = rotateZTransform.get();

        // ── Liquid surface shimmer — very subtle vertex oscillation
        if (liquidRef.current) {
            const geo = liquidRef.current.geometry;
            const pos = geo.attributes.position;
            for (let i = 1; i < pos.count; i++) {
                const x = pos.getX(i);
                const y = pos.getY(i);
                const dist = Math.sqrt(x * x + y * y);
                // Tiny ripple based on distance from center + time
                const ripple = Math.sin(dist * 4 + t * 2) * 0.005;
                const baseMeniscus = (dist / 1.0) ** 3 * 0.06;
                pos.setZ(i, baseMeniscus + ripple);
            }
            pos.needsUpdate = true;
        }
    });

    // ─── Geometries (memoized) ───

    /** Cup body — lathe geometry from hand-crafted profile */
    const cupGeometry = useMemo(() => {
        const profile = createCupProfile();
        const lathe = new THREE.LatheGeometry(profile, 64);
        lathe.computeVertexNormals();
        return lathe;
    }, []);

    /** Liquid surface — circle with meniscus deformation */
    const liquidGeometry = useMemo(() => {
        // Radius matches the interior wall at liquid height (~y=0.85)
        // Interior radius at that height ≈ 1.07
        return createLiquidGeometry(1.05, 64);
    }, []);

    // ─── Materials (memoized) ───

    /** Pristine white ceramic with high clearcoat — glossy porcelain glaze */
    const ceramicMaterial = useMemo(() => {
            const mat = new THREE.MeshPhysicalMaterial({
                color: "#faf8f5",           // Warm porcelain white (not stark)
                roughness: 0.08,
                metalness: 0.02,
                clearcoat: 1.0,
                clearcoatRoughness: 0.08,
                sheen: 0.15,
                sheenColor: new THREE.Color("#e8ddd0"),
                side: THREE.DoubleSide,     // Visible from inside too
            });
            // ═══ Stencil Buffer Write ═══
            // Write stencilRef=1 wherever the cup geometry renders.
            // GoldTextMask reads this to achieve pixel-perfect masking.
            mat.stencilWrite = true;
            mat.stencilRef = 1;
            mat.stencilFunc = THREE.AlwaysStencilFunc;
            mat.stencilZPass = THREE.ReplaceStencilOp;
            mat.stencilFail = THREE.KeepStencilOp;
            mat.stencilZFail = THREE.KeepStencilOp;
            return mat;
        },
        []
    );

    /** Photorealistic espresso liquid — MeshPhysicalMaterial
     *
     *  Transmission + IOR: Light refracts through the liquid body
     *  at water-like IOR (1.33), creating convincing depth.
     *
     *  Subsurface Scattering (Attenuation): Warm copper attenuation
     *  color (#4B2C1F) at 0.2 distance simulates that rich, warm
     *  glow when scene spotlights hit the edges of the liquid
     *  inside the ceramic — real coffee depth perception.
     *
     *  Clearcoat 0.1 + roughness 0.15 gives a slight, natural
     *  wet-surface shine without looking glassy. */
    const liquidMaterial = useMemo(
        () =>
            new THREE.MeshPhysicalMaterial({
                color: "#2C1A11",
                roughness: 0.15,
                metalness: 0.0,
                // ── Transmission & refraction
                transmission: 1.0,
                ior: 1.33,
                thickness: 0.8,
                // ── Subsurface scattering via attenuation
                attenuationColor: new THREE.Color("#4B2C1F"),
                attenuationDistance: 0.2,
                // ── Surface finish
                clearcoat: 0.1,
                clearcoatRoughness: 0.3,
                // ── Rendering
                transparent: true,
                side: THREE.DoubleSide,
            }),
        []
    );

    return (
        <group ref={groupRef} scale={1.2}>
            {/* ═══════════════════════════════════════════
                 THE MAIN CUP BODY — Lathe-Revolved Profile
                 Hand-crafted cross-section with:
                   • True wall thickness (~0.08 units)
                   • Rounded bottom transition
                   • Subtle rim lip
                   • Interior cavity visible from above
            ═══════════════════════════════════════════ */}
            <mesh
                ref={cupMeshRef}
                geometry={cupGeometry}
                position={[0, 0, 0]}
                castShadow
                receiveShadow
            >
                <primitive object={ceramicMaterial} attach="material" />

                {/* ─── CLICK CAFE Decal ───
                     Projected onto the curved lathe surface.
                     • Position: centered horizontally, slightly above
                       midline, on the BACK face (Z ≈ -1.1).
                     • Rotation: Math.PI on Y to face outward from
                       the rear surface of the cup.
                     • Scale: 2.4 wide × 0.6 tall for balanced proportions
                       on the wider lathe body.
                     • meshPhysicalMaterial with subtle clearcoat to match
                       the ceramic glaze — looks "fired in", not printed. */}
                {brandTexture && (
                    <Decal
                        position={[0, 0.2, -1.1]}
                        rotation={[0, Math.PI, 0]}
                        scale={[2.4, 0.6, 1]}
                    >
                        <meshPhysicalMaterial
                            map={brandTexture}
                            transparent
                            depthTest={false}
                            depthWrite={false}
                            polygonOffset
                            polygonOffsetFactor={-10}
                            roughness={0.22}
                            metalness={0.08}
                            clearcoat={0.4}
                            clearcoatRoughness={0.2}
                        />
                    </Decal>
                )}
            </mesh>

            {/* ═══════════════════════════════════════════
                 CUP HANDLE — Torus Geometry
                 Positioned at the widest point of the body,
                 rotated for a natural ergonomic grip angle.
                 Slightly thicker than before for heft.
            ═══════════════════════════════════════════ */}
            <mesh
                position={[1.35, 0.15, 0]}
                rotation={[0, 0, -Math.PI / 12]}
                castShadow
            >
                <torusGeometry args={[0.55, 0.12, 20, 64]} />
                <primitive object={ceramicMaterial} attach="material" />
            </mesh>

            {/* ═══════════════════════════════════════════
                 LIQUID COFFEE FILL
                 A concave circle geometry with meniscus deformation
                 fitting inside the interior rim cavity.

                 Position: y=0.85 (~70% fill level)
                 Rotation: laid flat (face-up) via -π/2 on X

                 The surface has subtle per-frame vertex ripples
                 to simulate a quietly resting hot liquid.
                 
                 Material: translucent dark espresso so scene
                 spotlights create perceived depth & warmth.
            ═══════════════════════════════════════════ */}
            <mesh
                ref={liquidRef}
                geometry={liquidGeometry}
                position={[0, 0.85, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                receiveShadow
            >
                <primitive object={liquidMaterial} attach="material" />
            </mesh>
        </group>
    );
}
