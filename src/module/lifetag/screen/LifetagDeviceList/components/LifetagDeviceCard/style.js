import Color from 'ca-config/Color';

export default {
  container: {
    padding: 16,
  },
  header: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: 16,
      backgroundColor: Color.grayBorder.light.grayBorder,
      marginLeft: 12,
    },
    content: {
      flex: 1,
      paddingLeft: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  dash: {
    paddingTop: 9,
    paddingBottom: 12,
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
  flex1: { flex: 1 },
  flexShrink1: { flexShrink: 1 },
};
