import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { Suspense } from "react";
import Loader from "../Loader";
import { Scroll, ScrollControls } from "@react-three/drei";
import Hero from "./screens/Hero";
import About from "./screens/About";
import Info from "./screens/Info";

function Rig() {
    const { camera, mouse } = useThree();
    const vec = new THREE.Vector3();
    return useFrame(() =>
        camera.position.lerp(
            vec.set(mouse.x * 0.5, camera.position.y, camera.position.z),
            0.02
        )
    );
}

function GroupPages() {
    const { height } = useThree((state) => state.viewport);
    console.log(height);
    return (
        <>
            <ScrollControls distance={0.1} pages={210 / height}>
                <Scroll>
                    <group>
                        <Hero />
                        <About />
                        <Info />
                    </group>
                </Scroll>
            </ScrollControls>
        </>
    );
}
function Landing() {
    return (
        <div
            style={{
                height: "100vh",
                zIndex: 0,
            }}
        >
            <Canvas
                gl={{
                    powerPreference: "high-performance",
                    antialias: false,
                    alpha: false,
                }}
            >
                <Suspense fallback={<Loader />}>
                    <GroupPages />
                </Suspense>
                <Rig />
            </Canvas>
        </div>
    );
}

export default Landing;
