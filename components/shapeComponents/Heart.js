import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, Text, View, Animated, Easing, Image, Dimensions, Platform } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as ScreenOrientation from 'expo-screen-orientation';
import Svg, { Circle, Rect, Path, G } from 'react-native-svg';
import PropTypes from 'prop-types';
import IconFA from 'react-native-vector-icons/FontAwesome';

Heart.propTypes = {
  color: PropTypes.string,
  dimension: PropTypes.number,
};

Heart.defaultProps = {
  color: 'rgba(6, 179, 20, 0.514)',
  dimension: 50,
};

export default function Heart(props) {
  const [animation] = useState(new Animated.Value(0));
  const [wasLocked, setWasLocked] = useState(false);

  useEffect(() => {
    if (props.unlockableItems) {
      const item = props.unlockableItems.find(item => item.name === 'heart');
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
        <TouchableOpacity onPress={() => props.handleCirclePress('heart')}>
          <Svg width="50" height="50" viewBox="0 0 50 50" version="1.1" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2">
            <G transform="matrix(0.0728333,0,0,0.111127,-23.2217,-80.9278)">
              <Rect x="318.833" y="728.246" width="686.5" height="449.936" fill="none" />
              <G transform="matrix(5.7317,0,0,3.75659,662.083,953.214)">
                <G transform="matrix(1,0,0,1,-58,-53)">
                  <Path opacity={props.selectedCircle === 'heart' ? 1 : 0.7} stroke={props.selectedCircle === 'heart' ? 'white' : 'transparent'} fill={props.validated ? '#1AD15F' : '#FF3C62'} strokeWidth="5" d="M58,17C52,7 42,0 30,0C13,0 0,13 0,30C0,63 18,68 58,106C98,68 116,63 116,30C116,13 103,0 86,0C74,0 64,7 58,17Z" />
                </G>
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
        <Svg style={[styles.heart, props.isADrop ? ({ width: props.dimension, height: props.dimension }) : { width: "50", height: "50" }]} viewBox="0 0 50 50" version="1.1" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2">
          <G transform="matrix(0.0728333,0,0,0.111127,-23.2217,-80.9278)">
            <Rect x="318.833" y="728.246" width="686.5" height="449.936" fill="none" />
            <G transform="matrix(5.7317,0,0,3.75659,662.083,953.214)">
              <G transform="matrix(1,0,0,1,-58,-53)">
                <Path stroke='white' strokeWidth={props.isADrop ? "1" : "3"} fill={props.color} d="M58,17C52,7 42,0 30,0C13,0 0,13 0,30C0,63 18,68 58,106C98,68 116,63 116,30C116,13 103,0 86,0C74,0 64,7 58,17Z" />
              </G>
            </G>
          </G>
        </Svg>}
    </View>
  );
}

const styles = StyleSheet.create({
  heart: {
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
