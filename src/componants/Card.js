import React from 'react';
import './Card.css';

function Card({ rank, suit }) {
  const card = `${rank}${suit}`
  const cardImage = require(`../assets/card-front/${card}.png`);
  return (
    <div className="card">
      <img src={cardImage} alt={`${rank}${suit}`} />
    </div>
  );
}

export default Card;
