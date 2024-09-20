import React, { useState } from "react";
import "./App.scss";
import ToDoList from "./components/ToDoList";
import ToDoItems from "./components/ToDoItems";
import Icon from '@mdi/react';
import { mdiHeadHeart, mdiHeadMinus, mdiCheckCircle } from '@mdi/js';

const App = () => {
  const [items, setItems] = useState<string[]>([]);

  // we don't need to define inputText in the constructor here because we aren't using it in the app component.

  const addItem = (task: string) => {
    setItems([...items, task]);
  };

  const deleteItem = (id: number) => {
    const newItems = items.filter((item, index) => index !== id);
    setItems(newItems); // Update the state with the filtered items
  };

  return (
    <div className="App">
      <div className="app-container">
        <h1 className="app-title">The Neurodiversity-Friendly Task Matrix</h1>
        <div className="todoListWrapper">
          <ToDoList addItem={addItem} />
        </div>
        <div className="itemsWrapper">
          <ToDoItems items={items} deleteItem={deleteItem} />
        </div>
        <div className="matrix">
        <table className="matrix__table">
          <thead>
            <tr className="matrix__row">
              <th className="matrix__title"></th>
              <th className="matrix__title matrix__title--high matrix__title--header">High Energy <svg className="matrix__icon--battery" fill="#111111" version="1.1" id="icon-battery-full" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 420.75 420.75"
	 xmlSpace="preserve">
<g>
  <rect x="114.75" y="78.25" width="191.25" height="304.25"></rect>
	<path d="M258.188,0h-95.625c-10.566,0-19.125,8.559-19.125,19.125V38.25h-38.25C89.371,38.25,76.5,51.121,76.5,66.938v325.125
		c0,15.816,12.871,28.688,28.688,28.688h210.375c15.816,0,28.688-12.871,28.688-28.688V66.938c0-15.816-12.871-28.688-28.688-28.688
		h-38.25V19.125C277.312,8.559,268.754,0,258.188,0z M315.562,57.375c5.278,0,9.562,4.284,9.562,9.562v325.125
		c0,5.278-4.284,9.562-9.562,9.562H105.188c-5.278,0-9.562-4.284-9.562-9.562V66.938c0-5.278,4.284-9.562,9.562-9.562h57.375h95.625
		H315.562z"/>
</g>
</svg>
</th>
              <th className="matrix__title matrix__title--low matrix__title--header">Low Energy <svg className="matrix__icon--battery" fill="#F0F0F0" version="1.1" id="icon-battery-low" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 420.75 420.75"
	 xmlSpace="preserve">
<g>
	<rect x="114.75" y="286.875" width="191.25" height="95.625"/>
	<path d="M258.188,0h-95.625c-10.566,0-19.125,8.559-19.125,19.125V38.25h-38.25C89.371,38.25,76.5,51.121,76.5,66.938v325.125
		c0,15.816,12.871,28.688,28.688,28.688h210.375c15.816,0,28.688-12.871,28.688-28.688V66.938c0-15.816-12.871-28.688-28.688-28.688
		h-38.25V19.125C277.312,8.559,268.754,0,258.188,0z M315.562,57.375c5.278,0,9.562,4.284,9.562,9.562v325.125
		c0,5.278-4.284,9.562-9.562,9.562H105.188c-5.278,0-9.562-4.284-9.562-9.562V66.938c0-5.278,4.284-9.562,9.562-9.562h57.375h95.625
		H315.562z"/>
</g>
</svg></th>
            </tr>
            <tr className="matrix__row">
              <th className="matrix__title matrix__title--high matrix__title--side">High Interest <Icon className="matrix__icon--head" path={mdiHeadHeart} title="High Interest" size={1.6} /></th>
              <th className="matrix__content">
                <form className="content__form">
                  <input
                    className="content__input"
                    name="Next task for High Energy High Interest"
                    // value="Next task"
                    placeholder="Next task"
                    autoComplete="off"
                  />
                  <button className="content__button--add" type="submit">Add</button>
                </form>
                <ul className="content__list">
                  <li className="content__item">Hoover living room <button className="content__button--done" type="button" value="Done"><Icon className="matrix__icon--tick" path={mdiCheckCircle} size={1} /></button></li>
                  <li className="content__item">Hoover stairs <button className="content__button--done" type="button" value="Done"><Icon className="matrix__icon--tick" path={mdiCheckCircle} size={1} /></button></li>
                </ul>
              </th>
              <th className="matrix__content">
                <form className="content__form">
                  <input
                    className="content__input"
                    name="Next task for Low Energy High Interest"
                    // value="Next task"
                    placeholder="Next task"
                    autoComplete="off"
                  />
                  <button className="content__button--add" type="submit">Add</button>
                </form>
                <ul className="content__list">
                  <li className="content__item">Dust TV unit <button className="content__button--done" type="button" value="Done"><Icon className="matrix__icon--tick" path={mdiCheckCircle} size={1} /></button></li>
                  <li className="content__item">Take out the bins <button className="content__button--done" type="button" value="Done"><Icon className="matrix__icon--tick" path={mdiCheckCircle} size={1} /></button></li>
                </ul>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="matrix__row">
              <th className="matrix__title matrix__title--low matrix__title--side">Low Interest 
              <Icon className="matrix__icon--head" path={mdiHeadMinus} title="Low Interest" size={1.6} /></th>
              <td className="matrix__content">
                <form className="content__form">
                  <input
                    className="content__input"
                    name="Next task for Low Interest High Energy"
                    // value="Next task"
                    placeholder="Next task"
                    autoComplete="off"
                  />
                  <button className="content__button--add" type="submit">Add</button>
                </form>
                <ul className="content__list">
                  <li className="content__item">Do dishes <button className="content__button--done" type="button" value="Done"><Icon className="matrix__icon--tick" path={mdiCheckCircle} size={1} /></button></li>
                  <li className="content__item">Do laundry <button className="content__button--done" type="button" value="Done"><Icon className="matrix__icon--tick" path={mdiCheckCircle} size={1} /></button></li>
                </ul>
              </td>
              <td className="matrix__content">
                <form className="content__form">
                  <input
                    className="content__input"
                    name="Next task for Low Interest Low Energy"
                    // value="Next task"
                    placeholder="Next task"
                    autoComplete="off"
                  />
                  <button className="content__button--add" type="submit">Add</button>
                </form>
                <ul className="content__list">
                  <li className="content__item">Clean kitchen floor <button className="content__button--done" type="button" value="Done"><Icon className="matrix__icon--tick" path={mdiCheckCircle} size={1} /></button></li>
                  <li className="content__item">Clean bathroom tiles <button className="content__button--done" type="button" value="Done"><Icon className="matrix__icon--tick" path={mdiCheckCircle} size={1} /></button></li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

export default App;
