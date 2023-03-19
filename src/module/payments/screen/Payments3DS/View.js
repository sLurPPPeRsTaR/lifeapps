import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import Base from 'ca-component-container/Base';
import { trans } from 'ca-util/trans';
import WebView from 'react-native-webview';
import {
  APPLICATION_PAYMENT_ID,
  APPLICATION_PAYMENT_ID_RENEWAL,
  BILL_TYPE,
  NAVIGATION,
} from 'ca-util/constant';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useMount } from 'ca-util/common';
import ViewShot, { captureRef } from 'react-native-view-shot';
import {
  ActivityIndicator,
  BackHandler,
  PermissionsAndroid,
  Platform,
  Share,
  View,
} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Color from 'ca-config/Color';
import RNFS from 'react-native-fs';
import Button from 'ca-component-generic/Button';
import style from './style';
import locale from './locale';

function Payments3DS(props) {
  const {
    navigation,
    lang,
    setLoading,
    setCreateBillResponse,
    setCreateBill,
    setCreateBillParam,
    setCreateBillClear,
    setPlanCode,
    route: { params },
  } = props;
  const isFocused = useIsFocused();
  const [callback, setCallback] = useState({});
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [isQris, setIsQris] = useState(false);
  const [isCanBack, setIsCanBack] = useState(true);
  const viewShot = useRef();
  const scrollRef = useRef();

  useMount(() => {
    if (params?.proposalNo) {
      setCreateBill({
        isProposal: true,
        data: {
          applicationId: APPLICATION_PAYMENT_ID,
          billType: BILL_TYPE.premium,
          reffNo: params?.proposalNo,
          language: lang,
        },
      });
    }
    if (params?.policyNo) {
      setCreateBill({
        isRenewal: true,
        data: {
          applicationId: APPLICATION_PAYMENT_ID_RENEWAL,
          billType: BILL_TYPE.premium,
          reffNo: params?.policyNo,
          language: lang,
        },
      });
    }
  });

  // Set plancode
  useEffect(() => {
    if (setCreateBillResponse?.planCode) {
      setPlanCode(setCreateBillResponse?.planCode);
    }
  }, [setCreateBillResponse?.planCode, setPlanCode]);

  useFocusEffect(() => {
    backHandler();
  });

  useEffect(() => {
    // Capture callback pwa and mobile
    if (
      (callback?.url?.includes('life.id/loading') ||
        callback?.url?.includes('/lifesaver/check-payment')) &&
      isFocused
    ) {
      redirectResult(callback, isFocused);
    }
    // Capture when loading checkpayment
    if (callback?.url?.includes('ifgpay-uat.life.id/check-payment')) {
      setIsCanBack(false);
    }
    // Capture route qris
    if (callback?.url?.includes('/qris-payment')) {
      setIsQris(true);
    } else {
      setIsQris(false);
    }
  }, [callback, isFocused, redirectResult]);

  const backHandler = useCallback(() => {
    const onBackPress = () => {
      if (isCanBack) {
        setCreateBillClear();
        navigation.goBack();
      }
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, [isCanBack, navigation, setCreateBillClear]);

  const redirectResult = useCallback(() => {
    setLoading(true);
    if (params?.isOnlyAddCard || setCreateBillParam?.isPaymentTypeFalse) {
      return navigation.replace(NAVIGATION.PAYMENTS.PaymentsCheckTrans, {
        ...params,
      });
    }
    if (params?.isFromEvent) {
      return navigation.replace(NAVIGATION.PAYMENTS.PaymentsEventCheckTrans, {
        ...params,
      });
    }
    if (params?.isFromLifeTag) {
      return navigation.replace(NAVIGATION.PAYMENTS.PaymentsLifeTagCheckTrans, {
        ...params,
      });
    }
    return navigation.replace(NAVIGATION.PAYMENTS.PaymentsCheckTransV2, {
      ...params,
      reffNo: setCreateBillParam?.data?.reffNo,
      invoiceId:
        setCreateBillParam?.data?.invoiceId || setCreateBillResponse?.invoiceId,
    });
  }, [
    navigation,
    params,
    setCreateBillParam,
    setCreateBillResponse,
    setLoading,
  ]);

  const doIncrementFile = async (uri) => {
    for (let i = 1; i < 100; i++) {
      const dirsExist = `file://${RNFS.DownloadDirectoryPath}/IFGPay-QRCode(${i}).jpg`;
      // eslint-disable-next-line no-await-in-loop
      const isExist = await RNFS.exists(dirsExist);
      if (!isExist) {
        RNFS.writeFile(dirsExist, uri, 'base64')
          .then(() => {
            ReactNativeBlobUtil.android.addCompleteDownload({
              title: `IFGPay-QRCode(${i}).jpg`,
              description: 'Download Complete',
              mime: 'image/jpg',
              path: dirsExist,
              showNotification: true,
            });
            console.log('file success download', dirsExist);
          })
          .catch((err) => console.log(err));
        return true;
      }
    }
  };

  const doUnExistFile = (dirs, uri) => {
    RNFS.writeFile(dirs, uri, 'base64')
      .then(() => {
        ReactNativeBlobUtil.android.addCompleteDownload({
          title: 'IFGPay-QRCode.jpg',
          description: 'Download Complete',
          mime: 'image/jpg',
          path: dirs,
          showNotification: true,
        });
      })
      .catch((err) => {
        if (__DEV__) console.log(err);
      });
  };

  const androidDownload = async (uri) => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const dirs = `file://${RNFS.DownloadDirectoryPath}/IFGPay-QRCode.jpg`;
      const fileExist = await RNFS.exists(dirs);
      if (fileExist) {
        doIncrementFile(uri);
      } else {
        doUnExistFile(dirs, uri);
      }
    }
  };

  const captureDownload = (uri) => {
    if (Platform.OS === 'ios') {
      Share.share({
        title: 'IFGPay-QRCode',
        url: uri,
      });
    } else {
      androidDownload(uri);
    }
    setLoadingDownload(false);
  };
  const onCapture = async () => {
    try {
      let uri;
      if (Platform.OS === 'ios') {
        uri = await captureRef(viewShot, {
          quality: 1,
          format: 'jpg',
          result: 'tmpfile',
        });
      } else {
        uri = await captureRef(viewShot, {
          quality: 1,
          format: 'jpg',
          result: 'base64',
        });
      }
      console.log(uri);

      captureDownload(uri);
    } catch (e) {
      console.log(e);
    }
  };

  const onDownload = () => {
    scrollRef.current.injectJavaScript(`
        window.scroll({
          top: 0, 
          left: 0, 
        })
      `);
    setLoadingDownload(true);
    setTimeout(() => {
      onCapture();
    }, 500);
  };

  function renderDonwloadQRButton() {
    if (!isQris) {
      return null;
    }
    return (
      <View style={style.buttonDownloadContainer}>
        <Button
          disabled={loadingDownload}
          onPress={onDownload}
          type="linear-gradient">
          {!isQris || loadingDownload ? (
            <ActivityIndicator color={Color.primary.light.primary90} />
          ) : (
            trans(locale, lang, 'unduhQr')
          )}
        </Button>
      </View>
    );
  }
  return (
    <Base
      bordered
      title={trans(locale, lang, 'kartuKredit')}
      isPaddingBottom={false}
      onBackPress={
        isCanBack
          ? () => {
              setCreateBillClear();
              navigation.goBack();
            }
          : false
      }>
      <ViewShot
        style={style.fx1}
        ref={viewShot}
        options={{ format: 'jpg', quality: 0.9 }}>
        {/* <Image width={200} height={300} source={{ uri: url }} /> */}
        <WebView
          ref={scrollRef}
          style={style.container}
          onNavigationStateChange={(nativeEvent) => {
            setCallback(nativeEvent);
          }}
          onLoadProgress={({ nativeEvent }) => {
            setCallback(nativeEvent);
          }}
          source={{
            uri:
              params?.url ||
              setCreateBillResponse?.redirectUrl ||
              setCreateBillResponse?.paymentInfo?.url,
          }}
        />
      </ViewShot>
      {renderDonwloadQRButton()}
    </Base>
  );
}

Payments3DS.propTypes = {
  lang: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  setCreateBillResponse: PropTypes.objectOf(Object).isRequired,
  setCreateBillClear: PropTypes.func.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  setCreateBill: PropTypes.func.isRequired,
  setCreateBillParam: PropTypes.objectOf(Object).isRequired,
  setPlanCode: PropTypes.string.isRequired,
};

export default Payments3DS;
