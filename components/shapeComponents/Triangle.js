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

Triangle.propTypes = {
  color: PropTypes.string,
  dimension: PropTypes.number,
};

Triangle.defaultProps = {
  color: 'rgba(6, 179, 20, 0.514)', // Your default color value here,
  dimension: 50, // Your default color value here,
};

export default function Triangle(props) {
  const [animation] = useState(new Animated.Value(0));
  const [wasLocked, setWasLocked] = useState(false);

  useEffect(() => { 
    if (props.unlockableItems) {
      const item = props.unlockableItems.find(item => item.name === 'triangle');
      
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
        <TouchableOpacity onPress={() => props.handleCirclePress('triangle')}>
            <Svg preserveAspectRatio="xMidYMid meet" width="50" height="50" viewBox="0 0 50 50" version="1.1" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2">
                <G transform="matrix(0.0728333,0,0,0.111127,-23.2217,-80.9278)">
                    <Rect x="318.833" y="728.246" width="686.5" height="449.936" fill="none"/>
                    <G transform="matrix(5.50602,0,0,3.60868,-68231.1,-6149.77)">
                        <Path opacity={props.selectedCircle === 'triangle' ? 1 : 0.7} stroke={props.selectedCircle === 'triangle' ? 'white' : 'transparent'} fill={props.validated ? '#1AD15F' : '#FF3C62'} strokeWidth="5" d="M12512.3,1907.56L12572.7,2029.06L12452,2029.06L12512.3,1907.56Z" style="fill:rgb(255,60,98);"/>
                    </G>
                </G>
            </Svg>
            {props.isLocked ? (<IconFA style={[styles.lock]} name="lock" color="white" size={20}></IconFA>)
             : wasLocked && (
            <Animated.View style={[styles.lock, {opacity: animation.interpolate({inputRange: [0, 0, 1], outputRange: [0, 1, 0],}),
                  transform: [{translateX: animation.interpolate({inputRange: [0, 1], outputRange: [0, 50]})},
                  {
                      translateY: animation.interpolate({inputRange: [0, 1], outputRange: [0, -80]})},
                    {
                      rotate: animation.interpolate({inputRange: [0, 1], outputRange: ['0deg', '180deg']})
                    }]}]
                  }
            >
              <IconFA name="lock" color="white" size={20}></IconFA>
            </Animated.View>
          )}     
        </TouchableOpacity>
    :
    <Svg preserveAspectRatio="xMidYMid meet" style={[styles.triangle, props.isADrop ?  ({ width: props.dimension, height: props.dimension}) : { width: "50", height: "50" }]}     viewBox="0 0 50 50" version="1.1" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2">
        <G transform="matrix(0.0728333,0,0,0.111127,-23.2217,-80.9278)">
            <Rect x="318.833" y="728.246" width="686.5" height="449.936" fill="none"/>
            <G transform="matrix(5.50602,0,0,3.60868,-68231.1,-6149.77)">
                <Path stroke='white' strokeWidth={props.isADrop ? "1" : "3"} fill={props.color} d="M12512.3,1907.56L12572.7,2029.06L12452,2029.06L12512.3,1907.56Z"/>
            </G>
        </G>
    </Svg>}
    </View>
  );
}

const styles = StyleSheet.create({
      triangle:{
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
      lock:{
        position: 'absolute',
        left: 35,
        top: 35 
      }
});
