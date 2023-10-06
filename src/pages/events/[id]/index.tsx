import { Box, Button, Card, CardMedia, Grid } from "@mui/material";
import styles from "@/styles/Events/eventDetails.module.css";
import PageLayout from "@/components/layout/PageLayout";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/serverless/firebase";
import { Event } from "@/types/Event";
import Image from "next/image";
import { useRouter } from "next/router";

interface EventDetailsProps {
    event: Event;
}

function EventDetails({ event }: EventDetailsProps) {
    return (
        <PageLayout title={`${event.name} | PECFEST'23`}>
            <section
                style={{ minHeight: "91vh" }}
                className={styles.background}
            >
                <div suppressHydrationWarning>
                    {/* <Event eventDetails={props.eventDetails} teamId={tid} /> */}
                </div>
            </section>
        </PageLayout>
    );
}

export const getServerSideProps = async (context: any) => {
    const eventId = context.params.id;
    const docRef = doc(db, "events", eventId);

    const eventSnapshot = await getDoc(docRef);

    // const event = {
    //     id: eventSnapshot.id,
    //     ...eventSnapshot.data(),
    // };

    const event = {
        id: "tge4HsrW7V8ld7eoLjfq",
        pocName: "jane doe",
        maxTeamSize: 1,
        tags: ["Dance", "Music"],
        venue: "Main Arena",
        type: "Individual",
        startDate: "2023-10-05T00:00:00+05:30",
        minTeamSize: 1,
        adminEmail: "admin@pecfest.org",
        category: "Cultural",
        name: "Dummy event 1",
        image: "https://firebasestorage.googleapis.com/v0/b/pecfest-23.appspot.com/o/events%2FDummy%20event%201.png?alt=media&token=451014c3-9391-473e-ac03-693971e01dce",
        description: "bcd xyz",
        pocNumber: "34567899",
        ruleBook:
            "https://docs.google.com/document/d/10flyp_CVGi4BeIJRnF0TXTsWAGG8HN27hSwp8KI6uN0/edit#heading=h.bgret88b62o7",
        endDate: "2023-10-26T00:00:00+05:30",
    };
    if (eventSnapshot.data() == null) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            event,
        },
    };
};

export default EventDetails;
