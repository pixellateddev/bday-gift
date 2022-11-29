import moment from "moment"


export const pad = (value: string | number, by: string, position: 'start' | 'end'='start', length=2) => {
    if (position === 'start') {
        return String(value).padStart(length, by)
    }
    return String(value).padEnd(length, by)
}

export const padNum = (value: string | number) => {
    return pad(value, '0')
}

export const getNextBday = (dateOfBirth: string): moment.Moment  => {
    const dobMoment = moment(dateOfBirth)
    const dobDate = dobMoment.date()
    const dobMonth = dobMoment.month() + 1
    const currentDate = moment().date()
    const currentMonth = moment().month() + 1
    const currentYear = moment().year()

    const nextBday = moment(`${currentYear}${padNum(dobMonth)}${padNum(dobDate)}`)

    if (`${padNum(currentMonth)}${padNum(currentDate)}` > `${padNum(dobMonth)}${padNum(dobDate)}`) {
        nextBday.add(1, 'year')
    }

    return nextBday
}

export const getAge = (dob: string) => {
    return moment().diff(dob, 'years', false)
}