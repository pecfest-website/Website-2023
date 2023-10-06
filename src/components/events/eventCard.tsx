import React, { useState } from "react";
import styles from "@/styles/Events/eventCard.module.css";

enum EventType {individual="Individual",team="Team"}
enum EventCategory {technical="Technical",cultural="Cultural",megashows="Megashows",workshop="Workshop"}
enum EventClubType {cultural="Cultural",technical="Technical"}

interface EventCardProps {
  id?: string;
  name?: string;
  type?: EventType;
  category?: EventCategory;
  description?: string;
  startDate?: string;
  endDate?: string;
  venue?: string;
  club?: string;
  clubType?: EventClubType;
  rulebook?: string;
  subcategory?: string[];
  image?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  name,
  type,
  category,
  description,
  startDate,
  endDate,
  venue,
  club,
  clubType,
  rulebook,
  subcategory,
  image
}) => {

  return (
    <div>
      <div className={styles.eventCardContainer}>
        <div className={styles.eventCardGlossContainer}></div>

        <div
          className={styles.posterContainer}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <div className={styles.eventData}>
          <div className={styles.eventDetailContainer}>
            <div className={styles.eventName}>{name}</div>
            <div className={styles.tags}>
              {subcategory?.map((category, index) => (
                <>
                  <div className={styles.tagList}>{category}</div>
                  {index < subcategory.length - 1 && (
                    <span className={styles.seperator}></span>
                  )}
                </>
              ))}
            </div>

            <div className={styles.eventDate}>
              <div className="content">{startDate} - {endDate}</div>
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
