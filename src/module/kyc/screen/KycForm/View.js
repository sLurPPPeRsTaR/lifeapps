import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import Base from 'ca-component-container/Base';
import { trans } from 'ca-util/trans';
import Padder from 'ca-component-container/Padder';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import Input from 'ca-component-generic/Input';
import Button from 'ca-component-generic/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate } from 'ca-util/format';
import moment from 'moment/min/moment-with-locales';
import { NAVIGATION } from 'ca-util/constant';
import {
  SET_KYC_VERIFYIDCARD_SUCCESS,
  SET_KYC_VERIFYIDCARD_FAILED,
  SET_KYC_VERIFYDUKCAPIL_SUCCESS,
  SET_KYC_VERIFYDUKCAPIL_FAILED,
} from 'ca-module-kyc/kycConstant';
import BottomSheet from 'ca-component-container/BottomSheet';
import { KTPMukatidakcocok, KTP_tidakcocok } from 'ca-config/Image';
import Dash from 'react-native-dash';
import { ArrowDownGray, Calendar } from 'ca-config/Svg';
import {
  regexAddress,
  regexBirthPlace,
  regexNameBachelorDegree,
  regexNumeric,
} from 'ca-util/common';
import CheckBox from '@react-native-community/checkbox';
import locale from './locale';
import style from './style';

