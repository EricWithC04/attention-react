import React, { createContext, useState, useContext } from "react";

export const MemoTestContext = createContext()

export const useMemoTestContext = () => useContext(MemoTestContext)

export const MemoTestProvider = ({ children }) => {

    const [score, setScore] = useState(0)
    const [memoComplete, setMemoComplete] = useState(false);
    const [ runTime, setRunTime ] = useState(true)

    return (
        <MemoTestContext.Provider value={{
            score,
            setScore,
            runTime,
            setRunTime,
            memoComplete,
            setMemoComplete
        }}>
            {children}
        </MemoTestContext.Provider>
    )
}

