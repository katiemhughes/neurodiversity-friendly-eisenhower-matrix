import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MatrixItems from '../MatrixItems';
import { Item, Quadrants } from '../MatrixQuadrant';

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('MatrixItems component', () => {
  const quadrantKey = 'quadrant1'; // Define the quadrantKey
  const quadrants = {
    quadrant1: [''],
  } as Quadrants;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mockDeleteItem = jest.fn((key: string, deletedItemIndex: number) => {
    localStorageMock.setItem(
      quadrantKey,
      JSON.stringify([
        ...quadrants[quadrantKey].filter(
          (item, index) => index !== deletedItemIndex,
        ),
      ]),
    );
  });

  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();

    localStorageMock.setItem(
      quadrantKey,
      JSON.stringify(quadrants[quadrantKey]),
    );
  });

  test('removes task from localStorage on delete button click', () => {
    render(
      <MatrixItems
        items={{ quadrant1: '' } as Item}
        quadrantKey={quadrantKey}
        quadrantIndex={0}
        quadrants={{ quadrant1: ['New task'] } as Quadrants}
        deleteItem={mockDeleteItem}
      />,
    );

    const deleteButton = screen.getByRole('button');

    // Simulate clicking the Delete button
    fireEvent.click(deleteButton);

    // Check if the mockDeleteItem function was called
    expect(mockDeleteItem).toHaveBeenCalledWith(quadrantKey, 0);

    // Check if the task is deleted from localStorage
    const items = JSON.parse(localStorageMock.getItem(quadrantKey) || '[]');
    expect(items).not.toContain('New task');
  });
});
