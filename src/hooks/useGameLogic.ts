import { useState, useEffect, useCallback } from 'react';
import { Direction, Position, GameState } from '../types';

const GRID_SIZE = 20;
const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 5, y: 5 };
const GAME_SPEED = 150;

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: INITIAL_FOOD,
    direction: 'RIGHT',
    gameOver: false,
    score: 0,
    highScore: 0
  });

  const moveSnake = useCallback(() => {
    if (gameState.gameOver) return;

    setGameState((prev) => {
      const head = prev.snake[0];
      const newHead = { ...head };

      switch (prev.direction) {
        case 'UP':
          newHead.y = (head.y - 1 + GRID_SIZE) % GRID_SIZE;
          break;
        case 'DOWN':
          newHead.y = (head.y + 1) % GRID_SIZE;
          break;
        case 'LEFT':
          newHead.x = (head.x - 1 + GRID_SIZE) % GRID_SIZE;
          break;
        case 'RIGHT':
          newHead.x = (head.x + 1) % GRID_SIZE;
          break;
      }

      const newSnake = [newHead, ...prev.snake];
      const ateFood = newHead.x === prev.food.x && newHead.y === prev.food.y;

      if (!ateFood) {
        newSnake.pop();
      }

      // Check collision with self
      const collision = prev.snake.some(
        (segment) => segment.x === newHead.x && segment.y === newHead.y
      );

      if (collision) {
        return {
          ...prev,
          gameOver: true,
          highScore: Math.max(prev.score, prev.highScore)
        };
      }

      // Generate new food position if eaten
      let newFood = prev.food;
      if (ateFood) {
        newFood = {
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE)
        };
      }

      return {
        ...prev,
        snake: newSnake,
        food: newFood,
        score: ateFood ? prev.score + 1 : prev.score
      };
    });
  }, [gameState.gameOver]);

  const changeDirection = useCallback((newDirection: Direction) => {
    setGameState((prev) => {
      // Prevent 180-degree turns
      const invalidMove =
        (prev.direction === 'UP' && newDirection === 'DOWN') ||
        (prev.direction === 'DOWN' && newDirection === 'UP') ||
        (prev.direction === 'LEFT' && newDirection === 'RIGHT') ||
        (prev.direction === 'RIGHT' && newDirection === 'LEFT');

      if (invalidMove) return prev;

      return {
        ...prev,
        direction: newDirection
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState((prev) => ({
      snake: INITIAL_SNAKE,
      food: INITIAL_FOOD,
      direction: 'RIGHT',
      gameOver: false,
      score: 0,
      highScore: prev.highScore
    }));
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          changeDirection('UP');
          break;
        case 'ArrowDown':
          changeDirection('DOWN');
          break;
        case 'ArrowLeft':
          changeDirection('LEFT');
          break;
        case 'ArrowRight':
          changeDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [changeDirection]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameLoop);
  }, [moveSnake]);

  return {
    gameState,
    resetGame,
    GRID_SIZE
  };
};