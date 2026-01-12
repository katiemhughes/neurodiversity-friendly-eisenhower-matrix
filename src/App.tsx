import React, { useEffect, useState } from 'react';
import './App.scss';
import './components/styles/main.scss';
import { getAuth, signOut } from 'firebase/auth';
import MatrixQuadrant from './components/MatrixQuadrant/MatrixQuadrant';
import { ReactComponent as LowBatteryIcon } from './icons/LowBattery.svg';
import { ReactComponent as FullBatteryIcon } from './icons/FullBattery.svg';
import Footer from './components/Footer/Footer';
import useAuth from './hooks/useAuth';
import { subscribeToMatrix, saveMatrix } from './services/matrix';
import LoginButton from './components/LoginButton/LoginButton';

const App = () => {
  const { user, loading } = useAuth();

  const emptyMatrix = {
    quadrant1: [],
    quadrant2: [],
    quadrant3: [],
    quadrant4: [],
  };

  const [quadrants, setQuadrants] = useState<{ [key: string]: string[] }>(
    emptyMatrix,
  );

  const [items, setItems] = useState<{ [key: string]: string }>({
    quadrant1: '',
    quadrant2: '',
    quadrant3: '',
    quadrant4: '',
  });

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToMatrix(user.uid, (data) => {
      setQuadrants(data);
      setHydrated(true);
    });

    // eslint-disable-next-line consistent-return
    return () => {
      unsubscribe(); // cleanup on unmount or user change
    };
  }, [user]);

  useEffect(() => {
    if (!user || !hydrated) return;
    saveMatrix(user.uid, quadrants);
  }, [quadrants, user, hydrated]);

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

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="matrix-app">
      <div className="matrix-app__container">
        {user && (
          <div className="matrix-app__logout">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
        <h1 className="matrix-app__title">
          The Neurodiversity-Friendly Task Matrix
        </h1>
        {user ? (
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
        ) : (
          <div className="matrix-app__login-prompt">
            <h2>Please log in to access your task matrix.</h2>
            <LoginButton />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
