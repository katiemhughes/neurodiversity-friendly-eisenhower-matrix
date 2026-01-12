import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from './firebase';

type Quadrants = { [key: string]: string[] };

export const subscribeToMatrix = (
  userId: string,
  setQuadrants: React.Dispatch<React.SetStateAction<Quadrants>>,
) => {
  const ref = doc(db, 'users', userId, 'matrix', 'main');

  return onSnapshot(ref, (snap) => {
    if (snap.exists()) {
      setQuadrants(snap.data());
    } else {
      setDoc(ref, {
        quadrant1: [],
        quadrant2: [],
        quadrant3: [],
        quadrant4: [],
      });
    }
  });
};

export const saveMatrix = (userId: string, quadrants: Quadrants) => {
  const ref = doc(db, 'users', userId, 'matrix', 'main');
  return setDoc(ref, quadrants, { merge: true });
};
