import DeviceInfo from 'react-native-device-info';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  renderBackgroundHeaderImage: {
    bgHeaderImg: {
      position: 'absolute',
      alignItems: 'center',
      left: 0,
      right: 0,
    },
    containerText: { paddingHorizontal: 16, paddingVertical: 5 },
  },

  renderRightContent: {
    rightContentContainer: { flexDirection: 'row' },
  },

  renderTicket: {
    imgText: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    imgSize: { width: 78, height: 66, resizeMode: 'contain' },
  },

  renderContent: {
    textEventList: {
      marginTop: 16,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },

  renderEventCodeModal: {
    waveImg: {
      position: 'absolute',
      bottom: -120,
    },
  },

  renderEvent: {
    containerCard: {
      marginVertical: DeviceInfo.isTablet() ? 12 : 5,
      height: DeviceInfo.isTablet() ? Size.screen.height - 500 : 430,
      aspectRatio: 0.6,
      borderRadius: 22,
      paddingHorizontal: 10,
      paddingTop: 10,
      backgroundColor: Color.main.light.white,
    },
    imgSlide: {
      height: DeviceInfo.isTablet() ? Size.screen.height - 500 : 291,
      aspectRatio: 0.8,
      borderRadius: 22,
      alignSelf: 'center',
      marginHorizontal: 10,
    },
    bgClosed: {
      height: DeviceInfo.isTablet() ? Size.screen.height - 500 : 291,
      aspectRatio: 0.85,
      borderRadius: 22,
      alignSelf: 'center',
      backgroundColor: Color.eventGreyBgColor.dark.color,
      position: 'absolute',
    },
    containerDateHeart: {
      position: 'absolute',
      zIndex: 1,
      flexDirection: 'row',
    },
    containerDate: {
      left: 24,
      top: DeviceInfo.isTablet() ? 60 : 40,
      borderRadius: 12,
      backgroundColor: Color.main.light.white,
      width: 42,
      height: 56,
    },
    date: { flex: 1, justifyContent: 'center' },
    dateHeartBg: {
      backgroundColor: Color.abuMuda.dark.abuMuda,
    },
    dateHeartImgSize: {
      padding: 10,
      margin: 5,
    },
    whiteContainer: DeviceInfo.isTablet()
      ? {
          position: 'absolute',
          width: 285,
          top: 90,
          left: 85,
        }
      : {
          position: 'absolute',
          width: 255,
          top: 0,
          left: 65,
        },
    ticketPosition: { position: 'absolute', top: 240, left: 20 },
    ticketText: {
      position: 'absolute',
      flexDirection: 'row',
      backgroundColor: Color.ticketContainerBg.light.color,
      borderRadius: 8,
      padding: 7,
      top: 15,
      left: 20,
    },
    eventContainer: {
      height: 152,
      paddingRight: 9,
      borderRadius: 16,
      backgroundColor: Color.main.light.white,
      bottom: -240,
      left: -45,
      paddingLeft: 15,
      paddingTop: 12,
    },
    eventText: {
      paddingTop: '5%',
    },
    eventTextFriend: {},
    greenContainer: { position: 'absolute', right: 0, bottom: 15 },
    greenContainerFree: {
      backgroundColor: Color.bgEventPrice.light.color,
      height: 32,
      paddingHorizontal: 35,
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      justifyContent: 'center',
    },
    greenContainerNotFree: {
      backgroundColor: Color.bgEventPrice.light.color,
      height: 32,
      paddingHorizontal: 15,
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      justifyContent: 'center',
    },
    btnHeart: { position: 'absolute', right: 5, bottom: -10 },
  },

  positionAbsolute: { position: 'absolute' },

  mT5: { marginTop: 5 },
  mT50: { marginTop: 50 },
  mT30: { marginTop: 30 },
  mE15: { marginEnd: 15 },
  mB10: { marginBottom: 10 },
  pB30: { paddingBottom: 30 },
  flex: { flex: 1 },
  pH5: { paddingHorizontal: 5 },
  mH20: { marginHorizontal: 20 },
  mH5: { marginHorizontal: 5 },
  pR5: { paddingRight: 5 },
  mL16: { marginLeft: 16 },
};
