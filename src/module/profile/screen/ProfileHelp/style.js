import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  me16: {
    marginEnd: 16,
  },
  mb16: {
    marginBottom: 16,
  },
  header: {
    wrapper: {
      alignItems: 'center',
    },
    container: {
      paddingHorizontal: 15,
      paddingTop: 15,
      paddingBottom: 10,
      width: Size.screen.width * 0.9,
      borderColor: Color.grayBorderProfile.light.grayBorderProfile,
      backgroundColor: Color.main.light.white,
      borderRadius: 16,
      overflow: 'hidden',
    },
    image: {
      flex: 1,
      width: '100%',
      height: (Size.screen.width / 375) * 160,
      marginBottom: 10,
      borderRadius: 15,
    },
    imageText: {
      position: 'absolute',
      left: Size.screen.width * 0.03,
      top: (Size.screen.width / 375) * 30,
      width: Size.screen.width,
    },
    card: {
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      },
      card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color.main.light.white,
        borderRadius: 8,
        alignSelf: 'stretch',
      },
    },
  },
  content: {
    list: {
      container: {},
      card: {
        container: {
          paddingHorizontal: 8,
          paddingVertical: 12,
          marginBottom: 16,
          borderBottomWidth: 1,
          borderColor: Color.grayBorderProfile.light.grayBorderProfile,
        },
        question: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        text: {
          marginVertical: 16,
          flexShrink: 1,
        },
        icon: {
          marginHorizontal: 4,
        },
      },
    },
  },
  headerContainerStyleActive: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 16,
    backgroundColor: Color.primary.light.primary90,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
  headerContainerStyle: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 16,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bordered: {
    borderBottomWidth: 1,
    borderColor: Color.grayBorderProfile.light.grayBorderProfile,
  },
  notFoundContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Size.screen.height / 5,
  },
  mB12: { marginBottom: 12 },
  mt16: {
    marginTop: 16,
  },
};
