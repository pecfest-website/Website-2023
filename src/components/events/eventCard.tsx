// components/EventCard.tsx
import React, { useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import ModalContainer from "./ModalContainer/ModalContainer.js";
import styles from "@/styles/Events/eventCard.module.css";

interface Event {}

interface EventCardProps {
  id: number;
  title: string;
  event_date: string;
  location: string;
  tags: string[];
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  event_date,
  location,
  tags,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <ModalContainer
        isOpen={open}
        close={() => setOpen(false)}
        className=""
        padding={0}
      >
        Details of the event and registration
      </ModalContainer>
      <div className={styles.eventCardContainer}>
        <div className={styles.eventCardGlossContainer}></div>

        <div
          className={styles.posterContainer}
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1682686578289-cf9c8c472c9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <div className={styles.eventData}>
          <div className={styles.eventDetailContainer}>
            <div className={styles.eventName}>{title}</div>
            <div className={styles.tags}>
              {tags.map((tag, index) => (
                <>
                  <div className={styles.tagList}>{tag}</div>
                  {index < tags.length - 1 && (
                    <span className={styles.seperator}></span>
                  )}
                </>
              ))}
            </div>

            <div className={styles.eventDate}>
              <div className="content">{event_date}</div>
              <Button
                variant="contained"
                sx={{
                  margin: 0,
                  padding: 0,
                  color: "white",
                  fontWeight: "bold",
                  backgroundColor: "#EB5353",
                }}
                onClick={(e) => setOpen(true)}
              >
                More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
