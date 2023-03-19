import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  container: {
    focus: {
      maxHeight: Size.screen.height / 2.2,
    },
    noFocus: {
      maxHeight: Size.screen.height - 160,
      height: Size.screen.height - 160,
    },
  },
  Main: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Color.whiteLifesaverBg.light.color,
      marginTop: 10,
      marginHorizontal: 20,
      justifyContent: 'space-between',
      height: 'auto',
    },
    image: {
      marginRight: 15,
      width: 80,
      height: 80,
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
      flexDirection: 'row',
    },
    container2: {
      paddingHorizontal: 10,
      paddingRight: 20,
    },
  },
  textContainerActive: {
    borderRadius: 16,
    backgroundColor: Color.redTitleBgNotif.light.color,
    padding: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
  textContainerInactive: {
    borderRadius: 16,
    padding: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
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
  textBoldItalic: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  fx1: {
    flex: 1,
  },
  w30: {
    width: 30,
  },
  divider: {
    borderBottomWidth: 0.6,
    borderBottomColor: Color.neutral.light.neutral20,
  },
  p16: {
    padding: 16,
  },
  p5: {
    padding: 5,
  },
  ml5: {
    marginLeft: 5,
  },
  mb30: {
    marginBottom: 30,
  },
  mb10: {
    marginBottom: 10,
  },
  mhMin16: {
    marginHorizontal: -16,
  },
  mv10: {
    marginVertical: 10,
  },
};
