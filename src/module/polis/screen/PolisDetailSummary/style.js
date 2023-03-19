import Color from 'ca-config/Color';

export default {
  imageBackground: {
    flex: 1,
    backgroundColor: Color.whiteLifesaverBg.light.color,
    marginTop: -30,
    paddingTop: 30,
  },
  container: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  card: {
    container: { paddingVertical: 24, paddingHorizontal: 16 },
    header: {
      container: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'flex-end',
        flex: 1,
      },
      image: {
        borderRadius: 9,
        width: 56,
        height: 56,
        marginEnd: 16,
      },
      lifeSaverLogo: {
        resizeMode: 'contain',
        width: 97,
        height: 21,
      },
      detailBerlangganan: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      activeBadge: {
        minWidth: 77,
        paddingHorizontal: 8,
        height: 26,
        position: 'absolute',
        right: 0,
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
      },
    },
    content: {
      container: { marginTop: 22, marginBottom: 36 },
      row: { marginBottom: 16 },
      upgradePackageButton: {
        width: 135,
        borderRadius: 8,
      },
    },
    footer: {
      container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 26,
      },
      imageContainer: {
        alignItems: 'center',
      },
      insuredImage: {
        width: 80,
        height: 33,
        resizeMode: 'contain',
        marginTop: 12,
      },
      supportedImage: {
        width: 68,
        height: 44,
        resizeMode: 'contain',
        marginTop: 12,
      },
    },
  },
  progressCard: {
    container: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    activeStatus: { flexDirection: 'row', alignItems: 'center' },
    infoIcon: {
      container: { width: 14, height: 14 },
      icon: { position: 'absolute', bottom: -3 },
    },
  },
  gracePeriodWidget: {
    container: {
      paddingHorizontal: 16,
    },
    header: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 6,
      },
      content: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    },
    content: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
    },
  },
  eCard: {
    container: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    dummy: {
      width: 68,
      height: 44,
      backgroundColor: Color.main.light.white,
      borderRadius: 6,
      marginEnd: 8,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexGrow: 1,
    },
  },
  gracePeriod: {
    warning: {
      flexDirection: 'row',
      backgroundColor: Color.yellowWarning.light.color,
      padding: 16,
      borderRadius: 16,
      marginVertical: 16,
      paddingRight: 30,
    },
  },
  footer: {
    container: {
      backgroundColor: Color.main.light.white,
      padding: 16,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
  },
  flex1: { flex: 1 },
  flexShrink1: { flexShrink: 1 },
  flexGrow1: { flexGrow: 1 },
  me4: { marginEnd: 4 },
  me8: { marginEnd: 8 },
  mb24: { marginBottom: 24 },
  mb16: { marginBottom: 16 },
  my16: { marginVertical: 16 },
  px0: { paddingHorizontal: 0 },
  pt24: { paddingTop: 24 },
  ml10: {
    marginLeft: 10,
  },
  mt10: { marginTop: 10 },
  mb8: { marginBottom: 8 },
};
