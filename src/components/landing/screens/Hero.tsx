import { Sparkles } from "@react-three/drei";
import React from "react";
import clouds from "../assets/clouds.png";
import logo from "../assets/logo.png";
import wave1 from "../assets/waves/1.png";
import wave2 from "../assets/waves/2.png";
import wave3 from "../assets/waves/3.png";
import wave4 from "../assets/waves/4.png";
import wave5 from "../assets/waves/5.png";
import { Layers } from "@/lib/layers";

export const SparklesStory = ({ random, size, amount, ...props }: any) => {
    const sizes = React.useMemo(() => {
        return new Float32Array(
            Array.from({ length: amount }, () => Math.random() * size)
        );
    }, [size, amount]);
    return (
        <>
            <Sparkles
                {...props}
                size={random ? sizes : size}
                color="orange"
                count={amount}
            />
        </>
    );
};

function Hero() {
    // TODO : reponsive for mobile
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    };
    return (
        <>
            <Layers pos={[0, 28, -40]} args={[120, 30]} img={clouds.src} />
            <Layers pos={[0, -10, -30]} args={[120, 10]} img={wave1.src} />
            <Layers pos={[0, -13, -30]} args={[120, 10]} img={wave2.src} />
            <Layers pos={[0, -18, -30]} args={[120, 10]} img={wave3.src} />
            <Layers pos={[0, -22, -30]} args={[120, 10]} img={wave4.src} />
            <Layers pos={[0, -25, -30]} args={[120, 7]} img={wave5.src} />
            <Layers pos={[0, 0, -30]} args={[30, 30]} img={logo.src} />

            {/* TODO : hills */}
        </>
    );
}

export default Hero;
