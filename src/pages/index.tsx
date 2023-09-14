import Head from 'next/head'
import Landing from '@/components/landing/Landing'
import LandingNavbar from '@/components/landing/LandingNavbar'
import Schedule from '@/components/Schedule'

export default function Home() {
  return (
    <>
      <Head>
        <title>PECFEST</title>
        <meta name="description" content="Techno-cultural fest at Punjab Engineering college, Chandigarh" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <LandingNavbar />
        <Schedule />
      </main>
    </>
  )
}
