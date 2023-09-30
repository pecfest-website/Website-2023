import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

export function Layers({ pos, args, img, onClick }: any) {
    const texture = useLoader(THREE.TextureLoader as any, img);
    return (
        <mesh position={pos} onClick={onClick}>
            <planeGeometry attach="geometry" args={args} />
            <meshBasicMaterial attach="material" map={texture} transparent />
        </mesh>
    );
}