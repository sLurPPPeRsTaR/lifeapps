import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import {
  BaseLayoutStep,
  ButtonCustom,
  CardCustom,
  HeaderImage,
  ModalIncorrect,
  ModalSuccess,
} from 'ca-module-lifecover/component';
import Input from 'ca-component-generic/Input';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import Button from 'ca-component-generic/Button';
import Padder from 'ca-component-container/Padder';
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION } from 'ca-util/constant';
import { InfoOrange } from 'ca-config/Svg';
import { trans } from 'ca-util/trans';
import locale from './locale';
import style from './style';

const MAX_STEP_MEDICAL_STATEMENT = 5;
const STEP_VALUE = { iya: 'Iya', tidak: 'Tidak' };
const DATA_STATEMENT = {
  step1: {
    id: (
      <>
        <Text textStyle="semi" line={18} style={style.mb4}>
          Penyataan Kesehatan
        </Text>
        <Text
          textStyle="regular"
          line={18}
          size={Size.text.caption1.size}
          color={Color.neutral.dark.neutral80}>
          Sebelum berlangganan LifeCover, yuk jawab pertanyaan seputar kesehatan
        </Text>
      </>
    ),
    en: (
      <>
        <Text textStyle="semi" line={18} style={style.mb4}>
          Medical Statement
        </Text>
        <Text
          textStyle="regular"
          line={18}
          size={Size.text.caption1.size}
          color={Color.neutral.dark.neutral80}>
          Before subscribing to LifeCover, let&apos;s answer questions about
          health
        </Text>
      </>
    ),
  },
  step2: {
    id: (
      <>
        <Text textStyle="semi" line={18} style={style.mb4}>
          Apakah Anda sedang menjalani pengobatan, mengetahui, menderita atau
          memeriksakan diri ke dokter untuk penyakit-penyakit atau keadaan
          tertentu :
        </Text>
        <Text
          textStyle="regular"
          line={18}
          size={Size.text.caption1.size}
          color={Color.neutral.dark.neutral80}>
          Penyakit Jantung, Stroke/Kelainan Pembuluh Darah Otak, kelainan
          Hormonal, Darah Tinggi, Gangguan Hati atau Empedu Liver, Kencing Manis
          Diabetes, Kelainan Ginjal atau Saluran Kemih, TBC, Epilepsi, Kelainan
          Tulang dan/atau Sendi, Kista, Tumor, Kelainan Darah atau Pembuluh
          Darah, Tiroid Thyroid, Penyakit Paru Lung disease, HIV atau sedang
          hamil ?
        </Text>
      </>
    ),
    en: (
      <>
        <Text textStyle="semi" line={18} style={style.mb4}>
          Are you currently undergoing treatment, know, suffer or see a doctor
          for diseases or conditions certain :
        </Text>
        <Text
          textStyle="regular"
          line={18}
          size={Size.text.caption1.size}
          color={Color.neutral.dark.neutral80}>
          Heart Disease, Stroke/Cranial Vascular Disorders, disorders Hormonal,
          High Blood Pressure, Liver or Bile Disorders, Diabetes Diabetes,
          Kidney or Urinary Tract Disorders, Tuberculosis, Epilepsy,
          Abnormalities Bones and/or Joints, Cysts, Tumors, Blood or Vessel
          Disorders Blood, Thyroid Thyroid, Lung disease, HIV or moderate
          pregnant ?
        </Text>
      </>
    ),
  },
  step3: {
    id: (
      <Text textStyle="semi" line={18} style={style.mb4}>
        Dalam 5 (lima) tahun terakhir, apakah anda pernah, sedang, direncanakan
        atau dianjurkan untuk melakukan pemeriksaan kesehatan, pengobatan rutin,
        dalam pengawasan dokter atau menjalani perawatan rumah sakit atau
        operasi/pembedahan
      </Text>
    ),
    en: (
      <Text textStyle="semi" line={18} style={style.mb4}>
        In the last 5 (five) years, have you ever had, are you planning to or
        recommended to carry out health checks, routine treatment, under the
        supervision of a doctor or undergoing hospital treatment or
        operation/surgery
      </Text>
    ),
  },
  step4: {
    id: (
      <Text textStyle="semi" line={18} style={style.mb4}>
        Apakah ada anggota keluarga Anda (Ayah, Ibu, Kakak, Adik) yang menderita
        penyakit jantung, diabetes, kanker, dan/atau stroke sebelum mencapai
        usia 60 (enam puluh) tahun ?
      </Text>
    ),
    en: (
      <Text textStyle="semi" line={18} style={style.mb4}>
        Does anyone in your family (Father, Mother, Brother, Sister) have
        suffering from heart disease, diabetes, cancer, and/or stroke before
        reaching the age of 60 (sixty) years?
      </Text>
    ),
  },
  step5: {
    id: (
      <Text textStyle="semi" line={18} style={style.mb4}>
        Apakah Anda pernah ditolak, ditangguhkan, ditawarkan dengan manfaat
        terbatas atau premi tambahan dalam aplikasi asuransi jiwa, penyakit
        kritis, atau asuransi kesehatan Anda yang sudah ada?
      </Text>
    ),
    en: (
      <Text textStyle="semi" line={18} style={style.mb4}>
        Have you ever been turned down, suspended, offered with benefits limited
        or additional premium in the application of life insurance, illness
        critical, or your existing health insurance?
      </Text>
    ),
  },
};

