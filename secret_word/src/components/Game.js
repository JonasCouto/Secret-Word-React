import './Game.css'

const Game = ({verifyLetter}) => {
  return (
    <div>
      <p>Game</p>
      <button onClick={verifyLetter} >Finalizar o Jogo</button>
    </div>
  )
}

export default Game