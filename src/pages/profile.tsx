import PageLayout from "@/components/layout/PageLayout";
import { db } from "@/serverless/firebase";
import { Button } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import { getSession, signOut, useSession } from "next-auth/react";
import React from "react";
import styles from "@/styles/Profile/profile.module.css";
import { User } from "@/types/User";

interface Props {
    user: User;
}

function Profile({ user }: Props) {
    return (
        <PageLayout title="Profile | PECFEST'23" darkHeader>
            <main className={styles.main}>
                <div className={`${styles.main__box} glassmorphism`}>
                    <div className={styles.left_section}>
                        <img src={user.photoUrl} alt="" />
                    </div>
                    <div className={styles.right_section}>
                        <p>{user.name}</p>
                        <p>{user.mobile}</p>
                        <p>{user.college}</p>
                        <p>{user.sid}</p>
                        <Button onClick={() => signOut()}>Signout</Button>
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
                destination: "/auth/login",
                permanent: true,
            },
        };
    }

    const email = session.user?.email ?? "a";

    const docRef = doc(db, "registrations", email);
    const data = (await getDoc(docRef)).data();
    const mobileNumber = data?.mobile;

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
            user: {
                ...data,
            },
        },
    };
}
