import { StyleSheet, Button, TouchableOpacity, TouchableWithoutFeedback, Text, View, Animated, Easing, Image, Linking,  Dimensions } from 'react-native';
import React, { useState, useCallback, useEffect }  from 'react';
import Modal from "react-native-modal";
import { LinearGradient } from 'expo-linear-gradient';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ScreenOrientation from "expo-screen-orientation";
import Backgrounds from '../components/menuComponents/Backgrounds';
import Music from './menuComponents/Music';
import Shapes from '../components/menuComponents/Shapes';
import * as StorageManager from '../StorageManager';
import Menu from '../components/Menu';
import Ad from './Ad';
import Square from './shapeComponents/Square';
import Circle from './shapeComponents/Circle';
import Triangle from './shapeComponents/Triangle';
import Ring from './shapeComponents/Ring';
import Heart from './shapeComponents/Heart';
import Star from './shapeComponents/Star';
import { useOrientation } from './useOrientation';

export default function Options(props) {  
    const opacityValue = useState(new Animated.Value(0))[0];
    const [windowDimensions, setWindowDimensions] = useState(Dimensions.get('window'));
    const [currentGradient, setCurrentGradient] = useState(props.backgroundGradient);
    const [currentGradientName, setCurrentGradientName] = useState(null);
    const [previousGradientName, setPreviousGradientName] = useState(null);
    const [currentShape, setCurrentShape] = useState(props.dropShape);
    const [currentMusic, setCurrentMusic] = useState(props.music);
    const [onBackgroundSelectedCircle, setOnBackgroundSelectedCircle] = useState(null);
    const [onShapeSelectedCircle, setOnShapeSelectedCircle] = useState(null);
    const [onMusicSelected, setOnMusicSelected] = useState(null);
    const [showBackgroundSelection, setShowBackgroundSelection] = useState(true);
    const [showShapeSelection, setShowShapeSelection] = useState(false);
    const [showMusicSelection, setShowMusicSelection] = useState(false);
    const [isItemBuyable, setIsItemBuyable] = useState(false);
    const [isItemSelected, setIsItemSelected] = useState(true);
    const [itemPrice, setItemPrice] = useState(0);
    const [isLandscape, setIsLandscape] = useState(false);
    const translateXValue = useState(new Animated.Value(Dimensions.get('window').width))[0]; 
    const scaleValue = useState(new Animated.Value(1))[0];
    const [updatedCoins, setUpdatedCoins] = useState(props.coins);
    const [unlockableItems, setUnlockableItems] = useState(props.unlockableItems);
    const [notEnoughCoins, setNotEnoughCoins] = useState(false);

    useEffect(() => { 
      Dimensions.get('window').width > Dimensions.get('window').height ? setIsLandscape(true) : setIsLandscape(false)
    }, []);

    /*useEffect(() => { 
      const testInterval = setInterval(() => {
        console.log(unlockableItems);
      }, 1000);

      return () => clearInterval(testInterval);
    }, [unlockableItems]);
    */

    useEffect(() => {
      const subscription = Dimensions.addEventListener(
        'change',
        ({window, screen}) => {
          setWindowDimensions({screen});
          console.log(screen);
          screen.width > screen.height ? setIsLandscape(true) : setIsLandscape(false);
        },
      );
      return () => subscription?.remove();
    }, []);

    useEffect(() => {
      StorageManager.saveUnlockableItemsToLocalStorage(unlockableItems);
    }, [unlockableItems]);

    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleValue, {
            toValue: 1.2,
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
      setFirstSelectedCircle();
      handleStyleMenu(props.menuCurrentlySelected);
    }, []);

    useEffect(() => {
      overlayIn();
      if (props.overlayFadeOut) {
          overlayOut();
      }
    }, [props.overlayFadeOut]);

    useEffect(() => {
      console.log(props.zenTime + ' Time passed being realxed');
    }, [props.zenTime]);

    useEffect(() => {
      console.log(props.coins + ' amount of coins');
      setUpdatedCoins(props.coins);
    }, [props.coins]);    

    const handleStyleMenu = (menu) => {
      props.handleMenuCurrentlySelected(menu);
      switch (menu) {
        case 'background':
          setShowBackgroundSelection(true);
          setShowShapeSelection(false);
          setShowMusicSelection(false);
          break;
        case 'shape':
          setShowShapeSelection(true);
          setShowMusicSelection(false);
          setShowBackgroundSelection(false);
          break;
        case 'music':
          setShowMusicSelection(true);
          setShowShapeSelection(false);
          setShowBackgroundSelection(false);
          break;
        default:
          break;
      }
    };

    const coinsEarned = (coins, reward) => {
      console.log(props.coins + ' coins');
      console.log(coins + ' coins from update');
      console.log(updatedCoins + ' updatedCoins');
      props.setCoins(updatedCoins + reward);
    };

    const setFirstSelectedCircle = () =>{
      console.log(currentMusic);
      setOnMusicSelected(currentMusic);
      setIsItemBuyable(false);
      setIsItemSelected(true);
        console.log(currentShape);
        setOnShapeSelectedCircle(currentShape);
      if (showBackgroundSelection) {
        console.log(currentGradient + ' settingbackgroundcircle');
        console.log(props.backgroundsData.gradients);
        const gradientsKeys = Object.keys(props.backgroundsData.gradients);
  
        for (let i = 0; i < gradientsKeys.length; i++) {
          console.log(props.backgroundsData.gradients[gradientsKeys[i]] + ' backgroundData');
          setPreviousGradientName(gradientsKeys[i]);
          console.log(currentGradient + ' settingbackgroundcircle');
            if (JSON.stringify(props.backgroundsData.gradients[gradientsKeys[i]]) === JSON.stringify(currentGradient)) { // We need to transform them into a string in order to compare them
              console.log('works');
              setOnBackgroundSelectedCircle(gradientsKeys[i]);
              return
            }
        }
      }
    }

    const pay = () => {
      setIsItemSelected(false);
      if (props.coins - itemPrice >= 0) {
        props.setCoins(props.coins - itemPrice);
        if (showShapeSelection) {
          const item = unlockableItems.find(item => item.name === currentShape);
          console.log(item);
            // Check if the item exists and if it is unlockable
            const itemIndex = unlockableItems.findIndex(item => item.name === currentShape);
      
            if (itemIndex !== -1) {
                // Update the item's unlocked property to true
                const updatedUnlockableItems = [...unlockableItems];
                // Update the item's unlocked property to true in the copy
                updatedUnlockableItems[itemIndex].unlocked = true;
                // Update the state with the new array
                setUnlockableItems(updatedUnlockableItems);
            }
        
            setIsItemBuyable(false);
        }
        if (showBackgroundSelection) {
          const item = unlockableItems.find(item => item.name === currentGradientName);
          console.log(item);
            // Check if the item exists and if it is unlockable
            const itemIndex = unlockableItems.findIndex(item => item.name === currentGradientName);
      
            if (itemIndex !== -1) {
                // Update the item's unlocked property to true
                const updatedUnlockableItems = [...unlockableItems];
                // Update the item's unlocked property to true in the copy
                updatedUnlockableItems[itemIndex].unlocked = true;
                // Update the state with the new array
                setUnlockableItems(updatedUnlockableItems);
            }
        
            setIsItemBuyable(false);
        }

      } else {
        /*alert('Not enough coins');*/
        setNotEnoughCoins(true);
      }
    };

    const validate = () => {
      if (showShapeSelection) {
        const item = unlockableItems.find(item => item.name === currentShape);
        console.log(item);
        props.handleDropShape(currentShape);
        if (item && item.unlocked === true) {
          setIsItemSelected(true);
          } else {
          setIsItemSelected(false);
        }
      }
      if (showBackgroundSelection) {
        const item = unlockableItems.find(item => item.name === currentGradientName);
        console.log(item);
        if (item && item.unlocked === true) {
          setIsItemSelected(true);
          } else {
          setIsItemSelected(false);
        }
        props.handleBackgroundGradient(currentGradient);
      }

      /*props.handleMusic(currentMusic);*/
      console.log(onBackgroundSelectedCircle + ' onBackgroundSelectedCircle');
      console.log(currentGradient + ' currentGradient');
      if (currentGradient === undefined) {
        return
      }

      setFirstSelectedCircle();
    };

    const settingGradient = (gradient) => {
      console.log(gradient)
      props.handleBackgroundGradient(gradient);
    }; // For changing the actual background

    const settingCurrentShape = (shape) => {
      setCurrentShape(shape);
      setOnShapeSelectedCircle(shape);
      console.log(shape +' shape');
      const item = unlockableItems.find(item => item.name === shape);
      if (props.dropShape === item.name) {
        setIsItemSelected(true);
      } else {
        setIsItemSelected(false);
      }
      console.log('Item:', item);
      if (showShapeSelection) {
          // Check if the item exists and if it is unlockable
          console.log(item.unlocked);
        if (item && item.unlocked === false) {
          setIsItemBuyable(true);
          setItemPrice(item.price);
          } else {
          setIsItemBuyable(false);
        }
        
      }
    }; 

    const settingCurrentMusic = (music) => {
      setIsItemSelected(true);
      setIsItemBuyable(false);
      if (currentMusic === music && showMusicSelection) {
        console.log('same music')
      }
      props.handleMusic(music);
      setOnMusicSelected(music);
      setCurrentMusic(music);
      console.log(music +' music');
    }; 

    const settingCurrentGradient = (gradientName, gradientColors) => {
      setCurrentGradient(gradientColors);
      setCurrentGradientName(gradientName);
      console.log(gradientColors);
      console.log(gradientName);
      const item = unlockableItems.find(item => item.name === gradientName);
      console.log(props.backgroundsData);
      if (item) {
      if (previousGradientName === item.name) {
        setIsItemSelected(true);
      } else {
        setIsItemSelected(false);
      }
      console.log('Item:', item);
      if (showBackgroundSelection) {
        // Check if the item exists and if it is unlockable
        console.log(item.unlocked);
      if (item && item.unlocked === false) {
        setIsItemBuyable(true);
        setItemPrice(item.price);
        } else {
        setIsItemBuyable(false);
      }
      
    }
    }
    };

    const overlayIn = () => {
        Animated.timing(translateXValue, {
          toValue: /*windowDimensions.width/4*/ 0,
          duration: 400,
          easing: Easing.bezier(0.5, 1, 0.89, 1),
          useNativeDriver: true,
        }).start();
      };

    const overlayOut = () => {
        Animated.timing(translateXValue, {
          toValue: Dimensions.get('window').width,
          duration: 400,
          easing: Easing.bezier(0.5, 1, 0.89, 1),
          useNativeDriver: true,
        }).start();
      };

      /* Change LINKS !!!!!!!!!! */
      /* Change LINKS !!!!!!!!!! */
      /* Change LINKS !!!!!!!!!! */

    const handlePressKoFi = () => {
      const koFiPageUrl = 'https://ko-fi.com/S6S2NSXYL';
      Linking.openURL(koFiPageUrl).catch((err) => console.error('Error opening URL:', err));
    };

    const handlePressInsta = () => {
      const koFiPageUrl = 'https://ko-fi.com/S6S2NSXYL';
      Linking.openURL(koFiPageUrl).catch((err) => console.error('Error opening URL:', err));
    };

    const handlePressTwitter = () => {
      const koFiPageUrl = 'https://ko-fi.com/S6S2NSXYL';
      Linking.openURL(koFiPageUrl).catch((err) => console.error('Error opening URL:', err));
    };

  return (
        <Animated.View style={[styles.overlay, {width: /*windowDimensions.width - windowDimensions.width/4 */  windowDimensions.width}, { transform: [{ translateX: translateXValue }] }]}>

<View style={{ flex: 1 , position: 'absolute', top: 0, justifyContent: 'center', alignItems: 'center', left: 0, right:0}}>


      <Modal isVisible={notEnoughCoins}
      onBackdropPress={() => setNotEnoughCoins(false)}
      animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={1500}
        animationOutTiming={1500}
      backdropOpacity={0}
      deviceWidth={2000}
      style={{ margin: 0, position: 'absolute', bottom: 0, flex: 1, left: 0, right: 0, alignItems: 'center',
      justifyContent: 'center',}}
      >
        <View style={{
          height: 75, 
          width: 250, 
          flexDirection: 'row',
          backgroundColor: '#030F39',
          marginBottom: 50,
          borderRadius: 10,
          padding: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Ionicons name="close-circle" size={20} color="red" style={{position: 'absolute', left: 20}} />
          <Text style={{
            flex: 1,
            fontSize: 18,
            textAlign: 'center',
            color: 'white',
            fontFamily: 'Lexend-Medium',
          }}>Not enough coins</Text>
          <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={() => setNotEnoughCoins(false)}>
            <Ionicons name="ios-close" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
          
          <LinearGradient
            colors={['rgba(4,14,99,1)', 'rgba(0,9,85,1)', 'rgba(0,0,169,1)']}
            style={styles.gradient}
            start={{ x: 0, y: 0.2 }}
            end={{ x: 0.8, y: 0.8 }}>

            

        {isLandscape ? 
        
        <TouchableWithoutFeedback>
        <View style={styles.overlayViewLandscape}>
        <Menu isArrow={true} showOverlay={props.showOverlay} handleOverlayFadeOut={props.handleOverlayFadeOut} handleOverlayChange={props.handleOverlayChange}/>
          <Text style={styles.zendropText}>zendrops.</Text>

        <View style={styles.row}>
        <Text style={styles.relaxTime}>{'Time spent being relaxed: ' + props.zenTime + ' min.'}</Text>
        <View style={{gap: 10, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.optionsTitle}>Customisation</Text>
          <View style={styles.coinsContainer}>        
          <View>
              <Text style={styles.textCoins}>{props.coins}</Text>
            </View>  
            <IconFA5 name="coins" size={24} color="yellow"></IconFA5>
            <Ad coins={updatedCoins} onPress={coinsEarned} coinsEarned={coinsEarned}/>
          </View>
        </View>

        </View>

              <View style={styles.row}>
                <View style={styles.leftSide}>
                  <View style={styles.previewLandscape}>
                    <LinearGradient
                      colors={currentGradient || props.backgroundGradient}
                      style={styles.previewGradient}
                      start={{ x: 0, y: 0.2 }}
                      end={{ x: 0.8, y: 0.8 }}>
                      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                        <View>
                          {currentShape === 'square' ? <Square isIcon={false}></Square> : null}
                          {currentShape === 'triangle' ? <Triangle isIcon={false}></Triangle> : null}
                          {currentShape === 'circle' ? <Circle isIcon={false}></Circle> : null}
                          {currentShape === 'ring' ? <Ring isIcon={false}></Ring> : null}
                          {currentShape === 'heart' ? <Heart isIcon={false}></Heart> : null}
                          {currentShape === 'star' ? <Star isIcon={false}></Star> : null}
                        </View>
                      </Animated.View>
                      <View style={styles.musicDisplayContainer}>
                        <Text style={{ color: 'white' }}>{onMusicSelected} - James November</Text>
                        <Ionicons name='pause' color='white' size={15}></Ionicons>
                      </View>
                    </LinearGradient>
                  </View>
                  {isItemBuyable ? 
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={pay} style={styles.buyBtn}>
              <Text style={styles.overlayText}>Buy</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', left: 90, position: 'absolute', gap: 5, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.textCoins}>{itemPrice}</Text>
              <IconFA5 name='coins' size={15} color='yellow'></IconFA5>
            </View>
          </View>
          : 
          isItemSelected ?  <Text style={[styles.overlayText, styles.selectedBtn]}>Selected</Text> : <TouchableOpacity onPress={() => validate()} style={styles.buyBtn}><Text style={styles.overlayText}>Validate</Text></TouchableOpacity>}
                  </View>
                  <View style={styles.rightSide}>
                    {showBackgroundSelection ? <Backgrounds isCurrentItemBuyable={isItemBuyable} unlockableItems={unlockableItems} validatedBackground={props.backgroundGradient} settingCurrentGradient={settingCurrentGradient} onBackgroundSelectedCircle={onBackgroundSelectedCircle} /> : null}
                    {showShapeSelection ? <Shapes isCurrentItemBuyable={isItemBuyable} unlockableItems={unlockableItems} validatedShape={props.dropShape} settingCurrentShape={settingCurrentShape} onShapeSelectedCircle={onShapeSelectedCircle} /> : null}
                    {showMusicSelection ? <Music validatedMusic={props.music} settingCurrentMusic={settingCurrentMusic} onMusicSelected={onMusicSelected} /> : null}

                    <View style={styles.styleBtnsContainerLandscape}>
          <TouchableOpacity onPress={() => handleStyleMenu('background')} style={showBackgroundSelection && styles.styleSelected || styles.styleBtn}>
          <Ionicons name="color-filter-sharp" size={24} color='white' style={showBackgroundSelection ? styles.selectedIcon : null}/>
            {/* <Text style={styles.btnText}>Background</Text> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleStyleMenu('shape')} style={showShapeSelection && styles.styleSelected || styles.styleBtn}>
          <Ionicons name="shapes" size={24} color='white' style={showShapeSelection ? styles.selectedIcon : null} />
            {/* <Text style={styles.btnText}>Shape</Text> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleStyleMenu('music')} style={showMusicSelection && styles.styleSelected || styles.styleBtn}>
          <Ionicons name="musical-notes" size={24} color='white' style={showMusicSelection ? styles.selectedIcon : null} />
            {/* <Text style={styles.btnText}>Music</Text> */}
          </TouchableOpacity>
          </View>
                  </View>
              </View>
          </View>
          </TouchableWithoutFeedback>
          
          
          :
          
          

        <TouchableWithoutFeedback>
        <View style={styles.overlayView}>
        <Menu isArrow={true} showOverlay={props.showOverlay} handleOverlayFadeOut={props.handleOverlayFadeOut} handleOverlayChange={props.handleOverlayChange}/>
          <Text style={styles.zendropText}>zendrops.</Text>
          <Text style={styles.relaxTime}>{'Time spent being relaxed: ' + props.zenTime + ' min.'}</Text>
          <View style={styles.coinsContainer}>
            <View>
              <Text style={styles.textCoins}>{props.coins}</Text>
            </View>        
            <IconFA5 name="coins" size={24} color="yellow"></IconFA5>
            <Ad coins={updatedCoins} onPress={coinsEarned} coinsEarned={coinsEarned}/>
          </View>
          
          <View style={styles.preview}>     
         <LinearGradient
      colors={currentGradient || props.backgroundGradient}
      style={styles.previewGradient}
      start={{ x: 0, y: 0.2 }}
      end={{ x: 0.8, y: 0.8 }}>
        <Animated.View style={{transform: [{ scale: scaleValue }]}}>
          <View>
          {currentShape === 'square' ? <Square isIcon={false}></Square> :null}
          {currentShape === 'triangle' ? <Triangle isIcon={false}></Triangle> :null}
          {currentShape === 'circle' ? <Circle isIcon={false}></Circle> :null}
          {currentShape === 'ring' ? <Ring isIcon={false}></Ring> :null}
          {currentShape === 'heart' ? <Heart isIcon={false}></Heart> :null}
          {currentShape === 'star' ? <Star isIcon={false}></Star> :null}
          </View>
        </Animated.View>
        <View style={styles.musicDisplayContainer}>
        <Text style={{color: 'white'}}>{onMusicSelected} - James November</Text>
        <Ionicons name='pause' color='white' size={15}></Ionicons>
        </View>
    </LinearGradient>
    </View>

    <Text style={styles.optionsTitle}>Customisation</Text>

          {showBackgroundSelection ? <Backgrounds isCurrentItemBuyable={isItemBuyable} unlockableItems={unlockableItems} validatedBackground={props.backgroundGradient} settingCurrentGradient={settingCurrentGradient} onBackgroundSelectedCircle={onBackgroundSelectedCircle}/> :null}
          {showShapeSelection ? <Shapes isCurrentItemBuyable={isItemBuyable} unlockableItems={unlockableItems} validatedShape={props.dropShape} settingCurrentShape={settingCurrentShape} onShapeSelectedCircle={onShapeSelectedCircle}/> :null}
          {showMusicSelection ? <Music validatedMusic={props.music} settingCurrentMusic={settingCurrentMusic} onMusicSelected={onMusicSelected}/> :null}

          {isItemBuyable ? 
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity style={styles.buyBtn} onPress={pay}>
              <Text style={styles.overlayText}>Buy</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', left: 90, position: 'absolute', gap: 5, alignItems: 'center', justifyContent: 'center', paddingTop: 15}}>
              <Text style={styles.textCoins}>{itemPrice}</Text>
              <IconFA5 name='coins' size={15} color='yellow'></IconFA5>
            </View>
          </View>
          : 
          isItemSelected ?  <Text style={[styles.overlayText, styles.selectedBtn]}>Selected</Text> : <TouchableOpacity onPress={() => validate()} style={styles.buyBtn}><Text style={styles.overlayText}>Validate</Text></TouchableOpacity>}
          
          <View style={styles.styleBtnsContainer}>
          <TouchableOpacity onPress={() => handleStyleMenu('background')} style={showBackgroundSelection && styles.styleSelected || styles.styleBtn}>
          <Ionicons name="color-filter-sharp" size={24} color='white' style={showBackgroundSelection ? styles.selectedIcon : null}/>
            {/* <Text style={styles.btnText}>Background</Text> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleStyleMenu('shape')} style={showShapeSelection && styles.styleSelected || styles.styleBtn}>
          <Ionicons name="shapes" size={24} color='white' style={showShapeSelection ? styles.selectedIcon : null} />
            {/* <Text style={styles.btnText}>Shape</Text> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleStyleMenu('music')} style={showMusicSelection && styles.styleSelected || styles.styleBtn}>
          <Ionicons name="musical-notes" size={24} color='white' style={showMusicSelection ? styles.selectedIcon : null} />
            {/* <Text style={styles.btnText}>Music</Text> */}
          </TouchableOpacity>
          </View>

          {/* <TouchableOpacity onPress={() => settingGradient(props.backgroundsData.gradients.orange)} style={styles.buyBtn}>
            <Text style={styles.overlayText}>Orange</Text>
          </TouchableOpacity> */}

          </View>
          </TouchableWithoutFeedback> }

          <View style={isLandscape ? styles.socialTextLandscape : styles.socialText}>
          <View style={styles.socialIcons}>
          {/* <TouchableOpacity onPress={handlePressInsta}>
            <IconFA5 name="instagram" size={18} color="white" source={{ uri: 'https://storage.ko-fi.com/cdn/kofi3.png?v=3' }}></IconFA5>
          </TouchableOpacity> */}
          {/* <TouchableOpacity onPress={handlePressTwitter}>
            <IconFA5 name="twitter" size={18} color="white" source={{ uri: 'https://storage.ko-fi.com/cdn/kofi3.png?v=3' }}></IconFA5>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={handlePressKoFi}>
            <Image style={{ height: 36, width: 120 }} source={{ uri: 'https://storage.ko-fi.com/cdn/kofi3.png?v=3' }} resizeMode="contain"/>
          </TouchableOpacity>
          </View>
          </View>
        
            </LinearGradient>
          
        </Animated.View>
  );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, .3)',
        zIndex: 99,
      },
      preview: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 180,/*
        ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          },
          android: {
            elevation: 80,
          },
        }),*/
      },
      previewLandscape: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 150,/*
        ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          },
          android: {
            elevation: 80,
          },
        }),*/
      },
      row: {
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        flex: 1,
        flexDirection: 'row',
      },
      previewGradient:{
        borderRadius: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
      },
      overlayView: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        flex: 1,
        width: '100%',
        gap: 10
      },
      overlayViewLandscape: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '100%',
        padding: 20,
        gap: 10
      },
      leftSide: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        gap: 10,
        marginBottom: 36,
      },
      rightSide: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        gap: 10,
        marginBottom: 30
      },
      gradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
      },
      textCoins: {
        fontSize: 20,
        color: 'yellow',
        fontFamily: 'Lexend-Bold',
        /*position: 'absolute',
        left: -20*/
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
      },
      optionsTitle: {
        color: 'white',
        fontFamily: 'Lexend-Regular',
      },
      overlayText: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'Lexend-Bold',
      },
      zendropText: {
        fontSize: 30,
        fontFamily: 'Lexend-Bold',
        color: 'white',
        position: 'absolute',
        top: 20,
      },
      socialText: {
        fontSize: 10,
        fontFamily: 'Lexend-Medium',
        color: 'white',
        position: 'absolute',
        bottom: 30,
      },
      socialTextLandscape: {
        fontSize: 10,
        fontFamily: 'Lexend-Medium',
        color: 'white',
        position: 'absolute',
        bottom: 10,
      },
      socialIcons: {
        flexDirection: 'row',
        gap : 20,
        justifyContent: 'center',
        alignItems: 'center'
      },
      relaxTime: {
        fontSize: 15,
        fontFamily: 'Lexend-Regular',
        color: 'white',
      },
      buyBtn: {
        marginTop: 15,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#FF3C62',
        borderRadius: 10,
      },
      selectedBtn: {
        marginTop: 15,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#1AD15F',
        borderRadius: 10,
      },
      styleBtn: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#030F39',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
      },
      styleSelected: {
        backgroundColor: 'white',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
      },
      selectedIcon:{
        color: '#030F39',
      },
      styleBtnsContainer: {
        flexDirection: 'row',
        gap: 10,
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 20,
        marginTop: 20,
        paddingRight: 5,
        paddingLeft: 5,
        backgroundColor: '#030F39',
        borderRadius: 50
      },
      styleBtnsContainerLandscape: {
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 5,
        paddingLeft: 5,
        backgroundColor: '#030F39',
        borderRadius: 50
      },
      coinsContainer: {
        flexDirection: 'row',
        gap: 5,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent : 'center'
      },
      musicDisplayContainer: {
        position: 'absolute',
        gap: 5,
        flexDirection: 'row',
        alignItems: 'flex-end',
        bottom: 25,
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
      openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
});
