import Color from 'ca-config/Color';

export default {
  baseContainer: {
    flex: 1,
    backgroundColor: Color.main.light.white,
    marginTop: 10,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  container: {
    paddingTop: 24,
  },
  kkpmBanner: {
    container: { marginBottom: 16 },
    image: { borderRadius: 16 },
    text: {
      container: { position: 'absolute', top: 16, left: 16 },
    },
  },
  descContainer: {
    marginBottom: 24,
  },
  alertDialogueContainer: {
    marginBottom: 96,
  },
  buttonContainer: {
    marginBottom: 44,
  },
  footer: {
    syaratDanKetentuan: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 12,
    },
    customerCare: {
      backgroundColor: Color.grayBackground.light.color,
      borderRadius: 8,
      padding: 4,
      marginBottom: 20,
    },
  },
  mb24: { marginBottom: 24 },
};
