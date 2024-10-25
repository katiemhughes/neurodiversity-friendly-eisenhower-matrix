import React from 'react';
import { Item } from './MatrixQuadrant';

interface MatrixFormProps {
  items: Item;
  quadrantKey: string;
  quadrantIndex: number;
  addItem: (item: string, event: React.MouseEvent<HTMLButtonElement>) => void;
  handleQuadrantInputChange: (
    quadrantKey: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}

const MatrixForm: React.FC<MatrixFormProps> = ({
  items,
  quadrantKey,
  quadrantIndex,
  addItem,
  handleQuadrantInputChange,
}) => (
  <form className="matrix__form">
    <input
      className="matrix__input"
      name={quadrantIndex.toString()}
      id={quadrantIndex.toString()}
      value={
        items[quadrantKey].charAt(0).toUpperCase() + items[quadrantKey].slice(1)
      }
      placeholder="Next task"
      autoComplete="off"
      onChange={(event) => handleQuadrantInputChange(quadrantKey, event)}
    />
    <button
      className="matrix__button--add"
      onClick={(event) => addItem(quadrantKey, event)}
    >
      Add
    </button>
  </form>
);

export default MatrixForm;
