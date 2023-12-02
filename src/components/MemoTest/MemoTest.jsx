import React, { useState, useEffect } from 'react'
import Board from '../Board/Board';

const MemoTest = () => {

    const emojiList = [...'❤🌹🎶🎂🎈🕶💎🏈🍕🍔']

    const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState([]);
    const [selectedMemoBlock, setselectedMemoBlock] = useState(null);
    const [animating, setAnimating] = useState(false);

    useEffect( () => {
        //Le pasamos un array que posea 2 veces el mismo emoji y desordenamos el array
        const shuffledEmojiList = shuffleArray([...emojiList, ...emojiList]);
        //Guardamos con el formato de objeto el array desordenado
        setShuffledMemoBlocks(shuffledEmojiList.map( (emoji, i) => ({ index: i, emoji, flipped: false, success: false }) ));
    }, []);

    const shuffleArray = a => {
        //Recibe un array y desordena los elementos del mismo
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    const handleMemoClick = (memoBlock) => {
        const flippedMemoBlock = { ...memoBlock, flipped: true }
        let shuffledMemoBlocksCopy = [...shuffledMemoBlocks];
        shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock);
        setShuffledMemoBlocks(shuffledMemoBlocksCopy);
        if (selectedMemoBlock === null) {
            setselectedMemoBlock(memoBlock);
        } else if (selectedMemoBlock.emoji === memoBlock.emoji) {
            setTimeout(() => {
                shuffledMemoBlocksCopy.splice(memoBlock.index, 1, { ...memoBlock, flipped: true, success: true });
                shuffledMemoBlocksCopy.splice(selectedMemoBlock.index, 1, { ...selectedMemoBlock, flipped: true, success: true });
                setShuffledMemoBlocks(shuffledMemoBlocksCopy);
                setselectedMemoBlock(null);
            }, 500);
        } else {
            setAnimating(true)
            setTimeout(() => {
                shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
                shuffledMemoBlocksCopy.splice(selectedMemoBlock.index, 1, selectedMemoBlock);
                setShuffledMemoBlocks(shuffledMemoBlocksCopy);
                setselectedMemoBlock(null);
                setAnimating(false);
            }, 1000);
        }
    }

    return (
        <Board memoBlocks={shuffledMemoBlocks} animating={animating}  handleMemoClick={handleMemoClick} />
    );
}

export default MemoTest