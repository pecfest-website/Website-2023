import React, { useState } from "react";
import styles from "@/styles/Landing/landingNavbar.module.css";
import Link from "next/link";
import { headerItems } from "@/data/headerItems";

function LandingNavbar() {
    const [isExpanded, setExpendState] = useState(false);

    const onClick = () => {
        setExpendState(!isExpanded);
    };
    return (
        <div style={{ zIndex: "1", position: "fixed", height: "100vh" }}>
            {isExpanded == true && (
                <div className={styles.sidenav}>
                    <button className={styles.closebtn} onClick={onClick}>
                        &times;
                    </button>
                    {headerItems.map((headerItem, i) => {
                        return (
                            <Link href={headerItem.href} key={i}>
                                {headerItem.name}
                            </Link>
                        );
                    })}
                </div>
            )}
            {isExpanded == false && (
                <span
                    style={{
                        fontSize: "50px",
                        cursor: "pointer",
                        position: "fixed",
                        right: "20px",
                        top: "20px",
                        color: "white",
                    }}
                    onClick={onClick}
                >
                    &#9776;{" "}
                </span>
            )}
        </div>
    );
}

export default LandingNavbar;
