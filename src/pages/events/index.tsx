import React, { useState } from "react";
import { Button, Container, Grid } from "@mui/material";
import styles from "@/styles/Events/events.module.css";
import { GetServerSidePropsContext } from "next";
import PageLayout from "@/components/layout/PageLayout";
import EventCard from "@/components/events/eventCard";
import { useRouter } from "next/router";
import { collection, getDocs, or, query, where } from "firebase/firestore";
import { db } from "@/serverless/firebase";
import { Event } from "@/types/Event";

interface EventPageProps {
    evs: Event[];
}

function Events({ evs }: EventPageProps) {
    const [eventType, setEventType] = useState<string>("Mega shows");
    const router = useRouter();

    return (
        <PageLayout title="Events | Pecfest'23">
            <Container className={styles.cover}>
                <h1 className={styles.eventHeading}>
                    {eventType.charAt(0).toUpperCase() + eventType.slice(1)}{" "}
                </h1>
                <Grid container spacing={3}>
                    {evs.map((event) => (
                        <Grid
                            className={styles.card}
                            item
                            key={event.id}
                            xs={12}
                            sm={6}
                            md={4}
                            onClick={() => {
                                router.push({
                                    pathname: `events/${event.id}`,
                                });
                            }}
                        >
                            <EventCard event={event} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </PageLayout>
    );
}

export default Events;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const colRef = query(
        collection(db, "events"),
        or(
            where("category", "==", "Mega shows"),
            where("category", "==", "Workshops")
        )
    );

    const events = await getDocs(colRef);

    // const competitions = comps.docs.map((doc) => {
    //     return {
    //         id: doc.id,
    //         ...doc.data(),
    //     };
    // });

    // TODO : Remove lower code
    const evs = [
        {
            id: "H6C0GfOu7hXlbuNy085b",
            pocName: "John Doe",
            adminEmail: "admin@pecfest.org",
            startDate: "2023-10-12T02:06:00+05:30",
            image: "https://firebasestorage.googleapis.com/v0/b/pecfest-23.appspot.com/o/events%2FDummy%20event%202.png?alt=media&token=fc0dfdc8-f953-4001-99c2-c61d86fb309b",
            endDate: "2023-10-27T23:50:00+05:30",
            tags: ["Coding", "Hardware"],
            type: "Team",
            ruleBook:
                "https://docs.google.com/document/d/10flyp_CVGi4BeIJRnF0TXTsWAGG8HN27hSwp8KI6uN0/edit#heading=h.bgret88b62o7",
            category: "Technical",
            name: "Dummy event 2",
            minTeamSize: "3",
            description:
                "Some technical event \n" +
                "\n" +
                "Renowned event of something big. Making para bigger by writing anything. lorem ipsum.",
            venue: "Main Arena",
            maxTeamSize: "8",
            pocNumber: "987654321",
        },
        {
            id: "tge4HsrW7V8ld7eoLjfq",
            startDate: "2023-10-05T00:00:00+05:30",
            pocNumber: "34567899",
            ruleBook:
                "https://docs.google.com/document/d/10flyp_CVGi4BeIJRnF0TXTsWAGG8HN27hSwp8KI6uN0/edit#heading=h.bgret88b62o7",
            venue: "Main Arena",
            minTeamSize: 1,
            name: "Dummy event 1",
            maxTeamSize: 1,
            endDate: "2023-10-26T00:00:00+05:30",
            adminEmail: "admin@pecfest.org",
            category: "Cultural",
            tags: ["Dance", "Music"],
            pocName: "jane doe",
            description: "bcd xyz",
            type: "Individual",
            image: "https://firebasestorage.googleapis.com/v0/b/pecfest-23.appspot.com/o/events%2FDummy%20event%201.png?alt=media&token=451014c3-9391-473e-ac03-693971e01dce",
        },
    ];

    return {
        props: {
            evs,
        },
    };
}
