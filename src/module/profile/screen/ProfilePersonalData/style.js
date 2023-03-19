import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  header: {
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 12,
      paddingBottom: 24,
      marginBottom: 16,
    },
    userProfile: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      photo: {
        borderRadius: 100,
      },
      button: {
        width: 20,
        height: 20,
        position: 'absolute',
        bottom: 0,
        right: -12,
      },
    },
  },
  tab: {
    container: {
      backgroundColor: Color.main.light.white,
      flex: 1,
      height: 56,
      borderRadius: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    tab: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 18,
      marginHorizontal: 6,
      borderRadius: 16,
      alignItems: 'center',
    },
  },
  dataKTP: {
    jenisKelamin: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      card: {
        active: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: (Size.screen.width - 48) / 2,
          paddingVertical: 16,
          backgroundColor: Color.grayInput.light.grayInput,
          borderWidth: 1,
          borderColor: Color.grayInput.light.grayInput,
          borderRadius: 16,
        },
        inactive: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: (Size.screen.width - 56) / 2,
          paddingVertical: 16,
          backgroundColor: Color.grayTextInactive.light.grayTextInactive,
          borderWidth: 1,
          borderColor: Color.grayBorder.light.grayBorder,
          borderRadius: 16,
        },
      },
      cardIcon: {
        marginLeft: 12,
      },
    },
    rtRw: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      rt: { flexGrow: 1, marginEnd: 8 },
      rw: { flexGrow: 1, marginStart: 8 },
    },
    notVerified: {
      container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 52,
      },
      image: { width: 216, height: 216 },
      title: { marginBottom: 10 },
    },
  },
  modal: {
    uploadOption: {
      card: {
        container: {
          borderBottomWidth: 1,
          borderBottomColor: Color.grayBorder.light.grayBorder,
          height: 64,
          justifyContent: 'center',
        },
        card: {
          paddingVertical: 12,
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
            marginLeft: 12,
          },
        },
      },
    },
    editPhotoSuccess: {
      container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
      },
      icon: {
        width: 146,
        height: 146,
        position: 'absolute',
        top: -160,
      },
      title: {
        marginBottom: 8,
      },
      subtitle: {
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
        paddingTop: 20,
      },
      icon: {
        width: 170,
        height: 170,
        position: 'absolute',
        top: -160,
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
  mb48: { marginBottom: 48 },
  mb24: { marginBottom: 24 },
  mb20: { marginBottom: 20 },
  mb16: { marginBottom: 16 },
  mb12: { marginBottom: 12 },
  mb8: { marginBottom: 8 },
  mb4: { marginBottom: 4 },
  mx16: { marginHorizontal: 16 },
  flex: { flex: 1 },

  modalSM: {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 10,
    },
    icon: {
      resizeMode: 'contain',
      width: 146,
      height: 146,
      position: 'absolute',
      top: -140,
    },
    text1: {
      paddingVertical: 16,
    },
    button1: {
      marginBottom: 16,
    },
  },
};
