import Color from 'ca-config/Color';

export default {
  main: {
    header: {
      backgroundColor: Color.red.light.D71920,
      color: 'white',
    },
    bgRed: {
      backgroundColor: Color.red.light.D71920,
      height: 50,
    },
  },
  infoProduct: {
    linearLabel: {
      paddingHorizontal: 16,
      paddingVertical: 22,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    beforeBackground: {
      paddingHorizontal: 16,
      paddingVertical: 22,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: Color.grayCard.light.grayCard,
    },
    durasi: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    jatuhTempo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    nextPayment: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
    },
  },
  arrow: {
    container: { flexDirection: 'row', justifyContent: 'center' },
    image: { width: 60, height: 63 },
  },
  p16: {
    padding: 16,
  },
  mxMin16: {
    marginHorizontal: -16,
  },
  my8: {
    marginVertical: 8,
  },
};
