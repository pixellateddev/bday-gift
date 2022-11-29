import moment from 'moment'

import { GetStaticPaths, GetStaticProps } from 'next'
import { useState } from 'react'
import BdayGift from '../components/BdayGIft'
import Timer from '../components/Timer'


import {sanityClient} from '../sanity'
import { Bday } from '../types'
import { getNextBday } from '../utils'



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
        revalidate: 10
    }
}





export default function Home({bday}: Props ) {
    const [_, setFlag] = useState(false)
    const nextBday = getNextBday(bday.dob)
    const isTodayBirthday = moment().isSame(nextBday, 'date')
    const isBelated = moment().diff(moment(nextBday).subtract(1, 'year'), 'days') < 7
    return (
        <div className='container'>
            <div className='background'></div>
            {isTodayBirthday && 
                <BdayGift bday={bday}/>
            }
            {!isTodayBirthday && (
                isBelated ? (
                    <BdayGift bday={bday} belated/>
                ) : (
                    <Timer till={nextBday} done={() => setFlag(true)} />
                )
            )}
        </div>
    )
}
