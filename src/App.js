import React, { useState, useEffect } from "react";
import "./App.css";

// Card Component
const Card = ({ color, isFlipped, onClick }) => {
  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""}`}
      onClick={onClick}
      style={{ backgroundColor: isFlipped ? color : "#333" }}
    >
      {isFlipped ? "" : "?"}
    </div>
  );
};

// Main Game Component
const App = () => {
  // Initializing card colors with pairs (duplicate each color for matching)
  const colors = [
    "#FF5733",
    "#FF5733",
    "#33FFBD",
    "#33FFBD",
    "#335BFF",
    "#335BFF",
    "#FF33A6",
    "#FF33A6",
  ];

  // Shuffle the cards randomly
  const shuffleCards = () => {
    let shuffledColors = [...colors].sort(() => Math.random() - 0.5);
    return shuffledColors.map((color, index) => ({
      id: index,
      color,
      isFlipped: false,
      isMatched: false,
    }));
  };

  const [cards, setCards] = useState(shuffleCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);

  // Handle card click
  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || cards[index].isFlipped) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    setFlippedCards([...flippedCards, index]);
  };

  // Check for matches when two cards are flipped
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.color === secondCard.color) {
        // Mark cards as matched
        const newCards = [...cards];
        newCards[firstIndex].isMatched = true;
        newCards[secondIndex].isMatched = true;
        setCards(newCards);
      } else {
        // Flip cards back over after a delay
        setTimeout(() => {
          const newCards = [...cards];
          newCards[firstIndex].isFlipped = false;
          newCards[secondIndex].isFlipped = false;
          setCards(newCards);
        }, 1000);
      }

      // Reset flipped cards
      setFlippedCards([]);
      setMoves(moves + 1);
    }
  }, [flippedCards, cards, moves]);

  // Restart the game
  const resetGame = () => {
    setCards(shuffleCards());
    setFlippedCards([]);
    setMoves(0);
  };

  return (
    <div className="app">
      <h1>Memory Matching Game</h1>
      <p>Moves: {moves}</p>
      <button onClick={resetGame}>Restart</button>
      <div className="grid">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            color={card.color}
            isFlipped={card.isFlipped || card.isMatched}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
