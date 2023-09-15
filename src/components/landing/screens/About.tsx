import { Layers } from "@/lib/layers";
import React from "react";
import waterDrops from "../assets/fishes/water_drops.png";
import smallFishes from "../assets/fishes/small fishes@4x.png";
import blue from "../assets/bg/blue screen@10x (1).png";
import aboutBig from "../assets/about big.png";
import aboutSmall from "../assets/about small.png";

function About() {
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    };

    console.log(sizes.width);
    return (
        <>
            <Layers pos={[0, -40, -40]} args={[500, 300]} img={blue.src} />
            <Layers
                pos={[60, -45, -40]}
                args={[120, 30]}
                img={waterDrops.src}
            />
            <Layers
                pos={[-45, -50, -40]}
                args={[80, 30]}
                img={waterDrops.src}
            />
            <Layers
                pos={[0, -80, -40]}
                args={[120, 30]}
                img={smallFishes.src}
            />
            {sizes.width > 960 ? (
                <Layers
                    pos={[0, -55, -40]}
                    args={[96, 54]}
                    img={aboutBig.src}
                />
            ) : (
                <Layers
                    pos={[0, -75, -40]}
                    args={[54, 96]}
                    img={aboutSmall.src}
                />
            )}
        </>
    );
}

export default About;
