import { StyleSheet, TouchableOpacity, View, Animated, Easing } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Icon from 'react-native-vector-icons/AntDesign';

export default function CloseOverlay(props) {
  const opacityValue = useState(new Animated.Value(0))[0];
  const rotationValue = useState(new Animated.Value(0))[0];
  const [disabled, setDisabled] = useState(false);

  const handleShowOverlay = () => {
    if (props.showOverlay) {
      rotateClose();
      props.handleOverlayFadeOut(true);
      setTimeout(() => {
        if (props.showOverlay) {
          props.handleOverlayChange(false);
        }
      }, 600);
    } else {
      rotateOpen();
      props.handleOverlayChange(true);
      props.handleOverlayFadeOut(false);
    }

    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 600);
  };

  const fadeIn = () => {
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  const rotateOpen = () => {
    Animated.timing(rotationValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.bezier(0.2, 0.9, 0.57, 0.98),
      useNativeDriver: true,
    }).start();
  };

  const rotateClose = () => {
    Animated.timing(rotationValue, {
      toValue: 0,
      duration: 1000,
      easing: Easing.bezier(0.2, 0.9, 0.57, 0.98),
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  }, []);

  const spin = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity style={styles.iconContainer} onPress={handleShowOverlay} disabled={disabled}>
        <Animated.View style={[styles.fadeIn, { opacity: opacityValue, transform: [{ rotate: spin }] }]}>
          <Icon name={props.isArrow === true ? "arrowleft" : "setting"} size={24} color="white" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    elevation: 85,
    zIndex: 99,
  },
  fadeIn: {
    opacity: 0,
  },
});
