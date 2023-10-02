import { RouterProgressBar } from "@/components/common/RouterProgressBar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import localFont from "next/font/local";

const poc = localFont({ src: "../lib/Caribbean.ttf" });

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    // TODO can add font here
    return (
        <SessionProvider session={session}>
            <main>
                <RouterProgressBar />
                <Component {...pageProps} />
            </main>
        </SessionProvider>
    );
}
