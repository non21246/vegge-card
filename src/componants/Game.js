import React, { useState, useEffect } from 'react';
import '../App.css';
import Hand from './Hand';
import Card from './Card';
import useSound from 'use-sound';
import bgm from '../assets/sounds/Background.mp3'
import mute from '../assets/sounds/mute.png'
import unMute from '../assets/sounds/unmute.png'

const createDeck = () => {
  const suits = ['H', 'D', 'C', 'S'];
  const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const deck = [];

  suits.forEach(suit => {
    ranks.forEach(rank => {
      deck.push({ rank, suit });
    });
  });

  return deck;
};

const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const Game = () => {
  const [deck, setDeck] = useState(shuffleDeck(createDeck()));
  const [player1Hand, setPlayer1Hand] = useState([]);
  const [player2Hand, setPlayer2Hand] = useState([]);
  const [centerPile, setCenterPile] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [musicIsMuted, setMusicIsMuted] = useState(false);
  const [play, { pause }] = useSound(bgm, { loop: true })
  const [remainShuffleCenterPile, setRemainShuffleCenterPile] = useState(1)

  const checkForWinner = () => {
    if (player1Hand.length === 0) {
      setWinner("Player 1");
      setGameOver(true);
      setPlayer1Hand([])
      setPlayer2Hand([])
    } else if (player2Hand.length === 0) {
      setWinner("Player 2");
      setGameOver(true);
      setPlayer1Hand([])
      setPlayer2Hand([])
    }
  };

  const handleTurnChange = () => {
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    setRemainShuffleCenterPile(1)
  };

  useEffect(() => {
    setPlayer1Hand(deck.slice(0, 8));
    setPlayer2Hand(deck.slice(8, 16));
    setCenterPile([deck[16]]);
  }, [deck]);

  useEffect(() => {
    play();
  }, [play]);

  const addToCenterPile = (selectedCard, playerId) => {
    if (playerId !== currentPlayer) {
      alert("It's not your turn!");
      return;
    }

    const topCard = centerPile.length > 0 ? centerPile[centerPile.length - 1] : null;
    if (!topCard || Math.abs(topCard.rank - selectedCard.rank) === 1 || 
        (topCard.rank === 13 && selectedCard.rank === 1) || 
        (topCard.rank === 1 && selectedCard.rank === 13)) {
      setCenterPile([selectedCard]);
      if (player1Hand.includes(selectedCard)) {
        setPlayer1Hand(player1Hand.filter(card => card !== selectedCard));
      } else if (player2Hand.includes(selectedCard)) {
        setPlayer2Hand(player2Hand.filter(card => card !== selectedCard));
      }
    //   const hand = playerId === 1 ? player1Hand: player2Hand
    //   checkWinner(hand);
    //   checkGameOver(hand, playerId);
    setRemainShuffleCenterPile(1);
    checkForWinner();
    handleTurnChange();
    } else {
      alert("You can only place cards that are +/- 1 of the card on top of the pile.");
    }
  };

  const restartGame = () => {
    setDeck(shuffleDeck(createDeck()));
    setPlayer1Hand([]);
    setPlayer2Hand([]);
    setCenterPile([]);
    setCurrentPlayer(1);
    setWinner(null);
    checkForWinner();
    setGameOver(false);
    setRemainShuffleCenterPile(1);
  };  

  const shuffleCenterPile = () => {
    if(remainShuffleCenterPile === 1){
        if (deck.length === 0) {
            alert("Deck is out!");
            return;
        }
    
        const newCard = deck.pop();
        setRemainShuffleCenterPile(0)
        setCenterPile([newCard]);
        setDeck(deck);
    }
    else {
        alert("you can't shuffle center pile!");
    }
  };

  return (
    <div className="App map">
      {gameOver ? (
        <div className="result-container">
          <h2>{winner} Wins!</h2>
          <button onClick={restartGame}>Restart Game</button>
        </div>
      ) : (
        <>
          <h2>Turn: Player {currentPlayer}</h2>
          <div className="center">
            <div className="centerPile">
              {centerPile.map((card, index) => (
                <Card key={index} rank={card.rank} suit={card.suit} />
              ))}
            </div>
          </div>
          {currentPlayer === 1 ? (
            <>
              <div className="player1Container">
                <div className="player1Label">Player 1</div>
                <div>
                  <Hand cards={player1Hand} addToCenterPile={(card) => addToCenterPile(card, 1)} />
                </div>
              </div>
              <button onClick={shuffleCenterPile} className="drawButtonPlayer1">Shuffle CenterPile</button>
              <div className="player2Container">
                <div>
                  <Hand cards={player2Hand} addToCenterPile={(card) => addToCenterPile(card, 2)} />
                </div>
                <div className="player2Label">Player 2</div>
              </div>
              <button onClick={handleTurnChange} className="drawButtonPlayer2">End Turn</button>
            </>
          ):(
            <>
              <div className="player1Container">
                <div className="player1Label">Player 2</div>
                <div>
                  <Hand cards={player2Hand} addToCenterPile={(card) => addToCenterPile(card, 2)} />
                </div>
              </div>
              <button onClick={shuffleCenterPile} className="drawButtonPlayer1">Shuffle CenterPile</button>
              <div className="player2Container">
                <div>
                  <Hand cards={player1Hand} addToCenterPile={(card) => addToCenterPile(card, 1)} />
                </div>
                <div className="player2Label">Player 1</div>
              </div>
              <button onClick={handleTurnChange} className="drawButtonPlayer2">End Turn</button>
            </>
          )}
        </>
      )}
      <span className='music-button-container'>
          <button onClick={() => {
            if (musicIsMuted)
            play();
          else 
            pause()
          setMusicIsMuted(!musicIsMuted)
        }}>
          {musicIsMuted ? <img className="material-icons" src={mute} alt='off'/> : <img className="material-icons" src={unMute} alt='on'/>}
          </button>
      </span>
    </div>
  );  
};

export default Game;