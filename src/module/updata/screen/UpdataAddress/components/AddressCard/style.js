import Color from 'ca-config/Color';

export default {
  card: {
    container: {
      backgroundColor: Color.main.light.white,
      borderRadius: 16,
    },
    content: {
      container: {
        minHeight: 88,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Color.main.light.white,
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 12,
      },
      leftContainer: {
        alignItems: 'flex-start',
        flexShrink: 1,
      },
      rightContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
      },
    },
    footer: {
      container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        marginHorizontal: 12,
        borderTopWidth: 0.75,
        borderTopColor: Color.grayHeader.light.grayHeader,
      },
    },
    shadow: {
      shadowColor: Color.neutral.light.neutral10,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
  },

  radio: {
    container: {
      inactive: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: 20,
        borderWidth: 0.75,
        borderColor: Color.neutral.light.neutral20,
        borderRadius: 10,
        margin: 2,
      },
      active: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: 20,
        borderWidth: 0.75,
        borderColor: Color.primary.light.primary90,
        borderRadius: 10,
        margin: 2,
      },
    },
    button: {
      inactive: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: Color.main.light.white,
      },
      active: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: Color.primary.light.primary90,
      },
    },
  },

  mb16: { marginBottom: 16 },
};
