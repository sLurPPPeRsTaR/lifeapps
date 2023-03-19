import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  form: {
    container: {
      marginTop: 16,
      flex: 1,
    },
    imageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkButton: {
      width: 104,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 16,
    },
    checkButtonDisabled: {
      width: 104,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Color.neutral.light.neutral20,
      borderRadius: 16,
    },
    image: {
      width: 170,
      height: 170,
    },
  },

  listContainer: {
    paddingVertical: 5,
    paddingLeft: 10,
    backgroundColor: Color.pink.light.pink10,
    borderRadius: 10,
    marginRight: 5,
    flexDirection: 'row',
    marginTop: 6,
    marginBottom: 5,
    alignItems: 'center',
  },
  listContainerActive: {
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: Color.primary.light.primary90,
    borderRadius: 10,
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    marginBottom: 5,
    alignItems: 'center',
  },
  listContainerIcon: {
    width: 35,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchCard: {
    container: { marginHorizontal: 16, marginTop: 25, marginBottom: 3 },
    searchContainer: {
      borderRadius: 18,
      borderWidth: 1,
      borderColor: Color.neutral.light.neutral20,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 10,
      marginBottom: 7,
    },
    searchContainerError: {
      borderRadius: 18,
      borderWidth: 1,
      borderColor: Color.primary.light.primary90,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 10,
      marginBottom: 7,
    },
    searchBtn: {
      marginRight: 5,
      width: 44,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      margin: 5,
    },
  },
  listItem: {
    container: {
      height: 67,
      backgroundColor: Color.main.light.white,
      borderRadius: 16,
      alignItems: 'center',
      paddingHorizontal: 20,
      flexDirection: 'row',
    },
    containerError: {
      height: 67,
      // borderColor: Color.primary.light.primary90,
      // borderWidth: 1,
      borderRadius: 16,
      alignItems: 'center',
      paddingHorizontal: 20,
      flexDirection: 'row',
      backgroundColor: Color.backgroundHome.light.backgroundHome,
    },
    send: {
      width: 50,
      height: 40,
      alignItems: 'center',
      justifyContent: 'flex-end',
      flexDirection: 'row',
    },
  },
  shareButton: {
    container: {
      backgroundColor: Color.main.light.white,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    button: {
      flexGrow: 1,
      margin: 20,
      height: 45,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 16,
      width: Size.screen.width - 30,
      maxWidth: 400,
      flexDirection: 'row',
    },
    btnImage: {
      width: 17,
      marginHorizontal: 10,
    },
  },

  noInvite: {
    image: {
      width: 220,
      height: 220,
    },
  },
  flatList: {
    margin: 10,
    marginTop: 20,
    paddingBottom: 25,
  },
  textInput: {
    color: Color.neutral.light.neutral90,
    fontSize: Size.text.body2.size,
    fontFamily: Size.fontFamily.medium,
    lineHeight: 18,
    flex: 1,
  },
  fx1: { flex: 1 },
  mv15: { marginVertical: 15 },
  m5: { margin: 5 },
  m16: { margin: 16 },
  m25: { margin: 25 },
  mb16: { marginBottom: 16 },
  mb5: { marginBottom: 5 },
  center: { alignItems: 'center', justifyContent: 'center' },

  errorContainer: {
    marginBottom: 15,
    marginHorizontal: 10,
  },
  lifeSaverLogo: {
    width: 95,
    height: 17,
  },
  lifeSaverLogoPlus: {
    width: 100,
    height: 16,
  },
  lifeSaverPOS: {
    width: 102,
    height: 16,
  },
  alerBackground: {
    backgroundColor: Color.grayBackgroundLoading.light.grayBackgroundLoading,
    margin: 15,
  },

  modal: {
    dialogHeader: {
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
  },

  invitationSuccess: {
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Color.main.light.white,
    },
    textContainer: {
      width: 250,
      marginTop: 10,
    },
  },
  reloadBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  scrollView: {
    maxHeight: 150,
  },
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
};
