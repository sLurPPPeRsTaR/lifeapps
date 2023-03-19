import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Alert, Image, Keyboard, View } from 'react-native';
import PropTypes from 'prop-types';
import Base from 'ca-component-container/Base';
import Size from 'ca-config/Size';
import { trans } from 'ca-util/trans';
import Text from 'ca-component-generic/Text';
import Padder from 'ca-component-container/Padder';
import Color from 'ca-config/Color';
import Dash from 'react-native-dash';
import { CloudBackground, LifetagWatch, RemoveDevice } from 'ca-config/Image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BottomSheet from 'ca-component-container/BottomSheet';
import Button from 'ca-component-generic/Button';
import { Badge, SettingSection } from 'ca-module-lifetag/components';
import {
  LIFETAG_BLOODTYPE,
  GET_LIFETAG_CURRENT_SETTING_FAILED,
  GET_LIFETAG_CURRENT_SETTING_SUCCESS,
  SET_LIFETAG_UNLINK_FAILED,
  SET_LIFETAG_UNLINK_SUCCESS,
  SET_LIFETAG_UPDATE_FAILED,
} from 'ca-module-lifetag/lifetagConstant';
import { NAVIGATION, RESPONSE_STATE } from 'ca-util/constant';
import { debounce } from 'lodash';
import Input from 'ca-component-generic/Input';
import {
  regexDiseaseHistory,
  regexMobile,
  regexName,
  regexWord,
} from 'ca-util/common';
import Splash from 'ca-component-container/Splash';
import style from './style';
import locale from './locale';

const PARAMETER_CONST = {
  deviceName: 'deviceName',
  name: 'name',
  phoneNumber: 'phoneNumber',
  emergencyPhoneNumber: 'emergencyPhoneNumber',
  bloodType: 'bloodType',
  allergic: 'allergic',
  diseaseHistory: 'diseaseHistory',
};

const dummyOtherInfo = {
  name: 'Jhon Doe',
  bloodType: 'O',
  emergencyContact: [
    {
      name: 'Jhon Doe',
      phoneNumber: '085225673521',
    },
    {
      name: 'Jhon Doe2',
      phoneNumber: '0852256735212',
    },
  ],
  allergic: ['telur', 'egg', 'garem'],
  diseaseHistory: ['COVID-19'],
};

const validationInputsState = {
  deviceName: { isValid: false, message: null },
  bloodType: { isValid: false, message: null },
  allergic: { isValid: false, message: null },
  diseaseHistory: { isValid: false, message: null },
  emergencyContact: [
    {
      name: { isValid: false, message: null },
      phoneNumber: { isValid: false, message: null },
    },
    {
      name: { isValid: false, message: null },
      phoneNumber: { isValid: false, message: null },
    },
  ],
};

