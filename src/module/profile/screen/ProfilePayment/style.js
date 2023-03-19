import Color from 'ca-config/Color';

export default {
  menu: {
    container: {
      paddingTop: 12,
    },
    card: {
      container: {
        paddingVertical: 16,
        paddingStart: 8,
        borderBottomWidth: 1,
        borderBottomColor: Color.grayBorder.light.grayBorder,
      },
      icon: {
        marginEnd: 12,
      },
      card: {
        paddingVertical: 8,
        paddingEnd: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      content: {
        container: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      },
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
    title: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
  },

  paymentItem: {
    container: {
      flexDirection: 'row',
      marginHorizontal: 16,
      height: 45,
      alignItems: 'center',
      flex: 1,
    },
    iconContainer: {
      marginRight: 15,
    },
    icon: {
      width: 25,
      height: 25,
    },
    borderCard: {
      borderBottomWidth: 10, 
      width: '100%', 
      paddingBottom: 20, 
      marginBottom: 20, 
      borderBottomColor: Color.backgroundHome.light.backgroundHome,
    },
    deleteIconContainer: {
      flex: 0.2,
      alignItems: 'flex-end',
    },
    dropdownIconContainer: {
      flex: 0.2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    primaryText: {
      backgroundColor: Color.redTitleBgNotif.light.color,
      borderWidth: 1,
      borderColor: Color.redNotif.light.color,
      textAlign: 'center',
      padding: 5,
      borderRadius: 16,
      marginLeft: 5,
    },
  },
  divider: {
    borderBottomWidth: 0.6,
    borderBottomColor: Color.neutral.light.neutral20,
  },
  fdRow: { flexDirection: 'row', alignItems: 'center' },
  fx1: { flex: 1 },
  m25: { margin: 25 },
  mb16: { marginBottom: 16 },
  mb20: { marginBottom: 20 },
  w14: { width: 14 },
  mt85: { marginTop: 85 },
  modal: {
    deleteModal: {
      iconContainer: { alignItems: 'center' },
      icon: {
        position: 'absolute',
        top: -200,
        width: 300,
        height: 300,
      },
      title: { marginBottom: 4 },
      subtitle: { marginBottom: 24 },
      button1: { marginBottom: 16 },
    },
  }
};
