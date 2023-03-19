import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  main: {
    container: {
      backgroundColor: Color.whiteBackground.light.whiteBackground,
      marginBottom: -100,
    },
    containerDowngrade: {
      backgroundColor: Color.whiteBackground.light.whiteBackground,
      marginBottom: -20,
    },
    headerBg: {
      backgroundColor: Color.red.light.D71920,
    },
    bgRed: {
      backgroundColor: Color.red.light.D71920,
      width: Size.screen.width,
      height: 50,
    },
    productCard: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: Size.screen.width,
      paddingHorizontal: 24,
      top: -120,
    },
    productCardDowngrade: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: Size.screen.width,
      paddingHorizontal: 24,
      top: -50,
    },
    personalData: {
      backgroundColor: Color.whiteBackground.light.whiteBackground,
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  banner: {
    container: {},
    image: {
      width: Size.screen.width,
      height: 250,
    },
  },
  productDesc: {
    borderRadius: {
      borderRadius: 16,
    },
    linearGradient: {
      paddingVertical: 12.5,
      paddingHorizontal: 24,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    desc: {
      shadowColor: Color.grayShadow.light.color,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderBottomRightRadius: 16,
      borderBottomLeftRadius: 16,
      backgroundColor: Color.whiteCard.light.color,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    textDesc: {
      marginBottom: 8,
      marginLeft: 5,
    },
    more: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 12,
      marginBottom: 6,
    },
  },
  personalData: {
    container: {
      width: Size.screen.width,
      paddingHorizontal: 16,
      paddingVertical: 20,
    },
    shadow: {
      padding: 16,
    },
    cardSection: {
      flexDirection: 'row',
      position: 'relative',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
  },
  beneficiaryData: {
    container: {
      width: Size.screen.width,
      paddingHorizontal: 16,
    },
    cardSection: {
      flexDirection: 'row',
      padding: 16,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    tambahkan: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    tambahkanText: {
      marginRight: 8,
      marginBottom: 2,
    },
  },
  total: {
    container: {
      width: Size.screen.width,
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: Color.whiteCard.light.color,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: -12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,
      elevation: 24,
    },
    section: {
      marginBottom: 14,
    },
    button: {
      width: 199,
    },
  },
  more: {
    container: {
      width: Size.screen.width,
      flexDirection: 'column',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 6,
    },
    closeIcon: {
      position: 'absolute',
      left: 16,
      borderRadius: 15,
      backgroundColor: Color.lightGray.light.lightGray,
    },
    tabContainer: {
      marginHorizontal: -20,
      marginTop: 10,
    },
    tabSection: {
      flexDirection: 'row',
      marginLeft: 5,
    },
    tabList: {
      paddingBottom: 20,
      paddingTop: 5,
      flexDirection: 'column',
      alignItems: 'center',
    },
    tabBar: {
      width: Size.screen.width / 2,
      marginTop: 5,
    },
    section: {
      marginBottom: -40,
      marginTop: -20,
    },
  },
  tabBenefit: {
    container: {
      paddingRight: 16,
      paddingVertical: 10,
    },
    animated: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Color.red.light.red20,
    },
    container2: {
      margin: 10,
      backgroundColor: Color.red.light.red20,
      paddingLeft: 32,
      paddingRight: 48,
      paddingVertical: 10,
    },
    container3: {
      margin: 10,
      paddingLeft: 32,
      paddingRight: 48,
    },
    detail: {
      marginTop: 10,
      marginLeft: 15,
    },
  },
  tabRisiko: {
    container: {
      height: Size.screen.height - 250,
      paddingTop: 20,
    },
  },
  durasiPerlindungan: {
    section: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    section2: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 14,
    },
  },
  syaratKetentuan: {
    container: {
      backgroundColor: Color.whiteBackground.light.whiteBackground,
      marginTop: 5,
      paddingVertical: 16,
    },
    touchable1: {
      paddingBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    touchable2: {
      paddingTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    horizontal: {
      marginHorizontal: -16,
    },
  },
  checkBox: {
    container: {
      flexDirection: 'row',
      marginTop: 16,
      paddingRight: 16,
    },
    size: {
      width: 24,
      height: 24,
    },
  },
  listRs: {
    headerContainer: {
      marginHorizontal: -16,
    },
    headerSection: { width: Size.screen.width / 2.5 },
    horizontalLine: {
      left: Size.screen.width / 3,
      marginTop: -14,
      width: Size.screen.width,
    },
    dataNull: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: Size.screen.height - 350,
    },
    content: {
      backgroundColor: Color.whiteLifesaverBg.light.color,
      height: Size.screen.height - 350,
      paddingVertical: 5,
      marginHorizontal: -16,
      paddingBottom: 60,
      zIndex: -10,
    },
    loading: {
      height: Size.screen.height - 350,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    cardContainer: {
      paddingHorizontal: 16,
      paddingTop: 10,
      marginBottom: 10,
    },
    card: {
      padding: 16,
    },
    filterCase: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 6,
    },
    case: { flexDirection: 'row', alignItems: 'center' },
    activityIndicator: {
      height: Size.screen.height - 350,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    sortContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  pr20: {
    paddingRight: 20,
  },
  mb10: {
    marginBottom: 10,
  },
  directionRow: {
    flexDirection: 'row',
  },
  maxH: {
    height: Size.screen.height - 250,
  },
  ml5: {
    marginLeft: 5,
  },
  mt5: {
    marginTop: 5,
  },
  flex1: {
    flex: 1,
  },
  mbMin30: {
    marginBottom: -30,
  },
  mb20: {
    marginBottom: 20,
  },
  mb40: {
    marginBottom: 40,
  },
  px16: {
    paddingVertical: 16,
  },
  whiteBg: {
    backgroundColor: Color.whiteBackground.light.whiteBackground,
  },
  my5: {
    marginVertical: 5,
  },
  mxMin10: {
    marginHorizontal: -10,
  },
  mr5: {
    marginRight: 5,
  },
  mbMin6: { marginBottom: -6 },
  my10: {
    marginVertical: 10,
  },
  px40: {
    paddingHorizontal: 40,
  },
  px56: {
    paddingHorizontal: 56,
  },
  bgWhite: { backgroundColor: Color.whiteLifesaverBg.light.color },
  bgRed: {
    backgroundColor: Color.red.light.red20,
    height: 500,
    marginHorizontal: -40,
    position: 'absolute',
    top: 50,
    zIndex: 30,
  },
};
