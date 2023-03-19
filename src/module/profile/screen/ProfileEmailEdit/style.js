export default {
  container: {
    paddingVertical: 24,
  },
  header: {
    container: { marginBottom: 16 },
  },
  content: {
    container: {
      marginBottom: 8,
    },
    input: {
      container: {
        marginBottom: 16,
      },
    },
  },
  footer: {
    container: {
      paddingBottom: 48,
    },
  },
  modal: {
    success: {
      container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
      },
      icon: {
        position: 'absolute',
        top: -150,
        width: 128,
        height: 146,
        resizeMode: 'contain',
      },
      text: {
        marginBottom: 24,
      },
    },
    tooFrequently: {
      container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 75,
      },
      icon: {
        width: 170,
        height: 170,
        position: 'absolute',
        top: -110,
      },
      title: {
        marginHorizontal: 32,
        marginBottom: 8,
      },
      subtitle: {
        marginHorizontal: 32,
        marginBottom: 16,
      },
      button1: {
        marginBottom: 16,
      },
    },
  },
};
