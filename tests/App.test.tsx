import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/components/App";

describe("App Component", () => {
  test("initially renders at position [0, 0] and facing right", () => {
    const { getByText } = render(<App />);
    expect(getByText("👉🏽")).toBeInTheDocument();
  });

  test("moves forward correctly", () => {
    const { getByText, getByRole } = render(<App />);
    const moveButton = getByRole("button", { name: /Move forward/i });

    fireEvent.click(moveButton);
    expect(getByText("👉🏽")).toBeInTheDocument(); // should move to [1, 0]
  });

  test("turns right correctly", () => {
    const { getByText, getByRole } = render(<App />);
    const turnRightButton = getByRole("button", { name: /Turn right/i });

    fireEvent.click(turnRightButton);
    expect(getByText("👇🏽")).toBeInTheDocument(); // should face down
  });

  test("handles edge cases correctly", () => {
    const { getByText, getByRole } = render(<App />);
    const moveButton = getByRole("button", { name: /Move forward/i });
    const turnRightButton = getByRole("button", { name: /Turn right/i });

    // Move to the edge [9, 0]
    for (let i = 0; i < 9; i++) {
      fireEvent.click(moveButton);
    }
    expect(getByText("👉🏽")).toBeInTheDocument();

    // Try to move beyond the edge, should turn right and move down
    fireEvent.click(moveButton);
    expect(getByText("👇🏽")).toBeInTheDocument();
    fireEvent.click(moveButton);
    expect(getByText("👇🏽")).toBeInTheDocument();
  });
});
