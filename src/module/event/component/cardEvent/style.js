import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  renderHeader: {
    container: { justifyContent: 'center', alignItems: 'center', flex: 1 },
    imgSize: { width: 150, height: 150 },
    containerCard: {
      width: Size.screen.width - 30,

      padding: 20,
    },
    floatingCard: {
      width: Size.screen.width - 80,
      height: 120,
      borderRadius: 30,
    },
    imgSizeCover: { flex: 1, borderRadius: 16 },
    roundedHeartImgSize: {
      position: 'absolute',
      right: 30,
      top: 30,
      backgroundColor: '#fff',
      borderRadius: 50,
    },
    roundedHeartImg: {
      padding: 5,
      margin: 4,
    },
    containerDate: {
      position: 'absolute',
      width: 42,
      height: 56,
      backgroundColor: Color.main.light.white,
      borderRadius: 12,
      top: 5,
      left: 15,
      justifyContent: 'center',
    },
    containerTicket: {
      position: 'absolute',
      flexDirection: 'row',
      backgroundColor: Color.ticketContainerBg.light.color,
      borderRadius: 9,
      padding: 10,
      bottom: 10,
      left: 15,
    },
    containerCity: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
    containerLimited: {
      marginTop: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    containerUser: {},
  },

  renderisTicket: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 14,
    },
    eventTitleContainer: { width: 200 },
    imgSize: {
      width: 76,
      height: 99,
      borderRadius: Size.isAndroid ? 30 : 16,
      marginRight: 12,
    },
    imgBgGrey: {
      width: 76,
      height: 99,
      borderRadius: 12,
      backgroundColor: Color.eventGreyBgColor.dark.color,
      position: 'absolute',
      marginLeft: 14,
    },
    calenderTextContainer: { flexDirection: 'row', marginVertical: 5 },
    eventEndContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    locationTextContainer: { flexDirection: 'row', alignItems: 'center' },
  },

  renderisMyTicket: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingLeft: 10,
    },
    eventTitleContainer: { width: 200, marginBottom: 5 },
    imgSize: {
      width: 76,
      height: 99,
      borderRadius: Size.isAndroid ? 30 : 16,
      marginRight: 12,
    },
    imgBgGrey: {
      width: 76,
      height: 99,
      borderRadius: 12,
      backgroundColor: Color.eventGreyBgColor.dark.color,
      position: 'absolute',
      marginLeft: 10,
    },
    calenderTextContainer: {
      flexDirection: 'row',
      marginVertical: 5,
      paddingRight: 15,
    },
    eventEndContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    containerCity: { flexDirection: 'row', alignItems: 'center' },
    locationTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  viewItem: { flexDirection: 'row', justifyContent: 'space-between' },
  viewPrice: {
    position: 'absolute',
    right: 0,
  },
  mB20: { marginBottom: 20 },
  mV16: { marginVertical: 16 },
  mT24: { marginTop: 24 },
  flex: { flex: 1 },
  mR5: { marginRight: 5 },
  mR12: { marginRight: 12 },
  mL5: { marginLeft: 5 },
  mR15: { marginRight: 15 },
};
