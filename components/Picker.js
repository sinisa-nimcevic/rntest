import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  cond,
  divide,
  eq,
  event,
  modulo,
  set,
  useCode,
  useValue,
} from 'react-native-reanimated';
import { canvas2Polar, clamp, polar2Canvas, translate, vec, withOffset } from 'react-native-redash';
import Svg, { Path } from 'react-native-svg';
import constants from '../utility/constants';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const { PICKER_SIZE, STROKE_WIDTH, CANVAS_SIZE, CENTER } = constants;

const styles = StyleSheet.create({
  shadow: {
    width: PICKER_SIZE,
    height: PICKER_SIZE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4.0,
    borderRadius: 100,
    elevation: 3,
  },
});

const Picker = ({ h, s, backgroundColor, state }) => {
  const translation = vec.createValue(0, 0);

  const gestureHandler = event([
    {
      nativeEvent: {
        state,
        translationX: translation.x,
        translationY: translation.y,
      },
    },
  ]);

  const offset = {
    x: withOffset(translation.x, state),
    y: withOffset(translation.y, state),
  };

  const v2 = vec.add(offset, CENTER);
  const polar = canvas2Polar(v2, CENTER);
  const l = {
    theta: polar.theta,
    radius: clamp(polar.radius, 0, CANVAS_SIZE / 2),
  };

  const hue = divide(modulo(l.theta, 2 * Math.PI), 2 * Math.PI);
  const saturation = cond(eq(l.radius, 0), 0, divide(l.radius, CANVAS_SIZE / 2));

  useCode(() => [set(h, hue), set(s, saturation)], [h, hue, s, saturation]);

  return (
    <View style={StyleSheet.absoluteFill}>
      <PanGestureHandler onGestureEvent={gestureHandler} onHandlerStateChange={gestureHandler}>
        <Animated.View
          style={[
            styles.shadow,
            {
              transform: [
                ...translate(polar2Canvas(l, CENTER)),
                ...translate({
                  x: -PICKER_SIZE / 2,
                  y: -PICKER_SIZE / 2,
                }),
              ],
            },
          ]}
        >
          <Svg
            width={PICKER_SIZE}
            height={PICKER_SIZE}
            viewBox={`-${STROKE_WIDTH / 2} -${STROKE_WIDTH / 2} ${PICKER_SIZE + STROKE_WIDTH} ${
              PICKER_SIZE + STROKE_WIDTH
            }`}
          >
            <AnimatedPath
              d="
                M 0,15
                a 15,15 0 1,1 30,0
                a 15,15 0 1,1 -30,0
              "
              fill={backgroundColor}
              stroke="#fff"
              strokeWidth={STROKE_WIDTH}
              fillRule="evenodd"
            />
          </Svg>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Picker;
