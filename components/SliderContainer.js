import React from 'react';
import { StyleSheet, View } from 'react-native';
import { color } from 'react-native-reanimated';
import { hsv2rgb } from 'react-native-redash';
import Slider from './Slider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingTop: 100,
  },
});

const SliderContainer = ({ h, s, v, backgroundColor }) => {
  const { r, g, b } = hsv2rgb(h, s, 1);
  const mainVal = color(r, g, b);

  return (
    <View style={styles.sliderContainer}>
      <Slider {...{ v, bg1: mainVal, bg2: backgroundColor }} />
    </View>
  );
};

export default SliderContainer;
