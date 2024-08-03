import React, { useContext, useEffect } from 'react'
import './PreviewArea.css'
import { useState } from "react";
import MainContainer from './MainContainer/MainContainer';
import { ListContext } from '../../contexts/ListContext';
import { WordContext } from '../../contexts/WordContext';

const n = 5, m = 6;

const guesses = new Array(m).fill(new Array(n).fill(
  { Letter: '', isCorrect: false, isThere: false, isFixed: false }
))


const PreviewArea = () => {
  const [listItems, setListItems] = useState(guesses)
  const { randomWord } = useContext(WordContext)
  let currentRow = 0, currentCol = 0, prevGrid = [...listItems];

  const handleBackspace = (key) => {
    if (currentCol >= 0) {
      // console.log('Backspcae at position [', currentRow, '][', currentCol, ']');
      //Delete one element
      const newGrid = prevGrid.map((row, rowIndex) => (
        rowIndex === currentRow
          ? row.map((cell, colIndex) => (
            colIndex === currentCol - 1
              ? { Letter: '', isCorrect: false, isThere: false }
              : cell
          ))
          : row
      ));
      setListItems(newGrid)
      prevGrid = [...newGrid]
      // console.log(newGrid);
      if (currentCol !== 0) {
        currentCol -= 1;
      }
    }
  };

  const updateGrid = (key) => {
    if (currentRow < m && currentCol < n) {
      // console.log(key, 'at position [', currentRow, '][', currentCol, ']');
      //Update the grid with entered key
      const newGrid = prevGrid.map((row, rowIndex) => (
        rowIndex === currentRow
          ? row.map((cell, colIndex) => (
            colIndex === currentCol
              ? { Letter: key, isCorrect: false, isThere: false, isFixed: false }
              : cell
          ))
          : row
      ));
      setListItems(newGrid)
      prevGrid = [...newGrid]
      // console.log(newGrid);
      currentCol += 1
      // setCurrentCol(currentCol + 1)
    }
  };


  const handleEnter = () => {
    if (currentCol >= n) {
      // Convert randomWord into an array of characters
      const actualLetters = randomWord.split('');
      // Initialize letter counts for randomWord
      const letterCount = actualLetters.reduce((acc, letter) => {
        acc[letter] = (acc[letter] || 0) + 1;
        return acc;
      }, {});

      // First pass: Mark correct letters (green) and update letter counts
      const newGridAfterGreen = prevGrid.map((row, rowIndex) => (
        rowIndex === currentRow
          ? row.map((cell, colIndex) => {
            if (actualLetters[colIndex] === cell.Letter) {
              letterCount[cell.Letter]--; // Decrease count for correct letters
              return { Letter: cell.Letter, isCorrect: true, isThere: true, isFixed: true };
            }
            return cell; // Keep unchanged if not green
          })
          : row
      ));

      // Second pass: Mark misplaced letters (yellow) and incorrect letters (grey)
      const newGrid = newGridAfterGreen.map((row, rowIndex) => (
        rowIndex === currentRow
          ? row.map((cell, colIndex) => {
            if (cell.isCorrect) return cell; // Skip cells already marked green
            if (letterCount[cell.Letter] > 0 && actualLetters.includes(cell.Letter)) {
              letterCount[cell.Letter]--; // Decrease count for misplaced letters
              return { Letter: cell.Letter, isCorrect: false, isThere: true, isFixed: true };
            }
            return { Letter: cell.Letter, isCorrect: false, isThere: false, isFixed: true };
          })
          : row
      ));

      // Update state and reset the current position
      setListItems(newGrid);
      prevGrid = [...newGrid];
      currentRow += 1;
      currentCol = 0;
    }
    if (currentRow >= m){
      console.log(randomWord);
      alert(`Game Over !!! The Word was --> ${randomWord}`)
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toUpperCase();

      if (key.length === 1 && key.match(/[A-Z]/)) { // Check if it's an alphabet key
        updateGrid(key);
      } else if (key === 'BACKSPACE') {
        handleBackspace();
        console.log('BackSpace');

      } else if (key === 'ENTER') {
        handleEnter();
        console.log('Enter');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [randomWord]);

  return (
    <ListContext.Provider value={{ listItems, setListItems }}>
      <div className='PreviewArea'>
        <MainContainer />
      </div>
    </ListContext.Provider>
  )
}

export default PreviewArea