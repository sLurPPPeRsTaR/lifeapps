import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  backgroundContainer: {
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    shadow: {
      marginHorizontal: 16,
    },
    referralFieldContainer: {
      borderColor: Color.primary.light.primary90,
      borderWidth: 1,
      borderRadius: 16,
      marginVertical: 10,
      padding: 13,
      borderStyle: 'dashed',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: Color.grayBackground.light.color,
      alignItems: 'center',
    },
    container: {
      backgroundColor: Color.main.light.white,
    },
    userProfile: {
      container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
      },
      photo: {
        borderRadius: 100,
        marginEnd: 16,
      },
      data: {
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          flexShrink: 1,
        },
        name: { marginBottom: 4, marginRight: 4 },
        nameContainer: {
          flexDirection: 'row',
        },
        email: { marginBottom: 4 },
        phoneNumber: { marginBottom: 4 },
        verificationBadge: {
          flexDirection: 'row',
          borderRadius: 16,
          alignSelf: 'flex-start',
          marginBottom: 4,
        },
        verificationCode: {
          backgroundColor: Color.red.dark.red20,
          marginHorizontal: 4,
          paddingHorizontal: 8,
          borderRadius: Size.screen.height,
        },
      },
    },
    data: {
      flex: 1,
      paddingRight: 4,
    },
  },
  menu: {
    shadow: {
      marginHorizontal: 16,
      marginTop: 24,
    },
    card: {
      container: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: Color.grayBorder.light.grayBorder,
      },
      containerNoBorder: {
        paddingVertical: 16,
      },
      leftIcon: {
        width: 64,
        alignItems: 'center',
        justifyContent: 'center',
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
    imageNotif: { width: 30, height: 30, resizeMode: 'contain' },
  },
  modal: {
    logout: {
      container: {
        paddingTop: 70,
      },
      image: {
        container: {
          position: 'absolute',
          top: -136,
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'center',
        },
        image: { width: 200, height: 200 },
        spacer: { width: 25, height: 200 },
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
  },
  background: {
    width: Size.screen.width,
    height: 180,
  },
  flex: { flex: 1 },
  containerBody: {
    backgroundColor: Color.backgroundHome.light.backgroundHome,
    minHeight: Size.screen.height,
    paddingBottom: 64,
  },
  lilRedCircle: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
  flex1: {
    flex: 1,
  },
  fS1: { flexShrink: 1 },
  mT24: { marginTop: 24 },
  mt16: { marginTop: 16 },
  mxMin16: { marginHorizontal: -16 },
  my10: { marginVertical: 10 },
  flexBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  clips: {
    backgroundColor: Color.abuMuda.light.abuMuda,
    padding: 7,
    borderRadius: 8,
    position: 'absolute',
    right: 0,
    top: -10,
  },
};
