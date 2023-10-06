import { Badge, Box, Button, Card, CardMedia, Chip, Grid } from "@mui/material";
import styles from "@/styles/Events/eventDetails.module.css";
import PageLayout from "@/components/layout/PageLayout";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/serverless/firebase";
import { Event } from "@/types/Event";
import Image from "next/image";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScheduleIcon from "@mui/icons-material/Schedule";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuBookIcon from "@mui/icons-material/MenuBook";

interface EventDetailsProps {
    event: Event;
}

function EventDetails({ event }: EventDetailsProps) {
    const formatDate = () => {
        const s = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
        }).format(new Date(Date.parse(event.startDate)));

        const e = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
        }).format(new Date(Date.parse(event.endDate)));
        return `${s} - ${e}`;
    };

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

    const info = [
        {
            Icon: CalendarMonthIcon,
            text: formatDate(),
        },
        {
            Icon: ScheduleIcon,
            text: formatTime(),
        },
        {
            Icon: MyLocationIcon,
            text: event.venue,
        },
        {
            Icon: PhoneForwardedIcon,
            text: `${event.pocName} - ${event.pocNumber}`,
        },
        {
            Icon: GroupsIcon,
            text: `${event.minTeamSize} - ${event.maxTeamSize} members`,
        },
        {
            Icon: MenuBookIcon,
            link: event.ruleBook,
            text: "Rulebook",
        },
    ];

    return (
        <PageLayout title={`${event.name} | PECFEST'23`} darkHeader>
            <section className={styles.background}>
                <main className={`${styles.main}`}>
                    <div className={`${styles.details} glassmorphism-light`}>
                        <h1>{event.name}</h1>
                        <div className={styles.tag_badges}>
                            {event.tags.map((tag, i) => {
                                return (
                                    <Chip
                                        key={i}
                                        label={tag}
                                        size="small"
                                        color="error"
                                    />
                                );
                            })}
                        </div>
                        <div className={styles.details__info}>
                            {info.map(({ text, Icon, link }, i) => {
                                if (i == 4 && event.type === "Individual") {
                                    return null;
                                }
                                if (link) {
                                    return (
                                        <div
                                            key={i}
                                            className={
                                                styles.details__info__line
                                            }
                                        >
                                            <Icon />
                                            <a
                                                href={link}
                                                target="_blank"
                                                referrerPolicy="no-referrer"
                                            >
                                                {text}
                                            </a>
                                        </div>
                                    );
                                }
                                return (
                                    <div
                                        key={i}
                                        className={styles.details__info__line}
                                    >
                                        <Icon />
                                        <span>{text}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <Button variant="contained">Regsiter</Button>
                        <hr className={styles.line} />

                        <div className={styles.description}>
                            {event.description}
                        </div>
                    </div>
                    <div className={styles.poster}>
                        <Image
                            src={event.image}
                            height={400}
                            width={400}
                            alt={event.name}
                        />
                    </div>
                </main>
            </section>
        </PageLayout>
    );
}

export const getServerSideProps = async (context: any) => {
    const eventId = context.params.id;
    const docRef = doc(db, "events", eventId);

    const eventSnapshot = await getDoc(docRef);

    const event = {
        id: eventSnapshot.id,
        ...eventSnapshot.data(),
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
