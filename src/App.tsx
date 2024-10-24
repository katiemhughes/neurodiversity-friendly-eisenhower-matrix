import React, { useState } from 'react';
import './App.scss';
import MatrixQuadrant from './components/MatrixQuadrant';
import { ReactComponent as LowBatteryIcon } from './icons/LowBattery.svg';
import { ReactComponent as FullBatteryIcon } from './icons/FullBattery.svg';

const App = () => {
  const [currentQuadrants, setCurrentQuadrants] = useState<{ [key: string]: string[] }>({
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

  const addItemToSpecificQuadrant = (quadrantKey: string, newItem: string) => {
    setCurrentQuadrants((prevQuadrants) => ({
      ...prevQuadrants,
      [quadrantKey]: [...prevQuadrants[quadrantKey], newItem], // Update the specific quadrant
    }));
  };

  // const deleteItem = (id: number) => {
  //   const newItems = items.filter((item, index) => index !== id);
  //   setItems(newItems); // Update the state with the filtered items
  // };

  return (
    <div className="matrix-app">
      <div className="matrix-app__container">
        <h1 className="matrix-app__title">The Neurodiversity-Friendly Task Matrix</h1>
        <div className="matrix">
          <MatrixQuadrant
            lowBatteryIcon={<LowBatteryIcon />}
            fullBatteryIcon={<FullBatteryIcon />}
            items={items}
            quadrants={currentQuadrants}
            addItem={addItem}
            handleQuadrantInputChange={handleQuadrantInputChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
