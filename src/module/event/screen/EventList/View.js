import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { trans } from 'ca-util/trans';
import { NAVIGATION, RESPONSE_STATE } from 'ca-util/constant';
import Base15 from 'ca-component-container/Base15';
import Padder from 'ca-component-container/Padder';
import { Filter, Wave } from 'ca-config/Svg';
import moment from 'moment/min/moment-with-locales';
import { CardEvent } from 'ca-module-event/component';
import BottomSheet from 'ca-component-container/BottomSheet';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import Input from 'ca-component-generic/Input';
import Button from 'ca-component-generic/Button';
import {
  GET_EVENT_CATEGORIES_SUCCESS,
  SET_EVENT_CODE_FAILED,
  SET_EVENT_CODE_SUCCESS,
} from 'ca-module-event/eventConstant';
import locale from './locale';
import style from './style';

function EventList(props) {
  const {
    navigation,
    lang,
    userData,
    getEventCategories,
    getEventCategoriesResponse,
    getEventUpcoming,
    getEventUpcomingResponse,
    eventAction,
    setEventCodeFailed,
    setEventCode,
    setEventCodeClear,
  } = props;

  moment.locale(lang);

  const [isSubmit, setIsSubmit] = useState(false);
  const [isEventCodeModal, setIsEventCodeModal] = useState(false);
  const [code, setCode] = useState();
  const [codeErrorMsg, setCodeErrorMsg] = useState();
  const [id, setId] = useState();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getEventCategories();
  }, [getEventCategories]);

  useEffect(() => {
    let category = null;
    for (let i = 0; i < categories.length; i += 1) {
      if (categories[i].selected) {
        category = categories[i].type;
      }
    }
    getEventUpcoming({ lang, category, userId: userData?.userId });
  }, [getEventUpcoming, lang, categories, userData]);

  useEffect(() => {
    setEventResult(eventAction);
  }, [eventAction, setEventResult]);

  const setEventResult = useCallback(
    (act) => {
      if (act === SET_EVENT_CODE_SUCCESS) {
        setIsSubmit(false);
        setIsEventCodeModal(false);
        setEventCodeClear();
        setCode('');
        navigation.navigate(NAVIGATION.EVENT.EventDetail, {
          id: id,
        });
      }
      if (act === SET_EVENT_CODE_FAILED) {
        setIsSubmit(false);
        setEventCodeClear();
        if (
          setEventCodeFailed?.message !== RESPONSE_STATE.INTERNAL_SERVER_ERROR
        ) {
          setCodeErrorMsg({ error: trans(locale, lang, 'kodeYangKamu') });
        }
      }
      if (act === GET_EVENT_CATEGORIES_SUCCESS) {
        const categoryList = getEventCategoriesResponse?.data?.category ?? [];
        const categoriesOptions = new Array(categoryList.length);
        for (let i = 0; i < categoryList.length; i += 1) {
          categoriesOptions[i] = {
            type: categoryList[i],
            selected: false,
          };
        }
        setCategories(categoriesOptions);
      }
    },
    [
      getEventCategoriesResponse?.data?.category,
      id,
      lang,
      navigation,
      setEventCodeClear,
      setEventCodeFailed?.message,
    ]
  );

  function renderContent() {
    return (
      <ScrollView>
        {getEventUpcomingResponse?.data?.map((item) => {
          return (
            <CardEvent
              key={item?.id}
              onPress={() => {
                if (item?.type === 'PRIVATE') {
                  setId(item?.id);
                  setIsEventCodeModal(true);
                } else {
                  navigation.navigate(NAVIGATION.EVENT.EventDetail, {
                    id: item?.id,
                  });
                }
              }}
              dateStart={item?.startDateTime}
              remainingEventTicket={item?.quotaEvent}
              eventTitle={item?.name}
              eventLocation={item?.location?.city}
              howManyUserRegistered={item?.userRegistered}
              isClosed={item?.closed}
              isWatchlist={item?.watchlist}
              eventType={item?.type}
              keyId={item?.id}
              imageBanner={item?.banner}
              eventPrice={item?.price}
            />
          );
        })}
      </ScrollView>
    );
  }

  function renderEventCodeModal() {
    return (
      <BottomSheet
        swipeable={false}
        isVisible={isEventCodeModal}
        title={trans(locale, lang, 'eventKomunitas')}
        isPadder={false}
        onClosePress={() => {
          setIsEventCodeModal(false);
          setCode('');
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
        <View style={[style.mT20, style.mH20]}>
          <Text
            style={style.mB10}
            line={20}
            letterSpacing={0.5}
            textStyle="regular">
            {trans(locale, lang, 'masukkanKodeEvent')}
          </Text>
          <Input
            value={code}
            textAlign="center"
            placeholder={trans(locale, lang, 'masukkanKodeEvent')}
            height={56}
            message={codeErrorMsg}
            onChangeText={(txt) => {
              setCode(txt);
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
                setIsSubmit(true);
                setEventCode({
                  eventId: id,
                  eventCode: code,
                });
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
      title={trans(locale, lang, 'daftarEvents')}
      onBackPress={() => {
        navigation.replace(NAVIGATION.EVENT.EventMain);
      }}>
      <Padder style={style.padderContainer}>
        <EventFilter categories={categories} setCategories={setCategories} />
        {renderContent()}
        {renderEventCodeModal()}
      </Padder>
    </Base15>
  );
}

function EventFilter({ categories, setCategories }) {
  const selectNewCategory = (selectedCategoryType) => {
    const newCategories = [...categories];
    for (let i = 0; i < newCategories.length; i += 1) {
      if (newCategories[i].type === selectedCategoryType) {
        newCategories[i].selected = !newCategories[i].selected;
      } else {
        newCategories[i].selected = false;
      }
    }
    setCategories(newCategories);
  };

  return (
    <View style={style.eventFilter.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={style.eventFilter.scrollViewContentContainer}>
        <View
          style={[style.eventFilter.borderWrapper, style.eventFilter.filter]}>
          <Filter width={20} fill={Color.landingPage.light.orange} />
          <Text style={style.eventFilter.filterText}>FILTER</Text>
        </View>
        {categories.map((category) => (
          <TouchableOpacity
            onPress={() => selectNewCategory(category.type)}
            key={`event-filter-${category.type}`}
            style={[
              category.selected
                ? style.eventFilter.activeBorderWrapper
                : style.eventFilter.borderWrapper,
              style.eventFilter.button,
            ]}>
            <Text
              align="center"
              textStyle="regular"
              line={20}
              includeFontPadding={false}
              letterSpacing={0.5}
              style={
                category.selected
                  ? style.eventFilter.activeButtonText
                  : style.eventFilter.buttonText
              }>
              {category.type.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

export { EventFilter };
export default EventList;

EventList.defaultProps = {};

EventList.propTypes = {
  lang: PropTypes.string.isRequired,
  userData: PropTypes.objectOf(Object).isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  getEventCategories: PropTypes.func.isRequired,
  getEventCategoriesResponse: PropTypes.objectOf(Object).isRequired,
  getEventUpcoming: PropTypes.func.isRequired,
  getEventUpcomingResponse: PropTypes.objectOf(Object).isRequired,
  eventAction: PropTypes.string.isRequired,
  setEventCodeFailed: PropTypes.objectOf(Object).isRequired,
  setEventCode: PropTypes.func.isRequired,
  setEventCodeClear: PropTypes.func.isRequired,
};

EventFilter.defaultProps = {};
EventFilter.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      selected: PropTypes.bool,
    })
  ).isRequired,
  setCategories: PropTypes.func.isRequired,
};
