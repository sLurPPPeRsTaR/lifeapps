import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  pageContainer: {
    flex: 1,
    backgroundColor: Color.whiteCard.light.color,
  },

  renderHeaderContainer: {
    header: {
      container: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      animatedContainer: {
        top: -50,
        paddingTop: 50,
      },
    },
    containerInverse: {
      position: 'absolute',
      backgroundColor: Color.transparent.light.transparent,
      zIndex: 1,
    },
    containerWhite: {
      position: 'absolute',
      backgroundColor: 'rgba(255,255,255,0.25)',
      zIndex: 1,
    },
  },

  renderSliderSwipper: {
    sliderSwipper: {
      container: {
        width: Size.screen.width,
        height: (Size.screen.width * 250) / 375,
      },
      scrollViewSize: {
        width: Size.screen.width,
        height: (Size.screen.width * 250) / 375,
      },
      imgSize: {
        width: Size.screen.width,
        aspectRatio: 1.5,
        resizeMode: 'cover',
      },
      imgSizeClosed: {
        width: Size.screen.width,
        height: (Size.screen.width * 1280) / 905,
        opacity: 0.1,
      },
      floatingDot: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        alignSelf: 'center',
      },
      dotActive: { margin: 3, color: Color.eventDotActive.light.color },
      dotInActive: { margin: 3, color: Color.eventDotInActive.light.color },
      floatingTicket: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        backgroundColor: Color.ticketContainerBg.light.color,
      },
      floatingTicketExpired: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        backgroundColor: Color.badgeMagenta.light.badgeMagenta,
      },
      bgGrey: {
        width: Size.screen.width,
        height: (Size.screen.width * 1280) / 905,
        position: 'absolute',
        backgroundColor: Color.eventGreyBgColor.light.color,
      },
    },
  },

  renderHeader: {
    container: { paddingVertical: 10 },
    schedule: { flexDirection: 'row' },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 18,
      marginRight: 12,
    },
    eventType: {
      marginTop: 12,
    },
    mL5: { marginLeft: 5 },
    mL18: { marginLeft: 18 },
  },

  renderMain: {
    ListAccordion: {
      header: {
        content: { flexDirection: 'row', alignItems: 'center' },
        text: { marginLeft: 5, marginTop: 5 },
      },
      headerActive: {
        content: { flexDirection: 'row', alignItems: 'center' },
        text: { marginLeft: 5, marginTop: 5 },
      },
      listContent: {
        content1: {
          container: { paddingHorizontal: 16, paddingVertical: 12 },
          imgContainer: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginVertical: 16,
          },
          shadowBorderSize: { height: 68, width: 111 },
          imgText: {
            height: 68,
            width: 111,
            justifyContent: 'center',
            alignItems: 'center',
          },
        },
        content2: {
          container: {
            marginRight: 8,
            alignItems: 'center',
            width: Size.screen.width * 0.26,
          },
          mapSize: {
            width: Size.screen.width - 34,
            height: Size.screen.height * 0.2,
            borderRadius: 30,
            marginVertical: 16,
          },
          roundImgSize: {
            width: 90,
            height: 90,
            borderRadius: 150 / 2,
            overflow: 'hidden',
          },
        },
      },
    },
  },

  renderFooter: {
    lifeSAVERwhiteContainer: {
      paddingHorizontal: 30,
      paddingVertical: 16,
      backgroundColor: Color.primary.light.primary90,
      borderTopLeftRadius: 13,
      borderTopRightRadius: 13,
    },
    hitbyCar: {
      hitbyCarContainer: {
        flexDirection: 'row',
        marginTop: 8,
      },
      mH16: { marginHorizontal: 16 },
    },
    ListAccordion: {
      pV12: { paddingVertical: 12 },
      cardContainer: {
        flexDirection: 'row',
        marginVertical: 16,
      },
      mH16: { marginHorizontal: 16 },
      mB5: { marginBottom: 5 },
      mL16: { marginLeft: 16 },
      mT24: { marginTop: 24 },
      container: {
        borderBottomLeftRadius: 13,
        borderBottomRightRadius: 13,
        paddingHorizontal: 16,
        paddingTop: 16,
      },
      freeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12,
      },
      freeLifeSAVERContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 16,
      },
      mB24: { marginBottom: 24 },
    },
  },

  gapDash1: {
    width: Size.screen.width,
    height: 10,
    marginTop: 8,
    marginLeft: -50,
  },

  headerContainerStyleActive: {
    marginTop: 16,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
  },
  headerContainerStyle: {
    marginTop: 16,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
  },

  headerActive: {
    position: 'absolute',
    top: -22,
    left: -10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    width: Size.screen.width - 32,
  },

  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  shadow: {
    backgroundColor: Color.main.light.white,
    shadowColor: Color.main.light.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  renderEventCodeModal: {
    waveImg: {
      position: 'absolute',
      bottom: -120,
    },
  },
  btnHeaderCircle: {
    backgroundColor: Color.main.light.white,
    padding: 5,
    borderRadius: 20,
  },
  protectionImg: { width: 50, height: 50 },
  fontStyleItalic: { fontStyle: 'italic' },
  fS1: { flexShrink: 1 },
  mT20: { marginTop: 20 },
  mT16: { marginTop: 16 },
  mT10: { marginTop: 10 },
  flex: { flex: 1 },
  mB5: { marginBottom: 5 },
  mB8: { marginBottom: 8 },
  mB16: { marginBottom: 16 },
  mB20: { marginBottom: 20 },
  mT8: { marginTop: 8 },
  mV8: { marginVertical: 8 },
  bGColor: { backgroundColor: Color.whiteBackground.light.whiteBackground },
  pV8: { paddingVertical: 8 },
  pT10: { paddingTop: 10 },
  pT16: { paddingTop: 16 },
  pV10: { paddingVertical: 10 },
  pV16: { paddingVertical: 16 },
  pB10: { paddingBottom: 10 },
  pB16: { paddingBottom: 16 },
  pH16: { paddingHorizontal: 16 },
  pB50: { paddingBottom: 50 },
  mH20: { marginHorizontal: 20 },
  mT30: { marginTop: 30 },
  pB30: { paddingBottom: 30 },
  mB10: { marginBottom: 10 },
};
