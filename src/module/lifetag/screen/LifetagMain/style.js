import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  header: {
    container: {
      paddingTop: 12,
      marginBottom: 34,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rightContent: {
      flexDirection: 'row',
    },
    iconShop: {
      width: 20,
      height: 20,
    },
    iconSetting: {
      width: 24,
      height: 24,
    },
    containerRightContent: {
      flexDirection: 'row',
      marginRight: 4,
      alignItems: 'center',
    },
  },

  containerCard: {
    backgroundColor: Color.main.light.white,
    padding: 6,
    position: 'relative',
  },

  card: {
    container: {
      backgroundColor: Color.backgroundHome.light.backgroundHome,
      borderRadius: 30,
    },
    backgroundCard: {
      backgroundColor: Color.main.light.white,
      padding: 7,
      position: 'relative',
    },
    infoCard: {
      container: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: Color.main.light.white,
        borderRadius: 30,
      },
      row: {
        flexDirection: 'row',
      },
      photoProfile: {
        // container: {
        //   width: 81,
        //   height: 92 - 36,
        //   marginEnd: 22,
        // },
        // image: {
        //   width: 81,
        //   height: 92,
        //   resizeMode: 'cover',
        //   position: 'absolute',
        //   bottom: -10,
        // },
        container: {
          width: 68,
          height: 68,
          marginEnd: 18,
          alignItems: 'center',
          justifyContent: 'center',
        },
        image: {
          width: 68,
          height: 68,
          resizeMode: 'cover',
          borderRadius: 34,
        },
      },
      boxShadow: {
        shadowColor: Color.neutral.dark.neutral90,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
      },
    },
    lifeCard: {
      container: {
        paddingTop: 16,
        paddingBottom: 24,
        paddingHorizontal: 24,
      },
      lifeCardImage: {
        width: 63,
        height: 40,
        resizeMode: 'cover',
        marginEnd: 12,
      },
    },
  },

  healthInfo: {
    container: {},
    healthInfoCard: {
      container: {
        backgroundColor: Color.main.light.white,
        borderRadius: 20,
        flexDirection: 'row',
        overflow: 'hidden',
      },
      containerEmergencyCall: {
        backgroundColor: Color.main.light.white,
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden',
      },
      onPressContainer: {
        borderColor: Color.main.light.white,
        borderWidth: 1.75,
        borderRadius: 24,
        padding: 2,
      },
      onPressContainerCallContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      },
      onPressContainerCall: {
        borderColor: Color.main.light.white,
        borderWidth: 1.75,
        borderRadius: 16,
        padding: 2,
      },
      content: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 8,
      },
      contentCall: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        left: -8,
      },
      linearGradient: {
        width: 100,
        height: 100,
        borderRadius: 100,
        position: 'absolute',
        top: -10,
        left: -25,
      },
      linearGradientCall: {
        width: 100,
        height: 100,
        borderRadius: 100,
        position: 'absolute',
        top: -10,
        left: -40,
      },
      icon: {
        container: {
          flex: 1,
          width: 70,
          alignItems: 'center',
          justifyContent: 'center',
        },
        icon: { width: 56, height: 56 },
        iconCall: { width: 20, height: 20 },
      },
      cardCall: {
        display: 'flex',
        flexDirection: 'row',
        padding: 6,
        marginTop: 3,
      },
      containerButtonCall: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 8,
      },
      buttonWa: {
        height: 30,
        borderRadius: 8,
        flex: 1,
        marginLeft: 6,
      },
      buttonTlp: {
        height: 30,
        borderRadius: 8,
        flex: 1,
        marginRight: 6,
      },
    },
  },

  footer: {
    container: {
      paddingHorizontal: 16,
      paddingBottom: 48,
    },
    sos: {
      container: {
        backgroundColor: Color.main.light.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 16,
        paddingTop: 65,
        paddingBottom: 48,
      },
      imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        position: 'absolute',
        top: -80,
        width: 70,
        height: 80,
      },
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 12,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: Color.main.light.white,
    },
  },

  lifetagNotFound: {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: { width: 252, height: 252, resizeMode: 'contain' },
  },

  backgroundWafe: {
    position: 'absolute',
    bottom: 0,
    height: 80,
  },

  flex1: { flex: 1 },
  flexShrink1: { flexShrink: 1 },
  flexDirectionRow: { flexDirection: 'row' },
  alignItemsCenter: { alignItems: 'center' },
  justifyContentSpaceBetween: { justifyContent: 'space-between' },
  justifyContentCenter: { justifyContent: 'center' },
  flexDirectionColumn: { flexDirection: 'column' },
  overflowVisible: { overflow: 'visible' },
  gapLine: { height: 6, width: Size.screen.width },
  me6: { marginEnd: 6 },
  me10: { marginEnd: 10 },

  mb2: { marginBottom: 2 },
  mb4: { marginBottom: 4 },
  mb8: { marginBottom: 8 },
  mb14: { marginBottom: 14 },
  mb16: { marginBottom: 16 },
  mt24: { marginTop: 24 },
  mt16: { marginTop: 16 },
  ml12: { marginLeft: 12 },
  mr16: { marginLeft: 16 },
  my20: { marginVertical: 20 },
  my10: { marginVertical: 10 },
  px8: { paddingHorizontal: 8 },
  pb8: { paddingBottom: 8 },
  pb48: { paddingBottom: 48 },
  pb16: { paddingBottom: 16 },
  p8: { padding: 8 },
};
