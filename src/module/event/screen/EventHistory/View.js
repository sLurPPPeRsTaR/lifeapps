import React, { useCallback, useEffect } from 'react';
import { View, Image, ScrollView } from 'react-native';
import Text from 'ca-component-generic/Text';
import PropTypes from 'prop-types';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import { NAVIGATION } from 'ca-util/constant';
import { BelumDapatTiket } from 'ca-config/Image';
import Base15 from 'ca-component-container/Base15';
import Padder from 'ca-component-container/Padder';
import moment from 'moment/min/moment-with-locales';
import { CardEvent } from 'ca-module-event/component';
import { navigationRef } from 'ca-bootstrap/bootstrapNavigation';
import {
  GET_EVENT_USERTICKET_FAILED,
  GET_EVENT_USERTICKET_SUCCESS,
} from 'ca-module-event/eventConstant';
import locale from './locale';
import style from './style';

function EventHistory(props) {
  const {
    navigation,
    lang,
    userData,
    getEventUserTicket,
    getEventUserTicketResponse,
    eventAction,
    setLoading,
  } = props;
  moment.locale(lang);
  const currentRouteName = navigationRef.current.getCurrentRoute().name;
  useEffect(() => {
    if (userData?.userId !== '') {
      setLoading(true);
      getEventUserTicket({ lang });
    }
  }, [getEventUserTicket, lang, setLoading, userData?.userId]);

  useEffect(() => {
    eventResult(eventAction);
  }, [eventAction, eventResult]);

  const eventResult = useCallback(
    (act) => {
      if (act === GET_EVENT_USERTICKET_SUCCESS) {
        setLoading(false);
      }
      if (act === GET_EVENT_USERTICKET_FAILED) {
        setLoading(false);
      }
    },
    [setLoading]
  );

  function renderHeader() {
    if (
      userData?.userId === '' ||
      getEventUserTicketResponse?.data?.length === 0
    ) {
      return (
        <View style={style.renderHeader.container}>
          <Image
            source={BelumDapatTiket}
            style={style.renderHeader.imgSize}
            resizeMode="cover"
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
        contentContainerStyle={style.pH5}
        showsVerticalScrollIndicator={false}>
        {getEventUserTicketResponse?.data?.filter(
          (item) => !item?.event?.closed
        ).length !== 0 && (
          <View style={style.mT24}>
            <Text
              textStyle="semi"
              size={Size.text.body1.size}
              line={24}
              letterSpacing={0.5}>
              {trans(locale, lang, 'eventBerlangsung')}
            </Text>
          </View>
        )}
        {getEventUserTicketResponse?.data?.map((item) => {
          if (!item?.event?.closed) {
            return (
              <CardEvent
                key={item?.event?.id}
                data={item}
                isTicket
                onPress={() => {
                  navigation.navigate(NAVIGATION.EVENT.EventDetail, {
                    id: item?.event?.id,
                    slugId: item?.event?.slugId,
                    prevScreen: currentRouteName,
                  });
                }}
              />
            );
          }
          return null;
        })}
        {getEventUserTicketResponse?.data?.filter((item) => item?.event?.closed)
          .length !== 0 && (
          <View style={style.mT24}>
            <Text
              textStyle="semi"
              size={Size.text.body1.size}
              line={24}
              letterSpacing={0.5}>
              {trans(locale, lang, 'eventBerakhir')}
            </Text>
          </View>
        )}
        {getEventUserTicketResponse?.data?.map((item) => {
          if (item?.event?.closed) {
            return (
              <CardEvent
                key={item?.event?.id}
                data={item}
                isTicket
                onPress={() => {
                  navigation.navigate(NAVIGATION.EVENT.EventDetail, {
                    id: item?.event?.id,
                    slugId: item?.event?.slugId,
                    prevScreen: currentRouteName,
                  });
                }}
              />
            );
          }
          return null;
        })}
      </ScrollView>
    );
  }

  return (
    <Base15
      title={trans(locale, lang, 'historyTicket')}
      onBackPress={() => {
        navigation.pop();
      }}>
      <Padder style={style.padderContainer}>
        {renderHeader()}
        {/* {renderButton()} */}
      </Padder>
    </Base15>
  );
}

export default EventHistory;

EventHistory.defaultProps = {};

EventHistory.propTypes = {
  lang: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  getEventUserTicket: PropTypes.func.isRequired,
  getEventUserTicketResponse: PropTypes.objectOf(Object).isRequired,
  eventAction: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  userData: PropTypes.objectOf(Object).isRequired,
};
