import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, ScrollView } from 'react-native';
import Text from 'ca-component-generic/Text';
import PropTypes from 'prop-types';
import { trans } from 'ca-util/trans';
import { Wave } from 'ca-config/Svg';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import { NAVIGATION } from 'ca-util/constant';
import { CalenderEvent } from 'ca-config/Image';
import Base15 from 'ca-component-container/Base15';
import Padder from 'ca-component-container/Padder';
import moment from 'moment/min/moment-with-locales';
import Button from 'ca-component-generic/Button';
import { CardEvent } from 'ca-module-event/component';
import {
  GET_EVENT_FAVORITE_FAILED,
  GET_EVENT_FAVORITE_SUCCESS,
  SET_EVENT_RMVFAVORITE_FAILED,
  SET_EVENT_RMVFAVORITE_SUCCESS,
} from 'ca-module-event/eventConstant';
import BottomSheet from 'ca-component-container/BottomSheet';
import Input from 'ca-component-generic/Input';
import { useIsFocused } from '@react-navigation/native';
import {
  getEventDetailApi,
  getEventDetailPublicApi,
} from 'ca-module-event/eventApi';
import { navigationRef } from 'ca-bootstrap/bootstrapNavigation';
import locale from './locale';
import style from './style';

function EventFavorite(props) {
  const {
    navigation,
    lang,
    getEventFavorite,
    getEventFavoriteResponse,
    eventAction,
    userData,
    setEventAddFavorite,
    setEventRmvFavorite,
    setLoading,
  } = props;
  moment.locale(lang);
  const currentRouteName = navigationRef.current.getCurrentRoute().name;
  const isFocused = useIsFocused();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isEventCodeModal, setIsEventCodeModal] = useState(false);
  const [accessCode, setAccessCode] = useState();
  const [codeErrorMsg, setCodeErrorMsg] = useState();
  const [id, setId] = useState();
  const [slugId, setSlugId] = useState();

  useEffect(() => {
    if (isFocused) {
      setCodeErrorMsg('');
      setLoading(true);
      getEventFavorite({ lang });
    }
  }, [getEventFavorite, isFocused, lang, setLoading]);

  useEffect(() => {
    eventResult(eventAction);
  }, [eventAction, eventResult]);

  const eventResult = useCallback(
    (act) => {
      if (act === GET_EVENT_FAVORITE_SUCCESS) {
        setLoading(false);
      }
      if (act === GET_EVENT_FAVORITE_FAILED) {
        setLoading(false);
      }
      if (act === SET_EVENT_RMVFAVORITE_SUCCESS) {
        setLoading(false);
        getEventFavorite({ lang });
      }
      if (act === SET_EVENT_RMVFAVORITE_FAILED) {
        setLoading(false);
      }
    },
    [getEventFavorite, lang, setLoading]
  );

  const onPressVerifyCode = () => {
    setIsSubmit(true);
    if (userData?.userId !== '') {
      getEventDetailApi({
        eventId: id,
        slugId: slugId,
        lang,
        userId: userData?.userId,
        accessCode,
      })
        .then(() => {
          setIsSubmit(false);
          setIsEventCodeModal(false);
          setAccessCode('');
          setCodeErrorMsg('');
          navigation.navigate(NAVIGATION.EVENT.EventDetail, {
            id: id,
            slugId: slugId,
            accessCode,
            prevScreen: currentRouteName,
          });
        })
        .catch(() => {
          setIsSubmit(false);
          setCodeErrorMsg({
            error: trans(locale, lang, 'kodeYangKamu'),
          });
        });
    } else {
      getEventDetailPublicApi({
        eventId: id,
        slugId: slugId,
        lang,
        accessCode,
      })
        .then(() => {
          setIsSubmit(false);
          setIsEventCodeModal(false);
          setAccessCode('');
          setCodeErrorMsg('');
          navigation.navigate(NAVIGATION.EVENT.EventDetail, {
            id: id,
            slugId: slugId,
            accessCode,
            prevScreen: currentRouteName,
          });
        })
        .catch(() => {
          setIsSubmit(false);
          setCodeErrorMsg({
            error: trans(locale, lang, 'kodeYangKamu'),
          });
        });
    }
  };

  function renderHeader() {
    if (getEventFavoriteResponse?.data <= 0 || userData?.userId === '') {
      return (
        <View style={style.renderHeader.container}>
          <Image
            source={CalenderEvent}
            style={style.renderHeader.imgSize}
            resizeMode="contain"
          />
          <Text
            style={style.mV16}
            align="center"
            textStyle="bold"
            size={Size.text.h5.size}
            line={33}
            letterSpacing={0.5}>
            {trans(locale, lang, 'oops')}
          </Text>
          <Text
            align="center"
            textStyle="regular"
            size={Size.text.body1.size}
            letterSpacing={0.5}
            line={24}
            color={Color.neutral.light.neutral10}>
            {trans(locale, lang, 'kamuBelumMemiliki')}
          </Text>
        </View>
      );
    }
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.pH5}>
        {getEventFavoriteResponse?.data?.map((item) => {
          if (!item?.closed) {
            return (
              <CardEvent
                key={item?.id}
                data={item}
                onPress={() => {
                  if (item?.type === 'PRIVATE') {
                    setId(item?.id);
                    setSlugId(item?.slugId);
                    setIsEventCodeModal(true);
                  } else {
                    navigation.navigate(NAVIGATION.EVENT.EventDetail, {
                      id: item?.id,
                      slugId: item?.slugId,
                      prevScreen: currentRouteName,
                    });
                  }
                }}
                onPressWatchlist={() => {
                  if (!item?.watchlist) {
                    setEventAddFavorite({
                      eventId: item?.id,
                    });
                  } else if (item?.watchlist) {
                    setEventRmvFavorite({
                      eventId: item?.id,
                    });
                  }
                }}
              />
            );
          }
        })}
      </ScrollView>
    );
  }

  function renderButton() {
    if (getEventFavoriteResponse?.data <= 0) {
      return (
        <View style={style.mB20}>
          <Button
            type="linear-gradient"
            rounded
            onPress={() => {
              navigation.navigate(NAVIGATION.EVENT.EventList);
            }}>
            {trans(locale, lang, 'lihatDaftarEvents')}
          </Button>
        </View>
      );
    }
    return null;
  }

  function renderEventCodeModal() {
    return (
      <BottomSheet
        keyboardVerticalOffset={Size.screen.height}
        swipeable={false}
        isVisible={isEventCodeModal}
        title={trans(locale, lang, 'limitedEventModalTitle')}
        isPadder={false}
        onClosePress={() => {
          setCodeErrorMsg();
          setIsEventCodeModal(false);
          setAccessCode('');
        }}>
        <Text
          align="center"
          textStyle="regular"
          line={20}
          letterSpacing={0.5}
          style={style.mH20}
          color={Color.neutral.light.neutral10}>
          {trans(locale, lang, 'eventIniDiperuntukan')}
        </Text>
        <View style={[style.mT30, style.mH20]}>
          <Text
            style={style.mB10}
            line={20}
            letterSpacing={0.5}
            textStyle="regular">
            {trans(locale, lang, 'masukkanKodeEvent')}
          </Text>
          <Input
            value={accessCode}
            textAlign="center"
            multiline={Size.isAndroid}
            placeholder={trans(locale, lang, 'masukkanKodeDisini')}
            height={56}
            message={codeErrorMsg}
            onChangeText={(txt) => {
              setAccessCode(txt);
            }}
          />
        </View>
        <Wave
          width="100%"
          height={150}
          style={style.renderContent.waveImg}
          fill={Color.redHome.dark.redHome}
        />
        <View style={style.mT30}>
          <View style={[style.mH20, style.pB30]}>
            <Button
              block
              disabled={isSubmit}
              onPress={() => {
                onPressVerifyCode();
              }}>
              {trans(locale, lang, 'lanjutkan')}
            </Button>
          </View>
        </View>
      </BottomSheet>
    );
  }

  return (
    <Base15
      title={trans(locale, lang, 'eventFavMu')}
      onBackPress={() => {
        navigation.pop();
      }}>
      <Padder style={style.padderContainer}>
        {renderHeader()}
        {/* {renderButton()} */}
      </Padder>
      {renderEventCodeModal()}
    </Base15>
  );
}

export default EventFavorite;

EventFavorite.defaultProps = {};

EventFavorite.propTypes = {
  lang: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  getEventFavorite: PropTypes.func.isRequired,
  getEventFavoriteResponse: PropTypes.objectOf(Object).isRequired,
  eventAction: PropTypes.string.isRequired,
  userData: PropTypes.objectOf(Object).isRequired,
  setEventAddFavorite: PropTypes.func.isRequired,
  setEventRmvFavorite: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};
