import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { HtmlTooltip } from "../Tooltip";
import { Clone } from "@react-three/drei";
import { useEffect, useState } from "react";
import HoverBox from "./HoverBox";

export function Boat({ pos, onClick }: any) {
    const fbx = useLoader(FBXLoader as any, "/assets/models/shipp.fbx");
    return (
        <Clone object={fbx} scale={0.001} position={pos} onClick={onClick} />
    );
}

export function Ship({ pos, onClick, title, description }: any) {
    const gltf = useLoader(GLTFLoader as any, "/assets/models/pirate_ship.glb");
    const [hover, setHover] = useState(false);

    useEffect(() => {}, [hover]);

    return (
        <>
            {hover ? (
                <HoverBox title={title} description={description} />
            ) : null}
            <Clone
                object={gltf.scene}
                scale={0.001}
                position={pos}
                onClick={onClick}
                onPointerEnter={() => setHover(true)}
                onPointerLeave={() => setHover(false)}
            />
        </>
    );
}
