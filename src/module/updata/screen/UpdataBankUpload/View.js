import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Padder from 'ca-component-container/Padder';
import Button from 'ca-component-generic/Button';
import Base from 'ca-component-container/Base';
import Text from 'ca-component-generic/Text';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Input from 'ca-component-generic/Input';
import Size from 'ca-config/Size';
import AlertDialogue from 'ca-component-card/AlertDialogue';
import { Upload, DocUpload, SuccessIcon, PictureUpload } from 'ca-config/Svg';
import { BadgeTick } from 'ca-config/Image';
import { View, Platform, Alert, Image } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { NAVIGATION } from 'ca-util/constant';
import BottomSheet from 'ca-component-container/BottomSheet';
import {
  SET_UPDATA_BANK_UPLOAD,
  SET_UPDATA_BANK_UPLOAD_FAILED,
  SET_UPDATA_BANK_UPLOAD_SUCCESS,
} from 'ca-module-updata/updataConstant';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDefaultBackHandler } from 'ca-util/common';
import style from './style';
import locale from './locale';

function UpdataBankUpload(props) {
  const {
    navigation,
    lang,
    route: { params },
    alreadySetPin,
    setUpdataBankUpload,
    otherInformation,
    setOtherInformation,
    updataAction,
    setLoading,
    setUpdataBankUploadFailed,
    updataTempState,
    setUpdataTempState,
  } = props;

  useDefaultBackHandler(navigation);

  const [isValidPin, setIsValidPin] = useState('');
  const [document, setDocument] = useState();
  const [size, setSize] = useState();
  const [sizeMsg, setSizeMsg] = useState();
  const [uri, setUri] = useState();
  const [type, setType] = useState();
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  useEffect(() => {
    if (isValidPin) {
      setUpdataBankUpload({
        uri: decodeURI(uri),
        name: document,
        type,
      });
      setIsValidPin('');
    }
  }, [isValidPin, document, setUpdataBankUpload, type, uri]);

  useEffect(() => {
    updataResult(updataAction);
  }, [updataAction, updataResult]);

  const updataResult = useCallback(
    (act) => {
      if (act === SET_UPDATA_BANK_UPLOAD) {
        setLoading(true);
      }
      if (act === SET_UPDATA_BANK_UPLOAD_SUCCESS) {
        setLoading(false);
        setOtherInformation({
          ...otherInformation,
          data: {
            ...otherInformation.data,
            bankAccount: {
              ...otherInformation.data.bankAccount,
              bankName: params?.bankName,
              bankCode: params?.bankCode,
              accountHolderName: params?.accountHolderName,
              accountNo: params?.accountNo,
            },
          },
        });
        setUpdataTempState({ ...updataTempState, isUploadBookAccount: true });
        setIsSuccessModal(true);
      }
      if (act === SET_UPDATA_BANK_UPLOAD_FAILED) {
        setLoading(false);
        if (setUpdataBankUploadFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          Alert.alert(setUpdataBankUploadFailed?.message);
        }
      }
    },
    [
      otherInformation,
      params?.accountHolderName,
      params?.accountNo,
      params?.bankCode,
      params?.bankName,
      setLoading,
      setOtherInformation,
      setUpdataBankUploadFailed?.message,
      setUpdataTempState,
      updataTempState,
    ]
  );

  function renderMainContainer() {
    return (
      <View style={style.mT24}>
        <TouchableWithoutFeedback
          onPressIn={async () => {
            try {
              const pickerResult = await DocumentPicker.pickSingle({
                presentationStyle: 'fullScreen',
                copyTo: 'documentDirectory',
                type:
                  Platform.OS === 'ios'
                    ? ['public.jpeg', 'public.png', 'com.adobe.pdf']
                    : ['image/png', 'image/jpeg', 'application/pdf'],
              });
              if (pickerResult?.size <= 5000000) {
                if (
                  pickerResult?.type === 'image/png' ||
                  pickerResult?.type === 'image/jpeg' ||
                  pickerResult?.type === 'application/pdf'
                ) {
                  setSizeMsg('');
                  setUri(pickerResult?.fileCopyUri);
                  setDocument(pickerResult?.name);
                  setSize(pickerResult?.size);
                  setType(pickerResult?.type);
                } else {
                  setUri('');
                  setDocument('');
                  setType('');
                  setSizeMsg({
                    error: trans(locale, lang, 'ukuranFileMax'),
                  });
                }
              } else {
                setUri('');
                setDocument('');
                setType('');
                setSizeMsg({ error: trans(locale, lang, 'sizeToLarge') });
              }
            } catch (e) {
              // eslint-disable-next-line no-console
              console.log('error : ', e);
            }
          }}>
          <View>
            <Input
              height={60}
              label={trans(locale, lang, 'bukuRekening')}
              secondLabel={
                <Text
                  color={Color.primary.light.primary90}
                  size={Size.text.body2.size}
                  textStyle="semi">
                  {trans(locale, lang, '*')}
                </Text>
              }
              placeholder={
                document
                  ? `${document?.substr(0, 27)}\n${(size / 1000000)?.toFixed(
                      2
                    )} MB`
                  : trans(locale, lang, 'uploadFileDisini')
              }
              editable={false}
              prefixIcon={
                // eslint-disable-next-line no-nested-ternary
                type === 'application/pdf' ? (
                  <DocUpload />
                ) : type === 'image/png' || type === 'image/jpeg' ? (
                  <PictureUpload />
                ) : null
              }
              message={sizeMsg}
            />
            <View style={style.renderMainContainer.docContainer}>
              {document ? <SuccessIcon /> : <Upload />}
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View style={style.mT24}>
          <AlertDialogue
            title={trans(locale, lang, 'pastikanFileYang')}
            type="warning"
            leftIcon
          />
        </View>
      </View>
    );
  }

  function renderFooterContainer() {
    return (
      <Padder style={style.mB48}>
        <Button
          type="linear-gradient"
          disabled={!document || sizeMsg}
          onPress={() => {
            if (!alreadySetPin) {
              navigation.navigate(NAVIGATION.PROFILE.ProfileCreateNewPin);
            } else {
              navigation.navigate(NAVIGATION.PROFILE.ProfileInputPin, {
                callbackValidPin,
              });
            }
          }}>
          {trans(locale, lang, 'simpan')}
        </Button>
      </Padder>
    );
  }

  function renderSuccessModal() {
    const onBackPress = () => {
      setIsSuccessModal(false);
      setTimeout(() => {
        navigation.pop(2);
      }, 200);
    };
    return (
      <BottomSheet
        isVisible={isSuccessModal}
        swipeable={false}
        onClosePress={onBackPress}
        onRequestClose={onBackPress}>
        <View style={style.modal.success.container}>
          <Image source={BadgeTick} style={style.modal.success.icon} />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={27}
            letterSpacing={0.5}
            align="center"
            style={style.modal.success.text}>
            {trans(locale, lang, 'andaBerhasilMenambahkan')}
          </Text>
        </View>
        <Button
          type="linear-gradient"
          onPress={() => {
            setIsSuccessModal(false);
            setTimeout(() => {
              navigation.pop(2);
            }, 200);
          }}>
          {trans(locale, lang, 'lanjut')}
        </Button>
      </BottomSheet>
    );
  }

  const callbackValidPin = (data) => {
    setIsValidPin(data);
  };

  return (
    <Base
      bordered
      renderBottom={renderFooterContainer()}
      onBackPress={() => navigation.pop()}
      title={trans(locale, lang, 'uploadRekening')}
      backgroundColor={Color.whiteBackground.light.whiteBackground}
      isPaddingBottom={false}>
      <Padder>{renderMainContainer()}</Padder>
      {renderSuccessModal()}
    </Base>
  );
}

export default UpdataBankUpload;

UpdataBankUpload.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  alreadySetPin: PropTypes.bool.isRequired,
  setUpdataBankUpload: PropTypes.func.isRequired,
  otherInformation: PropTypes.objectOf(Object).isRequired,
  setOtherInformation: PropTypes.func.isRequired,
  updataAction: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  setUpdataBankUploadFailed: PropTypes.objectOf(Object).isRequired,
  updataTempState: PropTypes.objectOf(Object).isRequired,
  setUpdataTempState: PropTypes.func.isRequired,
};
