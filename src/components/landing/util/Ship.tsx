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
            <HoverBox
                title={"About"}
                description={"Discover PECFEST"}
                pos={[pos[0], pos[1] + 1, pos[2] + 4.5]}
                args={[6, 3]}
                img={img}
            />
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

export function Ship({
    pos,
    onClick,
    title,
    description,
    img,
    front,
    right,
}: any) {
    const gltf = useLoader(GLTFLoader as any, "/assets/models/pirate_ship.glb");
    const [hover, setHover] = useState(false);

    useEffect(() => {
        document.body.style.cursor = hover ? "pointer" : "auto";
    }, [hover]);

    return (
        <>
            <HoverBox
                title={"About"}
                description={"Discover PECFEST"}
                pos={
                    !right
                        ? [pos[0] - 1, pos[1], pos[2] + 4]
                        : [pos[0] + 1, pos[1], pos[2] + 4]
                }
                args={[8, 4]}
                img={img}
            />

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
