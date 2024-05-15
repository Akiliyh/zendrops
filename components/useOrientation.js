import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

export function useOrientation() {
  const [orientation, setOrientation] = useState("PORTRAIT");

  const setInitialOrientation = () => {
    const { width, height } = Dimensions.get('window');
    if (width < height) {
      setOrientation("PORTRAIT");
    } else {
      setOrientation("LANDSCAPE");
    }
  };

  useEffect(() => {
    // Check initial orientation
    setInitialOrientation();

    // Add event listener for orientation change
    Dimensions.addEventListener('change', ({ window: { width, height } }) => {
      if (width < height) {
        setOrientation("PORTRAIT");
      } else {
        setOrientation("LANDSCAPE");
      }
    });

    return () => {
      Dimensions.removeEventListener('change', () => { });
    };
  }, []);

  return orientation;
}