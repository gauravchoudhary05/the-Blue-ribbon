"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll, useTransform } from "framer-motion";

interface ParticleData {
    id: number;
    initialPosition: THREE.Vector3;
    rotationSpeed: THREE.Vector3;
    scale: number;
    scrollMultiplier: number; // Controls depth parallax
}

// Deterministic seed
function seededRand(seed: number): number {
    const x = Math.sin(seed + 1) * 10000;
    return x - Math.floor(x);
}

export function CoffeeParticles3D() {
    const groupRef = useRef<THREE.Group>(null);
    const { scrollYProgress } = useScroll();

    // Map scroll progress to a global Y offset to create parallax
    // Uses Framer Motion's useTransform to derive a raw value, but we apply it in useFrame
    const globalYProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const particles = useMemo<ParticleData[]>(() => {
        return Array.from({ length: 25 }, (_, i) => ({
            id: i,
            // Spread across the screen: X(-8 to 8), Y(-6 to 6), Z(-4 to 2)
            initialPosition: new THREE.Vector3(
                (seededRand(i * 3) - 0.5) * 16,
                (seededRand(i * 5) - 0.5) * 12,
                (seededRand(i * 7) - 0.5) * 8
            ),
            rotationSpeed: new THREE.Vector3(
                (seededRand(i * 11) - 0.5) * 0.02,
                (seededRand(i * 13) - 0.5) * 0.02,
                (seededRand(i * 17) - 0.5) * 0.02
            ),
            scale: 0.08 + seededRand(i * 19) * 0.15,
            scrollMultiplier: 0.5 + seededRand(i * 23) * 2.0, // Variables speed for depth
        }));
    }, []);

    // Dedicated material for the coffee beans
    const beanMaterial = useMemo(() => {
        return new THREE.MeshStandardMaterial({
            color: "#3B2418", // Dark brown
            roughness: 0.6,
            metalness: 0.1,
        });
    }, []);

    // Base geometry for a "bean" (squished sphere)
    const beanGeometry = useMemo(() => {
        const geo = new THREE.SphereGeometry(1, 16, 16);
        geo.scale(1, 0.6, 0.4); // Squish it into a bean shape
        return geo;
    }, []);

    // Animate rotations and parallax inside the ThreeJS render loop
    useFrame(() => {
        if (!groupRef.current) return;

        const scrollVal = globalYProgress.get();

        groupRef.current.children.forEach((child, i) => {
            const p = particles[i];

            // Continuous rotation
            child.rotation.x += p.rotationSpeed.x;
            child.rotation.y += p.rotationSpeed.y;
            child.rotation.z += p.rotationSpeed.z;

            // Parallax translation: particles move up as user scrolls down
            // Creating a scattered wake effect
            child.position.y = p.initialPosition.y + (scrollVal * p.scrollMultiplier * 8);

            // Add a very subtle float logic to all particles so they aren't static when un-scrolled
            child.position.x = p.initialPosition.x + Math.sin(Date.now() * 0.001 + i) * 0.1;
        });
    });

    return (
        <group ref={groupRef}>
            {particles.map((p) => (
                <mesh
                    key={p.id}
                    position={p.initialPosition}
                    scale={p.scale}
                    geometry={beanGeometry}
                    material={beanMaterial}
                    castShadow
                    receiveShadow
                />
            ))}
        </group>
    );
}
