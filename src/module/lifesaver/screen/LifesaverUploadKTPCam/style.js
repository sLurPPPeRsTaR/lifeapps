import Color from 'ca-config/Color';

export default {
  verificationSuccess: {
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.6)',
    },
    caption: {
      marginTop: 20,
      backgroundColor: 'rgba(255,255,255, 0.25)',
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderRadius: 20,
    },
  },
  modal: {
    changeKTP: {
      container: { alignItems: 'center', justifyContent: 'center' },
      image: { width: 100, height: 100 },
      title: { marginBottom: 16 },
      subtitle: { marginBottom: 24 },
      button1: { marginBottom: 16 },
    },
    blur: {
      container: {
        paddingTop: 24,
      },
      title: {
        marginBottom: 4,
        flexShrink: 1,
      },
      subtitle: {
        marginBottom: 20,
        flexShrink: 1,
      },
      card: {
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: 16,
          marginBottom: 16,
          borderBottomWidth: 0.75,
          borderBottomColor: Color.neutral.light.neutral20,
        },
        icon: {
          marginEnd: 4,
          width: 24,
          height: 24,
        },
      },
    },
    imageInvalid: {
      container: { alignItems: 'center', justifyContent: 'center' },
      imageSize: { width: 300, height: 250, position: 'absolute', top: -170 },
      image: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
      },
      title: { marginBottom: 16 },
      subtitle: { marginBottom: 24 },
    },
  },
  button: {
    uncaptured: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Color.main.light.black,
      padding: 16,
    },
    captured: {
      backgroundColor: Color.main.light.black,
      paddingHorizontal: 16,
      paddingTop: 24,
      paddingBottom: 32,
    },
  },
  flex1: { flex: 1 },
  flexShrink1: { flexShrink: 1 },
  mb16: { marginBottom: 16 },
  mT20: { marginTop: 20 },

  renderCompareFailModal: {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 70,
    },
    image: { position: 'absolute', top: -140, width: 250, height: 200 },
    title: {
      marginBottom: 8,
    },
    content: {
      marginBottom: 16,
    },
  },
};
