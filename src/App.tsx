import React, { useState } from 'react';
import './App.scss';
import MatrixQuadrant from './components/MatrixQuadrant';
import { ReactComponent as LowBatteryIcon } from './icons/LowBattery.svg';
import { ReactComponent as FullBatteryIcon } from './icons/FullBattery.svg';

const App = () => {
  const [quadrants, setQuadrants] = useState<{ [key: string]: string[] }>({
    quadrant1: [],
    quadrant2: [],
    quadrant3: [],
    quadrant4: [],
  });

  const [items, setItems] = useState<{ [key: string]: string }>({
    quadrant1: '',
    quadrant2: '',
    quadrant3: '',
    quadrant4: ''
  });

  const handleQuadrantInputChange = (quadrantKey: string, event: any) => {
    setItems(prevItems => ({
      ...prevItems,
      [quadrantKey]: event.target.value
    }));
  };

  const addItemToSpecificQuadrant = (quadrantKey: string, newItem: string) => {
    setQuadrants((prevQuadrants) => ({
      ...prevQuadrants,
      [quadrantKey]: [...prevQuadrants[quadrantKey], newItem], // Update the specific quadrant
    }));
  };

  const addItem = (quadrantKey: string, event: any) => {
    event.preventDefault();
    console.log('task', quadrantKey);
    const newItem = items[quadrantKey].trim();

    if (newItem) {
      addItemToSpecificQuadrant(quadrantKey, newItem);

      setItems(prevItems => ({
        ...prevItems,
        [quadrantKey]: '' // Clear the input field after adding the item
      }));
    }
  };

  const deleteItem = (quadrantKey: string, deletedItemIndex: number) => {
    deleteItemFromSpecificQuadrant(quadrantKey, deletedItemIndex);

    setItems(prevItems => ({
      ...prevItems,
      [quadrantKey]: '' // Clear the input field after deleting the item
    }));
  };

  const deleteItemFromSpecificQuadrant = (quadrantKey: string, deletedItemIndex: number) => {
    setQuadrants((prevQuadrants) => ({
      ...prevQuadrants,
      [quadrantKey]: [...prevQuadrants[quadrantKey]].filter((item, index) => index !== deletedItemIndex), // Delete item from the specific quadrant
    }));
  };

  return (
    <div className="matrix-app">
      <div className="matrix-app__container">
        <h1 className="matrix-app__title">The Neurodiversity-Friendly Task Matrix</h1>
        <div className="matrix">
          <MatrixQuadrant
            lowBatteryIcon={<LowBatteryIcon />}
            fullBatteryIcon={<FullBatteryIcon />}
            items={items}
            quadrants={quadrants}
            addItem={addItem}
            handleQuadrantInputChange={handleQuadrantInputChange}
            deleteItem={deleteItem}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
