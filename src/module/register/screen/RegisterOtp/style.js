import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hiddenInput: {
    position: 'absolute',
    width: 0,
    height: 0,
  },
  title: {
    container: {
      marginBottom: 16,
    },
    title: { marginBottom: 4 },
  },
  input: {
    line: {
      width: 48,
      height: 56,
      borderWidth: 1,
      borderRadius: 9,
      borderColor: Color.neutral.light.neutral20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    lineTab: {
      width: 48,
      height: 56,
      borderWidth: 1,
      borderRadius: 9,
      borderColor: Color.neutral.light.neutral20,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 20,
    },
    container: {
      paddingVertical: 4,
      paddingHorizontal: 8,
    },
    grouper: {
      alignItems: 'stretch',
    },
    innerGrouper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    innerGrouperTab: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorMsg: {
      marginTop: 8,
    },
    active: {
      borderWidth: 1.5,
    },
    error: {
      borderColor: Color.primary.light.primary90,
    },
  },
  time: {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 6.5,
      paddingVertical: 10,
    },
    clock: {
      container: {
        flexDirection: 'row',
      },
      loading: {
        marginEnd: 3.5,
      },
    },
  },
  footer: {
    container: {
      flex: 1,
      width: Size.screen.width,
      height: 195,
      position: 'absolute',
      bottom: 0,
      paddingHorizontal: 16,
      paddingBottom: 40,
      justifyContent: 'flex-end',
    },
    step: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    loading: {
      container: {
        height: 20,
        backgroundColor: Color.grayCard.light.grayCard,
        borderRadius: 12,
      },
      step: {
        height: 20,
        alignSelf: 'stretch',
        backgroundColor: Color.primary.light.primary90,
        borderRadius: 12,
      },
    },
  },
  flex: {
    flex: 1,
  },
  modal: {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 80,
    },
    icon: {
      position: 'absolute',
      top: -80,
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
  },
};
