import Color from 'ca-config/Color';

export default {
  container: {
    paddingVertical: 24,
  },
  steps: {
    container: {
      backgroundColor: Color.main.light.white,
      paddingVertical: 20,
      paddingHorizontal: 16,
      borderRadius: 30,
      shadowColor: Color.main.light.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    step: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
      },
      line: {
        active: {
          flex: 1,
          height: 2,
          borderRadius: 2 * 0.5,
          marginHorizontal: 4,
          backgroundColor: Color.primary.light.primary90,
        },
        inactive: {
          flex: 1,
          height: 2,
          borderRadius: 2 * 0.5,
          marginHorizontal: 4,
          backgroundColor: Color.neutral.light.neutral20,
        },
      },
    },
  },
  accordion: {
    container: {
      marginBottom: 16,
    },
    header: {
      paddingHorizontal: 0,
      borderBottomWidth: 1,
    },
    headerContainer: { flexDirection: 'row', alignItems: 'center' },
    content: {
      paddingTop: 16,
      paddingBottom: 24,
    },
    deleteButton: {
      container: { alignItems: 'flex-end', marginBottom: 16 },
      deleteButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 16,
      },
    },
  },
  dataAnak: {
    header: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
      },
      label: {
        container: { flexDirection: 'row', alignItems: 'center' },
        indicator: {
          width: 20,
          height: 20,
          backgroundColor: Color.primary.light.primary90,
          borderRadius: 10,
          marginEnd: 8,
        },
      },
      button: {
        width: 20,
        height: 20,
        borderWidth: 0.75,
        borderColor: Color.neutral.light.neutral20,
        borderRadius: 10,
      },
    },
  },
  modal: {
    noChange: {
      container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
      },
      image: {
        container: {
          position: 'absolute',
          top: -180,
        },
        image: {
          width: 244,
          height: 244,
        },
      },
      title: { marginBottom: 16 },
      subtitle: { marginBottom: 24 },
      reviewRow: {
        container: {
          alignSelf: 'flex-start',
          marginBottom: 16,
        },
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 8,
        },
      },
    },
    invalidNIK: {
      container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
      },
      image: { width: 225, height: 225, position: 'absolute', top: -190 },
      title: { marginBottom: 16 },
      subtitle: { marginBottom: 24 },
    },
    deleteConfirmation: {
      container: { alignItems: 'center', paddingTop: 20 },
      image: {
        position: 'absolute',
        top: -180,
        width: 196,
        height: 196,
        resizeMode: 'contain',
      },
      text: { marginBottom: 24 },
      button: { marginBottom: 16 },
    },
  },
  radioButton: {
    radioButtonContainer: {
      backgroundColor: Color.main.light.white,
      // elevation: 4,
      height: 56,
      marginTop: 1,
      marginBottom: 2,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor: Color.grayInput.light.grayInput,
      paddingHorizontal: 10,
      borderRadius: 16,
    },
    radioButtonContent: {
      width: 18,
      height: 18,
      borderWidth: 1.5,
      borderColor: Color.borderButtonGray.dark.borderButtonGray,
      borderRadius: 100,
      marginEnd: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    radioButtonCircle: {
      width: 10,
      height: 10,
      borderRadius: 100,
      backgroundColor: Color.primary.light.primary90,
    },
    radioButtonInputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  dropDown: {
    container: {
      paddingBottom: 48,
    },
    item: {
      height: 50,
      flexShrink: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 9,
      paddingHorizontal: 16,
      borderBottomWidth: 0.75,
      borderBottomColor: Color.grayBorder.light.grayBorder,
      marginBottom: 12,
    },
    icon: { marginEnd: 12 },
  },
  footer: {
    container: { paddingVertical: 16 },
    button: { marginBottom: 16 },
  },
  alignItemsCenter: { alignItems: 'center' },
  flexDirectionRow: { flexDirection: 'row' },
  py16: { paddingVertical: 16 },
  mb4: { marginBottom: 4 },
  mb48: { marginBottom: 48 },
  mb16: { marginBottom: 16 },
  mt6: { marginTop: 6 },
  me4: { marginEnd: 4 },
  me8: { marginEnd: 8 },
  me16: { marginEnd: 16 },
};
