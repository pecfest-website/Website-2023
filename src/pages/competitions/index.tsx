import React, { ReactNode, useState } from "react";
import { Button, Container, Grid, Stack } from "@mui/material";
import styles from "@/styles/Events/events.module.css";
import PirateShipLottie from "@/components/events/shipLottieAnimation";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import PageLayout from "@/components/layout/PageLayout";
import EventCard from "@/components/events/eventCard";
import { useRouter } from "next/router";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@react-three/drei";
import Chip from "@mui/material/Chip";
import { Event } from "@/types/Event";
import { collection, doc, getDocs, or, query, where } from "firebase/firestore";
import { db } from "@/serverless/firebase";
import LoyaltyIcon from '@mui/icons-material/Loyalty';

interface EventPageProps {
  competitions: Event[];
}

// Remove this temporary event card
const TempEventCard = ({name}: {name: string;}) => {
  return (<div className={styles.tempEventCardContainer}>
    <div style={{ height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      pages/competitions/index.tsx (Line 51)
    </div>
    <div>
      <h1>{name}</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, voluptatem in illum dolorem, debitis maiores delectus rem porro, ea voluptatibus facere aliquid incidunt nobis impedit sapiente itaque. Optio, placeat libero.
      </p>
      <p>Remove styles/Events/events.module.css last class .tempEventCardContainer</p>
      <p>Date - Date</p>
    </div>
  </div>)
}

function Events({ competitions }: EventPageProps) {
  const [eventType, setEventType] = useState<string>('Cultural');
  const [events, setEvents] = useState<Event[]>([]);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [tags, setTags] = useState(getTagsList());

  // if (selectedTags.has(tagName)) { show event card }
  // Also check eventType (for cultural and technical)
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set<string>());

  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    if (newValue === 0) {
      setEventType('Cultural');
    } else {
      setEventType('Technical');
    }
  };

  return (
    <PageLayout title="Competitions | Pecfest'23">
      <Container className={styles.cover} maxWidth={false}>
        <div className={styles.tabContainer}>
          <Tabs
            value={tabIndex}
            onChange={handleChange}
          >
            <Tab label="Cultural Events" sx={tabIndex === 1 ? {} : {fontSize: '32px', fontFamily: 'sans-serif', fontWeight: 700}} />
            <Tab label="Technical Events" sx={tabIndex === 0 ? {} : {fontSize: '32px', fontFamily: 'sans-serif', fontWeight: 700, maxWidth: '500px'}} />
          </Tabs>
        </div>

        {/* <h1 className={styles.eventHeading}>
          {eventType.charAt(0).toUpperCase() + eventType.slice(1)} Events
        </h1> */}

        <div className={styles.container}>
          <div className={styles.tagContainer}>
            <div className={`${styles.tagBox} glassmorphism-light`}>
              <p className={styles.tagHeading}>Select Tags to Filter</p>
              <div className={styles.tags}>
                {tags.map((tag, id) => (
                  <Chip
                    key={id}
                    variant={tag.isSelected ? 'filled' : 'outlined'}
                    label={tag.name}
                    color={tag.isSelected ? 'info' : 'primary'}
                    icon={<LoyaltyIcon />}
                    clickable
                    sx={{ mr: 1, fontWeight: 600 }}

                    onClick={() => {
                      const add = !tag.isSelected;
                      let newTags = [...tags];
                      newTags[tag.id] = {
                        ...newTags[tag.id],
                        isSelected: add
                      };
                      setTags(newTags);
                      let newSelectedTags = new Set<string>(selectedTags);
                      if (add) {
                        newSelectedTags.add(tag.name);
                      } else {
                        newSelectedTags.delete(tag.name);
                      }

                      setSelectedTags(newSelectedTags);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className={styles.eventCards}>
            {competitions.filter((competition) => competition.category === eventType).filter((competition) => filterByTags(selectedTags, competition)).map((x, i) =>
              <TempEventCard key={i} name={x.name} />
            )}
          </div>
        </div>
      </Container>
    </PageLayout>
  );
}

export default Events;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const colRef = query(
    collection(db, "events"),
    or(
      where("category", "==", "Technical"),
      where("category", "==", "Cultural")
    )
  );

  const comps = await getDocs(colRef);

  // const competitions = comps.docs.map((doc) => {
  //     return {
  //         id: doc.id,
  //         ...doc.data(),
  //     };
  // });

  // TODO : Remove lower code
  const competitions = [
    {
      id: "H6C0GfOu7hXlbuNy085b",
      pocName: "John Doe",
      adminEmail: "admin@pecfest.org",
      startDate: "2023-10-12T02:06:00+05:30",
      image: "https://firebasestorage.googleapis.com/v0/b/pecfest-23.appspot.com/o/events%2FDummy%20event%202.png?alt=media&token=fc0dfdc8-f953-4001-99c2-c61d86fb309b",
      endDate: "2023-10-27T23:50:00+05:30",
      tags: ["Coding", "Hardware"],
      type: "Team",
      ruleBook:
        "https://docs.google.com/document/d/10flyp_CVGi4BeIJRnF0TXTsWAGG8HN27hSwp8KI6uN0/edit#heading=h.bgret88b62o7",
      category: "Technical",
      name: "Dummy event 2",
      minTeamSize: "3",
      description:
        "Some technical event \n" +
        "\n" +
        "Renowned event of something big. Making para bigger by writing anything. lorem ipsum.",
      venue: "Main Arena",
      maxTeamSize: "8",
      pocNumber: "987654321",
    },
    {
      id: "tge4HsrW7V8ld7eoLjfq",
      startDate: "2023-10-05T00:00:00+05:30",
      pocNumber: "34567899",
      ruleBook:
        "https://docs.google.com/document/d/10flyp_CVGi4BeIJRnF0TXTsWAGG8HN27hSwp8KI6uN0/edit#heading=h.bgret88b62o7",
      venue: "Main Arena",
      minTeamSize: 1,
      name: "Dummy event 1",
      maxTeamSize: 1,
      endDate: "2023-10-26T00:00:00+05:30",
      adminEmail: "admin@pecfest.org",
      category: "Cultural",
      tags: ["Dance", "Music"],
      pocName: "jane doe",
      description: "bcd xyz",
      type: "Individual",
      image: "https://firebasestorage.googleapis.com/v0/b/pecfest-23.appspot.com/o/events%2FDummy%20event%201.png?alt=media&token=451014c3-9391-473e-ac03-693971e01dce",
    },
  ];

  return {
    props: {
      competitions,
    },
  };
}

const filterByTags = (selectedTags: Set<string>, event: Event) => {
  let show = false;
  for (let key of selectedTags) {
    for (let tag of event.tags) {
      if (tag === key) show = true;
    }
  }

  return show;
}

const getTagsList = () => {
  return [
    {
      name: "Dance",
      isSelected: false,
      id: 0,
    },
    {
      name: "Music",
      isSelected: false,
      id: 1,
    },
    {
      name: "Coding",
      isSelected: false,
      id: 2,
    },
    {
      name: "Hardware",
      isSelected: false,
      id: 3,
    },
    {
      name: "Dramatics",
      isSelected: false,
      id: 4,
    },
    {
      name: "Gaming",
      isSelected: false,
      id: 5,
    },
    {
      name: "Cinematography",
      isSelected: false,
      id: 6,
    },
    {
      name: "Literary",
      isSelected: false,
      id: 7,
    },
    {
      name: "Quiz",
      isSelected: false,
      id: 8,
    },
    {
      name: "Art",
      isSelected: false,
      id: 9,
    },
    {
      name: "Photography",
      isSelected: false,
      id: 10,
    },
  ]
}