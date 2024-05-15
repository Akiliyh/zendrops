import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableWithoutFeedback, Text, View, Animated, Easing, Dimensions } from 'react-native';
import React, { useState, useCallback, useEffect }  from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Square from './shapeComponents/Square';
import Circle from './shapeComponents/Circle';
import Triangle from './shapeComponents/Triangle';
import Ring from './shapeComponents/Ring';
import Heart from './shapeComponents/Heart';
import Star from './shapeComponents/Star';

/*SplashScreen.preventAutoHideAsync(); Remove the image loading screen to fade automatically, used to hide font loadings */

export default function Title(props) {
    const opacityValue = useState(new Animated.Value(0))[0];
    const scaleValue = useState(new Animated.Value(1))[0];

    const fadeIn = () => {
      setTimeout(() => {
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }).start();
        console.log('Animation is starting')
      }, 2500);
    };

    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleValue, {
            toValue: 1.5,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, []);       

    useEffect(() => {
        if (props.showTitle) {
          fadeOut();
          console.log('Title is fading');
        } else {
          fadeIn();
        }
      }, [props.showTitle]);

    const [fontsLoaded] = useFonts({
        'Lexend-Regular': require('../assets/fonts/Lexend-Regular.ttf'),
        'Lexend-Medium': require('../assets/fonts/Lexend-Medium.ttf'),
        'Lexend-Light': require('../assets/fonts/Lexend-Light.ttf'),
        'Lexend-Bold': require('../assets/fonts/Lexend-Bold.ttf'),
      });
    
      const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      }, [fontsLoaded]);
    
      if (!fontsLoaded) {
        return null;
      }
    
      const fadeOut = () => {
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: true,
        }).start();
      };

  return (
            <Animated.View style={[styles.title, { opacity: opacityValue }]}>
            <Text style={styles.titleText}>z e n d r o p s.</Text>
            <Text style={styles.subtitleText}>Relax through dropping drops</Text>
            <Animated.View style={styles.drop, {transform: [{ scale: scaleValue }]}}>
            {props.currentShape === 'square' ? <Square isIcon={false} isADrop={true}></Square> :null}
            {props.currentShape === 'triangle' ? <Triangle isIcon={false} isADrop={true}></Triangle> :null}
            {props.currentShape === 'circle' ? <Circle isIcon={false} isADrop={false}></Circle> :null}
            {props.currentShape === 'ring' ? <Ring isIcon={false} isADrop={true}></Ring> :null}
            {props.currentShape === 'heart' ? <Heart isIcon={false} isADrop={true}></Heart> :null}
            {props.currentShape === 'star' ? <Star isIcon={false} isADrop={true}></Star> :null}
          </Animated.View>
            </Animated.View>
  );
}

const styles = StyleSheet.create({
    title: {
        position: 'absolute',
        top: '25%',
        alignSelf: 'center',
        opacity: 0,
      },
      titleText: {
        fontSize: 45,
        color: 'white',
        fontFamily: 'Lexend-Bold',
        marginBottom: 40,
      },
      subtitleText: {
        fontSize: 15,
        color: 'white',
        fontFamily: 'Lexend-Regular',
        textAlign: 'center',
        marginBottom: Dimensions.get('window').height/25,
        opacity: .5,
      },
      drop: {
        width: 100,
        height: 100,
        marginTop: '10%',
        borderRadius: 50,
        marginLeft: 'auto',
        left: 0,
        right: 0,
        marginRight: 'auto',
        opacity: .8,
        alignItems: 'center',
        justifyContent: 'center'
      },
      circle: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: 'white',
        marginTop: '10%',
        borderRadius: 50,
        marginLeft: 'auto',
        left: 0,
        right: 0,
        marginRight: 'auto',
        backgroundColor: 'rgba(6, 179, 20, 0.514)',
        opacity: .8,
      }
});

