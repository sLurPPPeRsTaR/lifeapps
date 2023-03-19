import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  total: {
    container: {
      bottom: 0,
      width: Size.screen.width,
      paddingVertical: 16,
      backgroundColor: Color.whiteCard.light.color,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: -3,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 24,
    },
    labelContainer: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    labelPrice: {
      marginTop: -10,
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
  },
  mw330: {
    maxWidth: 330,
  },
  mb10: {
    marginBottom: 10,
  },
};
