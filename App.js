// TODO 

/*   Change music
  Modulate audio depending on the location of the drop impact
  Make the drag event thingy
  make statusbar transparent
  add push notifications
  add the availability to pause the music or to mute the background music
  add images to background
  set ko-fi account
  change footer accounts
  change twitter and instagram accounts
  fix translationX issue Menu opening when opening in landscape
  add loading animation to when we change orientation
  Fix Ad not working when first not loaded because of network
  Change firstselectedcircle of background to previously selected and not only to the current background app before validating
  Make the setting icon spin again
*/

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableWithoutFeedback, View, Animated, Dimensions, Easing} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as StorageManager from './StorageManager';
import TouchingSurface from './components/TouchingSurface';
import Title from './components/Title';
import Menu from './components/Menu';
import IdleText from './components/IdleText';
import IntroText from './components/IntroText';
import Options from './components/Options';
import Splashscreen from './components/Splashscreen';
import { Audio } from 'expo-av';
import * as NavigationBar from 'expo-navigation-bar';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconAnt from 'react-native-vector-icons/AntDesign';

export default function App() {
  const [isIdle, setIsIdle] = useState(false);
  const [isIdleFade, setIsIdleFade] = useState(false);
  const [isRelax, setIsRelax] = useState(false);
  const [isRelaxFade, setIsRelaxFade] = useState(false);
  const [showTitle, setShowTitle] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayFadeOut, setOverlayFadeOut] = useState(false);
  const [titleFadeOut, setTitleFadeOut] = useState(false);

  const [activeTimerId, setActiveTimerId] = useState(null);
  const [activeTimerCoinId, setActiveTimerCoinId] = useState(null);
  const [activeMinutes, setActiveMinutes] = useState(0);
  const [coins, setCoins] = useState(0);
  const [backgroundsData, setBackgroundsData] = useState(null);
  const [dropShapesAvailable, setDropShapesAvailable] = useState(["circle", "square", "star", "heart", "triangle"]);
  const [musicAvailable, setMusicAvailable] = useState(["Resonance", "Serenity In The Woods", "Lotus", "Raindrop Reverie"]);
  const [menuCurrentlySelected, setMenuCurrentlySelected] = useState('backgrounds');
  const [backgroundGradient, setBackgroundGradient] = useState(["#051329", "#03112f", "#030f34", "#070c38", "#0f073b"]);
  const [dropShape, setDropShape] = useState("circle");
  const [music, setMusic] = useState("Resonance");
  const [isMusicPaused, setIsMusicPaused] = useState(false);
  const [isMusicInitiated, setIsMusicInitiated] = useState(false);
  const [overlayTranslateX] = useState(new Animated.Value(0));
  const [currentSoundObject, setCurrentSoundObject] = useState(null);
  const [unlockableItems, setUnlockableItems] = useState([
    { name: 'blue', type: 'background', unlocked: true },
    { name: 'green', type: 'background', unlocked: false, price: 1 },
    { name: 'orange', type: 'background', unlocked: false, price: 1 },
    { name: 'red', type: 'background', unlocked: false, price: 2 },
    { name: 'pink', type: 'background', unlocked: false, price: 5 },
    { name: 'nightblue', type: 'background', unlocked: false, price: 5 },
    { name: 'black', type: 'background', unlocked: false, price: 5 },
    { name: 'dawn', type: 'background', unlocked: false, price: 8 },
    { name: 'neon', type: 'background', unlocked: false, price: 15 },
    { name: 'azure', type: 'background', unlocked: false, price: 10 },
    { name: 'purple', type: 'background', unlocked: false, price: 20 },
    { name: 'burgundy', type: 'background', unlocked: false, price: 25 },
    { name: 'circle', type: 'shape', unlocked: true },
    { name: 'triangle', type: 'shape', unlocked: false, price: 10 },
    { name: 'ring', type: 'shape', unlocked: false, price: 20 },
    { name: 'heart', type: 'shape', unlocked: false, price: 30 },
    { name: 'star', type: 'shape', unlocked: false, price: 50 },
    { name: 'square', type: 'shape', unlocked: false, price: 5 },
  ]);


  function cacheFonts(fonts) {
    return fonts.map(font => Font.loadAsync(font));
  } // Preloads all the icons

  useEffect(() => { 
    /*StorageManager.resetLocalStorage();*/
    StorageManager.loadCoinsFromLocalStorage().then((loadedCoins) => {
      setCoins(loadedCoins);
    });
    StorageManager.loadZenTimeFromLocalStorage().then((loadedZenTime) => {
      setActiveMinutes(loadedZenTime);
    });
    StorageManager.loadMusicFromLocalStorage().then((loadedMusic) => {
      setMusic(loadedMusic);
      playSound(loadedMusic);
    });
    StorageManager.loadMenuSelectionFromLocalStorage().then((loadedMenuSelection) => {
      setMenuCurrentlySelected(loadedMenuSelection);
    });
    StorageManager.loadShapeFromLocalStorage().then((loadedShape) => {
      setDropShape(loadedShape);
    });
    StorageManager.loadBackgroundFromLocalStorage().then((loadedBackground) => {
      setBackgroundGradient(loadedBackground);
    });
    StorageManager.loadUnlockableItemsFromLocalStorage().then((loadUnlockableItems) => {
        if (loadUnlockableItems != null) {
          setUnlockableItems(loadUnlockableItems);
          console.log(loadUnlockableItems);
        }
    });
    resetTimer();
    /* loadMusic(); */
    fetchData();
    return () => {
      stopTimer();
    };
  }, []);

  useEffect(() => {
    if (currentSoundObject) {
      StorageManager.saveMusicToLocalStorage(music);
      console.log('Previous music unloaded');
      playSound();
      unloadSoundWithFadeOut()
      .catch((error) => {
        console.error('Error unloading sound:', error);
        currentSoundObject.unloadAsync();
      });
    }
  }, [music]);

  useEffect(() => {
      StorageManager.saveCoinsToLocalStorage(coins);
  }, [coins]);

  useEffect(() => {
    StorageManager.saveZenTimeToLocalStorage(activeMinutes);
}, [activeMinutes]);

