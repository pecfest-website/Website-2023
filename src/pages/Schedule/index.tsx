import React, { useState } from "react";
import styles from "@/styles/Schedule/schedule.module.css";
import DayCard from "@/components/schedule/DayCard";
import ScheduleTable from "@/components/schedule/ScheduleTable";
import PageLayout from "@/components/layout/PageLayout";

function Schedule() {
    const [day, setDay] = useState(0);
    return (
        <PageLayout title="Schedule | PECFEST'23">
            <div
                style={{
                    backgroundImage: "url(/FestPics/Schedulebg.jpeg)",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div
                    className={
                        styles.cardWrapper +
                        " " +
                        (day == 0 ? styles.unClicked : "")
                    }
                >
                    <div onClick={() => setDay(1)}>
                        <DayCard dayNumber={1} />
                    </div>
                    <div onClick={() => setDay(2)}>
                        <DayCard dayNumber={2} />
                    </div>
                    <div onClick={() => setDay(3)}>
                        <DayCard dayNumber={3} />
                    </div>
                </div>

                {day ? <ScheduleTable dayNumber={day} /> : <></>}
            </div>
        </PageLayout>
    );
}

export default Schedule;
