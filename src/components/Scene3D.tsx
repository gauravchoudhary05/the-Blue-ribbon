"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { CoffeeCup3D } from "./CoffeeCup3D";
import { CoffeeParticles3D } from "./CoffeeParticles3D";
import { CoffeeSteam3D } from "./CoffeeSteam3D";
import { useState, useEffect } from "react";

export function Scene3D() {
    const [showCup, setShowCup] = useState(false);
    const [isMobile, setIsMobile] = useState(false); // 📱 ADDED: Mobile state

    useEffect(() => {
        // Check screen size
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize(); // Check immediately on load
        window.addEventListener("resize", handleResize);

        const handleScroll = () => {
            if (window.scrollY > window.innerHeight * 1.0) {
                setShowCup(true);
            } else {
                setShowCup(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div
            className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 ease-in-out ${showCup ? "opacity-100" : "opacity-0"
                }`}
            style={{ zIndex: 10 }}
        >
            <Canvas
                shadows
                camera={{ position: [0, 0, 8], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
                eventSource={typeof window !== "undefined" ? document.body : undefined}
            >
                <ambientLight intensity={0.4} />
                <directionalLight position={[3, 5, 5]} intensity={1.4} color="#fdf6e3" castShadow shadow-mapSize={[128, 128]} />
                <directionalLight position={[-5, -2, -5]} intensity={0.5} color="#C9A96E" />

                {/* 📱 ADDED: Wrapper group that scales down to 65% size on mobile! */}
                <group scale={isMobile ? 0.65 : 1}>
                    <CoffeeCup3D />
                    <CoffeeParticles3D />
                    <CoffeeSteam3D />
                    {!isMobile && <ContactShadows position={[0, -4.5, 0]} opacity={0.4} scale={20} blur={2} far={10} resolution={128} frames={1} />}
                </group>

                <Environment preset="apartment" />
            </Canvas>
        </div>
    );
}