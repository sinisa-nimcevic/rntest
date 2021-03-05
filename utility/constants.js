import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const PICKER_SIZE = 30;
const STROKE_WIDTH = 2;
const CANVAS_SIZE = width - PICKER_SIZE * 2;
const CENTER = {
  x: CANVAS_SIZE / 2,
  y: CANVAS_SIZE / 2,
};
const SLIDER_SIZE = 30;

export default {
  PICKER_SIZE,
  STROKE_WIDTH,
  CANVAS_SIZE,
  CENTER,
  SLIDER_SIZE
};
