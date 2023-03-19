import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  paymentMethod: {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
    },
    listItem: {
      flexDirection: 'row',
      height: 60,
      alignItems: 'center',
      // position: 'relative',
    },
    optionMenu: {
      backgroundColor: 'white',
      position: 'absolute',
      right: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    deleteContainer: {
      width: 35,
      height: 35,
      justifyContent: 'center',
    },
    moreContainer: {
      width: 30,
      height: 50,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    warningContainer: {
      backgroundColor: Color.secondary.light.secondary20,
      borderRadius: 16,
      flexDirection: 'row',
      padding: 12,
      marginVertical: 10,
    },
    warningTextContainer: {
      flexShrink: 1,
    },
    titleContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    badge: {
      margin: 5,
      borderRadius: 10,
      padding: 5,
      backgroundColor: Color.pink.light.pink10,
    },
    editBtnContainer: {
      width: 70,
      height: 25,
      alignItems: 'flex-end',
    },
  },
  addPayment: {
    container: {
      justifyContent: 'space-between',
      marginVertical: 10,
    },
  },
  custCare: {
    backgroundColor: Color.grayLine.light.color,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 12,
    position: 'absolute',
    bottom: 36,
    marginLeft: 16,
    width: Size.screen.width - 32,
  },
  backgroundBottom: {
    bottom: 0,
    position: 'absolute',
    zIndex: -10,
  },
  divider: {
    height: 10,
    backgroundColor: Color.backgroundHome.light.backgroundHome,
    marginVertical: 10,
  },
  creditCard: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  mr8: {
    marginRight: 8,
  },
  mr15: {
    marginRight: 15,
  },
  mv10: {
    marginVertical: 10,
  },
  p13: {
    padding: 13,
  },
};
