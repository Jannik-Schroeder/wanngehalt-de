import Head from 'next/head';
import Countdown from '@/components/countdown';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <>
    <Head>
      <title>Wann Gehalt?</title>
      <meta name="description" content="Erfahren Sie mit wanngehalt.at, wann Sie Ihr nächstes Gehalt erhalten." />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Wann Gehalt?" />
      <meta property="og:description" content="Erfahren Sie mit wanngehalt.at, wann Sie Ihr nächstes Gehalt erhalten." />
    </Head>
      <Countdown />
      <Footer />
    </>
  )
}