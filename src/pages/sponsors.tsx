import PirateShipLottie from '@/components/events/shipLottieAnimation'
import PageLayout from '@/components/layout/PageLayout'
import React from 'react'
import styles from '@/styles/Sponsors/sponsors.module.css';
import { GetServerSideProps } from 'next';

interface SponsorPageProps {
  isSponsorsDone: string | null;
}

function Sponsors({isSponsorsDone}: SponsorPageProps) {

  if (!isSponsorsDone) {
    return <PageLayout title='Sponsors | Pecfest' noHeader>
      <PirateShipLottie loop={true} />
      <h1 className={styles.comingSoon}>Coming Soon</h1>
    </PageLayout>
  }

  return (
    <div>Sponsors</div>
  )
}

export default Sponsors

export const getServerSideProps: GetServerSideProps<SponsorPageProps> = async () => {
  const isSponsorsDone = process.env.SPONSORS_DONE || null;
  return {
    props: {
      isSponsorsDone,
    },
  };
};