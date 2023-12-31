import Head from "next/head";
import Landing from "@/components/landing/Landing";
import LandingNavbar from "@/components/landing/LandingNavbar";
import Countdown from "react-countdown";
import styles from "@/styles/Landing/landing.module.css";
import NoSSRWrapper from "@/components/NoSSRWrapper";

export default function Home() {
    const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
        const timeLeft = { days, hours, mins: minutes, secs: seconds };
        if (completed) {
            return null;
        } else {
            return (
                <div className={styles.countdown}>
                    <div className={styles.content}>
                        {Object.entries(timeLeft).map((el) => {
                            const label = el[0];
                            const value = el[1];
                            return (
                                <div className={styles.box} key={label}>
                                    <div
                                        className={`${styles.value} glassmorphism-light`}
                                    >
                                        <span>
                                            {value.toString().length === 1
                                                ? `0${value}`
                                                : value}
                                        </span>
                                    </div>
                                    <span className={styles.label}>
                                        {" "}
                                        {label}{" "}
                                    </span>
                                </div>
                            );
                        })}
                        <p className={styles.toGo}>TO GO</p>
                    </div>
                </div>
            );
        }
    };

    return (
        <>
            <Head>
                <title>PECFEST&apos;23</title>
                <meta
                    name="description"
                    content="Techno-cultural fest at Punjab Engineering college, Chandigarh"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/assets/icons/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/assets/icons/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/assets/icons/favicon-16x16.png"
                />
                <link rel="manifest" href="/assets/icons/site.webmanifest" />
                <link
                    rel="mask-icon"
                    href="/assets/icons/safari-pinned-tab.svg"
                    color="#5bbad5"
                />
                <link rel="shortcut icon" href="/assets/icons/favicon.ico" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta
                    name="msapplication-config"
                    content="/assets/icons/browserconfig.xml"
                />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            <main>
                <LandingNavbar />
                <NoSSRWrapper>
                    <Countdown
                        date={Date.parse("2023-11-17")}
                        renderer={renderer}
                    />
                </NoSSRWrapper>
                <Landing />
            </main>
        </>
    );
}
