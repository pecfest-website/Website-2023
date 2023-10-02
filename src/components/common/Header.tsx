import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Hamburger from "./Hamburger";
import styles from "@/styles/common/Header.module.scss";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [active, setActive] = useState("/");

    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }

    const router = useRouter();

    useEffect(() => {
        setActive(router.pathname);
    }, [router.pathname]);

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo_wrapper}>
                <Link href={"/"} aria-label="PEC ACM">
                    <>
                        <Image
                            height={100}
                            width={100}
                            src={"/assets/logos/logo.png"}
                            alt="Pecfest-logo"
                        />
                    </>
                </Link>
            </div>
            <div className={styles.list_items_wrapper}>
                <Hamburger menuOpen={menuOpen} toggleMenu={toggleMenu} />
                <div
                    className={`${menuOpen ? styles.active : ""} ${
                        styles.menu_modal
                    }`}
                >
                    <ul
                        className={`${styles.nav_items} ${
                            menuOpen ? styles.active : ""
                        }`}
                        role="presentation"
                    >
                        {headerItems.map((headerItem, i) => {
                            const isActive = active === headerItem.href;
                            return (
                                <li onClick={toggleMenu} key={i}>
                                    <Link
                                        href={headerItem.href}
                                        aria-label={headerItem.name}
                                        className={`${styles.nav_link} ${
                                            isActive
                                                ? styles.active_nav_link
                                                : ""
                                        }`}
                                    >
                                        {headerItem.name}
                                    </Link>
                                </li>
                            );
                        })}
                        <li>
                            <Link href={"/login"} aria-label="Login">
                                <button>Login</button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;

const headerItems = [
    {
        href: "/about",
        name: "About",
    },
    {
        href: "/competitions",
        name: "Competitions",
    },
    {
        href: "/events",
        name: "Events",
    },
    {
        href: "/team",
        name: "Team",
    },
    {
        href: "/gallery",
        name: "Gallery",
    },
    {
        href: "/brochure",
        name: "Brochure",
    },
    {
        href: "/contacts",
        name: "Contact Us",
    },
];
