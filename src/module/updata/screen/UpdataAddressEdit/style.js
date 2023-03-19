import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  container: {
    paddingTop: 24,
    paddingBottom: 20 + 20 + 36 + 48,
  },
  content: {
    input: {
      container: { marginBottom: 12 },
      flexRowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
      },
    },
  },
  footer: {
    container: {
      position: 'absolute',
      bottom: 0,
      paddingBottom: 48,
    },
  },
  modal: {
    addressSelection: {
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
    loading: {
      container: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  },
  flexGrow: { flexGrow: 1 },
  ms4: { marginStart: 4 },
  me4: { marginEnd: 4 },
  mb8: { marginBottom: 8 },
  pb24: { paddingBottom: 24 },
};
