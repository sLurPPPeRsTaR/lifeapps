import React, { useState, useCallback, useEffect } from 'react';
import Base from 'ca-component-container/Base';
import {
  View,
  TouchableOpacity,
  Alert,
  Image,
  Keyboard,
  BackHandler,
} from 'react-native';
import PropTypes from 'prop-types';
import { trans } from 'ca-util/trans';
import Padder from 'ca-component-container/Padder';
import Shadow from 'ca-component-container/Shadow';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import _ from 'lodash';
import { formatCapitalizeEachWord } from 'ca-util/format';
import Button from 'ca-component-generic/Button';
import { DeleteIcon } from 'ca-config/Svg';
import {
  GET_ADDRESS_LIST_FAILED,
  GET_ADDRESS_LIST_SUCCESS,
  SET_DELETE_ADDRESS_FAILED,
  SET_DELETE_ADDRESS_SUCCESS,
  SET_UPDATE_ADDRESS_FAILED,
  SET_UPDATE_ADDRESS_SUCCESS,
} from 'ca-module-profile/profileConstant';
import { RusakIcon, TempatSampah2, BadgeTick } from 'ca-config/Image';
import { NAVIGATION, RESPONSE_STATE } from 'ca-util/constant';
import { useIsFocused } from '@react-navigation/native';
import AlertDialogue from 'ca-component-card/AlertDialogue';
import BottomSheet from 'ca-component-container/BottomSheet';
import {
  SET_KYC_POSTALCODE_IDCARD_FAILED,
  SET_KYC_POSTALCODE_IDCARD_SUCCESS,
} from 'ca-module-kyc/kycConstant';
import { regexGlobalPhoneNumber, regexName } from 'ca-util/common';
import Input from 'ca-component-generic/Input';
import locale from './locale';
import style from './style';

// eslint-disable-next-line no-unused-vars
const dummyResponse = {
  data: {
    eKYCAddress: {
      street: 'JL RAYA CISEENG NO. 12 BLOK A',
      province: 'JAWA BARAT',
      city: 'KABUPATEN BOGOR',
      district: 'CISEENG',
      subDistrict: 'CIBENTANG',
      rt: '001',
      rw: '002',
    },
    userAddressList: [
      {
        id: '8796227d-041d-46fc-9abe-2c29a8d12f47',
        title: 'Alamat Rumah',
        street: 'Jl. Raya Cikarang Barat No. 1',
        province: {
          code: '32',
          value: 'jawa barat',
        },
        city: {
          code: '32.16',
          value: 'kab. bekasi',
        },
        district: {
          code: '32.16.02',
          value: 'babelan',
        },
        subDistrict: {
          code: '32.16.02.2008',
          value: 'babelankota',
        },
        rt: '005',
        rw: '005',
        postcode: '52371',
      },
    ],
  },
};

