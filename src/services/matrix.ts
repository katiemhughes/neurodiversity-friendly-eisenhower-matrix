import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from './firebase';

type Quadrants = { [key: string]: string[] };

export const subscribeToMatrix = (
  userId: string,
  setQuadrants: React.Dispatch<React.SetStateAction<Quadrants>>,
) => {
  const ref = doc(db, 'users', userId, 'matrix', 'main');

  const unsubscribe = onSnapshot(ref, (snap) => {
    if (snap.exists()) {
      setQuadrants(snap.data() as Quadrants);
    } else {
      setDoc(
        ref,
        {
          quadrant1: [],
          quadrant2: [],
          quadrant3: [],
          quadrant4: [],
        },
        { merge: true },
      );
    }
  });

  return unsubscribe;
};

export const saveMatrix = async (userId: string, quadrants: Quadrants) => {
  const ref = doc(db, 'users', userId, 'matrix', 'main');

  try {
    await setDoc(ref, quadrants, { merge: true });
  } catch (error) {
    console.error('Error saving matrix:', error);
  }
};
