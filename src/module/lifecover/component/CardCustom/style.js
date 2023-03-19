import { StyleSheet } from 'react-native';
import Color from 'ca-config/Color';

export default {
  root: StyleSheet.create({
    container: {
      borderRadius: 16,
      backgroundColor: Color.whiteCard.dark.color,
      overflow: 'hidden',
      // shadowColor: Color.neutral.dark.neutral80,
      // shadowOffset: {
      //   width: 0,
      //   height: 1,
      // },
      // shadowOpacity: 0.22,
      // shadowRadius: 2.22,
      // elevation: 1,
    },
  }),
  header: StyleSheet.create({
    container: {
      position: 'relative',
      paddingHorizontal: 11.5,
      paddingVertical: 16,
      overflow: 'hidden',
      borderTopStartRadius: 16,
      borderTopEndRadius: 16,
    },
    background: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
    },
    backgroundImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
  }),
  body: StyleSheet.create({
    container: {
      paddingHorizontal: 11.5,
      paddingVertical: 16,
    },
  }),
};
