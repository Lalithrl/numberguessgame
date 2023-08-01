// components/Game.js
import React, { useState } from 'react';
import axios from 'axios';

const Game = () => {
  const [playerName, setPlayerName] = useState('');
  const [guess, setGuess] = useState('');
  const [gameId, setGameId] = useState('');
  const [gameResult, setGameResult] = useState('');
  const [numberOfGuesses, setNumberOfGuesses] = useState(0);

  const handleNewGame = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/start', { playerName });
      setGameId(response.data.gameId);
      setGameResult('');
      setNumberOfGuesses(0);
    } catch (error) {
      console.error('Failed to start a new game:', error);
    }
  };

  const handleGuess = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/guess/${gameId}`, { guess });
      const { plus, minus, guesses } = response.data;

      if (plus === 4) {
        setGameResult(`Congratulations! You guessed the number in ${guesses} guesses!`);
      } else {
        setGameResult(`+${plus}, -${minus}`);
        setNumberOfGuesses(guesses);
      }
    } catch (error) {
      console.error('Failed to submit guess:', error);
    }
  };

  return (
    <div>
      {gameId ? (
        <>
          <p>Player: {playerName}</p>
          <p>Number of Guesses: {numberOfGuesses}</p>
          <input
            type="text"
            placeholder="Enter your guess (4 digits)"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
          <button onClick={handleGuess}>Guess</button>
          <p>{gameResult}</p>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button onClick={handleNewGame}>Start New Game</button>
        </>
      )}
    </div>
  );
};

export default Game;
