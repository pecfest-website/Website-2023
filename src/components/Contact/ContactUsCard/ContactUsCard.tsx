import React from 'react'
import styles from "@/styles/Contacts/contactUsCard.module.css";

type ContactCardProp = {
    key: number;
    icon: JSX.Element;
    heading: string;
    paras: JSX.Element[] | string[];
}

export default function ContactUsCard({ icon, heading, paras} : ContactCardProp) {
    return (
        <div className={styles.container}>
            <div className={styles.icon}>{icon}</div>
            <div>
                <h2 className={styles.heading}>{heading}</h2>
                {
                    paras?.map((para, i) => {
                        return (
                            <p key={i} className={styles.para}>{para}</p>
                        )
                    })
                }
            </div>
        </div>
    )
}