function LifecoverStepMedicalStatement(props) {
  const { lang, colorScheme } = props;

  // HOOKS
  const navigation = useNavigation();

  // STATE
  const [step, setStep] = useState(1);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalIncorrect, setShowModalIncorrect] = useState(false);
  // form values/errors will updated to following api payload later
  const [formStatement, setFormStatement] = useState({
    values: {
      height: 0,
      weight: 0,
      step2Value: '', // iya | tidak
      step3Value: '', // iya | tidak
      step4Value: '', // iya | tidak
      step5Value: '', // iya | tidak
    },
    errors: {},
    isSubmitting: false,
  });

  // HANDLER
  const handleNextStep = () => {
    if (step === 5) {
      setShowModalSuccess(true);
    }
    if (step < 5) {
      setStep(step + 1);
    }
  };
  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  const handleChangeValue = (key, value, { nextStep = false } = {}) => {
    setFormStatement((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [key]: value,
      },
    }));
    if (nextStep) {
      handleNextStep();
    }
  };

  // RENDERER
  const renderSuffixText = (text) => {
    return (
      <Text textStyle="medium" color={Color.abuMuda.dark.abuMuda}>
        {text}
      </Text>
    );
  };
  const renderModaSuccess = () => {
    return (
      <ModalSuccess
        visible={showModalSuccess}
        message={trans(locale, lang, 'pernyataanMemenuhi')}
      />
    );
  };
  const renderModalIncorrect = () => {
    return (
      <ModalIncorrect
        isVisible={showModalIncorrect}
        lang={lang}
        colorScheme={colorScheme}
        onClosePress={() => setShowModalIncorrect(false)}
      />
    );
  };
  const renderStep1 = () => {
    return (
      <View style={style.root.stepContainer}>
        <CardCustom style={style.mb16}>
          <CardCustom.Body>{DATA_STATEMENT.step1[lang]}</CardCustom.Body>
        </CardCustom>
        <CardCustom style={style.mb16}>
          <CardCustom.Body>
            <View style={style.mb16}>
              <Input
                keyboardType="numeric"
                label={trans(locale, lang, 'tinggi')}
                placeholder=""
                value={formStatement.values.height}
                height={56}
                suffixContent={renderSuffixText('Cm')}
                onChangeText={(text) => {
                  handleChangeValue('height', text);
                }}
              />
            </View>
            <Input
              keyboardType="numeric"
              label={trans(locale, lang, 'weight')}
              placeholder=""
              value={formStatement.values.weight}
              height={56}
              suffixContent={renderSuffixText('Kg')}
              onChangeText={(text) => {
                handleChangeValue('weight', text);
              }}
            />
          </CardCustom.Body>
        </CardCustom>
        <Padder>
          <Button onPress={handleNextStep}>
            {trans(locale, lang, 'lanjutkan')}
          </Button>
        </Padder>
      </View>
    );
  };
  const renderStep2 = () => {
    return (
      <View style={style.root.stepContainer}>
        <CardCustom style={style.mb16}>
          <CardCustom.Body>{DATA_STATEMENT.step2[lang]}</CardCustom.Body>
        </CardCustom>
        <CardCustom style={style.mb16}>
          <CardCustom.Body>
            <Text
              textStyle="regular"
              line={21}
              color={Color.neutral.dark.neutral80}>
              {trans(locale, lang, 'pilih')}
            </Text>
            <ButtonCustom
              active={formStatement.values.step2Value === STEP_VALUE.iya}
              variant="selectable"
              onPress={() => {
                handleChangeValue('step2Value', STEP_VALUE.iya, {
                  nextStep: true,
                });
              }}>
              {trans(locale, lang, 'iya')}
            </ButtonCustom>
            <ButtonCustom
              active={formStatement.values.step2Value === STEP_VALUE.tidak}
              variant="selectable"
              onPress={() => {
                handleChangeValue('step2Value', STEP_VALUE.tidak, {
                  nextStep: true,
                });
              }}>
              {trans(locale, lang, 'tidak')}
            </ButtonCustom>
          </CardCustom.Body>
        </CardCustom>
      </View>
    );
  };
  const renderStep3 = () => {
    return (
      <View style={style.root.stepContainer}>
        <CardCustom style={style.mb16}>
          <CardCustom.Body>{DATA_STATEMENT.step3[lang]}</CardCustom.Body>
        </CardCustom>
        <CardCustom style={style.mb24}>
          <CardCustom.Body>
            <Text
              textStyle="regular"
              line={21}
              color={Color.neutral.dark.neutral80}>
              {trans(locale, lang, 'pilih')}
            </Text>
            <ButtonCustom
              active={formStatement.values.step3Value === STEP_VALUE.iya}
              variant="selectable"
              onPress={() => {
                handleChangeValue('step3Value', STEP_VALUE.iya, {
                  nextStep: true,
                });
              }}>
              {trans(locale, lang, 'iya')}
            </ButtonCustom>
            <ButtonCustom
              active={formStatement.values.step3Value === STEP_VALUE.tidak}
              variant="selectable"
              onPress={() => {
                handleChangeValue('step3Value', STEP_VALUE.tidak, {
                  nextStep: true,
                });
              }}>
              {trans(locale, lang, 'tidak')}
            </ButtonCustom>
          </CardCustom.Body>
        </CardCustom>
        <CardCustom backgroundColor={Color.backgroundAlertDialogue.dark.color}>
          <CardCustom.Body style={style.cardInfo.body}>
            <View style={style.cardInfo.iconContainer}>
              <InfoOrange />
            </View>
            <View style={style.cardInfo.textContainer}>
              <Text
                textStyle="medium"
                size={Size.text.caption1.size}
                line={22}
                color={Color.gray.dark.gray2}>
                {trans(locale, lang, 'silahkanPilihTidak')}
              </Text>
            </View>
          </CardCustom.Body>
        </CardCustom>
      </View>
    );
  };
  const renderStep4 = () => {
    return (
      <View style={style.root.stepContainer}>
        <CardCustom style={style.mb16}>
          <CardCustom.Body>{DATA_STATEMENT.step4[lang]}</CardCustom.Body>
        </CardCustom>
        <CardCustom style={style.mb16}>
          <CardCustom.Body>
            <Text
              textStyle="regular"
              line={21}
              color={Color.neutral.dark.neutral80}>
              {trans(locale, lang, 'pilih')}
            </Text>
            <ButtonCustom
              active={formStatement.values.step4Value === STEP_VALUE.iya}
              variant="selectable"
              onPress={() => {
                handleChangeValue('step4Value', STEP_VALUE.iya, {
                  nextStep: true,
                });
              }}>
              {trans(locale, lang, 'iya')}
            </ButtonCustom>
            <ButtonCustom
              active={formStatement.values.step4Value === STEP_VALUE.tidak}
              variant="selectable"
              onPress={() => {
                handleChangeValue('step4Value', STEP_VALUE.tidak, {
                  nextStep: true,
                });
              }}>
              {trans(locale, lang, 'tidak')}
            </ButtonCustom>
          </CardCustom.Body>
        </CardCustom>
      </View>
    );
  };
  const renderStep5 = () => {
    return (
      <View style={style.root.stepContainer}>
        <CardCustom style={style.mb16}>
          <CardCustom.Body>{DATA_STATEMENT.step5[lang]}</CardCustom.Body>
        </CardCustom>
        <CardCustom style={style.mb16}>
          <CardCustom.Body>
            <Text
              textStyle="regular"
              line={21}
              color={Color.neutral.dark.neutral80}>
              {trans(locale, lang, 'pilih')}
            </Text>
            <ButtonCustom
              active={formStatement.values.step5Value === STEP_VALUE.iya}
              variant="selectable"
              onPress={() => {
                handleChangeValue('step5Value', STEP_VALUE.iya, {
                  nextStep: true,
                });
              }}>
              {trans(locale, lang, 'iya')}
            </ButtonCustom>
            <ButtonCustom
              active={formStatement.values.step5Value === STEP_VALUE.tidak}
              variant="selectable"
              onPress={() => {
                handleChangeValue('step5Value', STEP_VALUE.tidak, {
                  nextStep: true,
                });
              }}>
              {trans(locale, lang, 'tidak')}
            </ButtonCustom>
          </CardCustom.Body>
        </CardCustom>
      </View>
    );
  };
  const renderMainStep = () => {
    switch (step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      default:
        return renderStep1();
    }
  };

  // EFFECTS
  // effect : dummy modal success disappear and navigate to LifecoverStepConfirmation
  useEffect(() => {
    let unsub = null;
    if (showModalSuccess) {
      unsub = setTimeout(() => {
        setShowModalSuccess(false);
        navigation.navigate(NAVIGATION.LIFECOVER.LifecoverStepConfirmation);
      }, 1500);
    }

    return () => clearTimeout(unsub);
  }, [navigation, showModalSuccess]);

  return (
    <BaseLayoutStep
      title={trans(locale, lang, 'title')}
      onBackPress={handlePrevStep}
      step={step}
      maxStep={MAX_STEP_MEDICAL_STATEMENT}
      showStepIndicator>
      <HeaderImage />

      {renderMainStep()}
      {renderModaSuccess()}
      {renderModalIncorrect()}
    </BaseLayoutStep>
  );
}
LifecoverStepMedicalStatement.defaultProps = {
  lang: 'id',
  colorScheme: 'light',
};
LifecoverStepMedicalStatement.propTypes = {
  lang: PropTypes.string,
  colorScheme: PropTypes.string,
};

export default LifecoverStepMedicalStatement;
