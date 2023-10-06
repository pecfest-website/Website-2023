import React, { useState } from "react";
import styles from "@/styles/Events/eventCard.module.css";
import { Event } from "@/types/Event";

interface EventCardProps {
  event: Event
}

const EventCard: React.FC<EventCardProps> = ({
  event
}) => {

  return (
    <div>
      <div className={styles.eventCardContainer}>
        <div className={styles.eventCardGlossContainer}></div>

        <div
          className={styles.posterContainer}
          style={{
            backgroundImage: `url(${event.image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <div className={styles.eventData}>
          <div className={styles.eventDetailContainer}>
            <div className={styles.eventName}>{event.name}</div>
            <div className={styles.tags}>
              {event.tags?.map((category, index) => (
                <>
                  <div className={styles.tagList}>{category}</div>
                  {index < event.tags.length - 1 && (
                    <span className={styles.seperator}></span>
                  )}
                </>
              ))}
            </div>

            <div className={styles.eventDate}>
              <div className="content">{event.startDate} - {event.endDate}</div>
            </div>

            {/* <div className={styles.tags}>     
              {type} <span className={styles.seperator}></span>
              {category} <span className={styles.seperator}></span>
              {venue} <span className={styles.seperator}></span>
              {club} <span className={styles.seperator}></span>
              {clubType} <span className={styles.seperator}></span>
              <a href={rulebook}>Rulebook</a>
            </div>

            {description} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
