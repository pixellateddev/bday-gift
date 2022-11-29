/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react'

import moment from 'moment'

import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'


import {sanityClient, urlFor} from '../../sanity'



interface Gift {
    description: string
    gift: string
}

interface Bday {
    name: string
    dob: string
    image: string
    gifts: Gift[]
}

interface Props {
    bday: Bday
}


export const getStaticPaths: GetStaticPaths = async () => {
    const query = `*[_type=="bday"]{
        slug
    }`
    
    const bdays = await sanityClient.fetch(query)
    return {
      paths: bdays.map((bday: any) => ({
        params: { id: bday.slug.current}
      })),
      fallback: 'blocking', // can also be true or 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const query = `*[_type=="bday" && slug.current=="${params?.id}"]{
        name,
        dob,
        image,
        gifts
    }`
    const data = await sanityClient.fetch(query)
    return {
        props: {
            bday: data[0]
        },
    }
}

const getAge = (dob: string) => {
    return moment().diff(dob, 'years', false)
}

export default function Home({bday}: Props ) {
    return (
        <div className='container'>
            <Head>
                <title>Happy Birthday {bday.name} 🎉</title>
            </Head>

            <div className='background'></div>

            <div className='header'>
                <h1>Today is {bday.name}&apos;s birthday 🎉</h1>
                <Image className='bday-img' alt={`{bday.name}'s Pic`} src={urlFor(bday.image).url()} width={150} height={150}/>
                <h2 className='bday-age'>{getAge(bday.dob)} years old</h2>
                <h4 className='bday-date'>{bday.dob}</h4>
            </div>

            {bday.gifts.map((gift, index) => (
                <div key={index} className='gift-section'>
                    <h2 className='gift-title'>{gift.description}</h2>
                    {index === 0 && <h3 className='gift-hint'>(Hover over the gift)</h3>}
                    <div className='gift-img' css={({
                        '&:hover': {
                            backgroundImage: `url("${urlFor(gift.gift).url()}")`
                        }
                    })}></div>
                </div>  
            ))}
        </div>
    )
}
