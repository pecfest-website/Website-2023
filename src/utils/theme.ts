import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
    palette: {
        background: {
            default: "#000000",
        },
        primary: {
            main: "#000000",
        },
        secondary: {
            main: "#F07B3F",
        },
        error: {
            main: red.A400,
        },
    },
});

export default theme;
