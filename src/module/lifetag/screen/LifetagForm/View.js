import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  Platform,
  Pressable,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import Base from 'ca-component-container/Base';
import { trans } from 'ca-util/trans';
import Text from 'ca-component-generic/Text';
import { LifeTagFormIllustration } from 'ca-config/Image';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import Input from 'ca-component-generic/Input';
import Dash from 'react-native-dash';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Padder from 'ca-component-container/Padder';
import Button from 'ca-component-generic/Button';
import Splash from 'ca-component-container/Splash';
import { NAVIGATION, RESPONSE_STATE } from 'ca-util/constant';
import {
  LIFETAG_BLOODTYPE,
  SET_LINK_LIFETAG_FAILED,
  SET_LINK_LIFETAG_SUCCESS,
} from 'ca-module-lifetag/lifetagConstant';
import { Badge, SettingSection } from 'ca-module-lifetag/components';
import CheckBox from '@react-native-community/checkbox';
import {
  regexDiseaseHistory,
  regexMobile,
  regexName,
  regexWord,
} from 'ca-util/common';
import Shadow from 'ca-component-container/Shadow';
import style from './style';
import locale from './locale';

const initialState = {
  name: '',
  bloodType: '',
  allergic: [],
  diseaseHistory: [],
  emergencyContact: [{ name: '', phoneNumber: '' }],
};

const PARAMETER_CONST = {
  deviceName: 'deviceName',
  name: 'name',
  phoneNumber: 'phoneNumber',
  emergencyPhoneNumber: 'emergencyPhoneNumber',
  bloodType: 'bloodType',
  allergic: 'allergic',
  diseaseHistory: 'diseaseHistory',
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
  ],
};