function KycForm(props) {
  const {
    navigation,
    lang,
    kycAction,
    setKycVerifyIdCard,
    setKycVerifyIdCardFailed,
    setKycVerifyIdCardClear,
    setKycIdCardResponse,
    setLoading,
    setUserData,
    setKycVerifyDukcapil,
    setKycVerifyDukcapilResponse,
    setKycVerifyDukcapilClear,
    setKycVerifyDukcapilFailed,
  } = props;
  moment.locale(lang);

  const [dataKtp, setDataKtp] = useState({
    idCardNumber: setKycIdCardResponse?.data?.user?.idCardNumber,
    name: setKycIdCardResponse?.data?.user?.name,
    gender: setKycIdCardResponse?.data?.user?.gender,
    pob: setKycIdCardResponse?.data?.user?.pob,
    dob: setKycIdCardResponse?.data?.user?.dob?.split('-').reverse().join('-'),
    address: setKycIdCardResponse?.data?.user?.address,
    province: setKycIdCardResponse?.data?.user?.province,
    city: setKycIdCardResponse?.data?.user?.city,
    district: setKycIdCardResponse?.data?.user?.district,
    subDistrict: setKycIdCardResponse?.data?.user?.subDistrict,
    neighborhood: setKycIdCardResponse?.data?.user?.neighborhood,
    hamlet: setKycIdCardResponse?.data?.user?.hamlet,
    maritalStatus: setKycIdCardResponse?.data?.user?.maritalStatus,
    occupation: setKycIdCardResponse?.data?.user?.occupation,
    nationality: 'WNI',
  });
  const [gender, setGender] = useState(dataKtp?.gender);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [birthDate, setBirthDate] = useState('');
  const [marital, setMarital] = useState(
    setKycIdCardResponse?.data?.user?.maritalStatus
  );
  const [isSubmit, setIsSubmit] = useState(false);
  const [isValidName, setValidName] = useState(true);
  const [isValidateNik, setValidNik] = useState(true);
  const [nameMessage, setNameMessage] = useState(null);
  const [nikMessage, setNikMessage] = useState(null);
  const [isAgreed, setIsAgreed] = useState(false);

  // Modal
  const [isKtpNotValidModalVisible, setKtpNotValidModalVisible] =
    useState(false);
  const [isMaritalOptModalVisible, setMaritalOptModalVisible] = useState(false);
  const [isKtpExistModalVisible, setKtpExistModalVisible] = useState(false);

  const todayDate = new Date();
  const yesterdayDate = todayDate.setDate(todayDate.getDate() - 1);

  const [date, setDate] = useState(
    new Date(dataKtp.dob ? dataKtp.dob : new Date(yesterdayDate))
  );

  const onChangeDatePicker = (event, selectedDate) => {
    setShow(!show);
    if (event.type !== 'dismissed') {
      setDate(selectedDate);
      setBirthDate(new Date(selectedDate));
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  // MaritalOpt
  const maritalOpt = [
    { key: 0, opt: trans(locale, lang, 'belumKawin') },
    { key: 1, opt: trans(locale, lang, 'kawin') },
    { key: 2, opt: trans(locale, lang, 'ceraiHidup') },
    { key: 3, opt: trans(locale, lang, 'ceraiMati') },
  ];

  useLayoutEffect(() => {
    setValidName(validateName(dataKtp?.name));
    setValidNik(validateNik(dataKtp?.idCardNumber));
  }, [dataKtp?.idCardNumber, dataKtp?.name, validateName, validateNik]);

  useEffect(() => {
    setKycResult(kycAction);
  }, [kycAction, setKycResult]);

  const validateName = useCallback(
    (txt) => {
      if (txt?.length < 1) {
        setNameMessage({ error: trans(locale, lang, 'mohonPeriksaKembali') });
        return false;
      }
      if (!regexNameBachelorDegree.test(txt)) {
        setNameMessage({ warning: trans(locale, lang, 'mohonPeriksaKembali') });
        return false;
      }
      if (txt?.length > 100) {
        setNameMessage({
          error: trans(locale, lang, 'mohonPeriksaKembali'),
        });
        return false;
      }
      setNameMessage(null);
      return true;
    },
    [lang]
  );

  const validateNik = useCallback(
    (txt) => {
      if (txt?.length < 16) {
        setNikMessage({
          error: trans(locale, lang, 'nikTidakSesuai'),
        });
        return false;
      }
      setNikMessage(null);
      return true;
    },
    [lang]
  );

  const RadioButton = useCallback(
    ({ descRb, valueRb, onPress }) => {
      return (
        <TouchableOpacity onPress={onPress}>
          <View style={style.radioButton.radioButtonContainer}>
            <View style={style.radioButton.radioButtonContent}>
              {gender === valueRb ? (
                <View style={style.radioButton.radioButtonCircle} />
              ) : null}
            </View>
            <Text
              allowFontScaling={false}
              textStyle="medium"
              size={Size.text.body2.size}
              line={21}
              color={
                gender === valueRb
                  ? Color.neutral.light.neutral60
                  : Color.grayIcon.dark.grayIcon
              }>
              {descRb}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    [gender]
  );

  const setKycResult = useCallback(
    (act) => {
      // VERIFY DUKCAPIL
      if (act === SET_KYC_VERIFYDUKCAPIL_SUCCESS) {
        setIsSubmit(false);
        setLoading(false);
        const res = setKycVerifyDukcapilResponse?.data;
        if (res?.isVerified === true) {
          setLoading(true);
          setKycVerifyIdCard({
            user: {
              idCardNumber: dataKtp?.idCardNumber,
              name: !res.isTrimmed
                ? dataKtp?.name
                : dataKtp?.name
                    .substring(0, dataKtp?.name?.indexOf(','))
                    .trim(),
              gender,
              pob: dataKtp?.pob,
              dob: moment(date).format('DD-MM-YYYY'),
              address: dataKtp?.address,
              province: dataKtp?.province,
              city: dataKtp?.city,
              district: dataKtp?.district,
              subDistrict: dataKtp?.subDistrict,
              neighborhood: dataKtp?.neighborhood || null,
              hamlet: dataKtp?.hamlet || null,
              maritalStatus: marital,
              occupation: dataKtp?.occupation,
              nationality: 'WNI',
            },
          });
        }
      }
      if (act === SET_KYC_VERIFYDUKCAPIL_FAILED) {
        setIsSubmit(false);
        setLoading(false);
        if (setKycVerifyDukcapilFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          if (setKycVerifyDukcapilFailed?.message === 'NOT_VERIFIED') {
            setKtpNotValidModalVisible(true);
            return;
          }
          if (
            setKycVerifyDukcapilFailed?.message === 'ID_CARD_ALREADY_REGISTERED'
          ) {
            setKtpExistModalVisible(true);
            return;
          }
          setKtpNotValidModalVisible(true);
        }
      }

      // VERIFY ID CARD
      if (act === SET_KYC_VERIFYIDCARD_SUCCESS) {
        setLoading(false);
        setUserData({
          userData: {
            alreadyKYC: true,
          },
        });
        setKycVerifyDukcapilClear();
        setKycVerifyIdCardClear();
        navigation.replace(NAVIGATION.KYC.KycCreatePin, {
          previousScreen: 'KycForm',
        });
      }
      if (act === SET_KYC_VERIFYIDCARD_FAILED) {
        setLoading(false);
        if (setKycVerifyIdCardFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          setKtpNotValidModalVisible(true);
        }
      }
    },
    [
      dataKtp?.address,
      dataKtp?.city,
      dataKtp?.district,
      dataKtp?.hamlet,
      dataKtp?.idCardNumber,
      dataKtp?.name,
      dataKtp?.neighborhood,
      dataKtp?.occupation,
      dataKtp?.pob,
      dataKtp?.province,
      dataKtp?.subDistrict,
      date,
      gender,
      marital,
      navigation,
      setKycVerifyDukcapilClear,
      setKycVerifyDukcapilFailed?.message,
      setKycVerifyDukcapilResponse?.data,
      setKycVerifyIdCard,
      setKycVerifyIdCardClear,
      setKycVerifyIdCardFailed?.message,
      setLoading,
      setUserData,
    ]
  );

  function renderInputContainer() {
    return (
      <View style={style.mT20}>
        <View style={style.mB16}>
          <Input
            allowFontScaling={false}
            message={nikMessage}
            heigth={56}
            keyboardType="number-pad"
            maxLength={16}
            value={dataKtp?.idCardNumber}
            label={trans(locale, lang, 'nomorIndukKependudukan')}
            secondLabel={
              <Text
                color={Color.primary.light.primary90}
                size={Size.text.body2.size}
                textStyle="semi">
                {trans(locale, lang, '*')}
              </Text>
            }
            onChangeText={(txt) => {
              setDataKtp({
                ...dataKtp,
                idCardNumber: txt.replace(regexNumeric, ''),
              });
              setValidNik(validateNik(txt));
            }}
          />
        </View>
        <View style={style.mB16}>
          <Input
            allowFontScaling={false}
            message={nameMessage}
            heigth={56}
            value={dataKtp?.name}
            label={trans(locale, lang, 'namaLengkapSesuai')}
            secondLabel={
              <Text
                color={Color.primary.light.primary90}
                size={Size.text.body2.size}
                textStyle="semi">
                {trans(locale, lang, '*')}
              </Text>
            }
            onChangeText={(txt) => {
              setDataKtp({
                ...dataKtp,
                name: txt,
              });
              setValidName(validateName(txt));
            }}
          />
        </View>
        <Text
          textStyle="semi"
          size={Size.text.caption1.size}
          line={18}
          color={Color.mediumGray.light.mediumGray}
          style={style.mB4}>
          {trans(locale, lang, 'jenisKelamin')}{' '}
          <Text
            color={Color.primary.light.primary90}
            size={Size.text.body2.size}
            textStyle="semi">
            {trans(locale, lang, '*')}
          </Text>
        </Text>
        <View style={[style.radioButton.radioButtonInputContainer, style.mB16]}>
          <RadioButton
            descRb={trans(locale, lang, 'LAKI-LAKI')}
            valueRb="LAKI-LAKI"
            onPress={() => setGender('LAKI-LAKI')}
          />
          <RadioButton
            descRb={trans(locale, lang, 'PEREMPUAN')}
            valueRb="PEREMPUAN"
            onPress={() => setGender('PEREMPUAN')}
          />
        </View>
        <View style={style.mB16}>
          <Input
            allowFontScaling={false}
            heigth={56}
            value={dataKtp?.address}
            label={trans(locale, lang, 'alamatSesuaiKTP')}
            secondLabel={
              <Text
                color={Color.primary.light.primary90}
                size={Size.text.body2.size}
                textStyle="semi">
                {trans(locale, lang, '*')}
              </Text>
            }
            onChangeText={(txt) => {
              setDataKtp({
                ...dataKtp,
                address: txt.replace(regexAddress, ''),
              });
            }}
          />
        </View>
        <View style={style.mB16}>
          <Input
            allowFontScaling={false}
            heigth={56}
            value={dataKtp?.pob}
            label={trans(locale, lang, 'tempatLahir')}
            secondLabel={
              <Text
                color={Color.primary.light.primary90}
                size={Size.text.body2.size}
                textStyle="semi">
                {trans(locale, lang, '*')}
              </Text>
            }
            onChangeText={(txt) => {
              setDataKtp({
                ...dataKtp,
                pob: txt.replace(regexBirthPlace, ''),
              });
            }}
          />
        </View>
        <View style={style.mB16}>
          <Input
            allowFontScaling={false}
            suffixIcon={<Calendar />}
            heigth={56}
            value={moment(date).format('DD MMM YYYY')}
            editable={false}
            pressable
            defaultValue={birthDate && formatDate(birthDate)}
            label={trans(locale, lang, 'tanggalLahir')}
            secondLabel={
              <Text
                color={Color.primary.light.primary90}
                size={Size.text.body2.size}
                textStyle="semi">
                {trans(locale, lang, '*')}
              </Text>
            }
            handleSuffixIcon={() => showMode('date')}
            onInputPress={() => {
              showMode('date');
            }}
          />
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              maximumDate={new Date(yesterdayDate)}
              mode={mode}
              display="spinner"
              is24Hour
              textColor={Color.primary.light.primary90}
              accentColor={Color.primary.light.primary90}
              onChange={onChangeDatePicker}
            />
          )}
        </View>
        <View style={style.mB16}>
          <Input
            allowFontScaling={false}
            heigth={56}
            value={marital}
            defaultvalue={dataKtp?.maritalStatus}
            label={trans(locale, lang, 'statusPernikahan')}
            secondLabel={
              <Text
                color={Color.primary.light.primary90}
                size={Size.text.body2.size}
                textStyle="semi">
                {trans(locale, lang, '*')}
              </Text>
            }
            editable={false}
            pressable
            onInputPress={() => setMaritalOptModalVisible(true)}
            suffixIcon={<ArrowDownGray />}
            suffixIconDisabled
          />
        </View>
        <View style={style.mB16}>
          <Input
            allowFontScaling={false}
            heigth={56}
            value={dataKtp?.occupation}
            label={trans(locale, lang, 'jenisPekerjaan')}
            secondLabel={
              <Text
                color={Color.primary.light.primary90}
                size={Size.text.body2.size}
                textStyle="semi">
                {trans(locale, lang, '*')}
              </Text>
            }
            onChangeText={(txt) => {
              setDataKtp({
                ...dataKtp,
                occupation: txt.replace(regexAddress, ''),
              });
            }}
          />
        </View>
        <View style={style.mB16}>
          <Input
            allowFontScaling={false}
            heigth={56}
            value={dataKtp?.province}
            label={trans(locale, lang, 'provinsi')}
            secondLabel={
              <Text
                color={Color.primary.light.primary90}
                size={Size.text.body2.size}
                textStyle="semi">
                {trans(locale, lang, '*')}
              </Text>
            }
            onChangeText={(txt) => {
              setDataKtp({
                ...dataKtp,
                province: txt.replace(regexAddress, ''),
              });
            }}
          />
        </View>
        <View style={style.mB16}>
          <Input
            allowFontScaling={false}
            heigth={56}
            value={dataKtp?.city}
            label={trans(locale, lang, 'KotaKabupaten')}
            secondLabel={
              <Text
                color={Color.primary.light.primary90}
                size={Size.text.body2.size}
                textStyle="semi">
                {trans(locale, lang, '*')}
              </Text>
            }
            onChangeText={(txt) => {
              setDataKtp({
                ...dataKtp,
                city: txt.replace(regexAddress, ''),
              });
            }}
          />
        </View>
        <View style={style.mB16}>
          <Input
            allowFontScaling={false}
            heigth={56}
            value={dataKtp?.district}
            label={trans(locale, lang, 'kecamatan')}
            secondLabel={
              <Text
                color={Color.primary.light.primary90}
                size={Size.text.body2.size}
                textStyle="semi">
                {trans(locale, lang, '*')}
              </Text>
            }
            onChangeText={(txt) => {
              setDataKtp({
                ...dataKtp,
                district: txt.replace(regexAddress, ''),
              });
            }}
          />
        </View>
        <View style={style.mB16}>
          <Input
            allowFontScaling={false}
            heigth={56}
            value={dataKtp?.subDistrict}
            label={trans(locale, lang, 'kelurahanDesa')}
            secondLabel={
              <Text
                color={Color.primary.light.primary90}
                size={Size.text.body2.size}
                textStyle="semi">
                {trans(locale, lang, '*')}
              </Text>
            }
            onChangeText={(txt) => {
              setDataKtp({
                ...dataKtp,
                subDistrict: txt.replace(regexAddress, ''),
              });
            }}
          />
        </View>
        <View style={style.renderInputContainer.rtrwWrapper}>
          <View style={style.renderInputContainer.rtContent}>
            <Input
              allowFontScaling={false}
              heigth={56}
              keyboardType="number-pad"
              maxLength={3}
              value={dataKtp?.neighborhood}
              label={trans(locale, lang, 'rt')}
              secondLabel="(Opsional)"
              onChangeText={(txt) => {
                setDataKtp({
                  ...dataKtp,
                  neighborhood: txt.replace(regexNumeric, ''),
                });
              }}
            />
          </View>
          <View style={style.renderInputContainer.rwContent}>
            <Input
              allowFontScaling={false}
              heigth={56}
              keyboardType="number-pad"
              maxLength={3}
              value={dataKtp?.hamlet}
              label={trans(locale, lang, 'rw')}
              secondLabel="(Opsional)"
              onChangeText={(txt) => {
                setDataKtp({
                  ...dataKtp,
                  hamlet: txt.replace(regexNumeric, ''),
                });
              }}
            />
          </View>
        </View>
      </View>
    );
  }

  function renderFooterContainer() {
    return (
      <View style={style.renderFooterContainer.container}>
        <View style={style.renderFooterContainer.checkBox.container}>
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
            style={style.renderFooterContainer.checkBox.checkBox}
            onValueChange={() => setIsAgreed(!isAgreed)}
          />
          <Text
            onPress={() => {
              setIsAgreed(!isAgreed);
            }}
            textStyle="medium"
            style={style.flexShrink1}
            size={Size.text.body2.size}
            line={20}
            color={Color.neutral.light.neutral40}>
            {trans(locale, lang, 'sayaMenyatakanBahwa')}
          </Text>
        </View>
        <Button
          disabled={
            !dataKtp?.idCardNumber ||
            !isValidName ||
            !dataKtp?.pob ||
            !date ||
            !dataKtp?.address ||
            !dataKtp?.province ||
            !dataKtp?.city ||
            !dataKtp?.district ||
            !dataKtp?.subDistrict ||
            !marital ||
            !gender ||
            !dataKtp?.occupation ||
            !isValidateNik ||
            !isAgreed ||
            isSubmit
          }
          type="linear-gradient"
          onPress={() => {
            setLoading(true);
            setIsSubmit(true);
            setKycVerifyDukcapil({
              idCardNumber: dataKtp?.idCardNumber,
              name: dataKtp?.name,
              dob: moment(date).format('DD-MM-YYYY'),
            });
          }}>
          {trans(locale, lang, 'lanjut')}
        </Button>
      </View>
    );
  }

  function renderMartialOptModal() {
    return (
      <BottomSheet
        title={trans(locale, lang, 'statusPernikahanOptModal')}
        isVisible={isMaritalOptModalVisible}
        swipeable={false}
        onClosePress={() => setMaritalOptModalVisible(false)}>
        {maritalOpt?.map((item) => {
          return (
            <View key={item?.key}>
              <Padder style={style.renderMartialOptModal.mV16}>
                <TouchableOpacity
                  onPress={() => {
                    setMarital(item?.opt);
                    setMaritalOptModalVisible(false);
                  }}>
                  <Text textStyle="semi" line={20} size={Size.text.body2.size}>
                    {item?.opt}
                  </Text>
                </TouchableOpacity>
              </Padder>
              <Dash
                dashThickness={1}
                dashColor={Color.neutral.dark.neutral20}
              />
            </View>
          );
        })}
      </BottomSheet>
    );
  }

  function renderKtpNotValidModal() {
    const onBackPress = () => setKtpNotValidModalVisible(false);
    return (
      <BottomSheet
        isVisible={isKtpNotValidModalVisible}
        swipeable={false}
        onClosePress={onBackPress}
        onRequestClose={onBackPress}>
        <View style={style.renderKtpNotValidModal.container}>
          <Image
            source={KTP_tidakcocok}
            style={style.renderKtpNotValidModal.image}
          />
          <Text
            align="center"
            style={style.renderKtpNotValidModal.title}
            textStyle="bold"
            size={Size.text.h6.size}
            line={27}>
            {trans(locale, lang, 'kamiMenemukanKartu')}
          </Text>
          <Text
            textStyle="regular"
            size={Size.text.body2.size}
            line={27}
            align="center"
            color={Color.mediumGray.dark.mediumGray}>
            {trans(locale, lang, 'dataKtpKamu')}
          </Text>
          <Button
            style={style.mT20}
            block
            onPress={() => {
              setKtpNotValidModalVisible(false);
            }}>
            {trans(locale, lang, 'cobaLagiKtpNotValid')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  function renderKtpExistModal() {
    const onBackPress = () => setKtpExistModalVisible(false);
    return (
      <BottomSheet
        isVisible={isKtpExistModalVisible}
        swipeable={false}
        onClosePress={onBackPress}
        onRequestClose={onBackPress}>
        <View style={style.renderKtpExistModal.container}>
          <Image
            source={KTPMukatidakcocok}
            style={style.renderKtpExistModal.image}
          />
          <Text
            align="center"
            style={style.renderKtpExistModal.title}
            textStyle="bold"
            size={Size.text.h6.size}
            line={27}>
            {trans(locale, lang, 'maafKtpKamu')}
          </Text>
          <Text
            textStyle="regular"
            size={Size.text.body2.size}
            line={27}
            align="center"
            color={Color.mediumGray.dark.mediumGray}>
            {trans(locale, lang, 'ktpKamuSudah')}
          </Text>
          <Button
            style={style.mT20}
            outline
            block
            onPress={() => {
              setKtpExistModalVisible(false);
            }}>
            {trans(locale, lang, 'kembali')}
          </Button>
          <Button
            style={style.mT20}
            block
            onPress={() => {
              setKtpExistModalVisible(false);
              navigation.navigate(NAVIGATION.PROFILE.ProfileHelpCenter);
            }}>
            {trans(locale, lang, 'hubungiCustomerCare')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  return (
    <Base
      backgroundColor={Color.backgroundHome.dark.backgroundHome}
      bordered
      headerStyle={{
        backgroundColor: Color.backgroundHome.dark.backgroundHome,
      }}
      title={trans(locale, lang, 'verifikasiDataDiri')}
      onBackPress={() => {
        navigation.pop();
      }}
      isPaddingBottom={false}>
      <Padder>
        {renderInputContainer()}
        {renderFooterContainer()}
      </Padder>
      {renderKtpNotValidModal()}
      {renderMartialOptModal()}
      {renderKtpExistModal()}
    </Base>
  );
}

export default KycForm;

KycForm.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  setKycVerifyIdCard: PropTypes.func.isRequired,
  kycAction: PropTypes.string.isRequired,
  setKycVerifyIdCardFailed: PropTypes.objectOf(Object).isRequired,
  setKycIdCardResponse: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  setUserData: PropTypes.func.isRequired,
  setKycVerifyDukcapil: PropTypes.func.isRequired,
  setKycVerifyDukcapilResponse: PropTypes.objectOf(Object).isRequired,
  setKycVerifyIdCardClear: PropTypes.func.isRequired,
  setKycVerifyDukcapilClear: PropTypes.func.isRequired,
  setKycVerifyDukcapilFailed: PropTypes.objectOf(Object).isRequired,
};
