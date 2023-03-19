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
    marginHorizontal: 16,
    borderRadius: 30,
  },
  header: {
    container: {
      paddingTop: 24,
      paddingBottom: 16,
    },
  },
  progress: {
    container: {
      flexDirection: 'row',
    },
    date: {
      container: {},
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
        },
        active: {
          backgroundColor: Color.primary.light.primary90,
        },
        inactive: {
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
  mb16: { marginBottom: 16 },
  fS1: {
    flexShrink: 1,
  },
};
