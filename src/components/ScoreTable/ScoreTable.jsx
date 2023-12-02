import React from 'react'
import style from "./ScoreTable.module.css"
import { useTimer } from './hook/useTimer'

const ScoreTable = () => {

    const {
        timer,
        score,
        handleClick
    } = useTimer(5)

    return (
        <div className={style.scoreTable}>
            <div className={`${style.headerScoreTable} bg-purple-light text-white`} />
            <div className='d-flex h-100 w-100'>
                <div className={`d-flex flex-column align-items-center mt-3 ${style.scoreTableContent}`}>
                    <p>Tiempo: </p>
                    <p>{timer}</p>
                    <button className='btn btn-primary' onClick={handleClick}>Empezar</button>
                </div>
                <div className={`vr ${style.verticalLine}`}/>
                <div className={`d-flex flex-column align-items-center mt-3 ${style.scoreTableContent}`}>
                    <p>Puntaje: </p>
                    <p>{score}</p>
                    <button className='btn btn-primary'>Continuar</button>
                </div>
            </div>
        </div>
    )
}

export default ScoreTable