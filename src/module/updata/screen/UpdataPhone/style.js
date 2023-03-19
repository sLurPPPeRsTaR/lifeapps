import Color from 'ca-config/Color';

export default {
  container: {
    paddingVertical: 24,
  },
  header: {
    container: { marginBottom: 16 },
  },
  content: {
    container: {
      marginBottom: 8,
    },
    card: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Color.main.light.white,
        paddingVertical: 20,
        paddingHorizontal: 16,
      },
      title: {
        flexShrink: 1,
        flexDirection: 'row',
        alignItems: 'center',
      },
      icon: {
        marginEnd: 8,
      },
    },
  },
  footer: {
    container: {
      paddingBottom: 48,
      backgroundColor: Color.whiteBackground.light.whiteBackground,
    },
  },
  modal: {
    tooFrequently: {
      container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
      },
      icon: {
        width: 170,
        height: 170,
        position: 'absolute',
        top: -160,
      },
      title: {
        marginHorizontal: 32,
        marginBottom: 8,
      },
      subtitle: {
        marginHorizontal: 32,
        marginBottom: 16,
      },
      button1: {
        marginBottom: 16,
      },
    },
  },
  mb16: { marginBottom: 16 },
};
