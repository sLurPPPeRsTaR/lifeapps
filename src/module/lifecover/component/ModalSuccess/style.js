import { StyleSheet } from 'react-native';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';

export default StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.main.light.white,
    position: 'absolute',
    left: 0,
    width: Size.screen.width,
    height: Size.screen.height,
  },
  image: {
    flex: 1,
    flexShrink: 0,
    width: 160,
    height: 160,
    resizeMode: 'contain',
  },
  text: {
    fontSize: Size.text.h6.size,
    lineHeight: 27,
    marginTop: 30,
    textAlign: 'center',
    maxWidth: 300,
  },
});
