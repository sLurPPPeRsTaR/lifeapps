import { StyleSheet } from 'react-native';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';

export default StyleSheet.create({
  root: {
    height: 95,
    width: Size.screen.width,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: Color.tableHeader.dark.activeB2,
  },
});
