import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { ArrowDownGray, SearchOutline } from 'ca-config/Svg';
import { BadgeTick } from 'ca-config/Image';
import BottomSheet from 'ca-component-container/BottomSheet';
import Padder from 'ca-component-container/Padder';
import Button from 'ca-component-generic/Button';
import Base from 'ca-component-container/Base';
import Input from 'ca-component-generic/Input';
import Text from 'ca-component-generic/Text';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import {
  SET_SAVE_ADDRESS_FAILED,
  SET_SAVE_ADDRESS_SUCCESS,
  SET_UPDATE_ADDRESS_FAILED,
  SET_UPDATE_ADDRESS_SUCCESS,
  GET_PROFILE_CITY_FAILED,
  GET_PROFILE_CITY_SUCCESS,
  GET_PROFILE_DISTRICT_FAILED,
  GET_PROFILE_DISTRICT_SUCCESS,
  GET_PROFILE_PROVINCE_FAILED,
  GET_PROFILE_PROVINCE_SUCCESS,
  GET_PROFILE_SUB_DISTRICT_FAILED,
  GET_PROFILE_SUB_DISTRICT_SUCCESS,
} from 'ca-module-profile/profileConstant';
import { formatCapitalizeEachWord } from 'ca-util/format';
import _ from 'lodash';
import { useKeyboardVisible } from 'ca-util/common';
import locale from './locale';
import style from './style';

