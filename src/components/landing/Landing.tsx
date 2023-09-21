import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import Loader from "../Loader";
import Ocean from "./Ocean";
import Sky from "./Sky";
import { Layers } from "./util/layers";
import logo from "./assets/logo.png";

function Landing() {
    return (
        <div
            style={{
                height: "100vh",
                zIndex: 0,
            }}
        >
            <Canvas
                camera={{ position: [0, 5, 100], fov: 55, near: 1, far: 20000 }}
                gl={{
                    powerPreference: "default",
                    antialias: false,
                    alpha: false,
                }}
            >
                <pointLight position={[100, 0, 100]} />
                <pointLight position={[-100, -100, -100]} />
                <Suspense fallback={<Loader />}>
                    <Ocean />
                    <Sky />
                    <Layers
                        pos={[0, 15, -30]}
                        args={[100, 100]}
                        img={logo.src}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}

export default Landing;
