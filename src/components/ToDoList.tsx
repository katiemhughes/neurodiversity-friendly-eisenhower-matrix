import React, { useState } from "react";

interface ToDoListProps {
  addItem: (item: string) => void
}

const ToDoList: React.FC<ToDoListProps> = ({ addItem }) => {
  const [inputText, setInputText] = useState("");
  //I don't need to define items in the state here because we don't use it in this component.

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addItem(inputText);
    setInputText("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value); // Update inputText state as user types
  };

  return (
    <div className="formWrapper">
        <form onSubmit={handleSubmit}>
          <input
            name="inputText"
            value={inputText}
            placeholder="Next task"
            onChange={handleChange}
            autoComplete="off"
          />
          <button className="addButton" type="submit"> Add </button>
        </form>
    </div>
  );
}

export default ToDoList;
