import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { divide, set, useCode, useValue } from 'react-native-reanimated';
import { diffClamp, useGestureHandler, withOffset } from 'react-native-redash';
import constants from '../utility/constants';
const { SLIDER_SIZE, STROKE_WIDTH } = constants;
const { width } = Dimensions.get('window');

const upperBound = width - SLIDER_SIZE * 3;

const styles = StyleSheet.create({
  container: {
    borderRadius: SLIDER_SIZE / 2,
    position: 'relative',
  },
  gradient: {
    position: 'absolute',
    borderRadius: SLIDER_SIZE / 2,
    ...StyleSheet.absoluteFill,
  },
  cursor: {
    width: SLIDER_SIZE,
    height: SLIDER_SIZE,
    borderRadius: SLIDER_SIZE / 2,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: STROKE_WIDTH,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});

const Slider = ({ v, bg1, bg2 }) => {
  const state = useValue(0);
  const translationX = useValue(0);
  const offset = useValue(upperBound);
  const gestureHandler = useGestureHandler({
    translationX,
    state,
  });

  const translateX = diffClamp(withOffset(translationX, state, offset), 0, upperBound);

  useCode(() => set(v, divide(translateX, upperBound)), [translateX, v]);

  return (
    <View style={{ marginTop: 20 }}>
      <Animated.View style={[styles.background, { backgroundColor: bg2 }]} />
      <Animated.View style={[styles.container, { backgroundColor: bg1 }]}>
        <LinearGradient
          style={styles.gradient}
          colors={['#000', 'transparent']}
          start={[0, 1]}
          end={[1, 0]}
        />
        <PanGestureHandler {...gestureHandler}>
          <Animated.View style={[styles.cursor, { transform: [{ translateX }] }]} />
        </PanGestureHandler>
      </Animated.View>
    </View>
  );
};

export default Slider;
