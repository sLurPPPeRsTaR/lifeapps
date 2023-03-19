import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  container: { paddingVertical: 24 },
  card: {
    container: {
      backgroundColor: Color.main.light.white,
      borderRadius: 16,
    },
    content: {
      container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Color.main.light.white,
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 12,
      },
      leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
  footer: {
    container: {
      paddingBottom: 48,
    },
  },
  button: {
    tambahRekening: {
      container: {
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.main.light.white,
        borderRadius: 16,
        paddingVertical: 8,
        paddingHorizontal: 16,
        shadowColor: Color.main.light.black,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
      },
    },
  },
  ms12: { marginStart: 12 },
  mb4: { marginBottom: 4 },
  mb8: { marginBottom: 8 },
  mb16: { marginBottom: 16 },
  pb24: { paddingBottom: 24 },
};
