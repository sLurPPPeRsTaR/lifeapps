import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
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
  header: {
    container1: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 120,
      // paddingHorizontal: 16,
    },
    container2: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 10,
      paddingHorizontal: 16,
      marginBottom: 5,
    },
    containerSearch: { flex: 1 },
    textContainerActive: {
      borderRadius: 16,
      backgroundColor: Color.redTitleBgNotif.light.color,
      padding: 10,
      paddingHorizontal: 15,
      marginHorizontal: 5,
      borderWidth: 1,
      borderColor: Color.primary.light.primary20,
    },
    textContainerInactive: {
      borderRadius: 16,
      padding: 10,
      paddingHorizontal: 15,
      marginHorizontal: 5,
      borderWidth: 1,
      borderColor: Color.primary.light.primary20,
    },
  },
  Main: {
    padder: {
      marginVertical: 10,
      paddingHorizontal: 30,
    },
    container: {
      borderTopColor: Color.grayShadow.light.color,
      borderTopWidth: 2.5,
      borderBottomColor: Color.grayShadow.light.color,
      borderBottomWidth: 2.5,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Color.whiteLifesaverBg.light.color,
      marginTop: 12,
      justifyContent: 'space-between',
      height: 'auto',
      paddingHorizontal: 16,
      paddingVertical: 15,
    },
    image: {
      marginRight: 20,
      width: 65,
      height: 65,
    },
    textContainer: {
      marginTop: 15,
      // marginHorizontal: 20,
    },
  },
  listRs: {
    container: {
      focus: {
        maxHeight: Size.screen.height - 770,
      },
      noFocus: {
        maxHeight: Size.screen.height - 490,
        height: Size.screen.height - 490,
      },
    },
    sortContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    renderItem: {
      container: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        flexDirection: 'row',
      },
      containerText: {
        flexShrink: 1,
        paddingHorizontal: 10,
        width: '100%',
        // paddingRight: 20,
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
        paddingVertical: 10,
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
      paddingHorizontal: 30,
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
  pb230: {
    paddingBottom: 230,
  },
  mv10: {
    marginVertical: 10,
  },
  m10: {
    margin: 10,
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
  mt65: {
    marginTop: 65,
  },
  mt4: {
    marginTop: 4,
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
  center: {
    alignItems: 'center',
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
};
