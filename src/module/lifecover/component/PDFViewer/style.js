import { StyleSheet } from 'react-native';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default StyleSheet.create({
  root: {
    flex: 1,
  },
  headerBg: {
    backgroundColor: Color.whiteBackground.light.whiteBackground,
  },
  pdfContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 16,
  },
  pdfRoot: {
    flex: 1,
    width: Size.screen.width - 32,
    height: 800,
  },
});
