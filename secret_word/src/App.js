
// CSS
import './App.css';

// React
import {useCallback, useState, useEffect} from 'react'


// data
import{wordsList} from './data/wordsList'

// Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

// TELAS DO GAME
const stages = [
  {id: 1, name:"start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const[words, setWords] = useState(wordsList)
  //console.log(words)

  const [pickedWord, setPickedWord ] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);

  const pickWordAndCategory = () => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    
    const word = words[category][Math.floor(Math.random() * Object.keys(words).length)]
    
    //console.log(category)
    //console.log(word)
    return {word, category}
    
  }


  // função para retornar para ir ao game
  const startGame = () => {

    const {word, category} = pickWordAndCategory()

    let wordLetters = word.split('')

    wordLetters = wordLetters.map((l) => l.toLowerCase()) 

    console.log(wordLetters)
    console.log(category)

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);


    setGameStage(stages[1].name)    
  }

  const verifyLetter = () => {
    setGameStage(stages[2].name)  
  }
   
  // função para retornar para o inicio
  const retry = () => {
    setGameStage(stages[0].name)  
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter} />}
      {gameStage === 'end' && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
