import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import styles from "@/styles/Schedule/schedule.module.css";
import { GetServerSidePropsContext } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/serverless/firebase";
import {
    Calendar,
    Event as CalendarEvent,
    momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css"; // calendar css

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
            const commitee = event.resource[0];
            modifierStr = `rbc-override-${commitee}`;
        }
        return {
            className: `rbc-override-event ${modifierStr}`,
        };
    };

    const handleSelectEvent = (event: CalendarEvent) => {};

    return (
        <PageLayout title="Schedule | PECFEST'23">
            <main className={styles.main}>
                <div className={styles.schedule}>
                    <p className={styles.heading}>
                        Have a look at our calendar
                    </p>
                    <Calendar
                        defaultDate={new Date(2023, 10, 3)}
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
                        // view="agenda"
                        views={{
                            month: true,
                            week: true,
                            day: true,
                        }}
                        dayLayoutAlgorithm={"no-overlap"}
                    />
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
            title: doc.data().name,
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
