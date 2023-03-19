import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import { APP } from 'ca-util/constant';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export default {
  container: {
    paddingBottom: 50,
    marginTop: DeviceInfo.isTablet() ? 170 : 60,
  },
  padder: {
    container: {
      paddingTop: 16,
    },
  },
  header: {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      height: APP.header.height,
    },
    logo: { width: 50, height: 34 },
  },
  balance: {
    container: {
      marginBottom: 16,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  bullet: {
    container: {
      margin: 16,
      flexDirection: 'row',
    },
    active: {
      width: 24,
      height: 8,
      backgroundColor: Color.dotActive.light.dotActive,
      marginHorizontal: 5,
      borderRadius: 16,
    },
    inactive: {
      width: 8,
      height: 8,
      backgroundColor: Color.dotInActive.light.dotInActive,
      marginHorizontal: 5,
      borderRadius: 16,
    },
  },
  content: {
    container: {
      flexWrap: 'wrap',
      height: 220,
    },
    containerTablet: {
      // height: 220,
      flex: 1,
      flexDirection: 'row',
      // flexWrap: 'wrap',
      // justifyContent: 'space-evenly',
    },
    guideCard: {
      container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      card: {
        paddingTop: 8,
        paddingHorizontal: 8,
      },
      innerPicture: {
        borderRadius: 16,
        overflow: 'hidden',
      },
      innerText: {
        position: 'absolute',
        top: '15%',
        left: 8,
      },
      innerTextTablet: {
        position: 'absolute',
        top: 25,
        left: 25,
      },
      descText: {
        flexDirection: 'row',
        paddingHorizontal: 6,
        paddingVertical: 8,
      },
      descTextTablet: {
        flexDirection: 'row',
        paddingTop: 8,
        paddingBottom: 20,
        paddingHorizontal: 20,
      },
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 16,
    },
    alertCard: {
      container: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        width: 150,
        height: 150,
        marginBottom: 8,
      },
      title: {
        marginBottom: 4,
      },
      subtitle: {
        flexDirection: 'row',
      },
    },
  },
  modal: {
    totalInvestasi: {
      container: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      icon: { marginBottom: 16 },
      title: { marginBottom: 4 },
    },
    eKYC: {
      iconContainer: { alignItems: 'center' },
      icon: {
        position: 'absolute',
        top: -200,
        width: 300,
        height: 300,
      },
      title: { marginBottom: 4 },
      subtitle: { marginBottom: 24 },
      button1: { marginBottom: 16 },
    },
    updataReminder: {
      iconContainer: { alignItems: 'center' },
      icon: {
        position: 'absolute',
        top: -250,
        width: 300,
        height: 300,
      },
      title: { marginBottom: 4 },
      subtitle: { marginBottom: 24 },
      button1: { marginBottom: 16 },
    },
    alterSuccess: {
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
      title: { marginBottom: 16 },
      subtitle: { marginBottom: 24 },
    },
    alterFail: {
      container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
      },
      icon: { position: 'absolute', top: -210, width: 250, height: 250 },
      title: { marginBottom: 16 },
      subtitle: { marginBottom: 24 },
    },
    nextBenefitWidget: {
      body: {
        borderBottomWidth: 1,
        borderColor: Color.grayBorder.light.grayBorder,
        marginBottom: 16,
        paddingBottom: 10,
      },
      bodyWithoutBorder: {
        marginBottom: 16,
      },
      bottomBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    },
    changePhone: {
      container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 90,
      },
      image: {
        position: 'absolute',
        top: -90,
        width: 298,
        height: 170,
        resizeMode: 'contain',
      },
      title: { marginBottom: 6 },
      subtitle: { marginBottom: 36 },
      input: { marginBottom: 24 },
    },
    tooFrequently: {
      container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
      },
      icon: {
        width: 170,
        height: 170,
        position: 'absolute',
        top: -160,
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
    lifecard: {
      container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
      },
      image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        position: 'absolute',
        top: -170,
      },
      title: { marginBottom: 16 },
      subtitle: { marginBottom: 24 },
      button: { marginBottom: 16 },
    },
  },
  shadow: {
    shadowColor: Color.main.light.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  notifBadge: {
    position: 'absolute',
    minWidth: 16,
    height: 16,
    paddingHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: Color.greenBgNotif.light.color,
  },
  itemMenu: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemMenuInner: {
    height: 101,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  imageContainer: {
    height: DeviceInfo.isTablet() ? 350 : 220,
  },
  imageContainerIphoneX: {
    height: DeviceInfo.isTablet() ? 350 : 264,
  },
  imageHeaderPadder: {
    height: 40,
    backgroundColor: Color.red.dark.D71920,
  },
  polisCard: {
    containerTab: {
      flexWrap: 'wrap',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cardBackground: {
      width: 200,
      height: 200,
      position: 'absolute',
      left: 0,
      bottom: 0,
      opacity: 0.8,
    },
    loading: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    sectionContainer: {
      backgroundColor: Color.main.light.white,
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderBottomWidth: 1,
      borderBottomColor: Color.grayBorder.light.grayBorder,
    },
    card: {
      borderRadius: 24,
      borderWidth: 1,
      borderColor: Color.grayCardIndicator.light.grayIndicator,
    },
    cardTab: {
      borderRadius: 24,
      borderWidth: 1,
      borderColor: Color.grayCardIndicator.light.grayIndicator,
    },
    content: {
      container: {
        paddingVertical: 20,
        paddingHorizontal: 16,
      },
      detailButton: {
        container: {
          position: 'absolute',
          top: 0,
          right: 0,
        },
        button: {
          width: 56,
          height: 52,
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomLeftRadius: 24,
          borderTopRightRadius: 24,
        },
      },
      header: {
        container: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 8,
          marginEnd: 56 + 4 - 16,
        },
        image: {
          width: 24,
          height: 24,
          resizeMode: 'contain',
          marginEnd: 12,
        },
      },
      policyNo: {
        marginBottom: 6,
      },
      benefitValue: {
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 6,
        },
        value: { marginEnd: 4 },
      },
      date: {
        flexDirection: 'row',
        marginBottom: 12,
      },
      badgeClientCode: {
        justifyContent: 'center',
        backgroundColor: Color.badgePink.light.badgePink,
        borderRadius: 16,
        paddingHorizontal: 14,
        paddingVertical: 5,
      },
      pengkinianButton: {
        container: { marginTop: 25 },
        button: {
          borderWidth: 1,
          borderColor: Color.primary.light.primary20,
          borderRadius: 9,
          padding: 10,
          alignItems: 'center',
          backgroundColor: Color.main.light.white,
        },
      },
    },
  },

  textBoldItalic: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  textSemiBoldItalic: {
    fontWeight: '600',
    fontStyle: 'italic',
  },
  // WIDGET //
  pengkinianWidget: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
    },
    text: {
      container: {
        marginRight: 80,
      },
      text: { flexShrink: 1 },
    },
    image: {
      container: {
        backgroundColor: Color.widgetManfaatLeftBg.light.color,
        paddingVertical: 32,
        paddingLeft: 16,
        paddingRight: 32,
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 100,
        position: 'absolute',
        right: -30,
      },
      image: { left: -30, width: 60, height: 60 },
    },
    content: {
      container: { flexGrow: 1 },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      infoIcon: { width: 17, height: 17 },
    },
    wave: { position: 'absolute', bottom: -110 },
  },

  nextBenefitWidget: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
    },
    image: {
      container: {
        backgroundColor: Color.widgetManfaatLeftBg.light.color,
        paddingVertical: 32,
        paddingRight: 16,
        paddingLeft: 32,
        borderTopRightRadius: 100,
        borderBottomRightRadius: 100,
        position: 'absolute',
        left: -30,
      },
      image: { left: 6, width: 60, height: 60 },
    },
    content: {
      container: { marginLeft: 84, flexGrow: 1 },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      infoIcon: { width: 17, height: 17 },
    },
    wave: { position: 'absolute', bottom: -110 },
  },

  renderWidget: {
    container: { justifyContent: 'center', alignItems: 'center' },
    containerTabletOneItem: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerTabletTwoItems: { justifyContent: 'center', alignItems: 'center' },
    dotContainer: {
      flexDirection: 'row',
      paddingLeft: 16,
      paddingVertical: 20,
      // marginTop: 5,
    },
    dotContainerUserTips: {
      flexDirection: 'row',
      // paddingLeft: 16,
      paddingVertical: 5,
      // marginTop: 5,
    },
    dotContainerUserTips: {
      flexDirection: 'row',
      // paddingLeft: 16,
      paddingVertical: 5,
      // marginTop: 5,
    },
    dotActive: { margin: 3, color: Color.eventDotActive.light.color },
    dotInActive: { margin: 3, color: Color.eventDotInActive.light.color },
  },

  renderWidgetActivatedLifeSAVER: {
    imgWidgetActivatedLifeSAVERTablet: {
      width: '50%',
      height: 160,
      left: -150,
      bottom: 29,
      marginRight: -230,
    },
    imgWidgetActivatedLifeSAVER: {
      width: '50%',
      height: 160,
      left: -50,
      bottom: 28,
      marginRight: -70,
    },
  },

  widgetBajo: {
    imgWidgetBajo: {
      width: '40%',
      bottom: 70,
      left: -15,
      marginRight: -10,
    },
  },

  renderHighlightEvent: {
    imgHighlight: {
      resizeMode: 'stretch',
    },
    contentDate: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    contentCard: (data, index) => ({
      marginBottom: 5,
      marginLeft: 1,
      marginRight: data?.length - 1 !== index ? 8 : 1,
    }),
    btnSeeEvent: {
      position: 'absolute',
      right: 10,
      borderRadius: 6,
      bottom: 10,
    },
    dotContainer: {
      flexDirection: 'row',
      paddingLeft: 5,
      paddingVertical: 5,
      // marginTop: 5,
    },
    containerClaim: {
      position: 'absolute',
      display: 'flex',
      minWidth: DeviceInfo.isTablet() ? 550 : 220,
      right: 0,
      bottom: 0,
      height: DeviceInfo.isTablet()
        ? Size.screen.height / 10
        : Size.screen.height / 13,
      flexDirection: 'column',
    },

    textSince: {
      position: 'absolute',
    },
    textFooterClaim: {
      width: DeviceInfo.isTablet() ? 400 : 200,
      position: 'absolute',
      bottom: 0,
      marginBottom: DeviceInfo.isTablet() ? 35 : 8,
    },
  },
  renderEventCodeModal: {
    waveImg: {
      position: 'absolute',
      bottom: -120,
    },
  },
  renderMenu: {
    image: {
      width: 50,
      height: 50,
      resizeMode: 'cover',
    },
  },

  gap: { height: 10 },
  me4: { marginEnd: 2 },
  mt4: { marginTop: 4 },
  mt65: { marginTop: 65 },
  mt16: { marginTop: 16 },
  mb16: { marginBottom: 16 },
  mr40: { marginRight: 40 },
  flex: { flex: 1 },
  flexDirectionRow: { flexDirection: 'row' },
  alignItemsCenter: { alignItems: 'center' },
  justifyContentSpaceBetween: { justifyContent: 'space-between' },
  justifyContentCenter: { justifyContent: 'center' },
  fS1: { flexShrink: 1 },
  mV10: { marginVertical: 10 },
  mV16: { marginVertical: 16 },
  mH4: { marginHorizontal: 4 },
  mB16: { marginBottom: 16 },
  mB24: { marginBottom: 24 },
  flexShrink1: { flexShrink: 1 },
  mT9: { marginTop: 9 },
  mT30: { marginTop: 30 },
  pV5: { paddingVertical: 5 },
  pH5: { paddingHorizontal: 5 },
  pH5: { paddingHorizontal: 5 },
  pH15: { paddingHorizontal: 15 },
  pb16: { paddingBottom: 16 },
  mH20: { marginHorizontal: 20 },
  mB10: { marginBottom: 10 },
  pB30: { paddingBottom: 30 },
  pH10: { paddingHorizontal: 10 },
  pB10: { paddingBottom: 10 },
  mL5: { marginLeft: 5 },
  mr5: { marginRight: 5 },
  mr20: { marginRight: 20 },
  pH1: { paddingHorizontal: 1 },
  pH6: { paddingHorizontal: 6 },
  pV6: { paddingVertical: 6 },
  mR8: { marginRight: 8 },
  pT4: { paddingTop: 4 },
  pB6: { paddingBottom: 6 },

  // Login section under home banner
  loginSection: {
    illustration: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
      marginEnd: 12,
    },
    loginRegisterText: {
      color: Color.primary.light.primary90,
      size: Size.text.body2.size,
      line: 23.8,
      letterSpacing: 0.5,
      textDecorationLine: 'underline',
    },
    text: {
      color: Color.mediumGray.light.mediumGray,
      size: Size.text.body2.size,
      line: 23 / 0.8,
      letterSpacing: 0.5,
    },
    container: {
      backgroundColor: Color.whiteBackground.dark.whiteBackground,
      paddingHorizontal: 10,
      paddingVertical: 10,
      flexDirection: 'row',
    },
    innerContainer: {
      paddingVertical: 5,
      flex: 1,
      justifyContent: 'center',
    },
  },
  textCenter: { textAlign: 'center' },

  renderArticle: {
    cardContainer: {
      height: 225,
      aspectRatio: 0.7,
      marginRight: 8,
      borderRadius: 16,
    },
    imgBanner: {
      height: 107,
      aspectRatio: 1.6,
    },
    titleCategory: {
      position: 'absolute',
      top: 6,
      left: 5.5,
      backgroundColor: Color.pink.light.pink10,
      padding: 8,
      borderRadius: 12,
      overflow: 'hidden',
    },
    titleDate: { position: 'absolute', bottom: 15, left: 6 },
    dotContainer: {
      flexDirection: 'row',
      paddingLeft: 5,
      justifyContent: 'center',
      alignItems: 'center',
      // marginTop: 5,
    },
    dotActive: {
      width: 19,
      height: Platform.OS === 'android' ? 5 : 8,
      backgroundColor: Color.eventDotActive.light.color,
      borderRadius: 16,
      marginTop: Platform.OS === 'android' ? 2 : 0,
    },

    dotInActive: {
      color: Color.eventDotInActive.light.color,
    },
    container: {
      flexDirection: 'row',
      paddingTop: 12,
      flexWrap: 'wrap',
    },
    badge: {
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: Color.badgeMagenta.light.badgeMagenta,
      marginHorizontal: 4,
      marginBottom: 4,
      overflow: 'hidden',
    },
  },
};
