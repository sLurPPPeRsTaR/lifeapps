import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  Image,
  ImageBackground,
  Linking,
  TouchableOpacity,
  View,
} from 'react-native';
import Base from 'ca-component-container/Base';
import { trans } from 'ca-util/trans';
import { linking } from 'ca-config/Linking';
import Color from 'ca-config/Color';
import {
  BackgroundHome,
  RusakIcon,
  notifPaper,
  NotificationEmpty,
} from 'ca-config/Image';
import { ArrowLeft2 } from 'ca-config/Svg';
import Padder from 'ca-component-container/Padder';
import Size from 'ca-config/Size';
import Text from 'ca-component-generic/Text';
import Header from 'ca-component-card/Header';
import Shadow from 'ca-component-container/Shadow';
import DeviceInfo from 'react-native-device-info';
import _ from 'lodash';
import moment from 'moment';
import Dash from 'react-native-dash';
import { LinkingScreen, NAVIGATION } from 'ca-util/constant';
import locale from './locale';
import style from './style';
import {
  STATUS_ALL,
  STATUS_ON_PROCESS,
  STATUS_ON_DELIVERY,
  STATUS_UNPAID,
  GET_NOTIF_SUCCESS,
} from '../../notificationConstant';
import { NotificationTransaction } from '../../components';
import NotificationCommon from '../../components/NotificationCommon';

