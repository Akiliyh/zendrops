import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, Animated, Easing, View } from 'react-native';
import Modal from "react-native-modal";
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import IconFA from 'react-native-vector-icons/FontAwesome';
import { RewardedAd, RewardedAdEventType, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-5871643219152688/4177621680';
const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

export default function TestAd(props) {
  const [loading, setLoading] = useState(false);
  const [loadingAdFailed, setLoadingAdFailed] = useState(false);
  const [spinnerRotation] = useState(new Animated.Value(0));

  useEffect(() => {

    if (loadingAdFailed) {
      setTimeout(() => {
        setLoadingAdFailed(false)
      }, 50000);
    }
  }, [loadingAdFailed]);

  useEffect(() => {

    if (loading) {
      Animated.loop(
        Animated.timing(spinnerRotation, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();

      rewarded.load();
    } else {
      // Reset spinner rotation
      spinnerRotation.setValue(0);
    }
  }, [loading]);

  useEffect(() => {
    const adTimeout = setTimeout(() => {
      console.log(loading)
      if (loading) {
        // Loading still true after 5 seconds, show an alert
        console.log('Loading is taking longer than expected. Please try again later.');
        setLoadingAdFailed(true); // Set loading to false to stop the spinner
        setLoading(false);
      }
    }, 5000);
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      console.log('Rewarded ad has been loaded');
      if (loading) {
        rewarded.show();
      }
      setLoading(false);
    });
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
        setLoading(false);
        setLoadingAdFailed(false);
        console.log(props.coins + ' coins already');
        props.coinsEarned(props.coins, 5);
      },
    );

    const unsubscribeOpened = rewarded.addAdEventListener(
      AdEventType.OPENED, () => {
        setLoading(false);
        setLoadingAdFailed(false);
      },
    );

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubscribeOpened();
      clearTimeout(adTimeout);
    };
  }, [props.coins, loading]);


  const handleAdShow = () => {
    setLoading(true);
    setLoadingAdFailed(false);
  };

  return (
    <TouchableOpacity style={styles.adView} onPress={handleAdShow}>
      <IconEntypo name="video" size={25} color="white"></IconEntypo>
      <Text style={[{ color: 'white' }, { fontFamily: 'Lexend-Regular' }]}>+ 5</Text>
      <IconFA5 name="coins" size={14} color="yellow"></IconFA5>
      {loading &&
        <Animated.View style={[styles.spinner, { transform: [{ rotate: spinnerRotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '720deg'] }) }] }, { width: 14 }]}>
          <IconFA name="spinner" size={14} color="white"></IconFA>
        </Animated.View>}

      <Modal isVisible={loadingAdFailed}
        onBackdropPress={() => setLoadingAdFailed(false)}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={1500}
        animationOutTiming={1500}
        backdropOpacity={0}
        deviceWidth={2000}
        style={{
          margin: 0, position: 'absolute', bottom: 0, flex: 1, left: 0, right: 0, alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={{
          height: 75,
          width: 300,
          flexDirection: 'row',
          backgroundColor: '#030F39',
          marginBottom: 50,
          borderRadius: 10,
          padding: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Ionicons name="close-circle" size={20} color="red" />
          <Text style={{
            flex: 1,
            fontSize: 12,
            textAlign: 'center',
            color: 'white',
            fontFamily: 'Lexend-Medium'
          }}>Ad failed to load. Please try again later.</Text>
          <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={() => setLoadingAdFailed(false)}>
            <Ionicons name="ios-close" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  coinsContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  adView: {
    marginLeft: 20,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 50,
    paddingBottom: 3,
    paddingTop: 3,
    backgroundColor: '#FF3C62'
  },
  spinner: {
    position: 'absolute',
    left: 110
  }
});



