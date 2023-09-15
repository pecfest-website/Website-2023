// pages/competitions.tsx
import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import EventCard from '../components/events/eventCard'; // You should create this component

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  // Add more event properties as needed
}

const Events: React.FC = () => {
  // State to store the array of event objects
  const [events, setEvents] = useState<Event[]>([]);

  // Simulate fetching data (replace with actual API call)
  useEffect(() => {
    // Replace this with your actual data fetching logic
    const fetchData = async () => {
      try {
        // Fetch your event data here and set it to the state
        // const response = await fetch('/api/events'); // Replace with your API endpoint
        // const data = await response.json();
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
    };

    fetchData();
  }, []);

  return (
    <Container>
      <h1 className="text-3xl font-bold mt-8 mb-4">Competitions</h1>
      <Grid container spacing={3}>
        {/* Map events to EventCard components */}
        {events.map((event) => (
          <Grid item key={event.id} xs={12} sm={6} md={4}>
            <EventCard data={event} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Events;
