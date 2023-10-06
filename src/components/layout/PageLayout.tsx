import React, { ReactNode } from "react";
import Header from "../common/Header";
import Head from "next/head";
import styles from "@/styles/layout/page.module.scss";

type Props = {
    title: string;
    description?: string;
    children?: ReactNode;
    noHeader?: boolean;
    darkHeader?: boolean;
};

function PageLayout({ title, children, description, noHeader, darkHeader }: Props) {
    return (
        <div className={styles.page}>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
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
            {noHeader ? null : <Header dark={darkHeader} />}
            <div className={styles.children}>{children}</div>
        </div>
    );
}

export default PageLayout;
