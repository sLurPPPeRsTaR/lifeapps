import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  mT24: { marginTop: 24 },
  mB48: { marginBottom: 48 },
  modal: {
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
  },
  renderMainContainer: {
    docContainer: { position: 'absolute', right: 20, top: 40 },
  },
};
