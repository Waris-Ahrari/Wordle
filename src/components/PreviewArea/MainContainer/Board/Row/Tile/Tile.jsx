import React from 'react'
import './Tile.css'

const Tile = ({ Letter = '', isCorrect = false, isThere = false, isFixed = false }) => {
    // console.log(Letter, isCorrect, isThere);
    
    return (
        <div className=''>
            {isCorrect?<div className='Tile GreenBox'>{Letter}</div>: 
            isThere?<div className='Tile YellowBox'>{Letter}</div>: 
            isFixed?<div className='Tile GreyBox'>{Letter}</div>: 
            <div className='Tile'>{Letter}</div>}
        </div>
    )
}

export default Tile