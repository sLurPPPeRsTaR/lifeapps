import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Alert, Image, TouchableOpacity, View } from 'react-native';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import Base15 from 'ca-component-container/Base15';
import Padder from 'ca-component-container/Padder';
import Button from 'ca-component-generic/Button';
import BottomSheet from 'ca-component-container/BottomSheet';
import {
  Headset2,
  UpdataStep1Active,
  UpdataStep2Active,
  UpdataStep3Active,
  UpdataStep4Active,
} from 'ca-config/Svg';
import CheckBox from '@react-native-community/checkbox';
import { NAVIGATION, RESPONSE_STATE, TOAST } from 'ca-util/constant';
import { trans } from 'ca-util/trans';
import {
  GET_UPDATA_LAST_KTP_INFO_SUCCESS,
  GET_UPDATA_LAST_OTHER_INFO_FAILED,
  GET_UPDATA_LAST_OTHER_INFO_SUCCESS,
  SET_UPDATA_ALTER_POLICIES_FAILED,
  SET_UPDATA_ALTER_POLICIES_SUCCESS,
  SET_UPDATA_VERIFY_PENGKINIAN_FAILED,
  SET_UPDATA_VERIFY_PENGKINIAN_SUCCESS,
} from 'ca-module-updata/updataConstant';
import { formatCapitalizeEachWord } from 'ca-util/format';
import { ReviewData } from 'ca-config/Image';
import { removeColumnFromObject, useDefaultBackHandler } from 'ca-util/common';
import _ from 'lodash';
import OtherInfoFormCard from './components/OtherInfoFormCard';
import locale from './locale';
import style from './style';

