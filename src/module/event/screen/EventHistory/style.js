import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  padderContainer: {
    backgroundColor: Color.greyBackround.dark.greyBackground,
    flex: 1,
  },

  renderHeader: {
    container: { justifyContent: 'center', alignItems: 'center', flex: 1 },
    imgSize: { width: 150, height: 150 },
    containerCard: {
      width: Size.screen.width - 30,
      height: 343,
      padding: 24,
    },
    floatingCard: {
      width: Size.screen.width - 80,
      height: 120,
      borderRadius: 30,
    },
    imgSizeCover: { flex: 1, borderRadius: 16 },
    roundedHeartImgSize: { position: 'absolute', right: 15, top: 8 },
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
    containerUser: {
      marginTop: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },

  mB20: { marginBottom: 20 },
  mV16: { marginVertical: 16 },
  mT24: { marginTop: 24 },
  pH5: { paddingHorizontal: 5 },
};
