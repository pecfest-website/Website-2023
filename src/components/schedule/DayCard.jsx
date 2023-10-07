import Card from "react-animated-3d-card";
import { useEffect, useState } from "react";
import styles from "@/styles/Schedule/schedule.module.css";

const DayCard = ({ dayNumber }) => {
    const [windowHeight, setWindowHeight] = useState("300px");

    useEffect(() => {
        if (window.innerWidth < 700) {
            setWindowHeight("90px");
        }
        console.log(window.innerWidth)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Card
            shineStrength={0.1}
            style={{
                background:
                    "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
                width: "30vw",
                height: windowHeight,
                cursor: "pointer",
                size: "20px",
                position: "relative",
            }}
        >
            <div className="wrapper">
                <div className="clash-card wizard">
                    <div
                        className="clash-card__image clash-card__image--wizard"
                        style={{ position: "relative" }}
                    >
                        <p className={styles.dayText}>Day {dayNumber}</p>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default DayCard;
