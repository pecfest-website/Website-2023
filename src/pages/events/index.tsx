import React, { ReactNode, useState } from "react";
import { Button, Container, Grid } from "@mui/material";

import styles from "@/styles/Events/events.module.css";
import PirateShipLottie from "@/components/events/shipLottieAnimation";
import { GetServerSideProps } from "next";
import PageLayout from "@/components/layout/PageLayout";
import EventCard from "@/components/events/eventCard";
import TwoHeadingSelector from "@/components/TwoHeadingSelector/TwoHeadingSelector";
import { useRouter } from "next/router";

interface EventPageProps {
    isEventDoneEnv: string | null;
}

enum EventType {individual="Individual",team="Team"}
enum EventCategory {technical="Technical",cultural="Cultural",megashows="Megashows",workshop="Workshop"}
enum EventClubType {cultural="Cultural",technical="Technical"}

interface Event {
    id?: string;
    name?: string;
    type?: EventType;
    category?: EventCategory;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    venue?: string;
    club?: string;
    clubType?: EventClubType;
    rulebook?: string;
    subcategory?: string[];
    image?: string;
}

function Events({ isEventDoneEnv }: EventPageProps) {
    const [eventType, setEventType] = useState<string | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const router = useRouter();

    const fetchEvents = async () => {
        console.log("fetch events");
        try {
            // Fetch events
            setEvents([
                {
                    id: '12',
                    name: 'Ideathon',
                    startDate: new Date(),
                    endDate: new Date(),
                    venue: 'PEC',
                    subcategory: ['Coding', 'Hardware'],
                    type: EventType.team,
                    club: "ACM",
                    clubType: EventClubType.technical,
                    category: EventCategory.cultural,
                    rulebook: "https://docs.google.com/document/d/10flyp_CVGi4BeIJRnF0TXTsWAGG8HN27hSwp8KI6uN0/edit",
                    description: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
                    image: "https://images.unsplash.com/photo-1682686578289-cf9c8c472c9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"

                }
            ])
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    if (isEventDoneEnv) {
        return (
            <PageLayout title="Events | Pecfest" noHeader>
                <div className={styles.cover}>
                    <div className={styles.pirateShipContainer}>
                        <PirateShipLottie loop={true} />
                    </div>
                    <h1 className={styles.eventHeading}>Coming Soon</h1>
                </div>
            </PageLayout>
        );
    }

    if (eventType == null) {
        return (
            <TwoHeadingSelector
                leftImageUrl="/FestPics/workshop.jpg"
                rightImageUrl="/FestPics/megashows.jpg"
                setEventType={setEventType}
            />
        )
    }

    if (events == null || events.length == 0) {
        return (
            <PirateShipLottie
                loop={false}
                onComplete={() => {
                    fetchEvents();
                }}
            />
        );
    }

    return (
        <PageLayout title="Events | Pecfest'23">
            <Container className={styles.cover}>
                <h1 className={styles.eventHeading}>
                    {eventType.charAt(0).toUpperCase() + eventType.slice(1)}{" "}
                    Events
                </h1>
                <Grid container spacing={3}>
                    {events.map((event) => (
                        <Grid
                            className={styles.card}
                            item
                            key={event.id}
                            xs={12}
                            sm={6}
                            md={4}
                            onClick={() => {router.push({
                                pathname: `events/${event.id}`
                            })}}
                        >
                            <EventCard
                                id={event?.id}
                                name={event?.name}
                                type={event?.type}
                                category={event?.category}
                                description={event?.description}
                                startDate={event?.startDate}
                                endDate={event?.endDate}
                                venue={event?.venue}
                                club={event?.club}
                                clubType={event?.clubType}
                                rulebook={event?.rulebook}
                                subcategory={event?.subcategory}
                                image={event?.image}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </PageLayout>
    );
}

export const getServerSideProps: GetServerSideProps<
    EventPageProps
> = async () => {
    const isEventDoneEnv = process.env.EVENTS_DONE || null;
    return {
        props: {
            isEventDoneEnv,
        },
    };
};

export default Events;
