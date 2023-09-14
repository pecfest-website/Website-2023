import { Layers } from '@/lib/layers';
import React from 'react'
import waterDrops from '../assets/fishes/water_drops.png';
import smallFishes from '../assets/fishes/small fishes@4x.png'
import shark from '../assets/fishes/shark@4x.png';
import longNose from '../assets/fishes/fish lmbi sundh@4x.png';

function About() {
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    };
    return (
        <>
            <Layers pos={[60, -45, -40]} args={[120, 30]} img={waterDrops.src} />
            <Layers pos={[-45, -50, -35]} args={[80, 30]} img={waterDrops.src} />
            <Layers pos={[0, -80, -40]} args={[120, 30]} img={smallFishes.src} />
            <Layers pos={[25, -65, -35]} args={[25, 10]} img={shark.src} />
            <Layers pos={[-10, -55, -30]} args={[30, 15]} img={longNose.src} />
            {/* TODO : About content */}
        </>
    );
}

export default About