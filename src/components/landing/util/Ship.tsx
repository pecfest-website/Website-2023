import { useFrame, useLoader } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

function Ship({ pos, args, img }: any) {
    const texture = useLoader(THREE.TextureLoader as any, img);
    const meshRef = useRef<any>();
    useFrame((state, delta) => {
        meshRef.current.position.y = pos[1] - Math.sin(state.clock.elapsedTime);
    });
    return (
        <mesh position={pos} ref={meshRef}>
            <planeGeometry attach="geometry" args={args} />
            <meshBasicMaterial attach="material" map={texture} transparent />
        </mesh>
    );
}

export default Ship;
