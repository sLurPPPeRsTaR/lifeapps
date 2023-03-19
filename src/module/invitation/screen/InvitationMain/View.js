/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect, useState } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Image,
  RefreshControl,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Text from 'ca-component-generic/Text';
import PropTypes from 'prop-types';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import LinearGradient from 'react-native-linear-gradient';
import { Base, Shadow } from 'ca-component-container/index';
import {
  InvitaionInfo,
  InvitationStatus1,
  InvitationStatus2,
  InvitationStatus3,
  InvitationStatus4,
  LifeSaverLogo,
  LifeSaverLogoPlus,
  ReferalBg,
  ReferalSendIcon,
  UserPlus,
  LogoLifesaverPos,
  LogoLifesaverPosSuccess,
} from 'ca-config/Image';
import { DummyProfile, SendRed } from 'ca-config/Svg';
import HorizontalLine from 'ca-component-lifesaver/HorizontalLine';
import Size from 'ca-config/Size';
import { API, BASE_URL, NAVIGATION, POLICY_STATUS } from 'ca-util/constant';
import { useIsFocused } from '@react-navigation/native';
import {
  GET_INVITATION_LIST_FRIEND,
  GET_INVITATION_LIST_FRIEND_SUCCESS,
  GET_INVITATION_LIST_FRIEND_FAILED,
  GET_CHECK_STATUS_REGISTER,
  GET_CHECK_STATUS_REGISTER_SUCCESS,
  GET_CHECK_STATUS_REGISTER_FAILED,
  GET_ADDLINK_SUCCESS,
  GET_ADDLINK_FAILED,
} from 'ca-module-invitation/invitationConstant';
import getContacts from 'ca-util/contacts';
import moment from 'moment';
import Config from 'react-native-config';
import { setPhoneFormat } from 'ca-util/format';
import style from './style';
import locale from './locale';
import ReferalSteps from './components/ReferalSteps';
import ReferalHead from './components/ReferalHead';

