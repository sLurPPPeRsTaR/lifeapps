import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  gapLine: { height: 10, width: Size.screen.width },

  backgroundContainer: {
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
  },

  renderInfoProduct: {
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
    cardContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex: 1,
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
    logo: {
      height: 30,
      width: 95,
    },
    productListContainer: {
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
  },

  renderContent: {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 16,
      marginBottom: 10,
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
      paddingVertical: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },

  renderTotal: {
    totalPayment: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    productPrice: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    promo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    summaryContainer: { flexDirection: 'row', alignItems: 'center' },
  },

  renderLifetagColorModal: {
    chooseColorContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    flatlistContainer: {
      flex: 1,
      paddingHorizontal: 16,
      marginTop: 12,
      marginBottom: 32,
    },
    touchableContainer: {
      width: 48,
      height: 48,
      borderRadius: 100,
      marginRight: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    circleContainer: { width: 16, height: 16, borderRadius: 100 },
    container: {
      flexDirection: 'row',
      width: 89,
      height: 30,
      justifyContent: 'space-between',
    },
    minusContainer: {
      width: 30,
      justifyContent: 'center',
      backgroundColor: Color.lifetagQtyBgColor.light.color,
      borderBottomLeftRadius: 4,
      borderTopLeftRadius: 4,
    },
    qtyContainer: {
      flex: 1,
      justifyContent: 'center',
      borderTopColor: Color.lifetagQtyBgColor.light.color,
      borderTopWidth: 0.5,
      borderBottomColor: Color.lifetagQtyBgColor.light.color,
      borderBottomWidth: 0.5,
    },
    plusContainer: {
      width: 30,
      justifyContent: 'center',
      backgroundColor: Color.lifetagQtyBgColor.light.color,
      borderBottomRightRadius: 4,
      borderTopRightRadius: 4,
    },
    sumContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 32,
    },
  },
  renderButton: {
    textContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 12,
    },
  },
  renderStockOutModal: {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 70,
    },
    imgSize: {
      position: 'absolute',
      top: -110,
      width: 160,
      height: 185,
    },
    textContentContainer: { paddingBottom: 24, paddingTop: 8 },
  },

  mB32: { marginBottom: 32 },
  p16: { padding: 16 },
  flex: { flex: 1 },
  mR7: { marginRight: 7 },
  mV5: { marginVertical: 5 },
  mT32: { marginTop: 32 },
  fS1: { flexShrink: 1 },
  row: { flexDirection: 'row' },
  mx10: { marginHorizontal: 10 },
  mB8: { marginBottom: 8 },
  mR14: { marginRight: 14 },
  mT8: { marginTop: 8 },
};
