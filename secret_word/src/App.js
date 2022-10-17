// CSS
import './App.css';

// React
import { useState, useEffect} from 'react'

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

const guessesQtd = 3;


function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const[words] = useState(wordsList)
 
  //console.log(words)

  //Palavra, Categoria, letra
  const [pickedWord, setPickedWord ] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);


  //letras adivinhadas, letras erradas, tentativas, pontuação
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQtd);
  const [score, setScore] = useState(0);

  
    // buscando a categoria e palavra 
  const pickWordAndCategory = () => {

    const categories = Object.keys(words);

    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    const word = words[category][Math.floor(Math.random() * Object.keys(words).length)]
    
    return {word, category}  
  }

  // função para retornar para ir ao game
  const startGame = () => {

    const {word, category} = pickWordAndCategory()

    let wordLetters = word.split("")

    wordLetters = wordLetters.map((l) => l.toLowerCase()) 

     console.log(wordLetters)
     console.log(category)

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    // função para tela INICIO 
    setGameStage(stages[1].name)    
  }
  // função para retornar para ir ao game
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    //chegar se as letras ja foram utilizadas
    if(guessedLetters.includes(normalizedLetter) || 
      wrongLetters.includes(normalizedLetter) ){
      return;
    }

    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters)=> [
        ...actualGuessedLetters, 
        normalizedLetter,   
      ])
    }else{
      setGuessedLetters((actualWrongLetters)=> [
        ...actualWrongLetters, 
        normalizedLetter,   
      ])
    }
    setGuesses((actualGuesses) => actualGuesses - 1)

    console.log("tentativas: " + guesses);
    console.log("Letra certa " + guessedLetters);
    console.log("Letra errada " + wrongLetters);
  }

  //Limpar a lista de letras para proximo jogo
  const clearLetterStates = ()=>{
    setGuessedLetters([])
    setWrongLetters([])
  }

  useEffect(() => {
    if(guesses <= 0){
      clearLetterStates()
      setGameStage(stages[2].name)
    }
  }, [guesses]);
   
  // função para retornar para o inicio
  const retry = () => {
    setScore(0);
    setGuesses(guessesQtd);
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game
      verifyLetter = {verifyLetter}
      pickedWord = {pickedWord}
      pickedCategory = {pickedCategory}
      letters = {letters} 
      guessedLetters = {guessedLetters}
      wrongLetters = {wrongLetters}
      guesses = {guesses}
      score = {score}/>}
      {gameStage === 'end' && <GameOver retry={retry} score = {score} />}
    </div>
  );
}

export default App;
