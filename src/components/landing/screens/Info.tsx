import React from 'react'
import shark from '../assets/fishes/shark@4x.png';
import longNose from '../assets/fishes/fish lmbi sundh@4x.png';
import { Layers } from '@/components/landing/util/layers';

function Info() {
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    };
    return (
        <>
            <Layers pos={[30, -110, -40]} args={[35,15]} img={shark.src} />
            <Layers pos={[-30, -120, -40]} args={[30, 10]} img={longNose.src} />
            {/* TODO : Info content */}
        </>
    );
}

export default Info