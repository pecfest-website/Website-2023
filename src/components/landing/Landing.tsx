import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { Suspense } from "react";
import Loader from "../Loader";
import Ocean from "./Ocean";
import Sky from "./Sky";
import { Layers } from "./util/Layers";
import logo from "./assets/logo.png";
import * as THREE from "three";
import { useWindowSize } from "usehooks-ts";
import { Ship, Ship2 } from "./util/Ship";

function Rig() {
    const { camera, mouse } = useThree();
    const vec = new THREE.Vector3();
    return useFrame(() =>
        camera.position.lerp(
            vec.set(mouse.x *0.5, camera.position.y, camera.position.z),
            0.2
        )
    );
}

function Landing() {
    const { width } = useWindowSize();
    return (
        <div
            style={{
                height: "100vh",
                zIndex: 0,
            }}
        >
            <Canvas
                camera={{ position: [0, 5, 100], fov: 60, near: 1, far: 20000 }}
                gl={{
                    powerPreference: "default",
                    antialias: false,
                    alpha: false,
                }}
            >
                <pointLight position={[100, 0, 100]} />
                <pointLight position={[-100, -100, -100]} />
                <Suspense fallback={<Loader />}>
                    <Sky />
                    <Ocean />
                    {width > 720 ? (
                        <Layers
                            pos={[0, 15, -30]}
                            args={[100, 100]}
                            img={logo.src}
                        />
                    ) : (
                        <Layers
                            pos={[0, 8, -30]}
                            args={[50, 50]}
                            img={logo.src}
                        />
                    )}
                    <Rig />
                    <Ship pos={[-10,0,80]} />
                    <Ship2 pos={[10,0,80]} />
                </Suspense>
            </Canvas>
        </div>
    );
}

export default Landing;
