import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Music(props) {
  const [currentMusic, setCurrentMusic] = useState(props.currentMusic);

  useEffect(() => {
    playMusic(props.onMusicSelected);
  }, []);

  const playMusic = (music) => {
    props.settingCurrentMusic(music);
    setCurrentMusic((prevMusic) => (prevMusic === music ? prevMusic : music));
    console.log('Music changed');
    console.log(currentMusic);
  };

  return (
    <View style={styles.backgroundsContainer}>
      <LinearGradient
        colors={['#051329', '#03112f', '#030f34', '#070c38', '#0f073b']}
        style={styles.gradient}
        start={{ x: 0, y: 0.2 }}
        end={{ x: 0.8, y: 0.8 }}>

        <View style={styles.grid}>
          <View style={styles.firstRow}>
          <TouchableOpacity onPress={() => playMusic('Resonance')} style={styles.touchableRow}>
            <Text style={[styles.musicText, currentMusic === 'Resonance' ? styles.activeRow : null]}> Resonance </Text>
            <Ionicons name={currentMusic === 'Resonance' ? 'pause' : 'play'} size={20} color={currentMusic === 'Resonance' ? 'burlywood' : 'white'}></Ionicons>
          </TouchableOpacity>
          </View>
          <View style={styles.row}>
          <TouchableOpacity onPress={() => playMusic('Serenity In The Woods')} style={styles.touchableRow}>
            <Text style={[styles.musicText, currentMusic === 'Serenity In The Woods' ? styles.activeRow : null]}> Serenity In The Woods </Text>
            <Ionicons name={currentMusic === 'Serenity In The Woods' ? 'pause' : 'play'} size={20} color={currentMusic === 'Serenity In The Woods' ? 'burlywood' : 'white'}></Ionicons>
          </TouchableOpacity>
          </View>
          <View style={styles.row}>
          <TouchableOpacity onPress={() => playMusic('Lotus')} style={styles.touchableRow}>
            <Text style={[styles.musicText, currentMusic === 'Lotus' ? styles.activeRow : null]}> Lotus </Text>
            <Ionicons name={currentMusic === 'Lotus' ? 'pause' : 'play'} size={20} color={currentMusic === 'Lotus' ? 'burlywood' : 'white'}></Ionicons>
          </TouchableOpacity>
          </View>
          <View style={styles.lastRow}>
          <TouchableOpacity onPress={() => playMusic('Raindrop Reverie')} style={styles.touchableRow}>
            <Text style={[styles.musicText, currentMusic === 'Raindrop Reverie' ? styles.activeRow : null]}> Raindrop Reverie </Text>
            <Ionicons name={currentMusic === 'Raindrop Reverie' ? 'pause' : 'play'} size={20} color={currentMusic === 'Raindrop Reverie' ? 'burlywood' : 'white'}></Ionicons>
          </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 150,
    overflow: 'hidden'
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 20,
  },
  grid: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 20,
    justifyContent: 'space-between',
  },
  firstRow:{
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  lastRow:{
    paddingTop: 5
  },
  row: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    paddingBottom: 5,
    paddingTop: 5
  },
  touchableRow:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activeRow: {
    color: '#1AD15F',
  },
  musicText: {
    color: 'white',
    fontFamily: 'Lexend-Regular'
  }
});
