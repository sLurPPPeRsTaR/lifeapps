import { StyleSheet } from 'react-native';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';

export default StyleSheet.create({
  header: {
    width: Size.screen.width,
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImage: {
    position: 'relative',
    marginTop: -70,
    width: 116,
    height: 116,
    resizeMode: 'contain',
  },
  headerTextContainer: {
    marginVertical: 20,
  },
  headerText: {
    textAlign: 'center',
    fontSize: Size.text.h6.size,
    color: Color.neutral.dark.neutral80,
    lineHeight: 28,
    maxWidth: 280,
  },
  closeIcon: {
    position: 'absolute',
    left: 16,
    borderRadius: 15,
    backgroundColor: Color.lightGray.light.lightGray,
  },
  horizontalLinePadder: {
    marginVertical: 5,
    paddingHorizontal: 0,
  },
  mt36: {
    marginTop: 36,
  },
  mt16: {
    marginTop: 16,
  },
  mbMin16: {
    marginBottom: -16,
  },
  br16: {
    borderRadius: 16,
  },
  mr10: {
    marginRight: 10,
  },
  mt10: {
    marginTop: 10,
  },
  ml10: {
    marginLeft: 10,
  },
});
