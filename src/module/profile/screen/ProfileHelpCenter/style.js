import Color from 'ca-config/Color';

export default {
  py16: {
    paddingVertical: 16,
  },
  header: {
    container: {
      paddingVertical: 16,
      marginBottom: 16,
      borderBottomWidth: 0.75,
      borderBottomColor: Color.grayBorder.light.grayBorder,
    },
    title: {
      marginBottom: 8,
    },
  },
  content: {
    customerService: {
      icon: {
        marginEnd: 16,
      },
      cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingStart: 4,
        paddingEnd: 8,
        paddingBottom: 20,
        borderColor: Color.grayBorder.light.grayBorder,
        borderBottomWidth: 0.75,
        height: 60,
        marginBottom: 24,
      },
    },
  },
};
