import React from "react";
import shark from "../assets/fishes/shark@4x.png";
import longNose from "../assets/fishes/fish lmbi sundh@4x.png";
import discoverText from "../assets/discover.png";
import { Layers } from "@/components/landing/util/layers";

function Info() {
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    };
    return (
        <>
            {sizes.width > 960 ? (
                <Layers pos={[30, -110, -40]} args={[35, 15]} img={shark.src} />
            ) : null}
            {sizes.width > 960 ? (
                <Layers
                    pos={[-30, -120, -40]}
                    args={[30, 10]}
                    img={longNose.src}
                />
            ) : null}

            {/* TODO : Info content */}
            {sizes.width > 960 ? (
                <Layers
                    pos={[0, -110, -30]}
                    args={[96, 54]}
                    img={discoverText.src}
                />
            ) : (
                <Layers
                    pos={[0, -145, -30]}
                    args={[48, 27]}
                    img={discoverText.src}
                />
            )}
        </>
    );
}

export default Info;
