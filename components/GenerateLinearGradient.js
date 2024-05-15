import { StyleSheet, TouchableWithoutFeedback, View, Animated, Easing, Image } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import IconFA from 'react-native-vector-icons/FontAwesome';

export default function GenerateLinearGradient(props) {
  const [animation] = useState(new Animated.Value(0));
  const [wasLocked, setWasLocked] = useState(false);

  useEffect(() => { 
    if (props.unlockableItems) {
      const item = props.unlockableItems.find(item => item.name === props.name);
      
      if (item && !item.unlocked) {
        setWasLocked(true);
      }
    }
  }, [props.unlockableItems]);


  useEffect(() => {
    console.log(props.validated + ' isValidated');
    console.log(props.colors + ' Colors');
    if (!props.isBackgroundLocked) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    }
  }, [props.isBackgroundLocked]);

  return (
    <TouchableWithoutFeedback
      key={props.name}
      onPress={() => props.handleCirclePress(props.name, props.colors)}
    ><View>
      <LinearGradient
        colors={props.colors}
        style={[styles.gradientCircle, props.isSelected ? {borderColor: 'white'} : JSON.stringify(props.validated) === JSON.stringify(props.colors) && {borderColor: '#1AD15F'}]}
        start={{ x: 0, y: 0.2 }}
        end={{ x: 0.8, y: 0.8 }}
      >
      </LinearGradient>
      {props.isBackgroundLocked ? (<IconFA style={[styles.lock]} name="lock" color="white" size={20}></IconFA>)
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
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    gradientCircle: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 30,
      height: 30,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    lock:{
      position: 'absolute',
      left: 20,
      top: 15 
    }
  });
