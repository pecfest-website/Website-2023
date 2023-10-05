import { RouterProgressBar } from "@/components/common/RouterProgressBar";
import "@/styles/globals.css";
import createEmotionCache from "@/utils/createEmotionCache";
import theme from "@/utils/theme";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const poc = localFont({ src: "../lib/Caribbean.ttf" });

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function App({
    Component,
    pageProps: { session, emotionCache = clientSideEmotionCache, ...pageProps },
}: AppProps) {
    // TODO can add font here
    return (
        <SessionProvider session={session}>
            <CacheProvider value={emotionCache}>
                <ThemeProvider theme={theme}>
                    <Head>
                        <meta
                            name="viewport"
                            content="initial-scale=1, width=device-width"
                        />
                    </Head>
                    <main>
                        <CssBaseline />
                        <RouterProgressBar />
                        <Component {...pageProps} />
                    </main>
                    <ToastContainer
                        position="top-right"
                        autoClose={8000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        draggable={false}
                        pauseOnFocusLoss
                        closeOnClick
                        pauseOnHover
                    />
                </ThemeProvider>
            </CacheProvider>
        </SessionProvider>
    );
}
