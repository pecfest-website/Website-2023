import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

export function Layers({ pos, args, img }: any) {
    const texture = useLoader(THREE.TextureLoader as any, img);
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    };
    return (
        <mesh position={pos}>
            <planeGeometry attach="geometry" args={args} />
            <meshBasicMaterial attach="material" map={texture} transparent />
        </mesh>
    );
}