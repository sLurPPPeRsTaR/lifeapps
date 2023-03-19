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
      container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
      },
      image: {
        width: 165,
        height: 153,
      },
    },
    title: {
      marginBottom: 8,
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
  lupaPin: {
    container: {
      marginTop: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  modal: {
    forgetPin: {
      card: {
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 20,
        },
        col: {
          container: {
            flexDirection: 'row',
            alignItems: 'center',
            flexShrink: 1,
          },
          icon: { marginEnd: 8 },
          text: { flexGrow: 1 },
        },
      },
    },
    tooFrequently: {
      container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 75,
      },
      icon: {
        width: 170,
        height: 170,
        position: 'absolute',
        top: -110,
      },
      title: {
        marginHorizontal: 32,
        marginBottom: 8,
      },
      subtitle: {
        marginHorizontal: 32,
        marginBottom: 16,
      },
      button1: {
        marginBottom: 16,
      },
    },
    pinBlocked: {
      container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 75,
      },
      icon: {
        width: 170,
        height: 170,
        position: 'absolute',
        top: -110,
      },
      title: {
        marginHorizontal: 16,
        marginBottom: 8,
      },
      subtitle: {
        marginHorizontal: 16,
        marginBottom: 16,
      },
      button1: {
        marginBottom: 16,
      },
    },
  },
  mb16: { marginBottom: 16 },
};
