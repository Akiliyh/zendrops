import { StyleSheet, Animated, Easing } from 'react-native';
import React, { useState, useEffect } from 'react';
import Square from './shapeComponents/Square';
import Ring from './shapeComponents/Ring';
import Circle from './shapeComponents/Circle';
import Triangle from './shapeComponents/Triangle';
import Star from './shapeComponents/Star';
import Heart from './shapeComponents/Heart';

const shapeComponents = {
  'circle': Circle,
  'square': Square,
  'star': Star,
  'heart': Heart,
  'triangle': Triangle,
  'ring': Ring
};

export default function Drop(props) {
  let dimension = randomIntFromInterval(200, 300);
  const opacityValue = useState(new Animated.Value(0))[0];
  const scaleValue = useState(new Animated.Value(0))[0];
  const rotationValue = randomIntFromInterval(0, 360);
  const ShapeComponent = shapeComponents[props.dropShape];

  useEffect(() => {

    const showAnimation = Animated.parallel([
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 1,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
        easing: Easing.bezier(.13, .89, .27, .91),
      }),
    ]);

    const hideAnimation = Animated.timing(opacityValue, {
      toValue: 0,
      duration: 8000,
      useNativeDriver: true,
      easing: Easing.bezier(.13, .89, .27, .91),
    });

    const timeout = setTimeout(() => {
      hideAnimation.start();
    }, 100);

    showAnimation.start();

    return () => clearTimeout(timeout);
    hideAnimation.stop();
  }, []);

  return (
    <Animated.View style={[styles.impactContainer, {
      top: props.top - dimension / 2,
      left: props.left - dimension / 2,
      width: dimension,
      height: dimension,
      opacity: opacityValue,
      transform: [
        { scale: scaleValue },
        { rotate: rotationValue + 'deg' }, // Apply the random angle here
      ],
    },
    ]}
    >
      <ShapeComponent style={styles.impact} isADrop={true} dimension={dimension} color={getRandomColor()} isIcon={false} />
    </Animated.View>
  );
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const styles = StyleSheet.create({
  impactContainer: {
    width: 300,
    height: 300,
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    opacity: 0,
    flexDirection: 'row'
  },
  impact: {
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
});