import { StyleSheet } from 'react-native';
import Size from 'ca-config/Size';
// import Color from 'ca-config/Color';

export default StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  headerContainer: {
    position: 'relative',
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
  },
  headerLeftContainer: {
    height: 56,
    position: 'absolute',
    justifyContent: 'center',
    left: 6,
  },
  headerLeftContent: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRightContainer: {
    height: 56,
    position: 'absolute',
    right: 10,
    justifyContent: 'center',
  },
  decoration: {
    position: 'absolute',
    bottom: 0,
    width: Size.screen.width,
    height: 206,
    resizeMode: 'cover',
  },
});
