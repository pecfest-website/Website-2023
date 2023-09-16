import { useFrame, useLoader } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

function Wave({ pos, args, img, direction }: any) {
    const texture = useLoader(THREE.TextureLoader as any, img);
    const meshRef = useRef<any>();
    useFrame((state, delta) => {
        if (direction === "left")
            meshRef.current.position.x = - 1 - Math.sin(state.clock.elapsedTime)*2;
        else
            meshRef.current.position.x = 1 + Math.sin(state.clock.elapsedTime)*2;
    });
    return (
        <mesh position={pos} ref={meshRef}>
            <planeGeometry attach="geometry" args={args} />
            <meshBasicMaterial attach="material" map={texture} transparent />
        </mesh>
    );
}

export default Wave;
