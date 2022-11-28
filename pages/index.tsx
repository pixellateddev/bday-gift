import Head from 'next/head'
import Image from 'next/image'

import bdayPic from '../public/nick.jpg'

export default function Home() {
  return (
    <div className='container'>
      <Head>
        <title>Happy Birthday 🎉</title>
      </Head>

      <div className='background'></div>

      <div className='header'>
        <h1>Today is Nick's birthday 🎉</h1>
        <Image className='bday-img' alt='' src={bdayPic} width={150} />
        <h2 className='bday-age'>24 years old</h2>
        <h4 className='bday-date'>01.11.2022</h4>
      </div>

      <div className="gift-section">
            <h2 className="gift-title">Here's how happy I am for you today 🥳</h2>
            <h3 className="gift-hint">(Hover over the gift)</h3>
            <div className="gift-img" id="gift-img-happy"></div>
        </div>
        
        <div className="gift-section">
            <h2 className="gift-title">How people react when you enter the room 😍</h2>
            <div className="gift-img" id="gift-img-hot"></div>
        </div>
        
        <div className="gift-section">
            <h2 className="gift-title">If I had to describe you with ONE word 👇</h2>
            <div className="gift-img" id="gift-img-genius"></div>
        </div>
        
        <div className="gift-section">
            <h2 className="gift-title">The only person as badass as you 💪</h2>
            <div className="gift-img" id="gift-img-badass"></div>
        </div>
        
         <div className="gift-section">
            <h2 className="gift-title">This one's for you, my friend 🥂</h2>
            <div className="gift-img" id="gift-img-cheers"></div>
        </div>

        <div className="gift-section">
            <h2 className="gift-title">Have a blast 💥</h2>
            <div className="gift-img" id="gift-img-blast"></div>
        </div>
    </div>
  )
}
