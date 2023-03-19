import Size from 'ca-config/Size';

export default {
  renderFooter: {
    container: {},
    contentWrapper: {
      flexDirection: 'row',
      marginVertical: 15,
    },
    checkbox: {
      width: 22,
      height: 22,
    },
    textWrapper: {
      marginLeft: 8,
      flex: 1,
    },
  },
  renderWebView: {
    container: {
      flex: 1,
    },
  },
  loading: {
    height: Size.screen.height / 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pB48: { paddingBottom: 48 },
  mR10: { marginRight: 10 },
};
