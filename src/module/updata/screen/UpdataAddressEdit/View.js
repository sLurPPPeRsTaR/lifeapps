import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
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
  GET_UPDATA_CITY_FAILED,
  GET_UPDATA_CITY_SUCCESS,
  GET_UPDATA_DISTRICT_FAILED,
  GET_UPDATA_DISTRICT_SUCCESS,
  GET_UPDATA_PROVINCE_FAILED,
  GET_UPDATA_PROVINCE_SUCCESS,
  GET_UPDATA_SUB_DISTRICT_FAILED,
  GET_UPDATA_SUB_DISTRICT_SUCCESS,
} from 'ca-module-updata/updataConstant';
import { formatCapitalizeEachWord } from 'ca-util/format';
import _ from 'lodash';
import { useDefaultBackHandler } from 'ca-util/common';
import locale from './locale';
import style from './style';

const dummyListProvinsi = [
  {
    code: '001',
    name: 'Aceh',
  },
  {
    code: '002',
    name: 'Banten',
  },
  {
    code: '003',
    name: 'DKI Jakarta',
  },
  {
    code: '004',
    name: 'Jawa Barat',
  },
  {
    code: '005',
    name: 'Jawa Tengah',
  },
  {
    code: '006',
    name: 'Jawa Timur',
  },
];

const dummyListKota = [
  {
    code: '001',
    name: 'Kota A',
  },
  {
    code: '002',
    name: 'Kota B',
  },
  {
    code: '003',
    name: 'Kota C',
  },
  {
    code: '004',
    name: 'Kota D',
  },
  {
    code: '005',
    name: 'Kota E',
  },
  {
    code: '006',
    name: 'Kota F',
  },
];

const dummyListKecamatan = [
  {
    code: '001',
    name: 'Kecamatan A',
  },
  {
    code: '002',
    name: 'Kecamatan B',
  },
  {
    code: '003',
    name: 'Kecamatan C',
  },
  {
    code: '004',
    name: 'Kecamatan D',
  },
  {
    code: '005',
    name: 'Kecamatan E',
  },
  {
    code: '006',
    name: 'Kecamatan F',
  },
];

const dummyListKelurahan = [
  {
    code: '001',
    name: 'Kelurahan A',
  },
  {
    code: '002',
    name: 'Kelurahan B',
  },
  {
    code: '003',
    name: 'Kelurahan C',
  },
  {
    code: '004',
    name: 'Kelurahan D',
  },
  {
    code: '005',
    name: 'Kelurahan E',
  },
  {
    code: '006',
    name: 'Kelurahan F',
  },
];

