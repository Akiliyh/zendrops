import React, { useEffect, useState } from 'react';
import { StyleSheet, Modal} from 'react-native';
import LottieView from 'lottie-react-native';
import { useOrientation } from './useOrientation';

export default function SplashScreen() {

  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);
  const orientation = useOrientation(); // Use the custom hook to get the orientation
  console.log(orientation);
  const source = orientation === 'PORTRAIT' ? require('../assets/splashscreen.json') : require('../assets/splashscreenlandscape.json');



  return (
      <Modal style={styles.animationContainer} visible={isSplashScreenVisible} animationType="fade" transparent={true} statusBarTranslucent={true}>
      {isSplashScreenVisible && (
      <LottieView
        loop={false}
        autoPlay
        onAnimationFinish={() => setIsSplashScreenVisible(false)}
        style={{
          backgroundColor: "#030F39",
        }}
        source={source}
      />
      )}
      </Modal>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#030F39",
    alignItems: 'center',
    justifyContent: 'center',
  },
});


/* return (
    <Animated.View style={[styles.animationContainer, {opacity: fadeAnimation}]}>
      {isSplashScreenVisible && (
      <LottieView
        loop={false}
        autoPlay
        onAnimationFinish={() => onAnimationTerminated()}
        style={{
          width: 1000,
          height: 1000,
          backgroundColor: "#030F39",
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../assets/splashscreen.json')}
      />
      )}
      <Modal style={styles.animationContainer} visible={isSplashScreenVisible} animationType="fade" transparent={true} statusBarTranslucent={true} ></Modal>
    </Animated.View>
  );
}*/

/*import LottieView from "lottie-react-native";
import React, { useState } from "react";
import { Modal, StyleSheet } from "react-native";
import animatedLogo from "../assets/splashscreen.json";
import * as NavigationBar from 'expo-navigation-bar';

const SplashScreen = () => {
  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);
  const closeSplashScreen = () => setIsSplashScreenVisible(false);
  NavigationBar.setVisibilityAsync("hidden");


  return (
    <Modal style={styles.animationContainer} visible={isSplashScreenVisible} animationType="fade" transparent={true}>
      <LottieView
      style={{
        width: 2000,
        height: 2000,
        backgroundColor: '#bbb',
      }}
        source={animatedLogo}
        loop={false}
        autoPlay
        onAnimationFinish={closeSplashScreen}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    zIndex: 5555555
  }
});

export default SplashScreen;*/

