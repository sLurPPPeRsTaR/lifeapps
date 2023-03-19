import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  padder: {
    container: {
      flex: 1,
    },
  },
  boxMsg: {
    wrapper: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginTop: 240,
    },
    box: {
      paddingHorizontal: 24,
      backgroundColor: Color.grayProfile3.dark.grayProfile3,
    },
    msg: {
      flex: 1,
      justifyContent: 'center',
    },
    text: { marginTop: 8 },
  },
  renderButtonWrapper: {
    marginBottom: 48,
    paddingHorizontal: 12,
  },
};
