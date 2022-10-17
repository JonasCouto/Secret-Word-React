import { useState, useRef } from 'react'
import './Game.css'

const Game = ({verifyLetter,
             guessedLetters,
             wrongLetters,
             guesses,
             score,
             pickedWord,
             pickedCategory,
             letters}) => {
const [letter, setLetter] = useState('');
const letterInputref = useRef(null);

function handleSubmit(event){
  event.preventDefault();

  verifyLetter(letter);

  setLetter('');

  letterInputref.current.focus();
}        
  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score} </span>
      </p>
      <h1>Advinhe a palavra</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativas.</p>
      <div className="wordContainer">
        {letters.map((letter, i) => 
          guessedLetters.includes(letter) ? (
            <span key={i} className='letter'>
              {letter}
            </span>
          ) : (
            <span key={i} className='blankSquare' >              
            </span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>Tente advinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input type="text"
                 name='letter'
                 maxLength={1}
                 required onChange={(event) => (setLetter(event.target.value))}
                 value={letter}
                 ref={letterInputref}/>
          <button>Jogar</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras já utilizadas</p>
          {wrongLetters.map((letter, i)=> (
            <span key={i}>{letter}</span>
          )          
          )}
      </div>
    </div>
  )
}
export default Game