import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, Text, View, Animated, Easing, Image, Dimensions, Platform } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ScreenOrientation from 'expo-screen-orientation';
import Square from '../shapeComponents/Square';
import Triangle from '../shapeComponents/Triangle';
import Ring from '../shapeComponents/Ring';
import Star from '../shapeComponents/Star';
import Heart from '../shapeComponents/Heart';
import Circle from '../shapeComponents/Circle';

export default function Shapes(props) {
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [validated, setValidated] = useState(null);
  const [unlockedShape, setUnlockedShape] = useState(props.unlockableItems);

  useEffect(() => {
    console.log('The current shape selected is ' + props.onShapeSelectedCircle);
    handleCirclePress(props.onShapeSelectedCircle);
  }, [props.onShapeSelectedCircle]);

  useEffect(() => {
    console.log('The current shape validated is ' + props.validatedShape);
    setValidated(props.validatedShape);
  }, [props.validatedShape]);

  useEffect(() => {
    setUnlockedShape(props.unlockableItems);
    console.log( 'The current unlocked shapes are');
    console.log(unlockedShape);
  }, [props.unlockableItems]);

  const handleCirclePress = (shape) => {
    setSelectedCircle(shape);
    props.settingCurrentShape(shape);
  };

  const isShapeLocked = (shapeName) => {
    const item = unlockedShape.find(item => item.name === shapeName);
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
          <TouchableOpacity onPress={() => handleCirclePress('circle')}>
          <Circle handleCirclePress={handleCirclePress} isIcon={true} selectedCircle={selectedCircle} validated={validated === 'circle'}></Circle>
            </TouchableOpacity>
            <Ring unlockableItems={unlockedShape} handleCirclePress={handleCirclePress} isIcon={true} selectedCircle={selectedCircle} validated={validated === 'ring'} isLocked={isShapeLocked('ring')}></Ring>
            <Square unlockableItems={unlockedShape} handleCirclePress={handleCirclePress} isIcon={true} selectedCircle={selectedCircle} validated={validated === 'square'} isLocked={isShapeLocked('square')}></Square>
          </View>
          <View style={styles.row}>
            <Star unlockableItems={unlockedShape} handleCirclePress={handleCirclePress} isIcon={true} selectedCircle={selectedCircle} validated={validated === 'star'} isLocked={isShapeLocked('star')}></Star>
            <Heart unlockableItems={unlockedShape} handleCirclePress={handleCirclePress} isIcon={true} selectedCircle={selectedCircle} validated={validated === 'heart'} isLocked={isShapeLocked('heart')}></Heart>
            <Triangle unlockableItems={unlockedShape} handleCirclePress={handleCirclePress} isIcon={true} selectedCircle={selectedCircle} validated={validated === 'triangle'} isLocked={isShapeLocked('triangle')}></Triangle>           
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  test:{
    borderColor: 'white',
    borderWidth: 5
  },
  backgroundsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 150,
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
    paddingLeft: 40,
    paddingRight: 40,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedCircle: {
    borderColor: 'white',
    borderWidth: 2
  }
});