function NotificationMain(props) {
  const {
    lang,
    colorScheme,
    navigation,
    getNotif,
    getNotifResponse,
    getNotifClear,
    userData,
    readNotif,
    width,
    notificationAction,
  } = props;

  moment.locale(lang);

  const [listNotif, setListNotif] = useState([]);

  const [isActiveTabs, setActiveTabs] = useState('info');
  const [positionMenuGroup, setPositionMenuGroup] = useState(0);
  const flatlistRef = useRef(null);

  const [isActiveGrouping, setIsActiveGrouping] = useState({
    title: trans(locale, lang, 'semua'),
    status: STATUS_ALL,
  });

  const onPressPreviousMenuGroup = () => {
    setPositionMenuGroup(0);
    flatlistRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const onPressNextMenuGroup = () => {
    setPositionMenuGroup(1);
    flatlistRef.current?.scrollToOffset({ offset: 493, animated: true });
  };

  const onScrollSubNotification = (e) => {
    if (e.nativeEvent.contentOffset.x > 50) {
      setPositionMenuGroup(1);
    } else if (e.nativeEvent.contentOffset.x < 50) {
      setPositionMenuGroup(0);
    }
  };

  useEffect(() => {
    if (userData?.userId !== '') {
      setListNotif([]);
      getNotif({
        lang,
        path: isActiveTabs,
      });
    }
  }, [getNotif, isActiveTabs, lang, userData?.userId]);

  useEffect(() => {
    getNotifResult(notificationAction);
  }, [getNotifResult, notificationAction]);

  const getNotifResult = useCallback(
    (act) => {
      if (act === GET_NOTIF_SUCCESS) {
        setListNotif(getNotifResponse?.data);
      }
    },
    [getNotifResponse?.data]
  );

  const updateNotif = useCallback((id) => {
    setListNotif((prevState) => {
      return prevState.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            read: true,
          };
        }
        return item;
      });
    });
  }, []);

  const navigate = async (item) => {
    try {
      await readNotif(item?.id);
      updateNotif(item?.id);
      const screen = item?.data?.path?.split('?')[0];
      if (LinkingScreen[screen]) {
        if (item?.data?.path === 'kycretry' && !userData?.isReKYC) {
          navigation.reset({
            index: 0,
            routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
          });
          getNotifClear();
        } else {
          Linking.openURL(`${linking.prefixes[0]}${item?.data?.path}`);
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  function renderHeaderContainer() {
    return (
      <Shadow borderRadius={16} style={style.header.shadow}>
        <Padder style={style.header.container}>
          <View style={style.header.menuContainer}>
            <TouchableOpacity
              onPress={() => setActiveTabs('promo')}
              style={
                isActiveTabs === 'promo'
                  ? style.header.menuTitleActive
                  : style.header.menuTitle
              }>
              <Text
                textStyle="bold"
                size={Size.text.body2.size}
                color={Color.badgeMagenta.dark.badgeMagenta}
                letterSpacing={0.5}>
                {trans(locale, lang, 'Promo')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTabs('info')}
              style={
                isActiveTabs === 'info'
                  ? style.header.menuTitleActive
                  : style.header.menuTitle
              }>
              <Text
                textStyle="bold"
                size={Size.text.body2.size}
                color={Color.badgeMagenta.dark.badgeMagenta}
                letterSpacing={0.5}>
                {trans(locale, lang, 'Info')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTabs('transaction')}
              style={
                isActiveTabs === 'transaction'
                  ? style.header.menuTitleActive
                  : style.header.menuTitle
              }>
              <Text
                textStyle="bold"
                size={Size.text.body2.size}
                color={Color.badgeMagenta.dark.badgeMagenta}
                letterSpacing={0.5}>
                {trans(locale, lang, 'transaksi')}
              </Text>
            </TouchableOpacity>
          </View>
        </Padder>
      </Shadow>
    );
  }

  function renderEmptyNotif() {
    return (
      <View>
        <Image
          source={NotificationEmpty}
          style={style.rusakIcon}
          resizeMode="contain"
        />
        <Text
          color={Color.mediumGray[colorScheme].mediumGray}
          textStyle="medium"
          size={Size.text.body2.size}
          line={21}
          letterSpacing={0.5}
          align="center"
          style={style.body.textRusak}>
          {trans(locale, lang, 'belumAdaNotifikasi')}
        </Text>
      </View>
    );
  }

  function renderGrouping() {
    const onPressGroup = (payload) => {
      setIsActiveGrouping(payload);
    };

    const dataNotificationTransaction = [
      {
        id: 0,
        title: trans(locale, lang, 'semua'),
        status: STATUS_ALL,
      },
      {
        id: 1,
        title: trans(locale, lang, 'titleMenungguPembayaran'),
        status: STATUS_UNPAID,
      },
      {
        id: 2,
        title: trans(locale, lang, 'dalamProses'),
        status: STATUS_ON_PROCESS,
      },
      {
        id: 3,
        title: trans(locale, lang, 'dalamPengiriman'),
        status: STATUS_ON_DELIVERY,
      },
    ];

    const onRender = ({ item }) => {
      return (
        <View
          style={[style.mt16, style.ml12, style.mr3]}
          borderRadius={16}
          key={item.id}>
          {isActiveTabs === 'transaction' && (
            <TouchableOpacity
              onPress={() => {
                onPressGroup({ title: item.title, status: item.status });
              }}
              style={
                item.title === isActiveGrouping.title
                  ? style.header.menuGroupingActive
                  : style.header.menuGrouping
              }>
              <Text
                color={Color.badgeMagenta.dark.badgeMagenta}
                textStyle="medium"
                size={Size.text.caption1.size}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      );
    };

    const renderNatigationSubNotification = () => {
      return (
        <View>
          {DeviceInfo.isTablet() ? null : (
            <View>
              {positionMenuGroup === 0 ? null : (
                <View style={style.header.buttonGroupLeft}>
                  <TouchableOpacity onPress={onPressPreviousMenuGroup}>
                    <ArrowLeft2 width={15} height={15} />
                  </TouchableOpacity>
                </View>
              )}
              {positionMenuGroup > 0 ? null : (
                <View style={style.header.buttonGroupRight}>
                  <TouchableOpacity onPress={() => onPressNextMenuGroup()}>
                    <ArrowLeft2
                      style={style.header.rotateArrow}
                      width={15}
                      height={15}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </View>
      );
    };

    return (
      <View>
        {isActiveTabs === 'transaction' && (
          <View>
            {renderNatigationSubNotification()}
            <FlatList
              ref={flatlistRef}
              getItemLayout={(data, index) => {
                return { length: 33, index, offset: 33 * index };
              }}
              data={dataNotificationTransaction}
              initialScrollIndex={positionMenuGroup}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={style.pl10}
              horizontal
              onScroll={(e) => onScrollSubNotification(e)}
              bounces={false}
              renderItem={onRender}
            />
          </View>
        )}
      </View>
    );
  }

  function renderListNotif() {
    return (
      <View>
        {/* {isActiveTabs !== 'transaction' ? ( */}
        <View>
          {listNotif?.map((item) => {
            return (
              <NotificationCommon
                item={item}
                onPress={() => {
                  navigate(item);
                }}
              />
            );
          })}
        </View>
        {/* ) : (
          <View>
            <Dash
              dashGap={0}
              dashThickness={1}
              dashColor={Color.grayBorder[colorScheme].grayBorder}
              style={style.my16}
            />
            <NotificationTransaction
              data={listNotif}
              isActiveGrouping={isActiveGrouping}
              lang={lang}
              navigate={navigate}
              colorScheme={colorScheme}
            />
          </View>
        )} */}
      </View>
    );
  }

  // function renderList() {
  //   return (
  //     <View>{isActiveTabs === 2 ? renderListNotif() : renderEmptyNotif()}</View>
  //   );
  // }

  return (
    <Base
      bgImage={BackgroundHome}
      bgImageStyle={[style.background, { width }]}
      statusBarStyle="light-content"
      isPaddingBottom={false}
      backgroundColor={Color.backgroundHome.light.backgroundHome}>
      <ImageBackground
        imageStyle={[style.background, { width }]}
        source={BackgroundHome}
        resizeMode="cover"
        style={[style.flex, style.pb48]}>
        <View style={style.padder.container}>
          <Header
            onBackPress={() => navigation.pop()}
            title={trans(locale, lang, 'notifikasi')}
            isLight
            headerStyle={style.header}
          />
        </View>
        {renderHeaderContainer()}
        {/* {renderGrouping()} */}
        <View>
          {_.isEmpty(listNotif) ? renderEmptyNotif() : renderListNotif()}
        </View>
      </ImageBackground>
    </Base>
  );
}

export default NotificationMain;

NotificationMain.propTypes = {
  userData: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  getNotif: PropTypes.func.isRequired,
  getNotifResponse: PropTypes.objectOf(Object).isRequired,
  getNotifClear: PropTypes.func.isRequired,
  readNotif: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  notificationAction: PropTypes.string.isRequired,
};
