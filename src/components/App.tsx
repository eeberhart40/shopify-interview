// src/App.tsx
import React, { useState } from "react";
import ControlPanel from "./ControlPanel";
import Grid from "./Grid";

export type Direction = "right" | "left" | "up" | "down";

export const canMoveForward = (location: number[], direction: Direction) => {
  if (location[0] === 9 && direction === "right") return false;
  if (location[0] === 0 && direction === "left") return false;
  if (location[1] === 0 && direction === "up") return false;
  if (location[1] === 9 && direction === "down") return false;

  return true;
};

export const move = (
  location: number[],
  direction: Direction,
  setDirection: (dir: Direction) => void
) => {
  let newLocation = [...location];
  if (canMoveForward(location, direction)) {
    if (direction === "right") {
      newLocation = [location[0] + 1, location[1]];
    } else if (direction === "left") {
      newLocation = [location[0] - 1, location[1]];
    } else if (direction === "up") {
      newLocation = [location[0], location[1] - 1];
    } else if (direction === "down") {
      newLocation = [location[0], location[1] + 1];
    }
  } else {
    const newDirection = turnRight(direction);
    setDirection(newDirection);
  }
  return newLocation;
};

export const turnRight = (direction: Direction): Direction => {
  if (direction === "right") return "down";
  if (direction === "down") return "left";
  if (direction === "left") return "up";
  if (direction === "up") return "right";
  return direction;
};

export const renderEmoji = (direction: Direction) => {
  if (direction === "right") return "👉🏽";
  if (direction === "up") return "☝🏽";
  if (direction === "down") return "👇🏽";
  if (direction === "left") return "👈🏽";
};

const App: React.FC = () => {
  const [location, setLocation] = useState<number[]>([0, 0]);
  const [direction, setDirection] = useState<Direction>("right");

  const handleMove = () => {
    setLocation(move(location, direction, setDirection));
  };

  const handleTurnRight = () => {
    setDirection(turnRight(direction));
  };

  const isInCell = (position: number[]) => {
    return location[0] === position[0] && location[1] === position[1];
  };

  const grid = [];
  for (let i = 0; i < 10; i++) {
    const col = [];
    for (let j = 0; j < 10; j++) {
      col.push([i, j]);
    }
    grid.push(col);
  }

  return (
    <div className="flex flex-col w-[400px] items-center justify-center mt-[50px] gap-4 p-[50px] m-auto">
      <ControlPanel
        direction={direction}
        location={location}
        turnRight={handleTurnRight}
        move={handleMove}
      />
      <Grid
        grid={grid}
        isInCell={isInCell}
        renderEmoji={() => renderEmoji(direction)}
      />
    </div>
  );
};

export default App;
