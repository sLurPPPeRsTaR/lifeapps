import Color from 'ca-config/Color';

export default {
  card: {
    container: {
      padding: 16,
    },
    label: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
    },
  },
  errorCard: {
    borderColor: Color.primary.light.primary90,
    borderWidth: 1,
    borderRadius: 16,
  },
  mb16: { marginBottom: 16 },
};
