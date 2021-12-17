import './App.css'
import { useState, useEffect } from 'react'
import SingleCard from './components/SingleCard'


const cardImages = [
  { 'src': '/img/helmet-1.png', matched: false },
  { 'src': '/img/potion-1.png', matched: false },
  { 'src': '/img/ring-1.png', matched: false },
  { 'src': '/img/scroll-1.png', matched: false },
  { 'src': '/img/shield-1.png', matched: false },
  { 'src': '/img/sword-1.png', matched: false }
]


function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  const [disabled, setDisabled] = useState()


  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]

    .sort(() => Math.random() - 0.5)  //sort does the actual shuffling of 12 cardImages

    .map((card) => ({ ...card, id: Math.random() }))  //map gives each card a random id

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)  //now cards isn't an empty array
    setTurns(0)
  }


  // start new game automagically, on each load
useEffect(() => {
  shuffleCards()
}, [])


  //handle choice function below
  const handleChoice = (card) => {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }


  //compare 2 selected cards
  useEffect(() => {
    
      if(choiceOne && choiceTwo) {
        setDisabled(true)
        if(choiceOne.src === choiceTwo.src) {
          setCards(prevCards => {
            return prevCards.map(card => {
              if (card.src === choiceOne.src) {
                return {...card, matched: true}
              } else {
                return card
              }
            })
          })
          resetTurn()
        } else {
          setTimeout(() => resetTurn(), 500)
        }

      }
  }, [choiceOne, choiceTwo]
  )

console.log(cards)


  // reset choices & increase turn by 1
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }



  return (
    <div className="App">

        <h1>Philips Magic Match</h1>
        <button onClick = {shuffleCards}>Start Game</button>

        <div className='card-grid'>
          {cards.map(card => (    //parenthesis instead of curly braces means we dont have to use 'return' keyword on next line
              <SingleCard 
              key={card.id} 
              card={card}
              handleChoice= {handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
              />
          ))}
        </div>
        <p>Turns: {turns}</p>
    </div>
  );
}

export default App