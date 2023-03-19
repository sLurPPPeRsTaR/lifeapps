import Color from "ca-config/Color";

export default {
  CardWidget: {
    widgetContainer: {
      overflow: 'hidden',
      borderRadius: 16,
      height: 128,
      padding: 16,
    },
    content: {
      flexDirection: 'row',
      // alignItems: 'center',
      alignItems: 'flex-start',
      zIndex: 1,
    },
    btnContainer: {
      zIndex: 1,
      flexDirection: 'row-reverse',
      bottom: -8,
    },
    topRightImage: { position: 'absolute', right: 0, top: 5 },
    benefitDate: { position: 'absolute', bottom: 10, right: 15 },
    wave: {
      position: 'absolute',
      transform: [{ rotate: '180deg' }],
      bottom: -30,
    },
    secondBtnContainer: {
      marginRight: 10,
      paddingHorizontal: 30,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: Color.primary.light.primary90,
      borderRadius: 6,
    },
  },
  bR6: { borderRadius: 6 },
  flex: { flex: 1 },
  mR14: { marginRight: 14 },
};
