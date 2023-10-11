import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import validator from "validator";
import { toast } from "react-toastify";
import Head from "next/head";
import {
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import styles from "@/styles/auth/signin.module.css";
import PageLayout from "@/components/layout/PageLayout";
import Link from "next/link";
import GoogleIcon from "@mui/icons-material/Google";
import { GetServerSidePropsContext } from "next";

export default function Login() {
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email") ?? "";
        const password = data.get("password") ?? "";
        if (
            !validator.isEmail(email.toString()) ||
            !validator.isStrongPassword(password.toString())
        ) {
            toast.error("Please enter valid email and password");
            return;
        }

        try {
            signIn("credentials", {
                email: email.toString(),
                password: password.toString(),
                redirect: true,
                callbackUrl: "/profile",
            });
        } catch (error: any) {
            toast.error(error.message);
            console.log(error.message);
        }
    };

    return (
        <PageLayout title="Login | PECFEST'23" >
            <div className={styles.main}>
                <Head>
                    <title>Login | PECFEST&apos;23</title>
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
                            marginTop: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <h1 className={styles.pageheader}>Login</h1>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ mt: 1 }}
                            id="login_form"
                        >
                            {/* Just sad that couldnt implemtn email password login :// */}

                            {/* <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                className={styles.btn}
                            >
                                Login
                            </Button> */}

                            <Button
                                fullWidth
                                variant="contained"
                                onClick={() =>
                                    signIn("google", {
                                        callbackUrl: "/profile",
                                    })
                                }
                                className={styles.google_btn}
                            >
                                <GoogleIcon />
                                Login With Google
                            </Button>

                            {/* <Grid container sx={{ marginTop: 2 }}>
                                <Grid item>
                                    <Link
                                        href="/auth/register"
                                        className={styles.links}
                                    >
                                        Don&apos;t have an account? Sign Up
                                    </Link>
                                </Grid>
                            </Grid> */}
                        </Box>
                    </Box>
                </Container>
            </div>
        </PageLayout>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context);

    if (session?.user != null) {
        return {
            redirect: {
                permanent: false,
                destination: "/profile",
            },
        };
    }
    return {
        props: {},
    };
}
