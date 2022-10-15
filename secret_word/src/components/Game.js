import './Game.css'

const Game = ({verifyLetter,
             guessedLetters,
             wrongLetters,
             guesses,
             score,
             pickedWord,
             pickedCategory,
             letters}) => {
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
          guessedLetters.includes(letters) ? (
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
        <form>
          <input type="text" name='letter' maxLength={1} required />
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