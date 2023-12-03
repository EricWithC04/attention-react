import { useState, useEffect } from 'react'

export const useTimer = (initialTime) => {

    const [ timer, setTimer ] = useState(initialTime)
    const [ runTime, setRunTime ] = useState(true)

    useEffect(() => {
        let interval;

        if (runTime === false) {
            setTimeout(() => {
                // alert("Tiempo!!!")
            }, 1000)
        }
        
        if (runTime) {
            interval = setInterval(() => {
                setTimer((prevSeconds) => {
                    if ((prevSeconds - 1) === 0) {
                        setRunTime(false)
                    }
                    return prevSeconds - 1
                })
            }, 1000)
        }
        if (timer === 0) {
            setRunTime(false)
        }

        return () => clearInterval(interval)
    }, [runTime])

    const handleClick = (e) => {
        e.preventDefault()
        setTimer(initialTime)
        setRunTime(true)
    }

    return {
        timer,
        handleClick
    }
}