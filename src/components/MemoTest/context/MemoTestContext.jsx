import React, { createContext, useState, useContext } from "react";

export const MemoTestContext = createContext()

export const useMemoTestContext = () => useContext(MemoTestContext)

export const MemoTestProvider = ({ children }) => {

    const [score, setScore] = useState(0)

    return (
        <MemoTestContext.Provider value={{
            score,
            setScore
        }}>
            {children}
        </MemoTestContext.Provider>
    )
}

