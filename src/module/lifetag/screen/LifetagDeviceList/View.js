import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import PropTypes from 'prop-types';
import Base from 'ca-component-container/Base';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import { NAVIGATION } from 'ca-util/constant';
import Padder from 'ca-component-container/Padder';
import Button from 'ca-component-generic/Button';
import {
  LifetagBlacknWhite,
  Deliver,
  LifetagWord,
  LooperGroup2,
  HubungkanLifetag,
} from 'ca-config/Image';

import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import DeviceInfo from 'react-native-device-info';
import { useIsFocused } from '@react-navigation/native';
import { LifetagDeviceCard } from './components';
import locale from './locale';
import style from './style';

function LifetagDeviceList(props) {
  const {
    navigation,
    lang,
    colorScheme,
    userId,
    width,
    height,
    getLifetagLinkedListResponse,
    getLifetagLinkedList,
    getCurrentSubsResponse,
    getLifetagFlag,
    getLifetagFlagResponse,
  } = props;

  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState(true);

  const lifetagLinkedList = useMemo(() => {
    return getLifetagLinkedListResponse?.data || [];
  }, [getLifetagLinkedListResponse?.data]);

  const handleLoading = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const isSubscribed = useMemo(() => {
    return getCurrentSubsResponse?.isSubscribe;
  }, [getCurrentSubsResponse?.isSubscribe]);

  const isGracePeriod = useMemo(() => {
    return getCurrentSubsResponse?.status === 'GRACE_PERIOD';
  }, [getCurrentSubsResponse?.status]);

  const lifetagFlag = useMemo(() => {
    return getLifetagFlagResponse?.data;
  }, [getLifetagFlagResponse?.data]);

  useEffect(() => {
    if (userId && isFocused) {
      getLifetagFlag();
      handleLoading();
    }
  }, [getLifetagFlag, isFocused, userId]);

  useEffect(() => {
    if (userId && isFocused) {
      getLifetagLinkedList();
    }
  }, [getLifetagLinkedList, userId, isFocused]);

  const renderLoading = () => {
    return (
      <ActivityIndicator
        color={Color.primary.light.primary90}
        size={Size.isAndroid ? 'large' : 'small'}
        style={[style.loading, { height: height / 1.5 }]}
      />
    );
  };

  function renderDeviceListContainer() {
    if (lifetagLinkedList.length !== 0 && isSubscribed && !isGracePeriod) {
      return (
        <View style={style.pt24}>
          {lifetagLinkedList.map((item) => {
            const onPress = () => {
              navigation.navigate(NAVIGATION.LIFETAG.LifetagMain, {
                lifetagId: item?.lifeTagCode,
              });
            };
            return (
              <View key={item?.id}>
                <LifetagDeviceCard
                  {...props}
                  data={item}
                  onPress={onPress}
                  style={style.mb16}
                />
              </View>
            );
          })}
        </View>
      );
    }

    let title = trans(locale, lang, 'kamuBelumMemilikiLifetag');
    let subtitle = trans(locale, lang, 'untukMendapatkanLifetag');
    let image = {
      src: LifetagBlacknWhite,
      style: style.deviceListNull.image.image,
    };
    let image2 = {
      src: LifetagWord,
      style: style.deviceListNull.lifetagIcon,
    };
    if (isGracePeriod) {
      title = trans(locale, lang, 'kamuBelumMemilikiLifetag');
      subtitle = trans(locale, lang, 'untukMendapatkanLifetag');
    } else if (
      isSubscribed &&
      lifetagLinkedList.length < 1 &&
      !lifetagFlag?.alreadyOrderLifeTag
    ) {
      title = trans(locale, lang, 'kamuBelumMemilikiLifetag');
      subtitle = trans(locale, lang, 'keadaanDaruratDapatDitangani');
    } else if (
      isSubscribed &&
      lifetagLinkedList.length < 1 &&
      lifetagFlag?.alreadyOrderLifeTag
    ) {
      title = lifetagFlag?.haveTrackingNumber
        ? trans(locale, lang, 'unlinkSegera')
        : trans(locale, lang, 'lifeTagSedangDiproses');
      subtitle = lifetagFlag?.haveTrackingNumber
        ? trans(locale, lang, 'unlinkSegeraHubungkan')
        : trans(locale, lang, 'saatIniLifeTag');
      image = {
        src: lifetagFlag?.haveTrackingNumber ? HubungkanLifetag : Deliver,
        style: { width: 220, height: 220, resizeMode: 'cover' },
      };
      image2 = null;
    }

    const containerTablet = {
      width: width / 1.5,
      alignSelf: 'center',
      justifyContent: 'center',
      height: height / 1.3,
    };

    return (
      <View
        style={[style.pt48, DeviceInfo.isTablet() ? containerTablet : null]}>
        <View style={style.deviceListNull.image.container}>
          <Image source={image.src} style={image.style} />
          {image2 && <Image source={image2.src} style={image2.style} />}
        </View>
        <View style={style.containerTablet}>
          <View>
            <Text
              textStyle="bold"
              size={
                DeviceInfo.isTablet() ? Size.text.h5.size : Size.text.h6.size
              }
              line={27}
              align="center"
              style={style.mb12}>
              {title}
            </Text>
            <Text
              textStyle="medium"
              size={
                DeviceInfo.isTablet()
                  ? Size.text.body1.size
                  : Size.text.body2.size
              }
              line={21}
              align="center"
              color={Color.neutral.light.neutral40}
              style={style.mb12}>
              {subtitle}
            </Text>
          </View>
        </View>
        <View style={style.mt8}>{DeviceInfo.isTablet() && renderBottom()}</View>
      </View>
    );
  }

  function renderBottom() {
    let title = trans(locale, lang, 'dapatkanLifetag');
    let isDisabled = false;
    let onPress = () => {
      navigation.navigate(NAVIGATION.LIFETAG.LifetagDetailProduct);
    };
    if (isGracePeriod) {
      title = trans(locale, lang, 'dapatkanLifetag');
      isDisabled = true;
      onPress = () => {};
    } else if (
      isSubscribed &&
      lifetagLinkedList.length < 1 &&
      !lifetagFlag?.alreadyOrderLifeTag
    ) {
      title = trans(locale, lang, 'dapatkanLifetag');
      isDisabled = false;
      onPress = () => {
        navigation.navigate(NAVIGATION.LIFETAG.LifetagDetailProduct);
      };
    } else if (
      isSubscribed &&
      lifetagLinkedList.length < 1 &&
      lifetagFlag?.alreadyOrderLifeTag
    ) {
      title = trans(locale, lang, 'hubungkanLifetag');
      isDisabled = false;
      onPress = () => {
        navigation.navigate(NAVIGATION.LIFETAG.LifetagQrScanner);
      };
    } else if (isSubscribed && lifetagLinkedList.length > 0) {
      title = trans(locale, lang, 'hubungkanLifetagLainnya');
      isDisabled = false;
      onPress = () => {
        navigation.navigate(NAVIGATION.LIFETAG.LifetagQrScanner);
      };
    }

    return (
      <Padder style={style.pb48}>
        <Button disabled={isDisabled} type="linear-gradient" onPress={onPress}>
          {title}
        </Button>
      </Padder>
    );
  }

  function renderImageBackground() {
    const backgroundStyle = {
      position: 'absolute',
      zIndex: -1,
    };
    return (
      <View style={backgroundStyle}>
        <Image
          source={LooperGroup2}
          resizeMode="cover"
          style={{ width: width, height: height }}
        />
      </View>
    );
  }

  const renderButtonBottom = () => {
    let renderButtonShow = renderBottom();
    if (lifetagLinkedList.length !== 0) {
      renderButtonShow = renderBottom();
    }
    if (lifetagLinkedList.length === 0) {
      renderButtonShow = null;
    }
    if (!DeviceInfo.isTablet()) {
      renderButtonShow = renderBottom();
    }
    return renderButtonShow;
  };

  return (
    <Base
      bordered
      title={trans(locale, lang, 'profileLifeTag')}
      onBackPress={() => navigation.pop()}
      backgroundColor={Color.greyBackround[colorScheme].greyBackground}
      renderBottom={isLoading ? null : renderButtonBottom()}>
      <Padder>
        {isLoading ? renderLoading() : renderDeviceListContainer()}
      </Padder>
      {renderImageBackground()}
    </Base>
  );
}

export default LifetagDeviceList;

LifetagDeviceList.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  getLifetagLinkedListResponse: PropTypes.objectOf(Object).isRequired,
  getLifetagLinkedList: PropTypes.func.isRequired,
  getCurrentSubsResponse: PropTypes.objectOf(Object).isRequired,
  getLifetagFlag: PropTypes.bool.isRequired,
  getLifetagFlagResponse: PropTypes.objectOf(Object).isRequired,
};
