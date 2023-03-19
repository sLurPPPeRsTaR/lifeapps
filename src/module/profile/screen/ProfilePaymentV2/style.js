import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  scrollview: {
    root: {
      maxHeight: Size.screen.height - 150,
      marginBottom: -50,
    },
    content: {
      paddingBottom: 50,
    },
  },
  header: {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 40,
      alignItems: 'center',
      marginHorizontal: 16,
      marginBottom: 5,
    },
    closeBtnContainer: {
      height: 30,
      width: 30,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Color.lightGray.light.lightGray,
    },
  },
  paymentCard: {
    wrap: {
      margin: 5,
    },
    shadow: {
      borderRadius: 16,
      shadowColor: Color.neutral.light.neutral10,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 4,
    },
    container: {
      overflow: 'hidden',
      backgroundColor: 'white',
      borderRadius: 16,
      paddingVertical: 10,
      paddingHorizontal: 10,
      marginTop: 5,
    },
  },

  paymentItem: {
    container: {
      flexDirection: 'row',
      marginHorizontal: 16,
      height: 45,
      alignItems: 'center',
    },
    iconContainer: {
      marginRight: 15,
    },
    icon: {
      width: 25,
      height: 25,
    },
  },

  paymentOtomatisInfo: {
    container: {
      borderRadius: 16,
      backgroundColor: Color.lightGray.light.lightGray,
      padding: 15,
      flexDirection: 'row',
    },
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
    },
    text: {
      flex: 1,
      flexWrap: 'wrap',
    },
  },

  paymentItemAdd: {
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 40,
    },
  },

  fx1: {
    flex: 1,
  },
  divider: {
    borderBottomWidth: 0.6,
    borderBottomColor: Color.neutral.light.neutral20,
  },
};
