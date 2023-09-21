import PirateShipLottie from "@/components/events/shipLottieAnimation";
import PageLayout from "@/components/layout/PageLayout";
import React from "react";
import styles from "@/styles/Sponsors/sponsors.module.css";

function Gallery() {
    return (
        <PageLayout title="Gallery | Pecfest" noHeader>
            <PirateShipLottie loop={true} />
            <h1 className={styles.comingSoon}>Coming Soon</h1>
        </PageLayout>
    );
}

export default Gallery;