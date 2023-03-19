import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  container: {
    paddingVertical: 24,
  },
  steps: {
    container: {
      backgroundColor: Color.main.light.white,
      paddingVertical: 20,
      paddingHorizontal: 16,
      marginBottom: 24,
      borderRadius: 30,
      shadowColor: Color.main.light.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    step: {
      container: {
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      line: {
        active: {
          flex: 1,
          height: 2,
          borderRadius: 2 * 0.5,
          marginHorizontal: 4,
          backgroundColor: Color.primary.light.primary90,
        },
        inactive: {
          flex: 1,
          height: 2,
          borderRadius: 2 * 0.5,
          marginHorizontal: 4,
          backgroundColor: Color.neutral.light.neutral20,
        },
      },
    },
  },
  footer: {
    container: {
      paddingTop: 20,
      paddingBottom: 40,
    },
    checkBox: {
      container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: 16,
      },
      checkBox: {
        width: 22,
        height: 22,
        marginEnd: 10,
        marginTop: Size.isAndroid ? 3 : 5,
      },
    },
  },
  modal: {
    confirmation: {
      container: {
        alignItems: 'center',
      },
      icon: {
        width: 100,
        height: 100,
        marginBottom: 32,
      },
      title: {
        marginBottom: 16,
      },
      subtitle: {
        marginBottom: 24,
      },
      button1: {
        marginBottom: 16,
      },
    },
    success: {
      container: {
        alignItems: 'center',
        paddingTop: 20,
      },
      icon: {
        container: { position: 'absolute', top: -150 },
        icon: { width: 150, height: 150 },
      },
      title: {
        marginBottom: 16,
      },
      subtitle: {
        marginBottom: 24,
      },
      button1: {
        marginBottom: 16,
      },
    },
  },
  loading: {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  flexShrink1: { flexShrink: 1 },
  pv24: { paddingVertical: 24 },
  flex: { flex: 1 },
  me16: { marginEnd: 16 },
};
