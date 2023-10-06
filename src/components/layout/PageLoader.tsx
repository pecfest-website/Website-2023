import { Box } from "@mui/material";
import React from "react";

function PageLoader() {
    return (
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
        </Box>
    );
}

export default PageLoader;
