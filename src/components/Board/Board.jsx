import React from 'react'
import MemoBlock from '../MemoBlock/MemoBlock'
import style from "./Board.module.css"

const Board = ({ handleMemoClick, animating, memoBlocks }) => {
    return (
        <main className={style.board}>
            {
                memoBlocks.map((memoBlock, i) => (
                    <MemoBlock key={i} memoBlock={memoBlock} handleMemoClick={handleMemoClick} animating={animating} />
                ))
            }
        </main>
    )
}

export default Board