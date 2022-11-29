import { FC, useEffect, useState } from "react";
import moment from 'moment'
import Head from "next/head";

interface Props {
    till: moment.Moment
    done: () => void
}

const Timer: FC<Props> = ({till, done}) => {
    const [diff, setDiff] = useState(till.diff(moment(), 'second'))
    if (diff === 0) {
        done()
    }
    let n = diff
    const days = Math.round(n / (24 * 3600))
    n = n % (24 * 3600);
    const hours = Math.round(n / 3600)
    n = n % 3600
    const minutes = Math.round(n / 60)  
    const seconds = n % 60
    useEffect(() => {
        const interval = setInterval(() => {
            setDiff(prevDiff => prevDiff - 1)
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])
    return (
        <div className="timer-container">
            <Head>
                <title>So Soon 🎉</title>
            </Head>
            <div className="timer">
                <h2>You are here early</h2>
                <h3>Come back in</h3>
                <p className="time">
                    {days !== 0 && <span>{days > 1 ? `${days} Days` : `${days} Day`}, </span>}
                    {(days + hours) !== 0 && <span>{hours > 1 ? `${hours} Hours` : `${hours} Hour`}, </span>}
                    {(days + hours + minutes) !== 0 && <span>{minutes > 1 ? `${minutes} Minutes` : `${minutes} Minute`}, </span>}
                    {(days + hours + minutes + seconds) !== 0 && <span>{seconds > 1 ? `${seconds} Seconds` : `${seconds} Second`}</span>}
                </p>

                <h3>To see your gift 🎁</h3>
            </div>
        </div>
    )
}

export default Timer