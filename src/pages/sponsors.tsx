import PirateShipLottie from '@/components/events/shipLottieAnimation'
import PageLayout from '@/components/layout/PageLayout'
import React from 'react'
import styles from '@/styles/Sponsors/sponsors.module.css';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { sponsors } from '@/data/sponsor';


interface SponsorPageProps {
  isSponsorsDone: string | null;
}

function Sponsors({isSponsorsDone}: SponsorPageProps) {

  const titleSponsor=sponsors["Title Sponsor"].map((item)=>{
    return(
      <div className={styles.subSection}>
          <Image src={item["Logo"]} height={200} width={200}  alt={'image'}/>
          <h1 className={styles.sectionHeading}>{item["Name"]}</h1>
        
        </div>
    )
  })
  const drivenBy=sponsors["Driven By"].map((item)=>{
    return(
      <div className={styles.subSection}>
          <Image src={item["Logo"]} height={200} width={200}  alt={'image'}/>
          <h1 className={styles.sectionHeading}>{item["Name"]}</h1>
        
        </div>
    )
  })

  const coSponsors=sponsors["Co Sponsor"].map((item)=>{
    return(
      <div className={styles.subSection}>
          <Image src={item["Logo"]} height={200} width={200}  alt={'image'}/>
          <h1 className={styles.sectionHeading}>{item["Name"]}</h1>
        
        </div>
    )
  })
  const associatePartners=sponsors["Associate Partner"].map((item)=>{
    return(
      <div className={styles.subSection}>
          <Image src={item["Logo"]} height={200} width={200}  alt={'image'}/>
          <h1 className={styles.sectionHeading}>{item["Name"]}</h1>
        
        </div>
    )
  })
  const corporatePartners=sponsors["Corporate Partner"].map((item)=>{
    return(
      <div className={styles.subSection}>
          <Image src={item["Logo"]} height={200} width={200}  alt={'image'}/>
          <h1 className={styles.sectionHeading}>{item["Name"]}</h1>
        
        </div>
    )
  })
  const merchPartner=sponsors["Merchandise Partner"].map((item)=>{
    return(
      <div className={styles.subSection}>
          <Image src={item["Logo"]} height={200} width={200}  alt={'image'}/>
          <h1 className={styles.sectionHeading}>{item["Name"]}</h1>
        
        </div>
    )
  })
  const engPartner=sponsors["Engagement Partner"].map((item)=>{
    return(
      <div className={styles.subSection}>
          <Image src={item["Logo"]} height={200} width={200}  alt={'image'}/>
          <h1 className={styles.sectionHeading}>{item["Name"]}</h1>
        
        </div>
    )
  })
  const expPartner=sponsors["Experience Partner"].map((item)=>{
    return(
      <div className={styles.subSection}>
          <Image src={item["Logo"]} height={200} width={200}  alt={'image'}/>
          <h1 className={styles.sectionHeading}>{item["Name"]}</h1>
        
        </div>
    )
  })
  const ohp=sponsors["Official Hydration Partner"].map((item)=>{
    return(
      <div className={styles.subSection}>
          <Image src={item["Logo"]} height={200} width={200}  alt={'image'}/>
          <h1 className={styles.sectionHeading}>{item["Name"]}</h1>
        
        </div>
    )
  })
  const osp=sponsors["Official Snack Partner"].map((item)=>{
    return(
      <div className={styles.subSection}>
          <Image src={item["Logo"]} height={200} width={200}  alt={'image'}/>
          <h1 className={styles.sectionHeading}>{item["Name"]}</h1>
        
        </div>
    )
  })

  const ohop=sponsors["Official Hospitality Partner"].map((item)=>{
    return(
      <div className={styles.subSection}>
          <Image src={item["Logo"]} height={200} width={200}  alt={'image'}/>
          <h1 className={styles.sectionHeading}>{item["Name"]}</h1>
        
        </div>
    )
  })
  const photoPartner=sponsors["Photography Partner"].map((item)=>{
    return(
      <div className={styles.subSection}>
          <Image src={item["Logo"]} height={200} width={200}  alt={'image'}/>
          <h1 className={styles.sectionHeading}>{item["Name"]}</h1>
        
        </div>
    )
  })
  const opp=sponsors["Official Payment Partner"].map((item)=>{
    return(
      <div className={styles.subSection}>
          <Image src={item["Logo"]} height={200} width={200}  alt={'image'}/>
          <h1 className={styles.sectionHeading}>{item["Name"]}</h1>
        
        </div>
    )
  })
  const eventSponsor=sponsors["Event Sponsors"].map((item)=>{
    return(
      <div className={styles.subSection}>
          <Image src={item["Logo"]} height={200} width={200}  alt={'image'}/>
          <h1 className={styles.sectionHeading}>{item["Name"]}</h1>
        
        </div>
    )
  })
  const foodPartners=sponsors["Food Partner"].map((item)=>{
    return(
      <div className={styles.subSection}>
          <Image src={item["Logo"]} height={200} width={200}  alt={'image'}/>
          <h1 className={styles.sectionHeading}>{item["Name"]}</h1>
        
        </div>
    )
  })

  if (!isSponsorsDone) {
    return <PageLayout title='Sponsors | Pecfest' noHeader>
      <PirateShipLottie loop={true} />
      <h1 className={styles.comingSoon}>Coming Soon</h1>
    </PageLayout>
  }

  return (
    <PageLayout title='Sponsors | Pecfest' noHeader>
      <div className={styles.main}>
    <div className={styles.heading}>
    <h1 className={styles.subheading1}>Sponsors</h1>
    <div className={styles.subheading2}>Over the past years PECFEST  has had the privilege to have hosted a number of sponsors which provided a very entertaining experience to our visitors as well as the brand. The crowd engagement, media exposure, sampling and brand building opportunities offered at PECFEST are unparalleled.</div>
    </div>


    <div className={styles.section}>

      <h1 className={styles.subheading}>Title Sponsor</h1>
      <div className={styles.sectionDesign}>
        {titleSponsor}
      </div>


      <h1 className={styles.subheading}>Driven By</h1>
      <div className={styles.sectionDesign}>
       {drivenBy}
      </div>


      <h1 className={styles.subheading}>Co Sponsor</h1>
      <div className={styles.sectionDesign}>
        {coSponsors}
      </div>


      <h1 className={styles.subheading}>Associate Partner</h1>
      <div className={styles.sectionDesign}>
        {associatePartners}
      </div>


      <h1 className={styles.subheading}>Corporate Partner</h1>
      <div className={styles.sectionDesign}>
        {corporatePartners}
      </div>


      <h1 className={styles.subheading}>Merchandise Partner</h1>
      <div className={styles.sectionDesign}>
        {merchPartner}
      </div>


      <h1 className={styles.subheading}>Engagement Partner</h1>
      <div className={styles.sectionDesign}>
        {engPartner}
      </div>



      <h1 className={styles.subheading}>Experience Partner</h1>
      <div className={styles.sectionDesign}>
        {expPartner}
      </div>


      <h1 className={styles.subheading}>Official Hydration Partner</h1>
      <div className={styles.sectionDesign}>
        {ohp}
      </div>


      <h1 className={styles.subheading}>Official Snack Partner</h1>
      <div className={styles.sectionDesign}>
        {osp}
      </div>


      <h1 className={styles.subheading}>Official Hospitality Partner</h1>
      <div className={styles.sectionDesign}>
        {ohop}
      </div>

      <h1 className={styles.subheading}>Photography Partner</h1>
      <div className={styles.sectionDesign}>
        {photoPartner}
      </div>


      <h1 className={styles.subheading}>Official Payment Partner</h1>
      <div className={styles.sectionDesign}>
        {opp}
      </div>


      <h1 className={styles.subheading}>Event Sponsors</h1>
      <div className={styles.sectionDesign}>
        {eventSponsor}
      </div>


      <h1 className={styles.subheading}>Food Partner</h1>
      <div className={styles.sectionDesign}>
        {foodPartners}
      </div>




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