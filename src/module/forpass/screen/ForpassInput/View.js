import React, {
  useCallback,
  useEffect,
  useState,
  useLayoutEffect,
  useRef,
} from 'react';
import { View, Alert, Image } from 'react-native';
import PropTypes from 'prop-types';
import Base from 'ca-component-container/Base';
import Input from 'ca-component-generic/Input';
import Text from 'ca-component-generic/Text';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import { Clock, Eye1, EyeOff1, Lock1 } from 'ca-config/Svg';
import { BadgeTick } from 'ca-config/Image';
import Size from 'ca-config/Size';
import Padder from 'ca-component-container/Padder';
import BottomSheet from 'ca-component-container/BottomSheet';
import { NAVIGATION } from 'ca-util/constant';
import Button from 'ca-component-generic/Button';
import {
  SET_RESET_PASSWORD_FAILED,
  SET_RESET_PASSWORD_SUCCESS,
} from 'ca-module-forpass/forpassConstant';
import { regexPassword } from 'ca-util/common';
import Style from './style';
import locale from './locale';

function ForpassInput(props) {
  const {
    navigation,
    route: { params },
    lang,
    colorScheme,
    setResetPassword,
    setResetPasswordFailed,
    setResetPasswordClear,
    forpassAction,
    setProfileRequestOtpParam,
  } = props;

  const iconProps = {
    fill: Color.grayIcon[colorScheme].grayIcon,
    width: 24,
    height: 24,
  };

  const [password, setPassword] = useState(null);
  const [confPassword, setConfPassword] = useState(null);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [confPasswordVisibility, setConfPasswordVisibility] = useState(true);
  const [isSMVisible, setSMVisible] = useState(false);
  const [isExpiredModalVisible, setIsExpiredModalVisible] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  const [passwordMessage, setPasswordMessage] = useState(null);
  const [confPasswordMessage, setConfPasswordMessage] = useState(null);

  const [isValidPassword, setValidPassword] = useState(false);
  const [isValidConfPassword, setValidConfPassword] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    setResetPasswordResult(forpassAction);
  }, [forpassAction, setResetPasswordResult]);

  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setValidPassword(validatePassword(password));
    setValidConfPassword(validateConfPassword(confPassword));
  }, [password, confPassword, validateConfPassword]);

  const setResetPasswordResult = useCallback(
    (act) => {
      if (act === SET_RESET_PASSWORD_SUCCESS) {
        setIsSubmit(false);
        setSMVisible(true);
      }
      if (act === SET_RESET_PASSWORD_FAILED) {
        setIsSubmit(false);
        if (setResetPasswordFailed?.message.match('UNIQUE_LINK_EXPIRED')) {
          setIsExpiredModalVisible(true);
          setIsExpired(true);
          return;
        }
        if (setResetPasswordFailed?.message.match('INVALID_UNIQUE_LINK')) {
          setIsExpiredModalVisible(true);
          setIsExpired(false);
          return;
        }
        if (setResetPasswordFailed?.message.match('BAD_REQUEST')) {
          setValidPassword(false);
          setPasswordMessage({
            error: trans(locale, lang, 'passwordBadRequest'),
          });
          return;
        }
        Alert.alert('Warning', setResetPasswordFailed?.message);
      }
    },
    [lang, setResetPasswordFailed?.message]
  );

  function validatePassword(text) {
    if (text === null) {
      return null;
    }
    if (text.length < 1) {
      setPasswordMessage({ error: trans(locale, lang, 'passwordRequired') });
      return false;
    }
    if (!regexPassword.test(text)) {
      setPasswordMessage({
        error: trans(locale, lang, 'passwordInvalid'),
      });
      return false;
    }
    setPasswordMessage(null);
    return true;
  }

  const validateConfPassword = useCallback(
    (text) => {
      if (text === null) {
        return null;
      }
      if (text.length < 1) {
        setConfPasswordMessage({
          error: trans(locale, lang, 'confPasswordRequired'),
        });
        return false;
      }
      if (text !== password) {
        setConfPasswordMessage({
          error: trans(locale, lang, 'confPasswordNotSame'),
        });
        return false;
      }
      setConfPasswordMessage(null);
      return true;
    },
    [password]
  );

  function renderHeaderContainer() {
    return (
      <View style={Style.headerContainer}>
        <Text
          size={Size.text.h5.size}
          textStyle="bold"
          line={38.4}
          color={Color.neutral[colorScheme].neutral80}
          style={Style.headerTitle}>
          {trans(locale, lang, 'title')}
        </Text>
        <Text
          size={Size.text.body2.size}
          textStyle="medium"
          line={23.8}
          color={Color.mediumGray[colorScheme].mediumGray}>
          {trans(locale, lang, 'subtitle')}
        </Text>
      </View>
    );
  }

  function renderInputCard() {
    return (
      <View style={[Style.inputCard]}>
        <View style={Style.mb16}>
          <Input
            value={password}
            label={trans(locale, lang, 'passwordLabel')}
            prefixIcon={<Lock1 {...iconProps} />}
            suffixIcon={
              !passwordVisibility ? (
                <Eye1 {...iconProps} />
              ) : (
                <EyeOff1 {...iconProps} />
              )
            }
            placeholder={trans(locale, lang, 'passwordPlaceholder')}
            secureTextEntry={passwordVisibility}
            handleSuffixIcon={() => {
              setPasswordVisibility(!passwordVisibility);
            }}
            onChangeText={(text) => {
              setPassword(text);
              setValidPassword(validatePassword(text));
            }}
            message={passwordMessage}
          />
        </View>
        <View>
          <Input
            value={confPassword}
            label={trans(locale, lang, 'confPasswordLabel')}
            prefixIcon={<Lock1 {...iconProps} />}
            suffixIcon={
              !confPasswordVisibility ? (
                <Eye1 {...iconProps} />
              ) : (
                <EyeOff1 {...iconProps} />
              )
            }
            placeholder={trans(locale, lang, 'confPasswordPlaceholder')}
            secureTextEntry={confPasswordVisibility}
            handleSuffixIcon={() => {
              setConfPasswordVisibility(!confPasswordVisibility);
            }}
            onChangeText={(text) => {
              setConfPassword(text);
              setValidConfPassword(validateConfPassword(text));
            }}
            message={confPasswordMessage}
          />
        </View>
      </View>
    );
  }

  function renderFooterContainer() {
    return (
      <Padder style={Style.pb50}>
        <Button
          loading={isSubmit}
          shadow
          disabled={!isValidPassword || !isValidConfPassword || isSubmit}
          onPress={() => {
            setIsSubmit(true);
            setResetPassword({
              id: setProfileRequestOtpParam?.data?.id,
              newPassword: password,
              newPasswordConfirmation: confPassword,
            });
          }}>
          {trans(locale, lang, 'submit')}
        </Button>
      </Padder>
    );
  }

  function renderSuccessMessage() {
    const onBackPress = () => {
      setSMVisible(false);
      setResetPasswordClear();
      navigation.reset({
        index: 0,
        routes: [{ name: NAVIGATION.LOGIN.Login }],
      });
    };
    return (
      <BottomSheet
        isVisible={isSMVisible}
        swipeable={false}
        onClosePress={onBackPress}
        onRequestClose={onBackPress}>
        <View style={[Style.successModal.container, Style.alignItemsCenter]}>
          <Image
            source={BadgeTick}
            style={Style.successModal.icon}
            resizeMode="contain"
          />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={30.6}
            align="center"
            color={Color.neutral[colorScheme].neutral80}
            style={Style.successModal.text1}>
            {trans(locale, lang, 'successChanged')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={23.8}
            align="center"
            color={Color.mediumGray[colorScheme].mediumGray}
            style={Style.successModal.text2}>
            {trans(locale, lang, 'successMsg')}
          </Text>
          <Button
            block
            shadow
            onPress={() => {
              setSMVisible(false);
              setResetPasswordClear();
              navigation.reset({
                index: 0,
                routes: [{ name: NAVIGATION.LOGIN.Login }],
              });
            }}>
            {trans(locale, lang, 'login')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  function renderLinkExpiredModal() {
    const onBackPress = () => {
      setIsExpiredModalVisible(false);
      setResetPasswordClear();
      navigation.replace(NAVIGATION.FORPASS.Forpass);
    };
    return (
      <BottomSheet
        isVisible={isExpiredModalVisible}
        swipeable={false}
        onClosePress={onBackPress}
        onRequestClose={onBackPress}>
        <View style={Style.expiredModal.container}>
          <Clock width={125} height={125} style={Style.expiredModal.image} />
          <Text
            textStyle="bold"
            size={Size.text.body1.size}
            line={25.6}
            letterSpacing={0.5}
            align="center"
            style={Style.expiredModal.title}>
            {trans(
              locale,
              lang,
              isExpired
                ? 'tautanYangKamuMasukkanTelah'
                : 'tautanYangKamuMasukkanSalah'
            )}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            align="center"
            color={Color.mediumGray.light.mediumGray}
            style={Style.expiredModal.subtitle}>
            {trans(locale, lang, 'silahkanMintaTautan')}
          </Text>
        </View>
        <Button
          outline
          onPress={() => {
            setIsExpiredModalVisible(false);
            setResetPasswordClear();
            navigation.replace(NAVIGATION.FORPASS.Forpass);
          }}>
          {trans(locale, lang, 'kembali')}
        </Button>
      </BottomSheet>
    );
  }

  return (
    <Base
      onBackPress={() => navigation.pop()}
      title={trans(locale, lang, 'forgetPassword')}
      renderBottom={renderFooterContainer()}>
      <Padder>
        <View style={[Style.wrapper]}>
          {renderHeaderContainer()}
          {renderInputCard()}
          {renderSuccessMessage()}
          {renderLinkExpiredModal()}
        </View>
      </Padder>
    </Base>
  );
}

export default ForpassInput;

ForpassInput.defaultProps = {
  colorScheme: 'light',
};

ForpassInput.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string,
  forpassAction: PropTypes.string.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  setResetPasswordFailed: PropTypes.objectOf(Object).isRequired,
  setResetPassword: PropTypes.func.isRequired,
  setResetPasswordClear: PropTypes.func.isRequired,
  setProfileRequestOtpParam: PropTypes.objectOf(Object).isRequired,
};
