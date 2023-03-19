import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { Alert, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import Padder from 'ca-component-container/Padder';
import Button from 'ca-component-generic/Button';
import Base from 'ca-component-container/Base';
import Input from 'ca-component-generic/Input';
import { ArrowDownGray, SearchOutline } from 'ca-config/Svg';
import BottomSheet from 'ca-component-container/BottomSheet';
import AlertDialogue from 'ca-component-card/AlertDialogue';
import { NAVIGATION, RESPONSE_STATE } from 'ca-util/constant';
import Text from 'ca-component-generic/Text';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import {
  GET_UPDATA_LIST_BANK_FAILED,
  GET_UPDATA_LIST_BANK_SUCCESS,
  SET_UPDATA_INQUIRY_BANK_ACCOUNT_FAILED,
  SET_UPDATA_INQUIRY_BANK_ACCOUNT_SUCCESS,
} from 'ca-module-updata/updataConstant';
import { getInquiryDomesticAccountApi } from 'ca-module-updata/updataApi';
import {
  AddRekening,
  ClockOTP,
  BadgeTick,
  Requestrekeningterlalusering,
} from 'ca-config/Image';
import { useDefaultBackHandler } from 'ca-util/common';
import locale from './locale';
import style from './style';

const dummyListBank = [
  {
    bankCode: '001',
    bankName: 'BCA (PT. BCA (BANK CENTRAL ASIA) TBK)',
  },
  {
    bankCode: '002',
    bankName: 'BNI (PT. BANK NEGARA INDONESIA (BNI) (PERSERO))',
  },
  {
    bankCode: '003',
    bankName: 'CIMB NIAGA (PT. BANK CIMB NIAGA TBK)',
  },
  {
    bankCode: '004',
    bankName: 'CITIBANK (CITIBANK NA)',
  },
  {
    bankCode: '005',
    bankName: 'bank danamon (PT. bank danamon indonesia tbk)',
  },
  {
    bankCode: '006',
    bankName: 'bank mandiri (PT. bank mandiri)',
  },
  {
    bankCode: '007',
    bankName: 'anz indonesia (anz Indonesia)',
  },
  {
    bankCode: '008',
    bankName: 'Aceh (Bank Aceh)',
  },
  {
    bankCode: '009',
    bankName: 'bpd Jatim (BPd jatim)',
  },
];

function UpdataBankEdit(props) {
  const {
    navigation,
    lang,
    route: { params },
    colorScheme,
    getUpdataLastOtherInfoResponse,
    updataAction,
    getUpdataListBankResponse,
    getUpdataListBank,
    getUpdataListBankClear,
    setLoading,
    otherInformation,
    setOtherInformation,
    setUpdataInquiryBankAccountResponse,
    setUpdataInquiryBankAccountFailed,
    setUpdataInquiryBankAccount,
    setUpdataInquiryBankAccountClear,
    currentScreen,
    alreadySetPin,
    updataTempState,
    isKTPSame,
    getUpdataLastKTPInfoResponse,
    dimensions,
  } = props;

  useDefaultBackHandler(navigation);

  const searchRef = useRef(null);

  const [isListBankModal, setIsListBankModal] = useState(false);
  const [isTooFrequentlyModal, setIsTooFrequentlyModal] = useState(false);
  const [isFailedApiModal, setIsFailedApiModal] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  // Input
  const [newBank, setNewBank] = useState(params?.bank);
  const [newNoRek, setNewNoRek] = useState(null);
  const [newAccountHolderName, setNewAccountHolderName] = useState(null);

  // Validation
  const [newAccountHolderNameMessage, setNewAccountHolderNameMessage] =
    useState(null);
  const [isValidNewAccountHolderName, setIsValidNewAccountHolderName] =
    useState(false);

  const [listBank, setListBank] = useState([]);
  const [filteredListBank, setFilteredListBank] = useState([]);
  const [isFoundAccount, setIsFoundAccount] = useState(null);
  const [foundAccount, setFoundAccount] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [isFailedApi, setIsFailedApi] = useState(false);

  const [remainingSeconds, setRemainingSeconds] = useState(120);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(2);

  const isAddAccount = () => {
    const tempBankAccount =
      getUpdataLastOtherInfoResponse?.data?.bankAccount ||
      otherInformation?.data?.bankAccount;
    return tempBankAccount === null;
  };

  const isValidAccount = useMemo(() => {
    const regex = /(SDRI|SDR|BPK|IBU|BAPAK| +(?= ))/g;
    const trimmed = foundAccount?.beneficiaryAccountName
      ?.toUpperCase()
      .replace(regex, '')
      .trim();
    const accountHolderName = isKTPSame
      ? getUpdataLastKTPInfoResponse?.data?.name?.toUpperCase()
      : updataTempState?.verifyPengkinianPayload?.user?.name?.toUpperCase();
    return trimmed === accountHolderName;
  }, [
    foundAccount?.beneficiaryAccountName,
    updataTempState?.verifyPengkinianPayload?.user?.name,
  ]);

  useEffect(() => {
    setLoading(true);
    getUpdataListBank();
  }, [getUpdataListBank, setLoading]);

  useEffect(() => {
    if (currentScreen === 'UpdataBankEdit') {
      updataResult(updataAction);
    }
  }, [updataAction, updataResult]);

  const updataResult = useCallback(
    (act) => {
      if (act === GET_UPDATA_LIST_BANK_SUCCESS) {
        setLoading(false);
        getUpdataListBankClear();
        const temp = getUpdataListBankResponse?.data
          ?.filter((item) => item.bankCode !== 'CENAIDJA')
          .sort((a, b) => {
            return a.bankName > b.bankName
              ? 1
              : b.bankName > a.bankName
              ? -1
              : 0;
          });
        setFilteredListBank(temp);
        setListBank(temp);
      }
      if (act === GET_UPDATA_LIST_BANK_FAILED) {
        setLoading(false);
        getUpdataListBankClear();
      }
      if (act === SET_UPDATA_INQUIRY_BANK_ACCOUNT_SUCCESS) {
        setIsSubmit(false);
        setLoading(false);
        setUpdataInquiryBankAccountClear();
        const data = setUpdataInquiryBankAccountResponse?.data;
        setIsFoundAccount(true);
        setFoundAccount({
          beneficiaryBankCode: data?.beneficiaryBankCode,
          beneficiaryAccountName: data?.beneficiaryAccountName
            ?.replace(/\s+/g, ' ')
            .trim(),
          beneficiaryAccountNumber: data?.beneficiaryAccountNumber,
        });
      }
      if (act === SET_UPDATA_INQUIRY_BANK_ACCOUNT_FAILED) {
        setIsSubmit(false);
        setLoading(false);
        setUpdataInquiryBankAccountClear();
        const message = setUpdataInquiryBankAccountFailed?.message;
        if (message !== RESPONSE_STATE.INTERNAL_SERVER_ERROR) {
          if (message === 'NOT_FOUND') {
            setIsFoundAccount(false);
            return;
          }
          if (message?.match(RESPONSE_STATE.TOO_FREQUENTLY_)) {
            setRemainingSeconds(Number(message?.substring(15)));
            setIsTooFrequentlyModal(true);
            return;
          }
          if (message === 'FAILED_API_BCA') {
            setIsFailedApi(true);
            setIsFailedApiModal(true);
            return;
          }
          Alert.alert('Error', message);
        }
      }
    },
    [
      getUpdataListBankClear,
      getUpdataListBankResponse?.data,
      setUpdataInquiryBankAccountClear,
      setUpdataInquiryBankAccountResponse?.data,
      setUpdataInquiryBankAccountFailed?.message,
      setLoading,
    ]
  );

  // Set seconds and minutes
  useEffect(() => {
    const min = Math.floor(remainingSeconds / 60);
    const sec = remainingSeconds - min * 60;
    setMinutes(min);
    setSeconds(sec);
  }, [remainingSeconds]);

  // Timer
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  // Time String
  function showRemainingTime() {
    let min = minutes;
    let sec = seconds;
    if (minutes < 10) {
      min = `0${minutes}`;
    }
    if (seconds < 10) {
      sec = `0${seconds}`;
    }
    return `${min}:${sec}`;
  }

  // Clear User Block
  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      setIsTooFrequentlyModal(false);
    }
  }, [minutes, seconds]);

  // const getInquiryDomesticAccount = (payload) => {
  //   setIsSubmit(true);
  //   setLoading(true);
  //   getInquiryDomesticAccountApi(payload)
  //     .then((res) => {
  //       const data = res?.data;
  //       setIsSubmit(false);
  //       setLoading(false);
  //       if (!data?.error_code && data?.beneficiary_account_name) {
  //         setIsFoundAccount(true);
  //         setFoundAccount(data);
  //         return;
  //       }
  //       if (data?.error_code === 'CORP-02-001') {
  //         setIsFoundAccount(false);
  //         return;
  //       }
  //       Alert.alert('Error', res?.data?.error_message?.english || res?.data);
  //       console.log(res?.data);
  //     })
  //     .catch((err) => {
  //       setIsSubmit(false);
  //       setLoading(false);
  //       console.log(err);
  //     });
  // };

  // DUMMY INQUIRY
  // const dummyInquiry = () => {
  //   setIsSubmit(false);
  //   setLoading(false);
  //   if (newNoRek === '1234567891') {
  //     setIsFoundAccount(true);
  //     setFoundAccount({
  //       beneficiaryBankCode: newBank.bankCode,
  //       beneficiaryAccountName: 'SYAEFUL ANWAR',
  //       beneficiaryAccountNumber: newNoRek,
  //     });
  //   }
  //   if (newNoRek === '1234567890') {
  //     setIsFoundAccount(true);
  //     setFoundAccount({
  //       beneficiaryBankCode: newBank.bankCode,
  //       beneficiaryAccountName:
  //         otherInformation?.data?.bankAccount?.accountHolderName?.toUpperCase() ||
  //         getUpdataLastOtherInfoResponse?.data?.bankAccount?.accountHolderName?.toUpperCase(),
  //       beneficiaryAccountNumber: newNoRek,
  //     });
  //   }
  //   if (newNoRek !== '1234567891' && newNoRek !== '1234567890') {
  //     setIsFoundAccount(false);
  //   }
  // };

  function searchFilter(arr, inputKeyword) {
    return arr.filter((item) => {
      return (
        item.bankName
          .toString()
          .toLowerCase()
          .indexOf(inputKeyword.toString().toLowerCase()) > -1
      );
    });
  }

  function validateAccountHolderName(text) {
    const regex = /[^A-Za-z .']/g;
    if (text === null) {
      return null;
    }
    if (text?.length < 1) {
      setNewAccountHolderNameMessage({
        error: trans(locale, lang, 'accountHolderNameRequired'),
      });
      return false;
    }
    if (regex.test(text)) {
      setNewAccountHolderNameMessage({
        warning: trans(locale, lang, 'accountHolderNameInvalid'),
      });
      return false;
    }
    if (text?.length > 100) {
      setNewAccountHolderNameMessage({
        error: trans(locale, lang, 'accountHolderNameTooLong'),
      });
      return false;
    }
    setNewAccountHolderNameMessage(null);
    return true;
  }

  function renderContentContainer() {
    const secondLabel = (
      <Text
        color={Color.primary.light.primary90}
        size={Size.text.body2.size}
        textStyle="semi">
        {trans(locale, lang, '*')}
      </Text>
    );
    const suffixIconNomorRekening = (
      <Button
        height={37}
        disabled={!newNoRek || isSubmit}
        textStyle="linear-gradient"
        onPress={() => {
          setIsSubmit(true);
          setLoading(true);

          // Clear state
          setIsFoundAccount(null);
          setFoundAccount('');
          setIsFailedApi(false);
          setNewAccountHolderName('');

          setUpdataInquiryBankAccount({
            beneficiaryBankCode: newBank.bankCode,
            beneficiaryAccountNumber: newNoRek,
          });

          // getInquiryDomesticAccount({
          //   beneficiaryBankCode: newBank.bankCode,
          //   beneficiaryAccountNumber: newNoRek,
          // });
          // dummyInquiry();
        }}>
        {trans(locale, lang, 'periksa')}
      </Button>
    );
    return (
      <View>
        <View style={style.mb16}>
          <Input
            multiline={Size.isAndroid}
            height={56}
            editable={false}
            numberOfLines={2}
            secondLabel={secondLabel}
            textAlignVertical="center"
            value={newBank?.bankName?.toUpperCase()}
            suffixIcon={<ArrowDownGray />}
            handleSuffixIcon={() => setIsListBankModal(true)}
            pressable
            onInputPress={() => setIsListBankModal(true)}
            label={trans(locale, lang, 'namaBank')}
            placeholder={trans(locale, lang, 'namaBank')}
          />
        </View>
        <View style={style.mb16}>
          <Input
            height={56}
            keyboardType="number-pad"
            secondLabel={secondLabel}
            value={newNoRek}
            suffixIcon={suffixIconNomorRekening}
            suffixIconDisabled={!newNoRek || isSubmit}
            handleSuffixIcon={() => {
              setIsFoundAccount(null);
              setFoundAccount('');
              setIsSubmit(true);
              setLoading(true);

              setUpdataInquiryBankAccount({
                beneficiaryBankCode: newBank.bankCode,
                beneficiaryAccountNumber: newNoRek,
              });

              // getInquiryDomesticAccount({
              //   beneficiaryBankCode: newBank.bankCode,
              //   beneficiaryAccountNumber: newNoRek,
              // });
              // dummyInquiry();
            }}
            label={trans(locale, lang, 'nomorRekening')}
            placeholder={trans(locale, lang, 'masukkanNomorRekening')}
            onChangeText={(text) => {
              setNewNoRek(text.replace(/[^0-9]/g, ''));
              setIsFoundAccount(null);
              setFoundAccount('');
            }}
          />
          <Text
            size={Size.text.caption2.size}
            color={Color.mediumGray.light.mediumGray}
            textStyle="medium"
            line={16.5}
            style={style.mt6}>
            {trans(locale, lang, 'untukRekeningBca')}
          </Text>
        </View>
        {isFoundAccount ? (
          <View style={style.content.namaPemilik.container}>
            <Text
              textStyle="semi"
              size={Size.text.caption1.size}
              line={18}
              letterSpacing={0.5}
              color={Color.neutral.light.neutral10}
              style={style.content.namaPemilik.label}>
              {trans(locale, lang, 'namaPemilikRekening')}
            </Text>
            <View style={style.content.namaPemilik.nama.container}>
              <View style={style.content.namaPemilik.nama.icon} />
              <Text textStyle="medium" size={Size.text.body2.size} line={20}>
                {foundAccount?.beneficiaryAccountName || '-'}
              </Text>
            </View>
          </View>
        ) : null}
        {isFoundAccount != null ? renderAlertContainer() : null}
        {isFailedApi ? (
          <View>
            <Input
              height={56}
              secondLabel={secondLabel}
              value={newAccountHolderName}
              label={trans(locale, lang, 'namaPemilikRekening')}
              placeholder={trans(locale, lang, 'masukkanNamaPemilikRekening')}
              onChangeText={(text) => {
                const txt = text.replace(/\s{2,}/, ' ');
                setNewAccountHolderName(txt);
                setIsValidNewAccountHolderName(validateAccountHolderName(txt));
              }}
              message={newAccountHolderNameMessage}
            />
          </View>
        ) : null}
      </View>
    );
  }

  function renderFooterContainer() {
    let isDisabled = true;
    let label = trans(locale, lang, 'simpan');
    let onPress = () => {};

    // Nama rekening === Nama KTP
    if (isFoundAccount && isValidAccount) {
      isDisabled = false;
      label = trans(locale, lang, 'simpan');
      onPress = () => {
        setOtherInformation({
          ...otherInformation,
          data: {
            ...otherInformation.data,
            bankAccount: {
              ...otherInformation.data.bankAccount,
              bankName: newBank?.bankName,
              bankCode: foundAccount?.beneficiaryBankCode,
              accountHolderName: foundAccount?.beneficiaryAccountName,
              accountNo: foundAccount?.beneficiaryAccountNumber,
            },
          },
        });
        setIsSuccessModal(true);
      };
    }

    // Nama rekening !== Nama KTP
    if (isFoundAccount && !isValidAccount) {
      isDisabled = false;
      label = trans(locale, lang, 'uploadBukuRekening');
      onPress = () => {
        navigation.navigate(NAVIGATION.UPDATA.UpdataBankUpload, {
          bankName: newBank?.bankName,
          bankCode: foundAccount?.beneficiaryBankCode,
          accountHolderName: foundAccount?.beneficiaryAccountName,
          accountNo: foundAccount?.beneficiaryAccountNumber,
        });
      };
    }

    // Inquiry Failed
    if (isFailedApi) {
      isDisabled = !isValidNewAccountHolderName;
      label = trans(locale, lang, 'uploadBukuRekening');
      onPress = () => {
        navigation.navigate(NAVIGATION.UPDATA.UpdataBankUpload, {
          bankName: newBank?.bankName,
          bankCode: newBank?.bankCode,
          accountHolderName: newAccountHolderName,
          accountNo: newNoRek,
        });
      };
    }

    return (
      <Padder style={style.footer.container}>
        <Button disabled={isDisabled} type="linear-gradient" onPress={onPress}>
          {label}
        </Button>
      </Padder>
    );
  }

  function renderListBankModal() {
    return (
      <BottomSheet
        isVisible={isListBankModal}
        swipeable={false}
        avoidKeyboard={Size.isAndroid}
        onClosePress={() => {
          setIsListBankModal(false);
          searchRef.current.clear();
          setListBank(filteredListBank);
        }}
        title={trans(locale, lang, 'pilihNamaBank')}
        contentContainerStyle={style.pb24}>
        <View
          style={[
            style.modal.listBank.container,
            { height: dimensions.height / (Size.isAndroid ? 2.5 : 1.5) },
          ]}>
          <View style={style.mb8}>
            <Input
              ref={searchRef}
              height={48}
              prefixIcon={<SearchOutline width={24} height={24} />}
              placeholder={trans(locale, lang, 'cariNamaBank')}
              onChangeText={(text) => {
                if (text) {
                  setListBank(searchFilter(filteredListBank, text));
                } else {
                  setListBank(filteredListBank);
                }
              }}
            />
          </View>
          <ScrollView>
            {listBank?.map((item) => (
              <TouchableOpacity
                key={`${item.bankCode}${item.bankName}`}
                onPress={() => {
                  setIsListBankModal(false);
                  searchRef.current.clear();
                  setListBank(filteredListBank);
                  setNewBank(item);
                  setIsFoundAccount(null);
                  setFoundAccount('');
                  setNewNoRek('');
                }}>
                <View style={style.modal.listBank.list.container}>
                  <Text
                    textStyle="semi"
                    size={Size.text.body2.size}
                    line={20}
                    letterSpacing={0.5}
                    numberOfLines={2}
                    color={Color.neutral.light.neutral90}>
                    {item.bankName.toUpperCase()}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </BottomSheet>
    );
  }

  function renderAlertContainer() {
    let title = '';
    let type = 'warning';
    if (isFoundAccount && isValidAccount) {
      title = 'rekeningBerhasilDitemukan';
      type = 'success';
    }
    if (isFoundAccount && !isValidAccount) {
      title = 'rekeningHarusAtas';
      type = 'error';
    }
    if (!isFoundAccount) {
      title = 'rekeningTidakDitemukan';
      type = 'warning';
    }
    return (
      <View>
        <AlertDialogue
          title={trans(locale, lang, title)}
          type={type}
          leftIcon
        />
      </View>
    );
  }

  function renderTooFrequentlyModal() {
    const onBackPress = () => setIsTooFrequentlyModal(false);
    return (
      <BottomSheet
        isVisible={isTooFrequentlyModal}
        swipeable={false}
        onClosePress={onBackPress}
        onRequestClose={onBackPress}>
        <View style={style.modal.tooFrequently.container}>
          <Image
            source={Requestrekeningterlalusering}
            style={style.modal.tooFrequently.icon}
            resizeMode="contain"
          />
          <Text
            style={style.modal.tooFrequently.title}
            textStyle="bold"
            size={Size.text.body1.size}
            line={21}
            letterSpacing={0.5}
            align="center">
            {trans(locale, lang, 'andaTerlaluSering')}
          </Text>
          <Text
            style={style.modal.tooFrequently.subtitle}
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            align="center"
            color={Color.mediumGray.light.mediumGray}>
            {trans(locale, lang, 'untukSementaraWaktu')}
            <Text
              textStyle="semi"
              size={Size.text.body2.size}
              line={21}
              letterSpacing={0.5}
              color={Color.primary.light.primary90}>
              {showRemainingTime()}
            </Text>
          </Text>
          <Button
            block
            onPress={() => {
              setIsTooFrequentlyModal(false);
            }}
            style={style.modal.tooFrequently.button1}>
            {trans(locale, lang, 'cobaLagi')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  function renderFailedApiModal() {
    return (
      <BottomSheet
        isVisible={isFailedApiModal}
        swipeable={false}
        onClosePress={() => setIsFailedApiModal(false)}
        onRequestClose={() => setIsFailedApiModal(false)}>
        <View style={style.modal.failedApi.container}>
          <Image source={AddRekening} style={style.modal.failedApi.image} />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            letterSpacing={0.5}
            align="center"
            style={style.modal.failedApi.title}>
            {trans(locale, lang, 'oopsTerjadiMasalah')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={25}
            letterSpacing={0.5}
            align="center"
            color={Color.mediumGray.light.mediumGray}
            style={style.modal.failedApi.subtitle}>
            {trans(locale, lang, 'harapMenungguBeberapa')}
          </Text>
        </View>
        <Button
          type="linear-gradient"
          onPress={() => setIsFailedApiModal(false)}>
          {trans(locale, lang, 'cobaLagi')}
        </Button>
      </BottomSheet>
    );
  }

  function renderSuccessModal() {
    const onBackPress = () => {
      setIsSuccessModal(false);
      setTimeout(() => {
        navigation.pop();
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
            {trans(
              locale,
              lang,
              isAddAccount ? 'andaBerhasilMenambahkan' : 'andaBerhasilMengubah'
            )}
          </Text>
        </View>
        <Button
          type="linear-gradient"
          onPress={() => {
            setIsSuccessModal(false);
            setTimeout(() => {
              navigation.pop();
            }, 200);
          }}>
          {trans(locale, lang, 'lanjut')}
        </Button>
      </BottomSheet>
    );
  }

  return (
    <Base
      bordered
      renderBottom={renderFooterContainer()}
      onBackPress={() => navigation.pop()}
      title={trans(
        locale,
        lang,
        isAddAccount() ? 'tambahRekening' : 'ubahRekening'
      )}
      backgroundColor={Color.whiteBackground.light.whiteBackground}
      isPaddingBottom={false}>
      <Padder style={style.container}>
        {renderContentContainer()}
        {renderListBankModal()}
        {renderTooFrequentlyModal()}
        {renderFailedApiModal()}
        {renderSuccessModal()}
      </Padder>
    </Base>
  );
}

export default UpdataBankEdit;

UpdataBankEdit.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  colorScheme: PropTypes.string.isRequired,
  getUpdataLastOtherInfoResponse: PropTypes.objectOf(Object).isRequired,
  updataAction: PropTypes.string.isRequired,
  getUpdataListBankResponse: PropTypes.objectOf(Object).isRequired,
  getUpdataListBank: PropTypes.func.isRequired,
  getUpdataListBankClear: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  otherInformation: PropTypes.objectOf(Object).isRequired,
  setOtherInformation: PropTypes.func.isRequired,
  setUpdataInquiryBankAccountResponse: PropTypes.objectOf(Object).isRequired,
  setUpdataInquiryBankAccountFailed: PropTypes.objectOf(Object).isRequired,
  setUpdataInquiryBankAccount: PropTypes.func.isRequired,
  setUpdataInquiryBankAccountClear: PropTypes.func.isRequired,
  currentScreen: PropTypes.string.isRequired,
  alreadySetPin: PropTypes.bool.isRequired,
  updataTempState: PropTypes.objectOf(Object).isRequired,
  isKTPSame: PropTypes.bool.isRequired,
  getUpdataLastKTPInfoResponse: PropTypes.objectOf(Object).isRequired,
  dimensions: PropTypes.objectOf(Object).isRequired,
};
