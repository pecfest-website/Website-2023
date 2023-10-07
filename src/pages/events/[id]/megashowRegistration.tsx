import PageLayout from "@/components/layout/PageLayout";
import { db, storage } from "@/serverless/firebase";
import { Event } from "@/types/Event";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import React, { useState } from "react";
import styles from "@/styles/Events/eventRegistration.module.css";
import {
    Alert,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { DropzoneArea } from "mui-file-dropzone";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { getSession } from "next-auth/react";
import { bankDetails } from "@/data/paymentDetails";

interface EventDetailsProps {
    event: Event;
    registered: boolean;
}

interface Registrant {
    name: string;
    userId: string;
    phoneNumber: number;
}

interface FormValues {
    registrants: Registrant[];
    paymentProof: any | null;
    dropzoneKey: 1;
}

function MegashowRegisteration({ event, registered }: EventDetailsProps) {
    const defaultRegistrantObj: FormValues = {
        registrants: [{ name: "", userId: "", phoneNumber: 0 }],
        paymentProof: null,
        dropzoneKey: 1,
    };

    const [teamSize, setTeamSize] = useState<number>(event.minTeamSize);
    const [teamName, setTeamName] = useState<string>("");
    const [formValues, setFormValues] =
        useState<FormValues>(defaultRegistrantObj);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [alreadyRegistered, setRegistered] = useState(registered);
    const [open, setOpen] = useState(false);

    const [eventCreationStatus, setEventCreationStatus] = useState<
        string | null
    >(null);

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
        setLoading(true);

        for (let formValue of formValues.registrants) {
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
                setLoading(false);
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
            setLoading(false);
            return;
        }

        setError(false);

        let eventPaymentUrl = "";
        if (formValues.paymentProof) {
            eventPaymentUrl = await uploadImage();
        }

        const registrantData = {
            teamName: teamName,
            teamSize: teamSize,
            usersData: [...formValues.registrants],
            paymentProof: eventPaymentUrl,
        };

        console.log(registrantData);

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

        setFormValues(defaultRegistrantObj);
        setTeamSize(1);
        setTeamName("");
        setRegistered(true);
        setLoading(false);
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
                    <Button variant="contained" onClick={() => setOpen(true)}>
                        Payment Details
                    </Button>
                    <Dialog open={open} onClose={() => setOpen(false)}>
                        <DialogContent>
                            <DialogContentText>
                                Bank details for payment.
                            </DialogContentText>
                            <DialogContentText>
                                Do bank transfer before registration and upload
                                the proof here.
                            </DialogContentText>
                            <Typography>
                                Account Number : {bankDetails.accountNumber}
                            </Typography>
                            <Typography>GSTIN : {bankDetails.gst}</Typography>
                            <Typography>
                                IFSC Code : {bankDetails.ifscCode}
                            </Typography>
                            <Typography>
                                Code of Bank : {bankDetails.codeOfBank}
                            </Typography>
                            <Typography>
                                Branch Code : {bankDetails.branchCode}
                            </Typography>
                        </DialogContent>
                    </Dialog>
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
                            onChange={(e: any) => {
                                let newTeamSize = e.target.value;
                                const re = /[0-9]+/g;
                                if (
                                    !(newTeamSize === "") &&
                                    !re.test(newTeamSize)
                                )
                                    return;

                                setTeamSize(newTeamSize);
                                let registrantDetails = [
                                    ...formValues.registrants,
                                ];

                                while (registrantDetails.length > newTeamSize) {
                                    registrantDetails.pop();
                                }

                                while (registrantDetails.length < newTeamSize) {
                                    registrantDetails.push(
                                        defaultRegistrantObj.registrants[0]
                                    );
                                }

                                setFormValues({
                                    dropzoneKey: formValues.dropzoneKey,
                                    registrants: registrantDetails,
                                    paymentProof: formValues.paymentProof,
                                });
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
                                        const updatedValue = {
                                            name: e.target.value,
                                            userId: formValues.registrants[id]
                                                .userId,
                                            phoneNumber:
                                                formValues.registrants[id]
                                                    .phoneNumber,
                                        };
                                        const newFormValues = [
                                            ...formValues.registrants.slice(
                                                0,
                                                id
                                            ),
                                            updatedValue,
                                            ...formValues.registrants.slice(
                                                id + 1
                                            ),
                                        ];
                                        setFormValues({
                                            registrants: newFormValues,
                                            dropzoneKey: formValues.dropzoneKey,
                                            paymentProof:
                                                formValues.paymentProof,
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
                                        const updatedValue = {
                                            name: formValues.registrants[id]
                                                .name,
                                            userId: e.target.value,
                                            phoneNumber:
                                                formValues.registrants[id]
                                                    .phoneNumber,
                                        };
                                        const newFormValues = [
                                            ...formValues.registrants.slice(
                                                0,
                                                id
                                            ),
                                            updatedValue,
                                            ...formValues.registrants.slice(
                                                id + 1
                                            ),
                                        ];
                                        setFormValues({
                                            registrants: newFormValues,
                                            dropzoneKey: formValues.dropzoneKey,
                                            paymentProof:
                                                formValues.paymentProof,
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
                                        const updatedValue = {
                                            name: formValues.registrants[id]
                                                .name,
                                            userId: formValues.registrants[id]
                                                .userId,
                                            phoneNumber: e.target.value,
                                        };
                                        const newFormValues = [
                                            ...formValues.registrants.slice(
                                                0,
                                                id
                                            ),
                                            updatedValue,
                                            ...formValues.registrants.slice(
                                                id + 1
                                            ),
                                        ];
                                        setFormValues({
                                            registrants: newFormValues,
                                            dropzoneKey: formValues.dropzoneKey,
                                            paymentProof:
                                                formValues.paymentProof,
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

                        {error && (
                            <span className={styles.errorText}>
                                ❌ One or more fields incorrectly filled!
                            </span>
                        )}

                        {loading ?? (
                            <p>
                                Please wait, it takes some time to upload image
                                and details. :__:
                            </p>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading || alreadyRegistered}
                        >
                            {loading
                                ? "Loading..."
                                : alreadyRegistered
                                ? "Registered"
                                : "Register"}
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