function LifetagForm(props) {
  const {
    navigation,
    lang,
    colorScheme,
    route: { params },
    lifetagAction,
    setLinkLifetagResponse,
    setLinkLifetagFailed,
    setLoading,
    setLinkLifetag,
    setLinkLifetagClear,
    userData,
  } = props;

  const { INTERNAL_SERVER_ERROR } = RESPONSE_STATE;
  const { deviceName, name, phoneNumber, bloodType, allergic, diseaseHistory } =
    PARAMETER_CONST;

  const [isBloodTypeEnabled, setIsBloodTypeEnabled] = useState(true);
  const [isAllergyEnabled, setIsAllergyEnabled] = useState(true);
  const [isDiseaseHistoryEnabled, setIsDiseaseHistoryEnabled] = useState(true);
  const [isEmergencyPhoneNumberEnabled, setIsEmergencyPhoneNumberEnabled] =
    useState(true);

  const [inputForm, setInputForm] = useState(initialState);
  const [validationInputs, setValidationInputs] = useState(
    validationInputsState
  );

  const [isSubmit, setIsSubmit] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  const [allergyInput, setAllergyInput] = useState('');
  const [diseaseHistoryInput, setDiseaseHistoryInput] = useState('');

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    if (params?.lifetagOtherInfo) {
      const emergencyContactLength =
        params?.lifetagOtherInfo.emergencyContact.length;

      const tempEmergencyContactValidation = [];
      for (let i = 0; i < emergencyContactLength; i += 1) {
        tempEmergencyContactValidation.push({
          name: { isValid: true, message: null },
          phoneNumber: { isValid: true, message: null },
        });
      }
      setValidationInputs((prevState) => {
        return {
          ...prevState,
          bloodType: { isValid: true, message: null },
          allergic: { isValid: true, message: null },
          diseaseHistory: { isValid: true, message: null },
          emergencyContact: tempEmergencyContactValidation,
        };
      });

      setInputForm((prevState) => {
        return {
          ...prevState,
          ...params?.lifetagOtherInfo,
        };
      });
    }
  }, [params?.lifetagOtherInfo]);

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
    setLinkLifetagResult(lifetagAction);
  }, [lifetagAction, setLinkLifetagResult]);

  const setLinkLifetagResult = useCallback(
    (act) => {
      if (act === SET_LINK_LIFETAG_SUCCESS) {
        setLoading(false);
        setIsSubmit(false);
        setIsSplashVisible(true);
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [
              {
                name: NAVIGATION.LIFETAG.LifetagMain,
                params: { lifetagId: params?.lifetagId },
              },
            ],
          });
        }, 3000);
        setLinkLifetagClear();
      }
      if (act === SET_LINK_LIFETAG_FAILED) {
        setLoading(false);
        setIsSubmit(false);
        const message = setLinkLifetagFailed?.message;
        if (message !== INTERNAL_SERVER_ERROR) {
          Alert.alert('Error', message);
          setLinkLifetagClear();
        }
      }
    },
    [
      INTERNAL_SERVER_ERROR,
      navigation,
      params?.lifetagId,
      setLinkLifetagClear,
      setLinkLifetagFailed?.message,
      setLoading,
    ]
  );

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
        if (text.length > 30) {
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
        if (text.length > 30) {
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

  function renderHeaderContainer() {
    return (
      <View style={style.header.container}>
        <Image
          source={LifeTagFormIllustration}
          style={style.header.image}
          resizeMode="cover"
        />
        <Text
          textStyle="bold"
          size={Size.text.h6.size}
          align="center"
          style={style.header.title}>
          {trans(locale, lang, 'isiDataDiri')}
        </Text>
        <Text
          textStyle="medium"
          size={Size.text.body2.size}
          color={Color.mediumGray.light.mediumGray}
          style={style.header.subtitle}
          align="center">
          {trans(locale, lang, 'loremIpsum')}
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
    const title = trans(locale, lang, 'namaPerangkat');
    const placeholder = trans(locale, lang, 'tulisNamaPerangkat');
    const concatPlaceholder = placeholder + profileName;
    const msg = validationInputs[key].message;

    const onTextInputChange = (text) => {
      const { isValid, message } = validateInput(key, text);
      setValidationInputs((prevState) => {
        return {
          ...prevState,
          [key]: { isValid, message },
        };
      });

      setInputForm((prevState) => {
        return {
          ...prevState,
          name: text,
        };
      });
    };
    return (
      <View>
        <SettingSection
          title={title}
          sectionRequired
          placeholder={concatPlaceholder}
          textInputValue={inputForm.name}
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
    const placeholder = trans(locale, lang, 'masukkanNamaKontakDarurat');
    const placeholder2 = trans(locale, lang, 'masukkanNomorTeleponDarurat');

    const nameInputMsg = validationInputs.emergencyContact[index][key].message;
    const phoneNumberInputMsg =
      validationInputs.emergencyContact[index][key2].message;

    const onSwitchChange = () => {
      setIsEmergencyPhoneNumberEnabled((prevState) => !prevState);
    };

    const onTextInputChange = (text) => {
      const tempEmergencyContact = [...inputForm?.emergencyContact];
      tempEmergencyContact[index] = {
        ...tempEmergencyContact[index],
        [key]: text,
      };
      const tempOtherInfo = {
        ...inputForm,
        emergencyContact: tempEmergencyContact,
      };

      const emergencyContactValidation = [...validationInputs.emergencyContact];
      emergencyContactValidation[index][key] = validateInput(key, text);
      setValidationInputs((prevState) => {
        return {
          ...prevState,
          emergencyContact: emergencyContactValidation,
        };
      });
      setInputForm(tempOtherInfo);
    };

    const onTextInputChange2 = (text) => {
      const tempEmergencyContact = [...inputForm?.emergencyContact];
      tempEmergencyContact[index] = {
        ...tempEmergencyContact[index],
        phoneNumber: text,
      };
      const tempOtherInfo = {
        ...inputForm,
        emergencyContact: tempEmergencyContact,
      };

      const emergencyContactValidation = [...validationInputs.emergencyContact];
      emergencyContactValidation[index][key2] = validateInput(key2, text);
      setValidationInputs((prevState) => {
        return {
          ...prevState,
          emergencyContact: emergencyContactValidation,
        };
      });
      setInputForm(tempOtherInfo);
    };

    return (
      <View>
        <SettingSection
          title={index === 0 && title}
          placeholder={`${placeholder} ${index + 1 === 1 ? '' : index + 1}`}
          placeholder2={`${placeholder2} ${index + 1 === 1 ? '' : index + 1}`}
          isSwitchEnabled={isEmergencyPhoneNumberEnabled}
          textInputRequired
          textInputRequired2
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
          isTextInputDisabled={!!params?.lifetagOtherInfo}
          isTextInput2Disabled={!!params?.lifetagOtherInfo}
          style={
            (index === 1 || inputForm?.emergencyContact.length === 1) &&
            style.mb18
          }
        />
      </View>
    );
  }

  function renderAddContact() {
    const emergencyContact = inputForm?.emergencyContact;
    const isMaxEmergencyContact = emergencyContact.length < 2;
    if (params?.lifetagOtherInfo) {
      return null;
    }
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
              const tempArray = emergencyContact;
              tempArray.push({});
              setInputForm((prevState) => {
                return {
                  ...prevState,
                  emergencyContact: tempArray,
                };
              });

              const tempEmergencyContactValidation = [
                ...validationInputs.emergencyContact,
              ];
              tempEmergencyContactValidation.push({
                name: { isValid: false, message: null },
                phoneNumber: { isValid: false, message: null },
              });
              setValidationInputs((prevState) => {
                return {
                  ...prevState,
                  emergencyContact: tempEmergencyContactValidation,
                };
              });
            } else {
              const tempArray = emergencyContact;
              tempArray.pop();
              setInputForm((prevState) => {
                return {
                  ...prevState,
                  emergencyContact: tempArray,
                };
              });

              const tempEmergencyContactValidation = [
                ...validationInputs.emergencyContact,
              ];
              tempEmergencyContactValidation.pop();
              setValidationInputs((prevState) => {
                return {
                  ...prevState,
                  emergencyContact: tempEmergencyContactValidation,
                };
              });
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
          style={[style.mt12]}
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

  function renderBloodTypeSection() {
    const key = bloodType;
    const title = trans(locale, lang, 'golonganDarah');
    const placeholder = 'AB';
    const onSwitchChange = () => {
      setIsBloodTypeEnabled((prevState) => !prevState);
    };
    const msg = validationInputs[key].message;

    const onTextInputChange = (text) => {
      const { isValid, message } = validateInput(key, text);
      setValidationInputs((prevState) => {
        return {
          ...prevState,
          [key]: { isValid, message },
        };
      });

      setInputForm((prevState) => {
        return {
          ...prevState,
          [key]: text,
        };
      });
    };
    return (
      <View>
        <SettingSection
          title={title}
          sectionRequired
          placeholder={placeholder}
          isSwitchEnabled={isBloodTypeEnabled}
          textInputValue={inputForm.bloodType}
          onSwitchChange={onSwitchChange}
          onTextInputChange={onTextInputChange}
          textInputMessage={msg}
          isTextInputDisabled={!!params?.lifetagOtherInfo}
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
    const placeholder = 'Udang';
    const msg = validationInputs[key].message;

    const onSwitchChange = () => {
      setIsAllergyEnabled((prevState) => !prevState);
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
        const tempArr = [...inputForm?.allergic];
        const formattedText = text.replace(/  +/g, ' ').trim();
        const isSame = tempArr.some(
          (item) => item.toLowerCase() === formattedText.toLowerCase()
        );
        if (!isSame && formattedText !== '') {
          tempArr.push(formattedText);
          const tempInputForm = {
            ...inputForm,
            allergic: tempArr,
          };
          setInputForm(tempInputForm);
        }
        setAllergyInput('');
      }
    };

    const onBadgePress = (index) => {
      const tempArr = [...inputForm?.allergic];
      tempArr.splice(index, 1);
      const tempInputForm = {
        ...inputForm,
        allergic: tempArr,
      };
      setInputForm(tempInputForm);
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
            disabled={!!params?.lifetagOtherInfo}
          />
        </View>
        {inputForm?.allergic ? (
          <View style={style.badgeContainer}>
            {inputForm?.allergic?.map((item, index) => (
              <Badge
                disabled={!!params.lifetagOtherInfo}
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
        const tempArr = [...inputForm?.diseaseHistory];
        const formattedText = text.replace(/  +/g, ' ').trim();
        const isSame = tempArr.some(
          (item) => item.toLowerCase() === formattedText.toLowerCase()
        );
        if (!isSame && formattedText !== '') {
          tempArr.push(formattedText);
          const tempInputForm = {
            ...inputForm,
            diseaseHistory: tempArr,
          };
          setInputForm(tempInputForm);
        }
        setDiseaseHistoryInput('');
      }
    };

    const onBadgePress = (index) => {
      const tempArr = [...inputForm?.diseaseHistory];
      tempArr.splice(index, 1);
      const tempInputForm = {
        ...inputForm,
        diseaseHistory: tempArr,
      };
      setInputForm(tempInputForm);
    };
    return (
      <View>
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
            disabled={!!params?.lifetagOtherInfo}
          />
        </View>
        {inputForm?.diseaseHistory ? (
          <View style={style.badgeContainer}>
            {inputForm?.diseaseHistory?.map((item, index) => (
              <Badge
                disabled={!!params.lifetagOtherInfo}
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

  function renderSummaryForm() {
    const renderRow = (key, value) => {
      return (
        <View style={style.content.row}>
          <Text
            textStyle="medium"
            size={Size.text.caption1.size}
            line={17}
            align="left"
            color={Color.mediumGray[colorScheme].mediumGray}
            style={style.flex1}>
            {key}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.caption1.size}
            line={17}
            align="right"
            color={Color.mediumGray[colorScheme].mediumGray}
            style={[style.flex1, style.fS1]}>
            {value}
          </Text>
        </View>
      );
    };
    return (
      <Shadow borderRadius={16} style={style.mt18}>
        <Padder style={style.py16}>
          <View>
            <Text
              textStyle="semi"
              size={Size.text.caption1.size}
              style={style.mb10}>
              {trans(locale, lang, 'informasiDarurat')}
            </Text>
            {inputForm.emergencyContact.map((item, index) => {
              const indexLabel = index + 1 > 1 ? ' ' + (index + 1) : '';
              return (
                <View key={item.name}>
                  {renderRow(
                    trans(locale, lang, 'namaKontakDarurat') + indexLabel,
                    item?.name
                  )}
                  {renderRow(
                    trans(locale, lang, 'nomorTeleponDarurat') + indexLabel,
                    item?.phoneNumber
                  )}
                  {inputForm.emergencyContact.length > 1 &&
                    index !== inputForm.emergencyContact.length - 1 && (
                      <Dash
                        dashGap={0}
                        dashThickness={1}
                        dashColor={Color.grayBorder[colorScheme].grayBorder}
                        style={style.my10}
                      />
                    )}
                </View>
              );
            })}
          </View>
          <Dash
            dashGap={0}
            dashThickness={1}
            dashColor={Color.grayBorder[colorScheme].grayBorder}
            style={style.my10}
          />
          <View>
            <Text
              textStyle="semi"
              size={Size.text.caption1.size}
              style={style.mb10}>
              {trans(locale, lang, 'informasiKesehatan')}
            </Text>
            {renderRow(
              trans(locale, lang, 'golonganDarah'),
              inputForm.bloodType
            )}
            {renderRow(
              trans(locale, lang, 'alergi'),
              inputForm.allergic?.join(', ') || '-'
            )}
            {renderRow(
              trans(locale, lang, 'riwayatPenyakit'),
              inputForm.diseaseHistory?.join(', ') || '-'
            )}
          </View>
        </Padder>
      </Shadow>
    );
  }

  function renderTermsConditions() {
    if (isKeyboardVisible) {
      return null;
    }
    const checkboxStyle =
      Platform.OS === 'ios'
        ? { transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }], marginTop: 1 }
        : { transform: [{ scaleX: 1 }, { scaleY: 1 }], marginTop: -2 };
    return (
      <View style={style.termsConditions.container}>
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
          onFillColor={Color.red.dark.red90}
          onCheckColor={Color.neutral.light.neutral20}
          onValueChange={(value) => {
            setIsAgreed(value);
          }}
          style={[checkboxStyle, style.mE12]}
        />
        <Pressable
          onPress={() => {
            setIsAgreed((prevState) => !prevState);
          }}
          style={style.fS1}>
          <View>
            <Text
              textStyle="medium"
              size={Size.text.body2.size}
              line={22}
              color={Color.neutral.light.neutral40}
              style={[style.fS1]}>
              {trans(locale, lang, 'sayaMenyatakanBahwa')}
            </Text>
          </View>
        </Pressable>
      </View>
    );
  }

  function renderFooterContainer() {
    const onPress = () => {
      Keyboard.dismiss();
      setIsSubmit(true);
      setLoading(true);
      setLinkLifetag({
        id: params?.lifetagId,
        ...inputForm,
        bloodType: inputForm.bloodType.toUpperCase(),
        isShowBloodType: isBloodTypeEnabled,
        isShowAllergic: isAllergyEnabled,
        isShowDiseaseHistory: isDiseaseHistoryEnabled,
        isShowEmergencyPhoneNumber: isEmergencyPhoneNumberEnabled,
      });
    };

    const isEmergencyContactValid = validationInputs.emergencyContact.every(
      (item) => {
        return item.name.isValid === true && item.phoneNumber.isValid === true;
      }
    );

    const keyboardVisibleStyle = !isKeyboardVisible
      ? { paddingBottom: 48 }
      : { paddingBottom: 16 };

    const isInvalidForm =
      isSubmit ||
      !isAgreed ||
      !validationInputs.bloodType.isValid ||
      !validationInputs.deviceName.isValid ||
      !isEmergencyContactValid ||
      inputForm.emergencyContact.length < 1;

    return (
      <View style={[style.footer.container, style.footer.boxShadow]}>
        <Padder style={[style.footer.container, keyboardVisibleStyle]}>
          {renderTermsConditions()}
          <Button
            type="linear-gradient"
            onPress={onPress}
            disabled={isSubmit || isInvalidForm}>
            {trans(locale, lang, 'lanjutkan')}
          </Button>
        </Padder>
      </View>
    );
  }

  function renderSplash() {
    return (
      <Splash
        isVisible={isSplashVisible}
        title={trans(locale, lang, 'lifetagBerhasilDibuat')}
      />
    );
  }

  return (
    <>
      <Base
        isPaddingBottom={false}
        bordered
        title={trans(locale, lang, 'hubungkanLifeTag')}
        onBackPress={() => {
          if (navigation.canGoBack()) {
            navigation.pop();
          } else {
            navigation.reset({
              index: 0,
              routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
            });
          }
        }}
        backgroundColor={Color.greyBackround.light.greyBackground}
        renderBottom={renderFooterContainer()}>
        <View style={[style.container, style.pb16]}>
          {renderHeaderContainer()}
          <Padder>
            {renderDeviceNameSection()}
            {params?.lifetagOtherInfo ? (
              renderSummaryForm()
            ) : (
              <>
                <Dash
                  dashGap={0}
                  dashThickness={1}
                  dashColor={Color.grayBorder[colorScheme].grayBorder}
                  style={style.my20}
                />
                {inputForm?.emergencyContact.map((item, index) => {
                  return renderEmergencyContactSection(item, index);
                })}
                {renderAddContact()}
                {renderBloodTypeSection()}
                {renderAllergySection()}
                {renderDiseaseHistorySection()}
              </>
            )}
          </Padder>
        </View>
      </Base>
      {renderSplash()}
    </>
  );
}

export default LifetagForm;

LifetagForm.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  lifetagAction: PropTypes.string.isRequired,
  setLinkLifetagResponse: PropTypes.objectOf(Object).isRequired,
  setLinkLifetagFailed: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  setLinkLifetag: PropTypes.func.isRequired,
  setLinkLifetagClear: PropTypes.func.isRequired,
  userData: PropTypes.objectOf(Object).isRequired,
};
