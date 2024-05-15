import { StyleSheet, TouchableWithoutFeedback, View, Image, Platform } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import GenerateLinearGradient from '../GenerateLinearGradient';


export default function Backgrounds(props) {
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [validated, setValidated] = useState(null);
  const [unlockedBackground, setUnlockedBackground] = useState(props.unlockableItems);

  useEffect(() => {
    console.log('The current color selected is ' + props.onBackgroundSelectedCircle);
    handleCirclePress(props.onBackgroundSelectedCircle);
    console.log(props.validatedBackground)
  }, [props.onBackgroundSelectedCircle, props.validatedBackground]);

  useEffect(() => {
    console.log('The current background validated is ' + props.validatedBackground);
    setValidated(props.validatedBackground);
  }, [props.validatedBackground]);

  useEffect(() => {

    console.log('The current unlocked backgrounds are');
    console.log(unlockedBackground);
  }, [props.unlockableItems]);

  const handleCirclePress = (key, colors) => {
    setSelectedCircle(key);
    props.settingCurrentGradient(key, colors);
  };

  const isBackgroundLocked = (BackgroundName) => {
    const item = unlockedBackground.find(item => item.name === BackgroundName);
    if (item && item.unlocked) {
      return false
    } else {
      return true
    }
  };

  return (
    <View style={styles.backgroundsContainer}>
      <LinearGradient
        colors={['#051329', '#03112f', '#030f34', '#070c38', '#0f073b']}
        style={styles.gradient}
        start={{ x: 0, y: 0.2 }}
        end={{ x: 0.8, y: 0.8 }}
      >
        <View style={styles.grid}>
          <View style={styles.row}>
            <GenerateLinearGradient unlockableItems={unlockedBackground} handleCirclePress={handleCirclePress} selectedCircle={selectedCircle} validated={props.validatedBackground} isBackgroundLocked={isBackgroundLocked('orange')} name='orange' colors={["#ff8000", "#ff8000", "#ff8000", "#ff8000", "#ff8000"]} isSelected={selectedCircle === 'orange'}></GenerateLinearGradient>
            <GenerateLinearGradient unlockableItems={unlockedBackground} handleCirclePress={handleCirclePress} selectedCircle={selectedCircle} validated={props.validatedBackground} isBackgroundLocked={isBackgroundLocked('blue')} name='blue' colors={["#051329", "#03112f", "#030f34", "#070c38", "#0f073b"]} isSelected={selectedCircle === 'blue'}></GenerateLinearGradient>
            <GenerateLinearGradient unlockableItems={unlockedBackground} handleCirclePress={handleCirclePress} selectedCircle={selectedCircle} validated={props.validatedBackground} isBackgroundLocked={isBackgroundLocked('green')} name='green' colors={["#06454b", "#06454b", "#06454b", "#06454b", "#06454b"]} isSelected={selectedCircle === 'green'}></GenerateLinearGradient>
            <GenerateLinearGradient unlockableItems={unlockedBackground} handleCirclePress={handleCirclePress} selectedCircle={selectedCircle} validated={props.validatedBackground} isBackgroundLocked={isBackgroundLocked('red')} name='red' colors={["#651C32", "#871C2F", "#A91D2B", "#CB1D28", "#ED1D24"]} isSelected={selectedCircle === 'red'}></GenerateLinearGradient>
          </View>
          <View style={styles.row}>
            <GenerateLinearGradient unlockableItems={unlockedBackground} handleCirclePress={handleCirclePress} selectedCircle={selectedCircle} validated={props.validatedBackground} isBackgroundLocked={isBackgroundLocked('nightblue')} name='nightblue' colors={["#030F39", "#424B6B", "#81879C", "#C0C3CE", "#FFFFFF"]} isSelected={selectedCircle === 'nightblue'}></GenerateLinearGradient>
            <GenerateLinearGradient unlockableItems={unlockedBackground} handleCirclePress={handleCirclePress} selectedCircle={selectedCircle} validated={props.validatedBackground} isBackgroundLocked={isBackgroundLocked('black')} name='black' colors={["#000000", "#000000", "#000000", "#000000", "#000000"]} isSelected={selectedCircle === 'black'}></GenerateLinearGradient>
            <GenerateLinearGradient unlockableItems={unlockedBackground} handleCirclePress={handleCirclePress} selectedCircle={selectedCircle} validated={props.validatedBackground} isBackgroundLocked={isBackgroundLocked('dawn')} name='dawn' colors={["#FFDE4E", "#FFC552", "#FFAC56", "#FF935A", "#FF7A5E"]} isSelected={selectedCircle === 'dawn'}></GenerateLinearGradient>
            <GenerateLinearGradient unlockableItems={unlockedBackground} handleCirclePress={handleCirclePress} selectedCircle={selectedCircle} validated={props.validatedBackground} isBackgroundLocked={isBackgroundLocked('pink')} name='pink' colors={["#ffc0cb", "#ffc0cb", "#ffc0cb", "#ffc0cb", "#ffc0cb"]} isSelected={selectedCircle === 'pink'}></GenerateLinearGradient>
          </View>
          <View style={styles.row}>
            <GenerateLinearGradient unlockableItems={unlockedBackground} handleCirclePress={handleCirclePress} selectedCircle={selectedCircle} validated={props.validatedBackground} isBackgroundLocked={isBackgroundLocked('neon')} name='neon' colors={["#DCB16D", "#C19E92", "#A78CB6", "#8C79DB", "#7166FF"]} isSelected={selectedCircle === 'neon'}></GenerateLinearGradient>
            <GenerateLinearGradient unlockableItems={unlockedBackground} handleCirclePress={handleCirclePress} selectedCircle={selectedCircle} validated={props.validatedBackground} isBackgroundLocked={isBackgroundLocked('azure')} name='azure' colors={["#008AD8", "#008AD8", "#008AD8", "#008AD8", "#008AD8"]} isSelected={selectedCircle === 'azure'}></GenerateLinearGradient>
            <GenerateLinearGradient unlockableItems={unlockedBackground} handleCirclePress={handleCirclePress} selectedCircle={selectedCircle} validated={props.validatedBackground} isBackgroundLocked={isBackgroundLocked('purple')} name='purple' colors={["#8031A7", "#7A3495", "#753783", "#6F3970", "#693C5E"]} isSelected={selectedCircle === 'purple'}></GenerateLinearGradient>
            <GenerateLinearGradient unlockableItems={unlockedBackground} handleCirclePress={handleCirclePress} selectedCircle={selectedCircle} validated={props.validatedBackground} isBackgroundLocked={isBackgroundLocked('burgundy')} name='burgundy' colors={["#9B2242", "#9B2242", "#9B2242", "#9B2242", "#9B2242"]} isSelected={selectedCircle === 'burgundy'}></GenerateLinearGradient>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 150,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 80,
      },
    }),
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 20,
  },
  grid: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 20,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gradientCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  lock: {
    position: 'absolute',
    left: 20,
    top: 15
  }
});
