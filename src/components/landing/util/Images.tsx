import { useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

export function Images(props: any) {
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    };
    let args1 = props.args;
    if (sizes.width < 600) {
        args1 = [4, 2.25];
    }
    const ref = useRef<any>();
    const [args, setArgs] = useState(args1);
    const [pos, setPos] = useState(props.pos);
    const [hovered, setHovered] = useState(false);
    const texture = useLoader(THREE.TextureLoader as any, props.imgname);
    useFrame(() => {
        // if (hovered) {
        //     ref.current.scale.set(1.1, 1.1, 2);
        // } else {
        //     ref.current.scale.set(1, 1, 1);
        // }
    });
    return (
        <mesh
            ref={ref}
            position={pos}
            onPointerOver={() => {
                setHovered(true);
            }}
            onPointerOut={() => {
                setHovered(false);
            }}
        >
            <planeGeometry attach="geometry" args={args} />
            <meshBasicMaterial attach="material" map={texture} transparent />
        </mesh>
    );
}
