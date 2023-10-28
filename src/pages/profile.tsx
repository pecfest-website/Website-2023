import PageLayout from "@/components/layout/PageLayout";
import { db } from "@/serverless/firebase";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    IconButton,
    Typography,
} from "@mui/material";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import { getSession, signOut } from "next-auth/react";
import React, { useState } from "react";
import styles from "@/styles/Profile/profile.module.css";
import { User } from "@/types/User";
import Image from "next/image";
import { IoMdClipboard } from "react-icons/io";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface UserEvents {
    id: string;
    name: string;
}

interface EventProp {
    id: string;
    startDate: string;
    endDate: string;
    name: string;
}

interface Props {
    id: string;
    user: User;
    events: UserEvents[];
    eventsList: EventProp[];
}

function Profile({ user, id, events, eventsList }: Props) {
    console.log(events);
    console.log(eventsList);
    const router = useRouter();

    const copyUserId = () => {
        navigator.clipboard.writeText(id);
        toast.info("User Id copied to clipboard");
    };

    const getDate = (event: EventProp) => {
        return new Date(Date.parse(event.startDate));
    };

    const formatTime = (event: EventProp) => {
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

    function getDayWiseEvents() {
        const filteredEvents = eventsList.filter((event) =>
            events.map((e) => e.id).includes(event.id)
        );

        let res: {
            "Day 1": EventProp[];
            "Day 2": EventProp[];
            "Day 3": EventProp[];
        } = {
            "Day 1": [],
            "Day 2": [],
            "Day 3": [],
        };

        filteredEvents.map((event) => {
            const date = getDate(event);

            console.log(date.getDate());

            if (date.getDate() === 3) {
                res["Day 1"].push(event);
            }
            if (date.getDate() === 4) {
                res["Day 2"].push(event);
            }
            if (date.getDate() === 5) {
                res["Day 3"].push(event);
            }
        });
        return res;
    }

    return (
        <PageLayout title="Profile | PECFEST'23">
            <main className={styles.main}>
                <div className={`${styles.main__box} glassmorphism`}>
                    <div className={styles.left_section}>
                        <Image
                            height={100}
                            width={100}
                            src={user.photoUrl}
                            alt=""
                        />
                    </div>
                    <div className={styles.right_section}>
                        <p>{user.name}</p>
                        <p>{user.mobile}</p>
                        <p>{user.college}</p>
                        {user.sid === "NA" ? null : <p>{user.sid}</p>}
                        <p className={styles.user__id}>
                            {id}
                            <IconButton
                                onClick={copyUserId}
                                sx={{
                                    color: "white",
                                }}
                            >
                                <IoMdClipboard />
                            </IconButton>
                        </p>
                        <div className={styles.buttons}>
                            <Button
                                variant="contained"
                                fullWidth={false}
                                onClick={() => signOut()}
                            >
                                Signout
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={`${styles.event__box} glassmorphism`}>
                    <h1>Your Registered Events</h1>
                    <div className={styles.events__accordion__wrapper}>
                        <Accordion
                            defaultExpanded
                            sx={{
                                background: "transparent",
                            }}
                        >
                            <AccordionSummary
                                onClick={getDayWiseEvents}
                                sx={{
                                    background: "rgba(255, 255, 255, 0.4)",
                                    backdropFilter: "blur(8px)",
                                    boxShadow:
                                        "0 8px 32px 0 rgba(0, 0, 0, 0.18)",
                                    zIndex: 4,
                                    color: "white",
                                    textTransform: "uppercase",
                                }}
                            >
                                <Typography>Day 1</Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    background: "rgba(255, 255, 255, 0.4)",
                                    backdropFilter: "blur(8px)",
                                    boxShadow:
                                        "0 8px 32px 0 rgba(0, 0, 0, 0.18)",
                                    zIndex: 4,
                                }}
                            >
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Suspendisse malesuada lacus
                                    ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary>
                                <Typography>Day 2</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Suspendisse malesuada lacus
                                    ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary>
                                <Typography>Day 3</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Suspendisse malesuada lacus
                                    ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
            </main>
        </PageLayout>
    );
}

export default Profile;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { req } = context;
    const session = await getSession({ req });

    if (session == null) {
        return {
            redirect: {
                destination: "/auth/signin",
                permanent: true,
            },
        };
    }

    const email = session.user?.email ?? "a";

    const docRef = doc(db, "registrations", email);

    const docData = await getDoc(docRef);
    const data = docData.data();
    const mobileNumber = data?.mobile;

    const eventsList = (await getDocs(collection(db, "events"))).docs.map(
        (doc) => {
            return {
                id: doc.id,
                startDate: doc.data().startDate,
                endDate: doc.data().endDate,
                name: doc.data().name,
            };
        }
    );

    const userId = (
        await getDocs(
            query(collection(db, "users"), where("email", "==", data?.email))
        )
    ).docs[0].id;

    const events = (
        await getDocs(collection(db, `registrations/${email}/events`))
    ).docs.map((event) => {
        return {
            id: event.data().eventId,
        };
    });

    console.log(events);

    if (!mobileNumber) {
        return {
            redirect: {
                destination: "/auth/new-user",
                permanent: true,
            },
        };
    }

    return {
        props: {
            id: userId,
            user: {
                ...data,
            },
            events,
            eventsList,
        },
    };
}
