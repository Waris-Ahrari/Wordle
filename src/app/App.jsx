import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import PreviewArea from '../components/PreviewArea/PreviewArea';
import './App.css';
// import fourLetterWordsPath from '../assets/fourLetterWords.txt';
import fiveLetterWordsPath from '../assets/fiveLetterWords.txt';
import { WordContext } from '../contexts/WordContext';

// Function to fetch words from a file
const fetchWords = async (filePath) => {
  try {
    const response = await fetch(filePath);
    const rawText = await response.text();
    const text = rawText.replace(/\r\n|\r/g, '\n');
    return text.split('\n').filter(word => word.trim() !== '');
  } catch (error) {
    console.error(`Error fetching ${filePath}:`, error);
    return [];
  }
};

// Function to select a random word from an array
const getRandomWord = (words) => {
  if (words.length === 0) return '';
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex].toUpperCase();
};

const App = () => {
  const [words, setWords] = useState([]);
  const [randomWord, setRandomWord] = useState('');

  //Function to check the word is valid
  const isWordValid = (checkWord) => {
    return words.includes(checkWord.toLowerCase());
  };

  useEffect(() => {
    const loadWords = async () => {
      const fetchedWords = await fetchWords(fiveLetterWordsPath);
      setWords(fetchedWords);
      setRandomWord(getRandomWord(fetchedWords));
    };

    loadWords();
  }, []); // This effect runs once on component mount


  return (

    <div className='Homepage'>
      <WordContext.Provider value={{ randomWord, isWordValid }}>
        <Header />
        <PreviewArea />
      </WordContext.Provider>
    </div>
  )
}

export default App