function ProfileAddressEdit(props) {
  const {
    navigation,
    lang,
    colorScheme,
    route: { params },
    profileAction,
    getProfileProvinceResponse,
    getProfileCityResponse,
    getProfileDistrictResponse,
    getProfileSubDistrictResponse,
    getProfileProvinceFailed,
    getProfileCityFailed,
    getProfileDistrictFailed,
    getProfileSubDistrictFailed,
    getProfileProvince,
    getProfileCity,
    getProfileDistrict,
    getProfileSubDistrict,
    setLoading,
    setSaveAddressFailed,
    setUpdateAddressFailed,
    setSaveAddress,
    setSaveAddressClear,
    setUpdateAddress,
    setUpdateAddressClear,
  } = props;
  const { action: currentAction, address } = params;

  // Modal
  const [isAddressSelectionModal, setIsAddressSelectionModal] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  // State
  const [listProvinsi, setListProvinsi] = useState([]);
  const [listKota, setListKota] = useState([]);
  const [listKecamatan, setListKecamatan] = useState([]);
  const [listKelurahan, setListKelurahan] = useState([]);

  const [selectedColumn, setSelectedColumn] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const searchRef = useRef(null);

  // Input
  const [addressTitle, setAddressTitle] = useState(address?.title || null);
  const [namaJalan, setNamaJalan] = useState(address?.street || null);
  const [provinsi, setProvinsi] = useState(address?.province || null);
  const [kota, setKota] = useState(address?.city || null);
  const [kecamatan, setKecamatan] = useState(address?.district || null);
  const [kelurahan, setKelurahan] = useState(address?.subDistrict || null);
  const [rt, setRT] = useState(address?.rt || null);
  const [rw, setRW] = useState(address?.rw || null);
  const [kodePos, setKodePos] = useState(address?.postcode || null);

  // Message
  const [addressTitleMessage, setAddressTitleMessage] = useState(null);
  const [namaJalanMessage, setNamaJalanMessage] = useState(null);
  const [provinsiMessage, setProvinsiMessage] = useState(null);
  const [kotaMessage, setKotaMessage] = useState(null);
  const [kecamatanMessage, setKecamatanMessage] = useState(null);
  const [kelurahanMessage, setKelurahanMessage] = useState(null);
  const [rtMessage, setRTMessage] = useState(null);
  const [rwMessage, setRWMessage] = useState(null);
  const [kodePosMessage, setKodePosMessage] = useState(null);

  // Validation Flag
  const [isAddressTitleValid, setIsAddressTitleValid] = useState(
    !!addressTitle
  );
  const [isNamaJalanValid, setIsNamaJalanValid] = useState(!!namaJalan);
  const [isProvinsiValid, setIsProvinsiValid] = useState(!!provinsi);
  const [isKotaValid, setIsKotaValid] = useState(!!kota);
  const [isKecamatanValid, setIsKecamatanValid] = useState(!!kecamatan);
  const [isKelurahanValid, setIsKelurahanValid] = useState(!!kelurahan);
  const [isRTValid, setIsRTValid] = useState(true);
  const [isRWValid, setIsRWValid] = useState(true);
  const [isKodePosValid, setIsKodePosValid] = useState(!!kodePos);
  const isKeyboardVisible = useKeyboardVisible();

  // API Function

  useEffect(() => {
    profileResult(profileAction);
  }, [profileAction, profileResult]);

  const profileResult = useCallback(
    (act) => {
      if (act === SET_SAVE_ADDRESS_SUCCESS) {
        setLoading(false);
        setIsSubmit(false);
        setTimeout(() => {
          setIsSuccessModal(true);
        }, 600);
        setSaveAddressClear();
      }
      if (act === SET_SAVE_ADDRESS_FAILED) {
        setLoading(false);
        setIsSubmit(false);
        if (setSaveAddressFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          Alert.alert('Warning', setSaveAddressFailed?.message);
        }
        setSaveAddressClear();
      }
      if (act === SET_UPDATE_ADDRESS_SUCCESS) {
        setLoading(false);
        setIsSubmit(false);
        setTimeout(() => {
          setIsSuccessModal(true);
        }, 600);
        setUpdateAddressClear();
      }
      if (act === SET_UPDATE_ADDRESS_FAILED) {
        setLoading(false);
        setIsSubmit(false);
        if (setUpdateAddressFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          Alert.alert('Warning', setUpdateAddressFailed?.message);
        }
        setUpdateAddressClear();
      }
    },
    [
      setLoading,
      setSaveAddressClear,
      setSaveAddressFailed?.message,
      setUpdateAddressClear,
      setUpdateAddressFailed?.message,
    ]
  );

  useEffect(() => {
    setLoading(true);
    getProfileProvince({ lang });
  }, [getProfileProvince, lang, setLoading]);

  useEffect(() => {
    if (provinsi?.code) {
      setLoading(true);
      getProfileCity({ code: provinsi?.code, lang });
    }
  }, [getProfileCity, lang, provinsi?.code, setLoading]);

  useEffect(() => {
    if (kota?.code) {
      setLoading(true);
      getProfileDistrict({ code: kota?.code, lang });
    }
  }, [getProfileDistrict, kota?.code, lang, setLoading]);

  useEffect(() => {
    if (kecamatan?.code) {
      setLoading(true);
      getProfileSubDistrict({ code: kecamatan?.code, lang });
    }
  }, [getProfileSubDistrict, kecamatan?.code, lang, setLoading]);

  useEffect(() => {
    addressResult(profileAction);
  }, [addressResult, profileAction]);

  const addressResult = useCallback(
    (act) => {
      if (act === GET_PROFILE_PROVINCE_SUCCESS) {
        setLoading(false);
        setListProvinsi(getProfileProvinceResponse?.data);
      }
      if (act === GET_PROFILE_PROVINCE_FAILED) {
        setLoading(false);
        if (getProfileProvinceFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          Alert.alert('Warning', getProfileProvinceFailed?.message);
        }
      }
      if (act === GET_PROFILE_CITY_SUCCESS) {
        setLoading(false);
        setListKota(getProfileCityResponse?.data);
      }
      if (act === GET_PROFILE_CITY_FAILED) {
        setLoading(false);
        if (getProfileCityFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          Alert.alert('Warning', getProfileCityFailed?.message);
        }
      }
      if (act === GET_PROFILE_DISTRICT_SUCCESS) {
        setLoading(false);
        setListKecamatan(getProfileDistrictResponse?.data);
      }
      if (act === GET_PROFILE_DISTRICT_FAILED) {
        setLoading(false);
        if (getProfileDistrictFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          Alert.alert('Warning', getProfileDistrictFailed?.message);
        }
      }
      if (act === GET_PROFILE_SUB_DISTRICT_SUCCESS) {
        setLoading(false);
        setListKelurahan(getProfileSubDistrictResponse?.data);
      }
      if (act === GET_PROFILE_SUB_DISTRICT_FAILED) {
        setLoading(false);
        if (getProfileSubDistrictFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          Alert.alert('Warning', getProfileSubDistrictFailed?.message);
        }
      }
    },
    [
      setLoading,
      getProfileProvinceResponse?.data,
      getProfileProvinceFailed?.message,
      getProfileCityResponse?.data,
      getProfileCityFailed?.message,
      getProfileDistrictResponse?.data,
      getProfileDistrictFailed?.message,
      getProfileSubDistrictResponse?.data,
      getProfileSubDistrictFailed?.message,
    ]
  );

  // Validation Function
  const validateAddressTitle = useCallback(
    (text) => {
      const regexAddressTitle = /^[a-zA-Z0-9 ]*$/;
      if (text.length < 1) {
        setAddressTitleMessage({
          error: trans(locale, lang, 'addressTitleRequired'),
        });
        return false;
      }
      if (!regexAddressTitle.test(text)) {
        setAddressTitleMessage({
          error: trans(locale, lang, 'addressTitleInvalid'),
        });
        return false;
      }
      if (text.length > 30) {
        setAddressTitleMessage({
          warning: trans(locale, lang, 'addressTitleMaxLength'),
        });
        return false;
      }
      setAddressTitleMessage(null);
      return true;
    },
    [lang]
  );
  const validateNamaJalan = useCallback(
    (text) => {
      const regexNamaJalan = /^[a-zA-Z0-9 '.]*$/;
      if (text.length < 1) {
        setNamaJalanMessage({
          error: trans(locale, lang, 'namaJalanRequired'),
        });
        return false;
      }
      if (!regexNamaJalan.test(text)) {
        setNamaJalanMessage({
          error: trans(locale, lang, 'namaJalanInvalid'),
        });
        return false;
      }
      if (text.length > 500) {
        setNamaJalanMessage({
          warning: trans(locale, lang, 'namaJalanMaxLength'),
        });
        return false;
      }
      setNamaJalanMessage(null);
      return true;
    },
    [lang]
  );
  const validateProvinsi = useCallback(
    (data) => {
      if (!data) {
        setProvinsiMessage({
          error: trans(locale, lang, 'provinsiRequired'),
        });
        return false;
      }
      setProvinsiMessage(null);
      return true;
    },
    [lang]
  );
  const validateKota = useCallback(
    (data) => {
      if (!data) {
        setKotaMessage({
          error: trans(locale, lang, 'kotaRequired'),
        });
        return false;
      }
      setKotaMessage(null);
      return true;
    },
    [lang]
  );
  const validateKecamatan = useCallback(
    (data) => {
      if (!data) {
        setKecamatanMessage({
          error: trans(locale, lang, 'kecamatanRequired'),
        });
        return false;
      }
      setKecamatanMessage(null);
      return true;
    },
    [lang]
  );
  const validateKelurahan = useCallback(
    (data) => {
      if (!data) {
        setKelurahanMessage({
          error: trans(locale, lang, 'kelurahanRequired'),
        });
        return false;
      }
      setKelurahanMessage(null);
      return true;
    },
    [lang]
  );
  const validateRT = useCallback(
    (text) => {
      if (text.length !== 0 && text.length > 3) {
        setRTMessage({
          warning: trans(locale, lang, 'rtMaxLength'),
        });
        return false;
      }
      setRTMessage(null);
      return true;
    },
    [lang]
  );
  const validateRW = useCallback(
    (text) => {
      if (text.length !== 0 && text.length > 3) {
        setRWMessage({
          warning: trans(locale, lang, 'rwMaxLength'),
        });
        return false;
      }
      setRWMessage(null);
      return true;
    },
    [lang]
  );
  const validateKodePos = useCallback(
    (text) => {
      if (text.length !== 5) {
        setKodePosMessage({
          warning: trans(locale, lang, 'kodePosInvalid'),
        });
        return false;
      }
      setKodePosMessage(null);
      return true;
    },
    [lang]
  );

  // Function
  function searchFilter(arr, inputKeyword) {
    return arr.filter((item) => {
      return Object.keys(item).some((prop) => {
        return (
          item[prop]
            .toString()
            .toLowerCase()
            .indexOf(inputKeyword.toString().toLowerCase()) > -1
        );
      });
    });
  }

  function isFormValid() {
    return (
      isAddressTitleValid &&
      isNamaJalanValid &&
      isProvinsiValid &&
      isKotaValid &&
      isKecamatanValid &&
      isKelurahanValid &&
      isRTValid &&
      isRWValid &&
      isKodePosValid
    );
  }

  // UI
  function renderContentContainer() {
    const requiredLabel = (
      <Text
        color={Color.primary.light.primary90}
        size={Size.text.body2.size}
        textStyle="semi">
        {trans(locale, lang, '*')}
      </Text>
    );
    const optionalLabel = (
      <Text
        style={style.flexGrow}
        textStyle="medium"
        size={Size.text.body2.size}
        color={Color.neutral.light.neutral10}>
        {trans(locale, lang, 'opsional')}
      </Text>
    );
    const arrowDownIcon = <ArrowDownGray />;

    return (
      <Padder style={style.mT24}>
        <View style={style.content.input.container}>
          <Input
            value={addressTitle}
            height={56}
            label={trans(locale, lang, 'judulAlamat')}
            secondLabel={requiredLabel}
            placeholder={trans(locale, lang, 'masukkanJudulAlamat')}
            onChangeText={(text) => {
              const txt = text.replace(/\s{2,}/, ' ');
              setAddressTitle(txt);
              setIsAddressTitleValid(validateAddressTitle(txt));
            }}
            message={addressTitleMessage}
            maxLength={255}
          />
        </View>
        <View style={style.content.input.container}>
          <Input
            value={namaJalan}
            height={56}
            label={trans(locale, lang, 'namaJalan')}
            secondLabel={requiredLabel}
            placeholder={trans(locale, lang, 'masukkanNamaJalan')}
            onChangeText={(text) => {
              const txt = text.replace(/\s{2,}/, ' ');
              setNamaJalan(txt);
              setIsNamaJalanValid(validateNamaJalan(txt));
            }}
            message={namaJalanMessage}
            maxLength={255}
          />
        </View>
        <View style={style.content.input.container}>
          <Input
            defaultValue={formatCapitalizeEachWord(provinsi?.value || '')}
            height={56}
            label={trans(locale, lang, 'provinsi')}
            secondLabel={requiredLabel}
            suffixIcon={arrowDownIcon}
            handleSuffixIcon={() => {
              setIsAddressSelectionModal(true);
              setSelectedColumn('provinsi');
            }}
            placeholder={trans(locale, lang, 'pilihProvinsi')}
            editable={false}
            pressable
            onInputPress={() => {
              setIsAddressSelectionModal(true);
              setSelectedColumn('provinsi');
            }}
            message={provinsiMessage}
          />
        </View>
        <View style={style.content.input.container}>
          <Input
            defaultValue={formatCapitalizeEachWord(kota?.value || '')}
            height={56}
            label={trans(locale, lang, 'kota')}
            secondLabel={requiredLabel}
            suffixIcon={arrowDownIcon}
            handleSuffixIcon={() => {
              setIsAddressSelectionModal(true);
              setSelectedColumn('kota');
            }}
            placeholder={trans(locale, lang, 'pilihKota')}
            editable={false}
            pressable
            onInputPress={() => {
              setIsAddressSelectionModal(true);
              setSelectedColumn('kota');
            }}
            disabled={!provinsi}
            suffixIconDisabled={!provinsi}
            message={kotaMessage}
          />
        </View>
        <View style={style.content.input.container}>
          <Input
            defaultValue={formatCapitalizeEachWord(kecamatan?.value || '')}
            height={56}
            label={trans(locale, lang, 'kecamatan')}
            secondLabel={requiredLabel}
            suffixIcon={arrowDownIcon}
            handleSuffixIcon={() => {
              setIsAddressSelectionModal(true);
              setSelectedColumn('kecamatan');
            }}
            placeholder={trans(locale, lang, 'pilihKecamatan')}
            editable={false}
            pressable
            onInputPress={() => {
              setIsAddressSelectionModal(true);
              setSelectedColumn('kecamatan');
            }}
            disabled={!kota}
            suffixIconDisabled={!kota}
            message={kecamatanMessage}
          />
        </View>
        <View style={style.content.input.container}>
          <Input
            defaultValue={formatCapitalizeEachWord(kelurahan?.value || '')}
            height={56}
            label={trans(locale, lang, 'kelurahan')}
            secondLabel={requiredLabel}
            suffixIcon={arrowDownIcon}
            handleSuffixIcon={() => {
              setIsAddressSelectionModal(true);
              setSelectedColumn('kelurahan');
            }}
            placeholder={trans(locale, lang, 'pilihKelurahan')}
            editable={false}
            pressable
            onInputPress={() => {
              setIsAddressSelectionModal(true);
              setSelectedColumn('kelurahan');
            }}
            disabled={!kecamatan}
            suffixIconDisabled={!kecamatan}
            message={kelurahanMessage}
          />
        </View>
        <View style={style.content.input.flexRowContainer}>
          <View style={[style.flexGrow, style.me4]}>
            <Input
              value={rt}
              height={56}
              label={trans(locale, lang, 'rt')}
              secondLabel={optionalLabel}
              placeholder={trans(locale, lang, 'rt')}
              onChangeText={(text) => {
                setRT(text.replace(/[^0-9]/g, ''));
                setIsRTValid(validateRT(text));
              }}
              keyboardType="number-pad"
              maxLength={3}
              message={rtMessage}
            />
          </View>
          <View style={[style.flexGrow, style.ms4]}>
            <Input
              value={rw}
              height={56}
              label={trans(locale, lang, 'rw')}
              secondLabel={optionalLabel}
              placeholder={trans(locale, lang, 'rw')}
              onChangeText={(text) => {
                setRW(text.replace(/[^0-9]/g, ''));
                setIsRWValid(validateRW(text));
              }}
              keyboardType="number-pad"
              maxLength={3}
              message={rwMessage}
            />
          </View>
        </View>
        <View style={[style.content.input.container, style.mb48]}>
          <Input
            value={kodePos}
            height={56}
            label={trans(locale, lang, 'kodePos')}
            secondLabel={requiredLabel}
            placeholder={trans(locale, lang, 'masukkanKodePos')}
            onChangeText={(text) => {
              setKodePos(text.replace(/[^0-9]/g, ''));
              setIsKodePosValid(validateKodePos(text));
            }}
            keyboardType="number-pad"
            maxLength={5}
            message={kodePosMessage}
          />
        </View>
      </Padder>
    );
  }

  function renderFooterContainer() {
    const dynamicMarginBottom = {
      ios: isKeyboardVisible ? style.mb16 : style.mb8,
      android: isKeyboardVisible ? style.mb16 : style.mb48,
    };
    return (
      <SafeAreaView>
        <Padder style={dynamicMarginBottom[Platform.OS]}>
          <Button
            disabled={!isFormValid() || isSubmit}
            type="linear-gradient"
            onPress={() => {
              if (!isSubmit) {
                setIsSubmit(true);
                setLoading(true);
                if (currentAction === 'add') {
                  setSaveAddress({
                    title: addressTitle,
                    street: namaJalan,
                    province: provinsi,
                    city: kota,
                    district: kecamatan,
                    subDistrict: kelurahan,
                    rt: rt,
                    rw: rw,
                    postcode: kodePos,
                  });
                }
                if (currentAction === 'edit') {
                  setUpdateAddress({
                    id: address?.id,
                    title: addressTitle,
                    street: namaJalan,
                    province: provinsi,
                    city: kota,
                    district: kecamatan,
                    subDistrict: kelurahan,
                    rt: rt,
                    rw: rw,
                    postcode: kodePos,
                  });
                }
              }
            }}>
            {trans(locale, lang, 'simpanAlamat')}
          </Button>
        </Padder>
      </SafeAreaView>
    );
  }

  function renderAddressSelectionModal() {
    let title = '';
    let dummyList = [];
    let list = [];
    let setList = () => {};
    let setValue = () => {};
    let setResetValue = () => {};

    if (!kelurahan || selectedColumn === 'kelurahan') {
      title = 'kelurahan';
      dummyList = getProfileSubDistrictResponse?.data || [];
      list = listKelurahan;
      setList = (data) => setListKelurahan(data);
      setValue = (data) => {
        setKelurahan(data);
        setIsKelurahanValid(validateKelurahan(data));
      };
      setResetValue = () => {};
    }
    if (!kecamatan || selectedColumn === 'kecamatan') {
      title = 'kecamatan';
      dummyList = getProfileDistrictResponse?.data || [];
      list = listKecamatan;
      setList = (data) => setListKecamatan(data);
      setValue = (data) => {
        setKecamatan(data);
        setIsKecamatanValid(validateKecamatan(data));
      };
      setResetValue = () => {
        setKelurahan('');
        setIsKelurahanValid(validateKelurahan(''));
      };
    }
    if (!kota || selectedColumn === 'kota') {
      title = 'kota';
      dummyList = getProfileCityResponse?.data || [];
      list = listKota;
      setList = (data) => setListKota(data);
      setValue = (data) => {
        setKota(data);
        setIsKotaValid(validateKota(data));
      };
      setResetValue = () => {
        setKecamatan('');
        setIsKecamatanValid(validateKecamatan(''));
        setKelurahan('');
        setIsKelurahanValid(validateKelurahan(''));
      };
    }
    if (!provinsi || selectedColumn === 'provinsi') {
      title = 'provinsi';
      dummyList = getProfileProvinceResponse?.data || [];
      list = listProvinsi;
      setList = (data) => setListProvinsi(data);
      setValue = (data) => {
        setProvinsi(data);
        setIsProvinsiValid(validateProvinsi(data));
      };
      setResetValue = () => {
        setKota('');
        setIsKotaValid(validateKota(''));
        setKecamatan('');
        setIsKecamatanValid(validateKecamatan(''));
        setKelurahan('');
        setIsKelurahanValid(validateKelurahan(''));
      };
    }

    return (
      <BottomSheet
        isVisible={isAddressSelectionModal}
        swipeable={false}
        avoidKeyboard={Size.isAndroid}
        onClosePress={() => {
          setIsAddressSelectionModal(false);
          searchRef.current.clear();
        }}
        onModalHide={() => {
          setSelectedColumn('');
          setList(dummyList);
        }}
        title={`${trans(locale, lang, 'pilih')} ${trans(locale, lang, title)}`}
        contentContainerStyle={style.pb24}>
        <View style={style.modal.addressSelection.container}>
          <View style={style.mb8}>
            <Input
              ref={searchRef}
              height={48}
              prefixIcon={<SearchOutline width={24} height={24} />}
              placeholder={`${trans(locale, lang, 'cari')} ${trans(
                locale,
                lang,
                title
              )}`}
              onChangeText={(text) => {
                if (text) {
                  setList(searchFilter(dummyList, text));
                } else {
                  setList(dummyList);
                }
              }}
            />
          </View>
          <ScrollView>
            {!_.isEmpty(list) ? (
              list?.map((item) => (
                <TouchableOpacity
                  key={item?.code}
                  onPress={() => {
                    if (title === 'kelurahan') {
                      setIsAddressSelectionModal(false);
                    }
                    setValue(item);
                    setSelectedColumn('');
                    searchRef.current.clear();
                    setList(dummyList);
                    setResetValue();
                  }}>
                  <View style={style.modal.addressSelection.list.container}>
                    <Text
                      textStyle="semi"
                      size={Size.text.body2.size}
                      line={20}
                      letterSpacing={0.5}
                      numberOfLines={2}
                      color={Color.neutral.light.neutral90}>
                      {formatCapitalizeEachWord(item?.value || '')}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={style.modal.loading.container}>
                <Text
                  textStyle="medium"
                  size={Size.text.body2.size}
                  line={21}
                  letterSpacing={0.5}
                  color={Color.mediumGray.light.mediumGray}>
                  {`${trans(locale, lang, selectedColumn)} ${trans(
                    locale,
                    lang,
                    'tidakDitemukan'
                  )}`}
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </BottomSheet>
    );
  }

  function renderSuccessModal() {
    const onBackPress = () => {
      setIsSuccessModal(false);
      setTimeout(() => {
        navigation.pop(1);
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
              currentAction === 'add'
                ? 'berhasilMenambahAlamat'
                : 'berhasilMengubahAlamat'
            )}
          </Text>
        </View>
        <Button
          type="linear-gradient"
          onPress={() => {
            setIsSuccessModal(false);
            setTimeout(() => {
              navigation.pop(1);
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
      onBackPress={() => navigation.pop()}
      title={trans(locale, lang, `${currentAction}Address`)}
      backgroundColor={Color.whiteBackground.light.whiteBackground}
      isPaddingBottom={false}>
      {renderContentContainer()}
      {renderFooterContainer()}
      <Padder style={style.container}>
        {renderAddressSelectionModal()}
        {renderSuccessModal()}
      </Padder>
    </Base>
  );
}

export default ProfileAddressEdit;

ProfileAddressEdit.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  profileAction: PropTypes.string.isRequired,
  getProfileProvinceResponse: PropTypes.objectOf(Object).isRequired,
  getProfileCityResponse: PropTypes.objectOf(Object).isRequired,
  getProfileDistrictResponse: PropTypes.objectOf(Object).isRequired,
  getProfileSubDistrictResponse: PropTypes.objectOf(Object).isRequired,
  getProfileProvinceFailed: PropTypes.objectOf(Object).isRequired,
  getProfileCityFailed: PropTypes.objectOf(Object).isRequired,
  getProfileDistrictFailed: PropTypes.objectOf(Object).isRequired,
  getProfileSubDistrictFailed: PropTypes.objectOf(Object).isRequired,
  getProfileProvince: PropTypes.func.isRequired,
  getProfileCity: PropTypes.func.isRequired,
  getProfileDistrict: PropTypes.func.isRequired,
  getProfileSubDistrict: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setSaveAddressFailed: PropTypes.objectOf(Object).isRequired,
  setUpdateAddressFailed: PropTypes.objectOf(Object).isRequired,
  setSaveAddress: PropTypes.func.isRequired,
  setSaveAddressClear: PropTypes.func.isRequired,
  setUpdateAddress: PropTypes.func.isRequired,
  setUpdateAddressClear: PropTypes.func.isRequired,
};
