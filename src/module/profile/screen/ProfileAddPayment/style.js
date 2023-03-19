import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

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
  addCard: {
    expAndCVV: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
    },
    expWidth: { width: (Size.screen.width - 64) / 2 },
  },
  mt32: {
    marginTop: 32,
  },
  mt10: {
    marginTop: 10,
  },
  p16: {
    padding: 16,
  },
  mx10: {
    marginHorizontal: 10,
  },
  mxMin32: {
    marginHorizontal: -32,
  },
  mb10: {
    marginBottom: 10,
  },
  ml10: {
    marginLeft: 10,
  },
  ml16: {
    marginLeft: 16,
  },
  my16: {
    marginVertical: 16,
  },
  px16: {
    paddingHorizontal: 16,
  },
  mtMin40: {
    marginTop: -40,
  },
  mbMin4: {
    marginBottom: -3,
  },
  m10: {
    margin: 10,
  },
  m15: {
    margin: 15,
  },
  my10: {
    marginVertical: 10,
  },
  mt16: {
    marginTop: 16,
  },
  mw330: {
    maxWidth: 330,
  },
  mb16: {
    marginBottom: 16,
  },
  b0: {
    bottom: 0,
  },
  mr10: {
    marginRight: 10,
  },
};
