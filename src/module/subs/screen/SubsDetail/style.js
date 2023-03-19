import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  container: {
    paddingVertical: 16,
    minHeight: Size.screen.height - 56,
  },
  rightHeaderContent: {
    container: {
      paddingRight: 16,
      position: 'relative',
    },
    box: {
      position: 'absolute',
      right: 10,
      top: 30,
    },
    batalkan: {
      minWidth: 200,
      paddingHorizontal: 16,
      paddingVertical: 10,
      backgroundColor: Color.whiteCard.light.color,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: -12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,
      elevation: 10,
    },
    more: {
      width: 20,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  },
  product: {
    langgananAktif: {
      borderWidth: 1,
      borderColor: Color.greenActive.light.color,
      borderRadius: 30,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
      marginBottom: 16,
    },
    langgananInActive: {
      borderWidth: 1,
      borderColor: Color.neutralLifeSaver.light.neutral40,
      borderRadius: 30,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
      marginBottom: 16,
    },
    langgananTerminate: {
      borderWidth: 1.2,
      borderColor: Color.neutralLifeSaver.light.neutral40,
      borderRadius: 30,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
      marginBottom: 16,
    },
    langgananGracePeriod: {
      borderWidth: 1.2,
      borderColor: Color.secondary.light.secondary80,
      borderRadius: 30,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
      marginBottom: 16,
    },
    product: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    detailPolis: { flexDirection: 'row', alignItems: 'center' },
    durasi: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 5,
    },
    infoMasaTenggang: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
  },
  billing: {
    warning: {
      flexDirection: 'row',
      backgroundColor: Color.yellowWarning.light.color,
      padding: 16,
      borderRadius: 16,
      marginVertical: 16,
      paddingRight: 30,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 16,
      marginBottom: 10,
    },
    list: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      // margin: 16,
    },
    rightListContent: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: -16,
    },
    listSection: {
      marginHorizontal: 16,
      marginBottom: 18,
      paddingTop: 16,
      borderTopColor: Color.neutralLifeSaver.light.neutral40,
      borderTopWidth: 1,
    },
    listContainer: {
      flexDirection: 'row',
      marginBottom: 18,
    },
    dotContainer: {
      width: 15,
      alignItems: 'center',
    },
    divider: {
      marginHorizontal: 16,
      marginBottom: 18,
      paddingTop: 16,
      borderTopColor: Color.neutralLifeSaver.light.neutral20,
      borderTopWidth: 1,
    },
  },
  payment: {
    header: {
      marginTop: 16,
      marginBottom: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    content: {
      margin: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    custCare: {
      backgroundColor: Color.grayLine.light.color,
      paddingVertical: 10,
      paddingHorizontal: 16,
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: 12,
      width: Size.screen.width - 32,
    },
    paymentBox: {
      margin: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    paymentIcon: {
      width: 25,
      height: 25,
    },
  },
  paymentList: {
    listContainer: {
      padding: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    listHeaderContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    listCardDesc: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
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
  success: {
    container: {
      top: 100,
      left: 0,
      position: 'absolute',
      width: Size.screen.width,
      height: Size.screen.height,
      flexDirection: 'column',
      justifyContent: 'center',
      zIndex: 2,
    },
    close: {
      position: 'absolute',
      top: 10,
      left: 10,
      zIndex: 3,
    },
  },
  ml8: {
    marginLeft: 8,
  },
  mb5: {
    marginBottom: 5,
  },
  m16: {
    margin: 16,
  },
  mr10: {
    marginRight: 10,
  },
  mt3: {
    marginTop: 3,
  },
  mt10: {
    marginTop: 10,
  },
  mt16: {
    marginTop: 16,
  },
  ml16: {
    marginLeft: 16,
  },
  my6: {
    marginVertical: 6,
  },
  my16: {
    marginVertical: 16,
  },
  mt24: {
    marginTop: 24,
  },
  ml10: {
    marginLeft: 10,
  },
  ml5: {
    marginLeft: 5,
  },
  z10: {
    zIndex: 10,
  },
  pb80: {
    paddingBottom: 80,
  },
  pb10: {
    paddingBottom: 10,
  },
  p5: {
    padding: 5,
  },
  fx1: {
    flex: 1,
  },
  flipTrue: {
    marginLeft: 5,
    transform: [{ rotate: '180deg' }],
  },
  flipFalse: {
    marginLeft: 5,
    transform: [{ rotate: '0deg' }],
  },
};
