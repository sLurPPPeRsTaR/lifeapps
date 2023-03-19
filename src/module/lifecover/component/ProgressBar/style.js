import { StyleSheet } from 'react-native';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';

export default StyleSheet.create({
  container: {
    backgroundColor: Color.grayIcon.dark.grayIcon,
    width: Size.screen.width,
    height: 4,
    position: 'relative',
  },
});
