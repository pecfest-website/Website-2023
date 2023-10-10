import EventCard from "@/components/events/eventCard";
import {
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Grid,
    Stack,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import styles from "@/styles/Events/eventDetails.module.css";
import PageLayout from "@/components/layout/PageLayout";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { db } from "@/serverless/firebase";
import { Event } from "@/types/Event";
import Image from "next/image";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScheduleIcon from "@mui/icons-material/Schedule";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";

interface Registrant {
    name: string;
    userId: string;
    phoneNumber: number;
}

interface EventDetailsProps {
    event: Event;
    registered: boolean;
}

function EventDetails({ event, registered }: EventDetailsProps) {
    const defaultRegistrantObj: Registrant = {
        name: "",
        userId: "",
        phoneNumber: 0,
    };

    const [open, setOpen] = useState(false);

    const [teamSize, setTeamSize] = useState<number>(1);
    const [teamName, setTeamName] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [alreadyRegistered, setRegistered] = useState(registered);

    const [formValues, setFormValues] = useState<Registrant[]>([
        defaultRegistrantObj,
    ]);
    const [error, setError] = useState(false);

    const { data: session } = useSession();

    const router = useRouter();

    const handleClose = () => {
        setOpen(false);
    };

    const handleRegister = async () => {
        if (!session?.user) {
            router.push("/auth/signin");
            return;
        }
        if (event.category === "Mega Shows") {
            router.push(`/events/${event.id}/megashowRegistration`);
            return;
        }
        if (event.type === "Individual") {
            setLoading(true);
            // get user deets
            const userData = (
                await getDoc(
                    doc(db, "registrations", session?.user.email ?? "")
                )
            ).data();
            // add in event register
            await addDoc(collection(db, `events/${event.id}/registrations`), {
                // ["Team Name", "Name", "Email Id", "College", "Contact"],
                name: session.user.name,
                email: session.user.email,
                college: userData?.college,
                contact: userData?.mobile,
            });
            // add event in user register
            await addDoc(
                collection(db, `registrations/${session.user.email}/events`),
                {
                    name: event.name,
                    eventId: event.id,
                    eventImage: event.image,
                }
            );
            setLoading(false);
            setRegistered(true);
            return;
        } else {
            setOpen(true);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        for (let formValue of formValues) {
            if (
                formValue.name.length === 0 ||
                !formValue.phoneNumber ||
                formValue.phoneNumber === 0 ||
                formValue.userId?.length === 0
            ) {
                setError(true);
                setTimeout(() => {
                    setError(false);
                }, 3000);
                return;
            }
        }

        if (
            event.type == "Team" &&
            (teamName?.length === 0 ||
                (teamSize ?? 0) > event.maxTeamSize ||
                (teamSize ?? 0) < event.minTeamSize)
        ) {
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
            usersData: [...formValues],
        };

        // ["Team Name", "Name", "Email Id", "College", "Contact"],

        // add registration in events
        await addDoc(collection(db, `events/${event.id}/registrations`), {
            ...registrantData,
        });

        // add entry in user's events
        registrantData.usersData.map(async (userData) => {
            await addDoc(
                collection(db, `registrations/${userData.userId}/events`),
                {
                    name: event.name,
                    eventId: event.id,
                    eventImage: event.image,
                }
            );
        });

        setFormValues([defaultRegistrantObj]);
        setTeamSize(1);
        setTeamName("");
        setOpen(false);
        setRegistered(true);
        setLoading(false);
    };

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
    };

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
        <PageLayout title={`${event.name} | PECFEST'23`} >
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <DialogContentText>
                        Fill the details below to register for the event!
                    </DialogContentText>
                    <form onSubmit={handleSubmit}>
                        {event.type === "Team" && (
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
                                    onChange={(event: any) => {
                                        setTeamName(event.target.value);
                                    }}
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
                                    onChange={(e: any) => {
                                        let newTeamSize = e.target.value;
                                        const re = /[0-9]+/g;
                                        if (
                                            !(newTeamSize === "") &&
                                            !re.test(newTeamSize)
                                        )
                                            return;

                                        setTeamSize(newTeamSize);
                                        let registrantDetails = [...formValues];

                                        while (
                                            registrantDetails.length >
                                            newTeamSize
                                        ) {
                                            registrantDetails.pop();
                                        }

                                        while (
                                            registrantDetails.length <
                                            newTeamSize
                                        ) {
                                            registrantDetails.push(
                                                defaultRegistrantObj
                                            );
                                        }

                                        setFormValues(registrantDetails);
                                    }}
                                    error={
                                        !(
                                            !teamSize ||
                                            (teamSize >= event.minTeamSize &&
                                                teamSize <= event.maxTeamSize)
                                        )
                                    }
                                    helperText={`Team size should be between ${event.minTeamSize} and ${event.maxTeamSize}`}
                                    InputProps={{
                                        inputProps: {
                                            min: event.minTeamSize,
                                            max: event.maxTeamSize,
                                        },
                                    }}
                                />
                            </div>
                        )}

                        {formValues.map((_, id) => (
                            <div
                                key={id}
                                style={{
                                    borderBottom: "1px solid orange",
                                    padding: "10px",
                                }}
                            >
                                <TextField
                                    key={`person-${id}-id`}
                                    name={`person-${id}-id`}
                                    variant="outlined"
                                    label={`Person-${id + 1} Name`}
                                    sx={{ my: 1 }}
                                    fullWidth
                                    required
                                    value={formValues[id].name}
                                    onChange={(e: any) => {
                                        const updatedValue = {
                                            name: e.target.value,
                                            userId: formValues[id].userId,
                                            phoneNumber:
                                                formValues[id].phoneNumber,
                                        };
                                        const newFormValues = [
                                            ...formValues.slice(0, id),
                                            updatedValue,
                                            ...formValues.slice(id + 1),
                                        ];
                                        setFormValues(newFormValues);
                                    }}
                                />
                                <TextField
                                    variant="outlined"
                                    key={`person-${id}-emailId`}
                                    name={`person-${id}-emailId`}
                                    label={`Person-${id + 1} Email Id`}
                                    sx={{ my: 1 }}
                                    fullWidth
                                    required
                                    value={formValues[id].userId}
                                    onChange={(e: any) => {
                                        const updatedValue = {
                                            name: formValues[id].name,
                                            userId: e.target.value,
                                            phoneNumber:
                                                formValues[id].phoneNumber,
                                        };
                                        const newFormValues = [
                                            ...formValues.slice(0, id),
                                            updatedValue,
                                            ...formValues.slice(id + 1),
                                        ];
                                        setFormValues(newFormValues);
                                    }}
                                />
                                <TextField
                                    variant="outlined"
                                    key={`person-${id}-phoneNumber`}
                                    name={`person-${id}-phoneNumber`}
                                    label={`Person-${id + 1} PhoneNumber`}
                                    sx={{ my: 1 }}
                                    type="number"
                                    fullWidth
                                    required
                                    value={formValues[id].phoneNumber}
                                    onChange={(e: any) => {
                                        const updatedValue = {
                                            name: formValues[id].name,
                                            userId: formValues[id].userId,
                                            phoneNumber: e.target.value,
                                        };
                                        const newFormValues = [
                                            ...formValues.slice(0, id),
                                            updatedValue,
                                            ...formValues.slice(id + 1),
                                        ];
                                        setFormValues(newFormValues);
                                    }}
                                />
                            </div>
                        ))}
                        {error && (
                            <span className={styles.errorText}>
                                ❌ One or more fields incorrectly filled!
                            </span>
                        )}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "10px",
                            }}
                        >
                            <Button
                                onClick={handleClose}
                                variant="contained"
                                sx={{ marginRight: "10px" }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                type="submit"
                                variant="contained"
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Register"}
                            </Button>
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

                        <Button
                            variant="contained"
                            onClick={() => {
                                handleRegister();
                            }}
                            disabled={loading || alreadyRegistered}
                        >
                            {loading
                                ? "Loading..."
                                : alreadyRegistered
                                ? "Registered"
                                : "Register"}
                        </Button>
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

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { req } = context;
    const session = await getSession({ req });

    const eventId = context.params?.id ?? "";
    const docRef = doc(db, `events/${eventId}`);

    const eventSnapshot = await getDoc(docRef);

    const eventColRef = query(
        collection(db, `registrations/${session?.user?.email ?? "e"}/events`),
        where("eventId", "==", eventId)
    );
    const eventRegData = (await getDocs(eventColRef)).docs.length;
    let registered = false;

    if (eventRegData > 0) {
        registered = true;
    }

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
            registered,
        },
    };
};

export default EventDetails;
