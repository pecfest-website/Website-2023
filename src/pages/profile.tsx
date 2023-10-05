import PageLayout from "@/components/layout/PageLayout";
import { db } from "@/serverless/firebase";
import { doc } from "firebase/firestore";
import { getSession, useSession } from "next-auth/react";
import React from "react";

function Profile() {
    const { data: session } = useSession();

    return (
        <PageLayout title="Profile | PECFEST'23" darkHeader>
            Profile
            <div style={{margin: "100px"}}>{session?.user?.email}</div>
        </PageLayout>
    );
}

export default Profile;
