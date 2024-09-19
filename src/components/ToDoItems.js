import React from "react";

const ToDoItems = (props) => {
  const { items, deleteItem } = props;

  return (
      <ul>
        {items.map((item, index) => {
        // for(i=0;i<items.length;i++) {}
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
//items are the props that I am referring to here.
//singular item is what the map method is using as a parameter to refer to a single item in an array. We always need to use the singular version of whatever our array contains here.

export default ToDoItems;
