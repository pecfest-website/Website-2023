import { RouterProgressBar } from "@/components/common/RouterProgressBar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";

const poc = localFont({ src: "../lib/Caribbean.ttf" });

export default function App({ Component, pageProps }: AppProps) {
    // TODO can add font here
    return (
        <main>
            <RouterProgressBar />
            <Component {...pageProps} />
        </main>
    );
}
