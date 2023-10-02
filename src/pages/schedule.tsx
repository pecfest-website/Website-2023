import PirateShipLottie from '@/components/events/shipLottieAnimation';
import PageLayout from '@/components/layout/PageLayout';
import React from 'react'
import styles from "@/styles/Sponsors/sponsors.module.css";
import Schedule from './Schedule/index';

function schedule() {
    return (
        <PageLayout title="Schedule | Pecfest" noHeader>
            {/* <PirateShipLottie loop={true} />
            <h1 className={styles.comingSoon}>Coming Soon</h1> */}
            <Schedule />
        </PageLayout>
    );
}

export default schedule