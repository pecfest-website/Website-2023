import { auth, db } from "@/serverless/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import { doc, getDoc } from "firebase/firestore";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/auth/signin",
        newUser: "/auth/new-user",
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {},
            async authorize(credentials): Promise<any> {
                return await signInWithEmailAndPassword(
                    auth,
                    (credentials as any).email || "",
                    (credentials as any).password || ""
                )
                    .then((userCredential) => {
                        if (userCredential.user) {
                            return userCredential.user;
                        }
                        return null;
                    })
                    .catch((error) => {
                        console.log(error);
                        return null;
                    });
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    // callbacks: {
    //     async session({ session }) {
    //         console.log(session);
    //         const email = session.user?.email ?? "";

    //         const registrationObject = await getDoc(
    //             doc(db, "registrations", email)
    //         );
    //         const userData = registrationObject.data();
    //         session.user.college = userData?.college;
    //         session.user.mobile = userData?.mobile;
    //         session.user.photoUrl = userData?.photoUrl;
    //         session.user.sid = userData?.sid;
    //         console.log(session);
    //         return session;
    //     },
    // },
    adapter: FirestoreAdapter({
        credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
        }),
    }),
    secret: process.env.SECRET,
};
export default NextAuth(authOptions);
