import Head from 'next/head'
import Landing from '@/components/landing/Landing'
import LandingNavbar from '@/components/landing/LandingNavbar'

export default function Home() {
  return (
    <>
      <Head>
        <title>PECFEST&apos;23</title>
        <meta name="description" content="Techno-cultural fest at Punjab Engineering college, Chandigarh" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/favicon-16x16.png"/>
        <link rel="manifest" href="/assets/icons/site.webmanifest"/>
        <link rel="mask-icon" href="/assets/icons/safari-pinned-tab.svg" color="#5bbad5"/>
        <link rel="shortcut icon" href="/assets/icons/favicon.ico"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="msapplication-config" content="/assets/icons/browserconfig.xml"/>
        <meta name="theme-color" content="#ffffff"/>
      </Head>
      <main>
        <LandingNavbar />
        <Landing />
      </main>
    </>
  )
}
