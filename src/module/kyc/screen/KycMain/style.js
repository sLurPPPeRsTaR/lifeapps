import Color from 'ca-config/Color';

export default {
  renderContent: {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imgSize: { width: 178, height: 254 },
  },
  renderBottom: {
    container: {
      marginBottom: 48,
      zIndex: 0,
    },
    waveContainer: {
      position: 'absolute',
      bottom: -50,
    },
  },
  renderSubContent: {
    container: {
      paddingVertical: 32,
      paddingHorizontal: 16,
      backgroundColor: Color.main.light.white,
    },
    card: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 16,
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: Color.grayE0E0E0.light.grayE0E0E0,
      },
      lastContainer: { flexDirection: 'row', alignItems: 'center' },
      image: { width: 45, height: 45, marginRight: 15 },
    },
    alertDialogueStyle: { marginTop: 16 },
  },

  mB16: { marginBottom: 16 },
  mB48: { marginBottom: 48 },
  me16: { marginEnd: 16 },
  mV16: { marginVertical: 16 },
  fS1: { flexShrink: 1 },
};
