import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  Alert,
  ImageBackground,
  Platform,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment/min/moment-with-locales';
import {
  GET_POLICY_DOWNLOAD_FAILED,
  GET_POLICY_DOWNLOAD_SUCCESS,
} from 'ca-module-polis/polisConstant';
import { trans } from 'ca-util/trans';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import Shadow from 'ca-component-container/Shadow';
import Color from 'ca-config/Color';
import Button from 'ca-component-generic/Button';
import { LooperGroup2 } from 'ca-config/Image';
import { Warn } from 'ca-config/Svg';
import Dash from 'react-native-dash';
import ReactNativeBlobUtil from 'react-native-blob-util';
import PolisModalError from 'ca-module-polis/components/ModalError';
import { TOAST, NAVIGATION } from 'ca-util/constant';
import { formatCurrency } from 'ca-util/numbro';

import Style from './style';
import locale from './locale';

function PolisDetailDownload(props) {
  const {
    navigation,
    lang,
    colorScheme,
    route: { params },
    getPolicyDownload,
    getPolicyDownloadResponse,
    getPolicyDownloadFailed,
    polisAction,
    setLoading,
    setIsShowModalBadRequest,
    accessToken,
    setToastMsg,
  } = props;
  const polis = params?.polis;

  const isExecuted = useRef(false);
  const isFocused = useIsFocused();
  const [isVisible, setIsVisible] = useState(false);

  moment.locale(lang);

  const policyBookFile = useMemo(() => {
    return getPolicyDownloadResponse?.data?.documentLinks?.find(
      (item) => item.code.toUpperCase() === 'POLICY-BOOK'
    );
  }, [getPolicyDownloadResponse?.data?.documentLinks]);

  const endosemenFile = useMemo(() => {
    return getPolicyDownloadResponse?.data?.documentLinks?.find(
      (item) => item?.code.toUpperCase() === 'RENEWAL'
    );
  }, [getPolicyDownloadResponse?.data?.documentLinks]);

  useEffect(() => {
    if (!isExecuted.current && isFocused) {
      getPolicyDownload({
        policyNo: polis.policyNo || polis.oldPolicyNo,
        productCode: polis.productCode,
        source: polis.source,
      });
      setLoading(true);
      isExecuted.current = true;
    }
  }, [
    getPolicyDownload,
    isFocused,
    polis.oldPolicyNo,
    polis.policyNo,
    polis.productCode,
    polis.source,
    setLoading,
  ]);

  useEffect(() => {
    getPolicyDownloadResult(polisAction);
  }, [polisAction, getPolicyDownloadResult]);

  const getPolicyDownloadResult = useCallback(
    (act) => {
      if (act === GET_POLICY_DOWNLOAD_SUCCESS) {
        setLoading(false);
      }
      if (act === GET_POLICY_DOWNLOAD_FAILED) {
        setLoading(false);
        if (getPolicyDownloadFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          if (getPolicyDownloadFailed?.message === 'BAD_REQUEST') {
            setIsShowModalBadRequest(true);
            return;
          }
          if (getPolicyDownloadFailed?.message === 'POLICY_NOT_LINKED') {
            setIsVisible(true);
            return;
          }
        }
      }
    },
    [getPolicyDownloadFailed?.message, setIsShowModalBadRequest, setLoading]
  );

  const getDocument = (file) => {
    const { config, fs, ios: blobIos } = ReactNativeBlobUtil;
    const { url, fileName } = file;
    const { DownloadDir, DocumentDir } = fs.dirs;
    const dir = Platform.select({ ios: DocumentDir, android: DownloadDir });
    const pdfLocation = `${dir}/${fileName}`;

    setLoading(true);

    const configDefault = {
      fileCache: true,
      title: fileName,
      path: pdfLocation,
      timeout: 60000,
      overwrite: true,
      indicator: true,
    };
    const configOptions = Platform.select({
      ios: {
        fileCache: true,
        title: configDefault.title,
        path: configDefault.path,
        timeout: configDefault.timeout,
        overwrite: configDefault.overwrite,
        appendExt: 'pdf',
      },
      android: {
        ...configDefault,
        addAndroidDownloads: {
          useDownloadManager: true,
          title: fileName,
          mime: 'application/pdf',
          notification: true,
        },
      },
    });

    const timeout = setTimeout(() => {
      setLoading(false);
    }, configDefault.timeout);

    config(configOptions)
      .fetch('GET', url, {
        'X-Requested-With': 'XMLHttpRequest',
        'Cache-Control': 'no-store',
        Authorization: `Bearer ${accessToken}`,
      })
      .then((res) => {
        const base64Str = res.base64();

        fs.writeFile(pdfLocation, base64Str, 'base64');

        clearTimeout(timeout);
        setLoading(false);
        setToastMsg({
          type: TOAST.type.success,
          text1: [
            {
              label: trans(locale, lang, 'fileBerhasilDiUnduh'),
              textStyle: 'medium',
            },
          ],
        });
        if (Platform.OS === 'ios') {
          setTimeout(() => {
            blobIos.previewDocument(pdfLocation);
          }, 500);
        }
      })
      .catch(() => {
        clearTimeout(timeout);
        setLoading(false);
      });
  };

  function formatValue(value, key = '') {
    if (!value && value !== false) {
      return '-';
    }
    const regexNumber = /^[0-9]*$/;
    // Money
    if (!Number.isNaN(value) && Number.isFinite(value)) {
      if (key.toLowerCase().match('percentage')) {
        return `${value}%`;
      }
      return `Rp ${formatCurrency({ value })}`;
    }
    // Date
    if (!regexNumber.test(value) && moment(value, true).isValid()) {
      return moment(value, true).format('DD MMMM YYYY');
    }
    return value;
  }

  function renderSectionEndosemen() {
    if (!endosemenFile) {
      return null;
    }
    return (
      <View style={Style.mt40}>
        <Dash
          dashGap={0}
          dashThickness={10}
          dashColor={Color.backgroundHome[colorScheme].backgroundHome}
          style={Style.mb16}
        />
        <View style={Style.card.container}>
          <Text
            textStyle="semi"
            size={Size.text.body2.size}
            line={20}
            letterSpacing={0.5}
            style={Style.mb16}>
            {trans(locale, lang, 'endosemen')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            color={Color.mediumGray[colorScheme].mediumGray}>
            {trans(locale, lang, 'informasiSyaratDanKetentuan')}
          </Text>
          <View style={Style.card.downloadButton}>
            <Button
              type="linear-gradient"
              onPress={() => {
                getDocument(endosemenFile);
              }}>
              {trans(locale, lang, 'download')}
            </Button>
          </View>
        </View>
      </View>
    );
  }
  function renderTabPolicyBook() {
    if (!getPolicyDownloadResponse?.data) {
      return null;
    }

    return (
      <Shadow animated borderRadius={30} style={Style.mb16}>
        <View style={[Style.pt24, Style.pb30]}>
          <View style={Style.card.container}>
            <Text
              textStyle="semi"
              size={Size.text.body2.size}
              line={20}
              letterSpacing={0.5}
              style={Style.mb16}>
              {trans(locale, lang, 'bukuPolis')}
            </Text>
            <View style={Style.dataList.row}>
              <View style={Style.dataList.col.key}>
                <Text
                  textStyle="regular"
                  size={Size.text.caption1.size}
                  line={18}
                  letterSpacing={0.5}
                  color={Color.mediumGray[colorScheme].mediumGray}>
                  {trans(locale, lang, 'nomorPolis')}
                </Text>
              </View>
              <View style={Style.dataList.col.value}>
                <Text
                  textStyle="medium"
                  size={Size.text.body2.size}
                  line={21}
                  letterSpacing={0.5}>
                  {formatValue(getPolicyDownloadResponse?.data?.policyNo)}
                </Text>
              </View>
            </View>
            {getPolicyDownloadResponse?.data?.package !== undefined ? (
              <View style={Style.dataList.row}>
                <View style={Style.dataList.col.key}>
                  <Text
                    textStyle="regular"
                    size={Size.text.caption1.size}
                    line={18}
                    letterSpacing={0.5}
                    color={Color.mediumGray[colorScheme].mediumGray}>
                    {trans(locale, lang, 'paket')}
                  </Text>
                </View>
                <View style={Style.dataList.col.value}>
                  <Text
                    textStyle="medium"
                    size={Size.text.body2.size}
                    line={21}
                    letterSpacing={0.5}>
                    {getPolicyDownloadResponse?.data?.package || '-'}
                  </Text>
                </View>
              </View>
            ) : null}
            {policyBookFile ? (
              <View style={Style.card.downloadButton}>
                <Button
                  type="linear-gradient"
                  onPress={() => {
                    getDocument(policyBookFile);
                  }}>
                  {trans(locale, lang, 'download')}
                </Button>
              </View>
            ) : null}
          </View>
          {renderSectionEndosemen()}
        </View>
      </Shadow>
    );
  }

  function renderAlertDialogue() {
    if (!getPolicyDownloadResponse?.data) {
      return null;
    }
    const bulletCharacter = (
      <Text
        textStyle="regular"
        size={5}
        style={Style.alertDialogue.text.bullet}>
        {'\u2B24'}
      </Text>
    );
    const textProps = {
      textStyle: 'medium',
      size: Size.text.body2.size,
      line: 22,
      letterSpacing: 0.5,
      style: Style.flexShrink1,
    };
    return (
      <View style={Style.pb30}>
        <View style={Style.alertDialogue.container}>
          <View style={Style.alertDialogue.icon}>
            <Warn fill={Color.warningAlertDialogue.light.color} />
          </View>
          <View style={Style.flexShrink1}>
            <Text {...textProps}>
              {trans(locale, lang, 'untukMembukaFile')}
            </Text>
            <View style={Style.alertDialogue.text.point}>
              {bulletCharacter}
              <Text {...textProps}>{trans(locale, lang, 'poin1')}</Text>
            </View>
            <View style={Style.alertDialogue.text.point}>
              {bulletCharacter}
              <Text {...textProps}>{trans(locale, lang, 'poin2')}</Text>
            </View>
            <View style={Style.alertDialogue.text.point}>
              {bulletCharacter}
              <Text {...textProps}>{trans(locale, lang, 'poin3')}</Text>
            </View>
            <View style={Style.alertDialogue.text.point}>
              {bulletCharacter}
              <Text {...textProps}>{trans(locale, lang, 'poin4')}</Text>
            </View>
            <Text {...textProps}>
              {trans(locale, lang, 'rincianDigitMenjadi')}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <ImageBackground
      source={LooperGroup2}
      resizeMode="cover"
      style={Style.imageBackground}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={Style.container}>
          {renderTabPolicyBook()}
          {renderAlertDialogue()}
        </View>
      </ScrollView>
      <PolisModalError
        navigation={navigation}
        isVisible={isVisible}
        colorScheme={colorScheme}
        onClose={() => {
          setIsVisible(false);
          navigation.reset({
            index: 0,
            routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
          });
        }}
        lang={lang}
      />
    </ImageBackground>
  );
}

export default PolisDetailDownload;

PolisDetailDownload.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  getPolicyDownload: PropTypes.func.isRequired,
  getPolicyDownloadResponse: PropTypes.objectOf(Object).isRequired,
  getPolicyDownloadFailed: PropTypes.objectOf(Object).isRequired,
  polisAction: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  setIsShowModalBadRequest: PropTypes.func.isRequired,
  accessToken: PropTypes.string.isRequired,
  setToastMsg: PropTypes.func.isRequired,
};
