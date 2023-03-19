import Color from 'ca-config/Color';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  flex1: { flex: 1 },
  scrollViewContainer: {
    flexGrow: 1,
  },
  backgroundContainer: {
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
  },
  positionAbs: {
    position: 'absolute',
  },
  headerContainer: {
    backgroundColor: Color.main.light.white,
  },
  headerContainerInner: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerContainerInnerStatic: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerContainerInverse: {
    position: 'absolute',
    backgroundColor: Color.transparent.light.transparent,
  },
  headerContainerWhite: {
    position: 'absolute',
    backgroundColor: Color.main.light.white,
  },
  backButtonContainer: {
    position: 'absolute',
    left: 16,
  },
  bottomBorder: {
    height: 1,
  },
  rightContainer: {
    height: 56,
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
  },
});
