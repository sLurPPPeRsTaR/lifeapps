import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  scrollViewContainer: {
    flex: 1,
  },
  header: {
    backgroundColor: Color.landingPage.light.red,
  },
  container: {
    flex: 1,
    backgroundColor: Color.landingPage.light.white,
  },
  innerContainer: {
    flex: 1,
    marginBottom: 50,
  },
  text: {
    hashtag: {
      textAlign: 'center',
    },
  },

  detailButton: {
    shadow: {
      // alignSelf: 'flex-start',
      marginVertical: 25,
    },
    container: {
      borderRadius: 30,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignSelf: 'flex-start',
    },

    iconContainer: {
      marginLeft: 18,
    },
  },

  infoButton: {
    container: {
      width: 22,
      height: 22,
      marginLeft: 1,
    },
  },

  scrollContents: {
    header: {
      container: {
        flex: 1,
        flexDirection: 'row',
      },
      image: {
        flex: 1,
        width: null,
        height: null,
        aspectRatio: 1080 / 482,
      },
    },
    scrollOneText: {
      marginTop: 65,
      marginBottom: 65,
      marginHorizontal: 30,
    },
    scrollOneBg2: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    scrollOneBg1: {
      width: '100%',
      height: undefined,
      aspectRatio: 750 / 564,
    },
    scrollOneImage: {
      width: '60%',
      height: undefined,
      aspectRatio: 448 / 152,
      alignSelf: 'center',
    },
    scrollTwoImage: {
      width: '100%',
      height: undefined,
      aspectRatio: 748 / 545,
    },
    carouselContainer: { justifyContent: 'space-between' },
    mainImage: {
      flex: 1,
      width: undefined,
      height: undefined,
      // aspectRatio: 1,
      // aspectRatio: 750 / 1100,
      // alignSelf: 'center',
    },
    SecondImage: {
      width: '100%',
      height: undefined,
      aspectRatio: 1080 / 1027,
      alignSelf: 'center',
      // marginTop: -250,
    },
    badgeContainer: {
      margin: 20,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    badge: {
      height: 31,
      width: 95,
      borderRadius: 12,
      backgroundColor: Color.landingPage.light.darkGray,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
    },
    itemOneTextSub: {
      marginHorizontal: 50,
    },
    itemOneTextContainer: {
      flexDirection: 'row',
    },
    badgeIcon: {
      marginRight: 5,
    },
    itemTwoTextContainer: {
      marginTop: 30,
      marginRight: 45,
      flexShrink: 1,
    },

    itemThreeItemContainer: {
      flexDirection: 'row',
      marginTop: 40,
      marginRight: 45,
    },
    itemThreeTextContainer: {
      flexShrink: 1,
    },
    itemThreeIcon: {
      marginHorizontal: 20,
    },
    itemThreeImage: {
      marginTop: -60,
      width: '100%',
      height: undefined,
      aspectRatio: 559 / 462,
      alignSelf: 'center',
    },
    itemFourImage: {
      width: '100%',
      height: undefined,
      aspectRatio: 742 / 610,
      alignSelf: 'center',
      marginBottom: 30,
      marginTop: -50,
    },

    itemFourItemContainer: {
      flexDirection: 'row',
      marginTop: 40,
      marginRight: 45,
    },
    itemFourIcon: {
      marginHorizontal: 20,
    },
    itemFourTextContainer: {
      flexShrink: 1,
    },
  },

  FAB: {
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
      width: 200,
      height: 50,
      position: 'absolute',
      bottom: 25,
      backgroundColor: Color.main.light.white,
      borderRadius: 23,
      shadowColor: Color.red.light.red90,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,

      elevation: 7,
    },
    btnItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 23,
    },
    icon: {
      bottom: 75,
      height: 100,
      width: 100,
      position: 'absolute',
    },
  },

  slider: {
    card: {
      container: {
        justifyContent: 'center',
      },
      youtubeBorder: {
        overflow: 'hidden',
        flex: 1,
        borderRadius: 12,
      },
      containerTab: {
        flexWrap: 'wrap',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      image: {
        borderRadius: 16,
        width: Size.screen.width - 48,
        height: (Size.screen.width - 48) / 1.78,
      },
      imageTab: {
        borderRadius: 16,
        width: Size.screen.width / 2,
        height: Size.screen.width / 2 / 1.91,
      },
      marginCard: {
        card: {
          marginStart: 16,
        },
        lastCard: {
          marginHorizontal: 16,
        },
      },
    },
    title: {
      position: 'absolute',
      top: 20,
      left: 20,
    },
    subtitle: {
      position: 'absolute',
      bottom: 20,
      left: 20,
    },
  },

  promoIcon: {
    container: {
      backgroundColor: Color.red.light.red90,
      padding: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      width: 50,
      marginBottom: 1,
    },
  },

  table: {
    container: { flexDirection: 'row', marginVertical: 16 },
    productContainer: {
      position: 'absolute',
      right: 10,
      bottom: '50%',
      zIndex: 30,
    },
    chevronRightContainer: {
      width: 32,
      height: 32,
      backgroundColor: Color.yellowWarning.light.color3,
      borderRadius: 16,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    flatList: { flex: 1, paddingBottom: 24 },
    selectedHeader: [
      Color.tableHeader.light.activeB3,
      Color.tableHeader.light.activeB3,
    ],
    selectedHeaderActive: [
      Color.tableHeader.light.activeA1,
      Color.tableHeader.light.activeA2,
    ],
    imageShield: { width: 17, height: 18.5 },
    selectedContainer: {
      width: 100,
      marginTop: 30,
      borderWidth: 2,
      borderColor: Color.primary.light.primary80,
      borderTopLeftRadius: 19,
      borderTopRightRadius: 19,
      borderBottomLeftRadius: 19,
      borderBottomRightRadius: 19,
    },
    benefitContainer: {
      width: 150,
      position: 'absolute',
      zIndex: 20,
    },
    benefitItem: {
      height: 100,
      justifyContent: 'center',
      paddingLeft: 15,
      padding: 4,
      borderRightColor: Color.neutral.light.neutral20,
      borderRightWidth: 1,
      backgroundColor: Color.whiteBackground.light.whiteBackground,
    },
    benefitHeader: {
      height: 100,
      justifyContent: 'center',
      paddingLeft: 15,
      padding: 4,
      backgroundColor: Color.whiteBackground.light.whiteBackground,
    },
    regItemHeader: {
      padding: 4,
      height: 73,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomColor: Color.neutral.light.neutral20,
      borderBottomWidth: 1,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    horizontalLine: {
      width: Size.screen.width,
      marginLeft: 150,
      marginTop: -1,
    },
    regItemFooter: {
      padding: 4,
      minHeight: 70,
      marginTop: -5,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
    },
    regItem: {
      padding: 4,
      minHeight: 100,
      alignItems: 'center',
      justifyContent: 'center',
      borderRightColor: Color.neutral.light.neutral20,
      borderRightWidth: 1,
    },
  },

  // NEVERGAMEOVER!
  neverGameOverContainer: {
    marginVertical: 30,
  },
  renderSliderContainer: {
    marginVertical: 20,
  },
  riplayContainer: {
    marginBottom: 40,
    marginTop: 20,
    marginHorizontal: 50,
  },
  riplayBtnContainer: {
    marginTop: 25,
  },
  activityText: {
    marginLeft: 30,
  },
  activitySlider: {
    flatlist: {
      marginVertical: 20,
    },
    contentContainer: {
      paddingHorizontal: 30,
      paddingVertical: 10,
    },
  },
  activityItemContainer: {
    overflow: 'hidden',
    marginRight: 12,
    width: 175,
    height: 220,
    borderRadius: 15,
    backgroundColor: Color.main.light.white,
    shadowColor: Color.main.light.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  activityItemImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  activityItemTextContainer: {
    backgroundColor: Color.main.light.white,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bullet: {
    container: {
      margin: 16,
      flexDirection: 'row',
    },
    active: {
      width: 60,
      height: 8,
      backgroundColor: Color.primary.light.primary90,
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

  // PRICES TABLE
  pricesTable: {
    tableContainer: {
      marginVertical: 20,
      marginHorizontal: 10,
    },

    rowContainer: {
      flex: 1,
      minHeight: 45,
      alignSelf: 'stretch',
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: Color.lightGray.light.lightGray,
    },
    firstItem: {
      flex: 1,
      alignSelf: 'stretch',
      justifyContent: 'center',
      marginLeft: 15,
      marginRight: 1,
    },
    secondItem: {
      flex: 1,
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Color.main.light.white,
    },
    firstItemTextLight: {
      marginLeft: 10,
    },

    headerSecondItem: {
      flex: 1,
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },

    footerSecondItem: {
      flex: 1,
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
  },

  // TermsFAQ
  termsFAQ: {
    listItemImage1: {
      width: 45,
      height: 45,
    },
    listItemImage2: {
      width: 50,
      height: 50,
    },
    listItemImage3: {
      width: 60,
      height: 60,
    },
    listItemImage4: {
      width: 30,
      height: 30,
    },
    exludeImage: {
      width: '40%',
      height: undefined,
      aspectRatio: 1,
    },
    container: { margin: 20, marginBottom: 80 },
    icon: {
      marginBottom: 15,
    },
    helpContainer: {
      backgroundColor: Color.landingPage.light.lightGray,
      paddingVertical: 8,
      borderRadius: 10,
      marginVertical: 17,
    },
    pengecualianContainer: {
      marginBottom: 30,
      marginHorizontal: 30,
    },
    pengecualianItemContainer: {
      alignItems: 'center',
      top: 26,
      marginBottom: 16,
    },
    pengecualianSelengkapnyaContainer: {
      alignItems: 'center',
      top: 26,
      marginTop: 15,
      marginBottom: 25,
    },

    termsBtn: {
      height: 45,
      borderRadius: 12,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: Color.main.light.white,
      marginVertical: 6,
      paddingHorizontal: 12,
      flexDirection: 'row',
      shadowColor: Color.mediumDarkGray.light.mediumDarkGray,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    helpText: {
      marginBottom: 4,
    },
  },

  // MODAL
  modal: {
    height: {
      maxHeight: Size.screen.height - 160,
    },
    dialogHeader: {
      container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 5,
      },
      closeBtnContainer: {
        height: 30,
        width: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.lightGray.light.lightGray,
      },
    },
    dialogCheckReferal: {
      iconContainer: { alignItems: 'center' },
      icon: {
        position: 'absolute',
        top: -175,
        width: 250,
        height: 250,
      },
      title: { marginBottom: 10 },
      subtitle: { marginBottom: 24 },
      button1: { marginBottom: 16 },
    },
    dialogMedicalProtection: {
      container: {
        backgroundColor: 'white',
        borderRadius: 30,
        paddingLeft: 20,
        padding: 20,
        marginBottom: 10,
      },
    },
    dialogSuccessWaiting: {
      iconContainer: { alignItems: 'center' },
      icon: {
        position: 'absolute',
        top: -175,
        width: 250,
        height: 250,
      },
      title: { marginBottom: 10 },
      subtitle: { marginBottom: 24 },
      button1: { marginBottom: 16 },
    },
    dialogBelumLogin: {
      iconContainer: { alignItems: 'center' },
      icon: {
        position: 'absolute',
        top: -270,
        width: 320,
        height: 320,
      },
      title: { marginBottom: 10 },
      subtitle: { marginBottom: 24 },
      button1: { marginBottom: 16 },
      button2: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      },
      button2textDaftar: {
        textDecorationLine: 'underline',
      },
    },
    eKYC: {
      iconContainer: { alignItems: 'center', top: 60 },
      icon: {
        position: 'absolute',
        top: -260,
        width: 300,
        height: 300,
      },
      title: {},
      subtitle: { marginBottom: 24, marginTop: 10 },
      button1: { marginBottom: 16 },
    },
    protectedActivity: {
      shadow: {
        height: 62,
        marginTop: 10,
      },
      listItemContainer: {
        height: 65,
        backgroundColor: 'white',
        borderRadius: 16,
        alignItems: 'center',
        padding: 15,
        flexDirection: 'row',
      },
      listItemImage1: {
        width: 60,
        height: 60,
      },
      listItemImage2: {
        width: 50,
        height: 30,
      },
      listItemImage3: {
        width: 45,
        height: 45,
      },
      listItemImage4: {
        width: 40,
        height: 40,
      },
      listItemTextContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      },
      listItemChevronContainer: {
        width: 65,
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },

      exampleContainer: {
        marginTop: 10,
        marginHorizontal: 8,
      },
    },
    dialogListRs: {
      container: {
        focus: {
          maxHeight: Size.screen.height / 2.2,
        },
        noFocus: {
          maxHeight: Size.screen.height - 160,
          height: Size.screen.height - 160,
        },
      },
      sortContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      renderItem: {
        container: {
          paddingHorizontal: 16,
          paddingTop: 10,
          marginBottom: 10,
        },
      },
      renderMap: {
        loadingContainer: {
          height: Size.screen.height - 160,
          flexDirection: 'row',
          justifyContent: 'center',
        },
        container: {
          backgroundColor: Color.whiteLifesaverBg.light.color,
          height: Size.screen.height - 160,
          paddingVertical: 5,
          marginHorizontal: -16,
          paddingBottom: 60,
          zIndex: -10,
        },
        noDataContainer: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: Size.screen.height - 350,
        },
      },
      padder: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 6,
      },
    },
    dialogWaterSport: {
      renderItem: {
        container: {
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          marginVertical: 5,
        },
      },
    },
    dialogDetail: {
      container: {
        flexDirection: 'row',
        height: 40,
      },
      tabContainerOn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Color.primary.light.primary90,
      },
      tabContainerOff: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Color.neutral.light.neutral20,
      },
      promo: {
        backgroundColor: Color.red.light.red90,
        padding: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        width: 50,
        marginBottom: 1,
        marginLeft: 5,
      },
    },
  },
  specials: {
    container: {
      marginRight: 10,
      width: 125,
      height: 30,
      backgroundColor: 'red',
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    image: {
      width: '62%',
      height: undefined,
      aspectRatio: 246 / 42,
      // alignSelf: 'center',
    },
  },
  subscribeBtnContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subscribeBtn: {
    // width: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',
    width: Size.screen.width - 40,
    maxWidth: 700,
  },
  warningBox: {
    container: {
      flexDirection: 'row',
      backgroundColor: Color.yellowWarning.light.color,
      borderRadius: 10,
      padding: 10,
      marginVertical: 10,
      alignItems: 'center',
    },
    text: {
      maxWidth: '85%',
    },
    textRiplay: {
      textDecorationLine: 'underline',
    },
  },
  closeIcon: {
    top: 10,
    borderRadius: 15,
    backgroundColor: Color.lightGray.light.lightGray,
    width: 27,
    height: 27,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalClaim: {
    container: {
      backgroundColor: Color.sugarGlaze.light.color,
      minHeight: 170,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardContainer: {
      flexDirection: 'row',
      marginTop: 18,
    },
    cardItemLeft: {
      flex: 1,
      backgroundColor: 'white',
      marginLeft: 20,
      marginRight: 8,
      height: 72,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardImageLeft: {
      marginBottom: 10,
      width: '50%',
      height: undefined,
      aspectRatio: 95 / 17,
    },
    cardItemRight: {
      flex: 1,
      backgroundColor: 'white',
      marginLeft: 8,
      marginRight: 20,
      height: 72,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardImageRight: {
      marginBottom: 10,
      width: '55%',
      height: undefined,
      aspectRatio: 100 / 17,
    },
  },
  ml25: {
    marginLeft: 25,
  },
  ml35: {
    marginLeft: 35,
  },
  mb7: {
    marginBottom: 7,
  },
  fx1: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
  },
  divider: {
    borderBottomWidth: 0.6,
    borderBottomColor: Color.neutral.light.neutral20,
  },
  mhMin16: {
    marginHorizontal: -16,
  },
  w25: {
    width: 25,
  },
  pb30: {
    paddingBottom: 30,
  },
  mv10: {
    marginVertical: 10,
  },
  m10: {
    margin: 10,
  },
  ph5: {
    paddingHorizontal: 15,
  },
  p16: {
    padding: 16,
  },
  pr8: {
    paddingRight: 8,
  },
  pr10: {
    paddingRight: 12,
  },
  mv30: {
    marginVertical: 30,
  },
  mt30: {
    marginTop: 30,
  },
  mt65: {
    marginTop: 65,
  },
  mt4: {
    marginTop: 4,
  },
  mt5: {
    marginTop: 5,
  },
  mb10: {
    marginBottom: 10,
  },
  mb16: {
    marginBottom: 16,
  },
  mb30: {
    marginBottom: 30,
  },
  mb60: {
    marginBottom: 60,
  },
  mr5: {
    marginRight: 5,
  },
  mr10: {
    marginRight: 10,
  },
  m18: {
    margin: 18,
  },
  m30: {
    margin: 30,
  },
  w30: {
    width: 30,
  },
  w60: {
    width: 60,
  },
  w100: {
    width: 100,
  },
  w150: {
    width: 150,
  },
  h108: {
    height: 108,
  },
  center: {
    alignItems: 'center',
  },
  allCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipTrue: {
    transform: [{ rotate: '180deg' }],
  },
  flipFalse: {
    transform: [{ rotate: '0deg' }],
  },
  textBoldItalic: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  textUnderline: {
    textDecorationLine: 'underline',
  },
  textItalic: {
    fontStyle: 'italic',
  },
};
