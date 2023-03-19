import Color from 'ca-config/Color';

export default {
  lang: {
    container: {
      paddingTop: 12,
    },
    subtitle: { marginBottom: 16 },
    card: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        paddingVertical: 12,
        borderWidth: 1,
        borderRadius: 9,
        borderColor: Color.neutral.light.neutral20,
        marginBottom: 16,
      },
      lang: {
        flexDirection: 'row',
      },
      active: {
        // backgroundColor: Color.red.light.red20,
        borderColor: Color.red.light.red90,
      },
      icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
      },
      radioIcon: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: Color.neutral.light.neutral20,
      },
    },
    button: {
      marginTop: 8,
    },
    textContainer: {
      borderBottomWidth: 1,
      paddingHorizontal: 20,
      marginVertical: 20,
      paddingBottom: 20,
      borderBottomColor: Color.grayBorder.light.grayBorder,
    },
  },
  me8: { marginEnd: 8 },
};
