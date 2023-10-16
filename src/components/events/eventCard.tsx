import React, { useState } from "react";
import styles from "@/styles/Events/eventCard.module.css";
import { Event } from "@/types/Event";
import Image from "next/image";
import { useRouter } from "next/router";
import { Chip } from "@mui/material";
import LoyaltyIcon from "@mui/icons-material/Loyalty";

interface EventCardProps {
    event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    const router = useRouter();
    return (
        <div>
            <div
                className={styles.eventCardContainer}
                onClick={() => {
                    router.push({
                        pathname: `events/${event.id}`,
                    });
                }}
            >
                <div className={styles.eventCardGlossContainer}></div>

                <div className={styles.posterContainer}>
                    <Image
                        src={event.image}
                        alt={event.name}
                        width={400}
                        height={400}
                    />
                </div>

                <div className={styles.eventData}>
                    <div className={styles.eventDetailContainer}>
                        <div className={styles.eventName}>{event.name}</div>
                        <div className={styles.tags}>
                            {event.tags?.slice(0, 2).map((category, index) => (
                                <Chip
                                    key={index}
                                    variant={"outlined"}
                                    label={category}
                                    color={"primary"}
                                    icon={<LoyaltyIcon />}
                                    clickable
                                    sx={{ mr: 1, fontWeight: 600 }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
