import React, { ReactNode, useState } from 'react';
import { Button, Container, Grid } from '@mui/material';
import EventCard from '../components/events/eventCard';
import styles from '@/styles/Events/events.module.css';
import PirateShipLottie from '@/components/events/shipLottieAnimation';
import { GetServerSideProps } from 'next';
import LargeButton from '@/components/events/largeButton';

interface EventPageProps {
  isEventDoneEnv: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
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
      // fetch and set events for the eventType
      setEvents([
        {
          id: 123,
          title: 'Megashow 1',
          date: '12/11/2023',
          location: 'PEC'
        },
        {
          id: 123,
          title: 'Megashow 2',
          date: '12/12/2023',
          location: 'PEC'
        }
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  if (isEventDoneEnv == 'false') {
    return <div>
      <h1>COMING SOON...</h1>
      <PirateShipLottie loop={true} onComplete={() => {fetchEvents()}} />
    </div>
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
      <h1 className="text-3xl font-bold mt-8 mb-4">Competitions</h1>
      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid className={styles.card} item key={event.id} xs={12} sm={6} md={4}>
            <EventCard data={event} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<EventPageProps> = async () => {
  const isEventDoneEnv = process.env.EVENTS_DONE || '';
  return {
    props: {
      isEventDoneEnv,
    },
  };
};

export default Events;
