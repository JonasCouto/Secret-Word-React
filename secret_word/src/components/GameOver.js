import "./GameOver.css"

const GameOver = ({retry}) => {
  return (
    <div>
      <p>GameOver</p>
      <button onClick={retry} >Ir para o começo</button>
    </div>
  )
}

export default GameOver