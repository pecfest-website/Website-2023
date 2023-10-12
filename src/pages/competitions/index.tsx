import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import styles from "@/styles/Competition/competition.module.css";
import { GetServerSidePropsContext } from "next";
import PageLayout from "@/components/layout/PageLayout";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Chip from "@mui/material/Chip";
import { Event } from "@/types/Event";
import { collection, getDocs, or, query, where } from "firebase/firestore";
import { db } from "@/serverless/firebase";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import EventCard from "@/components/events/eventCard";

interface EventPageProps {
    competitions: Event[];
}

function Competitions({ competitions }: EventPageProps) {
    const [eventType, setEventType] = useState<string>("Cultural");
    const [tabIndex, setTabIndex] = useState<number>(0);
    const [tags, setTags] = useState(getTagsList());

    // if (selectedTags.has(tagName)) { show event card }
    // Also check eventType (for cultural and technical)
    const [selectedTags, setSelectedTags] = useState<Set<string>>(
        new Set<string>()
    );

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
        if (newValue === 0) {
            setEventType("Cultural");
        } else {
            setEventType("Technical");
        }
    };

    return (
        <PageLayout title="Competitions | PECFEST'23">
            <Container className={styles.cover} maxWidth={false}>
                <div className={styles.tabContainer}>
                    <Tabs value={tabIndex} onChange={handleChange} variant="scrollable">
                        <Tab
                            label={
                                <p className={styles.tab__heading}>Cultural</p>
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
                                <p className={styles.tab__heading}>Technical</p>
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

                <div className={styles.container}>
                    <div className={styles.tagContainer}>
                        <div className={`${styles.tagBox} glassmorphism-light`}>
                            <p className={styles.tagHeading}>
                                Select Tags to Filter
                            </p>
                            <div className={styles.tags}>
                                {tags.map((tag, id) => (
                                    <Chip
                                        key={id}
                                        variant={
                                            tag.isSelected
                                                ? "filled"
                                                : "outlined"
                                        }
                                        label={tag.name}
                                        color={
                                            tag.isSelected ? "info" : "primary"
                                        }
                                        icon={<LoyaltyIcon />}
                                        clickable
                                        sx={{ mr: 1, fontWeight: 600 }}
                                        onClick={() => {
                                            const add = !tag.isSelected;
                                            let newTags = [...tags];
                                            newTags[tag.id] = {
                                                ...newTags[tag.id],
                                                isSelected: add,
                                            };
                                            setTags(newTags);
                                            let newSelectedTags =
                                                new Set<string>(selectedTags);
                                            if (add) {
                                                newSelectedTags.add(tag.name);
                                            } else {
                                                newSelectedTags.delete(
                                                    tag.name
                                                );
                                            }

                                            setSelectedTags(newSelectedTags);
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles.eventCards}>
                        {competitions
                            .filter(
                                (competition) =>
                                    competition.category === eventType
                            )
                            .filter((competition) =>
                                filterByTags(selectedTags, competition)
                            )
                            .map((event, i) => (
                                <EventCard key={i} event={event} />
                            ))}
                    </div>
                </div>
            </Container>
        </PageLayout>
    );
}

export default Competitions;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const colRef = query(
        collection(db, "events"),
        or(
            where("category", "==", "Technical"),
            where("category", "==", "Cultural")
        )
    );

    const comps = await getDocs(colRef);

    const competitions = comps.docs.map((doc) => {
        return {
            id: doc.id,
            ...doc.data(),
        };
    });

    return {
        props: {
            competitions,
        },
    };
}

const filterByTags = (selectedTags: Set<string>, event: Event) => {
    if (selectedTags.size === 0) {
        return true;
    }

    let show = false;
    for (let key of selectedTags) {
        for (let tag of event.tags) {
            if (tag === key) show = true;
        }
    }

    return show;
};

const getTagsList = () => {
    return [
        {
            name: "Dance",
            isSelected: false,
            id: 0,
        },
        {
            name: "Music",
            isSelected: false,
            id: 1,
        },
        {
            name: "Coding",
            isSelected: false,
            id: 2,
        },
        {
            name: "Hardware",
            isSelected: false,
            id: 3,
        },
        {
            name: "Dramatics",
            isSelected: false,
            id: 4,
        },
        {
            name: "Gaming",
            isSelected: false,
            id: 5,
        },
        {
            name: "Cinematography",
            isSelected: false,
            id: 6,
        },
        {
            name: "Literary",
            isSelected: false,
            id: 7,
        },
        {
            name: "Quiz",
            isSelected: false,
            id: 8,
        },
        {
            name: "Art",
            isSelected: false,
            id: 9,
        },
        {
            name: "Photography",
            isSelected: false,
            id: 10,
        },
        {
            name: "Fun",
            isSelected: false,
            id: 11,
        },
    ];
};
