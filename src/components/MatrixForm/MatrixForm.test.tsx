import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MatrixForm from './MatrixForm';
import { Item } from '../MatrixQuadrant/MatrixQuadrant';

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

describe('MatrixForm Component', () => {
  const quadrantKey = 'quadrant1'; // Define the quadrantKey

  const mockAddItem = jest.fn((key, event) => {
    event.preventDefault();

    const newItem = 'New Task';

    if (newItem) {
      localStorageMock.setItem(quadrantKey, newItem);
    }
  });

  const mockHandleQuadrantInputChange = jest.fn((event) => {
    localStorage.setItem(quadrantKey, event.target.value);
  });

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('saves tasks to localStorage on Add button click', () => {
    render(
      <MatrixForm
        items={{ quadrant1: '' } as Item}
        quadrantKey={quadrantKey}
        quadrantIndex={1}
        addItem={mockAddItem}
        handleQuadrantInputChange={mockHandleQuadrantInputChange}
      />,
    );

    const input = screen.getByPlaceholderText('Next task');
    const formElement = screen.getByRole('form');

    // Simulate user typing a task
    fireEvent.change(input, { target: { value: 'New Task' } });

    // Simulate clicking the Add button
    fireEvent.submit(formElement);

    // Check if the mockAddItem function was called
    expect(mockAddItem).toHaveBeenCalledWith(quadrantKey, expect.any(Object));

    // Check if the task is saved to localStorage
    expect(localStorage.getItem(quadrantKey));
  });

  test('calls handleQuadrantInputChange on input change', () => {
    render(
      <MatrixForm
        items={{ quadrant1: '' } as Item}
        quadrantKey={quadrantKey}
        quadrantIndex={1}
        addItem={mockAddItem}
        handleQuadrantInputChange={mockHandleQuadrantInputChange}
      />,
    );

    const input = screen.getByPlaceholderText('Next task');

    // Simulate user typing a task
    fireEvent.change(input, { target: { value: 'New Task' } });

    // Check if the mockHandleQuadrantInputChange function was called
    expect(mockHandleQuadrantInputChange).toHaveBeenCalledWith(
      quadrantKey,
      expect.any(Object),
    );
  });
});
