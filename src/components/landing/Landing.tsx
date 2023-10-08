import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { Suspense } from "react";
import Loader from "../Loader";
import Ocean from "./Ocean";
import Sky from "./Sky";
import { Layers } from "./util/LayerComponent";
import * as THREE from "three";
import { useWindowSize } from "usehooks-ts";
import { Boat, Ship, Sun } from "./util/Ship";
import useSound from "use-sound";
import { useRouter } from "next/router";

import logo from "./assets/logo.png";
import discover from "./assets/discover.png";
import comp from "./assets/labels/comp.png";
import gallery from "./assets/labels/gallery.png";
import team from "./assets/labels/team.png";
import schedule from "./assets/labels/schedule.png";
import events from "./assets/labels/events.png";
import contacts from "./assets/labels/contacts.png";
import { OrbitControls } from "@react-three/drei";

function Rig() {
    const { camera, mouse } = useThree();
    const vec = new THREE.Vector3();
    return useFrame(() =>
        camera.position.lerp(
            vec.set(mouse.x * 0.25, camera.position.y, camera.position.z),
            0.1
        )
    );
}

function Landing() {
    const { width } = useWindowSize();
    const [play] = useSound("/assets/audio/ocean.mp3");
    const router = useRouter();

    const pushRoute = (route: string) => {
        document.body.style.cursor = "auto";
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
                    {/* <OrbitControls /> */}
                    <Sky />
                    <Ocean />
                    {/* <Sun pos={[0, 0, -30]} /> */}
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
                                img={contacts.src}
                                front
                            />
                            <Ship
                                pos={[-10, 0, 80]}
                                title="Schedule"
                                onClick={() => {
                                    pushRoute("/schedule");
                                }}
                                img={schedule.src}
                            />
                            <Ship
                                pos={[-5, 0, 85]}
                                title="Competitions"
                                onClick={() => {
                                    pushRoute("/competitions");
                                }}
                                img={comp.src}
                                front
                            />
                            <Boat
                                pos={[0, 0, 88]}
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
                                img={events.src}
                                front
                                right
                            />
                            <Ship
                                pos={[10, 0, 80]}
                                title="Team"
                                onClick={() => {
                                    pushRoute("/team");
                                }}
                                img={team.src}
                                right
                            />
                            <Ship
                                pos={[15, 0, 75]}
                                title="Gallery"
                                onClick={() => {
                                    pushRoute("/gallery");
                                }}
                                img={gallery.src}
                                front
                                right
                            />
                        </>
                    ) : (
                        <>
                            <Boat
                                pos={[0, 0, 85]}
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
