import React, { useCallback, useEffect, useState } from 'react';
import { Alert, BackHandler, Image, Linking, View } from 'react-native';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackgroundLifetag } from 'ca-config/Svg';
import Padder from 'ca-component-container/Padder';
import Text from 'ca-component-generic/Text';
import {
  AllergyIcon,
  EmergencyCallIcon,
  MedicalIcon,
  WhatsAppCall,
  DummyProfile,
  BackgrounSubscription,
  Store,
  SettingGrey,
  DiseaseHistoryIcon,
  Ambulance2,
  LifetagTidakDitemukan,
} from 'ca-config/Image';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import Shadow from 'ca-component-container/Shadow';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NAVIGATION, RESPONSE_STATE, EMERGENCY_PHONE } from 'ca-util/constant';
import Dash from 'react-native-dash';
import {
  GET_LIFETAG_LIST_OTHER_INFO_FAILED,
  GET_LIFETAG_LIST_OTHER_INFO_SUCCESS,
  GET_LIFETAG_PROFILE_FAILED,
  GET_LIFETAG_PROFILE_PUBLIC_FAILED,
  GET_LIFETAG_PROFILE_PUBLIC_SUCCESS,
  GET_LIFETAG_PROFILE_SUCCESS,
  LIFETAG_RESPONSE_STATE,
} from 'ca-module-lifetag/lifetagConstant';
import Base from 'ca-component-container/Base';
import { CommonActions, useIsFocused } from '@react-navigation/native';
import Button from 'ca-component-generic/Button';
import DeviceInfo from 'react-native-device-info';
import { GET_CURRENT_SUBS_SUCCESS } from 'ca-module-lifesaver/lifesaverConstant';
import _ from 'lodash';
import style from './style';
import locale from './locale';

