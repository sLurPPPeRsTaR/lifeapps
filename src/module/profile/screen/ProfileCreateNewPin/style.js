import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  padder: {
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
    },
  },

  renderHeader: {
    text2: { marginVertical: 30 },
  },
  renderButtonWrapper: {
    paddingHorizontal: 12,
    marginBottom: 48,
  },
  renderFormInput: {
    mb16: { marginBottom: 16 },
  },

  modal: {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 70,
    },
    icon: {
      position: 'absolute',
      top: -100,
      width: 128,
      height: 140,
      resizeMode: 'contain',
    },
    text1: {
      marginBottom: 6,
    },
    text2: {
      marginBottom: 20,
    },
    button1: {
      marginBottom: 16,
    },
  },
  me12: { marginEnd: 12 },
};
