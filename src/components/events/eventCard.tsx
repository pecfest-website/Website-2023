// components/EventCard.tsx
import React, { useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import ModalContainer from './ModalContainer/ModalContainer.js' 
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

function ItemSepWithDot(items: string[]) {
  var f = items?.length;
  f -= 1;
  const jsx_items = [];
  for (let i = 0; i < items?.length; i++) {
    jsx_items.push(
      <div key={i} className="genre-list">
        {" "}
        {items[i]}
        <span className={f-- !== 0 ? `center-dot` : ``}></span>
      </div>
    );
  }
  return jsx_items;
}

const EventCard: React.FC<EventCardProps> = ({ data }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="movieCardContainer">
      <ModalContainer
        isOpen={open}
        close={() => setOpen(false)}
        className=''
        padding={0}
      >
        Details of the event and registration
      </ModalContainer>

      <div
        className="posterContainer"
        style={{
          backgroundImage: `url()`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h3>1200 registered </h3>
      </div>

      <div className="movieData">
        <div className="movieDetailContainer">
          <div className="movieName">{'title'}</div>
          <div className="genre">{ItemSepWithDot(['genres'])}</div>

          <div className="releaseDate">
            <div className="content">{'release_data'}</div>
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
  );
};

export default EventCard;

