import PageLayout from "@/components/layout/PageLayout";
import { db } from "@/serverless/firebase";
import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import { getSession, signOut } from "next-auth/react";
import React, { useState } from "react";
import styles from "@/styles/Profile/profile.module.css";
import { User } from "@/types/User";
import Image from "next/image";
import { IoMdClipboard } from "react-icons/io";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface UserEvents {
    eventId: string;
    name: string;
}
interface Props {
    id: string;
    user: User;
    events: UserEvents[];
}

function Profile({ user, id, events }: Props) {
    const handleOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const [openDialog, setOpenDialog] = useState(false);
    const router = useRouter();

    const copyUserId = () => {
        navigator.clipboard.writeText(id);
        toast.info("User Id copied to clipboard");
    };

    return (
        <PageLayout title="Profile | PECFEST'23">
            <main className={styles.main}>
                <Dialog open={openDialog} onClose={handleClose}>
                    <DialogContent>
                        <DialogContentText>Registered Events</DialogContentText>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">
                                            S.No.
                                        </TableCell>
                                        <TableCell align="center">
                                            Event Name
                                        </TableCell>
                                        <TableCell align="center">
                                            Link
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {events &&
                                        events.length &&
                                        events.map((event, idx) => {
                                            return (
                                                <TableRow key={idx}>
                                                    <TableCell>
                                                        {idx + 1}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {event.name}{" "}
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        onClick={() => {
                                                            router.push(
                                                                `/events/${event.eventId}`
                                                            );
                                                        }}
                                                        sx={{
                                                            cursor: "pointer",
                                                            textDecoration:
                                                                "underline",
                                                        }}
                                                    >
                                                        Go to event
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </DialogContent>
                </Dialog>
                <div className={`${styles.main__box} glassmorphism`}>
                    <div className={styles.left_section}>
                        <Image
                            height={100}
                            width={100}
                            src={user.photoUrl}
                            alt=""
                        />
                    </div>
                    <div className={styles.right_section}>
                        <p>{user.name}</p>
                        <p>{user.mobile}</p>
                        <p>{user.college}</p>
                        {user.sid === "NA" ? null : <p>{user.sid}</p>}
                        <IconButton onClick={() => copyUserId()}>
                            Copy UserID
                            <IoMdClipboard />
                        </IconButton>
                        <div className={styles.buttons}>
                            <Button
                                variant="contained"
                                color="secondary"
                                fullWidth={false}
                                onClick={() => handleOpen()}
                            >
                                Registered Events
                            </Button>
                            <Button
                                variant="contained"
                                fullWidth={false}
                                onClick={() => signOut()}
                            >
                                Signout
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </PageLayout>
    );
}

export default Profile;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { req } = context;
    const session = await getSession({ req });

    if (session == null) {
        return {
            redirect: {
                destination: "/auth/signin",
                permanent: true,
            },
        };
    }

    const email = session.user?.email ?? "a";

    const docRef = doc(db, "registrations", email);

    const docData = await getDoc(docRef);
    const data = docData.data();
    const mobileNumber = data?.mobile;

    const userId = (
        await getDocs(
            query(collection(db, "users"), where("email", "==", data?.email))
        )
    ).docs[0].id;

    const events = (
        await getDocs(collection(db, `registrations/${email}/events`))
    ).docs.map((event) => {
        return {
            ...event.data(),
        };
    });

    if (!mobileNumber) {
        return {
            redirect: {
                destination: "/auth/new-user",
                permanent: true,
            },
        };
    }

    return {
        props: {
            id: userId,
            user: {
                ...data,
            },
            events,
        },
    };
}
