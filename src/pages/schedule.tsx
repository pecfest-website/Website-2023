import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import styles from "@/styles/Schedule/schedule.module.css";
import { GetServerSidePropsContext } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/serverless/firebase";
import { Event } from "@/types/Event";

interface Schedule {
    day1: Event[],
    day2: Event[],
    day3: Event[]
}
interface Props {
    schedule: Schedule
}

function Schedule({schedule}: Props) {

    return (
        <PageLayout title="Schedule | PECFEST'23">
            <main className={styles.main}>
                <div className={styles.schedule}></div>
            </main>
        </PageLayout>
    );
}
export default Schedule;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const colRef = collection(db, "events");
    const events = await getDocs(colRef);

    let schedule = {
        day1: [],
        day2: [],
        day3: [],
    } as Schedule;

    events.docs.map((doc) => {
        const date = new Date(Date.parse(doc.data().startDate));
        const day1 = new Date(Date.parse("2023-11-03"));
        const day2 = new Date(Date.parse("2023-11-04"));
        const day3 = new Date(Date.parse("2023-11-05"));

        if (date.getDay() == day1.getDay()) {
            schedule.day1.push(doc.data() as Event);
        } else if (date.getDay() == day2.getDay()) {
            schedule.day2.push(doc.data() as Event);
        } else if (date.getDay() == day3.getDay()) {
            schedule.day3.push(doc.data() as Event);
        }
    });

    return {
        props: {
            schedule,
        },
    };
}
