import React, { useContext } from 'react'
import './Board.css'
import Row from './Row/Row'
import { ListContext } from '../../../../contexts/ListContext'
const Board = () => {
    const { listItems } = useContext(ListContext)
    return (
        <div className='Board'>
            {listItems.map((val, index) => {
                return (
                    <Row key={index} word = {val}/>
                )
            }
            )}
        </div>
    )
}

export default Board