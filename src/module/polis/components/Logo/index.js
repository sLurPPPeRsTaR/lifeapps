import React from 'react';
import { Image, StyleSheet } from 'react-native';
import {
  LogoLifeCover,
  LogoLifeCoverPlus,
  LogoMyLifeCover,
} from 'ca-config/Image';

const styles = StyleSheet.create({
  ACTIVE: { width: 113, height: 23, resizeMode: 'contain' },
});

export const LifeCoverLogos = {
  ACTIVE: {
    LifeCOVER: <Image style={styles.ACTIVE} source={LogoLifeCover} />,
    'LifeCOVER+': <Image style={styles.ACTIVE} source={LogoLifeCoverPlus} />,
    MyLifeCOVER: <Image style={styles.ACTIVE} source={LogoMyLifeCover} />,
  },
};
