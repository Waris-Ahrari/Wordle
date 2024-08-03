import React from 'react'
import './Row.css'
import Tile from './Tile/Tile'
const Row = ({ word = [] }) => {
    // console.log('This is word list', word);
    return (
        <div className='Row'>
            {word.map((val, index) => {
                return (
                    <Tile key={index} Letter = {val.Letter}  isCorrect = {val.isCorrect} isThere = {val.isThere}  isFixed = {val.isFixed}/>
                )
            }
            )}

        </div>
    )
}

export default Row