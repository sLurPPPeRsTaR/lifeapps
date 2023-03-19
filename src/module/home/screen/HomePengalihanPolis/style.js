import Color from 'ca-config/Color';

export default {
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  header: {
    rightContent: {
      paddingEnd: 16,
    },
  },
  pdf: {
    flex: 1,
  },
  button: {
    container: {
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
};
