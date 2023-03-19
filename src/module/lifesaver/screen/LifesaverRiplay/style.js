import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  main: {
    headerBg: {
      backgroundColor: Color.whiteBackground.light.whiteBackground,
    },
    sectionBg: {
      backgroundColor: Color.whiteLifesaverBg.light.color,
      paddingVertical: 16,
    },
  },
  button: {
    container: {
      width: Size.screen.width,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    page: {
      position: 'absolute',
      bottom: 48,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Color.backgroundHome.light.backgroundHome,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      shadowColor: Color.blackHome.light.blackHome,
      shadowOpacity: 0.1,
      elevation: 5,
    },
    button: {
      backgroundColor: Color.main.light.white,
      borderRadius: 100,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      shadowColor: Color.blackHome.light.blackHome,
      shadowOpacity: 0.1,
      elevation: 5,
    },
    prev: {
      position: 'absolute',
      bottom: 48,
      left: 16,
    },
    next: {
      position: 'absolute',
      bottom: 48,
      right: 16,
    },
  },
  pdf: {
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 16,
    },
    pdf: {
      flex: 1,
      width: Size.screen.width - 32,
      height: 800,
    },
  },
  flex1: {
    flex: 1,
  },
};
