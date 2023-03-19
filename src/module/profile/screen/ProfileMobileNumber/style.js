import Color from 'ca-config/Color';

export default {
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    flexGrow: 1,
    // justifyContent: 'space-between',
  },
  placeCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    alignSelf: 'stretch',
    marginBottom: 8,
  },
  headerTitle: {
    marginBottom: 6,
  },
  footer: {
    container: {
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      paddingHorizontal: 16,
      paddingBottom: 40,
    },
    text: {
      flexDirection: 'row',
    },
  },
  modal: {
    customerService: {
      container: {
        justifyContent: 'center',
        paddingTop: 20,
      },
      icon: {
        marginEnd: 8,
      },
      text1: {
        marginBottom: 6,
      },
      text2: {
        marginBottom: 20,
      },
      cardContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 12,
        paddingStart: 4,
        paddingEnd: 8,
        borderColor: Color.grayCard.light.grayCard,
        borderWidth: 1,
        borderRadius: 8,
        height: 60,
        marginBottom: 20,
      },
    },
  },
  polisSuccessModal: {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 20,
    },
    icon: {
      marginBottom: 40,
    },
    text1: {
      marginBottom: 6,
    },
    text2: {
      marginBottom: 20,
    },
  },
  polisFailModal: {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 14,
    },
    icon: {
      marginBottom: 38,
    },
    text1: {
      marginBottom: 8,
    },
    text2: {
      marginBottom: 24,
    },
    button1: {
      marginBottom: 24,
    },
  },
  mb8: {
    marginBottom: 8,
  },
  mb16: {
    marginBottom: 16,
  },
  mb20: {
    marginBottom: 20,
  },
};
