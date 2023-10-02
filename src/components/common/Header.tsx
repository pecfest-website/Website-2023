import {
    AppBar,
    Box,
    Button,
    IconButton,
    Toolbar,
    useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import styles from "@/styles/common/Header.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { NavData } from "@/data/NavData";
import Image from "next/image";
import pecfest from "../../../public/assets/logos/logo.png";

const drawerWidth = 240;
const navItemsOne = NavData.slice(0, NavData.length / 2);
const navItemsTwo = NavData.slice(NavData.length / 2);

export default function Header({ window }: any) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [open, setOpen] = useState(true);
    const router = useRouter();
    // For Dropdown
    const [anchorEl, setAnchorEl] = useState(null);
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const [user, setUser] = useState(null);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 20,
    });

    return (
        <Box
            component={"div"}
            className={styles.appbar_box}
            sx={{ display: "flex" }}
        >
            <AppBar component="nav" className={styles.appbar}>
                <Toolbar className={styles.toolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box
                        className={styles.toolbar_box}
                        component={"div"}
                        sx={{ display: { xs: "none", sm: "none" } }}
                    >
                        {navItemsOne.map((item) => (
                            <Button key={item.name} sx={{ color: "#fff" }}>
                                <Link href={`/${item.link}`}>{item.name}</Link>
                            </Button>
                        ))}
                    </Box>
                    <Link href="/">
                        <Image
                            className={
                                trigger
                                    ? styles.navbar_logo_shrunk
                                    : styles.navbar_logo
                            }
                            src={pecfest}
                            priority
                            alt="PECFEST-Logo"
                        />
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