function LifetagMain(props) {
  const {
    navigation,
    lang,
    colorScheme,
    route: { params },
    userId,
    lifetagAction,
    getLifetagProfile,
    getLifetagProfilePublic,
    getLifetagProfileClear,
    getLifetagProfilePublicClear,
    getLifetagProfileFailed,
    getLifetagProfilePublicFailed,
    getLifetagProfileResponse,
    getLifetagProfilePublicResponse,
    setLoading,
    alreadyKYC,
    getCurrentSubs,
    getCurrentSubsResponse,
    setIsComingFromScreen,
    lifesaverAction,
    width,
    getLifetagListOtherInfoResponse,
    getLifetagListOtherInfoFailed,
    getLifetagListOtherInfo,
  } = props;

  const { LIFE_TAG_NOT_LINKED, LIFE_TAG_NOT_FOUND } = LIFETAG_RESPONSE_STATE;

  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();

  const [lifetagProfile, setLifetagProfile] = useState(null);

  const goBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.pop();
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
        })
      );
    }
    return true;
  }, [navigation]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      goBack
    );
    return () => backHandler.remove();
  }, [goBack]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      getLifetagProfileClear();
      getLifetagProfilePublicClear();
    });
    return unsubscribe;
  }, [getLifetagProfileClear, getLifetagProfilePublicClear, navigation]);

  useEffect(() => {
    if (isFocused) {
      onFocused(params?.lifetagId);
    }
  }, [isFocused, onFocused, params?.lifetagId]);

  const onFocused = useCallback(
    (lifetagId) => {
      if (lifetagId) {
        setLoading(true);
        setTimeout(() => {
          if (userId) {
            getLifetagProfile({ id: lifetagId });
          } else {
            getLifetagProfilePublic({ id: lifetagId });
          }
        }, 100);
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
        });
      }
    },
    [getLifetagProfile, getLifetagProfilePublic, navigation, setLoading, userId]
  );

  useEffect(() => {
    lifesaverResult(lifesaverAction, lifetagAction);
  }, [lifesaverAction, lifetagAction, lifesaverResult]);

  const lifesaverResult = useCallback(
    (lifesaverAct, lifetagAct) => {
      if (
        lifesaverAct === GET_CURRENT_SUBS_SUCCESS &&
        lifetagAct === GET_LIFETAG_PROFILE_FAILED &&
        getLifetagProfileFailed?.message === LIFE_TAG_NOT_LINKED
      ) {
        const hasActiveLifesaver =
          getCurrentSubsResponse?.isSubscribe &&
          getCurrentSubsResponse?.status !== 'GRACE_PERIOD';
        if (alreadyKYC && hasActiveLifesaver) {
          setLoading(true);
          getLifetagListOtherInfo();
        } else {
          setIsComingFromScreen({});
          navigation.reset({
            index: 1,
            routes: [
              { name: NAVIGATION.TABMAIN.TabMain },
              { name: NAVIGATION.LIFESAVER.LifesaverMain },
            ],
          });
        }
      }
    },
    [
      getLifetagProfileFailed?.message,
      LIFE_TAG_NOT_LINKED,
      getCurrentSubsResponse?.isSubscribe,
      getCurrentSubsResponse?.status,
      alreadyKYC,
      setLoading,
      getLifetagListOtherInfo,
      setIsComingFromScreen,
      navigation,
    ]
  );

  useEffect(() => {
    lifetagResult(lifetagAction);
  }, [lifetagResult, lifetagAction]);

  const lifetagResult = useCallback(
    (act) => {
      if (act === GET_LIFETAG_PROFILE_SUCCESS) {
        setLoading(false);
        setLifetagProfile(getLifetagProfileResponse?.data);
      }
      if (act === GET_LIFETAG_PROFILE_PUBLIC_SUCCESS) {
        setLoading(false);
        setLifetagProfile(getLifetagProfilePublicResponse?.data);
      }
      if (act === GET_LIFETAG_PROFILE_FAILED) {
        setLoading(false);
        const message = getLifetagProfileFailed?.message;
        if (message !== RESPONSE_STATE.INTERNAL_SERVER_ERROR) {
          if (message === LIFE_TAG_NOT_LINKED) {
            if (alreadyKYC) {
              getCurrentSubs();
            } else {
              setIsComingFromScreen({});
              navigation.reset({
                index: 1,
                routes: [
                  { name: NAVIGATION.TABMAIN.TabMain },
                  { name: NAVIGATION.LIFESAVER.LifesaverMain },
                ],
              });
            }
            return;
          }
          if (message === LIFE_TAG_NOT_FOUND) {
            return;
          }
          Alert.alert('Error', message);
        }
      }
      if (act === GET_LIFETAG_PROFILE_PUBLIC_FAILED) {
        setLoading(false);
        const message = getLifetagProfilePublicFailed?.message;
        if (message !== RESPONSE_STATE.INTERNAL_SERVER_ERROR) {
          if (message === LIFE_TAG_NOT_LINKED) {
            setIsComingFromScreen({
              screen: NAVIGATION.LIFETAG.LifetagMain,
              params: {
                lifetagId: params?.lifetagId,
              },
            });
            navigation.replace(NAVIGATION.LOGIN.Login);
            return;
          }
          if (message === LIFE_TAG_NOT_FOUND) {
            return;
          }
          Alert.alert('Error', message);
        }
      }
      if (act === GET_LIFETAG_LIST_OTHER_INFO_SUCCESS) {
        setLoading(false);
        const res = getLifetagListOtherInfoResponse?.data;
        const lifetagOtherInfo = !_.isEmpty(res)
          ? {
              bloodType: res[0]?.bloodType,
              allergic: res[0]?.allergic,
              diseaseHistory: res[0]?.diseaseHistory,
              emergencyContact: res[0]?.emergencyContact.map((item) => {
                return {
                  ...item,
                  phoneNumber: item.mobilePhoneNumber,
                };
              }),
            }
          : undefined;
        navigation.replace(NAVIGATION.LIFETAG.LifetagForm, {
          lifetagId: params?.lifetagId,
          lifetagOtherInfo,
        });
      }
      if (act === GET_LIFETAG_LIST_OTHER_INFO_FAILED) {
        setLoading(false);
        const message = getLifetagListOtherInfoFailed?.message;
        if (message !== RESPONSE_STATE.INTERNAL_SERVER_ERROR) {
          Alert.alert('Error', message);
        }
      }
    },
    [
      LIFE_TAG_NOT_FOUND,
      LIFE_TAG_NOT_LINKED,
      alreadyKYC,
      getCurrentSubs,
      getLifetagListOtherInfoFailed?.message,
      getLifetagListOtherInfoResponse?.data,
      getLifetagProfileFailed?.message,
      getLifetagProfilePublicFailed?.message,
      getLifetagProfilePublicResponse?.data,
      getLifetagProfileResponse?.data,
      navigation,
      params?.lifetagId,
      setIsComingFromScreen,
      setLoading,
    ]
  );

  function renderBackground() {
    const styleBackground = {
      position: 'absolute',
      top: -200 - insets.top,
      left: 300 - Size.screen.width,
      right: 300 - Size.screen.width,
    };

    return (
      <View style={styleBackground}>
        <BackgroundLifetag />
      </View>
    );
  }

  function renderHeaderContainer() {
    const { isOwner } = lifetagProfile;
    const onBackPress = () => {
      if (navigation.canGoBack()) {
        navigation.pop();
      } else {
        navigation.replace(NAVIGATION.TABMAIN.TabMain);
      }
    };

    const onSettingPress = () => {
      const { id, ...tempOtherInfo } = lifetagProfile?.otherInfo;
      const otherInfo = {
        ...tempOtherInfo,
        emergencyContact: tempOtherInfo.emergencyContact.map((item) => {
          return {
            name: item.name,
            phoneNumber: item.mobilePhoneNumber,
          };
        }),
      };
      navigation.navigate(NAVIGATION.LIFETAG.LifetagSetting, {
        lifetagId: params?.lifetagId,
        otherInfo,
      });
    };

    const onCartPress = () => {
      navigation.navigate(NAVIGATION.LIFETAG.LifetagDetailProduct);
    };

    return (
      <View>
        {isOwner ? (
          <View style={style.header.containerRightContent}>
            <TouchableOpacity onPress={onCartPress} style={style.me10}>
              <Image
                source={Store}
                resizeMode="cover"
                style={[style.header.iconShop]}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onSettingPress} style={style.me10}>
              <Image
                source={SettingGrey}
                resizeMode="cover"
                style={[style.me10, style.header.iconSetting]}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }

  function renderCardContainer() {
    const { eCardLifesaver } = lifetagProfile;
    const widthTabletImage = DeviceInfo.isTablet() ? 30 : 23;
    const leftTabletImage = DeviceInfo.isTablet() ? 8 : 0;
    const styleCardImage = {
      width: width - widthTabletImage * 2,
      height: ((width - 27 * 2) * 231) / 347,
      left: leftTabletImage,
    };

    return (
      <View style={[style.card.container, style.mt24]}>
        <Shadow animated borderRadius={24}>
          <View style={style.card.backgroundCard}>
            <Image
              source={{
                uri: eCardLifesaver?.link,
              }}
              style={styleCardImage}
              resizeMode="contain"
            />
          </View>
        </Shadow>
      </View>
    );
  }

  function renderContentContainer() {
    const { otherInfo, setting } = lifetagProfile;
    const allergicSplitter = ', ';
    const diseaseHistorySplitter = ', ';

    let healthCardInfoData = [
      {
        title: trans(locale, lang, 'golonganDarah'),
        value: otherInfo?.bloodType,
        icon: MedicalIcon,
        isShow: setting?.isShowBloodType,
      },
      {
        title: trans(locale, lang, 'alergi'),
        value: otherInfo?.allergic?.join(allergicSplitter) || '-',
        icon: AllergyIcon,
        isShow: setting?.isShowAllergic && otherInfo.allergic?.length > 0,
      },
      {
        title: trans(locale, lang, 'riwayatPenyakit'),
        value: otherInfo?.diseaseHistory?.join(diseaseHistorySplitter) || '-',
        icon: DiseaseHistoryIcon,
        isShow:
          setting?.isShowDiseaseHistory && otherInfo.diseaseHistory?.length > 0,
      },
    ];

    healthCardInfoData = healthCardInfoData.filter((item) => item.isShow);

    const emergencyContactData = () => {
      let result = [];
      otherInfo?.emergencyContact?.map((item, index) =>
        result.push({
          title: `${trans(locale, lang, 'telepon')} ${
            index + 1 > 1 ? index + 1 : ''
          }`,
          titleWa: `${trans(locale, lang, 'whatsApp')} ${
            index + 1 > 1 ? index + 1 : ''
          }`,
          value: `${item?.name} - ${item?.mobilePhoneNumber}`,
          icon: EmergencyCallIcon,
          iconWa: WhatsAppCall,
          isShow: setting?.isShowEmergencyPhoneNumber,
          onPress: () => {
            Linking.openURL('tel:' + item?.mobilePhoneNumber);
          },
          onPressWa: () => {
            Linking.openURL(
              'https://wa.me/' +
                item?.mobilePhoneNumber?.replace(
                  /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                  ''
                )
            );
          },
        })
      );
      return result;
    };

    const headerHealthInfo =
      (setting?.isShowAllergic && otherInfo.allergic?.length > 0) ||
      (setting?.isShowDiseaseHistory && otherInfo.diseaseHistory?.length > 0) ||
      setting?.isShowBloodType ? (
        <View
          style={[
            style.flexDirectionRow,
            style.alignItemsCenter,
            style.justifyContentSpaceBetween,
            style.mb16,
            style.my20,
          ]}>
          <Text
            textStyle="semi"
            size={Size.text.body1.size}
            line={24}
            color={Color.main[colorScheme].dark}>
            {trans(locale, lang, 'informasiKesehatan')}
          </Text>
        </View>
      ) : null;

    const headerEmergencyContact = setting?.isShowEmergencyPhoneNumber ? (
      <View
        style={[
          style.flexDirectionRow,
          style.alignItemsCenter,
          style.justifyContentSpaceBetween,
          style.my20,
          style.mb16,
        ]}>
        <Text
          textStyle="semi"
          size={Size.text.body1.size}
          line={24}
          color={Color.main[colorScheme].dark}>
          {trans(locale, lang, 'kontakDarurat')}
        </Text>
      </View>
    ) : null;

    const infoCard = (item, index) => (
      <View style={style.flexDirectionColumn}>
        <View style={style.flexDirectionRow}>
          {item?.icon ? (
            <View>
              <View>
                <Image
                  source={item.icon}
                  style={style.healthInfo.healthInfoCard.icon.icon}
                  resizeMode="cover"
                />
              </View>
            </View>
          ) : null}
          <View style={[style.mr16, style.flex1, style.justifyContentCenter]}>
            <Text
              textStyle="semi"
              size={Size.text.body2.size}
              line={20}
              style={style.mb2}>
              {item.title}
            </Text>
            <Text
              textStyle="semi"
              size={Size.text.caption1.size}
              line={18}
              color={Color.neutral[colorScheme].neutral10}>
              {item.value}
            </Text>
          </View>
        </View>
        {index !== healthCardInfoData.length - 1 && (
          <Dash
            dashGap={0}
            dashThickness={1}
            dashColor={Color.grayBorder[colorScheme].grayBorder}
            style={style.my10}
          />
        )}
      </View>
    );

    const infoCardEmergencyCall = () => (
      <View style={style.pb8}>
        {emergencyContactData()?.map((item) => {
          return (
            <Shadow animated borderRadius={8} style={style.mb8}>
              <View style={style.p8}>
                <View style={style.healthInfo.healthInfoCard.cardCall}>
                  <View style={style.justifyContentCenter}>
                    <Image
                      source={DummyProfile}
                      style={{ width: 42, height: 42, resizeMode: 'contain' }}
                    />
                  </View>
                  <View style={[style.flex1, style.ml12]}>
                    <Text size={Size.text.caption1.size} textStyle="semi">
                      {item?.value}
                    </Text>
                    <View
                      style={
                        style.healthInfo.healthInfoCard.containerButtonCall
                      }>
                      <Button
                        onPress={item?.onPress}
                        outline
                        prefixIcon={
                          <Image
                            source={item.icon}
                            style={
                              style.healthInfo.healthInfoCard.icon.iconCall
                            }
                            resizeMode="cover"
                          />
                        }
                        style={style.healthInfo.healthInfoCard.buttonTlp}>
                        <Text textStyle="semi" size={Size.text.caption1.size}>
                          {item?.title}
                        </Text>
                      </Button>
                      <Button
                        onPress={item?.onPressWa}
                        outline
                        prefixIcon={
                          <Image
                            source={item?.iconWa}
                            style={
                              style.healthInfo.healthInfoCard.icon.iconCall
                            }
                            resizeMode="cover"
                          />
                        }
                        style={style.healthInfo.healthInfoCard.buttonWa}>
                        <Text textStyle="semi" size={Size.text.caption1.size}>
                          {item?.titleWa}
                        </Text>
                      </Button>
                    </View>
                  </View>
                </View>
              </View>
            </Shadow>
          );
        })}
      </View>
    );

    return (
      <View>
        <Padder>
          {headerEmergencyContact}
          {setting?.isShowEmergencyPhoneNumber ? infoCardEmergencyCall() : null}
        </Padder>

        <View>
          {setting?.isShowBloodType || setting?.isShowAllergic ? (
            <Dash
              dashStyle={[style.gapLine]}
              dashThickness={1}
              dashColor={Color.lineGapHome.dark.color}
            />
          ) : null}
          <Padder>
            {headerHealthInfo}
            {healthCardInfoData.length > 0 && (
              <View style={style.pb48}>
                <Shadow animated borderRadius={16}>
                  <View style={style.p8}>
                    {healthCardInfoData.map((item, index) => {
                      return infoCard(item, index);
                    })}
                  </View>
                  <View style={{ zIndex: -1 }}>
                    <Image
                      source={BackgrounSubscription}
                      resizeMode="cover"
                      style={[style.backgroundWafe, { width: width - 32 }]}
                    />
                  </View>
                </Shadow>
              </View>
            )}
          </Padder>
        </View>
      </View>
    );
  }

  function renderFooterContainer() {
    const onEmergencyCallPress = () => {
      Linking.openURL(EMERGENCY_PHONE.PHONE);
    };

    return (
      <View style={[style.footer.sos.container, style.card.infoCard.boxShadow]}>
        <View style={style.footer.sos.imageContainer}>
          <Image source={Ambulance2} style={style.footer.sos.image} />
          <Text align="center" style={style.mb8}>
            {trans(locale, lang, 'kamiAkanSegera')}
          </Text>
        </View>
        <Button
          textStyle="regular"
          type="linear-gradient"
          onPress={onEmergencyCallPress}>
          {trans(locale, lang, 'teleponDarurat')}
        </Button>
      </View>
    );
  }

  if (!lifetagProfile) {
    const isLifetagNotFound =
      getLifetagProfileFailed?.message === LIFE_TAG_NOT_FOUND ||
      getLifetagProfilePublicFailed?.message === LIFE_TAG_NOT_FOUND;
    if (isLifetagNotFound) {
      return (
        <Base
          onBackPress={() => {
            if (navigation.canGoBack()) {
              navigation.pop();
            } else {
              navigation.reset({
                index: 0,
                routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
              });
            }
          }}>
          <View style={style.flex1}>
            <Padder style={style.flex1}>
              <View style={style.lifetagNotFound.container}>
                <View>
                  <Image
                    source={LifetagTidakDitemukan}
                    style={style.lifetagNotFound.image}
                  />
                </View>
                <View>
                  <Text
                    align="center"
                    textStyle="bold"
                    size={Size.text.h6.size}
                    line={27}
                    style={style.mb4}>
                    {trans(locale, lang, 'lifetagTidakDitemukan')}
                  </Text>
                  <Text
                    align="center"
                    textStyle="medium"
                    line={21}
                    color={Color.neutralLifeSaver.light.neutral40}>
                    {trans(locale, lang, 'pastikanQrCode')}
                  </Text>
                </View>
              </View>
            </Padder>
          </View>
        </Base>
      );
    }
    return (
      <Base>
        <View />
      </Base>
    );
  }

  return (
    <Base
      bordered
      onBackPress={() => {
        if (navigation.canGoBack()) {
          navigation.pop();
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
            })
          );
        }
      }}
      isPaddingBottom={false}
      renderBottom={renderFooterContainer()}
      rightHeaderContent={renderHeaderContainer()}>
      <Padder>{renderCardContainer()}</Padder>
      <View style={style.mt24}>
        <Dash
          dashStyle={style.gapLine}
          dashThickness={1}
          dashColor={Color.lineGapHome.dark.color}
        />
      </View>
      {renderContentContainer()}
    </Base>
  );
}

export default LifetagMain;

LifetagMain.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  userId: PropTypes.string.isRequired,
  lifetagAction: PropTypes.string.isRequired,
  getLifetagProfile: PropTypes.func.isRequired,
  getLifetagProfilePublic: PropTypes.func.isRequired,
  getLifetagProfileClear: PropTypes.func.isRequired,
  getLifetagProfilePublicClear: PropTypes.func.isRequired,
  getLifetagProfileFailed: PropTypes.objectOf(Object).isRequired,
  getLifetagProfilePublicFailed: PropTypes.objectOf(Object).isRequired,
  getLifetagProfileResponse: PropTypes.objectOf(Object).isRequired,
  getLifetagProfilePublicResponse: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  alreadyKYC: PropTypes.bool.isRequired,
  getCurrentSubs: PropTypes.func.isRequired,
  getCurrentSubsResponse: PropTypes.objectOf(Object).isRequired,
  setIsComingFromScreen: PropTypes.func.isRequired,
  lifesaverAction: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  getLifetagListOtherInfoResponse: PropTypes.objectOf(Object).isRequired,
  getLifetagListOtherInfoFailed: PropTypes.objectOf(Object).isRequired,
  getLifetagListOtherInfo: PropTypes.func.isRequired,
};
