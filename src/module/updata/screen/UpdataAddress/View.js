import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Padder from 'ca-component-container/Padder';
import Base from 'ca-component-container/Base';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import { NAVIGATION } from 'ca-util/constant';
import Button from 'ca-component-generic/Button';
import { formatCapitalizeEachWord } from 'ca-util/format';
import { useDefaultBackHandler } from 'ca-util/common';
import AddressCard from './components/AddressCard';
import locale from './locale';
import style from './style';

function UpdataAddress(props) {
  const {
    navigation,
    lang,
    colorScheme,
    otherInformation,
    setOtherInformation,
    route: { params },
    getUpdataLastOtherInfoResponse,
    updataTempState,
    isKTPSame,
    getUpdataLastKTPInfoResponse,
  } = props;

  useDefaultBackHandler(navigation);

  const lastOtherInfo = useMemo(() => {
    return getUpdataLastOtherInfoResponse?.data;
  }, [getUpdataLastOtherInfoResponse?.data]);

  const getItemAddress = useCallback(
    (key) => {
      if (key === 'residentAddress') {
        const tempKTP = isKTPSame
          ? getUpdataLastKTPInfoResponse?.data
          : updataTempState?.verifyPengkinianPayload?.user;
        if (tempKTP) {
          return {
            street: tempKTP?.address || '',
            province: tempKTP?.province || '',
            city: tempKTP?.city || '',
            district: tempKTP?.district || '',
            subDistrict: tempKTP?.subDistrict || '',
            neighborhood: tempKTP?.neighborhood || '',
            hamlet: tempKTP?.hamlet || '',
            postalcode: tempKTP?.postalcode || '',
          };
        }
        return lastOtherInfo?.address[key];
      }
      return (
        otherInformation?.data?.address[key] || lastOtherInfo?.address[key]
      );
    },
    [
      getUpdataLastKTPInfoResponse?.data,
      isKTPSame,
      lastOtherInfo?.address,
      otherInformation?.data?.address,
      updataTempState?.verifyPengkinianPayload?.user,
    ]
  );

  const getTextAddress = useCallback(
    (itemAddress, key) => {
      let textAddress;
      if (itemAddress) {
        const namaJalan = itemAddress.street || '';
        const rt = itemAddress.neighborhood || '';
        const rw = itemAddress.hamlet || '';
        const kelurahan = formatCapitalizeEachWord(
          itemAddress.subDistrict || ''
        );
        const kecamatan = formatCapitalizeEachWord(itemAddress.district || '');
        const kota = formatCapitalizeEachWord(itemAddress.city || '');
        const provinsi = formatCapitalizeEachWord(itemAddress.province || '');
        const kodePos = itemAddress.postalcode || '';
        textAddress = `${namaJalan}, ${
          rt && rw ? `RT${rt}/RW${rw}` : ''
        }, ${kelurahan}, ${kecamatan}, ${kota}, ${provinsi}, ${kodePos}`
          .replace(/ ,/g, '')
          .trim()
          .replace(/^, /g, '')
          .trim()
          .replace(/,$/g, '');
      } else {
        if (key === 'residentAddress') {
          textAddress = `${trans(locale, lang, 'andaBelumMemasukkan')}${trans(
            locale,
            lang,
            'sesuaiKTP'
          )}`;
        }
        if (key === 'officeAddress') {
          textAddress = `${trans(locale, lang, 'andaBelumMemasukkan')}${trans(
            locale,
            lang,
            'kantor'
          )}`;
        }
        if (key === 'correspondAddress') {
          textAddress = `${trans(locale, lang, 'andaBelumMemasukkan')}${trans(
            locale,
            lang,
            'suratMenyurat'
          )}`;
        }
        if (key === 'billingAddress') {
          textAddress = `${trans(locale, lang, 'andaBelumMemasukkan')}${trans(
            locale,
            lang,
            'penagihan'
          )}`;
        }
      }
      return textAddress;
    },
    [lang]
  );

  const [selectedAddress, setSelectedAddress] = useState({
    key: params?.selectedAddress,
    itemAddress: getItemAddress(params?.selectedAddress),
  });

  const isButtonDisabled = useMemo(() => {
    return (
      selectedAddress === null ||
      !selectedAddress?.key ||
      !selectedAddress?.itemAddress
    );
  }, [selectedAddress]);

  function renderCardContainer() {
    return Object.entries(otherInformation?.data?.address).map(
      ([key, item]) => {
        const addressFlag = lastOtherInfo?.addressFlag[key];
        if (!addressFlag?.isShow) {
          return null;
        }
        const itemAddress = getItemAddress(key);
        const textAddress = getTextAddress(itemAddress, key);
        return (
          <AddressCard
            thisKey={key}
            selectedAddress={selectedAddress}
            title={trans(locale, lang, key)}
            textAddress={textAddress}
            onPress={() => {
              setSelectedAddress({ key, itemAddress });
            }}
            editLabel={trans(locale, lang, 'ubahAlamat')}
            isEditable={addressFlag?.isEditable}
            onEditPress={() => {
              navigation.navigate(NAVIGATION.UPDATA.UpdataAddressEdit, {
                address: item,
                addressType: key,
              });
            }}
          />
        );
      }
    );
  }

  function renderContentContainer() {
    return <View>{renderCardContainer()}</View>;
  }

  function renderFooterContainer() {
    return (
      <Padder style={style.footer.container}>
        <Button
          disabled={isButtonDisabled}
          type="linear-gradient"
          onPress={() => {
            setOtherInformation({
              ...otherInformation,
              data: {
                ...otherInformation.data,
                address: {
                  ...otherInformation.data.address,
                  [params?.selectedAddress]: {
                    ...selectedAddress?.itemAddress,
                  },
                },
              },
            });
            navigation.pop();
          }}>
          {trans(locale, lang, 'pilihAlamat')}
        </Button>
      </Padder>
    );
  }

  return (
    <Base
      bordered
      onBackPress={() => navigation.pop()}
      title={trans(locale, lang, 'pilihAlamat')}
      backgroundColor={Color.whiteBackground.light.whiteBackground}
      isPaddingBottom={false}
      renderBottom={renderFooterContainer()}>
      <Padder style={style.container}>{renderContentContainer()}</Padder>
    </Base>
  );
}

export default UpdataAddress;

UpdataAddress.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  otherInformation: PropTypes.objectOf(Object).isRequired,
  setOtherInformation: PropTypes.func.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  getUpdataLastOtherInfoResponse: PropTypes.objectOf(Object).isRequired,
  updataTempState: PropTypes.objectOf(Object).isRequired,
  isKTPSame: PropTypes.bool.isRequired,
  getUpdataLastKTPInfoResponse: PropTypes.objectOf(Object).isRequired,
};
