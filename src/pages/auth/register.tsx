import {
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "@/styles/auth/register.module.css";
import validator from "validator";
import { toast } from "react-toastify";
import PageLayout from "@/components/layout/PageLayout";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "@/serverless/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

function Register() {
    const router = useRouter();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (
            firstName === "" ||
            lastName === "" ||
            !validator.isEmail(email) ||
            !validator.isStrongPassword(password)
        ) {
            toast.error("Please enter valid values");
            return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        await addDoc(collection(db, 'users'), {
            email,
            emailVerified: false,
            image: null,
            name: `${firstName} ${lastName}`
        })

        if(userCredential.user) {
            toast.info("Verify Email using the link sent!");
            router.push("/verify-email");
        }
        else {
            toast.error("Couldn't register you. SORRY!")
        }
    };

    return (
        <PageLayout title="Register | PECFEST'23">
            <div className={styles.main}>
                <Head>
                    <title>Register | PECFEST&apos;23</title>
                    <meta
                        name="viewport"
                        content="initial-scale=1.0, width=device-width"
                    />
                </Head>

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
                        <h1
                            className={styles.pageheader}
                        >
                            Sign up
                        </h1>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        value={firstName}
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                        error={firstName === ""}
                                        helperText={
                                            firstName === ""
                                                ? "Must not be empty"
                                                : ""
                                        }
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        value={lastName}
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                        error={lastName === ""}
                                        helperText={
                                            lastName === ""
                                                ? "Must not be empty"
                                                : ""
                                        }
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        error={!validator.isEmail(email)}
                                        helperText={
                                            !validator.isEmail(email)
                                                ? "Please enter a valid email"
                                                : ""
                                        }
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        error={
                                            !validator.isStrongPassword(
                                                password
                                            )
                                        }
                                        helperText={
                                            !validator.isStrongPassword(
                                                password
                                            ) ? (
                                                <>
                                                    Please use a strong password{" "}
                                                    <br />
                                                    Must contain a lower case
                                                    character, an upper case
                                                    character, a number and a
                                                    symbol <br /> Must have
                                                    minimum length of 8
                                                    character
                                                </>
                                            ) : (
                                                ""
                                            )
                                        }
                                        autoComplete="new-password"
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
                            <Grid container>
                                <Grid item>
                                    <Link
                                        href="/auth/signin"
                                        className={styles.links}
                                    >
                                        Already have an account? Log in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </div>
        </PageLayout>
    );
}

export default Register;
