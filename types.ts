interface Gift {
    description: string
    gift: string
}

export interface Bday {
    name: string
    dob: string
    image: string
    gifts: Gift[]
}