import Card from "react-animated-3d-card";
import { useState } from "react";
import styles from "@/styles/Schedule/schedule.module.css";

const DayCard = ({ dayNumber }) => {
    return (
        <Card
            shineStrength={0.1}
            style={{
                background:
                    "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
                width: "30vw",
                height: "300px",
                cursor: "pointer",
            }}
            onClick={() => console.log("Hola")}
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
