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
import { GET_PERSONAL_DATA_DISTRICT_SUCCESS } from 'ca-module-profile/profileConstant';
import { NAVIGATION } from 'ca-util/constant';
import Size from 'ca-config/Size';
import locale from './locale';
import Styles from './style';

function ProfilePersonalDistrict(props) {
  const {
    navigation,
    lang,
    setLoading,
    profileAction,
    getPersonalDataDistrict,
    getPersonalDataDistrictResponse,
    setPersonalDataCityParam,
    getPersonalDataResponse,
    setPersonalDataDistrict,
    setPersonalDataDistrictClear,
  } = props;

  const iconProps = {
    fill: Color.grayIcon.light.grayIcon,
    width: 24,
    height: 24,
  };

  const [districtCode, setDisctrictCode] = useState();
  const [kecamatan, setKecamatan] = useState();
  const [tempKecamatan, setTempKecamatan] = useState();
  const [value, setValue] = useState();

  useEffect(() => {
    setLoading(true);
    if (!setPersonalDataCityParam?.tempAddress?.city?.code) {
      setDisctrictCode(getPersonalDataResponse?.address?.city?.code);
    } else {
      setDisctrictCode(setPersonalDataCityParam?.tempAddress?.city?.code);
    }

    getPersonalDataDistrict({ districtCode, lang });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtCode]);

  useEffect(() => {
    setPersonalDataDistrictResult(profileAction);
  }, [profileAction, setPersonalDataDistrictResult]);

  const setPersonalDataDistrictResult = useCallback(
    (act) => {
      setLoading(false);
      if (act === GET_PERSONAL_DATA_DISTRICT_SUCCESS) {
        setKecamatan(getPersonalDataDistrictResponse.data);
        setTempKecamatan(getPersonalDataDistrictResponse.data);
      }
    },
    [getPersonalDataDistrictResponse.data, setLoading]
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

  function renderListDistrtict(item) {
    return (
      <View key={item.code}>
        <TouchableOpacity
          style={Styles.container}
          onPress={() => {
            setPersonalDataDistrict({
              tempAddress: {
                district: {
                  code: item.code,
                  value: item.value,
                },
              },
            });
            navigation.navigate(NAVIGATION.PROFILE.ProfilePersonalData);
          }}>
          <LocPin />
          <Text line={21} letterSpacing={0.08} style={Styles.text}>
            {item?.value?.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderDistrict() {
    return (
      <View>
        <Input
          value={value}
          prefixIcon={<SearchOutline {...iconProps} />}
          suffixIcon={value && <Cancel {...iconProps} />}
          handleSuffixIcon={() => {
            setValue();
            setKecamatan(getPersonalDataDistrictResponse.data);
          }}
          onChangeText={(text) => {
            if (text) {
              setValue(text);
              setKecamatan(searchFilter(tempKecamatan, text));
            } else {
              setValue();
              setKecamatan(getPersonalDataDistrictResponse.data);
            }
          }}
        />

        {
          // eslint-disable-next-line no-nested-ternary
          !_.isEmpty(kecamatan) ? (
            <View>
              {kecamatan.map((item) => {
                return renderListDistrtict(item);
              })}
            </View>
          ) : kecamatan?.length === 0 ? (
            <View style={Styles.loading}>
              <Text
                color={Color.mediumGray.dark.mediumGray}
                size={Size.text.body2.size}
                textStyle="semi"
                line={23.8}
                letterSpacing={0.5}>
                {trans(locale, lang, 'maafKecamatanTidak')}
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
        navigation.pop();
        setPersonalDataDistrictClear();
      }}
      title={trans(locale, lang, 'kecamatan')}>
      <Padder>{renderDistrict()}</Padder>
    </Base>
  );
}

export default ProfilePersonalDistrict;

ProfilePersonalDistrict.propTypes = {
  lang: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  getPersonalDataDistrict: PropTypes.func.isRequired,
  profileAction: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  getPersonalDataDistrictResponse: PropTypes.objectOf(Object).isRequired,
  setPersonalDataCityParam: PropTypes.objectOf(Object).isRequired,
  getPersonalDataResponse: PropTypes.objectOf(Object).isRequired,
  setPersonalDataDistrict: PropTypes.func.isRequired,
  setPersonalDataDistrictClear: PropTypes.func.isRequired,
};