useEffect(() => {
  StorageManager.saveBackgroundToLocalStorage(backgroundGradient);
}, [backgroundGradient]);

useEffect(() => {
  StorageManager.saveShapeToLocalStorage(dropShape);
}, [dropShape]);

useEffect(() => {
  StorageManager.saveMenuSelectionToLocalStorage(menuCurrentlySelected);
}, [menuCurrentlySelected]);

  const unloadSoundWithFadeOut = async () => {
    if (currentSoundObject) {
      try {
        // Gradually reduce the volume to 0 over a period of time
        const fadeDuration = 1000; // 1 seconds fade out time
        const fadeInterval = 100; // Adjust the interval to control the smoothness
        const totalSteps = fadeDuration / fadeInterval;
        const initialVolume = 1;
        const step = initialVolume / totalSteps;
  
        /*for (let i = 0; i < totalSteps; i++) {
          const newVolume = initialVolume - step * i;
          await currentSoundObject.setVolumeAsync(newVolume);
          await new Promise(resolve => setTimeout(resolve, fadeInterval));
        }*/

        // Fading out currently not available
  
        // After fading out, unload the sound from memory
        await currentSoundObject.unloadAsync();
        setCurrentSoundObject(null);
      } catch (error) {
        console.error('Error unloading sound with fade out:', error);
        await currentSoundObject.unloadAsync();
      }
    }
  };

  const pauseSound = async () => {
      try {
        console.log(isMusicPaused + ' isMusicPaused');
        if (!isMusicPaused) {
          await currentSoundObject.pauseAsync();
          setIsMusicPaused(true);
          console.log('Music paused');
        }
        if (isMusicPaused) {
          await currentSoundObject.playAsync();
          console.log('Music unpaused');
          setIsMusicPaused(false);
        }
      } catch (error) {
        console.error('Error pausing sound with fade out:', error);
        await currentSoundObject.unloadAsync();
      }
  };  

  const musicFiles = {
    "Resonance": require('./assets/music/Resonance.mp3'),
    "Serenity In The Woods": require('./assets/music/Serenity_In_The_Woods.mp3'),
    "Lotus": require('./assets/music/Lotus.mp3'),
    "Raindrop Reverie": require('./assets/music/Raindrop_Reverie.mp3'),
  };

  const preloadedMusic = {};

