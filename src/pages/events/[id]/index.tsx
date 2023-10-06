import EventCard from "@/components/events/eventCard";
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, Grid, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "@/styles/Events/eventDetails.module.css";
import PageLayout from "@/components/layout/PageLayout";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/serverless/firebase";
import { Event } from "@/types/Event";
import Image from "next/image";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScheduleIcon from "@mui/icons-material/Schedule";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuBookIcon from "@mui/icons-material/MenuBook";

interface Registrant {
  name: string;
  userId: string;
  phoneNumber: number | null;
}

interface EventDetailsProps {
  event: Event;
}

function EventDetails({ event }: EventDetailsProps) {
  const defaultRegistrantObj: Registrant = {
    name: '',
    userId: '',
    phoneNumber: null,
  }

  const [open, setOpen] = useState(false);

  const [teamSize, setTeamSize] = useState<number>(1);
  const [teamName, setTeamName] = useState<string>('');
  const [formValues, setFormValues] = useState<Registrant[]>([defaultRegistrantObj]);
  const [error, setError] = useState(false);

  const handleTeamSizeChange = (e: any) => {
    let newTeamSize = e.target.value;
    const re = /[0-9]+/g;
    if (!(newTeamSize === '') && !re.test(newTeamSize)) return;

    setTeamSize(newTeamSize);
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
    for (let formValue of formValues) {
      if (formValue.name.length === 0
        || !formValue.phoneNumber
        || formValue.phoneNumber === 0
        || formValue.userId?.length === 0) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
        return;
      }
    }

    if (event.type == 'Team' && (teamName?.length === 0 || (teamSize ?? 0) > event.maxTeamSize || (teamSize ?? 0) < event.minTeamSize)) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }

    setError(false);
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

  const formatDate = () => {
    const s = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(new Date(Date.parse(event.startDate)));

    const e = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(new Date(Date.parse(event.endDate)));
    return `${s} - ${e}`;
  };

  const formatTime = () => {
    const s = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(Date.parse(event.startDate)));

    const e = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(Date.parse(event.endDate)));
    return `${s} - ${e}`;
  }

  const info = [
    {
      Icon: CalendarMonthIcon,
      text: formatDate(),
    },
    {
      Icon: ScheduleIcon,
      text: formatTime(),
    },
    {
      Icon: MyLocationIcon,
      text: event.venue,
    },
    {
      Icon: PhoneForwardedIcon,
      text: `${event.pocName} - ${event.pocNumber}`,
    },
    {
      Icon: GroupsIcon,
      text: `${event.minTeamSize} - ${event.maxTeamSize} members`,
    },
    {
      Icon: MenuBookIcon,
      link: event.ruleBook,
      text: "Rulebook",
    },
  ];

  return (
    <PageLayout title={`${event.name} | PECFEST'23`} darkHeader>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            Fill the details below to register for the event!
          </DialogContentText>
          <form onSubmit={handleSubmit}>

            {
              event.type === 'Team' && (
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
                    error={!(!teamSize || (teamSize >= event.minTeamSize && teamSize <= event.maxTeamSize))}
                    helperText={`Team size should be between ${event.minTeamSize} and ${event.maxTeamSize}`}
                    InputProps={{ inputProps: { min: event.minTeamSize, max: event.maxTeamSize } }}
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
            {error && (
              <span className={styles.errorText}>❌ One or more fields incorrectly filled!</span>
            )}
            <div style={{display: 'flex', justifyContent: "center", marginTop: '10px'}}>
              <Button onClick={handleClose} variant="contained" sx={{marginRight:'10px'}}>Cancel</Button>
              <Button onClick={handleSubmit} type='submit' variant="contained">Register</Button>
            </div>

          </form>
        </DialogContent>
      </Dialog>
      <section className={styles.background}>
        <main className={`${styles.main}`}>
          <div className={`${styles.details} glassmorphism-light`}>
            <h1>{event.name}</h1>
            <div className={styles.tag_badges}>
              {event.tags.map((tag, i) => {
                return (
                  <Chip
                    key={i}
                    label={tag}
                    size="small"
                    color="error"
                  />
                );
              })}
            </div>
            <div className={styles.details__info}>
              {info.map(({ text, Icon, link }, i) => {
                if (i == 4 && event.type === "Individual") {
                  return null;
                }
                if (link) {
                  return (
                    <div
                      key={i}
                      className={
                        styles.details__info__line
                      }
                    >
                      <Icon />
                      <a
                        href={link}
                        target="_blank"
                        referrerPolicy="no-referrer"
                      >
                        {text}
                      </a>
                    </div>
                  );
                }
                return (
                  <div
                    key={i}
                    className={styles.details__info__line}
                  >
                    <Icon />
                    <span>{text}</span>
                  </div>
                );
              })}
            </div>

            <Button variant="contained" onClick={() => { setOpen(true) }}>Register</Button>
            <hr className={styles.line} />

            <div className={styles.description}>
              {event.description}
            </div>
          </div>
          <div className={styles.poster}>
            <Image
              src={event.image}
              height={400}
              width={400}
              alt={event.name}
            />
          </div>
        </main>
      </section>
    </PageLayout>
  );
}

export const getServerSideProps = async (context: any) => {
  const eventId = context.params.id;
  const docRef = doc(db, "events", eventId);

  const eventSnapshot = await getDoc(docRef);

  const event = {
    id: eventSnapshot.id,
    ...eventSnapshot.data(),
  };

  if (eventSnapshot.data() == null) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      event,
    },
  };
};

export default EventDetails;
