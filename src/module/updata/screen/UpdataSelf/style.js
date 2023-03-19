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
  image: {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginTop: 32,
      marginBottom: 16,
    },
    image: { width: 85, height: 114, marginBottom: 4 },
  },
  content: {
    container: {
      backgroundColor: Color.main.light.white,
      borderRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 24,
      justifyContent: 'center',
      marginBottom: 48,
      shadowColor: Color.main.light.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    checkList: { flexDirection: 'row', alignItems: 'flex-start' },
  },

  cobaLagiContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  flexShrink1: { flexShrink: 1 },
  mr16: { marginRight: 16 },
  mb6: { marginBottom: 6 },
  mb16: { marginBottom: 16 },
  mb24: { marginBottom: 24 },
  mb48: { marginBottom: 48 },
  me16: { marginEnd: 16 },
};
