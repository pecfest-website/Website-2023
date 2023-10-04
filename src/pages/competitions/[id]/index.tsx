import EventCard from "@/components/events/eventCard";
import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "@/styles/Events/eventDetails.module.css";
import PageLayout from "@/components/layout/PageLayout";

interface EventDetailsProps {
  eventId: string;
}

enum EventType {
  individual = "Individual",
  team = "Team",
}
enum EventCategory {
  technical = "Technical",
  cultural = "Cultural",
  megashows = "Megashows",
  workshop = "Workshop",
}
enum EventClubType {
  cultural = "Cultural",
  technical = "Technical",
}

interface Event {
  id?: string;
  name?: string;
  type?: EventType;
  category?: EventCategory;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  venue?: string;
  club?: string;
  clubType?: EventClubType;
  rulebook?: string;
  subcategory?: string[];
  image?: string;
}

function EventDetails({ eventId }: EventDetailsProps) {
  const [event, setEvent] = useState<Event>({});

  useEffect(() => {
    const fetchEventById = async () => {
      // fetch the event by ID
      const sampleEvent: Event = {
        id: "1",
        name: "Sample Event",
        type: EventType.individual,
        category: EventCategory.technical,
        description: "This is a sample event description.",
        startDate: new Date("2023-10-10"),
        endDate: new Date("2023-10-12"),
        venue: "Sample Venue",
        club: "Sample Club",
        clubType: EventClubType.technical,
        rulebook: "https://example.com/sample-rulebook",
        subcategory: ["Coding", "Hardware"],
        image:
          "https://images.unsplash.com/photo-1682686578289-cf9c8c472c9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      };

      setEvent(sampleEvent);
    };

    fetchEventById();
  }, [eventId]);

  return (
    <PageLayout title={event?.name || "Competitions | PECFEST 2023"}>
      <Grid className={styles.cover}>
        <h1 className={styles.eventHeading}> {event?.name} </h1>
        <Grid className={styles.card} item xs={12} sm={6} md={4}>
          <EventCard
            id={event.id}
            name={event.name}
            type={event.type}
            category={event.category}
            description={event.description}
            startDate={event.startDate}
            endDate={event.endDate}
            venue={event.venue}
            club={event.club}
            clubType={event.clubType}
            rulebook={event.rulebook}
            subcategory={event.subcategory}
            image={event.image}
          />
        </Grid>
        <Grid className={styles.details} item xs={12} sm={6} md={4}>
          <h1 className={styles.detailsTitle}>
            <u>Competition Details</u>
          </h1>
          <p className={`${styles.tags} ${styles.details}`}>
            {event?.category} | {event?.type} | {event?.category} |{" "}
            {event?.venue} | {event?.club} | {event?.clubType}
          </p>

          <a className={styles.rulebookLink} href={event?.rulebook}>
            Rulebook
          </a>
          <br />
          <br />

          <p className={styles.description}>{event?.description}</p>
          <br />
          <Button className={styles.registerButton} variant="contained">
            Register
          </Button>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

export const getServerSideProps = async (context: any) => {
  const eventId = context.params.id;
  return {
    props: {
      eventId,
    },
  };
};

export default EventDetails;
