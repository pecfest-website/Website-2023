import PageLayout from "@/components/layout/PageLayout";
import { Box, Typography } from "@mui/material";
import React from "react";

function NotFound() {
    return (
        <PageLayout title="Page Not Found" darkHeader>
            <Box
                component={"main"}
                style={{
                    height: "100vh",
                    width: "100vw",
                    // background: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    style={{ width: "400px" }}
                    src={"/assets/logos/logo.png"}
                    alt="loading..."
                />
                <Typography variant="h1" fontFamily={"cursive"}>Page not found!</Typography>
            </Box>
        </PageLayout>
    );
}

export default NotFound;
