import PageLayout from "@/components/layout/PageLayout";
import React from "react";
import styles from "@/styles/About/about.module.css";
import Events from "@/styles/About/Layer 4.png";
import Prizes from "@/styles/About/Layer 5.png";
import Participants from "@/styles/About/Layer 7.png";
import Instagram from "@/styles/About/Layer 8.png";
import Facebook from "@/styles/About/Layer 6.png";
import Youtube from "@/styles/About/Layer 2.png";
import Anchor from "@/styles/About/Layer 3.png";
import Image from "next/image";

function About() {
    const data = [
        { src: Events, num: "50k+", title: "Footfall" },
        { src: Instagram, num: "52k+", title: "Instagram Impressions" },
        { src: Facebook, num: "43k+", title: "Facebook Followers" },
        { src: Youtube, num: "13k+", title: "Youtube Impressions" },
        { src: Anchor, num: "1.8k+", title: "Youtube Subscribers" },
        { src: Prizes, num: "6k+", title: "APP INSTALLS" },
        { src: Participants, num: "8k+", title: "PARTICIPANTS" },
    ];
    return (
        <PageLayout title="About | PECFEST'23">
            <div className={styles.about}>
                <div className={`${styles.aboutHeading} glassmorphism`}>ABOUT</div>
                <div className={`${styles.aboutMain} glassmorphism`}>
                    Elevating the spirit of innovation and artistic expression,
                    PECFEST 2023 stands as a pinnacle of techno-cultural
                    brilliance. Rooted in a legacy of excellence, we craft an
                    unparalled experience that seamlessly marries culture with
                    cutting-edge technology. As the paramount annual
                    extravaganza of North India, PECFEST is a dynamic
                    convergence of creativity, intellect and pure enjoyment.
                    What truly sets us apart is our unwavering commitment to
                    pushing boundaries. From captivating talks by visionary
                    pioneers to electrifying musical performances by top-tier
                    artists, every moment is designed to ignite isnipration. The
                    canvas of PECFEST unfurls with a rich tapestry of talents,
                    where diverse voices resonate in harmony. Uniting a vibrant
                    community of over 50,000 enthusiasts from all corners of the
                    country, PECFEST creates a symphony of shared passion.
                    Embrace the pulse of the future, where tradition meets
                    innovation, at PECFEST 2023. Join us and become a part of
                    this remarkable journey, where creativity knows no bounds.
                </div>
                <div className={styles.aboutBoxes}>
                    {data.map((item, index) => (
                        <div className={`${styles.aboutBox} glassmorphism`} key={index}>
                            <Image
                                className={styles.aboutIcon}
                                src={item.src}
                                alt=""
                            />
                            <div className={styles.aboutNum}>{item.num}</div>
                            <div className={styles.aboutTitle}>
                                {item.title}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PageLayout>
    );
}

export default About;
