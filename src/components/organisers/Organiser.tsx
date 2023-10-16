import styles from "@/styles/Organisers/organiser.module.css";
import { organiser } from "@/types/Organiser";
import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import CallIcon from "@mui/icons-material/Call";
import Tooltip from "@mui/material/Tooltip";
import Image from "next/image";
import { Email } from "@mui/icons-material";

interface Props {
    organiser: organiser;
}

const Organiser = ({ organiser }: Props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <Image
                    height={300}
                    width={300}
                    src={organiser.Photo}
                    className={styles.card__image}
                    alt={organiser.Name}
                />
                <div className={styles.card__overlay}>
                    <div className={styles.card__header}>
                        <svg
                            className={styles.card__arc}
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path />
                        </svg>
                        <Image
                            className={styles.card__thumb}
                            src={organiser.Photo}
                            alt="Display Image circle"
                            height={200}
                            width={200}
                        />
                        <div className={styles.card__header__text}>
                            <h3 className={styles.card__title}>
                                {organiser.Name}
                            </h3>
                        </div>
                    </div>
                    <div className={styles.card__tagline}>
                        {organiser.Committee}
                    </div>
                    <div className={styles.icons}>
                        {organiser.Instagram !== "NA" && (
                            <a
                                href={organiser.Instagram}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <InstagramIcon className={styles.fab} />
                            </a>
                        )}
                        {organiser.Linkedin !== "NA" && (
                            <a
                                href={organiser.Linkedin}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <LinkedInIcon className={styles.fab} />
                            </a>
                        )}
                        {organiser.Github && organiser.Github !== "NA" && (
                            <a
                                href={organiser.Github}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <GitHubIcon className={styles.fab} />
                            </a>
                        )}
                        {organiser.Contact.toString() !== "NA" && (
                            <a
                                href={`tel:${organiser.Contact.toString()}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Tooltip title={organiser.Contact.toString()}>
                                    <CallIcon className={styles.fab} />
                                </Tooltip>
                            </a>
                        )}
                        {organiser.Email !== "NA" && (
                            <a
                                href={`mailto:${organiser.Email}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Tooltip title={organiser.Email}>
                                    <Email className={styles.fab} />
                                </Tooltip>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Organiser;
