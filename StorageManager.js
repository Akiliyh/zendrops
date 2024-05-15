import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveCoinsToLocalStorage = async (coins) => {
    try {
      await AsyncStorage.setItem('@coins', coins.toString());
      /*console.log('Coins saved to local storage:', coins);*/
    } catch (error) {
      console.error('Error saving coins to local storage:', error);
    }
  };
  
  export const loadCoinsFromLocalStorage = async () => {
    try {
      const coinsString = await AsyncStorage.getItem('@coins');
      if (coinsString !== null) {
        const coins = parseInt(coinsString, 10);
        console.log('Coins loaded from local storage:', coins);
        return coins;
      } else {
        console.log('No coins found in local storage.');
        return 0; // Return a default value if no coins are found
      }
    } catch (error) {
      console.error('Error loading coins from local storage:', error);
      return 0; // Return a default value in case of an error
    }
  };

  export const saveZenTimeToLocalStorage = async (zenTime) => {
    try {
      await AsyncStorage.setItem('@zentime', zenTime.toString());
      /*console.log('Zen time saved to local storage:', zenTime);*/
    } catch (error) {
      console.error('Error saving zen time to local storage:', error);
    }
  };

  export const loadZenTimeFromLocalStorage = async () => {
    try {
      const zenTimeString = await AsyncStorage.getItem('@zentime');
      if (zenTimeString !== null) {
        const zenTime = parseInt(zenTimeString, 10);
        console.log('Zen time loaded from local storage:', zenTime);
        return zenTime;
      } else {
        console.log('No zen time found in local storage.');
        return 0; // Return a default value if no coins are found
      }
    } catch (error) {
      console.error('Error loading zen time from local storage:', error);
      return 0; // Return a default value in case of an error
    }
  };

  export const saveMusicToLocalStorage = async (music) => {
    try {
      await AsyncStorage.setItem('@music', music.toString());
      console.log('Music saved to local storage:', music);
    } catch (error) {
      console.error('Error saving music to local storage:', error);
    }
  };

  export const loadMusicFromLocalStorage = async () => {
    try {
      const music = await AsyncStorage.getItem('@music');
      if (music !== null) {
        console.log('Music loaded from local storage:', music);
        return music;
      } else {
        console.log('No music found in local storage.');
        return 'Resonance'; // Return a default value if no music is found
      }
    } catch (error) {
      console.error('Error loading music from local storage:', error);
      return 'Music 1'; // Return a default value in case of an error
    }
  };

  export const saveMenuSelectionToLocalStorage = async (menuSelection) => {
    try {
      await AsyncStorage.setItem('@menuselection', menuSelection.toString());
      console.log('Menu selection saved to local storage:', menuSelection);
    } catch (error) {
      console.error('Error saving menu selection to local storage:', menuSelection);
    }
  };

  export const loadMenuSelectionFromLocalStorage = async () => {
    try {
      const menuSelection = await AsyncStorage.getItem('@menuselection');
      if (menuSelection !== null) {
        console.log('Menu selection loaded from local storage:', menuSelection);
        return menuSelection;
      } else {
        console.log('No menu selected found in local storage.');
        return 'shapes'; // Return a default value if no music is found
      }
    } catch (error) {
      console.error('Error loading menu selection from local storage:', error);
      return 'shapes'; // Return a default value in case of an error
    }
  };

  export const saveShapeToLocalStorage = async (shape) => {
    try {
      await AsyncStorage.setItem('@shape', shape.toString());
      console.log('Shape saved to local storage:', shape);
    } catch (error) {
      console.error('Error saving shape to local storage:', shape);
    }
  };

  export const loadShapeFromLocalStorage = async () => {
    try {
      const shape = await AsyncStorage.getItem('@shape');
      if (shape !== null) {
        console.log('Shape loaded from local storage:', shape);
        return shape;
      } else {
        console.log('No shape found in local storage.');
        return 'circle'; // Return a default value if no shape is found
      }
    } catch (error) {
      console.error('Error loading shape from local storage:', error);
      return 'circle'; // Return a default value in case of an error
    }
  };

  export const saveBackgroundToLocalStorage = async (background) => {
    try {
      const backgroundString = JSON.stringify(background);
      await AsyncStorage.setItem('@background', backgroundString);
      console.log('Background saved to local storage:', background);
    } catch (error) {
      console.error('Error saving background to local storage:', error);
    }
  };
  
  export const loadBackgroundFromLocalStorage = async () => {
    try {
      const backgroundString = await AsyncStorage.getItem('@background');
      if (backgroundString !== null) {
        const background = JSON.parse(backgroundString);
        console.log('Background loaded from local storage:', background);
        return background;
      } else {
        console.log('No background found in local storage.');
        return ["#051329", "#03112f", "#030f34", "#070c38", "#0f073b"]; // Return a default value if no background is found
      }
    } catch (error) {
      console.error('Error loading background from local storage:', error);
      return ["#051329", "#03112f", "#030f34", "#070c38", "#0f073b"]; // Return a default value in case of an error
    }
  };

  export const saveUnlockableItemsToLocalStorage = async (unlockableItems) => {
    try {
      const jsonValue = JSON.stringify(unlockableItems);
      await AsyncStorage.setItem('unlockableItems', jsonValue);
    } catch (error) {
      console.error('Error saving unlockableItems to local storage:', error);
    }
  };

  export const loadUnlockableItemsFromLocalStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('unlockableItems');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error loading unlockableItems from local storage:', error);
      return null;
    }
  };
  
  
  // Reset all the local storage

  export const resetLocalStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Local storage data cleared.');
    } catch (error) {
      console.error('Error clearing local storage data:', error);
    }
  };