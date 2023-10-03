import PirateShipLottie from '@/components/events/shipLottieAnimation'
import PageLayout from '@/components/layout/PageLayout'
import React from 'react'
import styles from '@/styles/Sponsors/sponsors.module.css';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { sponsors } from '@/data/sponsors';
import { typenew } from '@/data/sponsorTitle';


interface SponsorPageProps {
  isSponsorsDone: string | null;
}



function Sponsors({isSponsorsDone}: SponsorPageProps) {

  const types=typenew.map((title)=>{
    return (
      
      <>
      
      <h1 className={styles.subheading}>{title}</h1>
      <div className={styles.sectionDesign}>
        {sponsors[`${title}`].map((item:any)=>{
    return(
      <div className={styles.subSection}>
          <Image src={item["Logo"]} height={200} width={200}  alt={'image'}/>
          <h1 className={styles.sectionHeading}>{item["Name"]}</h1>
        
        </div>
    )})}
    </div>
    </>

    )
  })

 

  // if (!isSponsorsDone) {
  //   return <PageLayout title='Sponsors | Pecfest' noHeader>
  //     <PirateShipLottie loop={true} />
  //     <h1 className={styles.comingSoon}>Coming Soon</h1>
  //   </PageLayout>
  // }

  return (
    <PageLayout title='Sponsors | Pecfest' noHeader>
      <div className={styles.main}>
    <div className={styles.heading}>
    <h1 className={styles.subheading1}>Sponsors</h1>
    <div className={styles.subheading2}>Over the past years PECFEST  has had the privilege to have hosted a number of sponsors which provided a very entertaining experience to our visitors as well as the brand. The crowd engagement, media exposure, sampling and brand building opportunities offered at PECFEST are unparalleled.</div>
    </div>


    <div className={styles.section}>

      {types}



    </div>


    
    </div>
    </PageLayout>
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