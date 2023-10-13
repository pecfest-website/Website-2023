import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import styles from "@/styles/Schedule/schedule.module.css";
import { GetServerSidePropsContext } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/serverless/firebase";
import moment from "moment";
import {
    Calendar,
    Event as CalendarEvent,
    momentLocalizer,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css"; // calendar css
import { useRouter } from "next/router";
import CustomWeekView from "@/components/Schedule/CustomView";
import CustomWeek from "@/components/Schedule/old/CustomScheduleView";
import Tab from "@mui/material/Tab";
import { Box, Tabs } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";

const localizer = momentLocalizer(moment);

interface Props {
    schedule: EventProp[];
}

interface EventProp {
    start: number;
    end: number;
    title: string;
    resource: string[];
}

function Schedule({ schedule }: Props) {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    const getEvents = () => {
        return schedule.map((event) => {
            return {
                start: new Date(event.start),
                end: new Date(event.end),
                title: event.title,
                resource: event.resource,
            } as CalendarEvent;
        });
    };

    // see eventPropGetter
    const getEventClassByEvent = (event: CalendarEvent) => {
        let modifierStr = "";
        if (event.resource[0]) {
            const commitee = event.resource[0].replace(" ", "");
            modifierStr = `rbc-override-${commitee}`;
        }
        return {
            className: `rbc-override-event ${modifierStr}`,
        };
    };

    const router = useRouter();
    const handleSelectEvent = (event: CalendarEvent) => {
        router.push(`/events/${event.resource[1]}`);
    };

    return (
        <PageLayout title="Schedule | PECFEST'23">
            <main className={styles.main}>
                {/* <p className={styles.heading}>Have a look at our schedule</p> */}
                <div
                    // style={{ borderBottom: 3, borderRadius: 10 }}
                    className={`${styles.tab__container} glassmorphism-light`}
                >
                    <Tabs value={tabIndex} onChange={handleTabChange}>
                        <Tab
                            label={<p className={styles.tab__heading}>Day 1</p>}
                            sx={{
                                fontWeight: tabIndex === 0 ? 700 : 400,
                            }}
                        />
                        <Tab
                            label={<p className={styles.tab__heading}>Day 2</p>}
                            sx={{
                                fontWeight: tabIndex === 1 ? 700 : 400,
                            }}
                        />
                        <Tab
                            label={<p className={styles.tab__heading}>Day 3</p>}
                            sx={{
                                fontWeight: tabIndex === 2 ? 700 : 400,
                            }}
                        />
                    </Tabs>
                </div>

                <div className={styles.schedule}>
                    {tabIndex === 0 ? (
                        <Calendar
                            date={new Date(2023, 10, 3)}
                            onNavigate={(a, b, c) => {}}
                            timeslots={4}
                            localizer={localizer}
                            events={getEvents()}
                            className={styles.calendar}
                            popup={true}
                            onSelectEvent={handleSelectEvent}
                            startAccessor={(event) =>
                                new Date(event.start ?? Date.now())
                            }
                            endAccessor={(event) =>
                                new Date(event.end ?? Date.now())
                            }
                            eventPropGetter={getEventClassByEvent}
                            defaultView="day"
                            views={{
                                day: true,
                            }}
                            dayLayoutAlgorithm={"no-overlap"}
                        />
                    ) : tabIndex === 1 ? (
                        <Calendar
                            date={new Date(2023, 10, 4)}
                            onNavigate={(a, b, c) => {}}
                            timeslots={4}
                            localizer={localizer}
                            events={getEvents()}
                            className={styles.calendar}
                            popup={true}
                            onSelectEvent={handleSelectEvent}
                            startAccessor={(event) =>
                                new Date(event.start ?? Date.now())
                            }
                            endAccessor={(event) =>
                                new Date(event.end ?? Date.now())
                            }
                            eventPropGetter={getEventClassByEvent}
                            defaultView="day"
                            views={{
                                day: true,
                            }}
                            dayLayoutAlgorithm={"no-overlap"}
                        />
                    ) : (
                        <Calendar
                            onNavigate={(a, b, c) => {}}
                            date={new Date(2023, 10, 5)}
                            timeslots={4}
                            localizer={localizer}
                            events={getEvents()}
                            className={styles.calendar}
                            popup={true}
                            onSelectEvent={handleSelectEvent}
                            startAccessor={(event) =>
                                new Date(event.start ?? Date.now())
                            }
                            endAccessor={(event) =>
                                new Date(event.end ?? Date.now())
                            }
                            eventPropGetter={getEventClassByEvent}
                            defaultView="day"
                            views={{
                                day: true,
                            }}
                            dayLayoutAlgorithm={"no-overlap"}
                        />
                    )}
                </div>
            </main>
        </PageLayout>
    );
}
export default Schedule;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const colRef = collection(db, "events");
    const events = await getDocs(colRef);

    let schedule: EventProp[] = [];

    events.docs.map((doc) => {
        const startDate = Date.parse(doc.data().startDate);
        const endDate = Date.parse(doc.data().endDate);

        const event = {
            start: startDate,
            end: endDate,
            title: doc.data().name + " - " + doc.data().venue,
            resource: [doc.data().category, doc.id, doc.data().description],
        };

        schedule.push(event);
    });

    return {
        props: {
            schedule,
        },
    };
}

/*

*/