const loadMusic = async () => {
  // Load the specified music first
  const specifiedMusic = musicFiles[music];
  if (specifiedMusic) {
    const specifiedSoundObject = new Audio.Sound();
    try {
      await specifiedSoundObject.loadAsync(specifiedMusic);
      await specifiedSoundObject.setVolumeAsync(1);
      await specifiedSoundObject.setIsLoopingAsync(true);
      preloadedMusic[music] = specifiedSoundObject;
      console.log(`Music ${music} loaded`);
      playSound();
    } catch (error) {
      console.error(`Error loading music ${music}:`, error);
    }
  } else {
    console.error(`Specified music ${music} not found in musicFiles.`);
  }

  // Load the rest of the music files
  const promises = Object.keys(musicFiles).map(async (key) => {
    if (key !== music) {
      const soundObject = new Audio.Sound();
      try {
        await soundObject.loadAsync(musicFiles[key]);
        await soundObject.setVolumeAsync(1);
        await soundObject.setIsLoopingAsync(true);
        preloadedMusic[key] = soundObject;
        console.log(`Music ${key} loaded`);
      } catch (error) {
        console.error(`Error loading music ${key}:`, error);
      }
    }
  });

  await Promise.all(promises);
  console.log('All music preloaded');
};  

  const fetchData = () => {
    try {
      const backgroundsDataJson = require('./assets/backgrounds.json');
      setBackgroundsData(backgroundsDataJson);
      setBackgroundGradient(backgroundsDataJson.gradients.blue);
      console.log(backgroundsDataJson.gradients);
      console.log(backgroundsDataJson.gradients.blue);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const resetTimer = () => {
    startActivityTimer();
  };

  const startActivityTimer = () => {
    if (!activeTimerId) {
      setActiveTimerId(setInterval(() => {
        setActiveMinutes((prevMinutes) => prevMinutes + 1);
      }, 60000));
    }
    if (!activeTimerCoinId) {
      setActiveTimerCoinId(setInterval(() => {
        setCoins((prevCoins) => prevCoins + 1 /*100*/);
      }, 30000));
    }
  };

  const stopTimer = () => {
    if (activeTimerId) {
      clearInterval(activeTimerId);
      clearInterval(activeTimerCoinId);
      setActiveTimerId(null);
      setActiveTimerCoinId(null);
    }
  };

// transparent background
NavigationBar.setVisibilityAsync("hidden");

const playSound = (storedMusic) => {
  try {
    const soundObject = new Audio.Sound();
    let selectedMusic = null;
    if (storedMusic != null) {
      selectedMusic = musicFiles[storedMusic];
    } else {
      selectedMusic = musicFiles[music];
    }
    soundObject
      .loadAsync(selectedMusic)
      .then(() => {
        soundObject.setVolumeAsync(1);
        soundObject.setIsLoopingAsync(true)
          .then(() => {
            console.log('Music loaded');
            if (storedMusic != null) {
              console.log('Stored music is ' + storedMusic);
            } else {
              console.log('Changed music is ' + music);
            }
            soundObject.playAsync();
            setCurrentSoundObject(soundObject);
          })
          .catch((error) => {
            console.error('Error setting loop:', error);
          });
      })
      .catch((error) => {
        console.error('Error loading sound:', error);
      });
  } catch (error) {
    console.error('Error creating sound object:', error);
  }
};

const removeTitleScreen = () => {
  setTimeout(() => {
    setShowTitle(false); 
  }, 5000);
  setTitleFadeOut(true);
}

const handleOverlayChange = useCallback((isVisible) => {
  setShowOverlay(isVisible);
}, []);

  const handleMenuCurrentlySelected = (menuSelected) => {
    setMenuCurrentlySelected(menuSelected);
  };


  const handleOverlayFadeOut = (set) => {
    setOverlayFadeOut(set);
    console.log(set + ' set');

    const toValue = !set ? -Dimensions.get('window').width : 0;
    Animated.timing(overlayTranslateX, {
      toValue: toValue,
      duration: 400,
      easing: Easing.bezier(0.5, 1, 0.89, 1),
      useNativeDriver: true,
    }).start();
};

const handleBackgroundGradient = (gradient) => {
  console.log('Current gradient is ' + gradient)
  setBackgroundGradient(gradient);
};

const handleDropShape = (shape) => {
  console.log('Current shape is ' + shape)
  setDropShape(shape);
};

const handleMusic = (newMusic) => {
  console.log(isMusicInitiated)
  /* if (music === newMusic && isMusicInitiated) {
    console.log('same music again');
    pauseSound();
  }
  if (!isMusicInitiated) { // Sets the musicinitiation so that the pausing thingy works
    setIsMusicInitiated(true)
  }*/
  console.log('Current music is ' + newMusic)
  setMusic(newMusic);
};

const handleCoins = (coins) => {
  console.log(coins);
  setCoins(coins);
}


  const handleUpdateIdle = (value) => {
    console.log('Is idle : ' + value)
    setTimeout(() => {
      setIsIdle(value); 
    }, 2000);
    setIsIdleFade(!value);
  // Do something with the updated timer value

};

const handleUpdateRelax = (value) => {
  console.log('Is relax : ' + value)
  setIsRelaxFade(false);
    setIsRelax(value); 
  setTimeout(() => {
    setIsRelaxFade(true);
  }, 5000);
};

  return (
    <TouchableWithoutFeedback onPress={showTitle ? removeTitleScreen : null}>
      <View style={styles.container}>
        <Splashscreen></Splashscreen>
      <Animated.View style={[{ transform: [{ translateX: overlayTranslateX }]}, {position: 'absolute'}, {width: '100%'}, {height: '100%'}]}>
        <LinearGradient
          colors={backgroundGradient}
          style={styles.gradient}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          locations={[0, 0.2, 0.4, 0.6, 0.8]}
        >
          <StatusBar hidden style="auto" />
        </LinearGradient>

        {showTitle ? 
          <Title showTitle={titleFadeOut} currentShape={dropShape}></Title>
          : <View>
            <IntroText to={10000} text={"Music by James November"}></IntroText>
            <IntroText to={100} text={"For a better experience use your headphones"}></IntroText>
          </View>
          }

{isIdle ? 
<IdleText isFade={isIdleFade} text={"Touch to draw drops"}></IdleText> 
:null}

{isRelax ? 
<IdleText isFade={isRelaxFade} text={"Relax, it's not cookie clicker"}></IdleText> 
:null}

                
        <TouchingSurface isTitleShown={showTitle} onUpdateRelax={handleUpdateRelax} onUpdateIdle={handleUpdateIdle} dropShape={dropShape}/>
        <Menu isArrow={false} showOverlay={showOverlay} handleOverlayFadeOut={handleOverlayFadeOut} handleOverlayChange={handleOverlayChange}/>
      </Animated.View>
      {showOverlay ? 
                <Options 
                unlockableItems={unlockableItems}
                handleMenuCurrentlySelected={handleMenuCurrentlySelected} menuCurrentlySelected={menuCurrentlySelected} 
                showOverlay={showOverlay} handleOverlayFadeOut={handleOverlayFadeOut} handleOverlayChange={handleOverlayChange} overlayFadeOut={overlayFadeOut}
                backgroundGradient={backgroundGradient} handleBackgroundGradient={handleBackgroundGradient} backgroundsData={backgroundsData}
                dropShape={dropShape} handleDropShape={handleDropShape} dropShapesAvailable={dropShapesAvailable}
                music={music} handleMusic={handleMusic} musicAvailable={musicAvailable}
                coins={coins} setCoins={handleCoins} 
                zenTime={activeMinutes}>
                </Options>
        :null}
        {/* Options make the app slow down, can easily be seen on the touchable opacity */}
      </View>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  gradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    margin: 0,
    height: '100%',
  },
});
