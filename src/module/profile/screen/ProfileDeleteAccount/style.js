import Size from 'ca-config/Size';

export default {
  circleImage: {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 30,
    },
    image: {
      width: 113,
      height: 113,
      borderRadius: 100,
    },
  },
  headerContainer: {
    marginBottom: 24,
  },
  listContainer: {
    container: {
      paddingHorizontal: 8,
    },
    row: {
      flexDirection: 'row',
      marginBottom: 16,
    },
    col: {
      flexShrink: 1,
    },
    icon: {
      width: 24,
      height: 24,
      marginEnd: 8,
    },
    title: {
      marginBottom: 8,
    },
  },
  bottom: {
    button: {
      position: 'absolute',
      bottom: 48,
      left: 16,
      right: 16,
    },
  },
  modal: {
    confirmation: {
      container: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        position: 'absolute',
        width: 180,
        height: 180,
        top: -180,
      },
      title: {
        marginHorizontal: 32,
        marginBottom: 16,
      },
      subtitle: {
        marginHorizontal: 32,
        marginBottom: 24,
      },
      button1: {
        marginBottom: 16,
      },
    },
    otpOption: {
      card: {
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 20,
        },
        col: {
          container: {
            flexDirection: 'row',
            alignItems: 'center',
            flexShrink: 1,
          },
          icon: { marginEnd: 8 },
          text: { flexGrow: 1 },
        },
      },
    },
    tooFrequently: {
      container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 75,
      },
      icon: {
        width: 170,
        height: 170,
        position: 'absolute',
        top: -110,
      },
      title: {
        marginHorizontal: 32,
        marginBottom: 8,
      },
      subtitle: {
        marginHorizontal: 32,
        marginBottom: 16,
      },
      button1: {
        marginBottom: 16,
      },
    },
  },
  backgroundImage: {
    flex: 1,
    width: Size.screen.width,
    height: 195,
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 16,
    paddingBottom: 40,
    justifyContent: 'flex-end',
  },

  mb16: { marginBottom: 16 },
};
