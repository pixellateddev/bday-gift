import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'


export const sanityClient = createClient({
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    token: process.env.SANITY_API_TOKEN,
    useCdn: true,
    apiVersion: '2022-11-29'
})

const builder = imageUrlBuilder(sanityClient)

export const urlFor = source => {
    try {
        return builder.image(source).url()
    } catch(err) {
        return ''
    }
}
