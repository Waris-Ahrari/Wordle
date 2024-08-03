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
    const text = await response.text();    
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
      <WordContext.Provider value={{ randomWord }}>
      <Header />
      <PreviewArea />
      </WordContext.Provider>
    </div>
  )
}

export default App