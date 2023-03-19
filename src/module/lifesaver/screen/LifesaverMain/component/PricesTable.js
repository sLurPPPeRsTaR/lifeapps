import React, { useCallback, useState, useRef, useMemo } from 'react';
import Text from 'ca-component-generic/Text';
import { View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import LinearGradient from 'react-native-linear-gradient';
import {
  LPShieldFillIcon,
  Information,
  CeklisLifeSaverFalse,
  ChevronRightWhite,
  CoverInActive,
  NotCoverActive,
} from 'ca-config/Svg';
import PropTypes from 'prop-types';
import HorizontalLine from 'ca-component-lifesaver/HorizontalLine';
import { trans } from 'ca-util/trans';
import { PRODUCT } from 'ca-util/constant';
import { formatNumber } from 'ca-util/numbro';
import { FlatList } from 'react-native-gesture-handler';
import { ModalWaitingPeriod, ModalWaitingPeriodSport } from './modal';
import DialogBenefitInformation from './Dialog/DialogBenefitInformation';
import DialogWaterSportList from './Dialog/DialogWaterSportList';
import style from '../style';
import locale from '../locale';

function PricesTableV2(props) {
  const { onLayout, lang, selectedPackage, setSelectedPackage, isEligiblePos } =
    props;
  const [benefitVisible, setBenefitVisible] = useState(false);
  const [waterSportVisible, setWaterSportVisible] = useState(false);
  const [dialogMedWait, setDialogMedWait] = useState(false);
  const [dialogSportWait, setDialogSportWait] = useState(false);
  const [nextVisible, setNextVisible] = useState(true);

  const getProductTotal = useMemo(() => {
    const defaultTotalProduct = 2;
    const lifesaverLite = isEligiblePos ? 1 : 0;

    return defaultTotalProduct + lifesaverLite;
  }, [isEligiblePos]);

  const tableRef = useRef();

  const getWidthProduct = useCallback(
    (screenWidth) => {
      const productTotal = getProductTotal;
      const productWidth = getProductTotal === 3 ? 130 : 100;
      const benefitWidth = 150;
      if (screenWidth - benefitWidth - productTotal * productWidth > 0) {
        const getWidth = (screenWidth - benefitWidth) / productTotal;
        return {
          width: getWidth,
        };
      }
      return {
        width: productWidth,
      };
    },
    [getProductTotal]
  );

  function textRed(text) {
    return (
      <Text
        textStyle="semi"
        // line={30}
        color={Color.primary.light.primary60}
        size={Size.text.body2.size}>
        {text}
      </Text>
    );
  }

  const PromoIcon = useCallback(() => {
    return (
      <View style={style.promoIcon.container}>
        <Text
          textStyle="medium"
          size={Size.text.caption2.size}
          color={Color.main.light.white}>
          {trans(locale, lang, 'Promo')}
        </Text>
      </View>
    );
  }, [lang]);

  const InfoButton = useCallback(({ onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={style.infoButton.container}>
        <Information width={20} height={20} />
      </TouchableOpacity>
    );
  }, []);

  const HeaderTable = useCallback(() => {
    return <View style={style.w150} />;
  }, []);

  const getNotCoverImage = (selected) => {
    if (selected) {
      return <NotCoverActive />;
    }
    return <CeklisLifeSaverFalse />;
  };

  const getCoverImage = (selected) => {
    if (selected) {
      return <LPShieldFillIcon />;
    }
    return <CoverInActive />;
  };

  const BenefitRow = useCallback(() => {
    return (
      <View style={style.table.benefitContainer}>
        <View style={style.table.benefitHeader}>
          <View style={style.flexRow}>
            <Text
              style={style.fx1}
              textStyle="semi"
              size={Size.text.caption1.size}>
              {trans(locale, lang, 'manfaatUtama2')}
            </Text>
            <InfoButton onPress={() => setBenefitVisible(true)} />
          </View>
        </View>
        <View>
          <HorizontalLine
            color={Color.neutral.light.neutral20}
            marginDisabled
            height={1}
          />
        </View>
        <View style={style.table.horizontalLine}>
          <HorizontalLine marginDisabled height={1} />
        </View>

        <View style={style.table.benefitItem}>
          <View style={style.flexRow}>
            <Text
              textStyle="medium"
              style={style.fx1}
              size={Size.text.caption1.size}>
              {trans(locale, lang, 'ProteksiMedisKecelakaan')}
            </Text>
            <InfoButton onPress={() => setDialogMedWait(true)} />
          </View>
        </View>
        <View>
          <HorizontalLine
            color={Color.neutral.light.neutral20}
            marginDisabled
            height={1}
          />
        </View>
        <View style={style.table.horizontalLine}>
          <HorizontalLine marginDisabled height={1} />
        </View>

        <View style={style.table.benefitItem}>
          <Text
            textStyle="medium"
            style={style.mr5}
            size={Size.text.caption1.size}>
            {trans(locale, lang, 'MeninggalCacat')}
          </Text>
        </View>
        <View>
          <HorizontalLine
            color={Color.neutral.light.neutral20}
            marginDisabled
            height={1}
          />
        </View>
        <View style={style.table.horizontalLine}>
          <HorizontalLine marginDisabled height={1} />
        </View>

        <View style={style.table.benefitItem}>
          <View style={style.flexRow}>
            <Text
              textStyle="medium"
              style={style.fx1}
              size={Size.text.caption1.size}>
              {trans(locale, lang, 'KecelakaanOlahragaAir')}
            </Text>
            <InfoButton onPress={() => setWaterSportVisible(true)} />
          </View>
        </View>
        <View>
          <HorizontalLine
            color={Color.neutral.light.neutral20}
            marginDisabled
            height={1}
          />
        </View>
        <View style={style.table.horizontalLine}>
          <HorizontalLine marginDisabled height={1} />
        </View>

        <View style={style.table.benefitItem}>
          <View style={style.flexRow}>
            <Text
              style={style.fx1}
              textStyle="semi"
              size={Size.text.caption1.size}>
              {trans(locale, lang, 'ManfaatPilihan2')}
              {textRed('*')}
            </Text>
            {/* <InfoButton onPress={() => setBenefitVisible(true)} /> */}
          </View>
        </View>
        <View>
          <HorizontalLine
            color={Color.neutral.light.neutral20}
            marginDisabled
            height={1}
          />
        </View>
        <View style={style.table.horizontalLine}>
          <HorizontalLine marginDisabled height={1} />
        </View>

        <View style={style.table.benefitItem}>
          <PromoIcon />
          <Text textStyle="medium" size={Size.text.caption1.size}>
            {trans(locale, lang, 'fisioterapi')}
          </Text>
        </View>
        <View>
          <HorizontalLine
            color={Color.neutral.light.neutral20}
            marginDisabled
            height={1}
          />
        </View>
        <View style={style.table.horizontalLine}>
          <HorizontalLine marginDisabled height={1} />
        </View>

        <View style={[style.table.benefitItem, style.minH75]}>
          <PromoIcon />
          <View style={style.flexRow}>
            <Text
              textStyle="medium"
              style={style.fx1}
              size={Size.text.caption1.size}>
              {trans(locale, lang, 'proteksiMedisCedera')}
            </Text>
            <InfoButton onPress={() => setDialogSportWait(true)} />
          </View>
        </View>
        <View>
          <HorizontalLine
            color={Color.neutral.light.neutral20}
            marginDisabled
            height={1}
          />
        </View>
        <View style={style.table.horizontalLine}>
          <HorizontalLine marginDisabled height={1} />
        </View>

        <View style={style.table.benefitItem}>
          <PromoIcon />
          <Text size={Size.text.caption1.size} textStyle="medium">
            {trans(locale, lang, 'Ambulans')}
          </Text>
        </View>
        <View>
          <HorizontalLine
            color={Color.neutral.light.neutral20}
            marginDisabled
            height={1}
          />
        </View>
        <View style={style.table.horizontalLine}>
          <HorizontalLine marginDisabled height={1} />
        </View>
      </View>
    );
  }, [lang]);

  const LifeSaverLiteRow = useCallback(() => {
    if (!isEligiblePos) {
      return null;
    }
    const onSelected = selectedPackage === PRODUCT.LIFESAVER.LIFESAVER_POS;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          tableRef.current.scrollToOffset({ viewPosition: 0.5, index: 0 });
          setSelectedPackage(PRODUCT.LIFESAVER.LIFESAVER_POS);
        }}>
        <View
          style={
            onSelected
              ? [
                  style.table.selectedContainer,
                  getWidthProduct(Size.screen.width),
                ]
              : getWidthProduct(Size.screen.width)
          }>
          <LinearGradient
            style={[style.table.regItemHeader]}
            useAngle
            angle={175}
            colors={
              onSelected
                ? style.table.selectedHeaderActive
                : style.table.selectedHeader
            }>
            <View flexDirection="row">
              <Text
                textStyle="bold"
                align="center"
                line={20}
                color={
                  onSelected ? Color.main.light.white : Color.red.light.red90
                }
                size={Size.text.body2.size}>
                Life
                <Text
                  textStyle="boldItalic"
                  line={20}
                  color={
                    onSelected ? Color.main.light.white : Color.red.light.red90
                  }
                  size={Size.text.body2.size}>
                  SAVER
                </Text>{' '}
                POS
              </Text>
            </View>
            <Text
              line={20}
              textStyle="bold"
              color={
                onSelected ? Color.main.light.white : Color.red.light.red90
              }
              size={Size.text.body2.size}>
              {formatNumber(35000, lang, true, false)}/
              {trans(locale, lang, 'bulan')}
            </Text>
          </LinearGradient>
          <View borderRadius={0} style={style.fx1}>
            <View style={style.table.regItem}>
              <Text
                textStyle="semi"
                line={20}
                color={
                  onSelected
                    ? Color.primary.light.primary80
                    : Color.neutral.light.neutral40
                }
                size={Size.text.body2.size}>
                {formatNumber(100000000, lang, true, false)}
              </Text>
              <Text
                textStyle="semi"
                color={
                  onSelected
                    ? Color.primary.light.primary80
                    : Color.neutral.light.neutral40
                }
                size={Size.text.caption2.size}>
                {trans(locale, lang, 'Cashless')}
              </Text>
            </View>
            <View style={style.table.regItem}>
              <Text
                textStyle="semi"
                line={20}
                color={
                  onSelected
                    ? Color.primary.light.primary80
                    : Color.neutral.light.neutral40
                }
                size={Size.text.body2.size}>
                {formatNumber(15000000, lang, true, false)}
              </Text>
            </View>
            <View style={style.table.regItem}>
              {getNotCoverImage(onSelected)}
            </View>
            <View style={style.table.regItem}>{/* empty */}</View>
            <View style={style.table.regItem}>
              <Text
                textStyle="semi"
                line={20}
                color={
                  onSelected
                    ? Color.primary.light.primary80
                    : Color.neutral.light.neutral40
                }
                size={Size.text.body2.size}>
                {formatNumber(7500000, lang, true, false, 1)}
              </Text>
              <Text
                textStyle="semi"
                color={
                  onSelected
                    ? Color.primary.light.primary80
                    : Color.neutral.light.neutral40
                }
                size={Size.text.caption2.size}>
                {trans(locale, lang, 'Cashless')}
              </Text>
            </View>
            <View style={[style.table.regItem, style.minH75]}>
              <Text
                textStyle="semi"
                line={20}
                color={
                  onSelected
                    ? Color.primary.light.primary80
                    : Color.neutral.light.neutral40
                }
                size={Size.text.body2.size}>
                {formatNumber(12500000, lang, true, false, 1)}
              </Text>
              <Text
                textStyle="semi"
                color={
                  onSelected
                    ? Color.primary.light.primary80
                    : Color.neutral.light.neutral40
                }
                size={Size.text.caption2.size}>
                {trans(locale, lang, 'Cashless')}
              </Text>
            </View>
            <View style={[style.table.regItem]}>
              {getCoverImage(onSelected)}
            </View>
          </View>
          <LinearGradient
            style={style.table.regItemFooter}
            useAngle
            angle={175}
            colors={
              onSelected
                ? style.table.selectedHeaderActive
                : style.table.selectedHeader
            }>
            <View flexDirection="row">
              <Text
                textStyle="bold"
                align="center"
                line={20}
                color={
                  onSelected ? Color.main.light.white : Color.red.light.red90
                }
                size={Size.text.body2.size}>
                Life
                <Text
                  textStyle="boldItalic"
                  line={20}
                  color={
                    onSelected ? Color.main.light.white : Color.red.light.red90
                  }
                  size={Size.text.body2.size}>
                  SAVER
                </Text>{' '}
                POS
              </Text>
            </View>
            <Text
              line={20}
              textStyle="bold"
              color={
                onSelected ? Color.main.light.white : Color.red.light.red90
              }
              size={Size.text.body2.size}>
              {formatNumber(35000, lang, true, false)}/
              {trans(locale, lang, 'bulan')}
            </Text>
          </LinearGradient>
        </View>
      </TouchableWithoutFeedback>
    );
  }, [
    getWidthProduct,
    isEligiblePos,
    lang,
    selectedPackage,
    setSelectedPackage,
  ]);

  const LifeSaverRow = useCallback(() => {
    const onSelected = selectedPackage === PRODUCT.LIFESAVER.LIFESAVER;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          tableRef.current.scrollToOffset({ offset: 130, animated: true });
          setSelectedPackage(PRODUCT.LIFESAVER.LIFESAVER);
        }}>
        <View
          style={
            onSelected
              ? [
                  style.table.selectedContainer,
                  getWidthProduct(Size.screen.width),
                ]
              : getWidthProduct(Size.screen.width)
          }>
          <LinearGradient
            style={[style.table.regItemHeader]}
            useAngle
            angle={175}
            colors={
              onSelected
                ? style.table.selectedHeaderActive
                : style.table.selectedHeader
            }>
            <View flexDirection="row">
              <Text
                textStyle="bold"
                line={20}
                color={
                  onSelected ? Color.main.light.white : Color.red.light.red90
                }
                size={Size.text.body2.size}>
                Life
                <Text
                  textStyle="boldItalic"
                  line={20}
                  color={
                    onSelected ? Color.main.light.white : Color.red.light.red90
                  }
                  size={Size.text.body2.size}>
                  SAVER
                </Text>
              </Text>
            </View>
            <Text
              line={20}
              textStyle="bold"
              color={
                onSelected ? Color.main.light.white : Color.red.light.red90
              }
              size={Size.text.body2.size}>
              {formatNumber(49000, lang, true, false)}/
              {trans(locale, lang, 'bulan')}
            </Text>
          </LinearGradient>
          <View borderRadius={0} style={style.fx1}>
            <View style={style.table.regItem}>
              <Text
                textStyle="semi"
                line={20}
                color={
                  onSelected
                    ? Color.primary.light.primary80
                    : Color.neutral.light.neutral40
                }
                size={Size.text.body2.size}>
                {formatNumber(200000000, lang, true, false)}
              </Text>
              <Text
                textStyle="semi"
                color={
                  onSelected
                    ? Color.primary.light.primary80
                    : Color.neutral.light.neutral40
                }
                size={Size.text.caption2.size}>
                {trans(locale, lang, 'Cashless')}
              </Text>
            </View>
            <View style={style.table.regItem}>
              <Text
                textStyle="semi"
                line={20}
                color={
                  onSelected
                    ? Color.primary.light.primary80
                    : Color.neutral.light.neutral40
                }
                size={Size.text.body2.size}>
                {formatNumber(20000000, lang, true, false)}
              </Text>
            </View>
            <View style={style.table.regItem}>
              {getNotCoverImage(onSelected)}
            </View>
            <View style={style.table.regItem}>{/* empty */}</View>
            <View style={style.table.regItem}>
              <Text
                textStyle="semi"
                line={20}
                color={
                  onSelected
                    ? Color.primary.light.primary80
                    : Color.neutral.light.neutral40
                }
                size={Size.text.body2.size}>
                {formatNumber(10000000, lang, true, false)}
              </Text>
              <Text
                textStyle="semi"
                color={
                  onSelected
                    ? Color.primary.light.primary80
                    : Color.neutral.light.neutral40
                }
                size={Size.text.caption2.size}>
                {trans(locale, lang, 'Cashless')}
              </Text>
            </View>
            <View style={[style.table.regItem, style.minH75]}>
              <Text
                textStyle="semi"
                line={20}
                color={
                  onSelected
                    ? Color.primary.light.primary80
                    : Color.neutral.light.neutral40
                }
                size={Size.text.body2.size}>
                {formatNumber(20000000, lang, true, false)}
              </Text>
              <Text
                textStyle="semi"
                color={
                  onSelected
                    ? Color.primary.light.primary80
                    : Color.neutral.light.neutral40
                }
                size={Size.text.caption2.size}>
                {trans(locale, lang, 'Cashless')}
              </Text>
            </View>
            <View style={[style.table.regItem]}>
              {getCoverImage(onSelected)}
            </View>
          </View>
          <LinearGradient
            style={style.table.regItemFooter}
            useAngle
            angle={175}
            colors={
              onSelected
                ? style.table.selectedHeaderActive
                : style.table.selectedHeader
            }>
            <View flexDirection="row">
              <Text
                textStyle="bold"
                line={20}
                color={
                  onSelected ? Color.main.light.white : Color.red.light.red90
                }
                size={Size.text.body2.size}>
                Life
                <Text
                  textStyle="boldItalic"
                  line={20}
                  color={
                    onSelected ? Color.main.light.white : Color.red.light.red90
                  }
                  size={Size.text.body2.size}>
                  SAVER
                </Text>
              </Text>
            </View>
            <Text
              line={20}
              textStyle="bold"
              color={
                onSelected ? Color.main.light.white : Color.red.light.red90
              }
              size={Size.text.body2.size}>
              {formatNumber(49000, lang, true, false)}/
              {trans(locale, lang, 'bulan')}
            </Text>
          </LinearGradient>
        </View>
      </TouchableWithoutFeedback>
    );
  }, [getWidthProduct, lang, selectedPackage, setSelectedPackage]);

  const LifeSaverPlusRow = useCallback(() => {
    const onSelected = selectedPackage === PRODUCT.LIFESAVER.LIFESAVER_PLUS;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          tableRef.current.scrollToEnd();
          setSelectedPackage(PRODUCT.LIFESAVER.LIFESAVER_PLUS);
        }}>
        <View
          style={
            onSelected
              ? [
                  style.table.selectedContainer,
                  getWidthProduct(Size.screen.width),
                ]
              : getWidthProduct(Size.screen.width)
          }>
          <LinearGradient
            style={[style.table.regItemHeader]}
            useAngle
            angle={175}
            colors={
              onSelected
                ? style.table.selectedHeaderActive
                : style.table.selectedHeader
            }>
            <Text
              textStyle="bold"
              line={20}
              color={
                onSelected ? Color.main.light.white : Color.red.light.red90
              }
              size={Size.text.body2.size}>
              Life
              <Text
                textStyle="boldItalic"
                line={20}
                color={
                  onSelected ? Color.main.light.white : Color.red.light.red90
                }
                size={Size.text.body2.size}>
                SAVER+
              </Text>
            </Text>
            <Text
              textStyle="bold"
              line={20}
              color={
                onSelected ? Color.main.light.white : Color.red.light.red90
              }
              size={Size.text.body2.size}>
              {formatNumber(99000, lang, true, false)}/
              {trans(locale, lang, 'bulan')}
            </Text>
          </LinearGradient>
          <View borderRadius={0} style={style.fx1}>
            <View style={style.table.regItem}>
              <Text
                textStyle="semi"
                line={20}
                color={
                  onSelected
                    ? Color.primary.light.primary80
                    : Color.neutral.light.neutral40
                }
                size={Size.text.body2.size}>
                {formatNumber(400000000, lang, true, false)}
              </Text>
              <Text
                textStyle="semi"
                color={
                  onSelected
                    ? Color.primary.light.primary80
                    : Color.neutral.light.neutral40
                }
                size={Size.text.caption2.size}>
                {trans(locale, lang, 'Cashless')}
              </Text>
            </View>
            <View style={style.table.regItem}>
              <Text
                textStyle="semi"
                line={20}
                color={
                  onSelected
                    ? Color.primary.light.primary80
                    : Color.neutral.light.neutral40
                }
                size={Size.text.body2.size}>
                {formatNumber(40000000, lang, true, false)}
              </Text>
            </View>
            <View style={style.table.regItem}>{getCoverImage(onSelected)}</View>
            <View style={style.table.regItem}>{/* empty */}</View>
            <View style={style.table.regItem}>
              <Text
                textStyle="semi"
                line={20}
                color={
                  onSelected
                    ? Color.primary.light.primary80
                    : Color.neutral.light.neutral40
                }
                size={Size.text.body2.size}>
                {formatNumber(10000000, lang, true, false)}
              </Text>
              <Text
                textStyle="semi"
                color={
                  onSelected
                    ? Color.primary.light.primary80
                    : Color.neutral.light.neutral40
                }
                size={Size.text.caption2.size}>
                {trans(locale, lang, 'Cashless')}
              </Text>
            </View>
            <View style={[style.table.regItem, style.minH75]}>
              <Text
                textStyle="semi"
                line={20}
                color={
                  onSelected
                    ? Color.primary.light.primary80
                    : Color.neutral.light.neutral40
                }
                size={Size.text.body2.size}>
                {formatNumber(20000000, lang, true, false)}
              </Text>
              <Text
                textStyle="semi"
                color={
                  onSelected
                    ? Color.primary.light.primary80
                    : Color.neutral.light.neutral40
                }
                size={Size.text.caption2.size}>
                {trans(locale, lang, 'Cashless')}
              </Text>
            </View>
            <View style={[style.table.regItem]}>
              {getCoverImage(onSelected)}
            </View>
          </View>
          <LinearGradient
            style={style.table.regItemFooter}
            useAngle
            angle={175}
            colors={
              onSelected
                ? style.table.selectedHeaderActive
                : style.table.selectedHeader
            }>
            <Text
              textStyle="bold"
              line={20}
              color={
                onSelected ? Color.main.light.white : Color.red.light.red90
              }
              size={Size.text.body2.size}>
              Life
              <Text
                textStyle="boldItalic"
                line={20}
                color={
                  onSelected ? Color.main.light.white : Color.red.light.red90
                }
                size={Size.text.body2.size}>
                SAVER+
              </Text>
            </Text>
            <Text
              line={20}
              textStyle="bold"
              color={
                onSelected ? Color.main.light.white : Color.red.light.red90
              }
              size={Size.text.body2.size}>
              {formatNumber(99000, lang, true, false)}/
              {trans(locale, lang, 'bulan')}
            </Text>
          </LinearGradient>
        </View>
      </TouchableWithoutFeedback>
    );
  }, [getWidthProduct, lang, selectedPackage, setSelectedPackage]);

  const LifeSaverProRow = useCallback(() => {
    const onSelected = selectedPackage === PRODUCT.LIFESAVER.LIFESAVER_PRO;
    return (
      <TouchableWithoutFeedback
        onPress={() => setSelectedPackage(PRODUCT.LIFESAVER.LIFESAVER_PRO)}>
        <View
          style={
            onSelected
              ? [
                  style.table.selectedContainer,
                  getWidthProduct(Size.screen.width),
                ]
              : getWidthProduct(Size.screen.width)
          }>
          <LinearGradient
            style={[style.table.regItemHeader]}
            useAngle
            angle={175}
            colors={
              onSelected
                ? style.table.selectedHeaderActive
                : style.table.selectedHeader
            }>
            <Text
              textStyle="bold"
              line={20}
              color={
                onSelected ? Color.main.light.white : Color.red.light.red90
              }
              size={Size.text.body2.size}>
              Pro
            </Text>
            <Text
              line={20}
              color={
                onSelected ? Color.main.light.white : Color.red.light.red90
              }
              size={Size.text.body2.size}>
              {formatNumber(198000, lang, true, false)}
            </Text>
          </LinearGradient>
          <View borderRadius={0} style={style.fx1}>
            <View style={style.table.regItem}>
              <Text
                textStyle="semi"
                line={20}
                color={Color.neutral.light.neutral90}
                size={Size.text.body2.size}>
                800 {trans(locale, lang, 'jt')}
              </Text>
              <Text
                textStyle="semi"
                color={Color.neutral.light.neutral40}
                size={Size.text.caption2.size}>
                {trans(locale, lang, 'Cashless')}
              </Text>
            </View>
            <View style={style.table.regItem}>
              <Text
                textStyle="semi"
                line={20}
                color={Color.neutral.light.neutral90}
                size={Size.text.body2.size}>
                {formatNumber(80000000, lang, true, false)}
              </Text>
            </View>
            <View style={style.table.regItem}>{getCoverImage(onSelected)}</View>
            <View style={style.table.regItem}>{/* empty */}</View>
            <View style={style.table.regItem}>
              <Text
                textStyle="semi"
                line={20}
                color={Color.neutral.light.neutral90}
                size={Size.text.body2.size}>
                {formatNumber(20000000, lang, true, false)}
              </Text>
              <Text
                textStyle="semi"
                color={Color.neutral.light.neutral40}
                size={Size.text.caption2.size}>
                {trans(locale, lang, 'Cashless')}
              </Text>
            </View>
            <View style={style.table.regItem}>
              <Text
                textStyle="semi"
                line={20}
                color={Color.neutral.light.neutral90}
                size={Size.text.body2.size}>
                {trans(locale, lang, 'rp20jt')}
              </Text>
              <Text
                textStyle="semi"
                color={Color.neutral.light.neutral40}
                size={Size.text.caption2.size}>
                {trans(locale, lang, 'Cashless')}
              </Text>
            </View>
            <View style={[style.table.regItem, style.h108]}>
              {getCoverImage(onSelected)}
            </View>
          </View>
          <LinearGradient
            style={style.table.regItemFooter}
            useAngle
            angle={175}
            colors={
              onSelected
                ? style.table.selectedHeaderActive
                : style.table.selectedHeader
            }>
            <Text
              textStyle="bold"
              line={20}
              color={
                onSelected ? Color.main.light.white : Color.red.light.red90
              }
              size={Size.text.body2.size}>
              Pro
            </Text>
            <Text
              line={20}
              color={
                onSelected ? Color.main.light.white : Color.red.light.red90
              }
              size={Size.text.body2.size}>
              {formatNumber(198000, lang, true, false)}
            </Text>
          </LinearGradient>
        </View>
      </TouchableWithoutFeedback>
    );
  }, [getWidthProduct, lang, selectedPackage, setSelectedPackage]);

  const renderTabel = [
    {
      key: 1,
      render: HeaderTable(),
    },
    {
      key: 2,
      render: LifeSaverLiteRow(),
    },
    {
      key: 3,
      render: LifeSaverRow(),
    },
    {
      key: 4,
      render: LifeSaverPlusRow(),
    },
  ];

  return (
    <View onLayout={onLayout}>
      <View style={style.mt20}>
        <Text
          textStyle="semi"
          size={Size.text.body1.size}
          line={23.8}
          align="center">
          {trans(locale, lang, 'pilihProteksi')}
        </Text>
      </View>

      <View style={style.table.container}>
        {BenefitRow()}
        <View style={style.table.productContainer}>
          {nextVisible && getWidthProduct(Size.screen.width).width === 130 ? (
            <TouchableWithoutFeedback
              onPress={() => {
                tableRef.current.scrollToEnd();
                setSelectedPackage(PRODUCT.LIFESAVER.LIFESAVER_PLUS);
              }}>
              <View style={style.table.chevronRightContainer}>
                <ChevronRightWhite />
              </View>
            </TouchableWithoutFeedback>
          ) : null}
        </View>
        <FlatList
          ref={tableRef}
          onScroll={(e) => {
            if (e.nativeEvent.contentOffset.x === 0 && !nextVisible) {
              setNextVisible(true);
            }
          }}
          onEndReached={() => {
            setNextVisible(false);
          }}
          horizontal
          stickyHeaderIndices={[0]}
          style={style.table.flatList}
          showsHorizontalScrollIndicator
          data={renderTabel}
          renderItem={({ item }) => {
            return item?.render;
          }}
          keyExtractor={(render) => render?.key}
        />
      </View>

      <DialogBenefitInformation
        {...props}
        isVisible={benefitVisible}
        onRequestClose={() => setBenefitVisible(false)}
        onClosePress={() => setBenefitVisible(false)}
      />
      <DialogWaterSportList
        {...props}
        isVisible={waterSportVisible}
        onRequestClose={() => setWaterSportVisible(false)}
        onClosePress={() => setWaterSportVisible(false)}
      />
      <ModalWaitingPeriod
        isVisible={dialogMedWait}
        onRequestClose={() => setDialogMedWait(false)}
        onClosePress={() => setDialogMedWait(false)}
        {...props}
      />
      <ModalWaitingPeriodSport
        isVisible={dialogSportWait}
        onRequestClose={() => setDialogSportWait(false)}
        onClosePress={() => setDialogSportWait(false)}
        {...props}
      />
    </View>
  );
}

export default PricesTableV2;

PricesTableV2.defaultProps = {
  onLayout: () => {},
};

PricesTableV2.propTypes = {
  lang: PropTypes.string.isRequired,
  onLayout: PropTypes.func,
  selectedPackage: PropTypes.string.isRequired,
  setSelectedPackage: PropTypes.func.isRequired,
  isEligiblePos: PropTypes.bool.isRequired,
};
