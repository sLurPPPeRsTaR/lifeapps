import Color from 'ca-config/Color';

export default {
  sdkContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  button: {
    temp: { width: 40, height: 40 },
    uncaptured: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: Color.main.light.black,
      padding: 16,
    },
  },
  modal: {
    success: {
      container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 80,
      },
      icon: {
        position: 'absolute',
        top: -80,
      },
      text: {
        marginBottom: 24,
      },
    },
    timeout: {
      container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
      },
      image: { width: 150, height: 150, position: 'absolute', top: -150 },
      icon: { position: 'absolute', bottom: 100 },
      text: { marginTop: 12 },
      button: { marginTop: 24 },
    },
    livenessFail: {
      containerIcon: { flexDirection: 'row', marginVertical: 16 },
      iconGap: { marginRight: 5, width: 24, height: 24 },
      button: { marginTop: 24 },
    },
  },
  renderCompareFailModal: {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 20,
    },
    image: { position: 'absolute', top: -180, width: 250, height: 200 },
    title: {
      marginBottom: 8,
    },
    content: {
      marginBottom: 16,
    },
  },
  flex1: { flex: 1 },
  flexShrink1: { flexShrink: 1 },
  mb16: { marginBottom: 16 },
};
