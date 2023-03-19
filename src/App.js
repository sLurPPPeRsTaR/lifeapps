import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { sagaMiddleware, store, persistor } from 'ca-config/Store';
import codePush from 'react-native-code-push';
import 'react-native-gesture-handler';
import ErrorBoundary from 'ca-component-container/ErrorBoundary';
import bootstrapSaga from 'ca-bootstrap/bootstrapSaga';
import Bootstrap from 'ca-bootstrap/Bootstrap/index';
import AppNavigator from 'ca-navigation/AppNavigator';
import { LogBox, View, Image, TouchableOpacity } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Text from 'ca-component-generic/Text';
import { Color, Size } from 'ca-config/index';
import { SafeAreaView } from 'react-native-safe-area-context';
import { JamPasir, LoadingLifeId } from 'ca-config/Image';
import {
  setIsProgressCodePush,
  setStatusCodePush,
} from 'ca-bootstrap/bootstrapAction';
import Button from 'ca-component-generic/Button';
import CircularProgress from 'ca-component-generic/CircularProgress';
import { ArrowLeft, ArrowRight } from 'ca-config/Svg';
import { TYPE } from 'ca-util/constant';
import isEmpty from 'lodash/isEmpty';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  "Parse Error. Your app's play store page doesn't seem to have latest app version info.",
  "Property 'AFLogEvent' doesn't exist",
]);

