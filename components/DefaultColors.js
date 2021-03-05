import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import AppContext from '../config/appContext';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

const Circle = ({ bg }) => {
  const context = useContext(AppContext);

  const customStyle = {
    backgroundColor: bg,
  };

  const handlePress = () => {
    context.setColor(bg);
  };

  return <TouchableHighlight onPress={handlePress} style={[styles.circle, customStyle]}>
      <Text></Text>
  </TouchableHighlight>;
};

const DefaultColors = () => {
  return (
    <View style={styles.container}>
      <Circle bg="#ff0000" />
      <Circle bg="#00ff00" />
      <Circle bg="#0000ff" />
      <Circle bg="#000" />
      <Circle bg="#fff" />
    </View>
  );
};

export default DefaultColors;
