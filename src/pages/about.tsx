import PageLayout from "@/components/layout/PageLayout";
import React from "react";
import styles from "@/styles/About/about.module.css";
import Footfall from "../styles/About/footfall.png";
import Colleges from "../styles/About/colleges.png";
import Events from "../styles/About/events.png";
import Prizes from "../styles/About/prizes.png";
import Participants from "../styles/About/participants.png";
import Image from "next/image";

function About() {
  return (
    <PageLayout title="About | Pecfest'23">
      <div className={styles.about}>
        <div className={styles.aboutHeading}>ABOUT</div>
        <div className={styles.aboutMain}>
          Elevating the spirit of innovation and artistic expression, PECFEST
          2023 stands as a pinnacle of techno-cultural brilliance. Rooted in a
          legacy of excellence, we craft an unparalled experience that
          seamlessly marries culture with cutting-edge technology. As the
          paramount annual extravaganza of North India, PECFEST is a dynamic
          convergence of creativity, intellect and pure enjoyment. What truly
          sets us apart is our unwavering commitment to pushing boundaries. From
          captivating talks by visionary pioneers to electrifying musical
          performances by top-tier artists, every moment i sdesigned to ignite
          isnipration. The canvas of PECFEST unfurls with a rich tapestry of
          talents,, where diverse voices resonate in harmony. Uniting a vibrant
          community of over 50,000 enthusiasts from all corners of the country,
          PECFEST creates a symphony of shared passion. Embrace the pulse of the
          future, where tradition meets innovation, at PECFEST 2023. Join us and
          become a part of this remarkable journey, where creativity knows no
          bounds.
        </div>
        <div className={styles.aboutBoxes}>
          <div className={styles.aboutBox}>
            <Image className={styles.aboutIcon} src={Footfall} alt="" />
            <div className={styles.aboutNum}>50000+</div>
            <div className={styles.aboutTitle}>FOOTFALL</div>
          </div>
          <div className={styles.aboutBox}>
            <Image className={styles.aboutIcon} src={Colleges} alt="" />
            <div className={styles.aboutNum}>100000+</div>
            <div className={styles.aboutTitle}>IMPRESSIONS</div>
          </div>
          <div className={styles.aboutBox}>
            <Image className={styles.aboutIcon} src={Events} alt="" />
            <div className={styles.aboutNum}>50+</div>
            <div className={styles.aboutTitle}>EVENTS</div>
          </div>
          <div className={styles.aboutBox}>
            <Image className={styles.aboutIcon} src={Prizes} alt="" />
            <div className={styles.aboutNum}>6000+</div>
            <div className={styles.aboutTitle}>APP INSTALLS</div>
          </div>
          <div className={styles.aboutBox}>
            <Image className={styles.aboutIcon} src={Participants} alt="" />
            <div className={styles.aboutNum}>8000+</div>
            <div className={styles.aboutTitle}>PARTICIPANTS</div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default About;
