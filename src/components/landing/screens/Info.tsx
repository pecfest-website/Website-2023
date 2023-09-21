import React from "react";
import shark from "../assets/fishes/shark@4x.png";
import longNose from "../assets/fishes/fish lmbi sundh@4x.png";
import discoverText from "../assets/discover.png";
import { Layers } from "@/components/landing/util/layers";
import { Images } from "../util/Images";

import farhan from "../assets/discover/FarhanAkhtar.jpg";
import javed from "../assets/discover/Javed2.jpg";
import sukhi from "../assets/discover/SukhwinderSingh.jpg";
import vishalshekhar from "../assets/discover/VishalShekhar.jpg";

import disxover from "../assets/discover/disxover.png";
import seabat from "../assets/fishes/sea bat@4x.png";
import tortoise from "../assets/fishes/tortoise@4x.png";

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

            {/* <Images pos={[114,0,-15]} args={[10,6]} imgname={img1} /> */}
            {/* <Images pos={[-10, -130, -30]} args={[24, 18]} imgname={farhan.src} />
                <Images pos={[20, -130, -30]} args={[14, 20]} imgname={javed.src} />
                <Images pos={[-20, -150, -30]} args={[24, 18]} imgname={sukhi.src} />
                <Images pos={[30, -150, -30]} args={[30, 17]} imgname={vishalshekhar.src} /> */}

            {/* {sizes.width > 960 ? (
                <Images
                    pos={[0, -140, -30]}
                    args={[85, 50]}
                    imgname={disxover.src}
                />
            ) : (
                <Images
                    pos={[0, -170, -30]}
                    args={[51, 30]}
                    imgname={disxover.src}
                />
            )} */}
            <Layers pos={[-60, -150, -40]} args={[20, 15]} img={seabat.src} />

            {/* <Layers pos={[-60, -150, -40]} args={[20, 15]} img={tortoise.src} /> */}
        </>
    );
}

export default Info;
