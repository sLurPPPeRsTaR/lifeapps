import { StyleSheet } from 'react-native';

export default {
  root: StyleSheet.create({
    stepContainer: {
      paddingVertical: 24,
    },
  }),

  cardInfo: StyleSheet.create({
    body: {
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'row',
      paddingHorizontal: 11,
    },
    iconContainer: {
      marginRight: 8,
    },
    textContainer: {
      flex: 1,
    },
  }),

  mb16: {
    marginBottom: 16,
  },
  mb24: {
    marginBottom: 24,
  },
  mb4: {
    marginBottom: 4,
  },
};
