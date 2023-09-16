import React, { useState } from "react";
import DayCard from "./DayCard";
import ScheduleTable from "./ScheduleTable";
import styles from "@/styles/Schedule/schedule.module.css"

function Schedule() {
    const [day, setDay] = useState(0);
    return (
        <div>
            <div className={styles.cardWrapper + ' ' + (day == 0 ? styles.unClicked : '')}>
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
        </div >
    );
}

export default Schedule;
