import Color from 'ca-config/Color';

export default {
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    flexGrow: 1,
    // justifyContent: 'space-between',
  },
  headerContainer: {
    alignSelf: 'stretch',
    marginVertical: 40,
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
    success: {
      container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 16,
      },
      icon: {
        marginBottom: 40,
      },
      text1: {
        marginBottom: 8,
      },
      text2: {
        marginBottom: 24,
      },
    },
  },
  mb16: {
    marginBottom: 16,
  },
  mb20: {
    marginBottom: 20,
  },
};
