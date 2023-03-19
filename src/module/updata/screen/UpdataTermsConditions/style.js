import Color from 'ca-config/Color';

export default {
  main: {
    headerBg: {
      backgroundColor: Color.whiteBackground.light.whiteBackground,
    },
    sectionBg: {
      backgroundColor: Color.whiteLifesaverBg.light.color,
      paddingVertical: 16,
    },
  },
  pdf: {
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    pdf: {
      flex: 1,
      height: 800,
    },
  },
  flex1: {
    flex: 1,
  },
};
