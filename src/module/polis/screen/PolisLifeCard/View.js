/* eslint-disable prefer-template */
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Base from 'ca-component-container/Base';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  View,
  Linking,
} from 'react-native';
import Padder from 'ca-component-container/Padder';
import {
  LifetagBlacknWhite,
  LifetagVector,
  LifetagWord,
  LooperGroup2,
  RusakIcon,
  Deliver,
  AllergyIcon,
  EmergencyCallIcon,
  MedicalIcon,
  LifeTagComingSoon,
} from 'ca-config/Image';
import Text from 'ca-component-generic/Text';
import { ArrowRight, Refresh, Warning } from 'ca-config/Svg';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import PolisECardModal from 'ca-module-polis/components/PolisECardModal';
import { trans } from 'ca-util/trans';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  GET_LIFETAG_CURRENT_SETTING_FAILED,
  GET_LIFETAG_CURRENT_SETTING_SUCCESS,
  GET_LIFETAG_FLAG_FAILED,
  GET_LIFETAG_FLAG_SUCCESS,
  GET_LIFETAG_LINKED_LIST_FAILED,
  GET_LIFETAG_LINKED_LIST_SUCCESS,
} from 'ca-module-lifetag/lifetagConstant';
import {
  GET_SUBSCRIPTIONS_FAILED,
  GET_SUBSCRIPTIONS_SUCCESS,
} from 'ca-module-subs/subsConstant';

import { NAVIGATION, RESPONSE_STATE } from 'ca-util/constant';
import Dash from 'react-native-dash';
import Shadow from 'ca-component-container/Shadow';
import Button from 'ca-component-generic/Button';
import LinearGradient from 'react-native-linear-gradient';
import { setMaskingPhone } from 'ca-util/format';
import locale from './locale';
import style from './style';

