import Color from 'ca-config/Color';

export default {
  container: {
    marginBottom: 24,
    borderRadius: 24,
  },
  package: {
    headerActive: {
      padding: 16,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
    },
    headerInactive: {
      padding: 16,
      backgroundColor: Color.mediumLightGray.light.mediumLightGray,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 8,
    },
    desc: {
      padding: 16,
    },
    paketAnda: {
      position: 'absolute',
      backgroundColor: Color.badgeGreen.light.badgeGreen40,
      borderRadius: 5,
      alignSelf: 'center',
      padding: 5,
      paddingHorizontal: 16,
      zIndex: 1,
    },
  },
  mt24: { marginTop: 24 },
  pt16: { paddingTop: 16 },
};