function ProfileAddress(props) {
  const {
    navigation,
    lang,
    profileAction,
    getAddressListResponse,
    getAddressListFailed,
    getAddressList,
    setLoading,
    setDeleteAddressFailed,
    setDeleteAddress,
    setDeleteAddressClear,
    setIsComingFromScreen,
    isComingFromScreen,
    userData,
    setAddPostalCodeKycIdCard,
    setAddPostalCodeKycIdCardClear,
    setUpdateAddress,
    setUpdateAddressClear,
    setUpdateAddressFailed,
    kycAction,
    setAddPostalCodeKycIdCardFailed,
  } = props;

  const isFocused = useIsFocused();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isDeleteConfirmationModal, setIsDeleteConfirmationModal] =
    useState(false);
  const [isDeleteSuccessModal, setIsDeleteSuccessModal] = useState(false);

  const [selectedDeleteAddress, setSelectedDeleteAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isShow, setIsShow] = useState(true);

  const [isValidPhoneNumber, setValidPhoneNumber] = useState(true);
  const [isValidFullName, setValidFullName] = useState(true);
  const [fullNameMessage, setFullNameMessage] = useState(null);
  const [name, setName] = useState(
    isComingFromScreen?.params?.name || userData?.name
  );
  const [phoneNumber, setPhoneNumber] = useState(
    isComingFromScreen?.params?.phoneNumber || userData?.mobilePhoneNumber
  );
  const [phoneNumberMessage, setPhoneNumberMessage] = useState(null);

  const [postalCode, setPostalCode] = useState(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const requiredLabel = (
    <Text
      color={Color.primary.light.primary90}
      size={Size.text.body2.size}
      textStyle="semi">
      {trans(locale, lang, '*')}
    </Text>
  );

  useEffect(() => {
    const goTo = () => {
      navigation.pop();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareonBackPress',
      goTo
    );
    return () => backHandler.remove();
  }, [navigation]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      getAddressList();
    }
  }, [getAddressList, setLoading, isFocused]);

  useEffect(() => {
    if (isFocused) {
      profileResult(profileAction);
    }
  }, [isFocused, profileAction, profileResult]);

  useEffect(() => {
    if (isFocused) {
      setKycResult(kycAction);
    }
  }, [isFocused, kycAction, setKycResult]);

  useEffect(() => {
    validatePhoneNumber(phoneNumber);
    validateFullName(name);
  }, [name, phoneNumber, validateFullName, validatePhoneNumber]);

  const setKycResult = useCallback(
    (act) => {
      if (act === SET_KYC_POSTALCODE_IDCARD_SUCCESS) {
        navigation.pop();
        setAddPostalCodeKycIdCardClear();
      }
      if (act === SET_KYC_POSTALCODE_IDCARD_FAILED) {
        if (
          setUpdateAddressFailed?.message !==
          RESPONSE_STATE.INTERNAL_SERVER_ERROR
        ) {
          Alert.alert('Warning', setAddPostalCodeKycIdCardFailed?.message);
        }
        setAddPostalCodeKycIdCardClear();
      }
    },
    [
      navigation,
      setAddPostalCodeKycIdCardClear,
      setAddPostalCodeKycIdCardFailed?.message,
      setUpdateAddressFailed?.message,
    ]
  );

  const profileResult = useCallback(
    (act) => {
      if (act === GET_ADDRESS_LIST_SUCCESS) {
        setLoading(false);
      }
      if (act === GET_ADDRESS_LIST_FAILED) {
        setLoading(false);
        const error = getAddressListFailed?.message;
        if (error !== RESPONSE_STATE.INTERNAL_SERVER_ERROR) {
          Alert.alert('warning', error);
        }
      }
      if (act === SET_DELETE_ADDRESS_SUCCESS) {
        setLoading(false);
        setIsSubmit(false);
        setTimeout(() => {
          setIsDeleteSuccessModal(true);
        }, 600);
        setDeleteAddressClear();
        getAddressList();
      }
      if (act === SET_DELETE_ADDRESS_FAILED) {
        setLoading(false);
        setIsSubmit(false);
        if (
          setDeleteAddressFailed?.message !==
          RESPONSE_STATE.INTERNAL_SERVER_ERROR
        ) {
          Alert.alert('Warning', setDeleteAddressFailed?.message);
        }
        setDeleteAddressClear();
      }
      if (act === SET_UPDATE_ADDRESS_SUCCESS) {
        navigation.pop();
        setUpdateAddressClear();
      }
      if (act === SET_UPDATE_ADDRESS_FAILED) {
        setLoading(false);
        setIsSubmit(false);
        if (
          setUpdateAddressFailed?.message !==
          RESPONSE_STATE.INTERNAL_SERVER_ERROR
        ) {
          Alert.alert('Warning', setUpdateAddressFailed?.message);
        }
        setUpdateAddressClear();
      }
    },
    [
      getAddressList,
      getAddressListFailed?.message,
      navigation,
      setDeleteAddressClear,
      setDeleteAddressFailed?.message,
      setLoading,
      setUpdateAddressClear,
      setUpdateAddressFailed?.message,
    ]
  );

  const validatePhoneNumber = useCallback(
    (text) => {
      if (!text || text?.length < 1 || text?.length < 10) {
        setPhoneNumberMessage({
          error: trans(locale, lang, 'phoneNumberRequired'),
        });
        return false;
      }
      if (text?.length > 15) {
        setPhoneNumberMessage({
          error: trans(locale, lang, 'phoneNumberInvalid'),
        });
        return false;
      }
      if (!regexGlobalPhoneNumber.test(text)) {
        setPhoneNumberMessage({
          warning: trans(locale, lang, 'phoneNumberInvalid'),
        });
        return false;
      }
      setPhoneNumberMessage(null);
      return true;
    },
    [lang]
  );

  const validateFullName = useCallback(
    (text) => {
      if (text.length < 1) {
        setFullNameMessage({ error: trans(locale, lang, 'nameRequired') });
        return false;
      }
      if (!regexName.test(text)) {
        setFullNameMessage({ warning: trans(locale, lang, 'nameInvalid') });
        return false;
      }
      if (text.length > 100) {
        setFullNameMessage({
          error: trans(locale, lang, 'nameLengthTooLong'),
        });
        return false;
      }
      setFullNameMessage(null);
      return true;
    },
    [lang]
  );

  function rendereKYCAddressInput(item) {
    if (getAddressListResponse?.data?.eKYCAddress?.postcode === null) {
      if (selectedAddress?.street === item?.street && isShow) {
        return (
          <View style={[style.mT16, style.mB8]}>
            <Input
              value={postalCode}
              height={56}
              label={trans(locale, lang, 'kodePos')}
              secondLabel={requiredLabel}
              placeholder={trans(locale, lang, 'masukkanKodePos')}
              onChangeText={(text) => {
                if (selectedAddress?.street === item?.street) {
                  setPostalCode(text.replace(/[^0-9]/g, ''));
                }
              }}
              keyboardType="number-pad"
              maxLength={5}
            />
          </View>
        );
      }
      return null;
    }
    return null;
  }

  function renderEKYCAddressContainer() {
    if (
      !_.isEmpty(getAddressListResponse?.data?.eKYCAddress) &&
      userData?.alreadyKYC
    ) {
      const item = getAddressListResponse?.data?.eKYCAddress;

      // Format Address
      const namaJalan = item.street || '';
      const rt = item.rt || '';
      const rw = item.rw || '';
      const kelurahan = formatCapitalizeEachWord(item.subDistrict || '');
      const kecamatan = formatCapitalizeEachWord(item.district || '');
      const kota = formatCapitalizeEachWord(item.city || '');
      const provinsi = formatCapitalizeEachWord(item.province || '');
      const kodePos = item.postcode || '';

      const textAddress = `${namaJalan}, ${
        rt && rw ? `RT${rt}/RW${rw}` : ''
      }, ${kelurahan}, ${kecamatan}, ${kota}, ${provinsi}, ${kodePos}`
        .replace(/ ,/g, '')
        .trim()
        .replace(/^, /g, '')
        .trim()
        .replace(/,$/g, '');
      if (!_.isEmpty(isComingFromScreen)) {
        return (
          <View>
            <View style={style.mb16}>
              {!_.isEmpty(isComingFromScreen) ? (
                <>
                  <View style={style.mb16}>
                    <Input
                      value={name}
                      height={56}
                      label={trans(locale, lang, 'namaPenerima')}
                      secondLabel={requiredLabel}
                      placeholder={trans(locale, lang, 'John Doe')}
                      message={fullNameMessage}
                      onChangeText={(text) => {
                        setName(text);
                        setValidFullName(validateFullName(text));
                      }}
                    />
                  </View>
                  <View style={style.mb16}>
                    <Input
                      value={phoneNumber}
                      height={56}
                      label={trans(locale, lang, 'noHP')}
                      secondLabel={requiredLabel}
                      placeholder={trans(locale, lang, '08221105435')}
                      message={phoneNumberMessage}
                      onChangeText={(text) => {
                        setPhoneNumber(text);
                        setValidPhoneNumber(validatePhoneNumber(text));
                      }}
                      keyboardType="phone-pad"
                    />
                  </View>
                </>
              ) : null}
              <AlertDialogue
                type="warning"
                leftIcon
                title={trans(locale, lang, 'pilihAlamatUntuk')}
              />
            </View>

            <Shadow
              animated
              borderRadius={30}
              style={
                selectedAddress?.street === item?.street
                  ? style.addressCard.containerActive
                  : style.mb16
              }>
              <TouchableOpacity
                onPress={() => {
                  setSelectedAddress(item);
                  setPostalCode(item?.postcode);
                  if (selectedAddress?.street === item?.street) {
                    setIsShow(!isShow);
                  }
                }}>
                <View style={style.addressCard.container}>
                  <View style={style.addressCard.header}>
                    <Text
                      textStyle="semi"
                      size={Size.text.body2.size}
                      line={20}
                      letterSpacing={0.5}>
                      {trans(locale, lang, 'rumahTinggalSesuai')}
                    </Text>
                    <View
                      style={[
                        {
                          borderColor:
                            selectedAddress?.street === item?.street
                              ? Color.primary.light.primary90
                              : Color.main.light.black,
                        },
                        style.addressCard.circleContainer,
                      ]}>
                      <View
                        style={[
                          {
                            backgroundColor:
                              selectedAddress?.street === item?.street
                                ? Color.primary.light.primary90
                                : Color.main.light.white,
                          },
                          style.addressCard.innerCircleContainer,
                        ]}
                      />
                    </View>
                  </View>
                  <View style={style.addressCard.content}>
                    <Text
                      textStyle="regular"
                      size={Size.text.body2.size}
                      line={20}
                      letterSpacing={0.5}
                      color={Color.neutral.light.neutral40}>
                      {textAddress}
                    </Text>
                  </View>
                  {rendereKYCAddressInput(item)}
                </View>
              </TouchableOpacity>
            </Shadow>
          </View>
        );
      }
      return (
        <Shadow animated borderRadius={30} style={style.mb16}>
          <View style={style.addressCard.container}>
            <View style={style.addressCard.header}>
              <Text
                textStyle="semi"
                size={Size.text.body2.size}
                line={20}
                letterSpacing={0.5}>
                {trans(locale, lang, 'rumahTinggalSesuai')}
              </Text>
            </View>
            <View style={style.addressCard.content}>
              <Text
                textStyle="regular"
                size={Size.text.body2.size}
                line={20}
                letterSpacing={0.5}
                color={Color.neutral.light.neutral40}>
                {textAddress}
              </Text>
            </View>
          </View>
        </Shadow>
      );
    }
    return null;
  }

  function rendereAddressListInput(item) {
    if (item?.postcode === null) {
      if (selectedAddress?.id === item?.id && isShow) {
        return (
          <View style={[style.mT16, style.mB8]}>
            <Input
              value={postalCode}
              height={56}
              label={trans(locale, lang, 'kodePos')}
              secondLabel={requiredLabel}
              placeholder={trans(locale, lang, 'masukkanKodePos')}
              onChangeText={(text) => {
                if (selectedAddress?.id === item?.id) {
                  setPostalCode(text.replace(/[^0-9]/g, ''));
                }
              }}
              keyboardType="number-pad"
              maxLength={5}
            />
          </View>
        );
      }
      return null;
    }
    return null;
  }

  function renderAddressListContainer() {
    const userAddressList =
      getAddressListResponse?.data?.userAddressList?.filter((i) => i.title);
    if (!_.isEmpty(userAddressList)) {
      return userAddressList.map((item) => {
        // Format Address
        const namaJalan = item.street || '';
        const rt = item.rt || '';
        const rw = item.rw || '';
        const kelurahan = formatCapitalizeEachWord(
          item.subDistrict.value || ''
        );
        const kecamatan = formatCapitalizeEachWord(item.district.value || '');
        const kota = formatCapitalizeEachWord(item.city.value || '');
        const provinsi = formatCapitalizeEachWord(item.province.value || '');
        const kodePos = item.postcode || '';

        const textAddress = `${namaJalan}, ${
          rt && rw ? `RT${rt}/RW${rw}` : ''
        }, ${kelurahan}, ${kecamatan}, ${kota}, ${provinsi}, ${kodePos}`
          .replace(/ ,/g, '')
          .trim()
          .replace(/^, /g, '')
          .trim()
          .replace(/,$/g, '');
        if (!_.isEmpty(isComingFromScreen)) {
          return (
            <Shadow
              key={item.id}
              animated
              borderRadius={30}
              style={
                selectedAddress?.id === item?.id
                  ? style.addressCard.containerActive
                  : style.mb16
              }>
              <TouchableOpacity
                onPress={() => {
                  setSelectedAddress(item);
                  setPostalCode(item?.postcode);
                  if (selectedAddress?.id === item?.id) {
                    setIsShow(!isShow);
                  }
                }}>
                <View style={style.addressCard.container}>
                  <View style={style.addressCard.header}>
                    <Text
                      textStyle="semi"
                      size={Size.text.body2.size}
                      line={20}
                      letterSpacing={0.5}>
                      {item.title}
                    </Text>
                    <View
                      style={[
                        {
                          borderColor:
                            selectedAddress?.id === item?.id
                              ? Color.primary.light.primary90
                              : Color.main.light.black,
                        },
                        style.addressCard.circleContainer,
                      ]}>
                      <View
                        style={[
                          {
                            backgroundColor:
                              selectedAddress?.id === item?.id
                                ? Color.primary.light.primary90
                                : Color.main.light.white,
                          },
                          style.addressCard.innerCircleContainer,
                        ]}
                      />
                    </View>
                  </View>
                  <View style={style.addressCard.content}>
                    <Text
                      textStyle="regular"
                      size={Size.text.body2.size}
                      line={20}
                      letterSpacing={0.5}
                      color={Color.neutral.light.neutral40}>
                      {textAddress}
                    </Text>
                  </View>
                  {rendereAddressListInput(item)}
                </View>
              </TouchableOpacity>
            </Shadow>
          );
        }
        return (
          <Shadow key={item.id} animated borderRadius={30} style={style.mb16}>
            <View style={style.addressCard.container}>
              <View style={style.addressCard.header}>
                <Text
                  textStyle="semi"
                  size={Size.text.body2.size}
                  line={20}
                  letterSpacing={0.5}>
                  {item.title}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedAddress(item);
                    setIsDeleteConfirmationModal(true);
                    setSelectedDeleteAddress(item.id);
                  }}>
                  <DeleteIcon />
                </TouchableOpacity>
              </View>
              <View style={style.addressCard.content}>
                <Text
                  textStyle="regular"
                  size={Size.text.body2.size}
                  line={20}
                  letterSpacing={0.5}
                  color={Color.neutral.light.neutral40}>
                  {textAddress}
                </Text>
              </View>
              <View style={style.addressCard.footer}>
                <Button
                  outline
                  onPress={() => {
                    navigation.navigate(NAVIGATION.PROFILE.ProfileAddressEdit, {
                      action: 'edit',
                      address: item,
                    });
                  }}>
                  {trans(locale, lang, 'ubahAlamat')}
                </Button>
              </View>
            </View>
          </Shadow>
        );
      });
    }
    return null;
  }

  function renderFooterContainer() {
    const keyboardVisibleStyle = !isKeyboardVisible
      ? { paddingBottom: 48 }
      : { paddingBottom: 16 };

    if (!_.isEmpty(isComingFromScreen)) {
      return (
        <Padder style={[style.footer.container, keyboardVisibleStyle]}>
          <Button
            outline
            type="linear-gradient"
            onPress={() => {
              navigation.navigate(NAVIGATION.PROFILE.ProfileAddressEdit, {
                action: 'add',
              });
            }}>
            {trans(locale, lang, 'tambahAlamat')}
          </Button>
          <View style={style.pT24}>
            <Button
              type="linear-gradient"
              disabled={
                !isValidPhoneNumber ||
                !isValidFullName ||
                postalCode?.length !== 5
              }
              onPress={() => {
                setIsComingFromScreen({
                  screen: isComingFromScreen?.screen,
                  params: {
                    selectedAddress,
                    name,
                    phoneNumber,
                    postalCode,
                  },
                });
                if (selectedAddress?.id) {
                  setUpdateAddress({
                    ...selectedAddress,
                    postcode: postalCode,
                  });
                } else {
                  setAddPostalCodeKycIdCard({
                    postcode: postalCode,
                  });
                }
              }}>
              {trans(locale, lang, 'pilihAlamat')}
            </Button>
          </View>
        </Padder>
      );
    }
    return (
      <Padder style={[style.footer.container, keyboardVisibleStyle]}>
        <Button
          type="linear-gradient"
          onPress={() => {
            navigation.navigate(NAVIGATION.PROFILE.ProfileAddressEdit, {
              action: 'add',
            });
          }}>
          {trans(locale, lang, 'tambahAlamat')}
        </Button>
      </Padder>
    );
  }

  function renderAddressNullContainer() {
    const userAddressList =
      getAddressListResponse?.data?.userAddressList.filter((i) => i.title);
    if (
      _.isEmpty(getAddressListResponse?.data?.eKYCAddress) &&
      _.isEmpty(userAddressList) &&
      !userData?.alreadyKYC
    ) {
      return (
        <View style={style.addressNull.container}>
          <Image source={RusakIcon} style={style.addressNull.image} />
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={20}
            letterSpacing={0.5}
            align="center"
            color={Color.mediumGray.light.mediumGray}>
            {trans(locale, lang, 'saatIniKamu')}
          </Text>
        </View>
      );
    }
    return null;
  }

  function renderDeleteConfirmationModal() {
    return (
      <BottomSheet
        isVisible={isDeleteConfirmationModal}
        swipeable={false}
        onClosePress={() => setIsDeleteConfirmationModal(false)}
        onRequestClose={() => setIsDeleteConfirmationModal(false)}>
        <View style={style.modal.deleteConfirmation.container}>
          <Image
            source={TempatSampah2}
            style={style.modal.deleteConfirmation.image}
          />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={27}
            letterSpacing={0.5}
            align="center"
            style={style.modal.deleteConfirmation.text}>
            {trans(locale, lang, 'apakahKamuIngin')}
          </Text>
        </View>
        <Button
          outline
          style={style.modal.deleteConfirmation.button1}
          onPress={() => {
            setIsDeleteConfirmationModal(false);
            setSelectedDeleteAddress(null);
          }}>
          {trans(locale, lang, 'kembali')}
        </Button>
        <Button
          disabled={isSubmit}
          type="linear-gradient"
          onPress={() => {
            if (!isSubmit) {
              setIsDeleteConfirmationModal(false);
              setIsSubmit(true);
              setLoading(true);
              setDeleteAddress({ id: selectedDeleteAddress });
              setSelectedDeleteAddress(null);
            }
          }}>
          {trans(locale, lang, 'hapus')}
        </Button>
      </BottomSheet>
    );
  }

  function renderDeleteSuccessModal() {
    const onBackPress = () => setIsDeleteSuccessModal(false);
    return (
      <BottomSheet
        isVisible={isDeleteSuccessModal}
        swipeable={false}
        onClosePress={onBackPress}
        onRequestClose={onBackPress}>
        <View style={style.modal.deleteSuccess.container}>
          <Image source={BadgeTick} style={style.modal.deleteSuccess.icon} />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={27}
            letterSpacing={0.5}
            align="center"
            style={style.modal.deleteSuccess.text}>
            {trans(locale, lang, 'berhasilMenghapusAlamat')}
          </Text>
        </View>
        <Button
          type="linear-gradient"
          onPress={() => {
            setIsDeleteSuccessModal(false);
          }}>
          {trans(locale, lang, 'ok')}
        </Button>
      </BottomSheet>
    );
  }

  return (
    <Base
      bordered
      title={trans(locale, lang, 'daftarAlamat')}
      renderBottom={renderFooterContainer()}
      onBackPress={() => {
        navigation.pop();
      }}>
      <Padder style={style.container}>
        {renderEKYCAddressContainer()}
        {renderAddressListContainer()}
        {renderAddressNullContainer()}
      </Padder>
      {renderDeleteConfirmationModal()}
      {renderDeleteSuccessModal()}
    </Base>
  );
}

export default ProfileAddress;

ProfileAddress.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  profileAction: PropTypes.string.isRequired,
  getAddressListResponse: PropTypes.objectOf(Object).isRequired,
  getAddressListFailed: PropTypes.objectOf(Object).isRequired,
  getAddressList: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setDeleteAddressFailed: PropTypes.objectOf(Object).isRequired,
  setDeleteAddress: PropTypes.func.isRequired,
  setDeleteAddressClear: PropTypes.func.isRequired,
  setIsComingFromScreen: PropTypes.func.isRequired,
  isComingFromScreen: PropTypes.objectOf(Object).isRequired,
  userData: PropTypes.objectOf(Object).isRequired,
  setAddPostalCodeKycIdCard: PropTypes.func.isRequired,
  setAddPostalCodeKycIdCardClear: PropTypes.func.isRequired,
  setUpdateAddress: PropTypes.func.isRequired,
  setUpdateAddressClear: PropTypes.func.isRequired,
  setUpdateAddressFailed: PropTypes.objectOf(Object).isRequired,
  kycAction: PropTypes.string.isRequired,
  setAddPostalCodeKycIdCardFailed: PropTypes.objectOf(Object).isRequired,
};
