import { Node } from 'gl-react';
import { Surface } from 'gl-react-expo';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { State } from 'react-native-gesture-handler';
import { call, cond, eq, useCode, useValue } from 'react-native-reanimated';
import { hsv2color, hsv2rgb } from 'react-native-redash';
import AppContext from '../config/appContext';
import constants from '../utility/constants';
import createHSVCircle from '../utility/createHSVCircle';
import rgba2hex from '../utility/rgba2hex';
import Picker from './Picker';
import SliderContainer from './SliderContainer';
const { CANVAS_SIZE } = constants;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingTop: 100,
  },
  surface: {
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
  },
  hue: {
    alignSelf: 'center',
  },
  sliderContainer: {
    width: CANVAS_SIZE,
    marginTop: 20,
  },
});

const shader = createHSVCircle();

const ColorPicker = () => {
  const appContext = useContext(AppContext);
  const h = useValue(0);
  const s = useValue(0);
  const v = useValue(1);
  const backgroundColor = hsv2color(h, s, v);
  const state = useValue(State.UNDETERMINED);

  const chooseColor = ([h, s, v]) => {
    // appContext.setColor('#f00');
  };

  useCode(() => cond(eq(state, State.END), call([h, s, v], chooseColor)), [state, backgroundColor]);

  return (
    <View style={styles.container}>
      <View style={styles.hue}>
        <Surface style={styles.surface}>
          <Node shader={shader.hue} />
        </Surface>

        <Picker {...{ h, s, backgroundColor, state }} />

        <SliderContainer {...{ h, s, v, backgroundColor }} />
      </View>
    </View>
  );
};

export default ColorPicker;
