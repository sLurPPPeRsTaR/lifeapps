import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import Padder from 'ca-component-container/Padder';
import Base from 'ca-component-container/Base';
import Text from 'ca-component-generic/Text';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import Button from 'ca-component-generic/Button';
import { NAVIGATION } from 'ca-util/constant';
import _ from 'lodash';
import { DefaultBank } from 'ca-config/Svg';
import { useDefaultBackHandler } from 'ca-util/common';
import locale from './locale';
import style from './style';

const dummyBank = [
  {
    bankName: 'PT BCA (BANK CENTRAL ASIA) TBK',
    bankNoRek: '187971123',
    bankHolder: 'Hana Herlina',
  },
];

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

function UpdataBank(props) {
  const {
    navigation,
    lang,
    colorScheme,
    // updataAction,
    getUpdataLastOtherInfoResponse,
    // getUpdataListBankResponse,
    // getUpdataListBank,
    // getUpdataListBankClear,
    // setLoading,
    otherInformation,
  } = props;

  useDefaultBackHandler(navigation);

  // const [isListBankModal, setIsListBankModal] = useState(false);

  const bankAccount =
    otherInformation?.data?.bankAccount ||
    getUpdataLastOtherInfoResponse?.data?.bankAccount;
  // const [filteredListBank, setFilteredListBank] = useState([]);
  // const [listBank, setListBank] = useState([]);
  const [selectedRek, setSelectedRek] = useState(bankAccount?.accountNo);

  // const searchRef = useRef(null);

  // useEffect(() => {
  //   setLoading(true);
  //   getUpdataListBank();
  // }, [getUpdataListBank, setLoading]);

  // useEffect(() => {
  //   updataResult(updataAction);
  // }, [updataAction, updataResult]);

  // const updataResult = useCallback(
  //   (act) => {
  //     if (act === GET_UPDATA_LIST_BANK_SUCCESS) {
  //       setLoading(false);
  //       getUpdataListBankClear();
  //       const temp = getUpdataListBankResponse?.data
  //         ?.filter((item) => item.bankCode !== 'CENAIDJA')
  //         .sort((a, b) => {
  //           return a.bankName > b.bankName
  //             ? 1
  //             : b.bankName > a.bankName
  //             ? -1
  //             : 0;
  //         });
  //       setFilteredListBank(temp);
  //       setListBank(temp);
  //     }
  //     if (act === GET_UPDATA_LIST_BANK_FAILED) {
  //       setLoading(false);
  //       getUpdataListBankClear();
  //     }
  //   },
  //   [getUpdataListBankClear, getUpdataListBankResponse?.data, setLoading]
  // );

  // function searchFilter(arr, inputKeyword) {
  //   return arr.filter((item) => {
  //     return (
  //       item.bankName
  //         .toString()
  //         .toLowerCase()
  //         .indexOf(inputKeyword.toString().toLowerCase()) > -1
  //     );
  //   });
  // }

  function renderCardContainer() {
    if (!_.isEmpty(bankAccount)) {
      return (
        <View
          key={bankAccount.accountNo}
          style={[
            style.card.container,
            style.mb16,
            selectedRek === bankAccount.accountNo && style.card.shadow,
          ]}>
          <TouchableOpacity
            onPress={() => setSelectedRek(bankAccount.accountNo)}
            style={[
              style.card.content.container,
              selectedRek !== bankAccount.accountNo && style.card.shadow,
            ]}>
            <View style={style.card.content.leftContainer}>
              <DefaultBank />
              <View style={style.ms12}>
                <Text
                  textStyle="medium"
                  size={Size.text.body2.size}
                  line={21}
                  letterSpacing={0.5}
                  color={Color.neutral.light.neutral40}
                  style={style.mb4}>
                  {bankAccount.bankName}
                </Text>
                <Text
                  textStyle="medium"
                  size={Size.text.body2.size}
                  line={21}
                  letterSpacing={0.5}
                  style={style.mb4}>
                  {bankAccount.accountHolderName}
                </Text>
                <Text
                  textStyle="medium"
                  size={Size.text.body2.size}
                  line={21}
                  letterSpacing={0.5}>
                  {bankAccount.accountNo}
                </Text>
              </View>
            </View>
            <View style={style.card.content.rightContainer}>
              <View
                style={
                  style.radio.container[
                    selectedRek === bankAccount.accountNo
                      ? 'active'
                      : 'inactive'
                  ]
                }>
                <View
                  style={
                    style.radio.button[
                      selectedRek === bankAccount.accountNo
                        ? 'active'
                        : 'inactive'
                    ]
                  }
                />
              </View>
            </View>
          </TouchableOpacity>
          {selectedRek === bankAccount.accountNo ? (
            <View style={style.card.footer.container}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(NAVIGATION.UPDATA.UpdataBankEdit);
                }}>
                <Text
                  textStyle="semi"
                  size={Size.text.body2.size}
                  line={21}
                  letterSpacing={0.5}
                  align="center"
                  color={Color.primary.light.primary90}>
                  {trans(locale, lang, 'ubahRekening')}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      );
    }
    return null;
  }

  function renderContentContainer() {
    return (
      <View>
        {renderCardContainer()}
        {_.isEmpty(bankAccount) ? (
          <TouchableOpacity
            style={style.button.tambahRekening.container}
            onPress={() => {
              navigation.navigate(NAVIGATION.UPDATA.UpdataBankEdit);
            }}>
            <View>
              <Text
                textStyle="semi"
                size={Size.text.body2.size}
                line={21}
                letterSpacing={0.5}
                align="center"
                color={Color.primary.light.primary90}>
                {trans(locale, lang, 'tambahRekening')}
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }

  function renderFooterContainer() {
    return (
      <Padder style={style.footer.container}>
        <Button
          disabled={selectedRek === null}
          type="linear-gradient"
          onPress={() => navigation.pop()}>
          {trans(locale, lang, 'pilihRekening')}
        </Button>
      </Padder>
    );
  }

  return (
    <Base
      bordered
      onBackPress={() => navigation.pop()}
      title={trans(locale, lang, 'pilihRekening')}
      backgroundColor={Color.whiteBackground.light.whiteBackground}
      isPaddingBottom={false}
      renderBottom={renderFooterContainer()}>
      <Padder style={style.container}>
        {renderContentContainer()}
        {/* {renderListBankModal()} */}
      </Padder>
    </Base>
  );
}

export default UpdataBank;

UpdataBank.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  // updataAction: PropTypes.string.isRequired,
  getUpdataLastOtherInfoResponse: PropTypes.objectOf(Object).isRequired,
  // getUpdataListBankResponse: PropTypes.objectOf(Object).isRequired,
  // getUpdataListBank: PropTypes.func.isRequired,
  // getUpdataListBankClear: PropTypes.func.isRequired,
  // setLoading: PropTypes.func.isRequired,
  otherInformation: PropTypes.objectOf(Object).isRequired,
};
