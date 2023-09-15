// components/EventCard.tsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  // Add more event properties as needed
}

interface EventCardProps {
  data: Event;
}

const EventCard: React.FC<EventCardProps> = ({ data }) => {
  return (
    <Card className="bg-blue-200 border-blue-300 rounded-lg shadow-md">
      <CardContent>
        <Typography variant="h6" className="text-blue-800">
          {data.title}
        </Typography>
        <Typography variant="body2" className="text-blue-600">
          {data.date}
        </Typography>
        <Typography variant="body2" className="text-blue-600">
          {data.location}
        </Typography>
        {/* Add more event details as needed */}
      </CardContent>
    </Card>
  );
};

export default EventCard;

