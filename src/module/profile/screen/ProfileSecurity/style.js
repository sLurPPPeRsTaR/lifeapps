import Color from 'ca-config/Color';

export default {
  menu: {
    container: {
      paddingTop: 12,
    },
    card: {
      container: {
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
          marginLeft: 10,
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      },
    },
  },
  modal: {
    logout: {
      container: {
        paddingTop: 12,
      },
      title: {
        marginBottom: 8,
      },
      caption: {
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
    forgetPin: {
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
    pinBlocked: {
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
        marginHorizontal: 16,
        marginBottom: 8,
      },
      subtitle: {
        marginHorizontal: 16,
        marginBottom: 16,
      },
      button1: {
        marginBottom: 16,
      },
    },
  },
  mb16: { marginBottom: 16 },
};
