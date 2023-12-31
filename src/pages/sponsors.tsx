import PageLayout from "@/components/layout/PageLayout";
import React from "react";
import styles from "@/styles/Sponsors/sponsors.module.css";
import Image from "next/image";
import { sponsors } from "@/data/sponsors";
import { typenew } from "@/data/sponsorTitle";

function Sponsors() {
    const types = typenew.map((title, index) => {
        return (
            <div key={index} className={`${styles.typecard} glassmorphism`}>
                <h1 className={styles.subheading}>{title}</h1>
                <div className={styles.sectionDesign}>
                    {sponsors[`${title}`].map((item, index) => {
                        return (
                            <div key={index} style={{marginBottom:10}}>
                                <div className={`${styles.subSection}`}>
                                    <Image
                                        style={{objectFit:"scale-down"}}
                                        src={item["Logo"]}
                                        height={200}
                                        width={200}
                                        alt={"image"}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    });

    return (
        <PageLayout title="Sponsors | PECFEST" >
            <div className={styles.main}>
                <div className={`${styles.heading} glassmorphism`}>
                    <h1 className={styles.subheading1}>Sponsors</h1>
                    <div className={styles.subheading2}>
                        Over the past years PECFEST has had the privilege to
                        have hosted a number of sponsors which provided a very
                        entertaining experience to our visitors as well as the
                        brand. The crowd engagement, media exposure, sampling
                        and brand building opportunities offered at PECFEST are
                        unparalleled.
                    </div>
                    <p>Contact Us</p>
                    <p>Tanishq Marwaha: 9056692133</p>
                    <p>Vinayak Sahni: 7696088415</p>
                </div>

                <div className={styles.section}>{types}</div>
            </div>
        </PageLayout>
    );
}

export default Sponsors;
