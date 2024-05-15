import React, { useEffect, useState } from 'react';
import { StyleSheet, Modal } from 'react-native';
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

