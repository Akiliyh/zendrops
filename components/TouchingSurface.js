import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Drop from '../components/Drop';
import { Audio } from 'expo-av';

const audioFiles = [
  require('../assets/music/B3Kalimba.mp3'),
  require('../assets/music/B4Kalimba.mp3'),
  require('../assets/music/A3Kalimba.mp3'),
  require('../assets/music/A4Kalimba.mp3'),
  require('../assets/music/G3Kalimba.mp3'),
  require('../assets/music/G4Kalimba.mp3'),
  require('../assets/music/G5Kalimba.mp3'),
  require('../assets/music/E5Kalimba.mp3'),
  require('../assets/music/E4Kalimba.mp3'),
  require('../assets/music/D4Kalimba.mp3'),
  require('../assets/music/D5Kalimba.mp3'),
  require('../assets/music/E4Kalimba.mp3'),
  require('../assets/music/E5Kalimba.mp3'),
];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default function TouchingSurface(props) {
  const [components, setComponents] = useState([]);
  const [touchCount, setTouchCount] = useState(0);

  const playDropSound = useCallback(() => {
    try {
      const soundObject = new Audio.Sound();
      soundObject
        .loadAsync(audioFiles[getRandomInt(0, audioFiles.length - 1)])
        .then(() => {
          soundObject.setVolumeAsync(0.1);
          soundObject.playAsync();
          soundObject.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) {
              soundObject.unloadAsync();
            }
          });
        })
        .catch((error) => {
          console.error('Error playing sound:', error);
        });
    } catch (error) {
      console.error('Error creating sound object:', error);
    }
  }, []);

  useEffect(() => {
    let timeoutIdle;
    console.log(props.dropShape)

    if (touchCount > 0) {
      props.onUpdateIdle(false);
      clearTimeout(timeoutIdle);
      return
    }

    if (!props.isTitleShown) {
      timeoutIdle = setTimeout(() => {
        props.onUpdateIdle(true);
      }, 8000);
    }

    console.log('Is title shown : ' + props.isTitleShown);

    return () => {
      clearTimeout(timeoutIdle);
    };
  }, [touchCount]);

  const handleTouchStart = useCallback((event) => {
    setTouchCount(event.nativeEvent.touches.length);
    console.log(event.nativeEvent.touches.length);
    console.log(event.nativeEvent.pageY);
    const { pageX, pageY } = event.nativeEvent;
    if (components.length < 30) {
      const newComponent = (
        <Drop dropShape={props.dropShape} key={Date.now()} top={pageY} left={pageX} />
      );
      setComponents((prevComponents) => [...prevComponents, newComponent]);
      setTimeout(() => {
        setComponents((prevComponents) =>
          prevComponents.filter((component) => component.key !== newComponent.key)
        );
      }, 8000);
      playDropSound();
    } else {
      props.onUpdateRelax(true);
      console.log('Over 30 drops');
      console.log(components.length)
      console.log('COMPONENTS')
    }
  }, [props.dropShape, playDropSound, components]);

  const handleTouchEnd = (event) => {
    setTouchCount(event.nativeEvent.touches.length);
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.container}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <View style={styles.touchArea}>
          {components}
          {/*<Text style={{color: 'white'}}>Number of touches: {touchCount}</Text>*/}
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  touchArea: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
});
