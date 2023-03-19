import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  container: {
    paddingVertical: 24,
  },
  content: {
    namaPemilik: {
      container: {
        marginBottom: 12,
      },
      label: { marginBottom: 8 },
      nama: {
        container: { flexDirection: 'row', alignItems: 'center' },
        icon: {
          backgroundColor: 'rgba(252, 90, 72, 1)',
          width: 40,
          height: 40,
          borderRadius: 20,
          marginEnd: 8,
        },
      },
    },
  },
  footer: {
    container: {
      paddingBottom: 48,
    },
  },
  modal: {
    listBank: {
      container: {},
      list: {
        container: {
          minHeight: 56,
          paddingHorizontal: 8,
          marginBottom: 12,
          justifyContent: 'center',
          borderBottomWidth: 0.75,
          borderBottomColor: Color.grayBorder.light.grayBorder,
        },
      },
    },
    confirmation: {
      container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
      },
      icon: {
        position: 'absolute',
        top: -150,
        width: 250,
        height: 250,
      },
      text: {
        marginBottom: 24,
      },
      button1: {
        marginBottom: 16,
      },
    },
    success: {
      container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
      },
      icon: {
        position: 'absolute',
        top: -150,
        width: 128,
        height: 146,
        resizeMode: 'contain',
      },
      text: {
        marginBottom: 24,
      },
    },
    tooFrequently: {
      container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 75,
      },
      icon: {
        width: 270,
        height: 270,
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
    failedApi: {
      container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
      },
      image: {
        width: 242,
        height: 242,
        resizeMode: 'contain',
        position: 'absolute',
        top: -180,
      },
      title: { marginBottom: 16 },
      subtitle: { marginBottom: 24 },
    },
  },
  mt6: { marginTop: 6 },
  mb16: { marginBottom: 16 },
  pb24: { paddingBottom: 24 },
};
