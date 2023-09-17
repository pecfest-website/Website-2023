import React, { useState } from 'react';
import { Button, Container, Grid } from '@mui/material';
import EventCard from '../components/events/eventCard';
import styles from '@/styles/Events/events.module.css';
import animationData from '../assets/lottie/priateShip.json'
import PirateShipLottie from '@/components/events/shipLottieAnimation';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
}

const EventTypes = {
  cultural: 'cultural',
  technical: 'technical'
} 

const Events: React.FC = () => {
  const [eventType, setEventType] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  
  const defaultOption = {
    loop: false,
    autoplay: true,
    animationData: animationData
  }

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

  if (eventType == null) {
    return (
      <div>
        <Button onClick={() => setEventType(EventTypes.cultural)}>Cultural Events</Button>
        <Button onClick={() => setEventType(EventTypes.technical)}>Technical Events</Button>
      </div>
    );
  }

  if (events == null || events.length == 0) {
    return (
      <PirateShipLottie onComplete={() => {fetchEvents()}} />
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

export default Events;
