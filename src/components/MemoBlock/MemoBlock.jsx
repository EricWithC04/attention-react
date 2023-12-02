import React from 'react'
import logo from "../../assets/logo-1.png"
import style from './MemoBlock.module.css'

const MemoBlock = ({ handleMemoClick, animating, memoBlock }) => {
    return (
        <div className={style.memoBlock} onClick={() => (!animating && !memoBlock.flipped) ? handleMemoClick(memoBlock) : null}>
            <div className={`${style.memoBlockInner} ${memoBlock.flipped ? style.memoBlockFlipped : ''}`}>
                <div className={style.memoBlockFront}>
                    <img src={logo} />
                </div>
                <div className={`${style.memoBlockBack} ${memoBlock.success ? style.memoBlockSuccess : ''}`}>
                    {memoBlock.emoji}
                </div>
            </div>
        </div>
    )
}

export default MemoBlock