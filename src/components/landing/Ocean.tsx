import React, { useRef, useMemo, MutableRefObject } from "react";
import {
    extend,
    useThree,
    useLoader,
    useFrame,
    Object3DNode,
} from "@react-three/fiber";
import * as THREE from "three";

import { Water } from "three/examples/jsm/objects/Water.js";
import waternormals from "./assets/waternormals.jpg";

extend({ Water });
declare global {
    namespace JSX {
        interface IntrinsicElements {
            water: Object3DNode<Water, typeof Water>;
        }
    }
}

function Ocean() {
    const ref = useRef<any>(null);
    const gl = useThree((state) => state.gl);
    const waterNormals = useLoader(
        THREE.TextureLoader as any,
        waternormals.src
    );

    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
    const geom = useMemo(() => new THREE.PlaneGeometry(30000, 30000), []);
    const config = useMemo(
        () => ({
            textureWidth: 512,
            textureHeight: 512,
            waterNormals,
            sunDirection: new THREE.Vector3(),
            sunColor: 0xeb8934,
            waterColor: 0x0064b5,
            distortionScale: 1,
            fog: true,
            format: gl.outputColorSpace,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [waterNormals]
    );
    useFrame((state, delta) => {
        const material = ref?.current?.material as THREE.ShaderMaterial;
        material.uniforms.time.value += delta;
    });
    return (
        <water
            ref={ref}
            args={[geom, config]}
            rotation-x={-Math.PI / 2}
            position={[0, 0, 0]}
        />
    );
}

export default Ocean;
