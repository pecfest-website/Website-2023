import React, { ReactNode, useState } from 'react';
import { Button, Container, Grid } from '@mui/material';
import EventCard from '../components/events/eventCard';
import styles from '@/styles/Events/events.module.css';
import PirateShipLottie from '@/components/events/shipLottieAnimation';
import { GetServerSideProps } from 'next';
import LargeButton from '@/components/events/largeButton';
import PageLayout from '@/components/layout/PageLayout';

interface EventPageProps {
  isEventDoneEnv: string | null;
}

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  tags: string[];
}

const EventTypes = {
  cultural: 'cultural',
  technical: 'technical',
  megashows: 'megashows'
} 

function Events({ isEventDoneEnv }: EventPageProps){
  const [eventType, setEventType] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = async () => {
    console.log('fetch events')
    try {
        // Fetch events
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  if (!isEventDoneEnv) {
    return <PageLayout title='Events | Pecfest' noHeader>
      <PirateShipLottie loop={true} />
      <h1 className={styles.comingSoon}>Coming Soon</h1>
    </PageLayout>
  }

  if (eventType == null) {  
    return (
      <div className={styles.eventTypeButtonDiv}>
        {Object.keys(EventTypes).map((eventType) => (
            <LargeButton
              key={eventType}
              onClick={() => setEventType(eventType)}
              className={styles.eventTypeButton}
            >
              {eventType.charAt(0).toUpperCase() + eventType.slice(1)} Events
            </LargeButton>
          ))}
      </div>
    );
  }

  if (events == null || events.length == 0) {
    return (
      <PirateShipLottie loop={false} onComplete={() => {fetchEvents()}} />
    )
  }

  return (
    <Container>
      <h1 className="text-3xl font-bold mt-8 mb-4">
        {eventType.charAt(0).toUpperCase() + eventType.slice(1)} Events
      </h1>
      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid className={styles.card} item key={event.id} xs={12} sm={6} md={4}>
            <EventCard id={event.id} title={event.title} event_date={event.date} location={event.location} tags={event.tags}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<EventPageProps> = async () => {
  const isEventDoneEnv = process.env.EVENTS_DONE || null;
  return {
    props: {
      isEventDoneEnv,
    },
  };
};

export default Events;
