import Color from 'ca-config/Color';

export default {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  simpleCard: {
    simpleCardContainer: {
      marginVertical: 14,
    },
    simpleCardTitle: {
      marginBottom: 10,
    },
  },
  menu: {
    container: {
      paddingTop: 12,
    },
    card: {
      container: {
        borderTopWidth: 1,
        borderTopColor: Color.grayBorder.light.grayBorder,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Color.grayBorder.light.grayBorder,
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
  mb20: {
    marginBottom: 20,
  },
  mv4: {
    marginVertical: 4,
  },
  mH300: { minHeight: 300 },
  modal: {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 20,
    },
    text1: {
      marginBottom: 6,
    },
    text2: {
      marginBottom: 24,
    },
    button1: {
      marginBottom: 16,
    },
    deleteSession: {
      flexDirection: 'row',
    },
    deleteSessionLabel: {
      flex: 1,
    },
  },
  modalDetail: {
    modalDetailContainer: {},
    modalDetailContent: {
      paddingBottom: 50,
    },
    modalDetailText: {
      borderBottomWidth: 1,
      borderBottomColor: Color.grayBorder.dark.grayBorder,
      paddingVertical: 15,
    },
  },
  successModal: {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 50,
    },
    icon: {
      width: 200,
      height: 200,
      marginBottom: 10,
      position: 'absolute',
      top: -150,
    },
    iconBadgeTick: {
      width: 128,
      height: 140,
      resizeMode: 'contain',
      marginBottom: 10,
      position: 'absolute',
      top: -100,
    },
    text1: {
      marginBottom: 6,
      marginHorizontal: 20,
      paddingBottom: 20,
      paddingTop: 10,
    },
    text2: {
      marginBottom: 24,
      marginHorizontal: 24,
    },
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
};
