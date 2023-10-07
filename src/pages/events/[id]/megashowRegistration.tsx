import PageLayout from "@/components/layout/PageLayout";
import { db, storage } from "@/serverless/firebase";
import { Event } from "@/types/Event";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import styles from "@/styles/Events/eventRegistration.module.css";
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { DropzoneArea } from "mui-file-dropzone";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { getSession } from "next-auth/react";

interface EventDetailsProps {
    event: Event;
}

interface Registrant {
    name: string;
    userId: string;
    phoneNumber: string | null;
}

interface FormValues {
    registrants: Registrant[];
    paymentProof: any | null;
    dropzoneKey: 1;
}

function MegashowRegisteration({ event }: EventDetailsProps) {
    const defaultRegistrantObj: FormValues = {
        registrants: [{ name: "", userId: "", phoneNumber: null }],
        paymentProof: null,
        dropzoneKey: 1,
    };

    const [teamSize, setTeamSize] = useState<number>(1);
    const [teamName, setTeamName] = useState<string>("");
    const [formValues, setFormValues] =
        useState<FormValues>(defaultRegistrantObj);

    const [loading, setLoading] = useState(false);
    const [eventCreationStatus, setEventCreationStatus] = useState<
        string | null
    >(null);
    const handleTeamSizeChange = (e: any) => {
        let newTeamSize = e.target.value;
        const re = /[0-9]+/g;
        if (!(newTeamSize === "") && !re.test(newTeamSize)) return;

        setTeamSize(newTeamSize);
        let registrantDetails = [...formValues.registrants];

        while (registrantDetails.length > newTeamSize) {
            registrantDetails.pop();
        }

        while (registrantDetails.length < newTeamSize) {
            registrantDetails.push(defaultRegistrantObj.registrants[0]);
        }

        setFormValues({ ...formValues, registrants: registrantDetails });
    };

    const handleImageChange = (event: File[]) => {
        const img = document.createElement("img");
        if (event && "length" in event && event[length]) {
            img.onload = function (ev) {
                setFormValues({
                    ...formValues,
                    paymentProof: event[0],
                });
            };
            img.src = URL.createObjectURL(event[0]);
        }
    };

    const uploadImage = async () => {
        const storageRef = ref(
            storage,
            `registrations/megashows/${event.name}/${teamName}_payment.jpeg`
        );
        await uploadBytes(storageRef, formValues.paymentProof, {
            contentType: "image/jpeg",
        });
        const downloadUrl = await getDownloadURL(storageRef);
        return downloadUrl;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true)
        let eventPosterUrl = "";
        if (formValues.paymentProof) {
            eventPosterUrl = await uploadImage();
        }

        console.log(formValues);
        console.log(eventPosterUrl)
        setLoading(false)
    };

    const handleSnackbarClose = () => {
        setEventCreationStatus(null);
    };

    return (
        <PageLayout title={`${event.name} Registeration | PECFEST'23`}>
            <main className={styles.main}>
                <div
                    className={`${styles.registerationForm} glassmorphism-light`}
                >
                    <h1>{event.name}</h1>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Team Name"
                            type="text"
                            fullWidth
                            variant="outlined"
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
                            variant="outlined"
                            required={true}
                            value={teamSize}
                            onChange={handleTeamSizeChange}
                            error={
                                !(
                                    !teamSize ||
                                    teamSize > event.maxTeamSize ||
                                    teamSize < event.minTeamSize
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

                        {formValues.registrants.map((_, id) => (
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
                                    value={formValues.registrants[id].name}
                                    onChange={(e: any) => {
                                        let newFormValues = [
                                            ...formValues.registrants,
                                        ];
                                        newFormValues[id].name = e.target.value;
                                        setFormValues({
                                            ...formValues,
                                            registrants: newFormValues,
                                        });
                                    }}
                                />
                                <TextField
                                    variant="outlined"
                                    key={`person-${id}-userId`}
                                    name={`person-${id}-userId`}
                                    label={`Person-${id + 1} UserId`}
                                    sx={{ my: 1 }}
                                    fullWidth
                                    required
                                    value={formValues.registrants[id].userId}
                                    onChange={(e: any) => {
                                        let newFormValues = [
                                            ...formValues.registrants,
                                        ];
                                        newFormValues[id].userId =
                                            e.target.value;
                                        setFormValues({
                                            ...formValues,
                                            registrants: newFormValues,
                                        });
                                    }}
                                />
                                <TextField
                                    variant="outlined"
                                    key={`person-${id}-phoneNumber`}
                                    name={`person-${id}-phoneNumber`}
                                    label={`Person-${id + 1} PhoneNumber`}
                                    sx={{ my: 1 }}
                                    fullWidth
                                    required
                                    value={
                                        formValues.registrants[id].phoneNumber
                                    }
                                    onChange={(e: any) => {
                                        let newFormValues = [
                                            ...formValues.registrants,
                                        ];
                                        newFormValues[id].phoneNumber =
                                            e.target.value;
                                        setFormValues({
                                            ...formValues,
                                            registrants: newFormValues,
                                        });
                                    }}
                                />
                            </div>
                        ))}

                        <div className={styles.dropzoneArea}>
                            <DropzoneArea
                                acceptedFiles={["image/jpeg"]}
                                dropzoneText={"Attach Payment Proof"}
                                filesLimit={1}
                                Icon={UploadFileIcon}
                                maxFileSize={204800}
                                clearOnUnmount
                                key={formValues.dropzoneKey}
                                fileObjects={undefined}
                                onChange={handleImageChange}
                            />
                        </div>

                        <Button type="submit" variant="contained">
                            Submit
                        </Button>
                    </form>
                </div>
                <Snackbar
                    open={eventCreationStatus ? true : false}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                >
                    <Alert
                        onClose={handleSnackbarClose}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        {eventCreationStatus}
                    </Alert>
                </Snackbar>
            </main>
        </PageLayout>
    );
}

export default MegashowRegisteration;

export const getServerSideProps = async (context: any) => {
    const { req } = context;
    const session = await getSession({ req });

    const eventId = context.params.id;
    const docRef = doc(db, "events", eventId);

    const eventSnapshot = await getDoc(docRef);

    const eventColRef = query(
        collection(db, `registrations/${session?.user.email}/events`),
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
        },
    };
};
