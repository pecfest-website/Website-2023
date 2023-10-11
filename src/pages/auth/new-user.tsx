import PageLayout from "@/components/layout/PageLayout";
import React, { useState } from "react";
import styles from "@/styles/auth/newuser.module.css";
import {
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
} from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import validator from "validator";
import { toast } from "react-toastify";
import { collection, doc, query, setDoc, where } from "firebase/firestore";
import { getSession, useSession } from "next-auth/react";
import { db } from "@/serverless/firebase";

function NewUser() {
    const router = useRouter();
    const { data: session } = useSession();

    const [college, setCollege] = useState("");
    const [name, setName] = useState("");
    const [sid, setSid] = useState("");
    const [mobile, setMobile] = useState("");

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const email = session?.user?.email ?? "";
        const docRef = doc(db, `registrations/${email}`);

        try {
            await setDoc(docRef, {
                email,
                name,
                sid: sid.length == 0 ? "NA" : sid,
                mobile,
                college,
                photoUrl: session?.user?.image,
            });
            toast.info("Signed up successfully!");
            router.push("/profile");
        } catch (e: any) {
            toast.error("Something went wrong!");
        }
    };

    return (
        <PageLayout title="User Details | PECFEST'23">
            <Box component={"div"} className={styles.main}>
                <Container
                    component="main"
                    maxWidth="xs"
                    className={styles.main__frame}
                >
                    <CssBaseline />
                    <Box
                        component={"div"}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <h1 className={styles.pageheader}>Sign up</h1>
                        <h2 className={styles.email}>{session?.user?.email}</h2>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="name"
                                        label="Full name"
                                        name="name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        error={validator.isEmpty(name)}
                                        autoComplete="given-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="college"
                                        label="College"
                                        name="college"
                                        value={college}
                                        onChange={(e) =>
                                            setCollege(e.target.value)
                                        }
                                        error={validator.isEmpty(college)}
                                        autoComplete="off"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="sid"
                                        label="Student ID"
                                        name="sid"
                                        value={sid}
                                        onChange={(e) => setSid(e.target.value)}
                                        autoComplete="off"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="mobile"
                                        label="Mobile Number"
                                        name="mobile"
                                        value={mobile}
                                        onChange={(e) =>
                                            setMobile(e.target.value)
                                        }
                                        error={validator.isEmpty(mobile)}
                                        autoComplete="off"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                className={styles.btn}
                            >
                                Sign Up
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </PageLayout>
    );
}

export default NewUser;

export async function getServerSideProps(context: any) {
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
    return {
        props: {},
    };
}
