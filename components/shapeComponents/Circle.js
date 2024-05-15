import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, Text, View, Animated, Easing, Image, Dimensions, Platform } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { useFonts } from 'expo-font';
import PropTypes from 'prop-types';

Circle.propTypes = {
  color: PropTypes.string,
  dimension: PropTypes.number,
};

Circle.defaultProps = {
  color: 'rgba(6, 179, 20, 0.514)',
  dimension: 50,
};

export default function Circle(props) {

  return (
    <View>
      {props.isIcon ?
        <TouchableOpacity onPress={() => props.handleCirclePress('circle')}>
          <View style={[styles.circleIcon, props.validated ? { backgroundColor: '#1AD15F' } : { backgroundColor: '#FF3C62', opacity: 0.7 }, props.selectedCircle === 'circle' ? styles.selectedCircle : null]}></View>
        </TouchableOpacity>
        : <View style={[styles.circle, props.isADrop ? { borderWidth: 2 } : { borderWidth: 1 }, { backgroundColor: props.color }, { width: props.dimension }, { height: props.dimension }]}></View>}
    </View>
  );
}

const styles = StyleSheet.create({
  circleIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#FF3C62',
    borderRadius: 25
  },
  circle: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 500,
    marginLeft: 'auto',
    left: 0,
    right: 0,
    marginRight: 'auto',
    backgroundColor: 'rgba(6, 179, 20, 0.514)',
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
