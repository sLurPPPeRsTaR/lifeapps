import Color from 'ca-config/Color';

export default {
  container: {
    flexGrow: 1,
    paddingTop: 24,
    backgroundColor: Color.whiteLifesaverBg.light.color,
  },

  lifetagDevice: {
    image: { width: 55, height: 55, resizeMode: 'cover' },
  },

  modal: {
    unlink: {
      container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 80,
      },
      image: { width: 160, height: 160, position: 'absolute', top: -80 },
    },
  },

  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
  },

  cloudBackground: {
    position: 'absolute',
    bottom: -50,
    zIndex: -1,
  },

  flex1: { flex: 1 },
  flexShrink1: { flexShrink: 1 },
  flexDirectionRow: { flexDirection: 'row' },
  alignItemsCenter: { alignItems: 'center' },

  mt16: { marginTop: 16 },
  mt20: { marginTop: 20 },
  mb4: { marginBottom: 4 },
  mb10: { marginBottom: 10 },
  mb12: { marginBottom: 12 },
  mb16: { marginBottom: 16 },
  mb20: { marginBottom: 20 },
  mb24: { marginBottom: 24 },
  mb26: { marginBottom: 26 },
  mb30: { marginBottom: 30 },

  me16: { marginEnd: 16 },

  my20: { marginVertical: 20 },
};
