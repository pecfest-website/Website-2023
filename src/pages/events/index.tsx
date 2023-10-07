import React, { useState } from "react";
import { Button, Container, Grid, Tab, Tabs } from "@mui/material";
import styles from "@/styles/Events/events.module.css";
import { GetServerSidePropsContext } from "next";
import PageLayout from "@/components/layout/PageLayout";
import EventCard from "@/components/events/eventCard";
import { useRouter } from "next/router";
import { collection, getDocs, or, query, where } from "firebase/firestore";
import { db } from "@/serverless/firebase";
import { Event } from "@/types/Event";

interface EventPageProps {
    events: Event[];
}

function Events({ events }: EventPageProps) {
    const [eventType, setEventType] = useState<string>("Mega Shows");
    const [tabIndex, setTabIndex] = useState<number>(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
        if (newValue === 0) {
            setEventType("Mega Shows");
        } else {
            setEventType("Workshops");
        }
    };

    return (
        <PageLayout title="Events | PECFEST'23">
            <Container className={styles.cover} maxWidth={false}>
                <div className={styles.tabContainer}>
                    <Tabs value={tabIndex} onChange={handleChange}>
                        <Tab
                            label={
                                <p className={styles.tab__heading}>Mega Shows</p>
                            }
                            sx={
                                tabIndex === 1
                                    ? {}
                                    : {
                                          fontWeight: 700,
                                      }
                            }
                        />
                        <Tab
                            label={
                                <p className={styles.tab__heading}>Workshops</p>
                            }
                            sx={
                                tabIndex === 0
                                    ? {}
                                    : {
                                          fontWeight: 700,
                                      }
                            }
                        />
                    </Tabs>
                </div>

                <div className={styles.eventCards}>
                    {events
                        .filter(
                            (competition) => competition.category === eventType
                        )
                        .map((event, i) => (
                            <EventCard key={i} event={event} />
                        ))}
                </div>
            </Container>
        </PageLayout>
    );
}

export default Events;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const colRef = query(
        collection(db, "events"),
        or(
            where("category", "==", "Mega Shows"),
            where("category", "==", "Workshops")
        )
    );

    const events = await getDocs(colRef);

    const evs = events.docs.map((doc) => {
        return {
            id: doc.id,
            ...doc.data(),
        };
    });

    return {
        props: {
            events: evs,
        },
    };
}