function UpdataAddressEdit(props) {
  const {
    navigation,
    lang,
    colorScheme,
    route: { params },
    updataAction,
    getUpdataProvinceResponse,
    getUpdataCityResponse,
    getUpdataDistrictResponse,
    getUpdataSubDistrictResponse,
    getUpdataProvinceFailed,
    getUpdataCityFailed,
    getUpdataDistrictFailed,
    getUpdataSubDistrictFailed,
    getUpdataProvince,
    getUpdataCity,
    getUpdataDistrict,
    getUpdataSubDistrict,
    getUpdataProvinceClear,
    getUpdataCityClear,
    getUpdataDistrictClear,
    getUpdataSubDistrictClear,
    setLoading,
    otherInformation,
    setOtherInformation,
    dimensions,
  } = props;
  const { address, addressType } = params;

  useDefaultBackHandler(navigation);

  // Modal
  const [isAddressSelectionModal, setIsAddressSelectionModal] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  // State
  const [listProvinsi, setListProvinsi] = useState(dummyListProvinsi);
  const [listKota, setListKota] = useState(dummyListKota);
  const [listKecamatan, setListKecamatan] = useState(dummyListKecamatan);
  const [listKelurahan, setListKelurahan] = useState(dummyListKelurahan);

  const [selectedColumn, setSelectedColumn] = useState('');
  const searchRef = useRef(null);

  // Input
  const [namaJalan, setNamaJalan] = useState(address?.namaJalan || null);
  const [provinsi, setProvinsi] = useState(address?.provinsi || null);
  const [kota, setKota] = useState(address?.kota || null);
  const [kecamatan, setKecamatan] = useState(address?.kecamatan || null);
  const [kelurahan, setKelurahan] = useState(address?.kelurahan || null);
  const [rt, setRT] = useState(address?.rt || null);
  const [rw, setRW] = useState(address?.rw || null);
  const [kodePos, setKodePos] = useState(address?.kodePos || null);

  // Message
  const [namaJalanMessage, setNamaJalanMessage] = useState(null);
  const [provinsiMessage, setProvinsiMessage] = useState(null);
  const [kotaMessage, setKotaMessage] = useState(null);
  const [kecamatanMessage, setKecamatanMessage] = useState(null);
  const [kelurahanMessage, setKelurahanMessage] = useState(null);
  const [rtMessage, setRTMessage] = useState(null);
  const [rwMessage, setRWMessage] = useState(null);
  const [kodePosMessage, setKodePosMessage] = useState(null);

  // Validation Flag
  const [isNamaJalanValid, setIsNamaJalanValid] = useState(false);
  const [isProvinsiValid, setIsProvinsiValid] = useState(false);
  const [isKotaValid, setIsKotaValid] = useState(false);
  const [isKecamatanValid, setIsKecamatanValid] = useState(false);
  const [isKelurahanValid, setIsKelurahanValid] = useState(false);
  const [isRTValid, setIsRTValid] = useState(true);
  const [isRWValid, setIsRWValid] = useState(true);
  const [isKodePosValid, setIsKodePosValid] = useState(true);

  const [isSubmit, setIsSubmit] = useState(false);

  // API Function
  const isExecuted = useRef(false);
  useEffect(() => {
    if (!isExecuted.current) {
      setLoading(true);
      getUpdataProvince();
      isExecuted.current = true;
    }
  }, [getUpdataProvince, setLoading]);

  useEffect(() => {
    if (provinsi?.code) {
      setLoading(true);
      getUpdataCity({ code: provinsi?.code });
    }
  }, [getUpdataCity, provinsi, setLoading]);

  useEffect(() => {
    if (kota?.code) {
      setLoading(true);
      getUpdataDistrict({ code: kota?.code });
    }
  }, [getUpdataDistrict, kota, setLoading]);

  useEffect(() => {
    if (kecamatan?.code) {
      setLoading(true);
      getUpdataSubDistrict({ code: kecamatan?.code });
    }
  }, [getUpdataSubDistrict, kecamatan, setLoading]);

  useEffect(() => {
    addressResult(updataAction);
  }, [addressResult, updataAction]);

  const addressResult = useCallback(
    (act) => {
      if (act === GET_UPDATA_PROVINCE_SUCCESS) {
        setLoading(false);
        setListProvinsi(getUpdataProvinceResponse?.data);
      }
      if (act === GET_UPDATA_PROVINCE_FAILED) {
        setLoading(false);
      }
      if (act === GET_UPDATA_CITY_SUCCESS) {
        setLoading(false);
        setListKota(getUpdataCityResponse?.data);
      }
      if (act === GET_UPDATA_CITY_FAILED) {
        setLoading(false);
      }
      if (act === GET_UPDATA_DISTRICT_SUCCESS) {
        setLoading(false);
        setListKecamatan(getUpdataDistrictResponse?.data);
      }
      if (act === GET_UPDATA_DISTRICT_FAILED) {
        setLoading(false);
      }
      if (act === GET_UPDATA_SUB_DISTRICT_SUCCESS) {
        setLoading(false);
        setListKelurahan(getUpdataSubDistrictResponse?.data);
      }
      if (act === GET_UPDATA_SUB_DISTRICT_FAILED) {
        setLoading(false);
      }
    },
    [
      getUpdataSubDistrictResponse?.data,
      getUpdataDistrictResponse?.data,
      getUpdataCityResponse?.data,
      getUpdataProvinceResponse?.data,
      setLoading,
    ]
  );

  // Validation Function
  const validateNamaJalan = useCallback(
    (text) => {
      if (text.length < 1) {
        setNamaJalanMessage({
          error: trans(locale, lang, 'namaJalanRequired'),
        });
        return false;
      }
      const regexNamaJalan = /^[a-zA-Z0-9'`., ]+$/;
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
      if (text.length !== 0 && text.length !== 5) {
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
        textStyle="medium"
        size={Size.text.body2.size}
        color={Color.neutral.light.neutral10}>
        {trans(locale, lang, 'opsional')}
      </Text>
    );
    const arrowDownIcon = <ArrowDownGray />;

    return (
      <View>
        <View style={style.content.input.container}>
          <Input
            value={namaJalan}
            height={56}
            label={trans(locale, lang, 'namaJalan')}
            secondLabel={requiredLabel}
            placeholder={trans(locale, lang, 'masukkanNamaJalan')}
            onChangeText={(text) => {
              setNamaJalan(text);
              setIsNamaJalanValid(validateNamaJalan(text));
            }}
            message={namaJalanMessage}
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
        <View style={style.content.input.container}>
          <Input
            value={kodePos}
            height={56}
            label={trans(locale, lang, 'kodePos')}
            secondLabel={optionalLabel}
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
      </View>
    );
  }

  function renderFooterContainer() {
    return (
      <Padder style={[style.footer.container, { width: dimensions.width }]}>
        <Button
          disabled={!isFormValid()}
          type="linear-gradient"
          onPress={() => {
            setOtherInformation({
              ...otherInformation,
              data: {
                ...otherInformation.data,
                address: {
                  ...otherInformation.data.address,
                  [`${params?.addressType}`]: {
                    street: namaJalan,
                    province: provinsi?.value,
                    city: kota?.value,
                    district: kecamatan?.value,
                    subDistrict: kelurahan?.value,
                    neighborhood: rt,
                    hamlet: rw,
                    postalcode: kodePos,
                  },
                },
              },
            });
            setTimeout(() => {
              setIsSuccessModal(true);
            }, 200);
          }}>
          {trans(locale, lang, 'simpanAlamat')}
        </Button>
      </Padder>
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
      dummyList = getUpdataSubDistrictResponse?.data || [];
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
      dummyList = getUpdataDistrictResponse?.data || [];
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
      dummyList = getUpdataCityResponse?.data || [];
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
      dummyList = getUpdataProvinceResponse?.data || [];
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
          setSelectedColumn('');
          searchRef.current.clear();
          setList(dummyList);
        }}
        title={`${trans(locale, lang, 'pilih')} ${trans(locale, lang, title)}`}
        contentContainerStyle={style.pb24}>
        <View
          style={[
            style.modal.addressSelection.container,
            { height: dimensions.height / (Size.isAndroid ? 2.5 : 1.5) },
          ]}>
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
              <View
                style={[
                  style.modal.loading.container,
                  { height: dimensions.height / (Size.isAndroid ? 3 : 2) },
                ]}>
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
      setIsSubmit(true);
      setIsSuccessModal(false);
      setTimeout(
        () => {
          setIsSubmit(false);
          navigation.pop(2);
        },
        Size.isAndroid ? 200 : 500
      );
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
            {trans(locale, lang, addressType)}
            {'\n'}
            {trans(locale, lang, 'berhasilDiubah')}
          </Text>
        </View>
        <Button
          disabled={isSubmit}
          type="linear-gradient"
          onPress={() => {
            setIsSubmit(true);
            setIsSuccessModal(false);
            setTimeout(
              () => {
                setIsSubmit(false);
                navigation.pop(2);
              },
              Size.isAndroid ? 200 : 500
            );
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
      title={`${trans(locale, lang, 'ubahAlamat')} ${trans(
        locale,
        lang,
        addressType
      )}`}
      backgroundColor={Color.whiteBackground.light.whiteBackground}
      isPaddingBottom={false}>
      <Padder style={style.container}>
        {renderContentContainer()}
        {renderAddressSelectionModal()}
        {renderSuccessModal()}
        {renderFooterContainer()}
      </Padder>
    </Base>
  );
}

export default UpdataAddressEdit;

UpdataAddressEdit.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  updataAction: PropTypes.string.isRequired,
  getUpdataProvinceResponse: PropTypes.objectOf(Object).isRequired,
  getUpdataCityResponse: PropTypes.objectOf(Object).isRequired,
  getUpdataDistrictResponse: PropTypes.objectOf(Object).isRequired,
  getUpdataSubDistrictResponse: PropTypes.objectOf(Object).isRequired,
  getUpdataProvinceFailed: PropTypes.objectOf(Object).isRequired,
  getUpdataCityFailed: PropTypes.objectOf(Object).isRequired,
  getUpdataDistrictFailed: PropTypes.objectOf(Object).isRequired,
  getUpdataSubDistrictFailed: PropTypes.objectOf(Object).isRequired,
  getUpdataProvince: PropTypes.func.isRequired,
  getUpdataCity: PropTypes.func.isRequired,
  getUpdataDistrict: PropTypes.func.isRequired,
  getUpdataSubDistrict: PropTypes.func.isRequired,
  getUpdataProvinceClear: PropTypes.func.isRequired,
  getUpdataCityClear: PropTypes.func.isRequired,
  getUpdataDistrictClear: PropTypes.func.isRequired,
  getUpdataSubDistrictClear: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  otherInformation: PropTypes.objectOf(Object).isRequired,
  setOtherInformation: PropTypes.func.isRequired,
  dimensions: PropTypes.objectOf(Object).isRequired,
};
