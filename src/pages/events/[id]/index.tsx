import EventCard from "@/components/events/eventCard";
import { Button, Grid } from "@mui/material";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import styles from "@/styles/Events/eventDetails.module.css";

interface EventDetailsProps {
  eventId: string;
}

function EventDetails({ eventId }: EventDetailsProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchEventById = async () => {
      // fetch the event by ID
      setTitle("sample");
      setDate("12/11/2023");
      setLocation("PEC Chandigarh");
      setTags(["conder", "heavy"]);
    };

    fetchEventById();
  }, [eventId]);
  return (
    <Grid className={styles.container}>
      <Grid className={styles.card} item xs={12} sm={6} md={4}>
        <EventCard
            id={eventId}
            title={title}
            event_date={date}
            location={location}
            tags={tags}
        />
      </Grid>

      <Grid className={styles.content} item xs={12} sm={6} md={4}>
        <h1>Sample Event Details</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        <br/>
        <Button variant="contained">Register</Button>
      </Grid>
    </Grid>
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
