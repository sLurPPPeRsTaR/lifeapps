import Color from 'ca-config/Color';

export default {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  langButton: {
    container: {
      position: 'absolute',
      zIndex: 1,
      top: 15,
      alignSelf: 'flex-end',
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 10,
      paddingVertical: 4.5,
      paddingHorizontal: 8,
      width: 95,
      height: 36,
      // backgroundColor: Color.main.light.white,
    },
    lang: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        marginHorizontal: 4,
      },
      icon: { width: 20, height: 20, resizeMode: 'contain' },
    },
  },
  modal: {
    lang: {
      container: {},
      title: { marginBottom: 16 },
      card: {
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 8,
          paddingVertical: 12,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: Color.neutral.light.neutral20,
          marginBottom: 16,
        },
        lang: {
          flexDirection: 'row',
        },
        active: {
          // backgroundColor: Color.red.light.red20,
          borderColor: Color.red.light.red90,
        },
        icon: {
          width: 24,
          height: 24,
          resizeMode: 'contain',
        },
        radioIcon: {
          width: 20,
          height: 20,
          resizeMode: 'contain',
          borderColor: Color.neutral.light.neutral20,
          borderWidth: 1,
          borderRadius: 50,
        },
      },
      button: {
        marginTop: 8,
      },
    },
  },
  slide: {
    container: {
      flex: 1,
    },
    top: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: -40,
    },
    image: {
      width: 350,
      height: 314,
    },
  },
  text: {
    container: {
      marginTop: 16,
      marginBottom: 55,
      marginHorizontal: 12,
    },
    title: {
      marginTop: 44,
      marginBottom: 4,
    },
  },
  button: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      marginTop: 25,
    },
    button: {
      paddingHorizontal: 0,
    },
    size: {
      maxWidth: 151,
      height: 48,
    },
  },
  content: {
    container: {
      paddingTop: 10,
      paddingHorizontal: 40,
    },
  },
  lifesaverLogo: { width: 226, height: 40, marginRight: 5 },
  mt26: { marginTop: 26 },
  mt40: { marginTop: 40 },
  bgPrimary: {
    backgroundColor: Color.primary.light.primary90,
  },
  shadow: {
    shadowOffset: { width: 1, height: 1 },
    shadowColor: Color.blackHome.light.blackHome,
    shadowOpacity: 0.1,
    elevation: 5,
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    paddingBottom: 48,
  },
  shadowBanner: {
    backgroundColor: Color.main.light.white,
    shadowColor: Color.main.light.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  zIndex1: { zIndex: 1 },
  flex: { flex: 1 },
  flexDirectionRow: { flexDirection: 'row' },
  alignItemsCenter: { alignItems: 'center' },
  me8: { marginEnd: 8 },
  backgroundImage: { position: 'absolute', top: -5, zIndex: -1 },
};
