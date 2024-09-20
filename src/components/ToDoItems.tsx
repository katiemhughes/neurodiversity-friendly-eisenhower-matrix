import React from "react";

interface ToDoItemsProps {
  items: string[],
  deleteItem: (index: number) => void
}

const ToDoItems: React.FC<ToDoItemsProps> = ({ items, deleteItem }) => {
  return (
      <ul>
        {items.map((item, index) => {
          return (
            <div className="liButtonWrapper" key={index}>
              <li>{item.charAt(0).toUpperCase() + item.slice(1)}</li>
              <button className="doneButton" type="button" onClick={() => deleteItem(index)}>
                Done
              </button>
            </div>
          );
        })}
      </ul>
  );
};
// singular item is what the map method is using as a parameter to refer to a single item in an array. We always need to use the singular version of whatever our array contains here.

export default ToDoItems;