function PolisLifeCard(props) {
  const {
    navigation,
    lang,
    width,
    colorScheme,
    route: { params },
    getLifetagListOrderFailed,
    setLoading,
    lifetagAction,
    getLifetagFlagResponse,
    getLifetagLinkedListResponse,
    getLifetagLinkedList,
    getLifetagCurrentSettingResponse,
    getLifetagCurrentSetting,
    getLifetagFlag,
    getSubscriptions,
    getSubscriptionsResponse,
    lifesaverAction,
  } = props;

  const [isShowECardModal, setIsShowECardModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  // const lifetagProfile = useMemo(() => {
  //   if (params?.lifetagData) {
  //     return {
  //       allergic: params?.lifetagData?.otherInfo?.allergic,
  //       bloodType: params?.lifetagData?.otherInfo?.bloodType,
  //       emergencyContact: params?.lifetagData?.otherInfo?.emergencyContact,
  //     };
  //   }
  //   return (
  //     getLifetagLinkedListResponse?.data &&
  //     getLifetagLinkedListResponse?.data[0]
  //   );
  // }, [getLifetagLinkedListResponse?.data, params?.lifetagData]);

  // const currentSetting = useMemo(() => {
  //   if (params?.lifetagData) {
  //     return params?.lifetagData?.setting;
  //   }
  //   return getLifetagCurrentSettingResponse?.data;
  // }, [params?.lifetagData, getLifetagCurrentSettingResponse?.data]);

  // const isGracePeriod = useMemo(() => {
  //   if (params?.lifetagData) {
  //     return false;
  //   }
  //   return (
  //     getSubscriptionsResponse?.getActiveSubs &&
  //     getSubscriptionsResponse?.getActiveSubs[0].status === 'GRACE_PERIOD'
  //   );
  // }, [getSubscriptionsResponse?.getActiveSubs, params?.lifetagData]);

  // const lifetagFlag = useMemo(() => {
  //   if (params?.lifetagFlag) {
  //     return {};
  //   }
  //   return getLifetagFlagResponse?.data;
  // }, [getLifetagFlagResponse?.data, params?.lifetagFlag]);

  // useEffect(() => {
  //   if (!params?.lifetagData) {
  //     setLoading(true);
  //     getLifetagLinkedList();
  //     getLifetagFlag();
  //     getSubscriptions();
  //   }
  // }, [
  //   getLifetagFlag,
  //   getLifetagLinkedList,
  //   getSubscriptions,
  //   params?.lifetagData,
  //   setLoading,
  // ]);

  // useEffect(() => {
  //   lifetagActionResult(lifetagAction);
  // }, [lifetagAction, lifetagActionResult]);

  // const lifetagActionResult = useCallback(
  //   (act) => {
  //     if (act === GET_LIFETAG_LINKED_LIST_SUCCESS) {
  //       setLoading(false);
  //       if (getLifetagLinkedListResponse?.data[0]) {
  //         setLoading(true);
  //         getLifetagCurrentSetting({
  //           id: getLifetagLinkedListResponse?.data[0]?.lifeTagCode,
  //         });
  //       }
  //     }
  //     if (act === GET_LIFETAG_LINKED_LIST_FAILED) {
  //       setLoading(false);
  //     }
  //     if (act === GET_LIFETAG_FLAG_SUCCESS) {
  //       setLoading(false);
  //     }
  //     if (act === GET_LIFETAG_FLAG_FAILED) {
  //       setLoading(false);
  //     }
  //     if (act === GET_LIFETAG_CURRENT_SETTING_SUCCESS) {
  //       setLoading(false);
  //     }
  //     if (act === GET_LIFETAG_CURRENT_SETTING_FAILED) {
  //       setLoading(false);
  //     }
  //   },
  //   [getLifetagCurrentSetting, getLifetagLinkedListResponse?.data, setLoading]
  // );

  // useEffect(() => {
  //   lifesaverActionResult(lifesaverAction);
  // }, [lifesaverAction, lifesaverActionResult]);

  // const lifesaverActionResult = useCallback(
  //   (act) => {
  //     if (act === GET_SUBSCRIPTIONS_SUCCESS) {
  //       setLoading(false);
  //     }
  //     if (act === GET_SUBSCRIPTIONS_FAILED) {
  //       setLoading(false);
  //     }
  //   },
  //   [setLoading]
  // );

  function renderHeaderContainer() {
    const onPress = () => {
      if (params?.eCardLink) {
        setIsShowECardModal(true);
      }
    };
    if (!isTimeout && !showLoading) {
      return (
        <Pressable onPress={onPress}>
          <View style={style.header.container}>
            <View style={style.header.content}>
              <Text
                textStyle="semi"
                size={Size.text.body1.size}
                letterSpacing={0.5}>
                {trans(locale, lang, 'lifeCard')}
              </Text>
              <ArrowRight
                fill={Color.grayIcon.light.grayIcon}
                width={9}
                height={16}
              />
            </View>
          </View>
        </Pressable>
      );
    }
    return null;
  }

  function renderECardContainer() {
    const paddingHorizontal = 36;
    const imageSizeStyle = {
      width: !showLoading && !isTimeout ? width - paddingHorizontal * 2 : 0,
      height:
        !showLoading && !isTimeout
          ? ((width - paddingHorizontal * 2) * 231) / 347
          : 0,
    };

    const onError = () => {
      if (errorCount >= 0) {
        setTimeout(() => {
          setShowLoading(false);
          setIsTimeout(true);
        }, 5000);
      }
    };

    const onRefreshPress = () => {
      setShowLoading(true);
      setIsTimeout(false);
      setErrorCount((prevState) => prevState + 1);
    };

    if (params?.eCardLink) {
      return (
        <View style={style.ecard.container}>
          <Image
            key={errorCount}
            source={{ uri: params?.eCardLink }}
            style={[imageSizeStyle, style.ecard.image]}
            onLoadStart={() => setShowLoading(true)}
            onLoad={() => setShowLoading(false)}
            onLoadEnd={() => setShowLoading(false)}
            onError={onError}
          />
          {showLoading && !isTimeout ? (
            <ActivityIndicator
              color={Color.primary.light.primary90}
              size={Size.isAndroid ? 'large' : 'small'}
              style={style.positionAbsolute}
            />
          ) : null}
          {isTimeout ? (
            <Padder style={style.reloadPage.container}>
              <TouchableOpacity onPress={onRefreshPress}>
                <Refresh width={35} height={35} />
              </TouchableOpacity>
              <View>
                <Text
                  textStyle="bold"
                  size={Size.text.h6.size}
                  line={23.8}
                  letterSpacing={0.5}
                  align="center">
                  {trans(locale, lang, 'kontenGagalDiTampilkan')}
                </Text>
              </View>
              <TouchableOpacity onPress={onRefreshPress}>
                <Text
                  textStyle="semi"
                  color={Color.primary[colorScheme].primary90}>
                  {trans(locale, lang, 'muatUlang')}
                </Text>
              </TouchableOpacity>
            </Padder>
          ) : null}
        </View>
      );
    }
    return (
      <View style={style.ecard.containerNull}>
        <Image source={RusakIcon} style={style.ecard.imageNull} />
        <Text
          textStyle="medium"
          size={Size.text.body2.size}
          letterSpacing={0.5}
          align="center"
          color={Color.mediumGray.light.mediumGray}>
          {trans(locale, lang, 'kamuBelumMempunyai')}
        </Text>
      </View>
    );
  }

  function renderLifetagContainer() {
    const healthCardInfoData = [
      {
        title: trans(locale, lang, 'golonganDarah'),
        value: lifetagProfile && lifetagProfile.bloodType,
        icon: MedicalIcon,
        isShow: currentSetting?.isShowBloodType,
      },
      {
        title: trans(locale, lang, 'alergi'),
        value: lifetagProfile && lifetagProfile?.allergic?.join(', '),
        icon: AllergyIcon,
        isShow:
          lifetagProfile?.allergic?.length !== 0 &&
          currentSetting?.isShowAllergic,
      },
    ];

    const emergencyContactData = lifetagProfile?.emergencyContact?.map(
      (item, index) => {
        const indexLabel = index + 1 > 1 ? index + 1 : '';
        return {
          title: trans(locale, lang, 'kontakDarurat') + ' ' + indexLabel,
          value: item?.name + ' - ' + setMaskingPhone(item?.mobilePhoneNumber),
          icon: EmergencyCallIcon,
          isShow: currentSetting?.isShowEmergencyPhoneNumber,
          onPress: () => {
            Linking.openURL('tel:' + item?.mobilePhoneNumber);
          },
        };
      }
    );

    const headerHealthInfo = (
      <View>
        <Text
          textStyle="semi"
          size={Size.text.body2.size}
          line={24}
          style={style.mb8}>
          {trans(locale, lang, 'informasiKesehatan')}
        </Text>
      </View>
    );

    const headerEmergencyContact = (
      <View>
        <Text
          textStyle="semi"
          size={Size.text.body2.size}
          line={24}
          style={style.mb8}>
          {trans(locale, lang, 'kontakDarurat')}
        </Text>
      </View>
    );

    const healthCardInfo = (item) => (
      <View>
        <Shadow borderRadius={30} animated style={style.mB16}>
          <TouchableOpacity disabled={!item.onPress} onPress={item.onPress}>
            <View style={style.healthInfo.healthInfoCard.container}>
              <View>
                <LinearGradient
                  colors={[
                    Color.peachGradient[colorScheme].peachGradient1,
                    Color.peachGradient[colorScheme].peachGradient0,
                  ]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  style={style.healthInfo.healthInfoCard.linearGradient}
                />
                <View style={style.healthInfo.healthInfoCard.icon.container}>
                  <Image
                    source={item.icon}
                    style={style.healthInfo.healthInfoCard.icon.icon}
                    resizeMode="cover"
                  />
                </View>
              </View>
              <View style={style.healthInfo.healthInfoCard.content}>
                <Text
                  textStyle="semi"
                  size={Size.text.body2.size}
                  line={20}
                  style={style.mb2}>
                  {item.title}
                </Text>
                <Text textStyle="semi" size={Size.text.caption1.size} line={18}>
                  {item.value}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Shadow>
      </View>
    );

    const renderCardInfo = () => {
      const isShowAllergic =
        lifetagProfile?.allergic?.length === 0
          ? false
          : currentSetting?.isShowAllergic;

      return (
        <View style={style.pT24}>
          <View>
            {isShowAllergic ||
            currentSetting?.isShowBloodType ||
            currentSetting?.isShowEmergencyPhoneNumber ? (
              <Text style={style.mB16} textStyle="semi" line={21}>
                {trans(locale, lang, 'lifetag')}
              </Text>
            ) : null}
            {isShowAllergic || currentSetting?.isShowBloodType
              ? headerHealthInfo
              : null}

            {healthCardInfoData
              .filter((item) => item.isShow)
              .map((item) => {
                return healthCardInfo(item);
              })}

            {currentSetting?.isShowEmergencyPhoneNumber &&
              headerEmergencyContact}
            {emergencyContactData
              ?.filter((item) => item.isShow)
              .map((item) => {
                return healthCardInfo(item);
              })}
          </View>
          {currentSetting?.isShowEmergencyPhoneNumber && (
            <Padder>
              <View style={style.kontakDarurat.container}>
                <Warning />
                <Text
                  textStyle="semi"
                  size={Size.text.caption2.size}
                  line={18}
                  color={Color.neutral[colorScheme].neutral10}
                  style={[style.ml8, style.mB16]}>
                  {trans(locale, lang, 'kontakDaruratInfo')}
                </Text>
              </View>
            </Padder>
          )}
        </View>
      );
    };

    const renderCardLifeTagFlag = () => {
      return (
        <View style={style.pT24}>
          <Text style={style.mB16} textStyle="semi" line={21}>
            {trans(locale, lang, 'lifetag')}
          </Text>
          <Shadow borderRadius={30} animated style={style.mB16}>
            <View style={style.renderLifetagContainer.container}>
              <Image
                source={LifetagVector}
                style={style.renderLifetagContainer.imgStyle}
              />
              <View style={style.renderLifetagContainer.textContainer}>
                <Image
                  source={LifetagBlacknWhite}
                  style={style.renderLifetagContainer.image}
                />
                <Image source={LifetagWord} style={style.logo} />
                <View style={style.mT16}>
                  <Text
                    align="center"
                    textStyle="semi"
                    line={21}
                    style={style.mb8}>
                    {isGracePeriod
                      ? trans(locale, lang, 'gracePeriodTitle')
                      : trans(locale, lang, 'kamuBelumMemiliki')}
                  </Text>
                  <Text
                    align="center"
                    textStyle="regular"
                    line={19.5}
                    size={Size.text.body2.size - 1}
                    color={Color.neutralLifeSaver.light.neutral40}>
                    {isGracePeriod
                      ? trans(locale, lang, 'gracePeriodContent')
                      : trans(locale, lang, 'keadaanDaruratDitangani')}
                  </Text>
                </View>
              </View>
              <View style={style.mT24}>
                <Button
                  disabled={isGracePeriod}
                  onPress={() => {
                    navigation.navigate(
                      NAVIGATION.LIFETAG.LifetagDetailProduct
                    );
                  }}>
                  {trans(locale, lang, 'dapatkanLifetag')}
                </Button>
              </View>
            </View>
          </Shadow>
        </View>
      );
    };

    const renderCardDeliveryFlag = () => {
      return (
        <View style={style.pT24}>
          <Text style={style.mB16} textStyle="semi" line={21}>
            {trans(locale, lang, 'lifetag')}
          </Text>
          <Shadow borderRadius={30} animated style={style.mB16}>
            <View style={style.renderLifetagContainer.container}>
              <Image
                source={LifetagVector}
                style={style.renderLifetagContainer.imgStyle}
              />
              <View style={style.renderLifetagContainer.textContainer}>
                <Image
                  source={Deliver}
                  style={style.renderLifetagContainer.image2}
                />
                <View style={style.mT22}>
                  <Text align="center" textStyle="semi" line={21}>
                    {trans(locale, lang, 'titleProses')}
                  </Text>
                  <Text
                    align="center"
                    textStyle="regular"
                    line={19.5}
                    size={Size.text.body2.size - 1}
                    color={Color.neutralLifeSaver.light.neutral40}>
                    {trans(locale, lang, 'pengiriman')}
                  </Text>
                </View>
              </View>
              <View style={style.mT24}>
                <Button
                  onPress={() => {
                    navigation.navigate(NAVIGATION.LIFETAG.LifetagStepPairing);
                  }}>
                  {trans(locale, lang, 'hubungkanLifetag')}
                </Button>
              </View>
            </View>
          </Shadow>
        </View>
      );
    };

    if (params?.lifetagData) {
      return renderCardInfo();
    }

    if (isGracePeriod) {
      return renderCardLifeTagFlag();
    }

    if (
      lifetagFlag?.hasLifeSaver &&
      lifetagFlag?.alreadyLinkLifeTag &&
      lifetagFlag?.haveTrackingNumber
    ) {
      return renderCardInfo();
    }

    if (lifetagFlag?.hasLifeSaver && lifetagFlag?.alreadyLinkLifeTag) {
      return renderCardInfo();
    }

    if (lifetagFlag?.hasLifeSaver && lifetagFlag?.alreadyOrderLifeTag) {
      return renderCardDeliveryFlag();
    }

    if (lifetagFlag?.hasLifeSaver) {
      return renderCardLifeTagFlag();
    }

    return null;
  }

  function renderLifetagComingSoon() {
    return (
      <View style={style.pT24}>
        <Text style={style.mB16} textStyle="semi" line={21}>
          {trans(locale, lang, 'lifetag')}
        </Text>
        <Shadow borderRadius={30} animated style={style.mB16}>
          <View style={style.renderLifetagContainer.container}>
            <Image
              source={LifetagVector}
              style={style.renderLifetagContainer.imgStyle}
            />
            <View style={style.renderLifetagContainer.textContainer}>
              <Image
                source={LifeTagComingSoon}
                style={style.renderLifetagContainer.image3}
              />
              <View style={style.mT22}>
                <Text align="center" textStyle="semi" line={21}>
                  {trans(locale, lang, 'comingSoonTitle')}
                </Text>
                <Text
                  align="center"
                  textStyle="regular"
                  line={19.5}
                  size={Size.text.body2.size - 1}
                  color={Color.neutralLifeSaver.light.neutral40}>
                  {trans(locale, lang, 'comingSoonContent')}
                </Text>
              </View>
            </View>
            <View style={style.mT24}>
              <Button disabled>{trans(locale, lang, 'dapatkanLifetag')}</Button>
            </View>
          </View>
        </Shadow>
      </View>
    );
  }

  return (
    <Base
      isPaddingBottom={false}
      title={trans(locale, lang, 'lifeCard')}
      onBackPress={() => navigation.pop()}>
      <View>
        <Image source={LooperGroup2} style={style.imgSize} />
        {renderHeaderContainer()}
        <Padder>{renderECardContainer()}</Padder>
        {/* <Dash
          dashStyle={style.gapLine}
          dashThickness={1}
          dashColor={Color.lineGapHome.dark.color}
        /> */}
        {/* <Padder>{renderLifetagContainer()}</Padder> */}
        {/* <Padder>{renderLifetagComingSoon()}</Padder> */}
        {isShowECardModal ? (
          <PolisECardModal
            {...props}
            isVisible={isShowECardModal}
            onRequestClose={() => setIsShowECardModal(false)}
            sourceLink={params?.eCardLink}
          />
        ) : null}
      </View>
    </Base>
  );
}

export default PolisLifeCard;

PolisLifeCard.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  colorScheme: PropTypes.string.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  getLifetagListOrder: PropTypes.func.isRequired,
  lifetagAction: PropTypes.string.isRequired,
  getLifetagListOrderFailed: PropTypes.objectOf(Object).isRequired,
  getLifetagListOrderResponse: PropTypes.objectOf(Object).isRequired,
  getLifetagFlagResponse: PropTypes.objectOf(Object).isRequired,
  getLifetagLinkedListResponse: PropTypes.objectOf(Object).isRequired,
  getLifetagLinkedList: PropTypes.func.isRequired,
  getLifetagCurrentSettingResponse: PropTypes.objectOf(Object).isRequired,
  getLifetagCurrentSetting: PropTypes.func.isRequired,
  getLifetagFlag: PropTypes.func.isRequired,
  getSubscriptions: PropTypes.func.isRequired,
  getSubscriptionsResponse: PropTypes.objectOf(Object).isRequired,
  lifesaverAction: PropTypes.string.isRequired,
};
