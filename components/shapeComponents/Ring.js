import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, Text, View, Animated, Easing, Image, Dimensions, Platform } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { useFonts } from 'expo-font';
import Svg, { Circle, Rect, Path, G } from 'react-native-svg';
import PropTypes from 'prop-types';
import IconFA from 'react-native-vector-icons/FontAwesome';

Ring.propTypes = {
  color: PropTypes.string,
  dimension: PropTypes.number,
};

Ring.defaultProps = {
  color: 'rgba(6, 179, 20, 0.514)',
  dimension: 50,
};

export default function Ring(props) {
  const [animation] = useState(new Animated.Value(0));
  const [wasLocked, setWasLocked] = useState(false);

  useEffect(() => {
    if (props.unlockableItems) {
      const item = props.unlockableItems.find(item => item.name === 'ring');
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

  /*const strokeWidthValue = useState(new Animated.Value(10))[0];
  const [strokeValue, setStrokeValue] = useState(10);  

  useEffect(() => {
    const showAnimation = Animated.timing(strokeWidthValue, {
      toValue: 3,
      duration: 4000,
      useNativeDriver: false,
      easing: Easing.bezier(.13, .89, .27, .91),
    });

    showAnimation.start();
  
    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 4000);

    const interval = setInterval(() => {
      const value = strokeWidthValue._value;
      setStrokeValue(value)
      console.log('Value:', value);
    }, 300);
  
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);
  
  // Calculate the stroke width based on the scale value
  const strokeWidth = strokeWidthValue.interpolate({
    inputRange: [5, 15],
    outputRange: [5, 15],
  });*/

  return (
    <View>
      {props.isIcon ?
        <TouchableOpacity onPress={() => props.handleCirclePress('ring')}>
          <Svg preserveAspectRatio="xMidYMid meet" width="50" height="50" viewBox="0 0 50 50" version="1.1" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2">
            <G transform="matrix(0.0728333,0,0,0.111127,-23.2217,-80.9278)">
              <Rect x="318.833" y="728.246" width="686.5" height="449.936" fill="none" />
              <G transform="matrix(2.06422,0,0,1.3529,-17185,-254.915)">
                <Path opacity={props.selectedCircle === 'ring' ? 1 : 0.7} stroke={props.selectedCircle === 'ring' ? 'white' : 'transparent'} fill={props.validated ? '#1AD15F' : '#FF3C62'} strokeWidth="12" d="M8645.91,731.942C8734.8,731.942 8806.96,804.105 8806.96,892.99C8806.96,981.874 8734.8,1054.04 8645.91,1054.04C8557.03,1054.04 8484.86,981.874 8484.86,892.99C8484.86,804.105 8557.03,731.942 8645.91,731.942ZM8645.91,812.466C8690.35,812.466 8726.44,848.547 8726.44,892.99C8726.44,937.432 8690.35,973.513 8645.91,973.513C8601.47,973.513 8565.39,937.432 8565.39,892.99C8565.39,848.547 8601.47,812.466 8645.91,812.466Z" />
              </G>
            </G>
          </Svg>
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
        :
        <Svg preserveAspectRatio="xMidYMid meet" style={styles.ring} width={props.dimension} height={props.dimension} viewBox="0 0 50 50" version="1.1" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2">
          <G transform="matrix(0.0728333,0,0,0.111127,-23.2217,-80.9278)">
            <Rect x="318.833" y="728.246" width="686.5" height="449.936" fill="none" />
            <G transform="matrix(2.06422,0,0,1.3529,-17185,-254.915)">
              <Path stroke='white' strokeWidth={props.isADrop ? "3" : "8"} fill={props.color} d="M8645.91,731.942C8734.8,731.942 8806.96,804.105 8806.96,892.99C8806.96,981.874 8734.8,1054.04 8645.91,1054.04C8557.03,1054.04 8484.86,981.874 8484.86,892.99C8484.86,804.105 8557.03,731.942 8645.91,731.942ZM8645.91,812.466C8690.35,812.466 8726.44,848.547 8726.44,892.99C8726.44,937.432 8690.35,973.513 8645.91,973.513C8601.47,973.513 8565.39,937.432 8565.39,892.99C8565.39,848.547 8601.47,812.466 8645.91,812.466Z" />
            </G>
          </G>
        </Svg>}
    </View>
  );
}

const styles = StyleSheet.create({
  ring: {
    marginLeft: 'auto',
    left: 0,
    right: 0,
    marginRight: 'auto',
    opacity: .9,
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
