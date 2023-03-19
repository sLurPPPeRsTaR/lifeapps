import Color from 'ca-config/Color';

export default {
  container: {
    paddingVertical: 24,
  },
  header: {
    container: {
      paddingTop: 16,
      paddingBottom: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 0.75,
      borderBottomColor: Color.grayBorder.light.grayBorder,
    },
  },
  progress: {
    container: {
      flexDirection: 'row',
    },
    date: {
      container: {
        width: 140,
      },
    },
    status: {
      container: {
        alignItems: 'center',
        marginHorizontal: 16,
      },
      dot: {
        dot: {
          width: 15,
          height: 15,
          borderRadius: 100,
        },
        active: {
          backgroundColor: Color.primary.light.primary90,
        },
        inactive: {
          backgroundColor: Color.grayPolisStatus.light.grayPolisStatus,
        },
      },
      line: {
        line: {
          flex: 1,
          width: 1,
          backgroundColor: Color.grayPolisStatus.light.grayPolisStatus,
        },
        last: { flex: 0 },
      },
    },
    deskripsi: {
      container: {
        paddingBottom: 30,
        flexShrink: 1,
      },
    },
  },
};
