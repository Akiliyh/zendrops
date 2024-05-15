import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Animated } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

/*SplashScreen.preventAutoHideAsync(); Remove the image loading screen to fade automatically, used to hide font loadings */

export default function IntroText(props) {
  const opacityValue = useState(new Animated.Value(0))[0];

  const fadeIn = () => {
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };


  const fadeOut = () => {
    Animated.timing(opacityValue, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    setTimeout(() => {
      fadeIn();
      setTimeout(() => {
        fadeOut();
      }, 5000);
    }, props.to);
  }, [props.to]);

  const [fontsLoaded] = useFonts({
    'Lexend': require('../assets/fonts/Lexend-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Animated.View style={[styles.title, { opacity: opacityValue }]}>
      <Text style={styles.idleText}>{props.text}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  title: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    opacity: 0,
    width: '50%'
  },
  idleText: {
    fontSize: 15,
    fontWeight: '400',
    color: 'white',
    fontFamily: 'Lexend',
    textAlign: 'center',
    opacity: .5,
  },
});
