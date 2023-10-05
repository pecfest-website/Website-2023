import React, { ReactNode, useState } from "react";
import { Button, Container, Grid } from "@mui/material";
import styles from "@/styles/Events/events.module.css";
import PirateShipLottie from "@/components/events/shipLottieAnimation";
import { GetServerSideProps } from "next";
import PageLayout from "@/components/layout/PageLayout";
import EventCard from "@/components/events/eventCard";
import { useRouter } from "next/router";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from "@react-three/drei";
import { tabsStyles, tabItemStyles } from "./appleTabs.styles";
import Chip from '@mui/material/Chip';

interface EventPageProps {
  isEventDoneEnv: string | null;
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

// Remove this temporary event card
const TempEventCard = () => {
  return (<div className={styles.tempEventCardContainer}>
    <div style={{ height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      Hi I am image
    </div>
    <div>
      <h1>Title</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, voluptatem in illum dolorem, debitis maiores delectus rem porro, ea voluptatibus facere aliquid incidunt nobis impedit sapiente itaque. Optio, placeat libero.</p>
      <p>Date - Date</p>
    </div>
  </div>)
}

function Events({ isEventDoneEnv }: EventPageProps) {
  const [eventType, setEventType] = useState<string>('Cultural');
  const [events, setEvents] = useState<Event[]>([]);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    if (newValue === 0) {
      setEventType('Cultural');
    } else {
      setEventType('Technical');
    }
  };

  const handleTagSelect = (e: any) => {
    alert("clicked on chip")
    console.info(e);
  }

  const fetchEvents = async () => {
    console.log("fetch events from competitions");
    try {
      // Fetch events
      setEvents([
        {
          id: "12",
          name: "Ideathon",
          startDate: new Date(),
          endDate: new Date(),
          venue: "PEC",
          subcategory: ["Coding", "Hardware"],
          type: EventType.team,
          club: "ACM",
          clubType: EventClubType.technical,
          category: EventCategory.cultural,
          rulebook:
            "https://docs.google.com/document/d/10flyp_CVGi4BeIJRnF0TXTsWAGG8HN27hSwp8KI6uN0/edit",
          description:
            "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
          image:
            "https://images.unsplash.com/photo-1682686578289-cf9c8c472c9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        },
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (isEventDoneEnv) {
    return (
      <PageLayout title="Competitions | Pecfest" noHeader>
        <div className={styles.cover}>
          <div className={styles.pirateShipContainer}>
            <PirateShipLottie loop={true} />
          </div>
          <h1 className={styles.eventHeading}>Coming Soon</h1>
        </div>
      </PageLayout>
    );
  }

  if (events == null || events.length == 0) {
    return (
      <PirateShipLottie
        loop={false}
        onComplete={() => {
          fetchEvents();
        }}
      />
    );
  }

  return (
    <PageLayout title="Competitions | Pecfest'23">
      <Container className={styles.cover}>
        <div className={styles.tabContainer}>
          <Tabs value={tabIndex} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Cultural Events" />
            <Tab label="Technical Events" />
          </Tabs>
        </div>

        <h1 className={styles.eventHeading}>
          {eventType.charAt(0).toUpperCase() + eventType.slice(1)} Events
        </h1>

        <div className={styles.container}>
          <div className={styles.tagsBox}>
            {tags.map((tag, id) => (
              <Button
                variant="text"
                sx={{mr: 1}}
                key={id}
              > {tag} </Button>
            ))}
          </div>

          <div className={styles.eventCards}>
            {[...Array(10)].map((x, i) =>
              <TempEventCard key={i} />
            )}
          </div>
        </div>

        {/* <Grid container spacing={3}>
            {events.map((event) => (
              <Grid
                className={styles.card}
                item
                key={event.id}
                xs={12}
                sm={6}
                md={4}
                onClick={() => {
                  router.push({
                    pathname: `competitions/${event.id}`,
                  });
                }}
              >
                <EventCard
                  id={event?.id}
                  name={event?.name}
                  type={event?.type}
                  category={event?.category}
                  description={event?.description}
                  startDate={event?.startDate}
                  endDate={event?.endDate}
                  venue={event?.venue}
                  club={event?.club}
                  clubType={event?.clubType}
                  rulebook={event?.rulebook}
                  subcategory={event?.subcategory}
                  image={event?.image}
                />
              </Grid>
            ))}
          </Grid> */}
      </Container>
    </PageLayout>
  );
}

export const getServerSideProps: GetServerSideProps<
  EventPageProps
> = async () => {
  const isEventDoneEnv = process.env.EVENTS_DONE || null;
  return {
    props: {
      isEventDoneEnv,
    },
  };
};

export default Events;

const tags = [
  "Dance",
  "Music",
  "Coding",
  "Hardware",
  "Photography",
  "Quiz",
  "Cinematography",
  "Art",
  "Literary",
  "Dramatics",
  "Gaming",
]