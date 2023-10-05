import React from "react";
import styles from "@/styles/Contacts/contacts.module.css";
import TeamCard from "@/components/Contact/TeamCard/TeamCard";
import ContactUsCard from "@/components/Contact/ContactUsCard/ContactUsCard";
import { SOCIALICONS } from "@/data/socials";
import { CONTACTUSINFO } from "@/data/contacts";
import PageLayout from "@/components/layout/PageLayout";

function Contacts() {
    return (
        <PageLayout
            title="Contact Us"
            description="Contact the team responsible for smooth conducting of PECFEST'23"
        >
            <div className={styles.container}>
                <div className={styles.heading}>Contact Us</div>
                <div className={`${styles.contactUsContainer} glassmorphism-light`}>
                    {CONTACTUSINFO.map((contact, i) => {
                        return (
                            <ContactUsCard
                                key={i}
                                heading={contact.heading}
                                icon={contact.icon}
                                paras={contact.paras}
                            />
                        );
                    })}
                </div>
            </div>
        </PageLayout>
    );
}

export default Contacts;
