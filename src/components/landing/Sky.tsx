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
                azimuth={180}
                turbidity={10}
                // mieDirectionalG={0.791}
                mieDirectionalG={0.6}
                rayleigh={0.04}
            />

            <Layers pos={[0, 40, -40]} args={[200, 50]} img={clouds.src} />
        </>
    );
}

export default OceanSky;
