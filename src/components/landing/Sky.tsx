import { Sky } from "@react-three/drei";
import React from "react";
import { Layers } from "./util/Layers";
import clouds from "./assets/clouds.png";

function OceanSky() {
    return (
        <>
            <Sky
                mieCoefficient={0.05}
                sunPosition={[0, -3, -100]}
                azimuth={180}
                turbidity={4}
                // mieDirectionalG={0.791}
                // mieDirectionalG={0.4}
                rayleigh={0.2}
            />

            <Layers pos={[0, 40, -40]} args={[200, 50]} img={clouds.src} />
        </>
    );
}

export default OceanSky;
