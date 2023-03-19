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
import { GET_PERSONAL_DATA_CITY_SUCCESS } from 'ca-module-profile/profileConstant';
import { NAVIGATION } from 'ca-util/constant';
import Size from 'ca-config/Size';
import locale from './locale';
import Styles from './style';

function ProfilePersonalCity(props) {
  const {
    navigation,
    lang,
    setLoading,
    profileAction,
    getPersonalDataCity,
    getPersonalDataCityResponse,
    setPersonalDataProvinceParam,
    getPersonalDataResponse,
    setPersonalDataCity,
    setPersonalDataCityClear,
    setPersonalDataDistrictClear,
  } = props;

  const iconProps = {
    fill: Color.grayIcon.light.grayIcon,
    width: 24,
    height: 24,
  };

  const [provinceCode, setProvinceCode] = useState();
  const [kabupaten, setKabupaten] = useState();
  const [tempKabupaten, setTempKabupaten] = useState();
  const [value, setValue] = useState();

  useEffect(() => {
    setLoading(true);
    if (!setPersonalDataProvinceParam?.tempAddress?.province?.code) {
      setProvinceCode(getPersonalDataResponse?.address?.province?.code);
    } else {
      setProvinceCode(
        setPersonalDataProvinceParam?.tempAddress?.province?.code
      );
    }
    getPersonalDataCity({ provinceCode, lang });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provinceCode]);

  useEffect(() => {
    setPersonalDataCityResult(profileAction);
  }, [profileAction, setPersonalDataCityResult]);

  const setPersonalDataCityResult = useCallback(
    (act) => {
      setLoading(false);
      if (act === GET_PERSONAL_DATA_CITY_SUCCESS) {
        setKabupaten(getPersonalDataCityResponse.data);
        setTempKabupaten(getPersonalDataCityResponse.data);
      }
    },

    [getPersonalDataCityResponse.data, setLoading]
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

  function renderListCity(item) {
    return (
      <View key={item.code}>
        <TouchableOpacity
          style={Styles.container}
          onPress={() => {
            setPersonalDataCity({
              tempAddress: {
                city: {
                  code: item.code,
                  value: item.value,
                },
              },
            });
            setPersonalDataDistrictClear();
            navigation.navigate(NAVIGATION.PROFILE.ProfilePersonalDistrict);
          }}>
          <LocPin />
          <Text line={21} letterSpacing={0.08} style={Styles.text}>
            {item?.value?.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderCity() {
    return (
      <View>
        <Input
          value={value}
          prefixIcon={<SearchOutline {...iconProps} />}
          suffixIcon={value && <Cancel {...iconProps} />}
          handleSuffixIcon={() => {
            setValue();
            setKabupaten(getPersonalDataCityResponse.data);
          }}
          onChangeText={(text) => {
            if (text) {
              setValue(text);
              setKabupaten(searchFilter(tempKabupaten, text));
            } else {
              setValue();
              setKabupaten(getPersonalDataCityResponse.data);
            }
          }}
        />

        {
          // eslint-disable-next-line no-nested-ternary
          !_.isEmpty(kabupaten) ? (
            <View>
              {kabupaten.map((item) => {
                return renderListCity(item);
              })}
            </View>
          ) : kabupaten?.length === 0 ? (
            <View style={Styles.loading}>
              <Text
                color={Color.mediumGray.dark.mediumGray}
                size={Size.text.body2.size}
                textStyle="semi"
                line={23.8}
                letterSpacing={0.5}>
                {trans(locale, lang, 'maafKabupatenTidak')}
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
        setPersonalDataCityClear();
        setPersonalDataDistrictClear();
        navigation.pop();
      }}
      title={trans(locale, lang, 'kotaKabupaten')}>
      <Padder>{renderCity()}</Padder>
    </Base>
  );
}

export default ProfilePersonalCity;

ProfilePersonalCity.propTypes = {
  lang: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  getPersonalDataCity: PropTypes.func.isRequired,
  profileAction: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  getPersonalDataCityResponse: PropTypes.objectOf(Object).isRequired,
  setPersonalDataProvinceParam: PropTypes.objectOf(Object).isRequired,
  setPersonalDataCity: PropTypes.func.isRequired,
  getPersonalDataResponse: PropTypes.objectOf(Object).isRequired,
  setPersonalDataDistrictClear: PropTypes.func.isRequired,
  setPersonalDataCityClear: PropTypes.func.isRequired,
};
