// src/tests/movementLogic.test.ts
import {
  renderEmoji,
  canMoveForward,
  move,
  turnRight,
  Direction,
} from "../src/components/App";

describe("Movement Logic", () => {
  test("can move forward correctly", () => {
    expect(canMoveForward([0, 0], "right")).toBe(true);
    expect(canMoveForward([9, 0], "right")).toBe(false);
    expect(canMoveForward([0, 0], "left")).toBe(false);
    expect(canMoveForward([0, 0], "up")).toBe(false);
    expect(canMoveForward([0, 9], "down")).toBe(false);
  });

  test("moves correctly", () => {
    const mockSetDirection = jest.fn();

    expect(move([0, 0], "right", mockSetDirection)).toEqual([1, 0]);
    expect(move([8, 0], "right", mockSetDirection)).toEqual([9, 0]); // Can move right
    expect(move([9, 0], "right", mockSetDirection)).toEqual([9, 0]); // Should turn down
    expect(mockSetDirection).toHaveBeenCalledWith("down");
    mockSetDirection.mockReset();

    expect(move([9, 0], "down", mockSetDirection)).toEqual([9, 1]); // Can move down
    expect(move([9, 9], "down", mockSetDirection)).toEqual([9, 9]); // Should turn left
    expect(mockSetDirection).toHaveBeenCalledWith("left");
    mockSetDirection.mockReset();

    expect(move([9, 9], "left", mockSetDirection)).toEqual([8, 9]); // Can move left
    expect(move([0, 9], "left", mockSetDirection)).toEqual([0, 9]); // Should turn up
    expect(mockSetDirection).toHaveBeenCalledWith("up");
    mockSetDirection.mockReset();

    expect(move([0, 9], "up", mockSetDirection)).toEqual([0, 8]); // Can move up
    expect(move([0, 0], "up", mockSetDirection)).toEqual([0, 0]); // Should turn right
    expect(mockSetDirection).toHaveBeenCalledWith("right");
  });

  test("turns right correctly", () => {
    expect(turnRight("right")).toBe("down");
    expect(turnRight("down")).toBe("left");
    expect(turnRight("left")).toBe("up");
    expect(turnRight("up")).toBe("right");
  });

  test("renders emoji correctly", () => {
    expect(renderEmoji("right")).toBe("👉🏽");
    expect(renderEmoji("up")).toBe("☝🏽");
    expect(renderEmoji("down")).toBe("👇🏽");
    expect(renderEmoji("left")).toBe("👈🏽");
  });

  test("handles edge cases correctly", () => {
    const mockSetDirection = jest.fn();

    // Test hitting the right edge and turning down
    let location = [9, 0];
    let direction: Direction = "right";
    location = move(location, direction, mockSetDirection);
    expect(location).toEqual([9, 0]);
    expect(mockSetDirection).toHaveBeenCalledWith("down");
    mockSetDirection.mockReset();

    // Test hitting the bottom edge and turning left
    location = [9, 9];
    direction = "down";
    location = move(location, direction, mockSetDirection);
    expect(location).toEqual([9, 9]);
    expect(mockSetDirection).toHaveBeenCalledWith("left");
    mockSetDirection.mockReset();

    // Test hitting the left edge and turning up
    location = [0, 9];
    direction = "left";
    location = move(location, direction, mockSetDirection);
    expect(location).toEqual([0, 9]);
    expect(mockSetDirection).toHaveBeenCalledWith("up");
    mockSetDirection.mockReset();

    // Test hitting the top edge and turning right
    location = [0, 0];
    direction = "up";
    location = move(location, direction, mockSetDirection);
    expect(location).toEqual([0, 0]);
    expect(mockSetDirection).toHaveBeenCalledWith("right");
    mockSetDirection.mockReset();
  });

  test("handles corner cases correctly", () => {
    const mockSetDirection = jest.fn();

    // Test hitting the top-left corner and turning right
    let location = [0, 0];
    let direction: Direction = "up";
    location = move(location, direction, mockSetDirection);
    expect(location).toEqual([0, 0]);
    expect(mockSetDirection).toHaveBeenCalledWith("right");
    mockSetDirection.mockReset();

    // Test hitting the top-right corner and turning down
    location = [9, 0];
    direction = "right";
    location = move(location, direction, mockSetDirection);
    expect(location).toEqual([9, 0]);
    expect(mockSetDirection).toHaveBeenCalledWith("down");
    mockSetDirection.mockReset();

    // Test hitting the bottom-right corner and turning left
    location = [9, 9];
    direction = "down";
    location = move(location, direction, mockSetDirection);
    expect(location).toEqual([9, 9]);
    expect(mockSetDirection).toHaveBeenCalledWith("left");
    mockSetDirection.mockReset();

    // Test hitting the bottom-left corner and turning up
    location = [0, 9];
    direction = "left";
    location = move(location, direction, mockSetDirection);
    expect(location).toEqual([0, 9]);
    expect(mockSetDirection).toHaveBeenCalledWith("up");
    mockSetDirection.mockReset();
  });
});
