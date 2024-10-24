import { mdiCheckCircle } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import { Item, Quadrants } from './MatrixQuadrant';

interface MatrixItemsProps {
  items: Item;
  quadrants: Quadrants;
  quadrantKey: string;
  quadrantIndex: number;
  deleteItem: (quadrantKey: string, deletedItemIndex: number) => void;
}

const MatrixItems: React.FC<MatrixItemsProps> = ({ items, quadrants, quadrantKey, quadrantIndex, deleteItem }) => {
  console.log('items in MI', items);
  console.log('quadrant in MI', quadrantKey);

  return (
      <ul className="matrix__tasks" id={quadrantIndex.toString()}>
        {quadrants[quadrantKey].map((item, itemIndex) => {
          console.log('item in map', item);
          return (
            <div className="matrix__task" key={itemIndex}>
              <li className="matrix__task--item">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </li>
              <button className="matrix__button--done" type="button" onClick={() => deleteItem(quadrantKey, itemIndex)}>
                <Icon className="matrix__icon--tick" path={mdiCheckCircle} size={1.2} />
              </button>
            </div>
          )
        })}
      </ul>
  );
};

export default MatrixItems;
