export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export type Position = {
  x: number;
  y: number;
};

export type GameState = {
  snake: Position[];
  food: Position;
  direction: Direction;
  gameOver: boolean;
  score: number;
  highScore: number;
};