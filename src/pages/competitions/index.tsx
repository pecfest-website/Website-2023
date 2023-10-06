import React, { ReactNode, useState } from "react";
import { Button, Container, Grid } from "@mui/material";
import styles from "@/styles/Events/events.module.css";
import PirateShipLottie from "@/components/events/shipLottieAnimation";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import PageLayout from "@/components/layout/PageLayout";
import EventCard from "@/components/events/eventCard";
import { useRouter } from "next/router";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@react-three/drei";
import Chip from "@mui/material/Chip";
import { Event } from "@/types/Event";
import { collection, doc, getDocs, or, query, where } from "firebase/firestore";
import { db } from "@/serverless/firebase";

interface EventPageProps {
    competitions: Event[] | null;
}

// Remove this temporary event card
const TempEventCard = () => {
    return (
        <div className={styles.tempEventCardContainer}>
            <div
                style={{
                    height: "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                Hi I am image
            </div>
            <div>
                <h1>Title</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iste, voluptatem in illum dolorem, debitis maiores delectus
                    rem porro, ea voluptatibus facere aliquid incidunt nobis
                    impedit sapiente itaque. Optio, placeat libero.
                </p>
                <p>Date - Date</p>
            </div>
        </div>
    );
};

function Events({ competitions }: EventPageProps) {
    const [eventType, setEventType] = useState<string>("Cultural");
    const [events, setEvents] = useState<Event[]>([]);
    const [tabIndex, setTabIndex] = useState<number>(0);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const router = useRouter();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
        if (newValue === 0) {
            setEventType("Cultural");
        } else {
            setEventType("Technical");
        }
    };

    const handleTagSelect = (e: any) => {
        alert("clicked on chip");
        console.info(e);
    };

    return (
        <PageLayout title="Competitions | Pecfest'23" darkHeader>
            <div className={styles.cover}>
                <div className={styles.tabContainer}>
                    <Tabs
                        value={tabIndex}
                        onChange={handleChange}
                        aria-label="Toggle"
                    >
                        <Tab label="Cultural Events" />
                        <Tab label="Technical Events" />
                    </Tabs>
                </div>

                <h1 className={styles.eventHeading}>
                    {eventType.charAt(0).toUpperCase() + eventType.slice(1)}{" "}
                    Events
                </h1>

                <div className={styles.container}>
                    <div className={styles.tagsBox}>
                        {tags.map((tag, id) => (
                            <Button variant="text" sx={{ mr: 1 }} key={id}>
                                {" "}
                                {tag}{" "}
                            </Button>
                        ))}
                    </div>

                    <div className={styles.eventCards}>
                        {[...Array(10)].map((x, i) => (
                            <TempEventCard key={i} />
                        ))}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}

export default Events;

const tags = [
    "Dance",
    "Music",
    "Coding",
    "Hardware",
    "Photography",
    "Quiz",
    "Cinematography",
    "Art",
    "Literary",
    "Dramatics",
    "Gaming",
];

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const colRef = query(
        collection(db, "events"),
        or(
            where("category", "==", "Technical"),
            where("category", "==", "Cultural")
        )
    );

    const comps = await getDocs(colRef);

    // const competitions = comps.docs.map((doc) => {
    //     return {
    //         id: doc.id,
    //         ...doc.data(),
    //     };
    // });

    // TODO : Remove lower code
    const competitions = [
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
            competitions,
        },
    };
}
