import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  gapLine: { height: 10, width: Size.screen.width },

  renderSlider: {
    imgSize: { height: 238 },
    floatingWhiteBoxContainer: {
      backgroundColor: Color.main.light.white,
      borderRadius: 4,
      position: 'absolute',
      bottom: 35,
      right: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textWhiteBox: { paddingVertical: 6, paddingHorizontal: 8 },
    dotContainer: {
      flexDirection: 'row',
      alignSelf: 'center',
    },
    dotActive: { margin: 3, color: Color.eventDotActive.light.color },
    dotInActive: { margin: 3, color: Color.eventDotInActive.light.color },
  },

  renderPriceQty: {
    textLifetagEmergencyContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    textNewContainer: {
      backgroundColor: Color.primary.light.primary90,
      width: 43,
      height: 26,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
    },
    priceStrikeThroughContainer: { marginBottom: 4 },
    priceContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    deskripsiContainer: {
      marginTop: 16,
    },
  },

  renderProductColor: {
    colorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    flatlistContainer: {
      flex: 1,
      paddingHorizontal: 16,
      marginTop: 12,
    },
    lifetagColorContainer: {
      paddingRight: 16,
      paddingTop: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },
    touchableContainer: {
      borderRadius: 100,
      marginRight: 16,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 2,
    },
    circleContainer: { width: 48, height: 48, borderRadius: 100 },
    qtyContainer: {
      flexDirection: 'row',
      marginRight: 16,
      borderWidth: 1,
      borderRadius: 4,
      borderColor: Color.lifetagQtyBgColor.light.color,
    },
    qtyMinusContainer: {
      paddingHorizontal: 8,
      backgroundColor: Color.lifetagQtyBgColor.light.color,
      justifyContent: 'center',
      alignItems: 'center',
    },
    qtyPlusContainer: {
      paddingHorizontal: 8,
      backgroundColor: Color.lifetagQtyBgColor.light.color,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },

  renderContent: {
    weightContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 27,
      marginBottom: 12,
    },
    kompatibelContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 32,
    },
  },

  renderFooter: {
    lifeSAVERwhiteContainer: {
      paddingHorizontal: 30,
      paddingVertical: 16,
      backgroundColor: Color.primary.light.primary90,
      borderTopLeftRadius: 13,
      borderTopRightRadius: 13,
    },
    image: { width: 339, height: 63, resizeMode: 'contain' },
    hitbyCar: {
      hitbyCarContainer: {
        flexDirection: 'row',
        marginTop: 8,
      },
      mH16: { marginHorizontal: 16 },
    },
    ListAccordion: {
      pV12: { paddingVertical: 12 },
      cardContainer: {
        flexDirection: 'row',
        marginVertical: 16,
      },
      mH16: { marginHorizontal: 16 },
      mB5: { marginBottom: 5 },
      mL16: { marginLeft: 16 },
      mT24: { marginTop: 24 },
      container: {
        borderBottomLeftRadius: 13,
        borderBottomRightRadius: 13,
        paddingHorizontal: 16,
        paddingTop: 16,
      },
      freeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12,
      },
      freeLifeSAVERContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 16,
      },
      mB24: { marginBottom: 24 },
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

  mT24: { marginTop: 24 },
  pR16: { paddingRight: 16 },
  mB32: { marginBottom: 32 },
  mB10: { marginBottom: 10 },
  mT8: { marginTop: 8 },
  mB16: { marginBottom: 16 },
  pB48: { paddingBottom: 48 },
  mV4: { marginVertical: 4 },
  bGColor: { backgroundColor: Color.whiteBackground.light.whiteBackground },
  pV8: { paddingVertical: 8 },
  pB10: { paddingBottom: 10 },
  mB5: { marginBottom: 5 },
  pT10: { paddingTop: 10 },
  fS1: { flexShrink: 1 },
  pB16: { paddingBottom: 16 },
  fontStyleItalic: { fontStyle: 'italic' },
  pH16: { paddingHorizontal: 16 },
  mT16: { marginTop: 16 },
  mR8: { marginRight: 8 },
  pH8: { paddingHorizontal: 8 },
  mT32: { marginTop: 32 },
  mB8: { marginBottom: 8 },
  flex: { flex: 1 },
};
