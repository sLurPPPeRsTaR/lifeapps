import Color from 'ca-config/Color';

export default {
  wrapper: {
    paddingVertical: 24,
  },
  headerContainer: {
    alignSelf: 'stretch',
    marginVertical: 20,
    marginBottom: 5,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    paddingBottom: 15,
    borderBottomColor: Color.grayBorderProfile.light.grayBorderProfile,
  },
  headerTitle: {
    marginBottom: 6,
  },
  forgotPasswordContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 4,
    marginBottom: 24,
  },
  mb16: {
    marginBottom: 16,
  },
  pb16: { paddingBottom: 16 },
  mb40: { marginBottom: 40 },
  successModal: {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 20,
    },
    icon: {
      width: 146,
      height: 146,
      marginBottom: 24,
      position: 'absolute',
      top: -150,
      resizeMode: 'contain',
    },
    text1: {
      marginBottom: 6,
      marginHorizontal: 20,
    },
    text2: {
      marginBottom: 24,
      marginHorizontal: 24,
    },
  },
  fS1: { flexShrink: 1 },
};
