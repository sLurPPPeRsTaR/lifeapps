import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  scrollViewContainer: {
    flex: 1,
  },
  head: {
    container: {
      height: 230,
      width: '100%',
      alignItems: 'center',
    },
    textContainer: {
      margin: 30,
      maxWidth: 400,
    },
    loyalityPointContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 30,
    },
    loyalityPointText: {
      marginHorizontal: 5,
    },
    image: {
      width: 124,
      height: 121,
      aspectRatio: 4 / 2,
    },
  },

  headStyle: {
    container: {
      height: 100,
      backgroundColor: Color.main.light.white,
      marginTop: -100,
      marginHorizontal: 16,
      borderRadius: 16,
      flexDirection: 'row',
      padding: 15,
      shadowColor: Color.main.light.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    itemContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    divider: {
      borderLeftWidth: 0.5,
      borderColor: Color.grayBorder.light.grayBorder,
    },
  },

  shareButton: {
    container: {
      backgroundColor: Color.main.light.white,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    button: {
      flexGrow: 1,
      margin: 20,
      height: 45,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 16,
      width: Size.screen.width - 30,
      maxWidth: 400,
      flexDirection: 'row',
    },
    btnImage: {
      width: 17,
      marginHorizontal: 10,
      aspectRatio: 17 / 17,
    },
  },

  referalSteps: {
    container: {
      height: 325,
      // margin: 16,
      // marginTop: 16,
      borderRadius: 30,
      overflow: 'hidden',
      padding: 25,
      alignItems: 'center',
      justifyContent: 'center',
    },

    titleContiner: {
      // marginBottom: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    image: {
      width: 60,
      height: 60,
    },

    arrowIcon: {
      marginHorizontal: 15,
      marginTop: -35,
      width: '15%',
      height: undefined,
      aspectRatio: 1 / 1.04,
    },
    saveIcon: {
      marginRight: 10,
    },
    listItemText: {
      flexWrap: 'wrap',
      flexShrink: 1,
    },
    listItemContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    emptyPlaceholder: {
      width: 55,
    },
  },

  bottomSheetShare: {
    title: {
      // marginTop: 10,
      // marginBottom: 20,
      // marginLeft: 35,
    },
    mainContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemContainer: { flexDirection: 'row', maxWidth: 600 },
    item: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    itemTitle: {
      marginTop: 8,
    },
  },
  sectionInvitation: {
    container: {
      marginHorizontal: 16,
      marginBottom: 24,
      marginTop: 10,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    invite: {
      marginVertical: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  listInvitation: {
    container: {
      flex: 1,
      marginVertical: 7,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    listUser: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    userImage: {
      width: 42,
      height: 42,
      borderRadius: 37,
      marginRight: 16,
    },
    userStatus: {
      marginLeft: 2,
      padding: 10,
      height: 40,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    resendBtn: {
      borderLeftWidth: 1,
      borderLeftColor: Color.neutral.light.neutral20,
      marginHorizontal: 8,
    },
    rowList: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 16,
    },
    rowReference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 5,
    },
    columnList: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    expandText: {
      marginTop: 16,
      textAlign: 'right',
    },
    content: {
      paddingVertical: 5,
      paddingHorizontal: 16,
    },
  },
  noInvite: {
    image: {
      width: 220,
      height: 220,
    },
  },
  mt20: { marginTop: 20 },
  mt16: {
    marginTop: 16,
  },
  p16: {
    padding: 16,
  },
  m16: {
    margin: 16,
  },
  w85: {
    width: 85,
  },
  wh75: {
    width: 75,
    height: 75,
  },
  fxRow: {
    flexDirection: 'row',
  },
  fxCol: {
    flexDirection: 'column',
  },
  flipTrue: {
    transform: [{ rotate: '180deg' }],
  },
  flipFalse: {
    transform: [{ rotate: '0deg' }],
  },
  center: { alignItems: 'center', justifyContent: 'center' },
  shrink: {
    flexShrink: 1,
  },
  listTrack: {
    image: {
      marginRight: 10,
      width: 23,
      height: 23,
    },
    title: {
      marginVertical: 5,
    },
    divider: {
      width: '100%',
      height: 1,
      backgroundColor: Color.neutral.light.neutral20,
      marginVertical: 5,
    },
    rowList: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
      alignItems: 'center',
    },
    columnList: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  },
  headerTab: {
    container: {
      height: 75,
      backgroundColor: Color.main.light.white,
      marginTop: -75,
      marginHorizontal: 16,
      borderRadius: 16,
      flexDirection: 'row',
      padding: 18,
      shadowColor: Color.main.light.black,
      elevation: 5,
      shadowOffset: {
        width: 0,
        height: 1,
      },
    },
    menuTitleActive: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Color.redTitleBgNotif.light.color,
      borderWidth: 1,
      borderColor: Color.redNotif.light.color,
      textAlign: 'center',
      borderRadius: 16,
      paddingVertical: 7,
    },
    menuTitle: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 7,
      borderRadius: 16,
      textAlign: 'center',
      width: '100%',
    },
  },
  divider: {
    width: '100%',
    height: 5,
    backgroundColor: Color.neutral.light.neutral20,
    marginVertical: 5,
  },
  informationLimit: {
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: Color.yellowWarning.light.color,
    },
    content: {
      flex: 1,
      flexDirection: 'row',
      padding: 5,
      paddingHorizontal: 10,
      backgroundColor: Color.yellowWarning.light.color,
      alignItems: 'center',
    },
  },
  ml5: {
    marginLeft: 5,
  },
  lifeSaverPOS: {
    width: 102,
    height: 16,
  },
  lifeSaverLogo: {
    width: 96,
    height: 17,
  },
  lifeSaverLogoPlus: {
    width: 100,
    height: 16,
  },
};
