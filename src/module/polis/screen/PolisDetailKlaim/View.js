import React, { useCallback, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  FlatList,
  Alert,
  ActivityIndicator,
  Image,
  ImageBackground,
} from 'react-native';
import { trans } from 'ca-util/trans';
import Text from 'ca-component-generic/Text';
import ListAccordion from 'ca-component-card/ListAccordion';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import moment from 'moment/min/moment-with-locales';
import { formatCurrency } from 'ca-util/numbro';
import { formatCapitalizeEachWord } from 'ca-util/format';

import {
  GET_POLICY_CLAIM_FAILED,
  GET_POLICY_CLAIM_SUCCESS,
} from 'ca-module-polis/polisConstant';
import { useIsFocused } from '@react-navigation/native';
import { LooperGroup2, RusakIcon } from 'ca-config/Image';
import { ArrowDownGray, Chart } from 'ca-config/Svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NAVIGATION } from 'ca-util/constant';
import Shadow from 'ca-component-container/Shadow';
import PolisModalError from 'ca-module-polis/components/ModalError';
import Style from './style';
import locale from './locale';
import StatusBadge from '../PolisDetailSummary/components/StatusBadge';

const LIMIT_ITEM = 10;

function PolisDetailKlaim(props) {
  const {
    navigation,
    lang,
    colorScheme,
    route: { params },
    polisAction,
    getPolicyClaim,
    getPolicyClaimResponse,
    getPolicyClaimFailed,
    getPolicyClaimClear,
    setLoading,
    setIsShowModalBadRequest,
  } = props;
  const polis = params?.polis;

  const isExecuted = useRef(false);
  const isFocused = useIsFocused();
  const isFetched = useRef(false);

  moment.locale(lang);

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Page focus
  useEffect(() => {
    if (!isExecuted.current && isFocused) {
      getPolicyClaim({
        policyNo: polis.policyNo || polis.oldPolicyNo,
        productCode: polis.productCode,
        source: polis.source,
        limit: LIMIT_ITEM,
        page: 1,
      });
      setLoading(true);
      isExecuted.current = true;
    }
  }, [
    getPolicyClaim,
    isFocused,
    polis.oldPolicyNo,
    polis.policyNo,
    polis.productCode,
    polis.source,
    setLoading,
  ]);

  useEffect(() => {
    getPolicyClaimResult(polisAction);
  }, [getPolicyClaimResult, polisAction]);

  const getPolicyClaimResult = useCallback(
    (act) => {
      if (act === GET_POLICY_CLAIM_SUCCESS) {
        isFetched.current = true;
        setTotal(getPolicyClaimResponse.data.total);
        setCurrentPage(getPolicyClaimResponse.data.currentPage);
        setLastPage(getPolicyClaimResponse.data.lastPage);
        setLoading(false);

        if (isRefreshing) {
          setTimeout(() => {
            setData(data.concat(getPolicyClaimResponse.data.data));
            setIsRefreshing(false);
            getPolicyClaimClear();
          }, 1000);
        } else {
          setData(data.concat(getPolicyClaimResponse.data.data));
          setIsRefreshing(false);
          getPolicyClaimClear();
        }
      }
      if (act === GET_POLICY_CLAIM_FAILED) {
        setLoading(false);
        isFetched.current = true;
        if (isRefreshing) {
          setTimeout(() => {
            setIsRefreshing(false);
            if (getPolicyClaimFailed?.message !== 'INTERNAL_SERVER_ERROR') {
              if (getPolicyClaimFailed?.message === 'BAD_REQUEST') {
                setIsShowModalBadRequest(true);
                return;
              }
              if (getPolicyClaimFailed?.message === 'POLICY_NOT_LINKED') {
                setIsVisible(true);
                return;
              }
            }
            getPolicyClaimClear();
          }, 1000);
        } else {
          setIsRefreshing(false);
          if (getPolicyClaimFailed?.message !== 'INTERNAL_SERVER_ERROR') {
            // eslint-disable-next-line max-depth
            if (getPolicyClaimFailed?.message === 'BAD_REQUEST') {
              setIsShowModalBadRequest(true);
              return;
            }
            if (getPolicyClaimFailed?.message === 'POLICY_NOT_LINKED') {
              setIsVisible(true);
              return;
            }
          }
          getPolicyClaimClear();
        }
      }
    },
    [
      data,
      getPolicyClaimClear,
      getPolicyClaimFailed?.message,
      getPolicyClaimResponse.data.currentPage,
      getPolicyClaimResponse.data.data,
      getPolicyClaimResponse.data.lastPage,
      getPolicyClaimResponse.data.total,
      isRefreshing,
      setIsShowModalBadRequest,
      setLoading,
      setIsVisible,
    ]
  );

  function formatValue(value) {
    const regexNumber = /^[0-9]*$/;
    if (!value && value !== false) {
      return '-';
    }
    // Money
    if (!Number.isNaN(value) && Number.isFinite(value)) {
      return `Rp ${formatCurrency({ value })}`;
    }
    // Date
    if (!regexNumber.test(value) && moment(value, true).isValid()) {
      return moment(value, true).format('DD MMMM YYYY');
    }
    return value;
  }

  function renderListAccordion(key, value) {
    return (
      <ListAccordion
        initialExpanded={key === 0}
        touchableType="opacity"
        suffixIcon={<ArrowDownGray />}
        headerContainerStyle={Style.listAccordion.headerContainerStyle}
        headerContainerStyleActive={
          Style.listAccordion.headerContainerStyleActive
        }
        header={
          <Text
            textStyle="semi"
            size={Size.text.body1.size}
            line={21}
            letterSpacing={0.5}
            numberOfLines={1}
            style={{ width: Size.screen.width - 88 }}>
            {trans(locale, lang, 'claimNo')}: {value.claimNo}
          </Text>
        }>
        <Shadow animated borderRadius={30} style={Style.listAccordion.content}>
          <View style={Style.dataList.grid}>
            {Object.entries(value).map(([k, v]) => {
              if (k === 'claimStatus' && polis?.source === '001') {
                return (
                  <View key={k} style={Style.dataList.claimStatus}>
                    <Text
                      textStyle="medium"
                      size={Size.text.caption1.size}
                      line={15}
                      letterSpacing={0.5}
                      color={Color.grayBadgeClaim.light.grayBadgeClaim400}>
                      {v}
                    </Text>
                  </View>
                );
              }
              if (k === 'claimType' && polis?.source === '001') {
                return (
                  <View key={k} style={Style.dataList.row}>
                    <View style={Style.dataList.col.key}>
                      <Text
                        textStyle="regular"
                        size={Size.text.caption1.size}
                        line={18}
                        letterSpacing={0.5}
                        color={Color.mediumGray[colorScheme].mediumGray}>
                        {trans(locale, lang, `${k}LS`)}
                      </Text>
                    </View>
                    <View style={Style.dataList.col.value}>
                      <Text
                        textStyle="medium"
                        size={Size.text.body2.size}
                        line={21}
                        letterSpacing={0.5}>
                        {formatValue(v)}
                      </Text>
                    </View>
                  </View>
                );
              }

              return (
                <View>
                  {k === 'claimNo' || k === 'claimStatus' ? null : (
                    <View key={k} style={Style.dataList.row}>
                      <View style={Style.dataList.col.key}>
                        <Text
                          textStyle="regular"
                          size={Size.text.caption1.size}
                          line={18}
                          letterSpacing={0.5}
                          color={Color.mediumGray[colorScheme].mediumGray}>
                          {trans(locale, lang, k)}
                        </Text>
                      </View>
                      <View style={Style.dataList.col.value}>
                        <Text
                          textStyle="medium"
                          size={Size.text.body2.size}
                          line={21}
                          letterSpacing={0.5}>
                          {formatValue(v)}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              );
            })}
            {polis?.source === '001' || polis?.source === '002' ? (
              <View style={Style.viewProgress}>
                <Chart style={Style.me8} />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(NAVIGATION.POLICY.PolisKlaimProgress, {
                      polis,
                      claimNo: value.claimNo,
                    });
                  }}>
                  <Text
                    textStyle="regular"
                    size={Size.text.caption1.size}
                    line={20}
                    letterSpacing={0.5}
                    textDecorationLine="underline"
                    color={Color.primary.light.primary90}>
                    {trans(locale, lang, 'viewProgress')}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          {/* <View style={{ position: 'relative' }}> */}
          <StatusBadge
            statusName={trans(
              locale,
              lang,
              formatCapitalizeEachWord(value?.claimStatus.toLowerCase())
            )}
            statusCode={formatCapitalizeEachWord(
              value?.claimStatus.toLowerCase()
            )}
            style={[Style.mr16, Style.mt6]}
          />
          {/* </View> */}
        </Shadow>
      </ListAccordion>
    );
  }

  function renderFooterFlatList() {
    if (!isRefreshing) return null;
    return (
      <View style={Style.p8}>
        <ActivityIndicator
          animating
          color={Color.primary[colorScheme].primary90}
          size="large"
        />
      </View>
    );
  }

  if (!isFetched.current) {
    return (
      <ImageBackground
        source={LooperGroup2}
        resizeMode="cover"
        style={Style.imageBackground}>
        <View />
      </ImageBackground>
    );
  }
  if (isFetched.current && (!data || data.length < 1 || total < 1)) {
    return (
      <ImageBackground
        source={LooperGroup2}
        resizeMode="cover"
        style={Style.imageBackground}>
        <View style={[Style.nodata]}>
          <Image
            source={RusakIcon}
            style={Style.imageRusak}
            resizeMode="contain"
          />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={27}
            letterSpacing={0.5}
            align="center">
            {trans(locale, lang, 'tidakAdaKlaim')}
          </Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={LooperGroup2}
      resizeMode="cover"
      style={Style.imageBackground}>
      <View style={Style.container}>
        <View style={[Style.content.container]}>
          <FlatList
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            data={data}
            style={Style.infiniteScroll.container}
            contentContainerStyle={Style.pb64}
            keyExtractor={(item) => item.claimNo}
            renderItem={({ item, index }) => (
              <View
                style={[
                  Style.listAccordion.container,
                  index !== data.length - 1 ? Style.mb32 : Style.mb8,
                ]}>
                {renderListAccordion(index, item)}
              </View>
            )}
            onEndReached={() => {
              if (isRefreshing) {
                return;
              }
              if (currentPage < lastPage) {
                setIsRefreshing(true);
                setTimeout(() => {
                  getPolicyClaim({
                    policyNo: polis.policyNo || polis.oldPolicyNo,
                    productCode: polis.productCode,
                    source: polis.source,
                    limit: LIMIT_ITEM,
                    page: currentPage + 1,
                  });
                }, 1000);
              }
            }}
            ListFooterComponent={renderFooterFlatList()}
          />
        </View>
      </View>
      <PolisModalError
        navigation={navigation}
        isVisible={isVisible}
        colorScheme={colorScheme}
        onClose={() => {
          setIsVisible(false);
          navigation.reset({
            index: 0,
            routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
          });
        }}
        lang={lang}
      />
    </ImageBackground>
  );
}

export default PolisDetailKlaim;

PolisDetailKlaim.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  polisAction: PropTypes.string.isRequired,
  getPolicyClaim: PropTypes.func.isRequired,
  getPolicyClaimResponse: PropTypes.objectOf(Object).isRequired,
  getPolicyClaimFailed: PropTypes.objectOf(Object).isRequired,
  getPolicyClaimClear: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setIsShowModalBadRequest: PropTypes.func.isRequired,
};
