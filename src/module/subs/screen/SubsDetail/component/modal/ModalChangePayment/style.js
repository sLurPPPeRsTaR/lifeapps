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
    tabWidth: {
      width: Size.screen.width / 2,
      // borderColor: '#000',
      // borderWidth: 1,
    },
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
  modalErrSubs: {
    imageContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      top: 10,
      marginTop: -180,
    },
    image: { width: 195, height: 210 },
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
  mx10: {
    marginHorizontal: 10,
  },
  mxMin32: {
    marginHorizontal: -32,
  },
  mb4: {
    marginBottom: 4,
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
  mr10: {
    marginRight: 10,
  },
  fx1: {
    flex: 1,
  },
  maxH: { maxHeight: 200 },
};
