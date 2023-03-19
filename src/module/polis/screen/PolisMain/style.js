import Color from 'ca-config/Color';

export default {
  backgroundContainer: {
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
  },
  container: {
    marginTop: 16,
    flexGrow: 1,
    paddingBottom: 64,
  },
  padder: {
    container: {
      paddingTop: 18,
    },
  },
  flexShrink1: {
    flexShrink: 1,
  },
  header: {
    container: { alignItems: 'center', marginBottom: 16 },
    content: {
      backgroundColor: Color.main.light.white,
      paddingHorizontal: 40,
      paddingVertical: 12,
      borderRadius: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: { marginEnd: 12 },
  },
  polisCard: {
    containerTab: {
      flexWrap: 'wrap',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cardBackground: {
      width: 200,
      height: 200,
      position: 'absolute',
      left: 0,
      bottom: 0,
      opacity: 0.8,
    },
    loading: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    sectionContainer: {
      backgroundColor: Color.main.light.white,
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderBottomWidth: 1,
      borderBottomColor: Color.grayBorder.light.grayBorder,
    },
    card: {
      borderRadius: 24,
      borderWidth: 1,
      borderColor: Color.grayCardIndicator.light.grayIndicator,
    },
    cardTab: {
      borderRadius: 24,
      borderWidth: 1,
      borderColor: Color.grayCardIndicator.light.grayIndicator,
    },
    content: {
      container: {
        paddingVertical: 20,
        paddingHorizontal: 16,
      },
      header: {
        container: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 8,
          marginEnd: 56 + 4 - 16,
        },
        image: {
          width: 24,
          height: 24,
          resizeMode: 'contain',
          marginEnd: 12,
        },
      },
      policyNo: {
        marginBottom: 6,
      },
      benefitValue: {
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 6,
        },
        value: { marginEnd: 4 },
      },
      date: {
        flexDirection: 'row',
        marginBottom: 12,
      },
      badgeClientCode: {
        justifyContent: 'center',
        backgroundColor: Color.badgePink.light.badgePink,
        borderRadius: 16,
        paddingHorizontal: 14,
        paddingVertical: 5,
      },
      pengkinianButton: {
        container: { marginTop: 25 },
        button: {
          borderWidth: 1,
          borderColor: Color.primary.light.primary20,
          borderRadius: 9,
          padding: 10,
          alignItems: 'center',
          backgroundColor: Color.main.light.white,
        },
      },
    },
  },
  alertCard: {
    container: {
      minHeight: 280,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 32,
      paddingBottom: 40,
      marginHorizontal: 8,
      marginTop: 50,
      borderRadius: 9,
    },
    image: {
      width: 150,
      height: 150,
      marginBottom: 8,
    },
    title: {
      marginBottom: 8,
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

  modal: {
    UpdataAnuitasPrima: {
      container: { paddingTop: 74, alignItems: 'center' },
      image: {
        width: 150,
        height: 150,
        position: 'absolute',
        top: -100,
      },
      title: { marginBottom: 16 },
      subtitle: { marginBottom: 24 },
    },
  },

  badge: {
    container: {
      flexDirection: 'row',
      paddingTop: 12,
      flexWrap: 'wrap',
    },
    badge: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      minWidth: 80,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: Color.badgeMagenta.light.badgeMagenta,
      marginHorizontal: 4,
      marginVertical: 4,
    },
  },

  filterBadge: {
    container: {
      maxHeight: 50,
      alignItems: 'center',
    },
    filterCounter: {
      width: 18,
      height: 18,
      backgroundColor: Color.primary.light.primary90,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      marginEnd: 6,
    },
  },

  policyNotFound: {
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: { width: 175, height: 175 },
  },

  me6: { marginEnd: 6 },
  me8: { marginEnd: 8 },
  mb4: { marginBottom: 4 },
  mb16: { marginBottom: 16 },
  mb24: { marginBottom: 24 },
  pe16: { paddingEnd: 16 },
  ps16: { paddingStart: 16 },
  flex: { flex: 1 },
  mV16: { marginVertical: 16 },
  mV12: { marginVertical: 12 },
  flexDirectionRow: { flexDirection: 'row' },
  alignItemsCenter: { alignItems: 'center' },
  justifyContentSpaceBetween: { justifyContent: 'space-between' },
};
