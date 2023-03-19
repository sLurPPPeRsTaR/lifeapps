import Base from 'ca-component-container/Base';
import PropTypes from 'prop-types';
import BottomSheet from 'ca-component-container/BottomSheet';
import Padder from 'ca-component-container/Padder';
import Button from 'ca-component-generic/Button';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import { ArrowRight2, Device } from 'ca-config/Svg';
import { BadgeTick, LogoutPhone } from 'ca-config/Image';
import { trans } from 'ca-util/trans';
import React, { useCallback, useEffect, useState } from 'react';
import { TouchableNativeFeedback, View, Alert, Image } from 'react-native';
import {
  GET_PROFILEDEVICE_SUCCESS,
  SET_PROFILEDEVICE_FAILED,
  SET_PROFILEDEVICE_SUCCESS,
} from 'ca-module-profile/profileConstant';
import { NAVIGATION } from 'ca-util/constant';
import { useIsFocused } from '@react-navigation/native';
import locale from './locale';
import Style from './style';

function ProfileDevice(props) {
  const {
    navigation,
    lang,
    colorScheme,
    getProfileDevice,
    getProfileDeviceResponse,
    setProfileDevice,
    setLoading,
    getProfileDeviceFailed,
    getProfileDeviceClear,
    setProfileDeviceResponse,
    setProfileDeviceFailed,
    profileAction,
    userData,
    setClearAuth,
    setProfileDeviceClear,
  } = props;

  const [isSubmit, setIsSubmit] = useState(false);
  const [isListModal, setListModal] = useState(false);
  const [isConfModal, setConfModal] = useState(false);
  const [isSuccModal, setSuccModal] = useState(false);
  const [isCompleteListModalHide, setIsCompleteListModalHide] = useState(false);

  const [listDevice, setListDevice] = useState();
  const sessionId = listDevice?.list?.sessionId;

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      setProfileDeviceClear();
      getProfileDeviceClear();
    }
  }, [getProfileDeviceClear, isFocused, setProfileDeviceClear]);

  useEffect(() => {
    if (userData?.userId) {
      setLoading(true);
      if (getProfileDeviceFailed === undefined) {
        getProfileDeviceClear();
      }
      getProfileDevice();
    }
  }, [
    getProfileDevice,
    getProfileDeviceClear,
    getProfileDeviceFailed,
    setLoading,
    setProfileDeviceResponse,
    userData?.userId,
  ]);

  useEffect(() => {
    setLoading(false);
  }, [getProfileDeviceResponse, getProfileDeviceFailed, setLoading]);

  useEffect(() => {
    setProfileDeviceResult(profileAction);
  }, [profileAction, setProfileDeviceResult]);

  const setProfileDeviceResult = useCallback(
    (act) => {
      if (act === GET_PROFILEDEVICE_SUCCESS) {
        const sessionList = getProfileDeviceResponse?.data?.sessionList;
        const isThereACurrentDevice = sessionList?.filter((item) => {
          return item?.isCurrentDevice;
        });
        if (sessionList?.length === 0 || !isThereACurrentDevice) {
          navigation.reset({
            index: 0,
            routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
          });
        }
      }
      if (act === SET_PROFILEDEVICE_SUCCESS) {
        setIsSubmit(false);
        if (listDevice?.list?.isCurrentDevice) {
          setClearAuth();
        }
        setListDevice('');
      }
      if (act === SET_PROFILEDEVICE_FAILED) {
        setIsSubmit(false);
        Alert.alert(setProfileDeviceFailed?.message);
      }
    },
    [
      getProfileDeviceResponse?.data?.sessionList,
      listDevice?.list?.isCurrentDevice,
      navigation,
      setClearAuth,
      setProfileDeviceFailed?.message,
    ]
  );

  function renderDeviceList(list, index) {
    return (
      <TouchableNativeFeedback
        key={index}
        onPress={() => {
          setListDevice({ list, index });
          setListModal(!isListModal);
        }}>
        <View style={[Style.menu.card.container]}>
          <View style={Style.menu.card.card}>
            <Device />
            <View style={Style.menu.card.content.container}>
              <View>
                <Text
                  textStyle="semi"
                  size={Size.text.body2.size}
                  line={21}
                  letterSpacing={0.5}
                  color={Color.grayProfile.light.grayProfile}>
                  {trans(locale, lang, list?.deviceName)}
                </Text>
                <Text
                  style={Style.mv4}
                  textStyle="medium"
                  size={Size.text.caption2.size}
                  line={16.5}
                  letterSpacing={0.5}
                  color={Color.grayProfile2.dark.grayProfile2}>
                  {trans(locale, lang, list?.sessionId)}
                </Text>
                <View style={Style.menu.card.content.container}>
                  <Text
                    textStyle="medium"
                    size={Size.text.caption2.size}
                    line={16.5}
                    letterSpacing={0.5}
                    color={
                      list?.deviceId === userData.deviceId
                        ? Color.success.dark.success90
                        : Color.neutral.light.neutral20
                    }>
                    {list?.deviceId === userData.deviceId &&
                    list?.isCurrentDevice
                      ? trans(locale, lang, 'Active')
                      : trans(locale, lang, list?.lastLogin)}
                  </Text>
                </View>
              </View>
              <ArrowRight2 />
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }

  function renderDeviceListDetail() {
    return (
      <BottomSheet
        leftTitle
        swipeable={false}
        title={trans(locale, lang, 'modalTitle')}
        onClosePress={() => {
          setListModal(!isListModal);
          setIsCompleteListModalHide(false);
        }}
        onRequestClose={() => {
          setListModal(!isListModal);
          setIsCompleteListModalHide(false);
        }}
        onModalHide={() => {
          // eslint-disable-next-line no-unused-expressions
          isCompleteListModalHide && setConfModal(true);
          setIsCompleteListModalHide(false);
        }}
        leftCloseButton
        isVisible={isListModal}>
        <View style={Style.modalDetail.modalDetailContainer}>
          <View
            key={listDevice?.index}
            style={Style.modalDetail.modalDetailContent}>
            <View style={Style.modalDetail.modalDetailText}>
              <Text
                textStyle="medium"
                size={Size.text.caption1.size}
                line={23.8}
                letterSpacing={0.5}
                color={Color.neutral.dark.neutral40}>
                {trans(locale, lang, 'deviceName')}
              </Text>
              <Text
                textStyle="medium"
                size={Size.text.body2.size}
                line={23.8}
                letterSpacing={0.5}>
                {trans(locale, lang, listDevice?.list?.deviceName)}
              </Text>
            </View>
            <View style={Style.modalDetail.modalDetailText}>
              <Text
                textStyle="medium"
                size={Size.text.caption1.size}
                line={23.8}
                letterSpacing={0.5}
                color={Color.neutral.dark.neutral40}>
                {trans(locale, lang, 'sessionID')}
              </Text>
              <Text
                textStyle="medium"
                size={Size.text.body2.size}
                line={23.8}
                letterSpacing={0.5}
                color={Color.mediumGray.mediumGray}>
                {trans(locale, lang, listDevice?.list?.sessionId)}
              </Text>
            </View>
            <View style={Style.modalDetail.modalDetailText}>
              <Text
                textStyle="medium"
                size={Size.text.caption1.size}
                line={23.8}
                letterSpacing={0.5}
                color={Color.neutral.dark.neutral40}>
                {trans(locale, lang, 'status')}
              </Text>
              {listDevice?.list?.lastLogin !== '' && (
                <Text
                  textStyle="medium"
                  size={Size.text.caption2.size}
                  line={16.5}
                  letterSpacing={0.5}
                  color={
                    listDevice?.list?.deviceId === userData.deviceId
                      ? Color.success.dark.success90
                      : Color.neutral.light.neutral20
                  }>
                  {listDevice?.list?.deviceId === userData.deviceId &&
                  listDevice?.list?.isCurrentDevice
                    ? trans(locale, lang, 'Active')
                    : trans(locale, lang, listDevice?.list?.lastLogin)}
                </Text>
              )}
            </View>
          </View>
          <Button
            shadow
            style={Style.modal.deleteSession}
            onPress={() => {
              setListModal(false);
              setIsCompleteListModalHide(true);
            }}>
            <Text
              style={Style.modal.deleteSessionLabel}
              numberOfLines={1}
              color={Color.main.light.white}>
              {trans(locale, lang, 'modalBtnLabel')}
            </Text>
          </Button>
        </View>
      </BottomSheet>
    );
  }

  function renderDeviceListContainer() {
    return (
      <View style={Style.menu.container}>
        {getProfileDeviceResponse?.data?.sessionList.map((list, index) => {
          return renderDeviceList(list, index);
        })}
      </View>
    );
  }

  function renderConfirmationMessage() {
    return (
      <BottomSheet
        leftCloseButton
        isVisible={isConfModal}
        swipeable={false}
        onModalHide={() => {
          // eslint-disable-next-line no-unused-expressions
          isCompleteListModalHide && setSuccModal(true);
          setIsCompleteListModalHide(false);
        }}>
        <View style={[Style.successModal.container, Style.alignItemsCenter]}>
          <Image source={LogoutPhone} style={Style.successModal.icon} />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={30.6}
            align="center"
            color={Color.neutral[colorScheme].neutral80}
            style={Style.successModal.text1}>
            {listDevice?.list?.deviceId === userData.deviceId &&
            listDevice?.list?.isCurrentDevice
              ? trans(locale, lang, 'confirmationChangedLog')
              : trans(locale, lang, 'confirmationChanged')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={23.8}
            align="center"
            color={Color.mediumGray[colorScheme].mediumGray}
            style={Style.successModal.text2}>
            {listDevice?.list?.deviceId === userData.deviceId &&
            listDevice?.list?.isCurrentDevice
              ? trans(locale, lang, 'confirmationMsgLog')
              : trans(locale, lang, 'confirmationMsg')}
          </Text>
          <Button
            block
            outline
            style={Style.mb20}
            onPress={() => {
              setConfModal(false);
            }}>
            {listDevice?.list?.deviceId === userData.deviceId &&
            listDevice?.list?.isCurrentDevice
              ? trans(locale, lang, 'btnLabelConf1Log')
              : trans(locale, lang, 'btnLabelConf1')}
          </Button>
          <Button
            block
            shadow
            onPress={() => {
              setConfModal(false);
              setIsCompleteListModalHide(true);
            }}>
            {listDevice?.list?.deviceId === userData.deviceId &&
            listDevice?.list?.isCurrentDevice
              ? trans(locale, lang, 'btnLabelConf2Log')
              : trans(locale, lang, 'btnLabelConf2')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  function renderSuccessMessage() {
    return (
      <BottomSheet isVisible={isSuccModal} swipeable={false}>
        <View style={[Style.successModal.container, Style.alignItemsCenter]}>
          <Image source={BadgeTick} style={Style.successModal.iconBadgeTick} />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={30.6}
            align="center"
            color={Color.neutral[colorScheme].neutral80}
            style={Style.successModal.text1}>
            {listDevice?.list?.deviceId === userData.deviceId &&
            listDevice?.list?.isCurrentDevice
              ? trans(locale, lang, 'successChangedLog')
              : trans(locale, lang, 'successChanged')}
          </Text>
          <Button
            block
            shadow
            disabled={isSubmit}
            onPress={() => {
              setIsSubmit(true);
              setSuccModal(false);
              setProfileDevice({ sessionId });
            }}>
            {trans(locale, lang, 'btnLabelSucc')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  return (
    <Base
      title={trans(locale, lang, 'title')}
      onBackPress={() => navigation.pop()}>
      <Padder>{renderDeviceListContainer()}</Padder>
      {renderDeviceListDetail()}
      {renderConfirmationMessage()}
      {renderSuccessMessage()}
    </Base>
  );
}

export default ProfileDevice;

ProfileDevice.defaultProps = {
  colorScheme: 'light',
};

ProfileDevice.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string,
  navigation: PropTypes.objectOf(Object).isRequired,
  getProfileDevice: PropTypes.func.isRequired,
  getProfileDeviceClear: PropTypes.func.isRequired,
  setProfileDevice: PropTypes.func.isRequired,
  getProfileDeviceResponse: PropTypes.objectOf(Object).isRequired,
  getProfileDeviceFailed: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  setProfileDeviceResponse: PropTypes.objectOf(Object).isRequired,
  setProfileDeviceFailed: PropTypes.objectOf(Object).isRequired,
  profileAction: PropTypes.string.isRequired,
  userData: PropTypes.objectOf(Object).isRequired,
  setClearAuth: PropTypes.func.isRequired,
  setProfileDeviceClear: PropTypes.func.isRequired,
};
