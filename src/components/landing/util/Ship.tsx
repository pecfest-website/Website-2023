import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

export function Ship({pos}: any) {
    const gltf = useLoader(
        GLTFLoader as any,
        "/assets/models/pirate_ship/scene.gltf"
    );
    return (
        <primitive object={gltf.scene} scale={0.001} position={pos} />
    );
}

export function Ship2({pos}: any) {
    const fbx = useLoader(
        FBXLoader as any,
        "/assets/models/shipp.fbx"
    );
    return (
        <primitive object={fbx} scale={0.001} position={pos} />
    );
}