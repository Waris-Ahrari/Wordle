import React from 'react'
import './MainContainer.css'
import Board from './Board/Board'

const MainContainer = () => {
    return (
        <div className='MainContainer'>
            <div className='TopSection'>
                <div className='Heading'>Wordle</div>
            </div>
            <Board/>
        </div>
    )
}

export default MainContainer