sagaMiddleware.run(bootstrapSaga);
const codePushOptions = {
  checkFrequency: isEmpty(TYPE)
    ? codePush.CheckFrequency.ON_APP_RESUME
    : codePush.CheckFrequency.MANUAL,
  installMode: codePush.InstallMode.IMMEDIATE,
};
class App extends Component {
  constructor(props) {
    super(props);
    const { lang } = store.getState().auth;
    this.state = {
      receivedBytes: 0,
      totalBytes: 0,
      status: 0,
      fullProgress: Size.screen.width - 32,
      isCodepushModalVisible: false,
      isCodepushWidgetVisible: false,
      lang,
    };
    this.renderProgress = this.renderProgress.bind(this);
    this.renderCodepushWidget = this.renderCodepushWidget.bind(this);
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  componentDidUpdate(prevProps, prevState) {
    const { status } = this.state;
    if (prevState.status !== status) {
      store.dispatch(
        setIsProgressCodePush(
          status === codePush.SyncStatus.DOWNLOADING_PACKAGE ||
            status === codePush.SyncStatus.INSTALLING_UPDATE
        )
      );
      store.dispatch(
        setStatusCodePush(
          status === codePush.SyncStatus.UPDATE_INSTALLED ||
            status === codePush.SyncStatus.UP_TO_DATE
        )
      );
      this.setState({
        isCodepushModalVisible:
          status === codePush.SyncStatus.DOWNLOADING_PACKAGE ||
          status === codePush.SyncStatus.INSTALLING_UPDATE,
      });
    }
  }

  codePushStatusDidChange(status) {
    switch (status) {
      case codePush.SyncStatus.UPDATE_INSTALLED:
        this.setState({
          status: status,
          receivedBytes: 0,
          totalBytes: 0,
        });
        break;
      default:
        this.setState({ status });
    }
  }

  codePushDownloadDidProgress(progress) {
    this.setState({
      receivedBytes: Number(progress.receivedBytes / 1000000),
      totalBytes: Number(progress.totalBytes / 1000000),
    });
  }

  renderProgress() {
    const {
      status,
      receivedBytes,
      totalBytes,
      fullProgress,
      isCodepushModalVisible,
      lang,
    } = this.state;
    const progressWidth = (receivedBytes / totalBytes) * fullProgress;
    const progressStart = {
      width: Size.screen.width - 32,
      justifyContent: 'flex-end',
    };
    const progressBar = {
      height: 4,
      width: progressWidth,
      backgroundColor: Color.primary.light.primary90,
      borderRadius: 2,
    };
    const progressBarBackground = {
      height: 4,
      width: fullProgress,
      backgroundColor: Color.abuMuda.light.abuMuda,
      marginTop: 4,
      borderRadius: 2,
    };
    const mainLoading = {
      backgroundColor: Color.main.light.white,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 70,
      width: Size.screen.width,
      height: Size.screen.height,
    };
    const flex1 = {
      flex: 1,
    };
    const buttonContainer = {
      paddingBottom: 48,
    };
    const hideButton = {
      marginHorizontal: 16,
      marginTop: 78,
    };
    const locale = {
      id: {
        mengunduhPembaharuan: 'Mengunduh Pembaharuan',
        klikDisiniUntukSembunyikan: 'Klik disini untuk sembunyikan',
      },
      en: {
        mengunduhPembaharuan: 'Downloading Update',
        klikDisiniUntukSembunyikan: 'Click here to hide',
      },
    };

    if (!isCodepushModalVisible) {
      return null;
    }
    return (
      <SafeAreaView edges={['top']} style={mainLoading}>
        <View style={flex1}>
          <Image
            source={LoadingLifeId}
            style={{ width: Size.screen.width, height: Size.screen.width }}
            resizeMode="contain"
          />
        </View>
        <View style={progressStart}>
          <Text color={Color.primary.light.primary90} line={18}>
            {locale[lang].mengunduhPembaharuan} ({receivedBytes.toFixed(1)}MB/
            {totalBytes.toFixed(1)}MB)
          </Text>

          {receivedBytes !== 0 && totalBytes !== 0 ? (
            <View style={progressBarBackground}>
              <View style={progressBar} />
            </View>
          ) : null}
        </View>

        <View style={buttonContainer}>
          <Button
            width={Size.screen.width - 16}
            block
            style={hideButton}
            onPress={() => {
              this.setState({
                isCodepushModalVisible: false,
                isCodepushWidgetVisible: true,
              });
            }}>
            {locale[lang].klikDisiniUntukSembunyikan}
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  renderCodepushWidget() {
    const {
      status,
      receivedBytes,
      totalBytes,
      isCodepushModalVisible,
      isCodepushWidgetVisible,
    } = this.state;
    const style = {
      container: {
        position: 'absolute',
        bottom: 100,
        right: isCodepushWidgetVisible ? 4 : -35,
        zIndex: 1,
      },
      circularProgress: {
        image: { width: 30, height: 30, resizeMode: 'contain' },
      },
      button: {
        container: { position: 'absolute', top: -5, left: -5, zIndex: 1 },
        button: {
          backgroundColor: Color.redFade.light.redFade,
          width: 16,
          height: 16,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
        },
      },
    };
    const totalProgress = (receivedBytes / totalBytes) * 100;
    if (
      (status === codePush.SyncStatus.DOWNLOADING_PACKAGE ||
        status === codePush.SyncStatus.INSTALLING_UPDATE) &&
      !isCodepushModalVisible
    ) {
      return (
        <TouchableOpacity
          onPress={() => {
            this.setState({
              isCodepushWidgetVisible: !isCodepushWidgetVisible,
            });
          }}>
          <View style={style.container}>
            <CircularProgress percent={totalProgress}>
              <Image source={JamPasir} style={style.circularProgress.image} />
            </CircularProgress>
            <View style={style.button.container}>
              <View style={style.button.button}>
                {isCodepushWidgetVisible ? (
                  <ArrowRight
                    fill={Color.main.light.white}
                    width={8}
                    height={8}
                  />
                ) : (
                  <ArrowLeft
                    fill={Color.main.light.white}
                    width={8}
                    height={8}
                  />
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ErrorBoundary>
            <Bootstrap>
              <AppNavigator />
            </Bootstrap>
            {this.renderCodepushWidget()}
            {this.renderProgress()}
          </ErrorBoundary>
        </PersistGate>
      </Provider>
    );
  }
}

export default codePush(codePushOptions)(App);
