import Color from 'ca-config/Color';

export default {
  imageBackground: {
    flex: 1,
    backgroundColor: Color.whiteLifesaverBg.light.color,
    paddingTop: 30,
  },
  deviceListNull: {
    image: {
      container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 42,
      },
      image: { width: 180, height: 168, resizeMode: 'cover' },
    },
    lifetagIcon: {
      width: 118,
      height: 33,
      resizeMode: 'cover',
      marginTop: 16,
    },
  },
  containerTablet: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  containerButtonTablet: {
    display: 'flex',
    width: '50%',
    marginHorizontal: 230,
    marginTop: 12,
  },
  loading: {
    justifyContent: 'center',
  },
  mb12: { marginBottom: 12 },
  mb16: { marginBottom: 16 },
  pb48: { paddingBottom: 48 },
  pt24: { paddingTop: 24 },
  pt48: { paddingTop: 48 },
  mt8: { marginTop: 8 },
};
