import React from 'react'

const PlayCards = ({options}) => {
    return (
        <div className='cardsContainer'>
            {options.map((option) => (
              <div className='cardItem' key={option} ><h1>{option}</h1> </div>
            ))}
        
        </div>
    )
}

export default PlayCards
