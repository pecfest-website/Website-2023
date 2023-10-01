import { useLoader } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";

function HoverBox({
    title,
    description,
    img,
    pos,
    args,
}: {
    title: string;
    description: string;
    img: string;
    pos: any;
    args: any;
}) {
    const texture = useLoader(THREE.TextureLoader as any, img);
    return (
        <mesh position={pos}>
            <planeGeometry attach="geometry" args={args} />
            <meshBasicMaterial attach="material" map={texture} transparent />
        </mesh>
    );
}

export default HoverBox;
