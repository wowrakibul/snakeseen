import React from 'react';
import { GameBoard } from './components/GameBoard';
import { useGameLogic } from './hooks/useGameLogic';
import { Gamepad2 } from 'lucide-react';

function App() {
  const { gameState, resetGame, GRID_SIZE } = useGameLogic();
  const { snake, food, gameOver, score, highScore } = gameState;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <div className="flex items-center gap-2 mb-6">
          <Gamepad2 className="w-8 h-8 text-green-500" />
          <h1 className="text-3xl font-bold text-gray-800">Snake Game</h1>
        </div>

        <div className="flex justify-between mb-4">
          <div className="text-lg">Score: {score}</div>
          <div className="text-lg">High Score: {highScore}</div>
        </div>

        <GameBoard
          snake={snake}
          food={food}
          gridSize={GRID_SIZE}
          gameOver={gameOver}
        />

        {gameOver && (
          <div className="mt-4 text-center">
            <p className="text-xl font-semibold text-red-500 mb-4">Game Over!</p>
            <button
              onClick={resetGame}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Play Again
            </button>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-600">
          <p className="font-medium">How to play:</p>
          <p>Use arrow keys to control the snake</p>
          <p>Eat the red food to grow and score points</p>
          <p>Don't crash into yourself!</p>
        </div>
      </div>
    </div>
  );
}

export default App;