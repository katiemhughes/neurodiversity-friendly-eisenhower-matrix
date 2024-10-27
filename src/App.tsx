import React, { useEffect, useState } from 'react';
import './App.scss';
import './components/styles/main.scss';
import MatrixQuadrant from './components/MatrixQuadrant/MatrixQuadrant';
import { ReactComponent as LowBatteryIcon } from './icons/LowBattery.svg';
import { ReactComponent as FullBatteryIcon } from './icons/FullBattery.svg';
import Footer from './components/Footer/Footer';

const App = () => {
  const locallyStoredItems: { [key: string]: string[] } = {
    quadrant1: [],
    quadrant2: [],
    quadrant3: [],
    quadrant4: [],
  };

  Object.keys(localStorage).forEach((key) => {
    locallyStoredItems[key] = JSON.parse(localStorage.getItem(key) || '[]');
  });

  const [quadrants, setQuadrants] = useState<{ [key: string]: string[] }>(
    locallyStoredItems,
  );

  const [items, setItems] = useState<{ [key: string]: string }>({
    quadrant1: '',
    quadrant2: '',
    quadrant3: '',
    quadrant4: '',
  });

  useEffect(() => {
    Object.keys(quadrants).forEach((key) => {
      localStorage.setItem(key, JSON.stringify(quadrants[key]));
    });
  }, [quadrants]);

  const handleQuadrantInputChange = (
    quadrantKey: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setItems((prevItems) => ({
      ...prevItems,
      [quadrantKey]: event.target.value,
    }));
  };

  const addItemToSpecificQuadrant = (quadrantKey: string, newItem: string) => {
    setQuadrants((prevQuadrants) => ({
      ...prevQuadrants,
      [quadrantKey]: [...prevQuadrants[quadrantKey], newItem], // Update the specific quadrant
    }));
  };

  const addItem = (
    quadrantKey: string,
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const newItem = items[quadrantKey].trim();

    if (newItem) {
      addItemToSpecificQuadrant(quadrantKey, newItem);

      setItems((prevItems) => ({
        ...prevItems,
        [quadrantKey]: '', // Clear the input field after adding the item
      }));
    }
  };

  const deleteItemFromSpecificQuadrant = (
    quadrantKey: string,
    deletedItemIndex: number,
  ) => {
    setQuadrants((prevQuadrants) => ({
      ...prevQuadrants,
      [quadrantKey]: prevQuadrants[quadrantKey].filter(
        (item, index) => index !== deletedItemIndex,
      ), // Delete item from the specific quadrant
    }));
  };

  const deleteItem = (quadrantKey: string, deletedItemIndex: number) => {
    deleteItemFromSpecificQuadrant(quadrantKey, deletedItemIndex);

    setItems((prevItems) => ({
      ...prevItems,
      [quadrantKey]: '', // Clear the input field after deleting the item
    }));
  };

  return (
    <div className="matrix-app">
      <div className="matrix-app__container">
        <h1 className="matrix-app__title">
          The Neurodiversity-Friendly Task Matrix
        </h1>
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
      <Footer />
    </div>
  );
};

export default App;
