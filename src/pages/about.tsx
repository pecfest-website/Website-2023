import PageLayout from "@/components/layout/PageLayout";
import React from "react";
import styles from '@/styles/About/about.module.css';
import Footfall from "../styles/About/footfall.png"
import Colleges from "../styles/About/colleges.png"
import Events from "../styles/About/events.png"
import Prizes from "../styles/About/prizes.png"
import Participants from "../styles/About/participants.png"
import Image from "next/image";

function About() {
    return <PageLayout title="About | Pecfest'23">
        <div className={styles.about}>
            <h1>About Us</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce scelerisque odio eu ligula pellentesque, id suscipit libero aliquet. Vestibulum auctor fringilla massa a vestibulum. Praesent nec est non odio condimentum convallis. Duis ac dapibus purus. Nunc non erat id ex scelerisque sollicitudin. Pellentesque vel ipsum non sapien gravida consectetur. Proin euismod, ante et commodo aliquet, lorem nulla lacinia nunc, eu bibendum ligula ligula nec nunc. Nullam iaculis, lectus ut dictum bibendum, nunc erat convallis nulla, eu fermentum libero justo vel quam. Integer nec tortor nec dolor fermentum pellentesque. Etiam vitae quam urna. Quisque eget velit ac dolor venenatis bibendum nec a leo. Vestibulum fermentum justo eu ante interdum, nec feugiat arcu volutpat. Integer mattis, odio eu aliquam semper, purus lectus vehicula velit, ac lacinia justo eros in justo.
            </p>
            <div className={styles.aboutBoxes}>
                <div className={styles.aboutBox}>
                    <Image className={styles.aboutIcon} src={Footfall} alt="" />
                    <div className={styles.aboutNum}>50000+</div>
                    <div className={styles.aboutTitle}>FOOTFALL</div>
                </div>
                <div className={styles.aboutBox}>
                    <Image className={styles.aboutIcon} src={Colleges} alt="" />
                    <div className={styles.aboutNum}>50+</div>
                    <div className={styles.aboutTitle}>COLLEGES</div>
                </div>
                <div className={styles.aboutBox}>
                    <Image className={styles.aboutIcon} src={Events} alt="" />
                    <div className={styles.aboutNum}>100+</div>
                    <div className={styles.aboutTitle}>EVENTS</div>
                </div>
                <div className={styles.aboutBox}>
                    <Image className={styles.aboutIcon} src={Prizes} alt="" />
                    <div className={styles.aboutNum}>10 Lakh+</div>
                    <div className={styles.aboutTitle}>PRIZES</div>
                </div>
                <div className={styles.aboutBox}>
                    <Image className={styles.aboutIcon} src={Participants} alt="" />
                    <div className={styles.aboutNum}>10000+</div>
                    <div className={styles.aboutTitle}>PARTICIPANTS</div>
                </div>
            </div>
        </div>
    </PageLayout>;
}

export default About;
