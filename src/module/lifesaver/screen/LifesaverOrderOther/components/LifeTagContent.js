import React, { useEffect, useMemo, useState } from 'react';
import { View, Image } from 'react-native';
import Color from 'ca-config/Color';
import CheckBox from '@react-native-community/checkbox';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import PropTypes from 'prop-types';
import { formatNumber } from 'ca-util/numbro';
import { trans } from 'ca-util/trans';
import { formatCapitalizeEachWord } from 'ca-util/format';
import { LifetagRedPlus, PinLoc } from 'ca-config/Svg';
import Shadow from 'ca-component-container/Shadow';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Dash from 'react-native-dash';
import HorizontalLine from 'ca-component-lifesaver/HorizontalLine';
import Input from 'ca-component-generic/Input';
import style from '../style';
import locale from '../locale';

function LifeTagContent(props) {
  const {
    getLifetagFlagResponse,
    getLifetagProductDetailResponse,
    colorScheme,
    lang,
    onChange,
    onChangeAddress,
    onAddPostCode,
    address,
  } = props;

  const [lifetagList, setLifetagList] = useState([]);
  const [inputPostCode, setInputPostCode] = useState('');
  const [remap, setRemap] = useState(false);

  const error = useMemo(() => {
    if (inputPostCode?.length === 5) {
      return false;
    }
    return { error: trans(locale, lang, 'mohonlengkapi') };
  }, [inputPostCode?.length, lang]);

  const labelPostCode = (
    <Text
      color={Color.primary.light.primary90}
      size={Size.text.body2.size}
      textStyle="semi">
      {trans(locale, lang, '*')}
    </Text>
  );

  // Distribute value to parent
  useEffect(() => {
    const list = lifetagList?.filter((element) => {
      return element?.checked === true;
    });
    onChange(list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lifetagList]);

  // Remap with checked and Quantity
  useEffect(() => {
    let defaultCheckedIndex = false;
    const alreadyOrderLifetagIsFalse = (flag, index, checked) => {
      if (!flag && index === checked) {
        return true;
      }
      return false;
    };
    const list =
      getLifetagProductDetailResponse?.data?.product?.colourList?.map(
        (element, index) => {
          if (defaultCheckedIndex === false && element?.stock > 0) {
            defaultCheckedIndex = index;
          }
          return {
            ...element,
            checked: alreadyOrderLifetagIsFalse(
              getLifetagFlagResponse?.data?.alreadyOrderLifeTag,
              index,
              defaultCheckedIndex
            ),
            quantity: alreadyOrderLifetagIsFalse(
              getLifetagFlagResponse?.data?.alreadyOrderLifeTag,
              index,
              defaultCheckedIndex
            )
              ? 1
              : 0,
          };
        }
      );
    if (list && !remap && getLifetagFlagResponse?.data) {
      setLifetagList(list);
      setRemap(true);
    }
  }, [getLifetagFlagResponse?.data, getLifetagProductDetailResponse, remap]);

  const checkLifeTagHaveChecked = useMemo(() => {
    const list = lifetagList?.find((element) => {
      return element?.checked === true;
    });
    return list;
  }, [lifetagList]);

  // const [checked, setChecked] = useState({});
  // const resultFilter = lifetagProduct?.filter((e) => {
  //   return e?.id === lifetagColorId;
  // });

  // useEffect(() => {

  //   setChecked({
  //     ...checked,
  //     [checked?.id]
  //   })
  // }, []);

  // const isChecked = () => {
  //   if (checked) {
  //     return true;
  //   }
  //   return false;
  // };

  const renderItem = (element, index) => {
    if (element?.stock > 0) {
      return (
        <View key={element?.id} style={style.mt16}>
          <View style={style.renderLifetagContent.itemHeader}>
            <CheckBox
              disabled={false}
              value={element?.checked}
              boxType="square"
              animationDuration={0.2}
              lineWidth={2}
              tintColors={{
                true: Color.red.dark.red90,
                false: Color.neutral[colorScheme].neutral20,
              }}
              style={style.renderLifetagContent.checkBox.checkBox}
              onValueChange={() => {
                const list = [...lifetagList];
                // list.splice(
                // {
                //   ...element,
                //   checked: !element?.checked,
                // },
                //   index
                // );
                if (element?.checked) {
                  list[index] = {
                    ...element,
                    checked: !element?.checked,
                    quantity: 0,
                  };
                }
                if (!element?.checked) {
                  list[index] = {
                    ...element,
                    checked: !element?.checked,
                    quantity: 1,
                  };
                }

                setLifetagList(list);
              }}
            />
            <View style={style.renderLifetagContent.itemLabel}>
              <Image
                key={element?.id}
                source={{ uri: element?.productImage }}
                style={style.renderLifetagContent.imgProduct}
              />
            </View>

            <View>
              <View style={style.renderLifetagContent.productName}>
                <Text textStyle="bold" size={Size.text.caption1.size} line={18}>
                  {getLifetagProductDetailResponse?.data?.product?.name}
                </Text>
              </View>
              <View style={style.renderLifetagContent.lineStrikeThroughPrice}>
                {getLifetagProductDetailResponse?.data?.product?.discount ? (
                  <Text
                    style={style.mR7}
                    color={Color.lifetagGreyText[colorScheme].color}
                    textStyle="medium"
                    size={Size.text.caption1.size}
                    line={14.63}
                    textDecorationLine="line-through"
                    textDecorationStyle="solid">
                    {formatNumber(
                      getLifetagProductDetailResponse?.data?.product?.price,
                      lang
                    )}{' '}
                  </Text>
                ) : null}
              </View>
              <View style={style.fS1}>
                <View style={style.renderLifetagContent.productPrice}>
                  <Text
                    textStyle="semi"
                    line={17.07}
                    color={Color.neutralLifeSaver.light.neutral40}>
                    {formatNumber(
                      getLifetagProductDetailResponse?.data?.product?.price -
                        (getLifetagProductDetailResponse?.data?.product
                          ?.discount || 0),
                      lang
                    )}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={style.renderLifetagContent.itemQtyContainer}>
            <Text
              size={Size.text.caption1.size}
              textStyle="medium"
              color={Color.neutralLifeSaver.light.neutral20}>
              {trans(locale, lang, 'jumlah')}
            </Text>
            <View style={style.renderLifetagContent.itemQtyButtonContainer}>
              <TouchableOpacity
                onPress={() => {
                  const list = [...lifetagList];
                  list[index] = {
                    ...element,
                    quantity: element?.quantity > 0 ? element?.quantity - 1 : 0,
                    checked: element?.quantity === 1 ? false : element?.checked,
                  };
                  setLifetagList(list);
                }}
                style={style.renderLifetagContent.itemMinButton}>
                <Text
                  color={Color.neutralLifeSaver.light.neutral40}
                  align="center">
                  -
                </Text>
              </TouchableOpacity>
              <View style={style.renderLifetagContent.itemQtyLabel}>
                <Text
                  align="center"
                  textStyle="medium"
                  color={Color.neutralLifeSaver.light.neutral40}
                  size={Size.text.caption2.size}>
                  {element?.quantity}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  const list = [...lifetagList];
                  list[index] = {
                    ...element,
                    quantity:
                      element?.quantity < element?.stock
                        ? element?.quantity + 1
                        : element?.quantity,
                    checked: element?.quantity === 0 ? true : element?.checked,
                  };
                  setLifetagList(list);
                }}
                style={style.renderLifetagContent.itemPlusButton}>
                <Text color={Color.primary.light.primary90} align="center">
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.renderLifetagContent.itemQtyContainer}>
            <Text
              size={Size.text.caption1.size}
              textStyle="medium"
              color={Color.neutralLifeSaver.light.neutral20}>
              {trans(locale, lang, 'warna')}
            </Text>
            <Text
              size={Size.text.caption1.size}
              textStyle="medium"
              color={Color.neutralLifeSaver.light.neutral20}>
              {trans(locale, lang, element?.name)}
            </Text>
          </View>
          {index !== lifetagList?.length - 1 ? (
            <HorizontalLine height={1} />
          ) : (
            <View style={style.mb16} />
          )}
        </View>
      );
    }
    return null;
  };

  function renderInputPostCode() {
    if (address?.postalCode || address?.selectedAddress?.postcode) {
      return null;
    }
    return (
      <View style={style.mt10}>
        <Input
          label={trans(locale, lang, 'kodepos')}
          onEndEditing={() => {
            if (inputPostCode?.length === 5) {
              onAddPostCode(inputPostCode);
            }
          }}
          value={inputPostCode}
          secondLabel={labelPostCode}
          height={56}
          message={error}
          placeholder={trans(locale, lang, 'masukanKodePos')}
          keyboardType="number-pad"
          maxLength={5}
          onChangeText={(value) => {
            setInputPostCode(value);
          }}
        />
      </View>
    );
  }

  function renderLifetagAddress() {
    const onPress = () => {
      onChangeAddress();
    };
    const item = address?.selectedAddress;

    // Format Address
    const namaJalan = item?.street || '';
    const rt = item?.rt || '';
    const rw = item?.rw || '';
    const kelurahan = item?.subDistrict?.value
      ? formatCapitalizeEachWord(item?.subDistrict?.value || '')
      : formatCapitalizeEachWord(item?.subDistrict || '');
    const kecamatan = item?.district?.value
      ? formatCapitalizeEachWord(item?.district?.value || '')
      : formatCapitalizeEachWord(item?.district || '');
    const kota = item?.city?.value
      ? formatCapitalizeEachWord(item?.city?.value || '')
      : formatCapitalizeEachWord(item?.city || '');
    const provinsi = item?.province?.value
      ? formatCapitalizeEachWord(item?.province?.value || '')
      : formatCapitalizeEachWord(item?.province || '');
    const kodePos = item?.postcode || address?.postalCode || '';
    const textAddress = `${namaJalan}, ${
      rt && rw ? `RT${rt}/RW${rw}` : ''
    }, ${kelurahan}, ${kecamatan}, ${kota}, ${provinsi}, ${kodePos}`
      .replace(/ ,/g, '')
      .trim()
      .replace(/^, /g, '')
      .trim()
      .replace(/,$/g, '');
    if (checkLifeTagHaveChecked) {
      if (getLifetagFlagResponse?.data?.alreadyOrderLifeTag) {
        return null;
      }
      if (getLifetagProductDetailResponse?.data?.product?.stock === 0) {
        return null;
      }
      if (!item) {
        return (
          <View>
            <View style={style.renderLifetagAddress.container}>
              <Text textStyle="semi" line={30.08}>
                {trans(locale, lang, 'alamatPengiriman')}
              </Text>
              <View style={style.renderLifetagAddress.pinLoc}>
                <PinLoc fill={Color.primary[colorScheme].primary90} />
                <Text
                  onPress={onPress}
                  textStyle="medium"
                  line={20}
                  size={Size.text.caption1.size}
                  color={Color.neutralLifeSaver[colorScheme].neutral40}>
                  {' '}
                  {trans(locale, lang, 'pilihAlamatLain')}
                </Text>
              </View>
            </View>
            <Shadow borderRadius={24} style={style.mB32}>
              <TouchableOpacity
                style={style.renderLifetagAddress.addAddressContainer}
                onPress={onPress}>
                <Text
                  style={style.mR7}
                  textStyle="medium"
                  color={Color.primary[colorScheme].primary90}>
                  {trans(locale, lang, 'tambahAlamat')}
                </Text>
                <LifetagRedPlus />
              </TouchableOpacity>
            </Shadow>
          </View>
        );
      }
      return (
        <>
          <View style={style.renderLifetagAddress.container}>
            <Text textStyle="semi" line={30.08}>
              {trans(locale, lang, 'alamatPengiriman')}
            </Text>
            <View style={style.renderLifetagAddress.pinLoc}>
              <PinLoc fill={Color.primary[colorScheme].primary90} />
              <Text
                onPress={onPress}
                textStyle="medium"
                line={20}
                size={Size.text.caption1.size}
                color={Color.neutralLifeSaver[colorScheme].neutral40}>
                {' '}
                {trans(locale, lang, 'pilihAlamatLain')}
              </Text>
            </View>
          </View>
          <Shadow borderRadius={24} style={style.mB32}>
            <View style={style.p16}>
              <Text style={style.mV5} textStyle="semi" line={19.6}>
                {item?.title || trans(locale, lang, 'rumah')}
              </Text>
              <Dash
                style={style.mV5}
                dashGap={0}
                dashThickness={1}
                dashColor={Color.grayIndicator.dark.grayIndicator}
              />
              <View>
                <View style={style.renderLifetagAddress.phoneNumber}>
                  <Text
                    textStyle="semi"
                    line={19.6}
                    color={Color.neutralLifeSaver[colorScheme].neutral40}>
                    {address?.name}
                  </Text>
                  <Text
                    textStyle="semi"
                    size={Size.text.caption2.size}
                    line={16.8}>
                    {address?.phoneNumber}
                  </Text>
                </View>
                <View style={style.renderLifetagAddress.address}>
                  <Text
                    textStyle="semi"
                    size={Size.text.caption2.size}
                    line={16.8}
                    style={style.fS1}
                    align="left">
                    {textAddress}
                  </Text>
                </View>
              </View>
              {renderInputPostCode()}
            </View>
          </Shadow>
          <View>
            <View style={style.row}>
              <Text
                textStyle="medium"
                line={18}
                size={Size.text.caption2.size}
                color={Color.neutralLifeSaver[colorScheme].neutral40}>
                {trans(locale, lang, 'informasi')} :
              </Text>
            </View>
            <View style={[style.mx10, style.row]}>
              <Text
                style={style.mR7}
                textStyle="medium"
                size={Size.text.caption1.size}
                color={Color.neutral[colorScheme].neutral40}>
                {'\u2022'}
              </Text>
              <Text
                textStyle="medium"
                line={18}
                size={Size.text.caption2.size}
                color={Color.neutralLifeSaver[colorScheme].neutral40}>
                {trans(locale, lang, 'estimasi1')}{' '}
                <Text
                  textStyle="semi"
                  size={Size.text.caption2.size}
                  color={Color.neutral[colorScheme].neutral40}>
                  {trans(locale, lang, 'estimasi2')}
                </Text>
                {trans(locale, lang, 'estimasi3')}
              </Text>
            </View>
          </View>
        </>
      );
    }
    return null;
  }

  if (getLifetagProductDetailResponse?.data?.product?.stock === 0) {
    return null;
  }
  return (
    <>
      <Text textStyle="semi">{trans(locale, lang, 'dapatkanLifetag')}</Text>
      <Text
        style={style.mt5}
        textStyle="medium"
        size={Size.text.caption1.size}
        color={Color.neutralLifeSaver.light.neutral40}>
        {trans(locale, lang, 'jadilahLifesaver')}
      </Text>
      <View style={style.renderLifetagContent.cardContainer}>
        {lifetagList.map((element, index) => renderItem(element, index))}
      </View>
      {renderLifetagAddress()}
      <View style={[style.mxMin32, style.my16]}>
        <HorizontalLine
          height={8}
          color={Color.backgroundHome[colorScheme].backgroundHome}
        />
      </View>
    </>
  );
}

LifeTagContent.defaultProps = {
  address: {},
};

LifeTagContent.propTypes = {
  getLifetagFlagResponse: PropTypes.objectOf(Object).isRequired,
  getLifetagProductDetailResponse: PropTypes.objectOf(Array).isRequired,
  colorScheme: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
  onAddPostCode: PropTypes.func.isRequired,
  address: PropTypes.objectOf(Object),
};

export default LifeTagContent;
