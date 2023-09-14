import { Html, useProgress } from "@react-three/drei";
import Image from "next/image";
import React from "react";
import logo from './landing/assets/logo.png';

function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress();
    return (
        <Html center >
            <img
                style={{ width: "200px" }}
                src={logo.src}
                alt="loading..."
            />
        </Html>
    );
}

export default Loader;
