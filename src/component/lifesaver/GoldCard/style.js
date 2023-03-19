import Color from 'ca-config/Color';

export default {
  productDesc: {
    borderRadius: {
      borderRadius: 24,
    },
    linearGradient: {
      paddingVertical: 12.5,
      paddingHorizontal: 24,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
    },
    desc: {
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderBottomRightRadius: 24,
      borderBottomLeftRadius: 24,
      backgroundColor: Color.whiteCard.light.color,
      shadowColor: Color.main.light.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    textDesc: {
      marginBottom: 8,
      marginLeft: 5,
    },
    more: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 12,
    },
  },
};
