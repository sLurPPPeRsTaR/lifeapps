import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import DeviceInfo from 'react-native-device-info';

export default {
  // renderContent
  renderContent: {
    imgBGContainer: { width: Size.screen.width, height: 560 },
    ticketContainer: {
      alignSelf: 'center',
      height: DeviceInfo.isTablet() ? 800 : 620,
      aspectRatio: DeviceInfo.isTablet() ? 0.6 : 0.6,
      borderRadius: 20,
    },
    ticketBanner: {
      flex: 6,
      alignItems: 'center',
      paddingHorizontal: 50,
      marginTop: 30,
    },
    imgTicketBanner: {
      height: DeviceInfo.isTablet() ? 180 : 140,
      aspectRatio: DeviceInfo.isTablet() ? 2.3 : 2.3,
      width: 300,
      borderRadius: 12,
      marginBottom: 8,
      marginTop: 8,
    },
    eventTitle: { alignSelf: 'center' },
    benefitContainer: {
      flex: 9,
      paddingHorizontal: 50,
    },
    imgLogo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 13,
    },
    freeText: {
      backgroundColor: Color.greenActive.light.color,
      paddingVertical: 5,
      paddingHorizontal: 8,
      borderRadius: 15,
    },
    alertDialogueContainer: {
      backgroundColor: Color.red.dark.red26,
      alignItems: 'center',
      width: DeviceInfo.isTablet() ? 0.6 * 800 : 0.6 * 620,
      alignSelf: 'center',
    },
  },

  renderContentExternal: {
    imgBGContainer: { width: Size.screen.width, height: 560 },
    ticketContainer: {
      alignSelf: 'center',
      height: 420,
      aspectRatio: 0.8,
      justifyContent: 'space-between',
    },
    ticketBanner: {
      paddingHorizontal: DeviceInfo.isTablet() ? 30 : 20,
      flexDirection: 'row',
      paddingVertical: DeviceInfo.isTablet() ? 30 : 20,
      height: 136,
      aspectRatio: 2.5,
    },
    qrCodeContent: {
      height: 250,
      aspectRatio: 1.34,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    ticketProduct: {
      alignSelf: 'center',
      height: 185,
      aspectRatio: 2,
    },
    imgTicketBanner: {
      height: DeviceInfo.isTablet() ? 100 : 101,
      aspectRatio: DeviceInfo.isTablet() ? 0.9 : 0.9,
      borderRadius: 8,
    },
    eventTitle: {
      marginTop: 5,
    },
    benefitContainer: {
      flex: 1,
      paddingHorizontal: 25,
      justifyContent: 'space-around',
      alignSelf: 'center',
      paddingBottom: 25,
      paddingTop: 35,
    },
    imgLogo: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
    },
    imgLS: {
      width: 150,
      height: 35,
      aspectRatio: 5.2,
      alignSelf: 'center',
      resizeMode: 'contain',
    },
    eventInfo: {
      width: '65%',
      paddingLeft: 12,
    },
    eventDate: {
      justifyContent: 'space-between',
      height: 50,
      paddingTop: 8,
    },
    freeText: {
      backgroundColor: Color.greenActive.light.color,
      paddingVertical: 5,
      paddingHorizontal: 8,
      borderRadius: 15,
    },
    alertDialogueContainer: {
      backgroundColor: Color.red.dark.red26,
      alignItems: 'center',
      width: DeviceInfo.isTablet() ? 0.6 * 800 : 0.6 * 620,
      alignSelf: 'center',
    },
    viewInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttonDetailPolicy: { alignSelf: 'center' },
  },
  flexRow: { flexDirection: 'row' },
  alignSelfCenter: { alignSelf: 'center' },
  pT24: { paddingTop: 24 },
  pT12: { paddingTop: 12 },
  pT8: { paddingTop: 8 },
  pT90: { paddingTop: 90 },
  mT20: { marginTop: 20 },
  mT50: { marginTop: 50 },
  mT16: { marginTop: 16 },
  mt8: { marginTop: 8 },
  pB50: { paddingBottom: 50 },
  mL5: { marginLeft: 5 },
};
