/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react'

import Head from "next/head";
import Image from "next/image";
import { FC, useEffect, useRef } from "react";
import { urlFor } from "../sanity";
import { Bday } from "../types";
import { getAge } from "../utils";



interface Props {
    bday: Bday
    belated?: boolean
}

const BdayGift: FC<Props> = ({bday, belated}) => {
    const ref = useRef<HTMLAudioElement>(null)
    const play = () => {
        ref.current?.play()
    }


    const firstName = bday.name.split(' ')[0]

    return (
        <div onTouchStart={play} onClick={play}>
            <Head>
                <title>Happy Birthday {firstName} 🎉</title>
            </Head>
            <audio ref={ref} src='/bday.mp3' loop/>
            <div className='header'>
                <h1>{belated ? `Happy Belated Birthday ${firstName}` : `Today is ${firstName}'s birthday 🎉`}</h1>

                <Image className='bday-img' alt={`{bday.name}'s Pic`} src={urlFor(bday.image)} width={150} height={150}/>
                <h2 className='bday-age'>{getAge(bday.dob)} years old</h2>
                <h4 className='bday-date'>{bday.dob}</h4>
            </div>

            {bday.gifts?.map((gift, index) => (
                <div key={index} className='gift-section'>
                    <h2 className='gift-title'>{gift.description}</h2>
                    {index === 0 && <h3 className='gift-hint'>(Hover / Click over the gift)</h3>}
                    <div className='gift-img' css={({
                        transition: 'ease 1s',
                        '&:hover': {
                            backgroundImage: `url("${urlFor(gift.gift)}")`,
                        }
                    })}></div>
                </div>  
            ))}
        </div>
    )
}

export default BdayGift