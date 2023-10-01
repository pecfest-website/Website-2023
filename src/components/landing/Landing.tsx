import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { Suspense } from "react";
import Loader from "../Loader";
import Ocean from "./Ocean";
import Sky from "./Sky";
import { Layers } from "./util/LayerComponent";
import logo from "./assets/logo.png";
import discover from "./assets/discover.png";
import * as THREE from "three";
import { useWindowSize } from "usehooks-ts";
import { Boat, Ship } from "./util/Ship";
import useSound from "use-sound";
import { useRouter } from "next/router";

function Rig() {
    const { camera, mouse } = useThree();
    const vec = new THREE.Vector3();
    return useFrame(() =>
        camera.position.lerp(
            vec.set(mouse.x * 0.25, camera.position.y, camera.position.z),
            0.05
        )
    );
}

function Landing() {
    const { width } = useWindowSize();
    const [play] = useSound("/assets/audio/ocean.mp3");
    const router = useRouter();

    const pushRoute = (route: string) => {
        router.push(route);
    };

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
                <pointLight position={[100, 0, 100]} intensity={100} />
                <pointLight position={[-100, -100, -100]} />

                <ambientLight intensity={2} position={[0, 0, 0]} />

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
                    {width > 720 ? (
                        <>
                            <Ship
                                pos={[-15, 0, 75]}
                                title="Contacts"
                                onClick={() => {
                                    pushRoute("/contacts");
                                }}
                                img={discover.src}
                            />
                            <Ship
                                pos={[-10, 0, 80]}
                                title="Brochure"
                                onClick={() => {
                                    pushRoute("/brochure");
                                }}
                                img={discover.src}
                            />
                            <Ship
                                pos={[-5, 0, 85]}
                                title="Schedule"
                                onClick={() => {
                                    pushRoute("/schedule");
                                }}
                                img={discover.src}
                            />
                            <Boat
                                pos={[0, 0, 90]}
                                title="Discover"
                                onClick={() => {
                                    pushRoute("/about");
                                }}
                                img={discover.src}
                            />
                            <Ship
                                pos={[5, 0, 85]}
                                title="Events"
                                onClick={() => {
                                    pushRoute("/events");
                                }}
                                img={discover.src}
                            />
                            <Ship
                                pos={[10, 0, 80]}
                                title="Team"
                                onClick={() => {
                                    pushRoute("/team");
                                }}
                                img={discover.src}
                            />
                            <Ship
                                pos={[15, 0, 75]}
                                title="Gallery"
                                onClick={() => {
                                    pushRoute("/gallery");
                                }}
                                img={discover.src}
                            />
                        </>
                    ) : (
                        <>
                            <Boat
                                pos={[0, 0, 70]}
                                onClick={() => {
                                    pushRoute("/about");
                                }}
                                img={discover.src}
                            />
                        </>
                    )}
                </Suspense>
            </Canvas>
        </div>
    );
}

export default Landing;
