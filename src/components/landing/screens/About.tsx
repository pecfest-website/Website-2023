import { Layers } from '@/lib/layers';
import React from 'react'
import waterDrops from '../assets/fishes/water_drops.png';
import smallFishes from '../assets/fishes/small fishes@4x.png'
import blue from '../assets/bg/blue.png';

function About() {
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    };
    return (
        <>
            <Layers pos={[0, -40, -40]} args={[500, 300]} img={blue.src} />
            <Layers pos={[60, -45, -40]} args={[120, 30]} img={waterDrops.src} />
            <Layers pos={[-45, -50, -35]} args={[80, 30]} img={waterDrops.src} />
            <Layers pos={[0, -80, -40]} args={[120, 30]} img={smallFishes.src} />
            {/* TODO : About content */}
        </>
    );
}

export default About