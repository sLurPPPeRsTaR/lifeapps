import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableNativeFeedback, Alert, Image } from 'react-native';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Padder from 'ca-component-container/Padder';
import Size from 'ca-config/Size';
import Text from 'ca-component-generic/Text';
import Base from 'ca-component-container/Base';
import BottomSheet from 'ca-component-container/BottomSheet';
import { ArrowDownGray } from 'ca-config/Svg';
import { BadgeTick } from 'ca-config/Image';
import Button from 'ca-component-generic/Button';
import Input from 'ca-component-generic/Input';
import Dash from 'react-native-dash';
import {
  SET_PROFILE_FAQ,
  SET_PROFILE_FAQ_FAILED,
  SET_PROFILE_FAQ_SUCCESS,
  SET_PROFILE_NOLOGINFAQ,
  SET_PROFILE_NOLOGINFAQ_FAILED,
  SET_PROFILE_NOLOGINFAQ_SUCCESS,
} from 'ca-module-profile/profileConstant';
import { regexEmail } from 'ca-util/common';
import { setNavigationHome } from 'ca-bootstrap/bootstrapNavigation';
import style from './style';
import locale from './locale';

function ProfileFaqFeedback(props) {
  const {
    lang,
    navigation,
    setProfileFaqFailed,
    setProfileFaq,
    setProfileFaqClear,
    setProfileFaqResponse,
    setProfileNoLoginFaqFailed,
    setProfileNoLoginFaq,
    setProfileNoLoginFaqClear,
    setProfileNoLoginFaqResponse,
    faqAction,
    setLoading,
    userData,
  } = props;

  // STATE
  const [categoryOpt, setCategoryOpt] = useState();
  const [question, setQuestion] = useState();
  const [email, setEmail] = useState();
  const [fullName, setFullName] = useState();

  // REGEX
  const [isValidEmail, setValidEmail] = useState(false);
  const [isValidFullName, setValidFullName] = useState(false);
  const [isValidQuestion, setValidQuestion] = useState(false);

  // ERRORMSG
  const [emailMessage, setEmailMessage] = useState(null);
  const [fullNameMessage, setFullNameMessage] = useState(null);
  const [questionMessage, setQuestionMessage] = useState(null);

  // Modal
  const [isSuccModalVisible, setSuccModalVisible] = useState(false);
  const [isCategoryOptModalVisible, setCategoryOptModalVisible] =
    useState(false);

  // categoryOpt
  const categoryOptArr = [
    { opt: trans(locale, lang, 'lifesaver') },
    { opt: trans(locale, lang, 'registrasiLogin') },
    { opt: trans(locale, lang, 'verifikasiDataDiri') },
    { opt: trans(locale, lang, 'informasiPolis') },
    { opt: trans(locale, lang, 'pengkinianData') },
    { opt: trans(locale, lang, 'akun') },
    { opt: trans(locale, lang, 'keamanan') },
    { opt: trans(locale, lang, 'pengirimanOtp') },
  ];

  useEffect(() => {
    faqResult(faqAction);
  }, [faqAction, faqResult]);

  const faqResult = useCallback(
    (act) => {
      if (act === SET_PROFILE_FAQ) {
        setLoading(true);
      }
      if (act === SET_PROFILE_FAQ_SUCCESS) {
        setLoading(false);
        setSuccModalVisible(true);
      }
      if (act === SET_PROFILE_FAQ_FAILED) {
        setLoading(false);
        if (setProfileFaqFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          Alert.alert(setProfileFaqFailed?.message);
        }
      }
      if (act === SET_PROFILE_NOLOGINFAQ) {
        setLoading(true);
      }
      if (act === SET_PROFILE_NOLOGINFAQ_SUCCESS) {
        setLoading(false);
        setSuccModalVisible(true);
      }
      if (act === SET_PROFILE_NOLOGINFAQ_FAILED) {
        setLoading(false);
        if (setProfileFaqFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          Alert.alert(setProfileNoLoginFaqFailed?.message);
        }
      }
    },
    [
      setLoading,
      setProfileFaqFailed?.message,
      setProfileNoLoginFaqFailed?.message,
    ]
  );

  function validateEmail(text) {
    if (text?.length < 1) {
      setEmailMessage({ error: trans(locale, lang, 'emailRequired') });
      return false;
    }
    if (!regexEmail.test(text)) {
      setEmailMessage({ warning: trans(locale, lang, 'emailInvalid') });
      return false;
    }
    setEmailMessage(null);
    return true;
  }

  function validateFullName(text) {
    const regex = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/;
    if (text?.length < 1) {
      setFullNameMessage({ error: trans(locale, lang, 'nameRequired') });
      return false;
    }
    if (!regex.test(text)) {
      setFullNameMessage({ warning: trans(locale, lang, 'nameInvalid') });
      return false;
    }
    if (text?.length > 100) {
      setFullNameMessage({
        error: trans(locale, lang, 'nameLengthTooLong'),
      });
      return false;
    }
    setFullNameMessage(null);
    return true;
  }

  function validateQuestion(text) {
    if (text?.length < 1) {
      return false;
    }
    if (text?.length >= 300) {
      setQuestionMessage({ error: trans(locale, lang, 'questionInvalid') });
      return true;
    }
    setQuestionMessage(null);
    return true;
  }

  function renderHeader() {
    return (
      <Padder style={style.mT12}>
        <Text textStyle="semi" line={21} letterSpacing={0.5}>
          {trans(locale, lang, 'apakahAdaYang')}
        </Text>
      </Padder>
    );
  }

  function renderInputContainer() {
    return (
      <Padder style={style.mT24}>
        {userData?.userId === '' && (
          <>
            <View style={style.mB16}>
              <Input
                value={fullName}
                height={56}
                label={trans(locale, lang, 'namaLengkap')}
                secondLabel={
                  <Text
                    color={Color.primary.light.primary90}
                    size={Size.text.body2.size}
                    textStyle="semi">
                    {trans(locale, lang, '*')}
                  </Text>
                }
                placeholder={trans(locale, lang, 'namaLengkapKamu')}
                onChangeText={(text) => {
                  setFullName(text);
                  setValidFullName(validateFullName(text));
                }}
                message={fullNameMessage}
              />
            </View>
            <View style={style.mB16}>
              <Input
                value={email}
                height={56}
                label={trans(locale, lang, 'emailNoHp')}
                secondLabel={
                  <Text
                    color={Color.primary.light.primary90}
                    size={Size.text.body2.size}
                    textStyle="semi">
                    {trans(locale, lang, '*')}
                  </Text>
                }
                placeholder={trans(locale, lang, 'emailNoHpKamu')}
                onChangeText={(text) => {
                  setEmail(text);
                  setValidEmail(validateEmail(text));
                }}
                message={emailMessage}
              />
            </View>
          </>
        )}
        <View style={style.mB16}>
          <Input
            value={categoryOpt}
            height={56}
            label={trans(locale, lang, 'pilihKategori')}
            editable={false}
            pressable
            onInputPress={() => setCategoryOptModalVisible(true)}
            suffixIcon={<ArrowDownGray />}
            handleSuffixIcon={() => setCategoryOptModalVisible(true)}
            secondLabel={
              <Text
                color={Color.primary.light.primary90}
                size={Size.text.body2.size}
                textStyle="semi">
                {trans(locale, lang, '*')}
              </Text>
            }
          />
        </View>
        <View>
          <Input
            value={question}
            maxLength={300}
            height={250}
            textAlignVertical="top"
            multiline
            numberOfLines={100}
            label={trans(locale, lang, 'pertanyaanKamu')}
            placeholder={trans(locale, lang, 'pertanyaanTentangAplikasi')}
            secondLabel={
              <Text
                color={Color.primary.light.primary90}
                size={Size.text.body2.size}
                textStyle="semi">
                {trans(locale, lang, '*')}
              </Text>
            }
            onChangeText={(txt) => {
              setQuestion(txt);
              setValidQuestion(validateQuestion(txt));
            }}
            message={questionMessage}
            contentStyle={style.pT10}
          />
          <View style={style.containerCharacter}>
            <Text
              color={question?.length === 300 && Color.primary.light.primary90}>
              {question?.length ? question?.length : 0} / 300
            </Text>
          </View>
        </View>
      </Padder>
    );
  }

  function renderFooterNoLoginContainer() {
    return (
      <Padder style={style.mB16}>
        <Button
          disabled={
            !categoryOpt ||
            !isValidQuestion ||
            !isValidEmail ||
            !isValidFullName
          }
          block
          onPress={() => {
            setProfileNoLoginFaq({
              name: fullName,
              email: email,
              category: categoryOpt,
              feedback: question,
              lang,
            });
          }}>
          {trans(locale, lang, 'kirimPertanyaan')}
        </Button>
      </Padder>
    );
  }

  function renderFooterByLoginContainer() {
    return (
      <Padder style={style.mB16}>
        <Button
          disabled={!categoryOpt || !isValidQuestion}
          block
          onPress={() => {
            setProfileFaq({
              category: categoryOpt,
              feedback: question,
              lang,
            });
          }}>
          {trans(locale, lang, 'kirimPertanyaan')}
        </Button>
      </Padder>
    );
  }

  function renderSuccModal() {
    const onBackPress = () => {
      setSuccModalVisible(false);
      setProfileFaqClear();
      setProfileNoLoginFaqClear();
      setNavigationHome();
    };
    return (
      <BottomSheet
        isVisible={isSuccModalVisible}
        swipeable={false}
        onClosePress={onBackPress}
        onRequestClose={onBackPress}>
        <View style={style.renderSuccModal.container}>
          <Image source={BadgeTick} style={style.renderSuccModal.image} />
          <Text
            align="center"
            style={style.renderSuccModal.title}
            textStyle="bold"
            size={Size.text.h6.size}
            line={27}
            letterSpacing={0.5}>
            {trans(locale, lang, 'pertanyaanBerhasilDiterima')}
          </Text>
          <Text
            style={style.renderSuccModal.subtitle}
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            align="center"
            color={Color.mediumGray.dark.mediumGray}>
            {trans(locale, lang, 'pertanyaanKamuBerhasil1')}
            <Text textStyle="bold" color={Color.mediumGray.dark.mediumGray}>
              {setProfileFaqResponse?.data?.reffNumber ||
                setProfileNoLoginFaqResponse?.data?.reffNumber}
            </Text>
            {trans(locale, lang, 'pertanyaanKamuBerhasil2')}
          </Text>
          <Button
            block
            onPress={() => {
              setSuccModalVisible(false);
              setProfileFaqClear();
              setProfileNoLoginFaqClear();
              setNavigationHome();
            }}>
            {trans(locale, lang, 'kembaliKeHome')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  function renderCategoryModal() {
    return (
      <BottomSheet
        title={trans(locale, lang, 'pilihKategoriModal')}
        isVisible={isCategoryOptModalVisible}
        swipeable={false}
        onClosePress={() => setCategoryOptModalVisible(false)}>
        {categoryOptArr?.map((item, index) => {
          return (
            <View>
              <Padder style={style.renderCategoryModal.mV16}>
                <TouchableNativeFeedback
                  onPress={() => {
                    setCategoryOpt(item?.opt);
                    setCategoryOptModalVisible(false);
                  }}>
                  <Text
                    textStyle="semi"
                    line={20}
                    letterSpacing={0.5}
                    size={Size.text.body2.size}>
                    {item?.opt}
                  </Text>
                </TouchableNativeFeedback>
              </Padder>
              {index !== categoryOptArr.length - 1 && (
                <Dash
                  dashThickness={1}
                  dashColor={Color.neutral.dark.neutral20}
                />
              )}
            </View>
          );
        })}
      </BottomSheet>
    );
  }

  return (
    <Base
      title={trans(locale, lang, 'ajukanPertanyaan')}
      onBackPress={() => {
        setProfileFaqClear();
        setProfileNoLoginFaqClear();
        navigation.pop();
      }}
      bordered
      renderBottom={
        userData?.userId === ''
          ? renderFooterNoLoginContainer()
          : renderFooterByLoginContainer()
      }>
      {renderHeader()}
      {renderInputContainer()}
      {renderSuccModal()}
      {renderCategoryModal()}
    </Base>
  );
}

export default ProfileFaqFeedback;

ProfileFaqFeedback.propTypes = {
  lang: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  faqAction: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  userData: PropTypes.objectOf(Object).isRequired,
  setProfileFaq: PropTypes.func.isRequired,
  setProfileFaqFailed: PropTypes.objectOf(Object).isRequired,
  setProfileFaqClear: PropTypes.func.isRequired,
  setProfileFaqResponse: PropTypes.objectOf(Object).isRequired,
  setProfileNoLoginFaq: PropTypes.func.isRequired,
  setProfileNoLoginFaqFailed: PropTypes.objectOf(Object).isRequired,
  setProfileNoLoginFaqClear: PropTypes.func.isRequired,
  setProfileNoLoginFaqResponse: PropTypes.objectOf(Object).isRequired,
};
