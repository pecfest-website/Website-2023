import { Box, Typography } from "@mui/material";
import Head from "next/head";
import React from "react";

function PageLoader() {
    return (
        <Box
            component={"main"}
            style={{
                height: "100vh",
                width: "100vw",
                background: "wheat",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Head>
                <title>PECFEST&apos;23</title>
                <link rel="shortcut icon" href="/assets/icons/favicon.ico" />
            </Head>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                style={{ width: "100vw", objectFit: "contain" }}
                src={"/assets/loader/Loader-BG_3.gif"}
                alt="loading..."
            />
        </Box>
    );
}

export default PageLoader;
