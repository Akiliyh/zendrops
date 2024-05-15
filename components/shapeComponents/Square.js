import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, Text, View, Animated, Easing, Image, Dimensions, Platform } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import PropTypes from 'prop-types';
import IconFA from 'react-native-vector-icons/FontAwesome';

Square.propTypes = {
  color: PropTypes.string,
  dimension: PropTypes.number,
};

Square.defaultProps = {
  color: 'rgba(6, 179, 20, 0.514)',
  dimension: 50,
};

export default function Square(props) {
  const [animation] = useState(new Animated.Value(0));
  const [wasLocked, setWasLocked] = useState(false);

  useEffect(() => {
    if (props.unlockableItems) {
      const item = props.unlockableItems.find(item => item.name === 'square');
      if (item && !item.unlocked) {
        setWasLocked(true);
      }
    }
  }, [props.unlockableItems]);

  useEffect(() => {
    if (!props.isLocked) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    }
  }, [props.isLocked]);

  return (
    <View>
      {props.isIcon ?
        <TouchableOpacity onPress={() => props.handleCirclePress('square')}>
          <View style={[styles.squareIcon, props.validated ? { backgroundColor: '#1AD15F' } : { backgroundColor: '#FF3C62', opacity: 0.7 }, props.selectedCircle === 'square' ? styles.selectedCircle : null]}></View>
          {props.isLocked ? (<IconFA style={[styles.lock]} name="lock" color="white" size={20}></IconFA>)
            : wasLocked && (
              <Animated.View style={[styles.lock, {
                opacity: animation.interpolate({ inputRange: [0, 0, 1], outputRange: [0, 1, 0], }),
                transform: [{ translateX: animation.interpolate({ inputRange: [0, 1], outputRange: [0, 50] }) },
                {
                  translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [0, -80] })
                },
                {
                  rotate: animation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] })
                }]
              }]
              }
              >
                <IconFA name="lock" color="white" size={20}></IconFA>
              </Animated.View>
            )}
        </TouchableOpacity>
        : <View style={[styles.square, props.isADrop ? { borderWidth: 2 } : { borderWidth: 1 }, { backgroundColor: props.color }, { width: props.dimension }, { height: props.dimension }]}></View>}
    </View>
  );
}

const styles = StyleSheet.create({
  squareIcon: {
    width: 50,
    height: 50,
  },
  square: {
    borderColor: 'white',
    marginLeft: 'auto',
    left: 0,
    right: 0,
    marginRight: 'auto',
    opacity: .8,
  },
  selectedCircle: {
    borderColor: 'white',
    borderWidth: 2
  },
  lock: {
    position: 'absolute',
    left: 35,
    top: 35
  }
});
