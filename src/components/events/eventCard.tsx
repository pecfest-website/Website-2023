import React, { useState } from "react";
import styles from "@/styles/Events/eventCard.module.css";
import { Event } from "@/types/Event";
import Image from "next/image";
import { useRouter } from "next/router";

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
                        width={100}
                        height={100}
                    />
                </div>

                <div className={styles.eventData}>
                    <div className={styles.eventDetailContainer}>
                        <div className={styles.eventName}>{event.name}</div>
                        <div className={styles.tags}>
                            {event.tags?.map((category, index) => (
                                <p className={styles.tagList} key={index}>
                                    {category}
                                    {index < event.tags.length - 1 && (
                                        <span
                                            className={styles.seperator}
                                        ></span>
                                    )}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
