import React from 'react';
import { Position } from '../types';

interface GameBoardProps {
  snake: Position[];
  food: Position;
  gridSize: number;
  gameOver: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  snake,
  food,
  gridSize,
  gameOver
}) => {
  const cells = Array(gridSize)
    .fill(null)
    .map((_, y) =>
      Array(gridSize)
        .fill(null)
        .map((_, x) => ({ x, y }))
    );

  const isSnake = (pos: Position) =>
    snake.some((segment) => segment.x === pos.x && segment.y === pos.y);

  const isFood = (pos: Position) => food.x === pos.x && food.y === pos.y;

  return (
    <div className={`relative ${gameOver ? 'opacity-50' : ''}`}>
      <div className="grid gap-[1px] bg-gray-200 p-[1px]" 
           style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
        {cells.flat().map((pos, index) => (
          <div
            key={index}
            className={`w-5 h-5 ${
              isSnake(pos)
                ? 'bg-green-500'
                : isFood(pos)
                ? 'bg-red-500'
                : 'bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};