function UpdataInformation(props) {
  const {
    navigation,
    lang,
    updataAction,
    getUpdataLastOtherInfoFailed,
    getUpdataLastOtherInfoFetch,
    isKTPSame,
    isKKSame,
    getUpdataLastOtherInfo,
    getUpdataLastOtherInfoClear,
    setLoading,
    getUpdataLastOtherInfoResponse,
    setUpdataKTPResponse,
    setUpdataKKResponse,
    getUpdataLastKTPInfo,
    getUpdataLastKTPInfoResponse,
    getUpdataLastKKInfoResponse,
    setUpdataCheckKKKTPParam,
    otherInformation,
    deviceId,
    setUpdataAlterPoliciesResponse,
    setUpdataAlterPoliciesFailed,
    setUpdataAlterPolicies,
    setUpdataAlterPoliciesClear,
    setUserData,
    setUpdataVerifyPengkinianResponse,
    setUpdataVerifyPengkinianFailed,
    setUpdataVerifyPengkinian,
    setUpdataVerifyPengkinianClear,
    updataTempState,
    alreadySetPin,
    getUpdataValidationCheckResponse,
    alreadySetMPin,
    setOtherInformationClear,
    setUpdataTempStateClear,
    dimensions,
    route: { params },
    setTemporaryHomeState,
    setToastMsg,
    kkpmFlag,
  } = props;

  useDefaultBackHandler(navigation);

  const [isDark, setIsDark] = useState(false);

  // Modal
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  // State
  const [isAgreed, setIsAgreed] = useState(false);
  const [isValidPin, setIsValidPin] = useState('');
  const [isShowRequiredCard, setIsShowRequiredCard] = useState(false);

  const lastOtherInfo = useMemo(() => {
    return getUpdataLastOtherInfoResponse?.data;
  }, [getUpdataLastOtherInfoResponse?.data]);

  const updateFlag = useCallback(() => {
    const issuedIndex = kkpmFlag.findIndex(
      (item) => item?.source === params?.source
    );
    if (issuedIndex >= 0) {
      const tempKkpmFlag = [...kkpmFlag];
      tempKkpmFlag[issuedIndex] = {
        ...kkpmFlag[issuedIndex],
        isIssuedPolicy: false,
      };
      setUserData({
        userData: {
          kkpmFlag: tempKkpmFlag,
        },
      });
    }
    setTemporaryHomeState({
      isUpdataModalAlreadyShowed: true,
    });
  }, [kkpmFlag, params?.source, setTemporaryHomeState, setUserData]);

  // Format Address
  const formatAddress = useCallback(
    (key) => {
      const lastOtherInfoAddress = lastOtherInfo?.address;
      const otherInfoAddress = otherInformation?.data?.address;
      const itemAddress = otherInfoAddress[key] || lastOtherInfoAddress[key];
      let textAddress;
      if (itemAddress) {
        const namaJalan = itemAddress.street || '';
        const rt = itemAddress.neighborhood || '';
        const rw = itemAddress.hamlet || '';
        const kelurahan = formatCapitalizeEachWord(
          itemAddress.subDistrict || ''
        );
        const kecamatan = formatCapitalizeEachWord(itemAddress.district || '');
        const kota = formatCapitalizeEachWord(itemAddress.city || '');
        const provinsi = formatCapitalizeEachWord(itemAddress.province || '');
        const kodePos = itemAddress.postalcode || '';
        textAddress = `${namaJalan}, ${
          rt && rw ? `RT${rt}/RW${rw}` : ''
        }, ${kelurahan}, ${kecamatan}, ${kota}, ${provinsi}, ${kodePos}`
          .replace(/ ,/g, '')
          .trim()
          .replace(/^, /g, '')
          .trim()
          .replace(/,$/g, '');
      } else {
        textAddress = '';
      }
      return textAddress;
    },
    [lastOtherInfo?.address, otherInformation?.data?.address]
  );

  const formatRekening = useCallback((bankAccount) => {
    const accountNo = bankAccount?.accountNo || '';
    const accountHolderName = bankAccount?.accountHolderName || '';
    const bankName = `\n${bankAccount?.bankName}` || '';
    return bankAccount !== null
      ? `${accountHolderName}${
          accountHolderName && accountNo ? ' - ' : ''
        }${accountNo}${bankName}`
      : '';
  }, []);

  const otherInfoForms = useMemo(() => {
    if (lastOtherInfo) {
      const phoneNumber =
        otherInformation?.data?.phoneNumber || lastOtherInfo?.phoneNumber;
      const email = otherInformation?.data?.email || lastOtherInfo?.email;
      const bankAccount =
        otherInformation?.data?.bankAccount || lastOtherInfo?.bankAccount;
      const otherInfoFlag = lastOtherInfo?.otherInformationFlag;
      const addressFlag = lastOtherInfo?.addressFlag;
      return [
        {
          id: 'M001',
          key: trans(locale, lang, 'nomorHP'),
          value: phoneNumber,
          onPress: () => navigation.navigate(NAVIGATION.UPDATA.UpdataPhone),
          isShow: otherInfoFlag?.phoneNumber?.isShow,
          isRequired: otherInfoFlag?.phoneNumber?.isRequired,
          isEditable: otherInfoFlag?.phoneNumber?.isEditable,
        },
        {
          id: 'M002',
          key: trans(locale, lang, 'email'),
          value: email,
          onPress: () => navigation.navigate(NAVIGATION.UPDATA.UpdataEmail),
          isShow: otherInfoFlag?.email?.isShow,
          isRequired: otherInfoFlag?.email?.isRequired,
          isEditable: otherInfoFlag?.email?.isEditable,
        },
        {
          id: 'M003',
          key: trans(locale, lang, 'rekening'),
          value: formatRekening(bankAccount),
          onPress: () => navigation.navigate(NAVIGATION.UPDATA.UpdataBank),
          isShow: otherInfoFlag?.bankAccount?.isShow,
          isRequired: otherInfoFlag?.bankAccount?.isRequired,
          isEditable: otherInfoFlag?.bankAccount?.isEditable,
        },
        {
          id: 'M004',
          key: trans(locale, lang, 'alamatTinggal'),
          value: formatAddress('residentAddress'),
          onPress: () => {
            navigation.navigate(NAVIGATION.UPDATA.UpdataAddress, {
              selectedAddress: 'residentAddress',
            });
          },
          isShow: addressFlag?.residentAddress?.isShow,
          isRequired: addressFlag?.residentAddress?.isRequired,
          isEditable: addressFlag?.residentAddress?.isEditable,
        },
        {
          id: 'M005',
          key: trans(locale, lang, 'alamatPenagihan'),
          value: formatAddress('billingAddress'),
          onPress: () => {
            navigation.navigate(NAVIGATION.UPDATA.UpdataAddress, {
              selectedAddress: 'billingAddress',
            });
          },
          isShow: addressFlag?.billingAddress?.isShow,
          isRequired: addressFlag?.billingAddress?.isRequired,
          isEditable: addressFlag?.billingAddress?.isEditable,
        },
        {
          id: 'M006',
          key: trans(locale, lang, 'alamatKantor'),
          value: formatAddress('officeAddress'),
          onPress: () => {
            navigation.navigate(NAVIGATION.UPDATA.UpdataAddress, {
              selectedAddress: 'officeAddress',
            });
          },
          isShow: addressFlag?.officeAddress?.isShow,
          isRequired: addressFlag?.officeAddress?.isRequired,
          isEditable: addressFlag?.officeAddress?.isEditable,
        },
        {
          id: 'M007',
          key: trans(locale, lang, 'alamatKorespondensi'),
          value: formatAddress('correspondAddress'),
          onPress: () => {
            navigation.navigate(NAVIGATION.UPDATA.UpdataAddress, {
              selectedAddress: 'correspondAddress',
            });
          },
          isShow: addressFlag?.correspondAddress?.isShow,
          isRequired: addressFlag?.correspondAddress?.isRequired,
          isEditable: addressFlag?.correspondAddress?.isEditable,
        },
      ];
    }
    return [];
  }, [
    formatAddress,
    formatRekening,
    lang,
    lastOtherInfo,
    navigation,
    otherInformation?.data?.bankAccount,
    otherInformation?.data?.email,
    otherInformation?.data?.phoneNumber,
  ]);

  const invalidForms = useMemo(() => {
    return otherInfoForms.filter((form) => form.isRequired && !form.value);
  }, [otherInfoForms]);

  // API Functions
  useEffect(() => {
    setLoading(true);
    const { category, certificateNo, policyNo, source } = params;
    getUpdataLastOtherInfo({ category, certificateNo, policyNo, source });
  }, [getUpdataLastOtherInfo, params, setLoading]);

  useEffect(() => {
    if (!getUpdataLastKKInfoResponse?.data) {
      setLoading(true);
      const { category, certificateNo, policyNo, source } = params;
      getUpdataLastKTPInfo({ category, certificateNo, policyNo, source });
    }
  }, [
    getUpdataLastKKInfoResponse?.data,
    getUpdataLastKTPInfo,
    params,
    setLoading,
  ]);

  // Callback Functions
  // Get Last KTP and KK info
  useEffect(() => {
    updataResult(updataAction);
  }, [updataAction, updataResult]);

  const updataResult = useCallback(
    (act) => {
      if (act === GET_UPDATA_LAST_OTHER_INFO_SUCCESS) {
        setLoading(false);
        getUpdataLastOtherInfoClear();
      }
      if (act === GET_UPDATA_LAST_OTHER_INFO_FAILED) {
        setLoading(false);
        getUpdataLastOtherInfoClear();
        if (getUpdataLastOtherInfoFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          Alert.alert('Error', getUpdataLastOtherInfoFailed?.message);
        }
      }
      if (act === GET_UPDATA_LAST_KTP_INFO_SUCCESS) {
        setLoading(false);
      }
      if (act === GET_UPDATA_LAST_OTHER_INFO_FAILED) {
        setLoading(false);
        const message = getUpdataLastOtherInfoFailed?.message;
        if (message !== RESPONSE_STATE.INTERNAL_SERVER_ERROR) {
          Alert.alert('Error', message);
        }
      }
      if (act === SET_UPDATA_ALTER_POLICIES_SUCCESS) {
        setLoading(false);
        setUpdataAlterPoliciesClear();
        const validationCheckRes = getUpdataValidationCheckResponse?.data;
        if (validationCheckRes?.isValid === false) {
          setLoading(true);
          setUpdataVerifyPengkinian({
            ...updataTempState?.verifyPengkinianPayload,
            family: {
              ...updataTempState?.verifyPengkinianPayload?.family,
              headOfFamilyName: 'KEPALA KELUARGA',
              address: 'JL. RAYA TAMAN APEL',
              province: 'DKI JAKARTA',
              city: 'JAKARTA BARAT',
              district: 'GROGOL PETAMBURAN',
              neighborhood: '001',
              hamlet: '001',
            },
          });
        }
        if (validationCheckRes?.isValid === true) {
          updateFlag();
          setUpdataTempStateClear();
          setOtherInformationClear();
          setIsSuccessModal(true);
        }
      }
      if (act === SET_UPDATA_ALTER_POLICIES_FAILED) {
        setLoading(false);
        setUpdataAlterPoliciesClear();
        if (setUpdataAlterPoliciesFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          Alert.alert('Error', setUpdataAlterPoliciesFailed?.message);
        }
      }
      if (act === SET_UPDATA_VERIFY_PENGKINIAN_SUCCESS) {
        setLoading(false);
        updateFlag();
        setUpdataTempStateClear();
        setOtherInformationClear();
        setIsSuccessModal(true);
      }
      if (act === SET_UPDATA_VERIFY_PENGKINIAN_FAILED) {
        setLoading(false);
        setUpdataVerifyPengkinianClear();
        if (
          setUpdataVerifyPengkinianFailed?.message !== 'INTERNAL_SERVER_ERROR'
        ) {
          Alert.alert('Error', setUpdataVerifyPengkinianFailed?.message);
        }
      }
    },
    [
      getUpdataLastOtherInfoClear,
      getUpdataLastOtherInfoFailed?.message,
      getUpdataValidationCheckResponse?.data,
      setLoading,
      setOtherInformationClear,
      setUpdataAlterPoliciesClear,
      setUpdataAlterPoliciesFailed?.message,
      setUpdataTempStateClear,
      setUpdataVerifyPengkinian,
      setUpdataVerifyPengkinianClear,
      setUpdataVerifyPengkinianFailed?.message,
      updataTempState?.verifyPengkinianPayload,
      updateFlag,
    ]
  );

  // Alter Policies
  useEffect(() => {
    if (isValidPin) {
      setIsValidPin('');
      setLoading(true);
      const { category, certificateNo, policyNo, source } = params;
      setUpdataAlterPolicies({
        category,
        certificateNo,
        policyNo,
        source,
        language: lang,
        ...getPayload(),
      });
    }
  }, [
    getPayload,
    isValidPin,
    lang,
    navigation,
    params,
    setLoading,
    setUpdataAlterPolicies,
  ]);

  const callbackValidPin = (data) => {
    setIsValidPin(data);
  };

  const getPayload = useCallback(() => {
    const rawKTP = isKTPSame
      ? getUpdataLastKTPInfoResponse?.data
      : setUpdataKTPResponse?.data?.user;
    const rawKK = isKKSame
      ? getUpdataLastKKInfoResponse?.data
      : setUpdataKKResponse?.data?.family;
    const rawOtherInfo = lastOtherInfo;
    const editKTP = setUpdataCheckKKKTPParam?.KTP;
    const editKK = setUpdataCheckKKKTPParam?.KK;
    const editOtherInfo = otherInformation?.data;
    const familyMembers = rawKK?.familyMembers;
    const rawFamilyCardData = removeColumnFromObject(rawKK, 'familyMembers');
    const tempKTP = isKTPSame
      ? getUpdataLastKTPInfoResponse?.data
      : updataTempState?.verifyPengkinianPayload?.user;

    let residentAddressTemp;
    if (tempKTP) {
      residentAddressTemp = {
        street: tempKTP?.address,
        province: tempKTP?.province,
        city: tempKTP?.city,
        district: tempKTP?.district,
        subDistrict: tempKTP?.subDistrict,
        neighborhood: tempKTP?.neighborhood,
        hamlet: tempKTP?.hamlet,
        postalcode: null,
      };
    } else {
      residentAddressTemp = null;
    }

    const validationCheckRes = getUpdataValidationCheckResponse?.data;

    const payload = {
      raw: {
        KK:
          validationCheckRes?.isValid === true
            ? null
            : {
                familyCardData: {
                  ...rawFamilyCardData,
                },
                familyMembers: [...familyMembers],
              },
        KTP: {
          user: {
            ...rawKTP,
          },
        },
        otherInformation: {
          ...rawOtherInfo,
        },
      },
      edit: {
        KK:
          validationCheckRes?.isValid === true
            ? null
            : {
                ...editKK,
              },
        KTP:
          validationCheckRes?.isValid === true
            ? {
                user: {
                  ...rawKTP,
                },
              }
            : {
                ...editKTP,
              },
        otherInformation: {
          email: editOtherInfo.email || rawOtherInfo.email,
          phoneNumber: editOtherInfo.phoneNumber || rawOtherInfo.phoneNumber,
          bankAccount: editOtherInfo.bankAccount || rawOtherInfo.bankAccount,
          address: {
            billingAddress: rawOtherInfo.address.billingAddress,
            residentAddress:
              residentAddressTemp || rawOtherInfo.address.residentAddress,
            officeAddress:
              editOtherInfo.address.officeAddress ||
              rawOtherInfo.address.officeAddress,
            correspondAddress:
              editOtherInfo.address.correspondAddress ||
              rawOtherInfo.address.correspondAddress,
          },
        },
      },
      deviceId: deviceId,
      isUploadBookAccount: updataTempState?.isUploadBookAccount,
    };
    return payload;
  }, [
    isKTPSame,
    getUpdataLastKTPInfoResponse?.data,
    setUpdataKTPResponse?.data?.user,
    isKKSame,
    getUpdataLastKKInfoResponse?.data,
    setUpdataKKResponse?.data?.family,
    lastOtherInfo,
    setUpdataCheckKKKTPParam?.KTP,
    setUpdataCheckKKKTPParam?.KK,
    otherInformation?.data,
    updataTempState?.verifyPengkinianPayload?.user,
    updataTempState?.isUploadBookAccount,
    getUpdataValidationCheckResponse?.data,
    deviceId,
  ]);

  // UI Functions

  function renderLoadingContainer() {
    if (!getUpdataLastOtherInfoFetch) {
      return (
        <View
          style={[style.loading.container, { height: dimensions.height / 2 }]}>
          <TouchableOpacity
            onPress={() => {
              setLoading(true);
              const { category, certificateNo, policyNo, source } = params;
              getUpdataLastOtherInfo({
                category,
                certificateNo,
                policyNo,
                source,
              });
            }}>
            <Text
              textStyle="bold"
              size={Size.text.body2.size}
              line={21}
              letterSpacing={0.5}
              color={Color.primary.light.primary90}>
              {trans(locale, lang, 'cobaLagi')}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }

  function renderStepsContainer() {
    return (
      <View style={style.steps.container}>
        <View style={style.steps.step.container}>
          <UpdataStep1Active />
          <View style={style.steps.step.line.active} />
          <UpdataStep2Active />
          <View style={style.steps.step.line.active} />
          <UpdataStep3Active />
          <View style={style.steps.step.line.active} />
          <UpdataStep4Active />
        </View>
        <Text
          textStyle="semi"
          size={Size.text.body2.size}
          line={21}
          letterSpacing={0.5}
          color={Color.primary.light.primary90}>
          {trans(locale, lang, 'informasiTambahan')}
        </Text>
      </View>
    );
  }

  function renderContentContainer() {
    if (!lastOtherInfo) {
      return renderLoadingContainer();
    }
    return (
      <View>
        {otherInfoForms
          .filter((form) => form.isShow)
          .map((form) => (
            <OtherInfoFormCard
              item={form}
              isShowRequiredCard={isShowRequiredCard}
            />
          ))}
      </View>
    );
  }

  function renderFooterContainer() {
    return (
      <Padder style={style.footer.container}>
        <View style={style.footer.checkBox.container}>
          <CheckBox
            disabled={false}
            value={isAgreed}
            boxType="square"
            animationDuration={0.2}
            lineWidth={2}
            tintColors={{
              true: Color.red.dark.red90,
              false: Color.neutral.light.neutral20,
            }}
            style={style.footer.checkBox.checkBox}
            onValueChange={(value) => setIsAgreed(value)}
          />
          <TouchableOpacity
            onPress={() => setIsAgreed((prevValue) => !prevValue)}
            style={style.flex}>
            <Text
              textStyle="medium"
              size={Size.text.body2.size}
              line={20}
              letterSpacing={0.5}
              color={Color.neutral.light.neutral40}
              style={style.flexShrink1}>
              {trans(locale, lang, 'sayaMenyatakanBahwa')}
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          disabled={!isAgreed}
          type="linear-gradient"
          onPress={() => {
            if (_.isEmpty(invalidForms)) {
              if (!alreadySetPin) {
                navigation.navigate(NAVIGATION.PROFILE.ProfileCreateNewPin);
              } else if (!alreadySetMPin) {
                navigation.navigate(NAVIGATION.PROFILE.ProfileChangeNewPin);
              } else {
                navigation.navigate(NAVIGATION.PROFILE.ProfileInputPin, {
                  callbackValidPin,
                });
              }
            } else {
              const label = _.map(invalidForms, 'key').join(', ');
              setToastMsg({
                type: TOAST.type.warning,
                text1: [
                  {
                    label: label + trans(locale, lang, 'isRequired'),
                    textStyle: 'medium',
                  },
                ],
              });
              setIsShowRequiredCard(true);
            }
          }}>
          {trans(locale, lang, 'submit')}
        </Button>
      </Padder>
    );
  }

  function renderSuccessModal() {
    const onBackPress = () => {
      setIsSuccessModal(false);
      navigation.reset({
        index: 0,
        routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
      });
    };
    return (
      <BottomSheet
        isVisible={isSuccessModal}
        swipeable={false}
        onClosePress={onBackPress}
        onRequestClose={onBackPress}>
        <View style={style.modal.success.container}>
          <View style={style.modal.success.icon.container}>
            <Image
              source={ReviewData}
              style={style.modal.success.icon.icon}
              resizeMode="contain"
            />
          </View>
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={22}
            letterSpacing={0.5}
            align="center"
            style={style.modal.success.title}>
            {trans(locale, lang, 'datamuKitaReview')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={20}
            letterSpacing={0.5}
            color={Color.mediumGray.light.mediumGray}
            align="center"
            style={style.modal.success.subtitle}>
            {trans(locale, lang, 'terimaKasihKamu')}
          </Text>
        </View>
        <Button
          type="linear-gradient"
          onPress={() => {
            setIsSuccessModal(false);
            navigation.reset({
              index: 0,
              routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
            });
          }}>
          {trans(locale, lang, 'lanjut')}
        </Button>
      </BottomSheet>
    );
  }

  function renderRightHeaderContent() {
    return (
      <TouchableOpacity
        style={style.me16}
        onPress={() => {
          navigation.navigate(NAVIGATION.PROFILE.ProfileHelpCenter);
        }}>
        <Headset2
          fill={isDark ? Color.main.light.black : Color.main.light.white}
        />
      </TouchableOpacity>
    );
  }

  return (
    <Base15
      isScroll
      animated
      rightHeaderContent={renderRightHeaderContent()}
      onBackPress={() => navigation.pop()}
      onChangeHeaderToDark={(value) => {
        setIsDark(value);
      }}
      title={trans(locale, lang, 'pengkinianData')}
      backgroundColor={Color.whiteBackground.light.whiteBackground}
      renderBottom={renderFooterContainer()}>
      <Padder style={style.container}>
        {renderStepsContainer()}
        {renderContentContainer()}
        {/* {renderConfirmationModal()} */}
        {renderSuccessModal()}
      </Padder>
    </Base15>
  );
}

export default UpdataInformation;

UpdataInformation.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  updataAction: PropTypes.string.isRequired,
  getUpdataLastOtherInfoFailed: PropTypes.objectOf(Object).isRequired,
  getUpdataLastOtherInfoFetch: PropTypes.bool.isRequired,
  isKTPSame: PropTypes.bool.isRequired,
  isKKSame: PropTypes.bool.isRequired,
  getUpdataLastOtherInfo: PropTypes.func.isRequired,
  getUpdataLastOtherInfoClear: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  getUpdataLastOtherInfoResponse: PropTypes.objectOf(Object).isRequired,
  setUpdataKTPResponse: PropTypes.objectOf(Object).isRequired,
  setUpdataKKResponse: PropTypes.objectOf(Object).isRequired,
  getUpdataLastKTPInfo: PropTypes.func.isRequired,
  getUpdataLastKTPInfoResponse: PropTypes.objectOf(Object).isRequired,
  getUpdataLastKKInfoResponse: PropTypes.objectOf(Object).isRequired,
  setUpdataCheckKKKTPParam: PropTypes.objectOf(Object).isRequired,
  otherInformation: PropTypes.objectOf(Object).isRequired,
  deviceId: PropTypes.string.isRequired,
  setUpdataAlterPoliciesResponse: PropTypes.objectOf(Object).isRequired,
  setUpdataAlterPoliciesFailed: PropTypes.objectOf(Object).isRequired,
  setUpdataAlterPolicies: PropTypes.func.isRequired,
  setUpdataAlterPoliciesClear: PropTypes.func.isRequired,
  setUserData: PropTypes.func.isRequired,
  setUpdataVerifyPengkinianResponse: PropTypes.objectOf(Object).isRequired,
  setUpdataVerifyPengkinianFailed: PropTypes.objectOf(Object).isRequired,
  setUpdataVerifyPengkinian: PropTypes.func.isRequired,
  setUpdataVerifyPengkinianClear: PropTypes.func.isRequired,
  updataTempState: PropTypes.objectOf(Object).isRequired,
  alreadySetPin: PropTypes.bool.isRequired,
  getUpdataValidationCheckResponse: PropTypes.objectOf(Object).isRequired,
  alreadySetMPin: PropTypes.bool.isRequired,
  setOtherInformationClear: PropTypes.func.isRequired,
  setUpdataTempStateClear: PropTypes.func.isRequired,
  dimensions: PropTypes.objectOf(Object).isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  setTemporaryHomeState: PropTypes.func.isRequired,
  setToastMsg: PropTypes.func.isRequired,
  kkpmFlag: PropTypes.instanceOf(Array).isRequired,
};
