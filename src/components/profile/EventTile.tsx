import { EventProp } from "@/pages/profile";
import React from "react";
import styles from "@/styles/Profile/eventTile.module.css";
import { Card, Typography } from "@mui/material";

function EventTile({ event }: { event: EventProp }) {
    const formatTime = () => {
        const s = new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "2-digit",
        }).format(new Date(Date.parse(event.startDate)));

        const e = new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "2-digit",
        }).format(new Date(Date.parse(event.endDate)));
        return `${s} - ${e}`;
    };

    return (
        <Card
            sx={{
                background: "none",
                padding: "20px 10px",
                margin: "0",
                color: "white",
                borderRadius: 0
            }}
            elevation={2}
            className={styles.card}
        >
            <Typography>{event.name}</Typography>
            <Typography>Time - {formatTime()}</Typography>
        </Card>
    );
}

export default EventTile;