function InvitationMain(props) {
  const {
    navigation,
    lang,
    setLoading,
    invitationAction,
    getInvitationListFriend,
    getInvitationListFriendStateResponse,
    // getInvitationListFriendStateError,
    accessToken,
    userData,
    getCheckMaxInvite,
    getCheckMaxInviteResponse,
    appConfig: { features },
    getCheckStatusRegister,
    getAddLink,
    getAddLinkClear,
  } = props;

  const isFocused = useIsFocused();
  const [invitationList, setInvitationList] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [numListCheck, setNumListCheck] = useState([]);
  const [limitedUser, setLimitedUser] = useState(false);
  const [invitationLimit, setInvitationLimit] = useState(
    features?.invitationLimit || 10
  );

  const [isActiveTabs, setActiveTabs] = useState(1);
  const [registeredData, setRegisteredData] = useState([]);
  const [showRegisteredData, setShowRegisteredData] = useState(false);
  const [invitedData, setInvitedData] = useState([]);
  const [showInvitedData, setShowInvitedData] = useState(false);

  useEffect(() => {
    getCheckMaxInvite();
    getInvitationListFriend();
  }, [getInvitationListFriend, getCheckMaxInvite]);

  useEffect(() => {
    if (userData?.userParty || getCheckMaxInviteResponse?.role) {
      setLimitedUser(false);
    } else {
      setLimitedUser(true);
    }
  }, [userData, getCheckMaxInviteResponse]);

  useEffect(() => {
    if (isFocused) {
      getInvitationListFriend();
    }
  }, [getInvitationListFriend, isFocused]);

  useEffect(() => {
    if (getInvitationListFriendStateResponse?.data) {
      setInvitationList(getInvitationListFriendStateResponse?.data);
    }
  }, [getInvitationListFriendStateResponse]);

  useEffect(() => {
    if (invitationList?.listFriends) {
      const newArr = invitationList?.listFriends?.map((item) => {
        return setPhoneFormat(item?.phoneNo);
      });
      if (isFocused) {
        getCheckStatusRegister(newArr);
      }
    }
  }, [getCheckStatusRegister, invitationList, isFocused]);

  useEffect(() => {
    getContacts(
      trans(locale, lang, 'contactPermissionTitle'),
      trans(locale, lang, 'contactPermissionMessage')
    ).then((c) => setNumListCheck(c));
  }, [lang]);

  // progress on calling api -- loading
  useEffect(() => {
    if (isFocused) {
      onGetReferralData(invitationAction);
    }
  }, [onGetReferralData, invitationAction, isFocused]);

  const onGetReferralData = useCallback(
    (action) => {
      // invitation link status
      if (action === GET_INVITATION_LIST_FRIEND) {
        setLoading(true);
      }
      if (action === GET_INVITATION_LIST_FRIEND_SUCCESS) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
      if (action === GET_INVITATION_LIST_FRIEND_FAILED) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
      if (action === GET_CHECK_STATUS_REGISTER) {
        setLoading(true);
      }
      if (action === GET_CHECK_STATUS_REGISTER_SUCCESS) {
        setLoading(false);
      }
      if (action === GET_CHECK_STATUS_REGISTER_FAILED) {
        setLoading(false);
      }
      if (action === GET_ADDLINK_SUCCESS) {
        getCheckStatusRegister([]);
        getInvitationListFriend();
        getAddLinkClear();
      }
      if (action === GET_ADDLINK_FAILED) {
        getAddLinkClear();
      }
    },
    [
      getAddLinkClear,
      getCheckStatusRegister,
      getInvitationListFriend,
      setLoading,
    ]
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getInvitationListFriend();
    setRefreshing(false);
  }, [getInvitationListFriend]);

  const NoInvite = useCallback(() => {
    return (
      <Shadow borderRadius={20} style={[style.sectionInvitation.container]}>
        <View style={[style.p16, style.center]}>
          <Image source={UserPlus} style={style.noInvite.image} />
          <Text
            textStyle="semi"
            align="center"
            size={Size.text.h6.size}
            color={Color.main.light.black}>
            {trans(locale, lang, 'belumMengundang')}
          </Text>
          <Text
            style={style.mv15}
            align="center"
            size={Size.text.body2.size}
            color={Color.neutral.light.neutral40}>
            {trans(locale, lang, 'ayoUndangTeman')}
          </Text>
        </View>
      </Shadow>
    );
  }, [lang]);

  // send sms
  const shareInvitationLink = useCallback(
    async (num) => {
      const theLinks =
        Config.TYPE === '-dev' || Config.TYPE === '-uat'
          ? 'https://lifecustomer.page.link/product-lifesaver-uat'
          : 'https://lifecustomer.page.link/product-lifesaver';
      const message = `${trans(locale, lang, 'smsMessage')}${theLinks}`;
      const separator = Platform.OS === 'ios' ? '&' : '?';
      const waUrl = `whatsapp://send?text=${message}&phone=${num}`;
      const url = `sms:${num}${separator}body=${message}`;
      try {
        await Linking.openURL(waUrl);
      } catch (error) {
        await Linking.openURL(url);
      }
    },
    [lang]
  );
  const onSharePress = useCallback(
    (num) => {
      if (num.length) {
        getAddLink({
          mobilePhoneNumber: num,
        });
      }
    },
    [getAddLink]
  );

  const ShareButton = useCallback(
    ({ onPress, disabled }) => {
      return (
        <View style={style.shareButton.container}>
          <TouchableWithoutFeedback disabled={disabled} onPress={onPress}>
            <LinearGradient
              style={style.shareButton.button}
              colors={['#F25D63', '#ED1C24']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}>
              <Text
                textStyle="semi"
                size={Size.text.body2.size}
                color={Color.main.light.white}>
                {trans(locale, lang, 'ajakTeman')}
              </Text>
              <Image
                style={style.shareButton.btnImage}
                source={ReferalSendIcon}
              />
            </LinearGradient>
          </TouchableWithoutFeedback>
          <SafeAreaView />
        </View>
      );
    },
    [lang]
  );

  const listTrack = [
    {
      key: '0',
      title: trans(locale, lang, 'shared'),
      icon: InvitationStatus1,
      data: invitationList?.totalShare,
    },
    {
      key: '1',
      title: trans(locale, lang, 'register'),
      icon: InvitationStatus2,
      data: invitationList?.totalRegister,
    },
    {
      key: '2',
      title: trans(locale, lang, 'berlangganan'),
      subtitle: `(${trans(locale, lang, 'referensiKamu')})`,
      icon: InvitationStatus3,
      data: invitationList?.totalSubByYou,
    },
    {
      key: '3',
      title: trans(locale, lang, 'berlangganan'),
      subtitle: `(${trans(locale, lang, 'referensiOrang')})`,
      icon: InvitationStatus4,
      data: invitationList?.totalSubByOther,
    },
  ];

  function renderListTrack() {
    return (
      <View style={style.sectionInvitation.container}>
        <Text textStyle="semi" style={style.listTrack.title}>
          {trans(locale, lang, 'informasiStatus')}
        </Text>
        <Shadow borderRadius={25}>
          <View style={style.p16}>
            <View style={style.listInvitation.container}>
              <View style={style.listTrack.columnList}>
                {listTrack.map((val) => (
                  <View style={style.listTrack.columnList} key={val.key}>
                    <View style={style.listTrack.rowList}>
                      <Image source={val.icon} style={style.listTrack.image} />
                      <View style={style.listInvitation.listUser}>
                        <View style={style.fxCol}>
                          <Text textStyle="semi">{val.title}</Text>
                          {val.subtitle && (
                            <Text textStyle="semi">{val.subtitle}</Text>
                          )}
                        </View>
                      </View>

                      <View style={style.listInvitation.userStatus}>
                        <Text
                          textStyle="medium"
                          size={Size.text.body1.size}
                          color={Color.red.dark.red90}>
                          {val.data}
                        </Text>
                      </View>
                    </View>
                    {val.key + 1 !== listTrack.length ? (
                      <View style={style.listTrack.divider} />
                    ) : null}
                  </View>
                ))}
              </View>
            </View>
          </View>
        </Shadow>
      </View>
    );
  }

  function renderListTab() {
    return (
      <View style={style.headerTab.container}>
        <View style={style.headStyle.itemContainer}>
          <TouchableOpacity
            onPress={() => setActiveTabs(1)}
            style={
              isActiveTabs === 1
                ? style.headerTab.menuTitleActive
                : style.headerTab.menuTitle
            }>
            <Text
              textStyle="medium"
              size={Size.text.body2.size}
              color={Color.badgeMagenta.dark.badgeMagenta}>
              {trans(locale, lang, 'ringkasan')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={style.headStyle.itemContainer}>
          <TouchableOpacity
            onPress={() => setActiveTabs(2)}
            style={
              isActiveTabs === 2
                ? style.headerTab.menuTitleActive
                : style.headerTab.menuTitle
            }>
            <Text
              textStyle="medium"
              size={Size.text.body2.size}
              color={Color.badgeMagenta.dark.badgeMagenta}>
              {trans(locale, lang, 'daftarUndangan')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderListInvitation(item) {
    let value = item;

    if (item.index || item.index === 0) {
      value = item.item;
    }
    const {
      phoneNo,
      thumbnailPhotoKey,
      statusRegister,
      productName,
      policyNumber,
      statusPolicy,
      isInvitedByYou,
      overrideStatusPolicy,
      createdAt,
    } = value;
    const isSubscribed = statusRegister && productName;
    const activeSubs =
      isSubscribed &&
      (statusPolicy === POLICY_STATUS.active ||
        statusPolicy === POLICY_STATUS.gracePeriod ||
        overrideStatusPolicy === POLICY_STATUS.active ||
        overrideStatusPolicy === POLICY_STATUS.gracePeriod);
    const isRegistered = statusRegister && !productName;
    const contact = numListCheck.find((e) => e.number === phoneNo);
    return (
      <View key={`key${phoneNo}`} style={style.listInvitation.container}>
        <View style={style.listInvitation.columnList}>
          <View style={style.listInvitation.rowList}>
            {thumbnailPhotoKey !== '' && thumbnailPhotoKey !== null ? (
              <Image
                style={style.listInvitation.userImage}
                source={{
                  uri: `${BASE_URL}${API.USER.photoThumbnail}/${thumbnailPhotoKey}`,
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }}
                width={42}
                height={42}
                resizeMode="cover"
              />
            ) : (
              <DummyProfile
                width={42}
                height={42}
                style={style.listInvitation.userImage}
              />
            )}
            <View style={style.listInvitation.listUser}>
              {contact?.name ? (
                <View>
                  <Text
                    numberOfLines={1}
                    style={style.shrink}
                    ellipsizeMode="tail"
                    textStyle="semi">
                    {contact?.name}
                  </Text>
                  <Text
                    textStyle="medium"
                    color={Color.neutralLifeSaver.light.neutral40}
                    size={Size.text.caption1.size}
                    line={22}>
                    {phoneNo}
                  </Text>
                </View>
              ) : (
                <Text textStyle="semi">{phoneNo}</Text>
              )}
            </View>

            <>
              <View
                style={[
                  style.listInvitation.userStatus,
                  {
                    backgroundColor:
                      isSubscribed &&
                      (statusPolicy === POLICY_STATUS.active ||
                        overrideStatusPolicy === POLICY_STATUS.active ||
                        statusPolicy === POLICY_STATUS.gracePeriod ||
                        overrideStatusPolicy === POLICY_STATUS.gracePeriod)
                        ? Color.greenBackground.light.greenBackground20
                        : isRegistered
                        ? Color.yellowWarning.light.color
                        : Color.neutral.light.neutral20,
                  },
                ]}>
                <Text
                  textStyle="medium"
                  size={Size.text.caption1.size}
                  color={
                    isSubscribed &&
                    (statusPolicy === POLICY_STATUS.active ||
                      overrideStatusPolicy === POLICY_STATUS.active ||
                      statusPolicy === POLICY_STATUS.gracePeriod ||
                      overrideStatusPolicy === POLICY_STATUS.gracePeriod)
                      ? Color.greenActive.light.color
                      : isRegistered
                      ? Color.warning.light.warning90
                      : Color.neutral.light.neutral40
                  }>
                  {isSubscribed
                    ? trans(locale, lang, 'subscribe')
                    : isRegistered
                    ? trans(locale, lang, 'register')
                    : trans(locale, lang, 'shared')}
                </Text>
              </View>
              {!isSubscribed || !activeSubs ? (
                <TouchableOpacity
                  onPress={() => {
                    shareInvitationLink(phoneNo);
                    onSharePress([phoneNo]);
                  }}
                  style={style.fxRow}>
                  <View style={style.listInvitation.resendBtn} />
                  <SendRed />
                </TouchableOpacity>
              ) : null}
            </>
          </View>
          <View style={style.listInvitation.rowList}>
            <View style={style.listInvitation.columnList}>
              {isSubscribed && policyNumber ? (
                <View>
                  <Text
                    textStyle="medium"
                    color={Color.neutralLifeSaver.light.neutral40}
                    size={Size.text.body2.size}
                    line={22}>
                    {trans(locale, lang, 'nomorUndangan')}
                  </Text>
                  <Text
                    textStyle="semi"
                    color={Color.neutralLifeSaver.light.neutral40}
                    size={Size.text.body2.size}
                    line={22}>
                    {policyNumber}
                  </Text>
                </View>
              ) : null}
            </View>
            <View>
              {productName === 'LifeSAVER' && isInvitedByYou ? (
                <Image source={LifeSaverLogo} style={style.lifeSaverLogo} />
              ) : null}
              {productName === 'LifeSAVER+' && isInvitedByYou ? (
                <Image
                  source={LifeSaverLogoPlus}
                  style={style.lifeSaverLogoPlus}
                />
              ) : null}
              {productName === 'LifeSAVER POS' && isInvitedByYou ? (
                <Image source={LogoLifesaverPosSuccess} style={style.lifeSaverPOS} />
              ) : null}
              {productName === 'LifeSAVERPOS' && isInvitedByYou ? (
                <Image source={LogoLifesaverPosSuccess} style={style.lifeSaverPOS} />
              ) : null}
            </View>
          </View>
          {isSubscribed ? (
            <View>
              <HorizontalLine height={1} />
              <View style={style.listInvitation.rowReference}>
                {statusPolicy === POLICY_STATUS.active && isInvitedByYou ? (
                  <Text
                    textStyle="medium"
                    color={Color.primary.light.primary90}
                    size={Size.text.body2.size}
                    line={22}>
                    {trans(locale, lang, statusPolicy)}
                  </Text>
                ) : (
                  <Text
                    textStyle="medium"
                    color={Color.neutralLifeSaver.light.neutral40}
                    size={Size.text.body2.size}
                    line={22}>
                    {trans(locale, lang, statusPolicy)}
                  </Text>
                )}
                {isInvitedByYou ? (
                  <Text
                    textStyle="medium"
                    color={Color.neutralLifeSaver.light.neutral40}
                    size={Size.text.caption1.size}
                    line={22}>
                    {trans(locale, lang, 'referensiKamu')}
                  </Text>
                ) : (
                  <Text
                    textStyle="medium"
                    color={Color.neutralLifeSaver.light.neutral40}
                    size={Size.text.caption1.size}
                    line={22}>
                    {trans(locale, lang, 'referensiOrang')}
                  </Text>
                )}
              </View>
            </View>
          ) : (
            <View>
              <Text
                textStyle="medium"
                color={Color.neutralLifeSaver.light.neutral40}
                size={Size.text.caption1.size}
                line={22}>
                {trans(locale, lang, 'diundangPada')}
                {moment(createdAt).format('DD MMM YY')}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }

  useEffect(() => {
    setRegisteredData(
      invitationList?.listFriends.filter((data) => !data.productName)
    );
    setInvitedData(
      invitationList?.listFriends.filter((data) => data.productName)
    );
  }, [invitationList]);

  return (
    <>
      <Base
        statusBarStyle="light-content"
        bgImage={ReferalBg}
        bgImageStyle={{
          width: Size.screen.width,
        }}
        isLight
        backgroundColor={Color.lightGray.light.lightGray}
        isPaddingBottom={false}
        title={trans(locale, lang, 'ajakTeman')}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onBackPress={() => navigation.goBack()}>
        <ReferalHead {...props} loyalityPoint={0} />
        {renderListTab()}
        {isActiveTabs === 1 ? (
          <>
            <ReferalSteps
              {...props}
              totalShare={invitationList?.totalShare || 0}
              totalRegister={invitationList?.totalRegister || 0}
              totalSubByYou={invitationList?.totalSubByYou || 0}
              totalSubByOther={invitationList?.totalSubByOther || 0}
            />
            <View style={style.divider} />
            {renderListTrack()}
            <View style={style.sectionInvitation.container}>
              <View style={style.sectionInvitation.invite}>
                <Text textStyle="semi">
                  {trans(locale, lang, 'sisaUndangan')}
                </Text>
                <Text
                  textStyle="medium"
                  size={Size.text.body2.size}
                  color={Color.red.dark.red90}>
                  {limitedUser
                    ? `${
                        invitationLimit - invitationList?.weeklyInvite
                      }/${invitationLimit}`
                    : 'Unlimited'}
                </Text>
              </View>
              {limitedUser && (
                <Shadow
                  borderRadius={18}
                  style={style.informationLimit.container}>
                  <View style={style.informationLimit.content}>
                    <Image
                      source={InvitaionInfo}
                      // eslint-disable-next-line react-native/no-inline-styles
                      style={{ width: 20, height: 20 }}
                      resizeMode="contain"
                    />
                    <Text
                      size={Size.text.caption1.size}
                      color={Color.neutral.light.neutral40}
                      style={style.ml5}>
                      {trans(locale, lang, 'kuotaAjakTeman')}
                    </Text>
                  </View>
                </Shadow>
              )}
            </View>
          </>
        ) : invitationList?.listFriends?.length ? (
          <View style={style.sectionInvitation.container}>
            {registeredData.length && registeredData.length > 0 ? (
              <Text textStyle="semi" style={style.mt16}>
                {trans(locale, lang, 'terproteksiDanTerdaftar')}
              </Text>
            ) : null}
            {showRegisteredData
              ? registeredData.map((val) => (
                <Shadow
                    key={val.phoneNo}
                    borderRadius={25}
                    style={style.mt16}>
                    <View style={style.listInvitation.content}>
                    {renderListInvitation(val)}
                  </View>
                  </Shadow>
                ))
              : registeredData
                  .filter((val, idx) => idx < 2)
                  .map((val) => (
                    <Shadow
                      borderRadius={25}
                      style={style.mt16}
                      key={val.phoneNo}>
                      <View style={style.listInvitation.content}>
                        {renderListInvitation(val)}
                      </View>
                    </Shadow>
                  ))}
            {registeredData.length > 2 ? (
              <TouchableOpacity
                onPress={() => setShowRegisteredData(!showRegisteredData)}>
                <Text
                  textStyle="semi"
                  color={Color.red.light.red90}
                  style={style.listInvitation.expandText}>
                  {!showRegisteredData
                    ? trans(locale, lang, 'lihatSemua')
                    : trans(locale, lang, 'lihatSedikit')}
                </Text>
              </TouchableOpacity>
            ) : null}

            {invitedData.length && invitedData.length > 0 ? (
              <Text textStyle="semi" style={style.mt16}>
                {trans(locale, lang, 'subscribe')}
              </Text>
            ) : null}
            {showInvitedData
              ? invitedData.map((val) => (
                <Shadow
                    borderRadius={25}
                    style={style.mt16}
                    key={val.phoneNo}>
                    <View style={style.listInvitation.content}>
                    {renderListInvitation(val)}
                  </View>
                  </Shadow>
                ))
              : invitedData
                  .filter((val, idx) => idx < 2)
                  .map((val) => (
                    <Shadow
                      borderRadius={25}
                      style={style.mt16}
                      key={val.phoneNo}>
                      <View style={style.listInvitation.content}>
                        {renderListInvitation(val)}
                      </View>
                    </Shadow>
                  ))}
            {invitedData.length > 2 ? (
              <TouchableOpacity
                onPress={() => setShowInvitedData(!showInvitedData)}>
                <Text
                  textStyle="semi"
                  color={Color.red.light.red90}
                  style={style.listInvitation.expandText}>
                  {!showInvitedData
                    ? trans(locale, lang, 'lihatSemua')
                    : trans(locale, lang, 'lihatSedikit')}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ) : (
          <NoInvite />
        )}
      </Base>
      <ShareButton
        onPress={() => {
          navigation.navigate(NAVIGATION.INVITATION.InvitationContacts);
        }}
      />
    </>
  );
}

export default InvitationMain;

InvitationMain.propTypes = {
  //   colorScheme: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  getInvitationListFriend: PropTypes.func.isRequired,
  invitationAction: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired,
  userData: PropTypes.objectOf(Object).isRequired,
  getInvitationListFriendStateResponse: PropTypes.objectOf(Object).isRequired,
  getCheckMaxInvite: PropTypes.func.isRequired,
  getCheckMaxInviteResponse: PropTypes.objectOf(Object).isRequired,
  appConfig: PropTypes.objectOf(Object).isRequired,
  getCheckStatusRegister: PropTypes.func.isRequired,
  getAddLink: PropTypes.func.isRequired,
  getAddLinkClear: PropTypes.func.isRequired,
};
