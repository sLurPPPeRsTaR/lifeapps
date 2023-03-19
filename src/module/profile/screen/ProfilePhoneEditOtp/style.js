import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  imageBackground: {
    container: {
      width: Size.screen.width,
      height: (Size.screen.height * 195) / 812,
      overflow: 'hidden',
      flex: 1,
      backgroundColor: Color.whiteBackground.light.whiteBackground,
    },
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flexGrow: 1,
    zIndex: 1,
  },
  main: {
    container: {
      paddingVertical: 24,
    },
  },
  card: {
    container: {
      backgroundColor: Color.main.light.white,
      paddingVertical: 24,
      paddingHorizontal: 16,
      marginBottom: 12,
      borderRadius: 30,
      shadowColor: Color.main.light.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
    },
    image: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24,
    },
    text: {
      marginBottom: 24,
    },
  },
  input: {
    line: {
      width: (48 * Size.screen.width) / (375 + 40) - 4,
      height: 56,
      borderBottomWidth: 1,
      borderBottomColor: Color.neutral.light.neutral20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    lineTab: {
      width: 48,
      height: 56,
      borderBottomWidth: 1,
      borderBottomColor: Color.neutral.light.neutral20,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 20,
    },
    container: {
      paddingVertical: 4,
      paddingHorizontal: 8,
    },
    grouper: {
      alignItems: 'stretch',
    },
    innerGrouper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    innerGrouperTab: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorMsg: {
      marginTop: 8,
    },
    active: {
      borderBottomWidth: 1.5,
    },
    error: {
      borderBottomColor: Color.primary.light.primary90,
    },
  },
  hiddenInput: {
    position: 'absolute',
    width: 0,
    height: 0,
  },
  time: {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 6.5,
      paddingVertical: 10,
    },
    clock: {
      container: {
        flexDirection: 'row',
      },
      loading: {
        marginEnd: 3.5,
      },
    },
  },
  modal: {
    success: {
      container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
      },
      icon: {
        position: 'absolute',
        top: -150,
        width: 128,
        height: 146,
        resizeMode: 'contain',
      },
      text: {
        marginBottom: 24,
      },
    },
  },
};
