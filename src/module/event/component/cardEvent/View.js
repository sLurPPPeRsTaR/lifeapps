import React, { memo } from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import moment from 'moment/min/moment-with-locales';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import Shadow from 'ca-component-container/Shadow';
import { trans } from 'ca-util/trans';
import Button from 'ca-component-generic/Button';
import {
  Calendar,
  LilGrayCircle,
  PinLoc,
  SmallClock,
  RoundedHeart,
  RoundedHeartActive,
} from 'ca-config/Svg';
import { formatCurrency } from 'ca-util/numbro';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import locale from './locale';
import style from './style';

function CardEvent(props) {
  const {
    lang,
    onPress,
    onPressWatchlist,
    width,
    data,
    isTicket,
    isShowTime,
    isMyTicket,
  } = props;
  moment.locale(lang);

  if (isTicket) {
    const { banner, closed, name, startDateTime, endDateTime, location } =
      data?.event;
    const bannerUrl = banner?.filter((val) => val?.position === 2);
    return (
      <Shadow animated borderRadius={30} style={[style.mV16, style.mR12]}>
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={[style.renderisTicket.container, { width }]}>
            <Image
              source={{
                uri: bannerUrl?.[0]?.url,
              }}
              style={style.renderisTicket.imgSize}
              resizeMode="stretch"
            />
            {closed && <View style={style.renderisTicket.imgBgGrey} />}
            <View>
              <Text
                style={style.renderisTicket.eventTitleContainer}
                textStyle="semi"
                size={Size.text.body2.size}
                line={21}
                letterSpacing={0.5}
                color={
                  !closed
                    ? Color.neutral.light.neutral90
                    : Color.neutral.light.neutral10
                }>
                {name}
              </Text>
              <View style={style.renderisTicket.calenderTextContainer}>
                <Calendar
                  style={style.mR5}
                  width={16}
                  height={16}
                  fill={
                    !closed
                      ? Color.primary.light.primary90
                      : Color.neutral.light.neutral10
                  }
                />
                <Text
                  align="center"
                  textStyle="regular"
                  size={Size.text.caption1.size}
                  letterSpacing={0.5}
                  color={Color.neutral.light.neutral10}>
                  {moment(startDateTime).format('DD MMM YYYY')}
                </Text>
                {isShowTime && (
                  <>
                    <SmallClock
                      fill={Color.primary.light.primary90}
                      style={style.mL5}
                    />
                    <Text
                      style={style.mL5}
                      align="center"
                      textStyle="regular"
                      size={Size.text.caption1.size}
                      letterSpacing={0.5}
                      color={Color.neutral.light.neutral10}>
                      {moment(startDateTime).format('HH:mm')} -{' '}
                      {moment(endDateTime).format('HH:mm')}
                    </Text>
                  </>
                )}
              </View>
              <View style={style.renderisTicket.eventEndContainer}>
                <View style={style.renderisTicket.locationTextContainer}>
                  <PinLoc
                    style={style.mR5}
                    width={16}
                    height={16}
                    fill={
                      !closed
                        ? Color.primary.light.primary90
                        : Color.neutral.light.neutral10
                    }
                  />
                  <Text
                    textStyle="regular"
                    size={Size.text.caption1.size}
                    line={15}
                    letterSpacing={0.5}
                    color={Color.neutral.light.neutral10}>
                    {location?.city}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Shadow>
    );
  }

  if (isMyTicket) {
    const { banner, closed, name, startDateTime, endDateTime, location } =
      data?.event;
    const isSameDay = moment(startDateTime).isSame(endDateTime, 'day');
    const bannerUrl = banner?.filter((val) => val?.position === 2);
    return (
      <Shadow animated borderRadius={30} style={[style.mV16, style.mR12]}>
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={style.renderisMyTicket.container}>
            <Image
              source={{
                uri: bannerUrl?.[0]?.url,
              }}
              style={style.renderisTicket.imgSize}
              resizeMode="stretch"
            />
            {closed && <View style={style.renderisMyTicket.imgBgGrey} />}
            <View>
              <Text
                style={style.renderisMyTicket.eventTitleContainer}
                textStyle="semi"
                size={Size.text.body2.size}
                line={21}
                letterSpacing={0.5}
                color={
                  !closed
                    ? Color.neutral.light.neutral90
                    : Color.neutral.light.neutral10
                }>
                {name}
              </Text>
              <View style={style.renderisMyTicket.calenderTextContainer}>
                <Calendar
                  style={style.mR5}
                  width={16}
                  height={16}
                  fill={
                    !closed
                      ? Color.primary.light.primary90
                      : Color.neutral.light.neutral10
                  }
                />
                <Text
                  style={style.mR5}
                  align="center"
                  textStyle="regular"
                  size={Size.text.caption1.size}
                  letterSpacing={0.5}
                  color={Color.neutral.light.neutral10}>
                  {isSameDay
                    ? moment(startDateTime).format('DD MMM YYYY')
                    : `${moment(startDateTime).format('DD')}-${moment(
                        endDateTime
                      ).format('DD MMM YYYY')}`}
                </Text>
                <View style={style.renderisMyTicket.containerCity}>
                  <LilGrayCircle width={5} height={5} style={style.mR5} />
                  <Text
                    textStyle="regular"
                    size={Size.text.caption1.size}
                    line={15}
                    letterSpacing={0.5}
                    color={!closed && Color.neutral.light.neutral10}>
                    {location?.city}
                  </Text>
                </View>
              </View>
              <View style={style.renderisMyTicket.eventEndContainer}>
                <View style={style.renderisMyTicket.locationTextContainer}>
                  {isShowTime && (
                    <>
                      <SmallClock
                        style={style.mR5}
                        fill={
                          !closed
                            ? Color.primary.light.primary90
                            : Color.neutral.light.neutral10
                        }
                      />
                      <Text
                        align="center"
                        textStyle="regular"
                        size={Size.text.caption1.size}
                        letterSpacing={0.5}
                        color={Color.neutral.light.neutral10}>
                        {moment(startDateTime).format('HH:mm')} -{' '}
                        {moment(endDateTime).format('HH:mm')}
                      </Text>
                    </>
                  )}
                </View>
                <Text
                  textStyle="medium"
                  size={Size.text.caption2.size}
                  line={20.4}
                  textDecorationLine="underline"
                  letterSpacing={0.5}
                  style={style.mR15}
                  color={
                    !closed
                      ? Color.primary.light.primary90
                      : Color.neutral.light.neutral10
                  }>
                  {trans(locale, lang, 'lihatTiket')}
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Shadow>
    );
  }
  const {
    banner,
    closed,
    name,
    startDateTime,
    endDateTime,
    location,
    watchlist,
    alreadyBought,
    quotaEvent,
    userRegistered,
    type,
    price,
  } = data;
  const remainingQuota = quotaEvent - userRegistered || 0;
  const isSameDay = moment(startDateTime).isSame(endDateTime, 'day');
  const bannerUrl = banner?.filter((val) => val?.position === 3);
  return (
    <Shadow borderRadius={30} style={style.mV16}>
      <View
        style={[
          style.renderHeader.containerCard,
          // eslint-disable-next-line react-native/no-inline-styles
          { height: closed ? 280 : 260 },
        ]}>
        <TouchableOpacity
          onPress={onPress}
          style={style.renderHeader.floatingCard}>
          <View style={style.renderHeader.imgSizeCover}>
            <Image
              source={{
                uri: bannerUrl[0]?.url,
              }}
              style={style.renderHeader.imgSizeCover}
              resizeMode="cover"
            />
          </View>

          <View style={style.renderHeader.containerDate}>
            <Text
              align="center"
              textStyle="bold"
              size={Size.text.caption1.size}
              letterSpacing={0.5}
              color={
                !closed
                  ? Color.neutral.light.neutral90
                  : Color.neutral.light.neutral10
              }>
              {isSameDay
                ? moment(startDateTime).format('DD')
                : `${moment(startDateTime).format('DD')}-${moment(
                    endDateTime
                  ).format('DD')}`}
            </Text>
            <Text
              align="center"
              textStyle="medium"
              size={Size.text.caption1.size}
              letterSpacing={0.5}
              color={
                !closed
                  ? Color.neutral.light.neutral90
                  : Color.neutral.light.neutral10
              }>
              {moment(startDateTime).format('MMM')}
            </Text>
          </View>
          {!closed && (
            <View>
              {type !== 'EXTERNAL' && (
                <View style={style.renderHeader.containerTicket}>
                  {lang === 'id' ? (
                    <>
                      <Text
                        color={Color.limitedEventColor.light.color}
                        textStyle="semi"
                        size={Size.text.caption1.size}
                        letterSpacing={0.5}
                        line={16}>
                        {trans(locale, lang, 'tersisa')}{' '}
                        {remainingQuota <= 0 ? 0 : quotaEvent - userRegistered}{' '}
                      </Text>
                      <Text
                        color={Color.limitedEventColor.light.color}
                        textStyle="semi"
                        size={Size.text.caption1.size}
                        letterSpacing={0.5}
                        line={16}>
                        {trans(locale, lang, 'tiket')}
                      </Text>
                    </>
                  ) : (
                    <Text
                      color={Color.limitedEventColor.light.color}
                      textStyle="semi"
                      size={Size.text.caption1.size}
                      letterSpacing={0.5}
                      line={16}>
                      {quotaEvent - userRegistered}{' '}
                      {trans(locale, lang, 'tiket')}{' '}
                      {trans(locale, lang, 'tersisa')}
                    </Text>
                  )}
                </View>
              )}
            </View>
          )}
        </TouchableOpacity>
        <View style={style.viewItem}>
          <View>
            <View style={style.mT24}>
              <Text
                textStyle="semi"
                size={Size.text.body2.size}
                line={21}
                letterSpacing={0.5}
                color={
                  !closed
                    ? Color.neutral.light.neutral90
                    : Color.neutral.light.neutral10
                }>
                {name}
              </Text>
              <View style={style.renderHeader.containerCity}>
                <PinLoc
                  fill={
                    closed
                      ? Color.neutral.light.neutral10
                      : Color.primary.light.primary90
                  }
                />
                <Text
                  textStyle="reegular"
                  size={Size.text.caption1.size}
                  line={15}
                  letterSpacing={0.5}
                  color={
                    !closed
                      ? Color.neutral.light.neutral10
                      : Color.primary.light.primary90
                  }>
                  {location?.city}
                </Text>
              </View>
            </View>
            <View style={style.renderHeader.containerLimited}>
              {!type?.includes('PUBLIC') ? (
                <Text
                  color={
                    closed
                      ? Color.neutral.light.neutral10
                      : Color.limitedEventColor.light.color
                  }
                  line={26}
                  align="center"
                  letterSpacing={0.5}
                  size={Size.text.caption1.size}
                  textStyle="bold">
                  {trans(locale, lang, 'limitedEvent')}
                </Text>
              ) : (
                <Text
                  color={Color.greenActive.light.color}
                  line={26}
                  align="center"
                  letterSpacing={0.5}
                  siz
                  e={Size.text.caption1.size}
                  textStyle="bold">
                  {trans(locale, lang, 'publicEvent')}
                </Text>
              )}
            </View>
            <View>
              {closed && (
                <Text
                  color={Color.watchlistDateEnd.light.color}
                  line={26}
                  align="center"
                  letterSpacing={0.5}
                  size={Size.text.caption1.size}
                  textStyle="bold">
                  {trans(locale, lang, 'eventBerakhir')}
                </Text>
              )}
            </View>
          </View>
          <View style={style.renderHeader.containerUser}>
            <View
              style={[
                style.viewPrice,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  bottom: closed ? 24 : 0,
                },
              ]}>
              {
                // eslint-disable-next-line no-nested-ternary
                price !== 0 ? (
                  <Text
                    size={Size.text.body1.size}
                    align="center"
                    textStyle="semi"
                    letterSpacing={0.5}
                    line={20.4}
                    style={style.mR12}
                    color={Color.greenActive.light.color}>
                    {
                      // eslint-disable-next-line prefer-template
                      'Rp' +
                        formatCurrency({
                          value: price,
                          mantissa: 0,
                        })
                    }
                    ,-
                  </Text>
                ) : closed ? null : (
                  <Text
                    textStyle="semi"
                    line={29}
                    letterSpacing={0.5}
                    size={Size.text.body1.size}
                    style={style.mR12}
                    color={Color.greenActive.light.color}>
                    {trans(locale, lang, 'free')}
                  </Text>
                )
              }
            </View>

            {/* <Button
              disabled={closed || alreadyBought || remainingQuota <= 0}
              onPress={onPress}>
              {trans(locale, lang, 'daftar')}
            </Button> */}
          </View>
        </View>
      </View>
      {!closed && (
        <TouchableWithoutFeedback onPress={onPressWatchlist}>
          {watchlist ? (
            <View style={style.renderHeader.roundedHeartImgSize}>
              <RoundedHeartActive style={style.renderHeader.roundedHeartImg} />
            </View>
          ) : (
            <View style={style.renderEvent.dateHeartBg}>
              <RoundedHeart style={style.renderHeader.roundedHeartImgSize} />
            </View>
          )}
          {/* <Image
            source={watchlist ? RoundedHeartActive : RoundedHeart}
            style={style.renderHeader.roundedHeartImgSize}
            resizeMode="contain"
          /> */}
        </TouchableWithoutFeedback>
      )}
    </Shadow>
  );
}

export default memo(CardEvent);

CardEvent.defaultProps = {
  width: undefined,
  isTicket: false,
  isShowTime: false,
  isMyTicket: false,
  isHighlighted: false,
  onPress: undefined,
  onPressWatchlist: undefined,
};
CardEvent.propTypes = {
  lang: PropTypes.string.isRequired,
  width: PropTypes.number,
  isTicket: PropTypes.bool,
  isHighlighted: PropTypes.bool,
  isShowTime: PropTypes.bool,
  isMyTicket: PropTypes.bool,
  onPress: PropTypes.func,
  onPressWatchlist: PropTypes.func,
  data: PropTypes.objectOf(Object).isRequired,
};
