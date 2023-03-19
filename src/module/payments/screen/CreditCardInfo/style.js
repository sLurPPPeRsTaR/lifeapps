import Color from 'ca-config/Color';
// import Size from 'ca-config/Size';

export default {
  container: {
    paddingVertical: 16,
  },
  footer: {
    container: {
      padding: 16,
      maxWidth: 600,
      backgroundColor: Color.landingPage.light.white,
    },
    textContainer: {
      marginVertical: 15,
      marginLeft: 5,
    },
  },
  infoCard: {
    container: {
      borderRadius: 16,
      backgroundColor: Color.lightGray.light.lightGray,
      padding: 15,
      flexDirection: 'row',
    },
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
    },
    text: {
      flex: 1,
      flexWrap: 'wrap',
    },
  },
  fdRow: { flexDirection: 'row' },
  fx1: { flex: 1 },
  m25: { margin: 25 },
  mb16: { marginBottom: 16 },
  mb20: { marginBottom: 20 },
  w14: { width: 14 },
  underlineRed: {
    textDecorationLine: 'underline',
    color: Color.primary.light.primary90,
  },
};