function LifetagSetting(props) {
  const {
    navigation,
    lang,
    colorScheme,
    route: { params },
    lifetagAction,
    setLoading,
    getLifetagCurrentSettingResponse,
    getLifetagCurrentSettingFailed,
    getLifetagCurrentSetting,
    getLifetagCurrentSettingClear,
    setLifetagSectionSetting,
    setLifetagUpdateFailed,
    setLifetagUpdate,
    setLifetagUpdateClear,
    setLifetagUnlinkFailed,
    setLifetagUnlink,
    setLifetagUnlinkClear,
    width,
    userData,
  } = props;

  const { INTERNAL_SERVER_ERROR } = RESPONSE_STATE;
  const {
    deviceName,
    name,
    phoneNumber,
    bloodType,
    allergic,
    diseaseHistory,
    emergencyPhoneNumber,
  } = PARAMETER_CONST;

  const [isSubmit, setIsSubmit] = useState(false);

  const [isBloodTypeEnabled, setIsBloodTypeEnabled] = useState(false);
  const [isAllergyEnabled, setIsAllergyEnabled] = useState(false);
  const [isDiseaseHistoryEnabled, setIsDiseaseHistoryEnabled] = useState(false);
  const [isEmergencyPhoneNumberEnabled, setIsEmergencyPhoneNumberEnabled] =
    useState(false);

  const [otherInfo, setOtherInfo] = useState(params?.otherInfo);

  const [allergyInput, setAllergyInput] = useState('');
  const [diseaseHistoryInput, setDiseaseHistoryInput] = useState('');

  const [validationInputs, setValidationInputs] = useState(
    validationInputsState
  );

  const [unlinkConfirmationModalState, setUnlinkConfirmationModalState] =
    useState({ isVisible: false, id: '' });
  const [isSplashVisible, setIsSplashVisible] = useState(false);
  const [isValidPin, setIsValidPin] = useState('');

  const lifetagIdParams = useMemo(() => {
    return params?.lifetagId;
  }, [params?.lifetagId]);

  useEffect(() => {
    if (isValidPin) {
      Keyboard.dismiss();
      setIsSubmit(false);
      setLoading(true);
      setLifetagUnlink({ id: lifetagIdParams });
    }
  }, [isValidPin, lifetagIdParams, setLifetagUnlink, setLoading]);

  useEffect(() => {
    if (lifetagIdParams) {
      setLoading(true);
      getLifetagCurrentSetting({ id: lifetagIdParams });
    }
  }, [getLifetagCurrentSetting, lifetagIdParams, setLoading]);

  useEffect(() => {
    lifetagApiResult(lifetagAction);
  }, [lifetagApiResult, lifetagAction]);

  const lifetagApiResult = useCallback(
    (act) => {
      if (act === GET_LIFETAG_CURRENT_SETTING_SUCCESS) {
        setLoading(false);
        const data = getLifetagCurrentSettingResponse?.data;
        setIsBloodTypeEnabled(data?.isShowBloodType);
        setIsAllergyEnabled(data?.isShowAllergic);
        setIsDiseaseHistoryEnabled(data?.isShowDiseaseHistory);
        setIsEmergencyPhoneNumberEnabled(data?.isShowEmergencyPhoneNumber);
        getLifetagCurrentSettingClear();
      }
      if (act === GET_LIFETAG_CURRENT_SETTING_FAILED) {
        setLoading(false);
        const message = getLifetagCurrentSettingFailed?.message;
        if (message !== INTERNAL_SERVER_ERROR) {
          Alert.alert('Error', message);
          getLifetagCurrentSettingClear();
        }
      }
      if (act === SET_LIFETAG_UPDATE_FAILED) {
        const message = setLifetagUpdateFailed?.message;
        if (message !== INTERNAL_SERVER_ERROR) {
          Alert.alert('Error', message);
          setLifetagUpdateClear();
        }
      }
      if (act === SET_LIFETAG_UNLINK_SUCCESS) {
        setLoading(false);
        setIsSplashVisible(true);
        setTimeout(() => {
          navigation.reset({
            index: 1,
            routes: [
              { name: NAVIGATION.TABMAIN.TabMain },
              { name: NAVIGATION.LIFETAG.LifetagDeviceList },
            ],
          });
        }, 3000);
        setLifetagUnlinkClear();
      }
      if (act === SET_LIFETAG_UNLINK_FAILED) {
        setLoading(false);
        const message = setLifetagUnlinkFailed?.message;
        setLifetagUnlinkClear();
        if (message !== INTERNAL_SERVER_ERROR) {
          Alert.alert('Error', message);
        }
      }
    },
    [
      INTERNAL_SERVER_ERROR,
      getLifetagCurrentSettingClear,
      getLifetagCurrentSettingFailed?.message,
      getLifetagCurrentSettingResponse?.data,
      navigation,
      setLifetagUnlinkClear,
      setLifetagUnlinkFailed?.message,
      setLifetagUpdateClear,
      setLifetagUpdateFailed?.message,
      setLoading,
    ]
  );

  const saveToDb = useCallback(
    (data) => {
      setLifetagUpdate({ id: lifetagIdParams, ...data });
    },
    [lifetagIdParams, setLifetagUpdate]
  );

  const debouncedSave = React.useMemo(() => {
    return debounce((data) => {
      saveToDb(data);
    }, 500);
  }, [saveToDb]);

  const onOtherInfoChange = (data) => {
    debouncedSave(data);
  };

  const validateInput = useCallback(
    (key, text) => {
      if (key === name) {
        if (!text) {
          return {
            isValid: false,
            message: { warning: trans(locale, lang, `${key}IsRequired`) },
          };
        }
        const isValid = regexName.test(text) && !regexMobile.test(text);
        return {
          isValid,
          message: isValid
            ? null
            : { warning: trans(locale, lang, `${key}IsInvalid`) },
        };
      }
      if (key === phoneNumber) {
        if (!text) {
          return {
            isValid: false,
            message: { warning: trans(locale, lang, `${key}IsRequired`) },
          };
        }
        const isValid = regexMobile.test(text);
        return {
          isValid,
          message: isValid
            ? null
            : { warning: trans(locale, lang, `${key}IsInvalid`) },
        };
      }
      if (key === bloodType) {
        if (!text) {
          return {
            isValid: false,
            message: { warning: trans(locale, lang, `${key}IsRequired`) },
          };
        }
        const isValid = LIFETAG_BLOODTYPE.some(
          (item) => item === text.toUpperCase()
        );
        return {
          isValid,
          message: isValid
            ? null
            : { warning: trans(locale, lang, `${key}IsInvalid`) },
        };
      }
      if (key === allergic) {
        if (!text) {
          return {
            isValid: false,
            message: null,
          };
        }
        const isValid = regexWord.test(text);
        if (!isValid) {
          return {
            isValid: false,
            message: { warning: trans(locale, lang, `${key}IsInvalid`) },
          };
        }
        if (text?.length > 30) {
          return {
            isValid: false,
            message: { warning: trans(locale, lang, `${key}MaxLength`) },
          };
        }
      }
      if (key === diseaseHistory) {
        if (!text) {
          return {
            isValid: false,
            message: null,
          };
        }
        const isValid = regexDiseaseHistory.test(text);
        if (!isValid) {
          return {
            isValid: false,
            message: { warning: trans(locale, lang, `${key}IsInvalid`) },
          };
        }
        if (text.length > 50) {
          return {
            isValid: false,
            message: { warning: trans(locale, lang, `${key}MaxLength`) },
          };
        }
      }
      if (key === deviceName) {
        if (!text) {
          return {
            isValid: false,
            message: { warning: trans(locale, lang, `${key}IsRequired`) },
          };
        }
        const isValid = regexName.test(text);
        if (!isValid) {
          return {
            isValid,
            message: isValid
              ? null
              : { warning: trans(locale, lang, `${key}IsInvalid`) },
          };
        }
        if (text?.length > 30) {
          return {
            isValid: false,
            message: { warning: trans(locale, lang, `${key}MaxLength`) },
          };
        }
      }
      return {
        isValid: true,
        message: null,
      };
    },
    [allergic, bloodType, deviceName, diseaseHistory, lang, name, phoneNumber]
  );

  const callbackValidPin = (data) => {
    setIsValidPin(data);
  };

  function renderCaptionHeader() {
    return (
      <View style={style.mb20}>
        <Text
          textStyle="regular"
          size={Size.text.body2.size}
          line={18}
          color={Color.neutral[colorScheme].neutral40}>
          {trans(locale, lang, 'kamuDapatMerubah')}
        </Text>
      </View>
    );
  }

  function renderDeviceNameSection() {
    let profileName = '';
    if (userData?.name !== undefined) {
      profileName = userData?.name;
    }
    const key = deviceName;
    const msg = validationInputs[key].message;
    const title = trans(locale, lang, 'namaPerangkat');
    const placeholder = trans(locale, lang, 'tulisNamaPerangkat');
    const concatPlaceholder = placeholder + profileName;

    const onTextInputChange = (text) => {
      const tempOtherInfo = { ...otherInfo, name: text };
      setOtherInfo(tempOtherInfo);
      const { isValid, message } = validateInput(key, text);
      setValidationInputs((prevState) => {
        return {
          ...prevState,
          [key]: { isValid, message },
        };
      });
      if (isValid) {
        onOtherInfoChange({ ...tempOtherInfo, name: text });
      }
    };

    return (
      <View>
        <SettingSection
          title={title}
          placeholder={concatPlaceholder}
          sectionRequired
          textInputValue={otherInfo?.name}
          onTextInputChange={onTextInputChange}
          textInputMessage={msg}
        />
      </View>
    );
  }

  function renderEmergencyContactSection(item, index) {
    const key = name;
    const key2 = phoneNumber;
    const title = trans(locale, lang, 'kontakDarurat');
    const placeholder = 'John Doe';
    const placeholder2 = '+6282257385903';

    const nameInputMsg =
      validationInputs.emergencyContact[index]?.name?.message;
    const phoneNumberInputMsg =
      validationInputs.emergencyContact[index]?.phoneNumber?.message;

    const onSwitchChange = () => {
      setIsEmergencyPhoneNumberEnabled((prevState) => !prevState);
      setLifetagSectionSetting({
        id: lifetagIdParams,
        section: emergencyPhoneNumber,
      });
    };

    const onTextInputChange = (text) => {
      const tempEmergencyContact = [...otherInfo?.emergencyContact];
      tempEmergencyContact[index] = {
        ...tempEmergencyContact[index],
        name: text,
      };
      const tempOtherInfo = {
        ...otherInfo,
        emergencyContact: tempEmergencyContact,
      };
      setOtherInfo(tempOtherInfo);
      const { isValid, message } = validateInput(name, text);
      const emergencyContactValidation = [...validationInputs.emergencyContact];
      emergencyContactValidation[index][key] = { isValid, message };
      setValidationInputs((prevState) => {
        return {
          ...prevState,
          emergencyContact: emergencyContactValidation,
        };
      });
      if (isValid && item?.phoneNumber) {
        onOtherInfoChange(tempOtherInfo);
      }
    };

    const onTextInputChange2 = (text) => {
      const tempEmergencyContact = [...otherInfo?.emergencyContact];
      tempEmergencyContact[index] = {
        ...tempEmergencyContact[index],
        phoneNumber: text,
      };
      const tempOtherInfo = {
        ...otherInfo,
        emergencyContact: tempEmergencyContact,
      };
      setOtherInfo(tempOtherInfo);
      const { isValid, message } = validateInput(phoneNumber, text);
      const emergencyContactValidation = [...validationInputs.emergencyContact];
      emergencyContactValidation[index][key2] = { isValid, message };
      setValidationInputs((prevState) => {
        return {
          ...prevState,
          emergencyContact: emergencyContactValidation,
        };
      });
      if (isValid && item?.name) {
        onOtherInfoChange(tempOtherInfo);
      }
    };

    return (
      <View>
        <SettingSection
          title={index === 0 && title}
          placeholder={placeholder}
          placeholder2={placeholder2}
          textInputRequired
          textInputRequired2
          isSwitchEnabled={isEmergencyPhoneNumberEnabled}
          textInputLabel={`${trans(locale, lang, 'namaKontakDarurat')} ${
            index + 1 === 1 ? '' : index + 1
          }`}
          textInputLabel2={`${trans(locale, lang, 'nomorTeleponDarurat')} ${
            index + 1 === 1 ? '' : index + 1
          }`}
          textInputValue={item?.name}
          textInputValue2={item?.phoneNumber}
          onTextInputChange={onTextInputChange}
          onTextInputChange2={onTextInputChange2}
          textInputMessage={nameInputMsg}
          textInputMessage2={phoneNumberInputMsg}
          textInputKeyboardType2="phone-pad"
          onSwitchChange={index === 0 && onSwitchChange}
          style={
            (index === 1 || otherInfo?.emergencyContact?.length === 1) &&
            style.mb16
          }
        />
      </View>
    );
  }

  function renderAddContact() {
    const emergencyContact = otherInfo?.emergencyContact;
    const isMaxEmergencyContact = emergencyContact?.length < 2;
    return (
      <View>
        <Dash
          dashGap={0}
          dashThickness={1}
          dashColor={Color.backgroundHome[colorScheme].backgroundHome}
          style={[style.mb12]}
        />
        <TouchableOpacity
          onPress={() => {
            if (isMaxEmergencyContact) {
              const tempArray = [...emergencyContact];
              tempArray.push({
                name: null,
                phoneNumber: null,
              });
              const tempOtherInfo = {
                ...otherInfo,
                emergencyContact: tempArray,
              };
              setOtherInfo(tempOtherInfo);
            } else {
              const tempArray = [...emergencyContact];
              tempArray.pop();
              const tempOtherInfo = {
                ...otherInfo,
                emergencyContact: tempArray,
              };
              setOtherInfo(tempOtherInfo);
              onOtherInfoChange(tempOtherInfo);
            }
          }}>
          <Text
            textStyle="semi"
            size={Size.text.body2.size}
            line={20}
            align="center"
            color={Color.primary.light.primary90}>
            {isMaxEmergencyContact
              ? trans(locale, lang, 'tambahKontak')
              : trans(locale, lang, 'hapusKontak')}
          </Text>
        </TouchableOpacity>
        <Dash
          dashGap={0}
          dashThickness={1}
          dashColor={Color.backgroundHome[colorScheme].backgroundHome}
          style={[style.mt16, style.mb12]}
        />
      </View>
    );
  }

  function renderBloodTypeSection() {
    const key = bloodType;
    const msg = validationInputs[key].message;
    const title = trans(locale, lang, 'golonganDarah');
    const placeholder = 'AB';

    const onSwitchChange = () => {
      setIsBloodTypeEnabled((prevState) => !prevState);
      setLifetagSectionSetting({
        id: lifetagIdParams,
        section: bloodType,
      });
    };

    const onTextInputChange = (text) => {
      const tempOtherInfo = { ...otherInfo, [key]: text };
      setOtherInfo(tempOtherInfo);
      const { isValid, message } = validateInput(key, text);
      setValidationInputs((prevState) => {
        return {
          ...prevState,
          [key]: { isValid, message },
        };
      });
      if (isValid) {
        onOtherInfoChange({ ...tempOtherInfo, [key]: text.toUpperCase() });
      }
    };

    return (
      <View>
        <SettingSection
          title={title}
          placeholder={placeholder}
          sectionRequired
          isSwitchEnabled={isBloodTypeEnabled}
          textInputValue={otherInfo?.bloodType}
          onSwitchChange={onSwitchChange}
          onTextInputChange={onTextInputChange}
          textInputMessage={msg}
        />
        <Dash
          dashGap={0}
          dashThickness={1}
          dashColor={Color.grayBorder[colorScheme].grayBorder}
          style={style.my20}
        />
      </View>
    );
  }

  function renderAllergySection() {
    const key = allergic;
    const title = trans(locale, lang, 'alergi');
    const placeholder = trans(locale, lang, 'masukkanAlergi');
    const msg = validationInputs[key].message;

    const onSwitchChange = () => {
      setIsAllergyEnabled((prevState) => !prevState);
      setLifetagSectionSetting({
        id: lifetagIdParams,
        section: allergic,
      });
    };
    const onTextInputChange = (text) => {
      const { isValid, message } = validateInput(key, text);
      setValidationInputs((prevState) => {
        return {
          ...prevState,
          [key]: { isValid, message },
        };
      });
      setAllergyInput(text);
    };

    const onSubmitEditing = (e) => {
      const { text } = e.nativeEvent;
      if (validationInputs[key]?.isValid) {
        const tempArr = [...otherInfo?.allergic];
        const formattedText = text.replace(/  +/g, ' ').trim();
        const isSame = tempArr.some(
          (item) => item.toLowerCase() === formattedText.toLowerCase()
        );
        if (!isSame && formattedText !== '') {
          tempArr.push(formattedText);
          const tempOtherInfo = {
            ...otherInfo,
            allergic: tempArr,
          };
          setOtherInfo(tempOtherInfo);
          onOtherInfoChange(tempOtherInfo);
        }
        setAllergyInput('');
      }
    };

    const onBadgePress = (index) => {
      const tempArr = [...otherInfo?.allergic];
      tempArr.splice(index, 1);
      const tempOtherInfo = {
        ...otherInfo,
        allergic: tempArr,
      };
      setOtherInfo(tempOtherInfo);
      onOtherInfoChange(tempOtherInfo);
    };
    return (
      <View>
        <SettingSection
          title={title}
          isSwitchEnabled={isAllergyEnabled}
          onSwitchChange={onSwitchChange}
        />
        <View style={style.mb10}>
          <Input
            height={56}
            placeholder={placeholder}
            value={allergyInput}
            onChangeText={onTextInputChange}
            onSubmitEditing={onSubmitEditing}
            message={msg}
          />
        </View>
        {otherInfo?.allergic ? (
          <View style={style.badgeContainer}>
            {otherInfo?.allergic?.map((item, index) => (
              <Badge
                key={item}
                value={item}
                onPress={() => onBadgePress(index)}
              />
            ))}
          </View>
        ) : null}
        <Dash
          dashGap={0}
          dashThickness={1}
          dashColor={Color.grayBorder[colorScheme].grayBorder}
          style={style.my20}
        />
      </View>
    );
  }

  function renderDiseaseHistorySection() {
    const key = diseaseHistory;
    const title = trans(locale, lang, 'riwayatPenyakit');
    const placeholder = trans(locale, lang, 'masukkanRiwayatPenyakit');
    const msg = validationInputs[key].message;

    const onSwitchChange = () => {
      setIsDiseaseHistoryEnabled((prevState) => !prevState);
      setLifetagSectionSetting({
        id: lifetagIdParams,
        section: diseaseHistory,
      });
    };
    const onTextInputChange = (text) => {
      const { isValid, message } = validateInput(key, text);
      setValidationInputs((prevState) => {
        return {
          ...prevState,
          [key]: { isValid, message },
        };
      });
      setDiseaseHistoryInput(text);
    };

    const onSubmitEditing = (e) => {
      const { text } = e.nativeEvent;
      if (validationInputs[key]?.isValid) {
        const tempArr = [...otherInfo?.diseaseHistory];
        const formattedText = text.replace(/  +/g, ' ').trim();
        const isSame = tempArr.some(
          (item) => item.toLowerCase() === formattedText.toLowerCase()
        );
        if (!isSame && formattedText !== '') {
          tempArr.push(formattedText);
          const tempOtherInfo = {
            ...otherInfo,
            diseaseHistory: tempArr,
          };
          setOtherInfo(tempOtherInfo);
          onOtherInfoChange(tempOtherInfo);
        }
        setDiseaseHistoryInput('');
      }
    };

    const onBadgePress = (index) => {
      const tempArr = [...otherInfo?.diseaseHistory];
      tempArr.splice(index, 1);
      const tempOtherInfo = {
        ...otherInfo,
        diseaseHistory: tempArr,
      };
      setOtherInfo(tempOtherInfo);
      onOtherInfoChange(tempOtherInfo);
    };
    return (
      <View style={style.mb20}>
        <SettingSection
          title={title}
          isSwitchEnabled={isDiseaseHistoryEnabled}
          onSwitchChange={onSwitchChange}
        />
        <View style={style.mb10}>
          <Input
            height={56}
            placeholder={placeholder}
            value={diseaseHistoryInput}
            onChangeText={onTextInputChange}
            onSubmitEditing={onSubmitEditing}
            message={msg}
          />
        </View>
        {otherInfo?.diseaseHistory ? (
          <View style={style.badgeContainer}>
            {otherInfo?.diseaseHistory?.map((item, index) => (
              <Badge
                key={item}
                value={item}
                onPress={() => onBadgePress(index)}
              />
            ))}
          </View>
        ) : null}
      </View>
    );
  }

  function renderLifeTagDeviceCard(id) {
    const onUnlinkPress = () => {
      setUnlinkConfirmationModalState({ isVisible: true, id });
    };
    return (
      <View
        style={[style.flexDirectionRow, style.alignItemsCenter, style.mb16]}>
        <Image
          source={LifetagWatch}
          style={[style.lifetagDevice.image, style.me16]}
        />
        <View style={style.flex1}>
          <Text
            textStyle="semi"
            size={Size.text.caption1.size}
            line={18}
            style={style.flexShrink1}>
            LifeTag {otherInfo?.name}
          </Text>
          <TouchableOpacity onPress={onUnlinkPress}>
            <Text
              textStyle="medium"
              size={Size.text.caption1.size}
              line={18}
              color={Color.primary[colorScheme].primary90}>
              {trans(locale, lang, 'unlinkLifetag')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderLifeTagDeviceContainer() {
    return (
      <Padder>
        <Text textStyle="semi" size={Size.text.body2.size} line={30}>
          {trans(locale, lang, 'pengaturanLifeTag')}
        </Text>
        <Text
          textStyle="regular"
          size={Size.text.body2.size}
          line={18}
          color={Color.neutral[colorScheme].neutral10}
          style={style.mb26}>
          {trans(locale, lang, 'kamuDapatMenghapus')}
        </Text>
        {renderLifeTagDeviceCard(params?.id)}
      </Padder>
    );
  }

  function renderUnlinkConfirmationModal() {
    const closeModal = () => {
      setUnlinkConfirmationModalState({ isVisible: false, id: '' });
    };
    const onConfirmPress = () => {
      // do something
      closeModal();
      if (!userData?.alreadySetPin || !userData?.alreadySetMPin) {
        navigation.navigate(NAVIGATION.PROFILE.ProfileCreateNewPin);
      } else {
        setIsSubmit(true);
        navigation.navigate(NAVIGATION.PROFILE.ProfileInputPin, {
          callbackValidPin,
        });
      }
    };
    return (
      <BottomSheet
        isVisible={unlinkConfirmationModalState.isVisible}
        swipeable={false}>
        <View style={style.modal.unlink.container}>
          <Image source={RemoveDevice} style={style.modal.unlink.image} />
        </View>
        <View>
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={30}
            align="center"
            style={style.mb4}>
            {trans(locale, lang, 'hapusDariPerangkat')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            align="center"
            color={Color.textNotif.light.color}
            style={style.mb26}>
            {trans(locale, lang, 'apakahKamuYakin')}
          </Text>
          <Button outline style={style.mb16} onPress={closeModal}>
            {trans(locale, lang, 'kembali')}
          </Button>
          <Button
            disabled={isSubmit}
            type="linear-gradient"
            onPress={onConfirmPress}>
            {trans(locale, lang, 'hapusPerangkat')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  function renderSplash() {
    return (
      <Splash
        isVisible={isSplashVisible}
        title={trans(locale, lang, 'kamuBerhasilMenghapus')}
      />
    );
  }

  return (
    <>
      <Base
        bordered
        title={trans(locale, lang, 'pengaturanLifeTag')}
        onBackPress={() => navigation.pop()}
        backgroundColor={Color.whiteLifesaverBg.light.color}>
        <Padder style={style.container}>
          {renderCaptionHeader()}
          {renderDeviceNameSection()}
          <Dash
            dashGap={0}
            dashThickness={1}
            dashColor={Color.grayBorder[colorScheme].grayBorder}
            style={style.my20}
          />
          {otherInfo?.emergencyContact.map((item, index) => {
            return renderEmergencyContactSection(item, index);
          })}
          {renderAddContact()}
          {renderBloodTypeSection()}
          {renderAllergySection()}
          {renderDiseaseHistorySection()}
        </Padder>
        <Dash
          dashGap={0}
          dashThickness={10}
          dashColor={Color.backgroundHome[colorScheme].backgroundHome}
        />
        <View style={style.container}>
          {renderLifeTagDeviceContainer()}
          <Image
            source={CloudBackground}
            style={[style.cloudBackground, { width }]}
            resizeMode="cover"
          />
        </View>
        {renderUnlinkConfirmationModal()}
      </Base>
      {renderSplash()}
    </>
  );
}

export default LifetagSetting;

LifetagSetting.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  lifetagAction: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  getLifetagCurrentSettingResponse: PropTypes.objectOf(Object).isRequired,
  getLifetagCurrentSettingFailed: PropTypes.objectOf(Object).isRequired,
  getLifetagCurrentSetting: PropTypes.func.isRequired,
  getLifetagCurrentSettingClear: PropTypes.func.isRequired,
  setLifetagSectionSetting: PropTypes.func.isRequired,
  setLifetagUpdateFailed: PropTypes.objectOf(Object).isRequired,
  setLifetagUpdate: PropTypes.func.isRequired,
  setLifetagUpdateClear: PropTypes.func.isRequired,
  setLifetagUnlinkFailed: PropTypes.objectOf(Object).isRequired,
  setLifetagUnlink: PropTypes.func.isRequired,
  setLifetagUnlinkClear: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  userData: PropTypes.objectOf(Object).isRequired,
};
