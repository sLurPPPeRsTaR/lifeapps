import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import Base from 'ca-component-container/Base';
import { trans } from 'ca-util/trans';
import Padder from 'ca-component-container/Padder';
import Input from 'ca-component-generic/Input';
import { Cancel, LocPin, SearchOutline } from 'ca-config/Svg';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import _ from 'lodash';
import { GET_PERSONAL_DATA_PROVINCE_SUCCESS } from 'ca-module-profile/profileConstant';
import { NAVIGATION } from 'ca-util/constant';
import Size from 'ca-config/Size';
import locale from './locale';
import Styles from './style';

function ProfilePersonalProvince(props) {
  const {
    navigation,
    lang,
    getPersonalDataProvince,
    getPersonalDataProvinceResponse,
    profileAction,
    setLoading,
    setPersonalDataProvince,
    setPersonalDataProvinceClear,
    setPersonalDataCityClear,
    setPersonalDataDistrictClear,
  } = props;

  const iconProps = {
    fill: Color.grayIcon.light.grayIcon,
    width: 24,
    height: 24,
  };

  const [provinsi, setProvinsi] = useState();
  const [tempProvinsi, setTempProvinsi] = useState();
  const [value, setValue] = useState();

  useEffect(() => {
    getPersonalDataProvince({ lang });
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPersonalDataProvinceResult(profileAction);
  }, [profileAction, setPersonalDataProvinceResult]);

  const setPersonalDataProvinceResult = useCallback(
    (act) => {
      setLoading(false);
      if (act === GET_PERSONAL_DATA_PROVINCE_SUCCESS) {
        setProvinsi(getPersonalDataProvinceResponse.data);
        setTempProvinsi(getPersonalDataProvinceResponse.data);
      }
    },
    [getPersonalDataProvinceResponse.data, setLoading]
  );

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

  function renderListProvince(item) {
    return (
      <View key={item.code}>
        <TouchableOpacity
          style={Styles.container}
          onPress={() => {
            setPersonalDataProvince({
              tempAddress: {
                province: {
                  code: item.code,
                  value: item.value,
                },
              },
            });
            setPersonalDataCityClear();
            setPersonalDataDistrictClear();
            navigation.navigate(NAVIGATION.PROFILE.ProfilePersonalCity);
          }}>
          <LocPin />
          <Text line={21} letterSpacing={0.08} style={Styles.text}>
            {item?.value?.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderProvince() {
    return (
      <View>
        <Input
          value={value}
          prefixIcon={<SearchOutline {...iconProps} />}
          suffixIcon={value && <Cancel {...iconProps} />}
          handleSuffixIcon={() => {
            setValue();
            setProvinsi(getPersonalDataProvinceResponse.data);
          }}
          onChangeText={(text) => {
            if (text) {
              setValue(text);
              setProvinsi(searchFilter(tempProvinsi, text));
            } else {
              setValue();
              setProvinsi(getPersonalDataProvinceResponse.data);
            }
          }}
        />

        {
          // eslint-disable-next-line no-nested-ternary
          !_.isEmpty(provinsi) ? (
            <View>
              {provinsi.map((item) => {
                return renderListProvince(item);
              })}
            </View>
          ) : provinsi?.length === 0 ? (
            <View style={Styles.loading}>
              <Text
                color={Color.mediumGray.dark.mediumGray}
                size={Size.text.body2.size}
                textStyle="semi"
                line={23.8}
                letterSpacing={0.5}>
                {trans(locale, lang, 'maafProvinsiTidak')}
              </Text>
            </View>
          ) : (
            <View style={Styles.loading}>
              <ActivityIndicator
                size="large"
                color={Color.primary.light.primary90}
              />
            </View>
          )
        }
      </View>
    );
  }

  return (
    <Base
      leftTitle
      onBackPress={() => {
        setPersonalDataProvinceClear();
        setPersonalDataCityClear();
        setPersonalDataDistrictClear();
        navigation.pop();
      }}
      title={trans(locale, lang, 'provinsi')}>
      <Padder>{renderProvince()}</Padder>
    </Base>
  );
}

export default ProfilePersonalProvince;

ProfilePersonalProvince.propTypes = {
  lang: PropTypes.string.isRequired,
  getPersonalDataProvince: PropTypes.func.isRequired,
  profileAction: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  getPersonalDataProvinceResponse: PropTypes.objectOf(Object).isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  setPersonalDataProvince: PropTypes.func.isRequired,
  setPersonalDataProvinceClear: PropTypes.func.isRequired,
  setPersonalDataCityClear: PropTypes.func.isRequired,
  setPersonalDataDistrictClear: PropTypes.func.isRequired,
};
