import { Box, Typography } from "@mui/material";
import React from "react";

function PageLoader() {
    return (
        <Box
            component={"main"}
            style={{
                height: "100vh",
                width: "100vw",
                background: "#678987",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                style={{ width: "400px" }}
                src={"/assets/loader/loader.gif"}
                alt="loading..."
            />
            <Typography>
                Loading...
            </Typography>
        </Box>
    );
}

export default PageLoader;
