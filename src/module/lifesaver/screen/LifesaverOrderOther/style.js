import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  main: {
    header: {
      backgroundColor: Color.red.light.D71920,
      color: 'white',
    },
    bgRed: {
      backgroundColor: Color.red.light.D71920,
      height: 50,
    },
  },
  infoProduct: {
    linearLabel: {
      paddingHorizontal: 16,
      paddingVertical: 22,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    durasi: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    jatuhTempo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    image: {
      width: 130,
      aspectRatio: 1855 / 293,
    },
  },
  discount: {
    colum: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
  },
  attentionUpgrade: {
    container: {
      backgroundColor: Color.yellowWarning.light.color,
      flexDirection: 'row',
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginBottom: 16,
      borderRadius: 16,
    },
  },
  infoTunggu: {
    container: {
      marginTop: 16,
      maxWidth: Size.screen.width - 50,
    },
    proteksiMedis: {
      flexDirection: 'row',
    },
    proteksiCidera: {
      flexDirection: 'row',
      marginBottom: 16,
    },
  },
  personalData: {
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
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
    breakLine: {
      marginVertical: 16,
      marginHorizontal: -32,
    },
    actionBtnContainer: {
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
  },
  total: {
    container: {
      bottom: 0,
      width: Size.screen.width,
      paddingVertical: 16,
      backgroundColor: Color.whiteCard.light.color,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: -3,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 24,
    },
    labelContainer: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    labelPrice: {
      marginTop: -10,
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
  },
  paymentList: {
    listContainer: {
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    listCardDesc: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    cardIcon: {
      width: 30,
      height: 30,
    },
    addCardContainer: {
      height: 200,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    addCardButton: {
      width: Size.screen.width - 32,
      marginTop: 20,
    },
    textLabelContainer: { flexDirection: 'row', alignItems: 'center' },
    textLabel: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: Color.redNotif.light.color,
      marginLeft: 16,
      borderRadius: 16,
    },
  },
  addCard: {
    expAndCVV: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
    },
    expWidth: { width: (Size.screen.width - 64) / 2 },
  },
  paymentMethod: {
    header: {
      flexDirection: 'row',
      marginHorizontal: -16,
      alignItems: 'space-between',
    },
    header2: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    tabWidth: { width: Size.screen.width / 2 },
    tabLabel: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 5,
    },
    radioContainer: {
      width: 24,
      height: 24,
      borderColor: Color.red.light.D71920,
      borderWidth: 1,
      borderRadius: 26,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
    },
    radioFill: {
      width: 16,
      height: 16,
      borderRadius: 26,
      backgroundColor: Color.red.light.D71920,
    },
    radioContainerFalse: {
      width: 24,
      height: 24,
      borderColor: Color.neutral.light.neutral60,
      borderWidth: 1,
      borderRadius: 26,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
    },
  },
  totalPayment: {
    total: { flexDirection: 'row', justifyContent: 'space-between' },
    product: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    listContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
  },
  invitation: {
    cardListContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cardListBlock: {
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      maxWidth: (Size.screen.width - 48) / 2,
    },
    section: {
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      maxWidth: (Size.screen.width - 48) / 2,
    },
    image: { borderRadius: 24, width: 42, height: 42 },
  },
  modalErrSubs: {
    imageContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      top: 10,
      marginTop: -180,
    },
    image: { width: 195, height: 210 },
  },

  renderLifetagContent: {
    itemHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: -6,
    },
    itemLabel: {
      backgroundColor: Color.grayBackground.light.color,
      borderRadius: 10,
      marginHorizontal: 10,
    },
    itemQtyContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 6,
    },
    itemQtyButtonContainer: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: Color.neutral.light.neutral20,
      borderRadius: 4,
    },
    itemMinButton: {
      width: 20,
      height: 20,
      backgroundColor: Color.grayBackground.light.color,
      borderRightWidth: 1,
      borderRightColor: Color.neutral.light.neutral20,
    },
    itemQtyLabel: {
      width: 30,
      height: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemPlusButton: {
      width: 20,
      height: 20,
      backgroundColor: Color.grayBackground.light.color,
      borderLeftWidth: 1,
      borderLeftColor: Color.neutral.light.neutral20,
    },
    linearLabel: {
      paddingHorizontal: 16,
      paddingVertical: 22,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    imgProduct: {
      height: 61,
      width: 57,
      borderRadius: 5,
      marginRight: 11,
    },
    productName: { flexDirection: 'row', alignItems: 'center' },
    productColor: { width: 8, height: 8, borderRadius: 100, marginLeft: 4 },
    lineStrikeThroughPrice: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 4,
    },
    productPrice: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    checkBox: {
      container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: 16,
      },
      checkBox: {
        width: 22,
        height: 22,
        marginEnd: 10,
        marginTop: Size.isAndroid ? 3 : 5,
      },
    },
    colorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    flatlistContainer: {
      flex: 1,
      marginTop: 12,
      marginBottom: 32,
    },
    lifetagColorContainer: {
      paddingRight: 16,
      paddingTop: 12,
      alignSelf: 'flex-start',
    },
    touchableContainer: {
      borderRadius: 100,
      marginRight: 16,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 2,
    },
    circleContainer: { width: 48, height: 48, borderRadius: 100 },
  },

  renderLifetagAddress: {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 16,
    },
    pinLoc: { flexDirection: 'row', alignItems: 'center' },
    phoneNumber: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 8,
    },
    address: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    addAddressContainer: {
      paddingVertical: 24,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  receipentCard: {
    shadow: {
      padding: 16,
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    edit: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  },
  recipientLimit: {
    container: {
      padding: 16,
      borderRadius: 16,
      backgroundColor: Color.sugarGlaze.dark.color,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
  },

  recipientSection: {
    titleContainer: {
      marginBottom: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    rowContainer: {
      marginBottom: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
  },

  delBtn: {
    borderColor: Color.primary.light.primary90,
    borderWidth: 1,
  },
  mt32: {
    marginTop: 32,
  },
  mt10: {
    marginTop: 10,
  },
  p16: {
    padding: 16,
  },
  pl8: {
    paddingLeft: 8,
  },
  mx10: {
    marginHorizontal: 10,
  },
  mxMin32: {
    marginHorizontal: -32,
  },
  mb10: {
    marginBottom: 10,
  },
  ml10: {
    marginLeft: 10,
  },
  ml16: {
    marginLeft: 16,
  },
  my16: {
    marginVertical: 16,
  },
  px16: {
    paddingHorizontal: 16,
  },
  mtMin40: {
    marginTop: -40,
  },
  mbMin4: {
    marginBottom: -3,
  },
  m10: {
    margin: 10,
  },
  my10: {
    marginVertical: 10,
  },
  mt16: {
    marginTop: 16,
  },
  mw330: {
    maxWidth: 330,
  },
  mb16: {
    marginBottom: 16,
  },
  b0: {
    bottom: 0,
  },
  mr5: {
    marginRight: 5,
  },
  mr10: {
    marginRight: 10,
  },
  mr16: {
    marginRight: 16,
  },
  mbMin40: {
    marginBottom: -40,
  },
  mV5: { marginVertical: 5 },
  mB32: { marginBottom: 32 },
  fS1: { flexShrink: 1 },
  mR7: { marginRight: 7 },
  row: { flexDirection: 'row' },
  mt5: {
    marginTop: 5,
  },
};
