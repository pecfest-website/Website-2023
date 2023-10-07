import React, { useState } from "react";
import styles from "@/styles/Schedule/schedule.module.css";
import DayCard from "@/components/schedule/DayCard";
import ScheduleTable from "@/components/schedule/ScheduleTable";
import PageLayout from "@/components/layout/PageLayout";

function Schedule() {
    const [day, setDay] = useState(0);

    const setLocalDay = (day: any) => {
        setDay(day);
        sessionStorage.setItem("day", day);
    }
    return (
        <PageLayout title="Schedule | PECFEST'23">
            <div
                style={{
                    backgroundImage: "url(/FestPics/Schedulebg.jpeg)",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
                className={styles.scheduleWrapper}
            >
                <div
                    className={
                        styles.cardWrapper +
                        " " +
                        (day == 0 ? styles.unClicked : "")
                    }
                >
                    <div onClick={() => setLocalDay(1)}>
                        <DayCard dayNumber={1} />
                    </div>
                    <div onClick={() => setLocalDay(2)}>
                        <DayCard dayNumber={2} />
                    </div>
                    <div onClick={() => setLocalDay(3)}>
                        <DayCard dayNumber={3} />
                    </div>
                </div>

                {day ? <ScheduleTable /> : <></>}
            </div>
        </PageLayout>
    );
}

export default Schedule;
