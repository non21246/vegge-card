import React from 'react';
import Card from './Card';

const Hand = ({ cards, addToCenterPile }) => {
  return (
    <div className="hand">
      {cards.map((card, index) => (
        <div onClick={() => addToCenterPile(card)} key={index}>
          <Card rank={card.rank} suit={card.suit} />
        </div>
      ))}
    </div>
  );
};

export default Hand;
