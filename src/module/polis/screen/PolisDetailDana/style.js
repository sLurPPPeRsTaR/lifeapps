import Color from 'ca-config/Color';

export default {
  imageBackground: {
    flex: 1,
    backgroundColor: Color.whiteLifesaverBg.light.color,
    marginTop: -30,
    paddingTop: 30,
  },
  mb18: {
    marginBottom: 18,
  },
  mb32: {
    marginBottom: 32,
  },
  mt16: {
    marginTop: 16,
  },
  container: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  listAccordion: {
    headerContainerStyle: {
      height: 41,
      paddingVertical: 0,
      paddingHorizontal: 0,
      alignItems: 'flex-start',
      borderBottomWidth: 1,
      borderBottomColor: Color.grayBorder.light.grayBorder,
    },
    headerContainerStyleActive: {
      height: 41,
      paddingVertical: 0,
      paddingHorizontal: 0,
      alignItems: 'flex-start',
      borderBottomWidth: 0,
    },
    container: {},
    content: {
      paddingVertical: 24,
      backgroundColor: Color.main.light.white,
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
  },
  dataListRow: {
    grid: {
      marginHorizontal: 16,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    col: {
      key: {
        // flex: 1,
      },
      value: {
        // flex: 1,
      },
    },
  },
  dataListCol: {
    grid: {
      marginHorizontal: 16,
    },
    row: {
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    col: {
      key: {
        flex: 1,
        marginBottom: 7,
      },
      value: {
        flex: 1,
      },
    },
  },
  dataList: {
    grid: {
      marginHorizontal: 16,
    },
    detail: { marginBottom: 8 },
    row: {
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    rowRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    col: {
      key: {
        flex: 1,
        marginBottom: 2,
      },
      value: {
        flex: 1,
      },
      valueRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
      },
    },
  },
  ms4: {
    marginStart: 4,
  },
  mb16: { marginBottom: 16 },
};
