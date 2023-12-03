import { useState, useEffect } from 'react'
import { useMemoTestContext } from '../../MemoTest/context/MemoTestContext'

export const useTimer = (initialTime) => {

    const [ timer, setTimer ] = useState(initialTime)

    const {
        runTime,
        setRunTime
    } = useMemoTestContext()

    useEffect(() => {
        let interval;

        if (runTime === false && timer === 0) {
            setTimeout(() => {
                alert("Se ha terminado el tiempo!")
                window.location.reload()
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