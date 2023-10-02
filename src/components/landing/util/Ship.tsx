import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { Clone } from "@react-three/drei";
import { useEffect, useState } from "react";
import HoverBox from "./HoverBox";

export function Boat({ pos, onClick, img }: any) {
    const fbx = useLoader(FBXLoader as any, "/assets/models/shipp.fbx");
    const [hover, setHover] = useState(false);

    useEffect(() => {
        document.body.style.cursor = hover ? "pointer" : "auto";
    }, [hover]);

    return (
        <>
            {hover ? (
                <HoverBox
                    title={"About"}
                    description={"Discover PECFEST"}
                    pos={[pos[0], pos[1] + 3, pos[2]]}
                    args={[15, 7]}
                    img={img}
                />
            ) : null}
            <Clone
                object={fbx}
                scale={0.001}
                position={pos}
                onClick={onClick}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            />
        </>
    );
}

export function Ship({ pos, onClick, title, description, img }: any) {
    const gltf = useLoader(GLTFLoader as any, "/assets/models/pirate_ship.glb");
    const [hover, setHover] = useState(false);

    useEffect(() => {
        document.body.style.cursor = hover ? "pointer" : "auto";
    }, [hover]);

    return (
        <>
            {hover ? (
                <HoverBox
                    title={title}
                    description={description}
                    pos={[pos[0], pos[1] + 2, pos[2]]}
                    args={[15, 9]}
                    img={img}
                />
            ) : null}
            <Clone
                object={gltf.scene}
                scale={0.001}
                position={pos}
                onClick={onClick}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            />
        </>
    );
}
