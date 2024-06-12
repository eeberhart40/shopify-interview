import React from "react";

type ControlPanelProps = {
  direction: string;
  location: number[];
  turnRight: () => void;
  move: () => void;
};

const ControlPanel: React.FC<ControlPanelProps> = ({
  direction,
  location,
  turnRight,
  move,
}) => {
  return (
    <div className="flex gap-2 items-start w-full">
      <button
        className="cursor-pointer"
        onClick={turnRight}
        aria-description={`current direction: ${direction}`}
      >
        Turn right
      </button>
      <button
        className="cursor-pointer"
        onClick={move}
        aria-description={`current location: ${location}`}
      >
        Move forward
      </button>
    </div>
  );
};

export default ControlPanel;
