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
      width: Size.screen.width,
      paddingBottom: 48,
    },
  },
  modal: {
    addressSelection: {
      container: { height: Size.screen.height / (Size.isAndroid ? 2.5 : 1.5) },
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
        paddingTop: 10,
      },
      icon: {
        position: 'absolute',
        top: -140,
        width: 128,
        height: 140,
        resizeMode: 'contain',
      },
      text: {
        marginBottom: 24,
      },
    },
    loading: {
      container: {
        height: Size.screen.height / (Size.isAndroid ? 3 : 2),
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  },
  lineGap: {
    height: 10,
    width: Size.screen.width,
    marginTop: 8,
    marginBottom: 24,
  },
  flexGrow: { flexGrow: 1 },
  ms4: { marginStart: 4 },
  me4: { marginEnd: 4 },
  mb8: { marginBottom: 8 },
  mb16: { marginBottom: 16 },
  mb48: { marginBottom: 48 },
  pb24: { paddingBottom: 24 },
  mT24: { marginTop: 24 },
};
