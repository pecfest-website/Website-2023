import PageLoader from "@/components/layout/PageLoader";
import "@/styles/app.scss";
import createEmotionCache from "@/utils/createEmotionCache";
import theme from "@/utils/theme";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function App({
    Component,
    pageProps: { session, emotionCache = clientSideEmotionCache, ...pageProps },
}: AppProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        const handleRouteChangeStart = (url: any, { shallow }: any) => {
            setIsLoading(true);
        };
        const handleRouteChangeComplete = (url: any, { shallow }: any) => {
            setIsLoading(false);
        };
        router.events.on("routeChangeStart", handleRouteChangeStart);
        router.events.on("routeChangeComplete", handleRouteChangeComplete);

        return () => {
            router.events.on("routeChangeStart", handleRouteChangeStart);
            router.events.on("routeChangeComplete", handleRouteChangeComplete);
        };
    });

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
                    {isLoading ? (
                        <PageLoader />
                    ) : (
                        <main>
                            <CssBaseline />
                            <Component {...pageProps} />
                        </main>
                    )}
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
