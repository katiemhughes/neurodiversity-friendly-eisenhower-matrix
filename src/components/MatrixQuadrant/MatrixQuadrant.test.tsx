import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MatrixQuadrant, { Item, Quadrants } from './MatrixQuadrant';

describe('MatrixQuadrant Component', () => {
  const mockItems: Item = { item1: 'Task 1' };
  const mockQuadrants: Quadrants = {
    quadrant1: ['Task 1'],
    quadrant2: [],
    quadrant3: [],
    quadrant4: [],
  };

  const quadrantKey = 'quadrant1';

  const mockAddItem = jest.fn((key, event) => {
    event.preventDefault();

    const newItem = 'New Task';

    if (newItem) {
      localStorage.setItem(quadrantKey, newItem);
    }
  });

  const mockDeleteItem = jest.fn((key: string, deletedItemIndex: number) => {
    localStorage.setItem(
      quadrantKey,
      JSON.stringify([
        ...mockQuadrants[quadrantKey].filter(
          (item, index) => index !== deletedItemIndex,
        ),
      ]),
    );
  });

  const mockHandleQuadrantInputChange = jest.fn((event) => {
    localStorage.setItem(quadrantKey, event.target.value);
  });

  test('renders quadrant titles correctly', () => {
    render(
      <MatrixQuadrant
        items={mockItems}
        quadrants={mockQuadrants}
        addItem={mockAddItem}
        deleteItem={mockDeleteItem}
        handleQuadrantInputChange={mockHandleQuadrantInputChange}
        lowBatteryIcon={<svg />}
        fullBatteryIcon={<svg />}
      />,
    );

    expect(
      screen.getByText(/High Interest \/ High Energy/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/High Interest \/ Low Energy/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Low Interest \/ High Energy/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Low Interest \/ Low Energy/i)).toBeInTheDocument();
  });
});
