import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ColorPicker from './components/ColorPicker';
import DefaultColors from './components/DefaultColors';
import AppContext from './config/appContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingTop: 100,
  },
  title: {
    fontSize: 20,
    paddingLeft: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default function App() {
  const [color, setColor] = useState('#fff');

  return (
    // <AppContext.Provider value={{ color, setColor }}>
      <SafeAreaView style={StyleSheet.absoluteFill}>
        <View style={styles.container}>
          <Text style={[styles.title, { color: color }]}>Pick your color</Text>
          <ColorPicker />
          {/* <DefaultColors /> */}
        </View>
      </SafeAreaView>
    // </AppContext.Provider>
  );
}
