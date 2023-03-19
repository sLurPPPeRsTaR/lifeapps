import Color from 'ca-config/Color';

export default {
  header: {
    container: {
      alignItems: 'center',
      paddingTop: 16,
      paddingHorizontal: 16,
    },
    image: { width: 225, height: 225 },
    title: { marginBottom: 4 },
    subtitle: { marginBottom: 14 },
  },
  section: {
    container: {
      padding: 16,
    },
    header: {
      marginBottom: 10,
    },
    input: {
      marginBottom: 16,
    },
    badgeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      flexWrap: 'wrap',
    },
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
  },
  termsConditions: {
    container: {
      flexDirection: 'row',
      // alignItems: 'center',
      marginBottom: 28,
    },
  },
  footer: {
    container: {
      backgroundColor: Color.greyBackround.light.greyBackground,
      paddingTop: 6,
    },
    boxShadow: {
      shadowColor: Color.neutral.dark.neutral90,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.65,
      shadowRadius: 2.22,
      elevation: 3,
    },
  },

  content: {
    row: {
      flexDirection: 'row',
      marginBottom: 6,
    },
    col: {
      flex: 1,
    },
  },

  my10: { marginVertical: 10 },
  my20: { marginVertical: 20 },
  mt4: { marginTop: 4 },
  mt12: { marginTop: 12 },
  mt18: { marginTop: 18 },
  mb10: { marginBottom: 10 },
  mb12: { marginBottom: 12 },
  mb18: { marginBottom: 18 },
  mb42: { marginBottom: 42 },
  pb16: { paddingBottom: 16 },
  fS1: { flexShrink: 1 },
  flex1: { flex: 1 },
  mE12: { marginEnd: 4 },

  py16: { paddingVertical: 16 },
};
