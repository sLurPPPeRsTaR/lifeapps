import Size from 'ca-config/Size';
import deviceInfo from 'react-native-device-info';
import Color from 'ca-config/Color';

export default {
  renderContainer: {
    backgroundColor: Color.main.light.black,
    zIndex: -1,
  },

  renderBackground: {
    container: {
      backgroundColor: Color.main.dark.white,
    },
    landingImg: {
      height: deviceInfo.isTablet() ? 850 : 450,
    },
    handImg: { width: Size.screen.width },
    backBtn: { position: 'absolute', top: 40, zIndex: 1 },
  },

  renderContent: {
    slideContainer: {
      paddingHorizontal: 24,
      paddingVertical: 10,
    },
    dotContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 20,
    },
  },

  renderButton: {
    btnContainer: {
      position: 'absolute',
      flex: 1,
      justifyContent: 'flex-end',
      paddingBottom: 48,
      paddingHorizontal: 16,
      bottom: 0,
    },
  },

  center: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  alert: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    paddingBottom: 24,
  },
  continerText: {
    flex: 1,
    backgroundColor: Color.main.light.black,
    alignItems: 'center',
    paddingBottom: 24,
  },
  alignSelf: { alignSelf: 'center' },
  containerImage: { flex: 3, backgroundColor: Color.main.light.black },
  mt6: { marginTop: 6 },
  mB16: { marginBottom: 16 },
  mB7: { marginBottom: 7 },
  mR9: { marginRight: 9 },
  ml16: { marginLeft: 16 },
  ml8: { marginLeft: 8 },
  pB48: { paddingBottom: 48 },
  pB70: { paddingBottom: 70 },
  pB150: { paddingBottom: 150 },
  pB10: { paddingBottom: 10 },
  pb8: { paddingBottom: 8 },
  tMin43: { top: -43 },
  pT40: { paddingTop: 40 },
  colorWhite: { color: Color.main.light.white },
  bgblack: { backgroundColor: Color.main.light.black },
  flex1: { flex: 1 },
  mb200: { marginBottom: 235 },
  alignSelf: { alignSelf: 'center' },
};
