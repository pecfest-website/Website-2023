import { Html, useProgress } from "@react-three/drei";
import React from "react";
import logo from "./landing/assets/logo.png";

function Loader() {
    const {progress} = useProgress();
    return (
        <Html
            center
            style={{
                height: "100vh",
                width: "100vw",
                // background: "white",
                display: "flex",
                flexDirection: 'column',
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img style={{ width: "400px" }} src={logo.src} alt="loading..." />
            <h3 style={{"color":"white","paddingTop":"50px"}}>{Math.floor(progress)} % loading...</h3>  
        </Html>
    );
}

export default Loader;
