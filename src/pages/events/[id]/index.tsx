import EventCard from "@/components/events/eventCard";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "@/styles/Events/eventDetails.module.css";
import PageLayout from "@/components/layout/PageLayout";

interface Registrant {
  name: string;
  userId: string;
  phoneNumber: number | null;
}

interface EventDetailsProps {
  eventId: string;
}

interface Event {
  id?: string;
  name?: string;
  type: EventType;
  category?: EventCategory;
  description?: string;
  startDate?: string;
  endDate?: string;
  venue?: string;
  club?: string;
  clubType?: EventClubType;
  rulebook?: string;
  subcategory?: string[];
  image?: string;
  minTeamSize: number;
  maxTeamSize: number;
  pocName: string;
  pocNumber: string;
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

function EventDetails({ eventId }: EventDetailsProps) {
  const defaultRegistrantObj: Registrant = {
    name: '',
    userId: '',
    phoneNumber: null,
  }

  const [event, setEvent] = useState<Event>({
    id: "1",
    name: "Sample Event",
    type: EventType.team,
    category: EventCategory.technical,
    description: "This is a sample event description.",
    startDate: "2023-10-10",
    endDate: "2023-10-12",
    venue: "Sample Venue",
    clubType: EventClubType.technical,
    rulebook: "https://example.com/sample-rulebook",
    subcategory: ["Coding", "Hardware"],
    image:
      "https://images.unsplash.com/photo-1682686578289-cf9c8c472c9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    minTeamSize: 2,
    maxTeamSize: 4,
    pocName: "John Doe",
    pocNumber: "987654332211"
  });

  const [open, setOpen] = useState(false);

  const [teamSize, setTeamSize] = useState(1);
  const [teamName, setTeamName] = useState<string>();
  const [formValues, setFormValues] = useState<Registrant[]>([defaultRegistrantObj]);

  const handleTeamSizeChange = (event: any) => {
    let newTeamSize = event.target.value;
    setTeamSize(newTeamSize);

    if (newTeamSize < event.minTeamSize || newTeamSize > event.maxTeamSize) {
      return;
    }

    let registrantDetails = [...formValues];

    while (registrantDetails.length > newTeamSize) {
      registrantDetails.pop();
    }

    while (registrantDetails.length < newTeamSize) {
      registrantDetails.push(defaultRegistrantObj);
    }

    setFormValues(registrantDetails);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSubmit = () => {
    console.log(formValues)
    for (let formValue of formValues) {
      if (formValue.name?.length === 0
          || !formValue.phoneNumber 
          || formValue.phoneNumber === 0
          || formValue.userId?.length === 0) {
          
        console.log(formValue)
        return;
      }
    }
    const registrantData = {
      teamName: teamName,
      teamSize: teamSize,
      usersData: formValues
    }

    console.log(registrantData);
    formValues.fill(defaultRegistrantObj);
    setTeamSize(1);
    setTeamName('');
    setOpen(false);
  }

  useEffect(() => {
    const fetchEventById = async () => {
      // fetch the event by ID
      const sampleEvent: Event = {
        id: "1",
        name: "Sample Event",
        type: EventType.team,
        category: EventCategory.technical,
        description: "This is a sample event description.",
        startDate: "2023-10-10",
        endDate: "2023-10-12",
        venue: "Sample Venue",
        clubType: EventClubType.technical,
        rulebook: "https://example.com/sample-rulebook",
        subcategory: ["Coding", "Hardware"],
        image:
          "https://images.unsplash.com/photo-1682686578289-cf9c8c472c9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        minTeamSize: 2,
        maxTeamSize: 4,
        pocName: "John Doe",
        pocNumber: "987654332211"
      };

      setEvent(sampleEvent);
    };

    fetchEventById();
  }, [eventId]);

  return (
    <PageLayout title={event?.name || "Events | PECFEST 2023"}>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            Fill the details below to register for the event!
          </DialogContentText>
          {
            event.type === EventType.team && (
              <div>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Team Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  required
                  value={teamName}
                  onChange={(event: any) => { setTeamName(event.target.value); }}
                />

                <TextField
                  autoFocus
                  margin="dense"
                  label="Team Size"
                  type="number"
                  fullWidth
                  variant="standard"
                  required={true}
                  value={teamSize}
                  onChange={handleTeamSizeChange}
                  error={teamSize < event.minTeamSize || teamSize > event.maxTeamSize}
                  helperText={`Team size should be between ${event.minTeamSize} and ${event.maxTeamSize}`}
                />
              </div>
            )}

          {
            formValues.map((_, id) => (
              <div key={id} style={{ borderBottom: '1px solid orange', padding: '10px' }}>
                <TextField
                  key={`person-${id}-id`}
                  name={`person-${id}-id`}
                  variant='outlined' 
                  label={`Person-${id + 1} Name`} 
                  sx={{ my: 1 }} 
                  fullWidth required
                  value={formValues[id].name}
                  onChange={(e: any) => {
                    let newFormValues = [...formValues];
                    newFormValues[id].name = e.target.value;
                    console.log(id)
                    setFormValues(newFormValues);
                  }}
                />
                <TextField 
                  variant='outlined' 
                  key={`person-${id}-userId`}
                  name={`person-${id}-userId`}
                  label={`Person-${id + 1} UserId`} 
                  sx={{ my: 1 }} 
                  fullWidth required
                  value={formValues[id].userId}
                  onChange={(e: any) => {
                    let newFormValues = [...formValues];
                    newFormValues[id].userId = e.target.value;
                    setFormValues(newFormValues);
                  }}
                />
                <TextField 
                  variant='outlined' 
                  key={`person-${id}-phoneNumber`}
                  name={`person-${id}-phoneNumber`}
                  label={`Person-${id + 1} PhoneNumber`} 
                  sx={{ my: 1 }} 
                  type='number'
                  fullWidth required
                  value={formValues[id].phoneNumber}
                  onChange={(e: any) => {
                    let newFormValues = [...formValues];
                    newFormValues[id].phoneNumber = e.target.value;
                    setFormValues(newFormValues);
                  }}
                />
              </div>
            ))
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">Cancel</Button>
          <Button onClick={handleSubmit} type='submit' variant="contained">Register</Button>
        </DialogActions>
      </Dialog>
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
            <u>Event Details</u>
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
          <Button className={styles.registerButton} variant="contained" onClick={() => setOpen(true)}>
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
