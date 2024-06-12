import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ControlPanel from "../src/components/ControlPanel";

describe("ControlPanel Component", () => {
  test("renders correctly with initial props", () => {
    const turnRight = jest.fn();
    const move = jest.fn();
    const { getByText } = render(
      <ControlPanel
        direction="right"
        location={[0, 0]}
        turnRight={turnRight}
        move={move}
      />
    );

    expect(getByText(/Turn right/i)).toBeInTheDocument();
    expect(getByText(/Move forward/i)).toBeInTheDocument();
  });

  test("calls turnRight and move functions on button clicks", () => {
    const turnRight = jest.fn();
    const move = jest.fn();
    const { getByRole } = render(
      <ControlPanel
        direction="right"
        location={[0, 0]}
        turnRight={turnRight}
        move={move}
      />
    );

    fireEvent.click(getByRole("button", { name: /Turn right/i }));
    expect(turnRight).toHaveBeenCalled();

    fireEvent.click(getByRole("button", { name: /Move forward/i }));
    expect(move).toHaveBeenCalled();
  });
});
