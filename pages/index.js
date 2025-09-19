import dynamic from 'next/dynamic'
import Head from 'next/head'
const AI3DIntro = dynamic(() => import('../components/AI3DIntro'), { ssr: false })

export default function Home() {
  return (
    <>
      <Head>
        <title>AI Letter 3D Intro</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AI3DIntro />
    </>
  )
}
