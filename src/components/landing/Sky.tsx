import { Sky } from "@react-three/drei";
import React from "react";

function OceanSky() {
    return (
        <>
            <Sky
                mieCoefficient={0.05}
                sunPosition={[0,0, -100]}
                azimuth={180}
                turbidity={4}
                // mieDirectionalG={0.791}
                mieDirectionalG={0.4}
                rayleigh={2.5}
            />
        </>
    );
}

export default OceanSky;
