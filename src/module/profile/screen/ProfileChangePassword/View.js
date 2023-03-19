import React, {
  useRef,
  useLayoutEffect,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { View, Alert, Image } from 'react-native';
import PropTypes from 'prop-types';
import Base from 'ca-component-container/Base';
import Input from 'ca-component-generic/Input';
import Text from 'ca-component-generic/Text';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import { Eye1, EyeOff1, Lock1 } from 'ca-config/Svg';
import { BadgeTick } from 'ca-config/Image';
import Size from 'ca-config/Size';
import Padder from 'ca-component-container/Padder';
import BottomSheet from 'ca-component-container/BottomSheet';
import Button from 'ca-component-generic/Button';
import { regexPassword } from 'ca-util/common';
import {
  SET_CHANGE_PASSWORD_FAILED,
  SET_CHANGE_PASSWORD_SUCCESS,
} from 'ca-module-profile/profileConstant';
import { NAVIGATION } from 'ca-util/constant';
import Style from './style';
import locale from './locale';

function ProfileChangePassword(props) {
  const {
    navigation,
    lang,
    colorScheme,
    profileAction,
    setChangePasswordFailed,
    setChangePassword,
    setChangePasswordClear,
    setLogout,
  } = props;

  const iconProps = {
    fill: Color.grayIcon[colorScheme].grayIcon,
    width: 24,
    height: 24,
  };

  const [oldPassword, setOldPassword] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConf, setPasswordConf] = useState(null);

  const [oldPasswordVisibility, setOldPasswordVisibility] = useState(true);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordConfVisibility, setPasswordConfVisibility] = useState(true);

  const [oldPasswordMessage, setOldPasswordMessage] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [passwordConfMessage, setPasswordConfMessage] = useState(null);

  const [isValidOldPassword, setValidOldPassword] = useState(false);
  const [isValidPassword, setValidPassword] = useState(false);
  const [isValidPasswordConf, setValidPasswordConf] = useState(false);

  const [isSMVisible, setSMVisible] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (isSMVisible) {
      setTimeout(() => {
        setSMVisible(false);
        setLogout();
        navigation.reset({
          index: 0,
          routes: [{ name: NAVIGATION.LOGIN.LoginMain }],
        });
      }, 10000);
    }
  }, [isSMVisible, navigation, setLogout]);

  useEffect(() => {
    setChangePasswordResult(profileAction);
  }, [profileAction, setChangePasswordResult]);

  const setChangePasswordResult = useCallback(
    (act) => {
      if (act === SET_CHANGE_PASSWORD_SUCCESS) {
        setSMVisible(true);
        setChangePasswordClear();
      }
      if (act === SET_CHANGE_PASSWORD_FAILED) {
        setChangePasswordClear();
        if (setChangePasswordFailed?.message === 'WRONG_OLD_PASSWORD') {
          setValidOldPassword(false);
          setOldPasswordMessage({
            error: trans(locale, lang, 'oldPasswordWrong'),
          });
          return;
        }
        if (setChangePasswordFailed?.message === 'BAD_REQUEST') {
          setValidPassword(false);
          setPasswordMessage({
            error: trans(locale, lang, 'passwordBadRequest'),
          });
          return;
        }
        Alert.alert(setChangePasswordFailed?.message);
      }
      setIsSubmit(false);
    },
    [lang, setChangePasswordClear, setChangePasswordFailed?.message]
  );

  // Validate Old Password, Password & Password Confirmation
  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setValidOldPassword(validateOldPassword(oldPassword));
    setValidPassword(validatePassword(password));
    setValidPasswordConf(validatePasswordConf(passwordConf));
  }, [
    oldPassword,
    password,
    passwordConf,
    validateOldPassword,
    validatePassword,
    validatePasswordConf,
  ]);

  const validateOldPassword = useCallback(
    (text) => {
      if (text === null) {
        return null;
      }
      if (text.length < 1) {
        setOldPasswordMessage({
          error: trans(locale, lang, 'oldPasswordRequired'),
        });
        return false;
      }
      setOldPasswordMessage(null);
      return true;
    },
    [lang]
  );

  const validatePassword = useCallback(
    (text) => {
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
      if (text === oldPassword) {
        setPasswordMessage({
          warning: trans(locale, lang, 'passwordSame'),
        });
        return false;
      }
      setPasswordMessage(null);
      return true;
    },
    [lang, oldPassword]
  );

  const validatePasswordConf = useCallback(
    (text) => {
      if (text === null) {
        return null;
      }
      if (text.length < 1) {
        setPasswordConfMessage({
          error: trans(locale, lang, 'confPasswordRequired'),
        });
        return false;
      }
      if (text !== password) {
        setPasswordConfMessage({
          error: trans(locale, lang, 'confPasswordNotSame'),
        });
        return false;
      }
      setPasswordConfMessage(null);
      return true;
    },
    [lang, password]
  );

  function renderHeaderContainer() {
    return (
      <View style={[Style.headerContainer]}>
        <Text
          textStyle="medium"
          size={Size.text.body2.size}
          line={27}
          letterSpacing={0.5}
          color={Color.mediumGray.light.mediumGray}
          style={Style.fS1}>
          {trans(locale, lang, 'createnewpassword')}
        </Text>
      </View>
    );
  }

  function renderInputCard() {
    return (
      <View>
        <View style={Style.mb16}>
          <Input
            height={56}
            value={oldPassword}
            label={trans(locale, lang, 'passwordOldLabel')}
            prefixIcon={<Lock1 {...iconProps} />}
            suffixIcon={
              !oldPasswordVisibility ? (
                <Eye1 {...iconProps} />
              ) : (
                <EyeOff1 {...iconProps} />
              )
            }
            placeholder={trans(locale, lang, 'passwordOldPlaceHolder')}
            secureTextEntry={oldPasswordVisibility}
            handleSuffixIcon={() => {
              setOldPasswordVisibility(!oldPasswordVisibility);
            }}
            onChangeText={(text) => {
              setOldPassword(text);
            }}
            message={oldPasswordMessage}
          />
        </View>
        <View style={Style.mb16}>
          <Input
            height={56}
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
            }}
            message={passwordMessage}
          />
        </View>
        <View>
          <Input
            height={56}
            value={passwordConf}
            label={trans(locale, lang, 'passwordConfLabel')}
            prefixIcon={<Lock1 {...iconProps} />}
            suffixIcon={
              !passwordConfVisibility ? (
                <Eye1 {...iconProps} />
              ) : (
                <EyeOff1 {...iconProps} />
              )
            }
            placeholder={trans(locale, lang, 'passwordConfPlaceholder')}
            secureTextEntry={passwordConfVisibility}
            handleSuffixIcon={() => {
              setPasswordConfVisibility(!passwordConfVisibility);
            }}
            onChangeText={(text) => {
              setPasswordConf(text);
            }}
            message={passwordConfMessage}
          />
        </View>
      </View>
    );
  }

  function renderFooterContainer() {
    return (
      <Padder style={Style.mb40}>
        <Button
          loading={isSubmit}
          shadow
          disabled={
            !isValidOldPassword ||
            !isValidPassword ||
            !isValidPasswordConf ||
            isSubmit
          }
          onPress={() => {
            setIsSubmit(true);
            setChangePassword({
              oldPassword: oldPassword,
              newPassword: password,
              newPasswordConfirmation: passwordConf,
            });
          }}>
          {trans(locale, lang, 'update')}
        </Button>
      </Padder>
    );
  }

  function renderSuccessMessage() {
    const onBackPress = () => {
      setSMVisible(false);
      setLogout();
      navigation.reset({
        index: 0,
        routes: [{ name: NAVIGATION.LOGIN.LoginMain }],
      });
    };
    return (
      <BottomSheet
        isVisible={isSMVisible}
        swipeable={false}
        onClosePress={onBackPress}
        onRequestClose={onBackPress}>
        <View style={[Style.successModal.container, Style.alignItemsCenter]}>
          <Image source={BadgeTick} style={Style.successModal.icon} />
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
              setLogout();
              navigation.reset({
                index: 0,
                routes: [{ name: NAVIGATION.LOGIN.LoginMain }],
              });
            }}>
            {trans(locale, lang, 'login')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  return (
    <Base
      onBackPress={() => navigation.pop()}
      title={trans(locale, lang, 'changePassword')}
      renderBottom={renderFooterContainer()}>
      {renderHeaderContainer()}
      <Padder>
        <View style={[Style.wrapper]}>
          {renderInputCard()}
          {renderSuccessMessage()}
        </View>
      </Padder>
    </Base>
  );
}

export default ProfileChangePassword;

ProfileChangePassword.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  profileAction: PropTypes.string.isRequired,
  setChangePasswordFailed: PropTypes.objectOf(Object).isRequired,
  setChangePassword: PropTypes.func.isRequired,
  setChangePasswordClear: PropTypes.func.isRequired,
  setLogout: PropTypes.func.isRequired,
};
