import Head from 'next/head'
import Image from 'next/image'
import '../Components/Buttons/Getstart'
import { Inter } from 'next/font/google'
import styles from '../styles/Home.module.css'

import mainImage from '../public/main-image.png' 
import Getstart from '../Components/Buttons/Getstart'
import Navigation from '@/Components/Navigation/Navigation'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <meta name='description' content='Devault; your way to the decentralized cloud' />
        <meta name='msapplication-TileColor' content='#2b5797' />
        <meta name='theme-color' content='#ffffff' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
     
        <title>Decloud | The decentralized and encrypted cloud</title>
      </Head>
      <div>
        <Navigation/>
           <section className={styles.main + ' vh-100'}>
            <div className="d-flex vh-100 justify-conent-center align-items-center ">

          <div className='container '>
            <div className="row">
               <div className="col-md-5 offset-1 mt-5  ">

             <div className="d-flex flex-column mt-5">
             <div className='mt-4'>
               <h1 className={styles['main-text']}>Your data with <br /> real-time analytics </h1>
                <span  className= {styles['main-desc']}>Harness the potential of Big Data Analytics & Cloud Services <br></br> and become a data-driven organization with Needle tail</span>
               </div>

                 <div>
                 <Getstart/>
                 </div>

             </div>
            
               </div>
               <div className={' col-5 ' +`${styles.dnone}` }>
              <div className="w-100 ">
              <Image src={mainImage} className='w-100 p-5'/>
              </div>
               </div>
              </div> 

            
              </div>
              </div> 
           </section>
 
      </div>
    </>
  )
}
