import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  renderContent: {
    container: { justifyContent: 'center', alignItems: 'center' },
    dialogueContainer: {
      backgroundColor: Color.reEkycAlertDialogueColor.light.color,
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dialogueListContainer: {
      flexDirection: 'row',
      flex: 1,
      alignSelf: 'flex-start',
      marginStart: 24,
    },
    dialogueTextContainer: {
      marginHorizontal: 28,
      flexDirection: 'row',
    },
    imgSize: { width: 237, height: 172, resizeMode: 'contain', marginTop: 32 },
  },

  mR7: { marginRight: 7 },
  pV28: { paddingVertical: 28 },
  row: { flexDirection: 'row' },
  pT16: { paddingTop: 16 },
  pB24: { paddingBottom: 24 },
  pV8: { paddingVertical: 8 },
  pB48: { paddingBottom: 48 },
  flex: { flex: 1 },
  flexShrink1: { flexShrink: 1 },
  mB24: { marginBottom: 24 },
  mV8: { marginVertical: 8 },
  mT32: { marginTop: 32 },
  mT5: { marginTop: 5 },
};
