import React from "react";

type GridProps = {
  grid: number[][][];
  isInCell: (position: number[]) => boolean;
  renderEmoji: () => string | undefined;
};

const Grid: React.FC<GridProps> = ({ grid, isInCell, renderEmoji }) => {
  return (
    <div className="h-[400px] w-[400px] flex border-solid border-black border-[2px]">
      {grid.map((col, i) => {
        return (
          <div
            key={`col-${i}`}
            className="flex flex-col text-center text-sm flex-1"
          >
            {col.map((cell, j) => {
              return (
                <div
                  key={`${i}-${j}`}
                  className="cell-custom flex items-center justify-center"
                >
                  {isInCell([i, j]) && renderEmoji()}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
