import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Base15 from 'ca-component-container/Base15';
import { trans } from 'ca-util/trans';
import Shadow from 'ca-component-container/Shadow';
import {
  View,
  Platform,
  FlatList,
  TextInput,
  TouchableOpacity,
  Linking,
  Image,
  // eslint-disable-next-line react-native/split-platform-components
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {
  LifeSaverLogo,
  LifeSaverLogoPlus,
  LogoLifesaverPos,
  LogoLifesaverPosSuccess,
} from 'ca-config/Image';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import { Refresh, SendRed, Search } from 'ca-config/Svg';
import {
  GET_CHECK_STATUS_REGISTER,
  GET_CHECK_STATUS_REGISTER_SUCCESS,
  GET_CHECK_STATUS_REGISTER_FAILED,
  GET_ADDLINK,
  GET_ADDLINK_SUCCESS,
  GET_ADDLINK_FAILED,
  GET_INVITATION_LIST_FRIEND,
  GET_INVITATION_LIST_FRIEND_FAILED,
  GET_INVITATION_LIST_FRIEND_SUCCESS,
  GET_CHECK_MAX_INVITE,
  GET_CHECK_MAX_INVITE_FAILED,
  GET_CHECK_MAX_INVITE_SUCCESS,
} from 'ca-module-invitation/invitationConstant';
import { codeLifesaver, POLICY_STATUS } from 'ca-util/constant';
import { setPhoneFormat } from 'ca-util/format';
import _ from 'lodash';
import Config from 'react-native-config';
import Contacts from 'react-native-contacts';
import LinearGradient from 'react-native-linear-gradient';
import style from './style';
import locale from './locale';
import InvitationSuccess from './components/InvitationSuccess';
import RenderAlert from './components/RenderAlert';

function InvitationContacts(props) {
  const {
    navigation,
    lang,
    getShareCount,
    setLoading,
    invitationAction,
    getAddLink,
    getAddLinkClear,
    getCheckStatusRegister,
    getCheckStatusRegisterClear,
    getCheckStatusRegisterStateResponse,
    getInvitationListFriend,
    getInvitationListFriendStateResponse,
    // getInvitationListFriendStateError,
    getInvitationListFriendClear,
    userData,
    // getCheckAlreadyInvite,
    getCheckMaxInviteResponse,
    getCheckMaxInvite,
    appConfig: { features },
  } = props;
  const [filteredContact, setFilteredContact] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [tmpKeyword, setTmpKeyword] = useState('');
  const [listForShow, setListForShow] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [numListCheck, setNumListCheck] = useState([]);
  const [registeredList, setRegisteredList] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [addLinkError, setAddLinkError] = useState(false);
  const [statusRegisterError, setStatusRegisterError] = useState(false);
  const [registeredManual, setRegisteredManual] = useState([]);

  // -- CHECK USER ROLE FOR MAX INVITE LIMIT
  const [limitedUser, setLimitedUser] = useState(null);
  const [maxInvite, setMaxInvite] = useState(0);
  const [maxInviteFailed, setMaxInviteFailed] = useState(false);
  const [invitationLimit] = useState(features?.invitationLimit || 10);

  useEffect(() => {
    getContact();
  }, [getContact]);

  const getContact = useCallback(async () => {
    if (Platform.OS === 'android') {
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      );
      if (status === 'denied' || status === 'never_ask_again') {
        return;
      }
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: trans(locale, lang, 'contactPermissionTitle'),
        message: trans(locale, lang, 'contactPermissionMessage'),
      }).then(() => {
        getCheckMaxInvite();
        getInvitationListFriend();
      });
    }
    if (Platform.OS === 'ios') {
      Contacts.checkPermission().then((res) => {
        if (res !== 'authorized') {
          Alert.alert(
            'Info',
            'Please allow contact permission to use our feature',
            [
              {
                text: 'Open',
                onPress: () => {
                  Linking.openURL('app-settings://notification/idlifecustomer');
                },
              },
            ],
            { cancelable: false }
          );
        }
        getCheckMaxInvite();
        getInvitationListFriend();
      });
    }
  }, [getCheckMaxInvite, getInvitationListFriend, lang]);

  useEffect(() => {
    if (userData?.userParty || getCheckMaxInviteResponse?.role) {
      setLimitedUser(false);
    } else {
      setLimitedUser(true);
    }
  }, [userData, getCheckMaxInviteResponse]);

  useEffect(() => {
    if (getInvitationListFriendStateResponse?.data?.weeklyInvite) {
      setMaxInvite(getInvitationListFriendStateResponse.data.weeklyInvite);
      setMaxInviteFailed(false);
    } else {
      setMaxInviteFailed(true);
    }
  }, [getInvitationListFriendStateResponse, lang]);

  // if user limited
  const [maxInviteLength, setMaxInviteLength] = useState(0);
  const [limitedInvite, setLimitedInvite] = useState(null);
  useEffect(() => {
    setMaxInviteLength(maxInvite + listForShow?.length);
    if (limitedUser && maxInviteLength && invitationLimit) {
      setLimitedInvite(limitedUser && invitationLimit - maxInviteLength <= 0);
    }
  }, [maxInvite, listForShow, limitedUser, maxInviteLength, invitationLimit]);

  // -- on searched number list changes
  useEffect(() => {
    if (numListCheck?.length && !notFound && searchKeyword.length) {
      getCheckStatusRegister(numListCheck);
    }
    if (notFound && searchKeyword.length && searchKeyword !== ' ') {
      const number = setPhoneFormat(searchKeyword);
      getCheckStatusRegister([number]);
    }
  }, [getCheckStatusRegister, notFound, numListCheck, searchKeyword]);

  // ! do not move this to action yet
  useEffect(() => {
    if (getCheckStatusRegisterStateResponse?.invitationList?.length) {
      setRegisteredList(getCheckStatusRegisterStateResponse.invitationList);
      setRegisteredManual(getCheckStatusRegisterStateResponse.invitationList);
    } else {
      setRegisteredList([]);
    }
  }, [getCheckStatusRegisterStateResponse]);

  // compare existing contacts with datas from api
  useEffect(() => {
    if (filteredContact?.length && registeredList?.length) {
      const newRegisteredList = registeredList.map((item) => {
        return _.omit(item, 'name');
      });
      const mergedData = filteredContact?.map((item) => ({
        ...item,
        ...newRegisteredList.find((comp) => comp.phoneNo === item.number),
      }));
      if (mergedData.length) {
        setFilteredContact(mergedData);
        setNotFound(false);
      }
    }
  }, [filteredContact, registeredList]);

  const search = useCallback(async (text) => {
    if (text === '' || text === null || text === ' ') {
      return [setFilteredContact([]), setNotFound(false)];
    }
    setSearchKeyword(text);
    // number search
    const phoneNumberRegex =
      // eslint-disable-next-line no-useless-escape
      /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    if (phoneNumberRegex.test(text)) {
      const formattedText = setPhoneFormat(text);
      const result = await Contacts.getContactsByPhoneNumber(formattedText);
      if (result.length > 0) {
        let res = [];
        if (Platform.OS === 'android') {
          res = result
            .map((c) => {
              return c.phoneNumbers.map((p) => {
                return {
                  name: `${c?.displayName}`.trimEnd(),
                  number: setPhoneFormat(String(p.number)),
                };
              });
            })
            .reduce((a, b) => a.concat(b), []);
        }
        if (Platform.OS === 'ios') {
          res = result
            .map((c) => {
              return c.phoneNumbers.map((p) => {
                return {
                  name: `${c?.givenName}`.trimEnd(),
                  number: setPhoneFormat(String(p.number)),
                };
              });
            })
            .reduce((a, b) => a.concat(b), []);
        }
        const onlyNums = res.map((f) => f.number);
        const filtered = _.uniqWith(res, _.isEqual);
        return [
          setFilteredContact(filtered),
          setNotFound(false),
          setNumListCheck(onlyNums),
        ];
      }
      return [setFilteredContact([]), setNotFound(true)];
    }
    // string search
    if (!phoneNumberRegex.test(text)) {
      const result = await Contacts.getContactsMatchingString(text);
      if (result.length > 0) {
        let res = [];
        if (Platform.OS === 'android') {
          res = result
            .map((c) => {
              return c.phoneNumbers.map((p) => {
                return {
                  name: `${c?.displayName}`.trimEnd(),
                  number: setPhoneFormat(String(p.number)),
                };
              });
            })
            .reduce((a, b) => a.concat(b), []);
        }
        if (Platform.OS === 'ios') {
          res = result
            .map((c) => {
              return c.phoneNumbers.map((p) => {
                return {
                  name: `${c?.givenName} ${c?.familyName}`.trimEnd(),
                  number: setPhoneFormat(String(p.number)),
                };
              });
            })
            .reduce((a, b) => a.concat(b), []);
        }
        const onlyNums = res.map((f) => f.number);
        const filtered = _.uniqWith(res, _.isEqual);
        return [
          setFilteredContact(filtered),
          setNotFound(false),
          setNumListCheck(onlyNums),
        ];
      }
      return [setFilteredContact([]), setNotFound(false)];
    }
    return [setFilteredContact([]), setNotFound(true)];
  }, []);
  // send whatsapp
  const onSendPress = useCallback(
    async (num) => {
      const theLinks =
        Config.TYPE === '-dev' || Config.TYPE === '-uat'
          ? 'https://lifecustomer.page.link/product-lifesaver-uat'
          : 'https://lifecustomer.page.link/product-lifesaver';
      const message = `${trans(locale, lang, 'smsMessage')}${theLinks}`;
      const separator = Platform.OS === 'ios' ? '&' : '?';
      // const numbers = num.join(', ');
      const waUrl = `whatsapp://send?text=${message}&phone=${num}`;
      const smsUrl = `sms:${num}${separator}body=${message}`;
      const delayDebounceFn = setTimeout(() => {
        setAddSuccess(false);
      }, 1000);
      try {
        await Linking.openURL(waUrl);
      } catch (error) {
        await Linking.openURL(smsUrl);
      }
      return () => clearTimeout(delayDebounceFn);
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

  // progress on calling api -- loading
  useEffect(() => {
    onGetShare(invitationAction);
  }, [onGetShare, invitationAction, getShareCount]);

  const onGetShare = useCallback(
    (action) => {
      if (action === GET_CHECK_STATUS_REGISTER) {
        setLoading(true);
      }
      if (action === GET_CHECK_STATUS_REGISTER_SUCCESS) {
        setLoading(false);
        setStatusRegisterError(false);
        getCheckStatusRegisterClear();
      }
      if (action === GET_CHECK_STATUS_REGISTER_FAILED) {
        setLoading(false);
        setStatusRegisterError(true);
        getCheckStatusRegisterClear();
      }
      // on get add link
      if (action === GET_ADDLINK) {
        setLoading(true);
      }
      if (action === GET_ADDLINK_SUCCESS) {
        getCheckStatusRegister([]);
        onSendPress(selectedNumber);
        search(tmpKeyword);
        getInvitationListFriend();
        setLoading(false);
        setAddSuccess(true);
        setAddLinkError(false);
        setListForShow([]);
        setSelectedNumber(null);
        getAddLinkClear();
        getInvitationListFriendClear();
      }
      if (action === GET_ADDLINK_FAILED) {
        setLoading(false);
        getAddLinkClear();
      }
      // get total invited user
      if (action === GET_INVITATION_LIST_FRIEND) {
        setLoading(true);
      }
      if (action === GET_INVITATION_LIST_FRIEND_SUCCESS) {
        setMaxInviteFailed(false);
        setLoading(false);
      }
      if (action === GET_INVITATION_LIST_FRIEND_FAILED) {
        setMaxInviteFailed(true);
        setLoading(false);
      }
      // get total invited user
      if (action === GET_CHECK_MAX_INVITE) {
        setLoading(true);
      }
      if (action === GET_CHECK_MAX_INVITE_FAILED) {
        setLoading(false);
      }
      if (action === GET_CHECK_MAX_INVITE_SUCCESS) {
        setLoading(false);
      }
    },
    [
      setLoading,
      getCheckStatusRegisterClear,
      getCheckStatusRegister,
      onSendPress,
      selectedNumber,
      search,
      tmpKeyword,
      getInvitationListFriend,
      getAddLinkClear,
      getInvitationListFriendClear,
    ]
  );

  const ListItem = useCallback(
    ({ item, manualNumber }) => {
      const idNum = setPhoneFormat(item?.number);
      const intlNum = setPhoneFormat(manualNumber);
      const isRegistered = item?.statusRegister || false;
      const productName = item?.productName || false;
      const StatusInvited = item?.StatusInvited;
      const maxInviteLgth = maxInvite + listForShow?.length;
      const limitedInv = limitedUser && invitationLimit - maxInviteLgth <= 0;
      const alreadyInvited = StatusInvited && !isRegistered;
      const statusPolicy = item?.statusPolicy;
      const isSubscribed =
        statusPolicy === POLICY_STATUS.active ||
        statusPolicy === POLICY_STATUS.gracePeriod;
      const alreadyInvitedBut =
        isRegistered &&
        statusPolicy !== POLICY_STATUS.active &&
        StatusInvited &&
        statusPolicy !== POLICY_STATUS.gracePeriod;
      const registeredBut =
        isRegistered &&
        !StatusInvited &&
        (statusPolicy === POLICY_STATUS.terminate ||
          statusPolicy === POLICY_STATUS.gracePeriod);

      return (
        <TouchableOpacity
          disabled={
            statusPolicy === POLICY_STATUS.active ||
            (statusRegisterError && !intlNum?.length) ||
            limitedInv ||
            maxInviteFailed
          }
          onPress={() => {
            setSelectedNumber(idNum);
            onSharePress([idNum]);
          }}>
          <View
            style={
              productName || alreadyInvited || alreadyInvitedBut
                ? style.listItem.containerError
                : style.listItem.container
            }>
            <View style={style.fx1}>
              {!manualNumber && item ? (
                <Text
                  textStyle="semi"
                  color={Color.neutral.light.neutral90}
                  style={style.mb5}
                  size={Size.text.body2.size}>
                  {`${item?.name}`}
                </Text>
              ) : (
                <Text
                  textStyle="semi"
                  color={Color.neutral.light.neutral90}
                  style={style.mb5}
                  size={Size.text.body2.size}>
                  {manualNumber}
                </Text>
              )}
              {item?.number && (
                <Text
                  textStyle="medium"
                  color={Color.neutralLifeSaver.light.neutral40}
                  size={Size.text.caption1.size}>
                  {`${item?.number}`}
                </Text>
              )}
            </View>
            <View style={[style.listItem.send]}>
              {productName === codeLifesaver.lifesaver.planName &&
              isSubscribed ? (
                <Image style={style.lifeSaverLogoPlus} source={LifeSaverLogo} />
              ) : null}
              {productName === codeLifesaver.lifesaverplus.planName &&
              isSubscribed ? (
                <Image
                  style={style.lifeSaverLogoPlus}
                  source={LifeSaverLogoPlus}
                />
              ) : null}
              {productName === codeLifesaver.lifesaverpos.planName &&
              isSubscribed ? (
                <Image
                  style={style.lifeSaverPOS}
                  source={LogoLifesaverPosSuccess}
                />
              ) : null}
              {productName === codeLifesaver.lifesaverpos.planNameAlt &&
              isSubscribed ? (
                <Image
                  style={style.lifeSaverPOS}
                  source={LogoLifesaverPosSuccess}
                />
              ) : null}
              {!isSubscribed ? <SendRed /> : null}
            </View>
          </View>
          <View style={style.errorContainer}>
            {(productName && statusPolicy === POLICY_STATUS.active) ||
            statusPolicy === POLICY_STATUS.gracePeriod ? (
              <Text
                line={20}
                color={Color.primary.light.primary90}
                size={Size.text.caption2.size}>
                {trans(locale, lang, 'nomorIniSudahBerlangganan')}
                {productName === codeLifesaver.lifesaver.planName
                  ? trans(locale, lang, 'lifesaver')
                  : null}
                {productName === codeLifesaver.lifesaverplus.planName
                  ? trans(locale, lang, 'lifesaverplus')
                  : null}
                {productName === codeLifesaver.lifesaverpos.planName
                  ? trans(locale, lang, 'lifesaverpos')
                  : null}
                {productName === codeLifesaver.lifesaverpos.planNameAlt
                  ? trans(locale, lang, 'lifesaverpos')
                  : null}
              </Text>
            ) : null}

            {alreadyInvitedBut ? (
              <Text
                line={20}
                color={Color.primary.light.primary90}
                size={Size.text.caption2.size}>
                {trans(locale, lang, 'thisNumberAlreadyInvitedBut')}
                {trans(locale, lang, 'lifesaver')}
              </Text>
            ) : null}

            {alreadyInvited ? (
              <Text
                line={20}
                color={Color.primary.light.primary90}
                size={Size.text.caption2.size}>
                {trans(locale, lang, 'nomorIniSudahTerundangDan')}
              </Text>
            ) : null}
            {registeredBut ? (
              <Text
                line={20}
                color={Color.primary.light.primary90}
                size={Size.text.caption2.size}>
                {trans(locale, lang, 'nomorIniSudahTerdaftarDan')}
                {trans(locale, lang, 'lifesaver')}
              </Text>
            ) : null}
          </View>
        </TouchableOpacity>
      );
    },
    [
      invitationLimit,
      lang,
      limitedUser,
      listForShow?.length,
      maxInvite,
      maxInviteFailed,
      onSharePress,
      statusRegisterError,
    ]
  );

  const ListItemManual = useCallback(
    ({ manualNumber, itemManual }) => {
      const intlNum = setPhoneFormat(manualNumber);
      const isRegistered = itemManual?.statusRegister || false;
      const productName = itemManual?.productName || false;
      const StatusInvited = itemManual?.StatusInvited || false;
      const maxInviteLgth = maxInvite + listForShow?.length;
      const limitedInv = limitedUser && invitationLimit - maxInviteLgth <= 0;
      const alreadyInvited = StatusInvited && !isRegistered;
      const statusPolicy = itemManual?.statusPolicy;
      const isSubscribed =
        statusPolicy === POLICY_STATUS.active ||
        statusPolicy === POLICY_STATUS.gracePeriod;
      const alreadyInvitedBut =
        isRegistered &&
        statusPolicy !== POLICY_STATUS.active &&
        StatusInvited &&
        statusPolicy !== POLICY_STATUS.gracePeriod;
      const registeredBut =
        isRegistered &&
        !StatusInvited &&
        !statusPolicy ||
        (statusPolicy === POLICY_STATUS.terminate ||
          statusPolicy === POLICY_STATUS.gracePeriod);
      return (
        <TouchableOpacity
          disabled={
            statusPolicy === POLICY_STATUS.active ||
            (statusRegisterError && !intlNum?.length) ||
            limitedInv ||
            maxInviteFailed
          }
          onPress={() => {
            setSelectedNumber(intlNum);
            onSharePress([intlNum]);
          }}>
          <View
            style={
              productName
                ? style.listItem.containerError
                : style.listItem.container
            }>
            <View style={style.fx1}>
              <Text
                textStyle="semi"
                color={Color.neutral.light.neutral90}
                style={style.mb5}
                size={Size.text.body2.size}>
                {manualNumber}
              </Text>
            </View>
            <View style={[style.listItem.send]}>
              {productName === codeLifesaver.lifesaver.planName &&
              isSubscribed ? (
                <Image style={style.lifeSaverLogoPlus} source={LifeSaverLogo} />
              ) : null}
              {productName === codeLifesaver.lifesaverplus.planName &&
              isSubscribed ? (
                <Image
                  style={style.lifeSaverLogoPlus}
                  source={LifeSaverLogoPlus}
                />
              ) : null}
              {productName === codeLifesaver.lifesaverpos.planName &&
              isSubscribed ? (
                <Image
                  style={style.lifeSaverPOS}
                  source={LogoLifesaverPosSuccess}
                />
              ) : null}
              {productName === codeLifesaver.lifesaverpos.planNameAlt &&
              isSubscribed ? (
                <Image
                  style={style.lifeSaverPOS}
                  source={LogoLifesaverPosSuccess}
                />
              ) : null}
              {!isSubscribed ? <SendRed /> : null}
            </View>
          </View>
          <View style={style.errorContainer}>
            {(productName && statusPolicy === POLICY_STATUS.active) ||
            statusPolicy === POLICY_STATUS.gracePeriod ? (
              <Text
                line={20}
                color={Color.primary.light.primary90}
                size={Size.text.caption2.size}>
                {trans(locale, lang, 'nomorIniSudahBerlangganan')}
                {productName === codeLifesaver.lifesaver.planName
                  ? trans(locale, lang, 'lifesaver')
                  : null}
                {productName === codeLifesaver.lifesaverplus.planName
                  ? trans(locale, lang, 'lifesaverplus')
                  : null}
                {productName === codeLifesaver.lifesaverpos.planName
                  ? trans(locale, lang, 'lifesaverpos')
                  : null}
                {productName === codeLifesaver.lifesaverpos.planNameAlt
                  ? trans(locale, lang, 'lifesaverpos')
                  : null}
              </Text>
            ) : null}
            {alreadyInvitedBut ? (
              <Text
                line={20}
                color={Color.primary.light.primary90}
                size={Size.text.caption2.size}>
                {trans(locale, lang, 'thisNumberAlreadyInvitedBut')}
                {trans(locale, lang, 'lifesaver')}
              </Text>
            ) : null}
            {alreadyInvited ? (
              <Text
                line={20}
                color={Color.primary.light.primary90}
                size={Size.text.caption2.size}>
                {trans(locale, lang, 'nomorIniSudahTerundangDan')}
              </Text>
            ) : null}
            {registeredBut ? (
              <Text
                line={20}
                color={Color.primary.light.primary90}
                size={Size.text.caption2.size}>
                {trans(locale, lang, 'nomorIniSudahTerdaftarDan')}
                {trans(locale, lang, 'lifesaver')}
              </Text>
            ) : null}
          </View>
        </TouchableOpacity>
      );
    },
    [
      invitationLimit,
      lang,
      limitedUser,
      listForShow?.length,
      maxInvite,
      maxInviteFailed,
      onSharePress,
      statusRegisterError,
    ]
  );

  const onRefreshPage = useCallback(() => {
    getInvitationListFriend();
    getCheckStatusRegister([]);
  }, [getCheckStatusRegister, getInvitationListFriend]);

  const RefreshPageBtn = useCallback(
    ({ onPress }) => {
      if (addLinkError || statusRegisterError || maxInviteFailed) {
        return (
          <TouchableOpacity onPress={onPress} style={style.reloadBtn}>
            <Refresh width={35} height={35} style={style.m16} />
            <Text textStyle="semi" color={Color.primary.light.primary90}>
              {trans(locale, lang, 'reload')}
            </Text>
          </TouchableOpacity>
        );
      }
      return null;
    },
    [addLinkError, lang, maxInviteFailed, statusRegisterError]
  );

  if (addSuccess) {
    return <InvitationSuccess {...props} />;
  }

  return (
    <Base15
      animated
      isScroll={false}
      title={trans(locale, lang, 'ajakTeman')}
      onBackPress={() => navigation.goBack()}>
      <RenderAlert
        lang={lang}
        addLinkError={addLinkError}
        statusRegisterError={statusRegisterError}
      />
      <Shadow borderRadius={16} style={style.searchCard.container}>
        <View style={style.m16}>
          <View style={style.mb16}>
            <Text
              textStyle="semi"
              size={Size.text.body2.size}
              line={21}
              letterSpacing={0.5}
              align="center"
              color={Color.neutral.light.neutral80}>
              {trans(locale, lang, 'ajakTemanKamuUntukIkut')}
            </Text>
          </View>
          <View
            style={
              limitedInvite
                ? style.searchCard.searchContainerError
                : style.searchCard.searchContainer
            }>
            <TextInput
              height={40}
              onEndEditing={(e) => {
                search(e.nativeEvent.text);
              }}
              onChangeText={(e) => setTmpKeyword(e)}
              placeholder={trans(locale, lang, 'ketikNamaAtauNomorHp')}
              style={style.textInput}
            />
            <TouchableOpacity onPress={() => search(tmpKeyword)}>
              <LinearGradient
                style={style.searchCard.searchBtn}
                useAngle
                angle={99}
                colors={[
                  Color.badgeMagenta.light.badgeMagenta,
                  Color.red.light.red90,
                ]}>
                <Search />
              </LinearGradient>
            </TouchableOpacity>
          </View>
          {limitedInvite ? (
            <Text
              textStyle="semi"
              size={Size.text.caption2.size}
              color={Color.primary.light.primary90}>
              {trans(locale, lang, 'batasAjakTeman')}
            </Text>
          ) : null}
        </View>
      </Shadow>
      {notFound && searchKeyword ? (
        <View style={style.flatList}>
          <ListItemManual
            manualNumber={searchKeyword}
            itemManual={registeredManual[0]}
          />
        </View>
      ) : null}
      {searchKeyword.length === 0 ? (
        <RefreshPageBtn onPress={() => onRefreshPage()} />
      ) : null}
      <FlatList
        keyboardShouldPersistTaps="always"
        data={filteredContact}
        renderItem={(item) => {
          return <ListItem key={item.item.recordID} item={item.item} />;
        }}
        contentContainerStyle={style.flatList}
      />
    </Base15>
  );
}

export default InvitationContacts;

InvitationContacts.propTypes = {
  lang: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  getShareCount: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  invitationAction: PropTypes.string.isRequired,
  getCheckAlreadyInvite: PropTypes.func.isRequired,
  getCheckAlreadySubscribe: PropTypes.func.isRequired,
  getInvitationLinkStateResponse: PropTypes.objectOf(Object).isRequired,
  getAddLink: PropTypes.func.isRequired,
  getAddLinkClear: PropTypes.func.isRequired,
  getCheckStatusRegister: PropTypes.func.isRequired,
  getCheckStatusRegisterClear: PropTypes.func.isRequired,
  getCheckStatusRegisterStateResponse: PropTypes.objectOf(Object).isRequired,
  getInvitationListFriend: PropTypes.func.isRequired,
  getInvitationListFriendStateResponse: PropTypes.objectOf(Object).isRequired,
  userData: PropTypes.objectOf(Object).isRequired,
  getCheckMaxInviteResponse: PropTypes.objectOf(Object).isRequired,
  getCheckMaxInvite: PropTypes.func.isRequired,
  appConfig: PropTypes.objectOf(Object).isRequired,
  getInvitationListFriendClear: PropTypes.func.isRequired,
};
