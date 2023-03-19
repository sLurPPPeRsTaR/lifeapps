import Color from 'ca-config/Color';

export default {
  imageBackground: {
    flex: 1,
    backgroundColor: Color.whiteLifesaverBg.light.color,
    marginTop: -30,
    paddingTop: 30,
  },
  mt10: {
    marginTop: 10,
  },
  mb18: {
    marginBottom: 18,
  },
  mb32: {
    marginBottom: 32,
  },
  ph16: {
    paddingHorizontal: 16,
  },
  height30: {
    height: 30,
  },
  alignItemsCenter: {
    alignItems: 'center',
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
  dataList: {
    grid: {
      marginHorizontal: 16,
    },
    row: {
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
    },
  },
};
