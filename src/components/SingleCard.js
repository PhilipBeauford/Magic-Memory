import React from 'react'
import './SingleCard.css'

function singleCard({ card, handleChoice, flipped, disabled }) { //this parameter area is the place to 'import' props

    const handleClick = () => {
        if(!disabled) {
            handleChoice(card)
        }
    }

    return (
        <div className= 'card'>
            <div className={flipped ? 'flipped' : ''}>
                <img className='front' src={card.src} alt='card front' />
                <img 
                className='back' 
                src='/img/cover.png' 
                onClick={handleClick} 
                alt='card back' 
                />
            </div>
        </div>
    )
}

export default singleCard
