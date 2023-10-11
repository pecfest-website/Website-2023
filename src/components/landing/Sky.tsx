import { Sky } from "@react-three/drei";
import React from "react";
import { Layers } from "./util/LayerComponent";
import clouds from "./assets/clouds.png";

function OceanSky() {
    return (
        <>
            <Sky
                mieCoefficient={0.05}
                sunPosition={[0, -2, -100]}
                turbidity={2}
                mieDirectionalG={0.2}
                rayleigh={1}
            />

            <Layers pos={[0, 40, -40]} args={[200, 50]} img={clouds.src} />
        </>
    );
}

export default OceanSky;
