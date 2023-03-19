import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';
import Base15 from 'ca-component-container/Base15';
import { Alert, Image, TouchableOpacity, View } from 'react-native';
import Text from 'ca-component-generic/Text';
import Button from 'ca-component-generic/Button';
import Padder from 'ca-component-container/Padder';
import { trans } from 'ca-util/trans';
import {
  UpdataStep4Inactive,
  UpdataStep1Active,
  UpdataStep3Active,
  UpdataStep2Active,
  ArrowDownGray,
  Frame577,
  Calendar,
  Headset2,
} from 'ca-config/Svg';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import { NAVIGATION } from 'ca-util/constant';
import Input from 'ca-component-generic/Input';
import ListAccordion from 'ca-component-card/ListAccordion';
import BottomSheet from 'ca-component-container/BottomSheet';
import {
  GET_UPDATA_LAST_KK_INFO_FAILED,
  GET_UPDATA_LAST_KK_INFO_SUCCESS,
  GET_UPDATA_LAST_KTP_INFO_FAILED,
  GET_UPDATA_LAST_KTP_INFO_SUCCESS,
  SET_UPDATA_CHECK_KK_KTP_FAILED,
  SET_UPDATA_CHECK_KK_KTP_SUCCESS,
} from 'ca-module-updata/updataConstant';
import { formatCapitalizeEachWord, formatOrdinal } from 'ca-util/format';
import AlertDialogue from 'ca-component-card/AlertDialogue';
import { matchTypoTolerance, removeColumnFromObject } from 'ca-util/common';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment/min/moment-with-locales';
import _ from 'lodash';
import { KKVerifikasi, KKEdit, KTPTidakCocokKTP } from 'ca-config/Image';
import style from './style';
import locale from './locale';

const ktpInitialState = {
  values: {
    idCardNumber: '',
    name: '',
    gender: '',
    pob: '',
    dob: '',
    address: '',
    province: '',
    city: '',
    district: '',
    subDistrict: '',
    neighborhood: '',
    hamlet: '',
    maritalStatus: '',
    occupation: '',
  },
  errors: {
    idCardNumber: ['required', 'numberOnly', 'valid'],
    name: ['required'],
    gender: ['required', 'valid'],
    pob: ['required'],
    dob: ['required', 'valid'],
    address: ['required'],
    province: ['required'],
    city: ['required'],
    district: ['required'],
    subDistrict: ['required'],
    neighborhood: ['numberOnly', 'valid'],
    hamlet: ['numberOnly', 'valid'],
    maritalStatus: ['required', 'valid'],
    occupation: [],
  },
  messages: {
    idCardNumber: null,
    name: null,
    gender: null,
    pob: null,
    dob: null,
    address: null,
    province: null,
    city: null,
    district: null,
    subDistrict: null,
    neighborhood: null,
    hamlet: null,
    maritalStatus: null,
    occupation: null,
  },
};

const kkInitialState = {
  values: {
    idCardNumber: '',
    name: '',
    gender: '',
    pob: '',
    dob: '',
    occupation: '',
    familyRelationshipStatus: '',
    maritalStatus: '',
  },
  errors: {
    idCardNumber: ['required', 'numberOnly', 'valid'],
    name: ['required'],
    gender: ['required', 'valid'],
    pob: ['required'],
    dob: ['required', 'valid'],
    occupation: ['required'],
    familyRelationshipStatus: ['required', 'valid'],
    maritalStatus: ['required', 'valid'],
  },
  messages: {
    idCardNumber: null,
    name: null,
    gender: null,
    pob: null,
    dob: null,
    occupation: null,
    familyRelationshipStatus: null,
    maritalStatus: null,
  },
};

const anakInitialState = {
  values: {
    idCardNumber: '',
    name: '',
    gender: '',
    pob: '',
    dob: '',
    occupation: '',
    familyRelationshipStatus: '',
    maritalStatus: '',
  },
  errors: {
    idCardNumber: ['required', 'numberOnly', 'valid'],
    name: ['required'],
    gender: ['required', 'valid'],
    pob: ['required'],
    dob: ['required', 'valid', 'maxBeneficiaryAge'],
    occupation: ['required', 'notWorking'],
    familyRelationshipStatus: ['required', 'valid'],
    maritalStatus: ['required', 'notMarried', 'valid'],
  },
  messages: {
    idCardNumber: null,
    name: null,
    gender: null,
    pob: null,
    dob: null,
    occupation: null,
    familyRelationshipStatus: null,
    maritalStatus: null,
  },
};

const nomorKKInitialState = {
  values: {
    familyCardNumber: '',
  },
  errors: {
    familyCardNumber: ['required', 'numberOnly', 'valid'],
  },
  messages: {
    familyCardNumber: null,
  },
};

// const dummySetUpdataKTPResponse = {
//   data: {
//     user: {
//       idCardNumber: '3151392312018321',
//       name: 'John Doe',
//       gender: 'Laki-Laki',
//       pob: 'Surabaya',
//       dob: '26-04-1980',
//       address: 'Jl. Jalan Jalan',
//       province: 'DKI Jakarta',
//       city: 'Jakarta Barat',
//       district: 'Kalideres',
//       subDistrict: 'Semanan',
//       neighborhood: '092',
//       hamlet: '093',
//       maritalStatus: 'Kawin',
//       occupation: 'Pegawai Swasta',
//     },
//   },
// };

// const dummySetUpdataKKResponse = {
//   data: {
//     family: {
//       familyCardNumber: '4674214235467854123',
//       headOfFamilyName: 'John Doe',
//       address: 'Jl. Raya',
//       province: 'Jawa Barat',
//       city: 'Bandung',
//       district: 'Cipayung',
//       neighborhood: '002',
//       hamlet: '003',
//       familyMembers: [
//         {
//           idCardNumber: '3173032604990001',
//           name: 'John Doe',
//           gender: 'Laki-Laki',
//           pob: 'Jakarta',
//           dob: '24-10-1970',
//           occupation: 'Karyawan Swasta',
//           familyRelationshipStatus: 'Kepala Keluarga',
//           maritalStatus: 'Kawin',
//           age: 52,
//         },
//         {
//           idCardNumber: '3173032604990001',
//           name: 'Karen Doe',
//           gender: 'Perempuan',
//           pob: 'Jakarta',
//           dob: '26-04-1970',
//           occupation: 'Karyawan Swasta',
//           familyRelationshipStatus: 'Istri',
//           maritalStatus: 'Kawin',
//           age: 52,
//         },
//         {
//           idCardNumber: '3173032604990001',
//           name: 'Anak 1',
//           gender: 'Laki-Laki',
//           pob: 'Jakarta',
//           dob: '26-04-1990',
//           occupation: 'Karyawan Swasta',
//           familyRelationshipStatus: 'Anak Kandung',
//           maritalStatus: 'Belum Kawin',
//           age: 32,
//         },
//         {
//           idCardNumber: '3173032604990001',
//           name: 'Anak 2',
//           gender: 'Laki-Laki',
//           pob: 'Jakarta',
//           dob: '26-04-1999',
//           occupation: 'Pelajar/Mahasiswa',
//           familyRelationshipStatus: 'Anak Kandung',
//           maritalStatus: 'Kawin',
//           age: 23,
//         },
//         {
//           idCardNumber: '3173032604990001',
//           name: 'Anak 3',
//           gender: 'Laki-Laki',
//           pob: 'Jakarta',
//           dob: '26-04-2000',
//           occupation: 'Pegawai Swasta',
//           familyRelationshipStatus: 'Anak Angkat',
//           maritalStatus: 'Belum Kawin',
//           age: 22,
//         },
//         {
//           idCardNumber: '3173032604990001',
//           name: 'Anak 4',
//           gender: 'Laki-Laki',
//           pob: 'Jakarta',
//           dob: '26-04-2009',
//           occupation: 'Pelajar/Mahasiswa',
//           familyRelationshipStatus: 'Anak',
//           maritalStatus: 'Belum Kawin',
//           age: 13,
//         },
//       ],
//     },
//   },
// };

const ALLOWED_OCCUPATION = [
  'BELUM/TIDAK BEKERJA',
  'MENGURUS RUMAH TANGGA',
  'PELAJAR/MAHASISWA',
];
const ALLOWED_MARITAL_STATUS = ['BELUM KAWIN'];
const MAX_BENEFICIARY_AGE = 25;

const MARITAL_STATUS = [
  'BELUM KAWIN',
  'KAWIN',
  'KAWIN TERCATAT',
  'KAWIN BELUM TERCATAT',
  'CERAI HIDUP',
  'CERAI MATI',
];
const FAMILY_RELATIONSHIP_STATUS = [
  'KEPALA KELUARGA',
  'ISTRI',
  'ANAK',
  'ANAK KANDUNG',
  'ANAK ANGKAT',
  'ANAK TIRI',
];
const GENDERS = ['LAKI-LAKI', 'PEREMPUAN'];

const ERRORS = {
  required: 'required',
  invalid: 'invalid',
  numberOnly: 'numberOnly',
  maxBeneficiaryAge: 'maxBeneficiaryAge',
  maxSelectedChildren3: 'maxSelectedChildren3',
  notWorking: 'notWorking',
  notMarried: 'notMarried',
};

const defaultFormatDateDMY = 'DD-MM-YYYY';
const defaultDateDMY = '01-01-1990';

function UpdataReview(props) {
  const {
    navigation,
    lang,
    isKTPSame,
    isKKSame,
    updataAction,
    getUpdataLastKTPInfoResponse,
    getUpdataLastKTPInfoFailed,
    getUpdataLastKKInfoResponse,
    getUpdataLastKKInfoFailed,
    setUpdataKTPResponse,
    setUpdataKKResponse,
    getUpdataLastKTPInfo,
    getUpdataLastKKInfo,
    setUpdataCheckKKKTPResponse,
    setUpdataCheckKKKTPFailed,
    setUpdataCheckKKKTP,
    setUpdataCheckKKKTPClear,
    getUpdataLastKTPInfoClear,
    getUpdataLastKKInfoClear,
    setLoading,
    setUpdataTempState,
  } = props;
  // Date
  moment.locale(lang);
  const iconProps = {
    fill: Color.grayIcon.light.grayIcon,
    width: 24,
    height: 24,
  };

  const requiredLabel = (
    <Text
      color={Color.primary.light.primary90}
      size={Size.text.body2.size}
      textStyle="semi">
      {trans(locale, lang, '*')}
    </Text>
  );

  // Modal
  const [isResponseModal, setIsResponseModal] = useState(false);
  const [isInvalidNIKModal, setIsInvalidNIKModal] = useState(false);

  // State
  const [selectedChildren, setSelectedChildren] = useState([]);
  const [ktpInput, setKTPInput] = useState(ktpInitialState);
  const [kepalaKeluargaRaw, setKepalaKeluargaRaw] = useState({});
  const [kepalaKeluargaInput, setKepalaKeluargaInput] =
    useState(kkInitialState);
  const [istriRaw, setIstriRaw] = useState({});
  const [istriInput, setIstriInput] = useState({});
  const [anaksRaw, setAnaksRaw] = useState([]);
  const [anaksInput, setAnaksInput] = useState([]);
  const [nomorKKInput, setNomorKKInput] = useState(nomorKKInitialState);

  const [isSubmit, setIsSubmit] = useState(false);

  // Date
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [currChange, setCurrChange] = useState('');
  const showMode = (currentMode, currentChange) => {
    setShow(true);
    setCurrChange(currentChange);
    setMode(currentMode);
  };

  // API RESULT
  // Get Last KTP and KK info
  useEffect(() => {
    getUpdataResult(updataAction);
  }, [updataAction, getUpdataResult]);

  const getUpdataResult = useCallback(
    (act) => {
      if (act === GET_UPDATA_LAST_KTP_INFO_SUCCESS) {
        setLoading(false);
        getUpdataLastKTPInfoClear();
        setKTPInitialValue(getUpdataLastKTPInfoResponse?.data);
      }
      if (act === GET_UPDATA_LAST_KTP_INFO_FAILED) {
        setLoading(false);
        getUpdataLastKTPInfoClear();
        if (getUpdataLastKTPInfoFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          Alert.alert('Error', getUpdataLastKTPInfoFailed?.message);
        }
      }
      if (act === GET_UPDATA_LAST_KK_INFO_SUCCESS) {
        setLoading(false);
        getUpdataLastKKInfoClear();
        setKKInitialValue(getUpdataLastKKInfoResponse?.data);
      }
      if (act === GET_UPDATA_LAST_KK_INFO_FAILED) {
        setLoading(false);
        getUpdataLastKKInfoClear();
        if (getUpdataLastKKInfoFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          Alert.alert('Error', getUpdataLastKKInfoFailed?.message);
        }
      }
      if (act === SET_UPDATA_CHECK_KK_KTP_SUCCESS) {
        setLoading(false);
        setUpdataCheckKKKTPClear();
        setIsSubmit(false);
        setIsResponseModal(true);
      }
      if (act === SET_UPDATA_CHECK_KK_KTP_FAILED) {
        setLoading(false);
        setUpdataCheckKKKTPClear();
        setIsSubmit(false);
        if (setUpdataCheckKKKTPFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          if (setUpdataCheckKKKTPFailed?.message === 'INVALID_NIK') {
            setIsInvalidNIKModal(true);
            return;
          }
          Alert.alert('Error', setUpdataCheckKKKTPFailed?.message);
        }
      }
    },
    [
      getUpdataLastKKInfoClear,
      getUpdataLastKKInfoFailed?.message,
      getUpdataLastKTPInfoClear,
      getUpdataLastKTPInfoFailed?.message,
      setKKInitialValue,
      setKTPInitialValue,
      setLoading,
      setUpdataCheckKKKTPClear,
      setUpdataCheckKKKTPFailed?.message,
      getUpdataLastKTPInfoResponse?.data,
      getUpdataLastKKInfoResponse?.data,
    ]
  );

  // Validation
  const isFormInvalid = useCallback(() => {
    const isKTPFormError = Object.entries(ktpInput.messages).some(
      ([key, value]) => value !== null
    );

    const isNomorKKFormError = Object.entries(nomorKKInput.messages).some(
      ([key, value]) => value !== null
    );

    const isKepalaKeluargaFormError = Object.entries(
      kepalaKeluargaInput.messages
    ).some(([key, value]) => value !== null);

    let isIstriFormError = false;
    if (!_.isEmpty(istriInput)) {
      isIstriFormError = Object.entries(istriInput.messages).some(
        ([key, value]) => value !== null
      );
    }
    let isAnaksFormError = false;
    if (!_.isEmpty(anaksInput)) {
      isAnaksFormError = Object.entries(anaksInput).some(([key, value]) => {
        return Object.entries(value.messages).some(([k, v]) => v !== null);
      });
    }
    return (
      isKTPFormError ||
      isNomorKKFormError ||
      isKepalaKeluargaFormError ||
      isIstriFormError ||
      isAnaksFormError ||
      isSelectedChildrenInvalid()
    );
  }, [
    anaksInput,
    isSelectedChildrenInvalid,
    istriInput,
    kepalaKeluargaInput.messages,
    ktpInput.messages,
    nomorKKInput.messages,
  ]);

  const isSelectedChildrenInvalid = useCallback(() => {
    return selectedChildren.length > 3;
  }, [selectedChildren.length]);

  const validateFieldInput = useCallback(
    (key, errors, values) => {
      let errorMessage = null;
      const value = values[key] || '';
      if (errors[key].includes(ERRORS.required)) {
        if (!value) {
          errorMessage = {
            error: `${trans(locale, lang, key)} ${trans(
              locale,
              lang,
              ERRORS.required
            )}`,
          };
          return errorMessage;
        }
      }
      if (errors[key].includes(ERRORS.numberOnly)) {
        if (value && Number.isNaN(Number(value))) {
          errorMessage = {
            warning: `${trans(locale, lang, key)} ${trans(
              locale,
              lang,
              ERRORS.numberOnly
            )}`,
          };
          return errorMessage;
        }
      }
      if (errors[key].includes('valid')) {
        if (key === 'idCardNumber' || key === 'familyCardNumber') {
          if (value && value.length !== 16) {
            errorMessage = {
              warning: `${trans(locale, lang, key)} ${trans(
                locale,
                lang,
                ERRORS.invalid
              )}`,
            };
            return errorMessage;
          }
        }
        if (key === 'maritalStatus') {
          if (!MARITAL_STATUS.includes(value.toUpperCase())) {
            errorMessage = {
              warning: `${trans(locale, lang, key)} ${trans(
                locale,
                lang,
                ERRORS.invalid
              )}. ${trans(locale, lang, 'suggestionMaritalStatus')}`,
            };
            return errorMessage;
          }
        }
        if (key === 'familyRelationshipStatus') {
          if (!FAMILY_RELATIONSHIP_STATUS.includes(value.toUpperCase())) {
            errorMessage = {
              warning: `${trans(locale, lang, key)} ${trans(
                locale,
                lang,
                ERRORS.invalid
              )}. ${trans(locale, lang, 'suggestionFamilyRelationshipStatus')}`,
            };
            return errorMessage;
          }
        }
        if (key === 'gender') {
          if (!GENDERS.includes(value.toUpperCase())) {
            errorMessage = {
              error: `${trans(locale, lang, key)} ${trans(
                locale,
                lang,
                ERRORS.invalid
              )}`,
            };
            return errorMessage;
          }
        }
        if (key === 'dob') {
          if (!moment(value, defaultFormatDateDMY, true).isValid()) {
            errorMessage = {
              error: `${trans(locale, lang, key)} ${trans(
                locale,
                lang,
                ERRORS.invalid
              )}`,
            };
            return errorMessage;
          }
        }
        if (key === 'neighborhood' || key === 'hamlet') {
          if (value.length > 3) {
            errorMessage = {
              warning: `${trans(locale, lang, key)} ${trans(
                locale,
                lang,
                ERRORS.invalid
              )}`,
            };
            return errorMessage;
          }
        }
      }
      if (errors[key].includes(ERRORS.maxBeneficiaryAge)) {
        if (values.age && values.age > MAX_BENEFICIARY_AGE) {
          errorMessage = {
            error: `${trans(locale, lang, ERRORS.maxBeneficiaryAge)}`,
          };
          return errorMessage;
        }
      }
      if (errors[key].includes(ERRORS.notWorking)) {
        if (
          !ALLOWED_OCCUPATION.some((item) => {
            return matchTypoTolerance(values.occupation || '', item);
          })
        ) {
          errorMessage = {
            error: `${trans(locale, lang, ERRORS.notWorking)}`,
          };
          return errorMessage;
        }
      }
      if (errors[key].includes(ERRORS.notMarried)) {
        if (
          !ALLOWED_MARITAL_STATUS.some((item) => {
            return matchTypoTolerance(values.maritalStatus || '', item);
          })
        ) {
          errorMessage = {
            error: `${trans(locale, lang, ERRORS.notMarried)}`,
          };
          return errorMessage;
        }
      }
      return errorMessage;
    },
    [lang]
  );

  const validateRowAnak = useCallback((values) => {
    const errorsMessage = [];
    if (values.age !== '' && values.age > MAX_BENEFICIARY_AGE) {
      errorsMessage.push(ERRORS.maxBeneficiaryAge);
    }
    if (
      values.age === '' &&
      moment().diff(values.dob || new Date(), 'years') > MAX_BENEFICIARY_AGE
    ) {
      errorsMessage.push(ERRORS.maxBeneficiaryAge);
    }
    if (
      values.occupation !== '' &&
      !ALLOWED_OCCUPATION.some((item) => {
        return matchTypoTolerance(values.occupation, item);
      })
    ) {
      errorsMessage.push(ERRORS.notWorking);
    }
    if (
      values.maritalStatus !== '' &&
      !ALLOWED_MARITAL_STATUS.some((item) => {
        return matchTypoTolerance(values.maritalStatus, item);
      })
    ) {
      errorsMessage.push(ERRORS.notMarried);
    }
    return errorsMessage;
  }, []);

  // Set Initial Value
  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      if (!isKTPSame) {
        setKTPInitialValue(setUpdataKTPResponse?.data?.user);
      }
      if (!isKKSame) {
        setKKInitialValue(setUpdataKKResponse?.data?.family);
      }
      firstUpdate.current = false;
    }
  }, [
    isKKSame,
    isKTPSame,
    setKKInitialValue,
    setKTPInitialValue,
    setUpdataKKResponse?.data?.family,
    setUpdataKTPResponse?.data?.user,
  ]);

  const setKTPInitialValue = useCallback(
    (dataKTP) => {
      let ktp = dataKTP;
      if (_.isEmpty(ktp)) {
        ktp = ktpInitialState.values;
      }
      setKTPInput((prevState) => {
        return {
          ...prevState,
          values: {
            ...prevState.values,
            ...ktp,
          },
          messages: {
            ...prevState.messages,
            idCardNumber: validateFieldInput(
              'idCardNumber',
              prevState.errors,
              ktp
            ),
            name: validateFieldInput('name', prevState.errors, ktp),
            gender: validateFieldInput('gender', prevState.errors, ktp),
            pob: validateFieldInput('pob', prevState.errors, ktp),
            dob: validateFieldInput('dob', prevState.errors, ktp),
            address: validateFieldInput('address', prevState.errors, ktp),
            province: validateFieldInput('province', prevState.errors, ktp),
            city: validateFieldInput('city', prevState.errors, ktp),
            district: validateFieldInput('district', prevState.errors, ktp),
            subDistrict: validateFieldInput(
              'subDistrict',
              prevState.errors,
              ktp
            ),
            neighborhood: validateFieldInput(
              'neighborhood',
              prevState.errors,
              ktp
            ),
            hamlet: validateFieldInput('hamlet', prevState.errors, ktp),
            maritalStatus: validateFieldInput(
              'maritalStatus',
              prevState.errors,
              ktp
            ),
            occupation: validateFieldInput('occupation', prevState.errors, ktp),
          },
        };
      });
    },
    [validateFieldInput]
  );

  const setKKInitialValue = useCallback(
    (dataKK) => {
      const kk = dataKK;
      let nomorKK = nomorKKInitialState.values;
      let kepalaKeluarga = kkInitialState.values;
      let istri = {};
      const anaks = [];

      nomorKK = !_.isEmpty(kk) && { familyCardNumber: kk?.familyCardNumber };
      kk?.familyMembers?.forEach((data) => {
        if (
          data.familyRelationshipStatus === null ||
          data.familyRelationshipStatus === '' ||
          data.familyRelationshipStatus === undefined
        ) {
          return;
        }
        if (
          matchTypoTolerance('KEPALA KELUARGA', data.familyRelationshipStatus)
        ) {
          kepalaKeluarga = {
            ...data,
            familyRelationshipStatus: 'Kepala Keluarga',
            age: moment(new Date()).diff(
              moment(data.dob, defaultFormatDateDMY, true),
              'years',
              false
            ),
          };
          return;
        }
        if (matchTypoTolerance('ISTRI', data.familyRelationshipStatus)) {
          istri = {
            ...data,
            familyRelationshipStatus: 'Istri',
            age: moment(new Date()).diff(
              moment(data.dob, defaultFormatDateDMY, true),
              'years',
              false
            ),
          };
          return;
        }
        if (matchTypoTolerance('ANAK', data.familyRelationshipStatus)) {
          anaks.push({
            ...data,
            familyRelationshipStatus: 'Anak',
            age: moment(new Date()).diff(
              moment(data.dob, defaultFormatDateDMY, true),
              'years',
              false
            ),
          });
          return;
        }
        if (matchTypoTolerance('ANAK KANDUNG', data.familyRelationshipStatus)) {
          anaks.push({
            ...data,
            familyRelationshipStatus: 'Anak Kandung',
            age: moment(new Date()).diff(
              moment(data.dob, defaultFormatDateDMY, true),
              'years',
              false
            ),
          });
          return;
        }
        if (matchTypoTolerance('ANAK ANGKAT', data.familyRelationshipStatus)) {
          anaks.push({
            ...data,
            familyRelationshipStatus: 'Anak Angkat',
            age: moment(new Date()).diff(
              moment(data.dob, defaultFormatDateDMY, true),
              'years',
              false
            ),
          });
        }
      });

      setNomorKKInput((prevState) => {
        return {
          ...prevState,
          values: {
            ...prevState.values,
            ...nomorKK,
          },
          messages: {
            ...prevState.messages,
            familyCardNumber: validateFieldInput(
              'familyCardNumber',
              prevState.errors,
              nomorKK
            ),
          },
        };
      });
      setKepalaKeluargaRaw(kepalaKeluarga);
      setKepalaKeluargaInput((prevState) => {
        return {
          ...prevState,
          values: {
            ...prevState.values,
            ...kepalaKeluarga,
          },
          messages: {
            ...prevState.messages,
            idCardNumber: validateFieldInput(
              'idCardNumber',
              prevState.errors,
              kepalaKeluarga
            ),
            name: validateFieldInput('name', prevState.errors, kepalaKeluarga),
            gender: validateFieldInput(
              'gender',
              prevState.errors,
              kepalaKeluarga
            ),
            pob: validateFieldInput('pob', prevState.errors, kepalaKeluarga),
            dob: validateFieldInput('dob', prevState.errors, kepalaKeluarga),
            occupation: validateFieldInput(
              'occupation',
              prevState.errors,
              kepalaKeluarga
            ),
            familyRelationshipStatus: validateFieldInput(
              'familyRelationshipStatus',
              prevState.errors,
              kepalaKeluarga
            ),
            maritalStatus: validateFieldInput(
              'maritalStatus',
              prevState.errors,
              kepalaKeluarga
            ),
          },
        };
      });

      if (!_.isEmpty(istri)) {
        setIstriRaw(istri);
        setIstriInput(() => {
          return {
            ...kkInitialState,
            values: {
              ...kkInitialState.values,
              ...istri,
            },
            messages: {
              ...kkInitialState.messages,
              idCardNumber: validateFieldInput(
                'idCardNumber',
                kkInitialState.errors,
                istri
              ),
              name: validateFieldInput('name', kkInitialState.errors, istri),
              gender: validateFieldInput(
                'gender',
                kkInitialState.errors,
                istri
              ),
              pob: validateFieldInput('pob', kkInitialState.errors, istri),
              dob: validateFieldInput('dob', kkInitialState.errors, istri),
              occupation: validateFieldInput(
                'occupation',
                kkInitialState.errors,
                istri
              ),
              familyRelationshipStatus: validateFieldInput(
                'familyRelationshipStatus',
                kkInitialState.errors,
                istri
              ),
              maritalStatus: validateFieldInput(
                'maritalStatus',
                kkInitialState.errors,
                istri
              ),
            },
          };
        });
      }

      if (anaks.length > 0) {
        anaks
          .sort((a, b) => b.age - a.age)
          .forEach((data, index) => {
            setAnaksRaw((prevState) => [...prevState, { ...data, index }]);
            setAnaksInput((prevState) => {
              return {
                ...prevState,
                [Object.entries(prevState).length]: {
                  ...anakInitialState,
                  values: {
                    ...anakInitialState.values,
                    ...data,
                  },
                  ...(selectedChildren.includes(index) && {
                    messages: {
                      ...anakInitialState.messages,
                      idCardNumber: validateFieldInput(
                        'idCardNumber',
                        anakInitialState.errors,
                        data
                      ),
                      name: validateFieldInput(
                        'name',
                        anakInitialState.errors,
                        data
                      ),
                      gender: validateFieldInput(
                        'gender',
                        anakInitialState.errors,
                        data
                      ),
                      pob: validateFieldInput(
                        'pob',
                        anakInitialState.errors,
                        data
                      ),
                      dob: validateFieldInput(
                        'dob',
                        anakInitialState.errors,
                        data
                      ),
                      occupation: validateFieldInput(
                        'occupation',
                        anakInitialState.errors,
                        data
                      ),
                      familyRelationshipStatus: validateFieldInput(
                        'familyRelationshipStatus',
                        anakInitialState.errors,
                        data
                      ),
                      maritalStatus: validateFieldInput(
                        'maritalStatus',
                        anakInitialState.errors,
                        data
                      ),
                    },
                  }),
                },
              };
            });
          });
      }
    },
    [selectedChildren, validateFieldInput]
  );

  useEffect(() => {
    if (isKTPSame) {
      setLoading(true);
      getUpdataLastKTPInfo({ category: 'reminder' });
    }
  }, [getUpdataLastKTPInfo, isKTPSame, setLoading]);

  useEffect(() => {
    if (isKKSame) {
      setLoading(true);
      getUpdataLastKKInfo({ category: 'reminder' });
    }
  }, [getUpdataLastKKInfo, isKKSame, setLoading]);

  // Mapping payload before submit to API
  const decodeMaritalStatus = useCallback((maritalStatus) => {
    if (maritalStatus.toUpperCase() === 'BELUM KAWIN') {
      return 'B0';
    }
    if (
      maritalStatus.toUpperCase() === 'KAWIN' ||
      maritalStatus.toUpperCase() === 'KAWIN TERCATAT' ||
      maritalStatus.toUpperCase() === 'KAWIN BELUM TERCATAT'
    ) {
      return 'K0';
    }
    if (
      maritalStatus.toUpperCase() === 'CERAI HIDUP' ||
      maritalStatus.toUpperCase() === 'CERAI MATI'
    ) {
      return 'JD';
    }
    return maritalStatus;
  }, []);

  const decodeFamilyRelationshipStatus = useCallback((familyStatus) => {
    if (
      familyStatus.toUpperCase().match('KEPALA KELUARGA') ||
      familyStatus.toUpperCase().match('SUAMI')
    ) {
      return 'S';
    }
    if (
      familyStatus.toUpperCase().match('ISTRI') ||
      familyStatus.toUpperCase().match('ISTERI')
    ) {
      return 'I';
    }
    if (
      familyStatus.toUpperCase().match('ANAK') ||
      familyStatus.toUpperCase().match('ANAK KANDUNG') ||
      familyStatus.toUpperCase().match('ANAK ANGKAT') ||
      familyStatus.toUpperCase().match('ANAK TIRI')
    ) {
      return '1';
    }
    return familyStatus;
  }, []);

  const getPayload = useCallback(
    (type) => {
      const kkResponse = !isKKSame
        ? setUpdataKKResponse?.data?.family
        : getUpdataLastKKInfoResponse?.data;

      const filteredFamily = removeColumnFromObject(
        kkResponse,
        'familyMembers'
      );

      const filteredKepalaKeluarga = removeColumnFromObject(
        kepalaKeluargaInput.values,
        'age'
      );
      let filteredIstri = {};
      if (!_.isEmpty(istriInput)) {
        filteredIstri = removeColumnFromObject(istriInput.values, 'age');
      }
      let filteredAnaks = [];
      if (!_.isEmpty(anaksInput)) {
        filteredAnaks = Object.entries(anaksInput)
          .sort(([kA, vA], [kB, vB]) => vB.values.age - vA.values.age)
          .map(([key, anak]) => {
            const { age, ...filteredAnak } = anak.values;
            return filteredAnak;
          });
      }

      if (type === 'verifyPengkinian') {
        const verifyPengkinianPayload = {
          user: {
            ...ktpInput.values,
            dob: moment(ktpInput.values.dob, defaultFormatDateDMY).format(
              'DD-MM-YYYY'
            ),
          },
          family: {
            ...filteredFamily,
            familyCardNumber: nomorKKInput.values.familyCardNumber,
            familyMembers: [
              {
                ...filteredKepalaKeluarga,
                dob: moment(
                  filteredKepalaKeluarga.dob,
                  defaultFormatDateDMY
                ).format('DD-MM-YYYY'),
              },
              ...(!_.isEmpty(istriInput)
                ? [
                    {
                      ...filteredIstri,
                      dob: moment(
                        filteredIstri.dob,
                        defaultFormatDateDMY
                      ).format('DD-MM-YYYY'),
                    },
                  ]
                : []),
              ...filteredAnaks
                .filter((data, index) => {
                  return selectedChildren.includes(index.toString());
                })
                .map((data, index) => {
                  return {
                    ...data,
                    dob: moment(data.dob, defaultFormatDateDMY).format(
                      'DD-MM-YYYY'
                    ),
                  };
                }),
            ],
          },
        };
        return verifyPengkinianPayload;
      }
      if (type === 'checkKKAndKTP') {
        const checkKKAndKTPPayload = {
          KK: {
            familyCardData: {
              ...filteredFamily,
              familyCardNumber: nomorKKInput.values.familyCardNumber,
            },
            rawFamilyMembers: [
              {
                ...kepalaKeluargaRaw,
              },
              ...(!_.isEmpty(istriInput)
                ? [
                    {
                      ...istriRaw,
                    },
                  ]
                : []),
              ...anaksRaw
                .filter((anak) => {
                  return selectedChildren.includes(anak?.index?.toString());
                })
                .map((data) => {
                  return {
                    ...data,
                  };
                }),
            ],
            familyMembers: [
              {
                ...filteredKepalaKeluarga,
                dob: moment(
                  filteredKepalaKeluarga.dob,
                  defaultFormatDateDMY
                ).format('DD-MM-YYYY'),
                gender:
                  filteredKepalaKeluarga.gender.toUpperCase() === 'PEREMPUAN'
                    ? 'F'
                    : 'M',
                maritalStatus: decodeMaritalStatus(
                  filteredKepalaKeluarga.maritalStatus
                ),
                familyRelationshipStatus: decodeFamilyRelationshipStatus(
                  filteredKepalaKeluarga.familyRelationshipStatus
                ),
              },
              ...(!_.isEmpty(istriInput)
                ? [
                    {
                      ...filteredIstri,
                      dob: moment(
                        filteredIstri.dob,
                        defaultFormatDateDMY
                      ).format('DD-MM-YYYY'),
                      gender:
                        filteredIstri.gender.toUpperCase() === 'PEREMPUAN'
                          ? 'F'
                          : 'M',
                      maritalStatus: decodeMaritalStatus(
                        filteredIstri.maritalStatus
                      ),
                      familyRelationshipStatus: decodeFamilyRelationshipStatus(
                        filteredIstri.familyRelationshipStatus
                      ),
                    },
                  ]
                : []),
              ...filteredAnaks
                .filter((data, index) => {
                  return selectedChildren.includes(index.toString());
                })
                .map((data, index) => {
                  return {
                    ...data,
                    dob: moment(data.dob, defaultFormatDateDMY).format(
                      'DD-MM-YYYY'
                    ),
                    gender:
                      data.gender.toUpperCase() === 'PEREMPUAN' ? 'F' : 'M',
                    maritalStatus: decodeMaritalStatus(data.maritalStatus),
                    familyRelationshipStatus: decodeFamilyRelationshipStatus(
                      data.familyRelationshipStatus
                    ),
                  };
                }),
            ],
          },
          KTP: {
            user: {
              ...ktpInput.values,
              dob: moment(ktpInput.values.dob, defaultFormatDateDMY).format(
                'DD-MM-YYYY'
              ),
              gender:
                ktpInput.values.gender.toUpperCase() === 'PEREMPUAN'
                  ? 'F'
                  : 'M',
              maritalStatus: decodeMaritalStatus(ktpInput.values.maritalStatus),
            },
          },
        };
        return checkKKAndKTPPayload;
      }
      return null;
    },
    [
      anaksInput,
      anaksRaw,
      decodeFamilyRelationshipStatus,
      decodeMaritalStatus,
      getUpdataLastKKInfoResponse?.data,
      isKKSame,
      istriInput,
      istriRaw,
      kepalaKeluargaInput.values,
      kepalaKeluargaRaw,
      ktpInput.values,
      nomorKKInput.values.familyCardNumber,
      selectedChildren,
      setUpdataKKResponse?.data?.family,
    ]
  );

  // UI Functions
  function renderStepsContainer() {
    return (
      <View style={style.steps.container}>
        <View style={style.steps.step.container}>
          <UpdataStep1Active />
          <View style={style.steps.step.line.active} />
          <UpdataStep2Active />
          <View style={style.steps.step.line.active} />
          <UpdataStep3Active />
          <View style={style.steps.step.line.inactive} />
          <UpdataStep4Inactive />
        </View>
        <Text
          textStyle="semi"
          size={Size.text.body2.size}
          line={21}
          letterSpacing={0.5}
          color={Color.primary.light.primary90}>
          {trans(locale, lang, 'reviewDokumen')}
        </Text>
      </View>
    );
  }

  function renderContentContainer() {
    return (
      <View style={style.py16}>
        {/* {renderKTPAccordion()} */}
        {renderKepalaKeluargaAccordion()}
        {renderIstriAccordion()}
        {renderAnakAccordion()}
      </View>
    );
  }

  // eslint-disable-next-line react/no-unstable-nested-components, react/prop-types
  function RadioButton({
    disabled,
    desc,
    currValue,
    optValue,
    onPress,
    isError,
  }) {
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <View
          style={[
            style.radioButton.radioButtonContainer,
            isError && { borderColor: Color.primary.light.primary90 },
            disabled && {
              backgroundColor: Color.grayButton.light.grayButton,
              borderColor: Color.grayButton.light.grayButton,
            },
          ]}>
          <View style={style.radioButton.radioButtonContent}>
            {currValue === optValue ? (
              <View style={style.radioButton.radioButtonCircle} />
            ) : null}
          </View>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            color={
              currValue === optValue
                ? Color.neutral.light.neutral60
                : Color.grayIcon.dark.grayIcon
            }>
            {desc}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  function renderKTPAccordion() {
    return (
      <ListAccordion
        header={
          <Text
            textStyle="semi"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}>
            {trans(locale, lang, 'dataKTP')}
          </Text>
        }
        suffixIcon={<ArrowDownGray />}
        style={style.accordion.container}
        headerContainerStyle={style.accordion.header}>
        <View style={style.accordion.content}>
          {Object.entries(ktpInput?.values).map(([inputKey, v]) => {
            if (inputKey === 'dob') {
              return (
                <View key={inputKey} style={style.mb16}>
                  <Input
                    height={56}
                    value={
                      moment(v, defaultFormatDateDMY, true).isValid()
                        ? moment(v, defaultFormatDateDMY, true).format(
                            'DD MMMM YYYY'
                          )
                        : ''
                    }
                    editable={false}
                    pressable
                    defaultValue={
                      moment(v, defaultFormatDateDMY, true).isValid()
                        ? moment(v, defaultFormatDateDMY, true).format(
                            'DD MMMM YYYY'
                          )
                        : ''
                    }
                    label={trans(locale, lang, inputKey)}
                    secondLabel={
                      <Text
                        color={Color.primary.light.primary90}
                        size={Size.text.body2.size}
                        textStyle="semi">
                        {trans(locale, lang, '*')}
                      </Text>
                    }
                    placeholder={trans(locale, lang, inputKey)}
                    suffixIcon={<Calendar {...iconProps} />}
                    handleSuffixIcon={() => {
                      showMode('date', 'ktp');
                    }}
                    onInputPress={() => {
                      showMode('date', 'ktp');
                    }}
                    message={ktpInput.messages[inputKey]}
                  />
                  <View>
                    {show && currChange === 'ktp' && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={
                          moment(v, defaultFormatDateDMY, true).isValid()
                            ? new Date(
                                moment(
                                  v,
                                  defaultFormatDateDMY,
                                  true
                                ).toISOString()
                              )
                            : new Date(
                                moment(
                                  defaultDateDMY,
                                  defaultFormatDateDMY,
                                  true
                                ).toISOString()
                              )
                        }
                        maximumDate={new Date().setDate(
                          new Date().getDate() - 1
                        )}
                        mode={mode}
                        display="spinner"
                        is24Hour
                        textColor={Color.primary.light.primary90}
                        accentColor={Color.primary.light.primary90}
                        onChange={(event, selectedDate) => {
                          setShow(!show);
                          if (event.type !== 'dismissed') {
                            setKTPInput((prevState) => {
                              return {
                                ...prevState,
                                values: {
                                  ...prevState.values,
                                  dob: new Date(selectedDate),
                                },
                                messages: {
                                  ...prevState.messages,
                                  dob: validateFieldInput(
                                    'dob',
                                    prevState.errors,
                                    {
                                      ...prevState.values,
                                      dob: new Date(selectedDate),
                                    }
                                  ),
                                },
                              };
                            });
                          }
                        }}
                      />
                    )}
                  </View>
                </View>
              );
            }
            if (inputKey === 'gender') {
              return (
                <View key={inputKey} style={style.mb16}>
                  <View style={[style.flexDirectionRow, style.mb4]}>
                    <Text
                      size={Size.text.caption1.size}
                      textStyle="semi"
                      line={18}
                      letterSpacing={0.5}
                      color={
                        v !== ''
                          ? Color.neutral.light.neutral90
                          : Color.mediumGray.light.mediumGray
                      }>
                      {trans(locale, lang, inputKey)}{' '}
                    </Text>
                    {ktpInput?.errors[inputKey]?.includes(ERRORS.required)
                      ? requiredLabel
                      : null}
                  </View>
                  <View style={style.radioButton.radioButtonInputContainer}>
                    <RadioButton
                      desc={trans(locale, lang, 'lakiLaki')}
                      currValue={
                        matchTypoTolerance(v?.toString() || '', 'Laki-laki')
                          ? 'M'
                          : ''
                      }
                      optValue="M"
                      onPress={() => {
                        setKTPInput((prevState) => {
                          return {
                            ...prevState,
                            values: {
                              ...prevState.values,
                              [inputKey]: 'Laki-laki',
                            },
                            messages: {
                              ...prevState.messages,
                              [inputKey]: validateFieldInput(
                                inputKey,
                                prevState.errors,
                                { ...prevState.values, [inputKey]: 'Laki-laki' }
                              ),
                            },
                          };
                        });
                      }}
                      isError={ktpInput?.messages[inputKey] !== null}
                    />
                    <RadioButton
                      desc={trans(locale, lang, 'perempuan')}
                      currValue={
                        matchTypoTolerance(v?.toString() || '', 'Perempuan')
                          ? 'F'
                          : ''
                      }
                      optValue="F"
                      onPress={() => {
                        setKTPInput((prevState) => {
                          return {
                            ...prevState,
                            values: {
                              ...prevState.values,
                              [inputKey]: 'Perempuan',
                            },
                            messages: {
                              ...prevState.messages,
                              [inputKey]: validateFieldInput(
                                inputKey,
                                prevState.errors,
                                { ...prevState.values, [inputKey]: 'Perempuan' }
                              ),
                            },
                          };
                        });
                      }}
                      isError={ktpInput?.messages[inputKey] !== null}
                    />
                  </View>
                  {ktpInput?.messages[inputKey] ? (
                    <Text
                      size={Size.text.caption2.size}
                      color={Color.primary.light.primary90}
                      textStyle="medium"
                      line={16.5}
                      style={style.mt6}>
                      {ktpInput.messages[inputKey].error}
                    </Text>
                  ) : null}
                </View>
              );
            }
            return (
              <View key={inputKey} style={style.mb16}>
                <Input
                  height={56}
                  secondLabel={
                    ktpInput?.errors[inputKey]?.includes(ERRORS.required)
                      ? requiredLabel
                      : null
                  }
                  keyboardType={
                    ktpInput?.errors[inputKey]?.includes('numberOnly')
                      ? 'number-pad'
                      : 'default'
                  }
                  value={v ? v?.toString() || '' : ''}
                  label={trans(locale, lang, inputKey)}
                  placeholder={trans(locale, lang, inputKey)}
                  onChangeText={(text) => {
                    setKTPInput((prevState) => {
                      return {
                        ...prevState,
                        values: {
                          ...prevState.values,
                          [inputKey]: text,
                        },
                        messages: {
                          ...prevState.messages,
                          [inputKey]: validateFieldInput(
                            inputKey,
                            prevState.errors,
                            { ...prevState.values, [inputKey]: text }
                          ),
                        },
                      };
                    });
                  }}
                  message={ktpInput.messages[inputKey]}
                />
              </View>
            );
          })}
        </View>
      </ListAccordion>
    );
  }

  function renderKepalaKeluargaAccordion() {
    return (
      <ListAccordion
        header={
          <Text
            textStyle="semi"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}>
            {`${trans(locale, lang, 'dataDiri')} - ${trans(
              locale,
              lang,
              'kepalaKeluarga'
            )}`}
          </Text>
        }
        suffixIcon={<ArrowDownGray />}
        style={style.accordion.container}
        headerContainerStyle={style.accordion.header}>
        <View style={style.accordion.content}>
          <View style={style.mb16}>
            <Input
              height={56}
              secondLabel={
                nomorKKInput?.errors?.familyCardNumber?.includes(
                  ERRORS.required
                )
                  ? requiredLabel
                  : null
              }
              keyboardType={
                nomorKKInitialState?.errors?.familyCardNumber?.includes(
                  'numberOnly'
                )
                  ? 'number-pad'
                  : 'default'
              }
              value={
                nomorKKInput?.values?.familyCardNumber
                  ? nomorKKInput?.values?.familyCardNumber?.toString()
                  : ''
              }
              label={trans(locale, lang, 'familyCardNumber')}
              placeholder={trans(locale, lang, 'familyCardNumber')}
              onChangeText={(text) => {
                setNomorKKInput((prevState) => {
                  return {
                    ...prevState,
                    values: {
                      ...prevState.values,
                      familyCardNumber: text,
                    },
                    messages: {
                      ...prevState.messages,
                      familyCardNumber: validateFieldInput(
                        'familyCardNumber',
                        prevState.errors,
                        { ...prevState.values, familyCardNumber: text }
                      ),
                    },
                  };
                });
              }}
              message={nomorKKInput?.messages?.familyCardNumber}
            />
          </View>
          {Object.entries(kepalaKeluargaInput?.values).map(([inputKey, v]) => {
            if (inputKey === 'dob') {
              return (
                <View key={inputKey} style={style.mb16}>
                  <Input
                    height={56}
                    value={
                      moment(v, defaultFormatDateDMY, true).isValid()
                        ? moment(v, defaultFormatDateDMY, true).format(
                            'DD MMMM YYYY'
                          )
                        : ''
                    }
                    editable={false}
                    pressable
                    defaultValue={
                      moment(v, defaultFormatDateDMY, true).isValid()
                        ? moment(v, defaultFormatDateDMY, true).format(
                            'DD MMMM YYYY'
                          )
                        : ''
                    }
                    label={trans(locale, lang, inputKey)}
                    secondLabel={
                      <Text
                        color={Color.primary.light.primary90}
                        size={Size.text.body2.size}
                        textStyle="semi">
                        {trans(locale, lang, '*')}
                      </Text>
                    }
                    placeholder={trans(locale, lang, inputKey)}
                    suffixIcon={<Calendar {...iconProps} />}
                    handleSuffixIcon={() => {
                      showMode('date', 'kepalaKeluarga');
                    }}
                    onInputPress={() => {
                      showMode('date', 'kepalaKeluarga');
                    }}
                    message={kepalaKeluargaInput.messages[inputKey]}
                  />
                  <View>
                    {show && currChange === 'kepalaKeluarga' && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={
                          moment(v, defaultFormatDateDMY, true).isValid()
                            ? new Date(
                                moment(
                                  v,
                                  defaultFormatDateDMY,
                                  true
                                ).toISOString()
                              )
                            : new Date(
                                moment(
                                  defaultDateDMY,
                                  defaultFormatDateDMY,
                                  true
                                ).toISOString()
                              )
                        }
                        maximumDate={new Date().setDate(
                          new Date().getDate() - 1
                        )}
                        mode={mode}
                        display="spinner"
                        is24Hour
                        textColor={Color.primary.light.primary90}
                        accentColor={Color.primary.light.primary90}
                        onChange={(event, selectedDate) => {
                          setShow(!show);
                          if (event.type !== 'dismissed') {
                            setKepalaKeluargaInput((prevState) => {
                              return {
                                ...prevState,
                                values: {
                                  ...prevState.values,
                                  dob: new Date(selectedDate),
                                  age: moment(new Date()).diff(
                                    moment(selectedDate),
                                    'years',
                                    false
                                  ),
                                },
                                messages: {
                                  ...prevState.messages,
                                  dob: validateFieldInput(
                                    'dob',
                                    prevState.errors,
                                    {
                                      ...prevState.values,
                                      dob: new Date(selectedDate),
                                    }
                                  ),
                                },
                              };
                            });
                          }
                        }}
                      />
                    )}
                  </View>
                </View>
              );
            }
            if (inputKey === 'gender') {
              return (
                <View key={inputKey} style={style.mb16}>
                  <View style={[style.flexDirectionRow, style.mb4]}>
                    <Text
                      size={Size.text.caption1.size}
                      textStyle="semi"
                      line={18}
                      letterSpacing={0.5}
                      color={
                        v !== ''
                          ? Color.neutral.light.neutral90
                          : Color.mediumGray.light.mediumGray
                      }>
                      {trans(locale, lang, inputKey)}{' '}
                    </Text>
                    {kepalaKeluargaInput?.errors[inputKey]?.includes(
                      ERRORS.required
                    )
                      ? requiredLabel
                      : null}
                  </View>
                  <View style={style.radioButton.radioButtonInputContainer}>
                    <RadioButton
                      desc={trans(locale, lang, 'lakiLaki')}
                      currValue={
                        matchTypoTolerance(v?.toString() || '', 'Laki-laki')
                          ? 'M'
                          : ''
                      }
                      optValue="M"
                      onPress={() => {
                        setKepalaKeluargaInput((prevState) => {
                          return {
                            ...prevState,
                            values: {
                              ...prevState.values,
                              [inputKey]: 'Laki-laki',
                            },
                            messages: {
                              ...prevState.messages,
                              [inputKey]: validateFieldInput(
                                inputKey,
                                prevState.errors,
                                { ...prevState.values, [inputKey]: 'Laki-laki' }
                              ),
                            },
                          };
                        });
                      }}
                      isError={kepalaKeluargaInput?.messages[inputKey] !== null}
                    />
                    <RadioButton
                      desc={trans(locale, lang, 'perempuan')}
                      currValue={
                        matchTypoTolerance(v?.toString() || '', 'Perempuan')
                          ? 'F'
                          : ''
                      }
                      optValue="F"
                      onPress={() => {
                        setKepalaKeluargaInput((prevState) => {
                          return {
                            ...prevState,
                            values: {
                              ...prevState.values,
                              [inputKey]: 'Perempuan',
                            },
                            messages: {
                              ...prevState.messages,
                              [inputKey]: validateFieldInput(
                                inputKey,
                                prevState.errors,
                                { ...prevState.values, [inputKey]: 'Perempuan' }
                              ),
                            },
                          };
                        });
                      }}
                      isError={kepalaKeluargaInput?.messages[inputKey] !== null}
                    />
                  </View>
                  {kepalaKeluargaInput?.messages[inputKey] ? (
                    <Text
                      size={Size.text.caption2.size}
                      color={Color.primary.light.primary90}
                      textStyle="medium"
                      line={16.5}
                      style={style.mt6}>
                      {kepalaKeluargaInput.messages[inputKey].error}
                    </Text>
                  ) : null}
                </View>
              );
            }
            if (inputKey !== 'age') {
              return (
                <View key={inputKey} style={style.mb16}>
                  <Input
                    height={56}
                    secondLabel={
                      kepalaKeluargaInput?.errors[inputKey]?.includes(
                        ERRORS.required
                      )
                        ? requiredLabel
                        : null
                    }
                    keyboardType={
                      kepalaKeluargaInput?.errors[inputKey]?.includes(
                        'numberOnly'
                      )
                        ? 'number-pad'
                        : 'default'
                    }
                    value={v ? v?.toString() || '' : ''}
                    label={trans(locale, lang, inputKey)}
                    placeholder={trans(locale, lang, inputKey)}
                    onChangeText={(text) => {
                      setKepalaKeluargaInput((prevState) => {
                        return {
                          ...prevState,
                          values: {
                            ...prevState.values,
                            [inputKey]: text,
                          },
                          messages: {
                            ...prevState.messages,
                            [inputKey]: validateFieldInput(
                              inputKey,
                              prevState.errors,
                              { ...prevState.values, [inputKey]: text }
                            ),
                          },
                        };
                      });
                    }}
                    message={kepalaKeluargaInput.messages[inputKey]}
                  />
                </View>
              );
            }
            return null;
          })}
        </View>
      </ListAccordion>
    );
  }

  function renderIstriAccordion() {
    if (!_.isEmpty(istriInput)) {
      return (
        <ListAccordion
          header={
            <Text
              textStyle="semi"
              size={Size.text.body2.size}
              line={21}
              letterSpacing={0.5}>
              {`${trans(locale, lang, 'dataDiri')} - ${trans(
                locale,
                lang,
                'istri'
              )}`}
            </Text>
          }
          suffixIcon={<ArrowDownGray />}
          style={style.accordion.container}
          headerContainerStyle={style.accordion.header}>
          <View style={style.accordion.content}>
            {Object.entries(istriInput?.values).map(([inputKey, v]) => {
              if (inputKey === 'dob') {
                return (
                  <View key={inputKey} style={style.mb16}>
                    <Input
                      height={56}
                      value={
                        moment(v, defaultFormatDateDMY, true).isValid()
                          ? moment(v, defaultFormatDateDMY, true).format(
                              'DD MMMM YYYY'
                            )
                          : ''
                      }
                      editable={false}
                      pressable
                      defaultValue={
                        moment(v, defaultFormatDateDMY, true).isValid()
                          ? moment(v, defaultFormatDateDMY, true).format(
                              'DD MMMM YYYY'
                            )
                          : ''
                      }
                      label={trans(locale, lang, inputKey)}
                      secondLabel={
                        <Text
                          color={Color.primary.light.primary90}
                          size={Size.text.body2.size}
                          textStyle="semi">
                          {trans(locale, lang, '*')}
                        </Text>
                      }
                      placeholder={trans(locale, lang, inputKey)}
                      suffixIcon={<Calendar {...iconProps} />}
                      handleSuffixIcon={() => {
                        showMode('date', 'istri');
                      }}
                      onInputPress={() => {
                        showMode('date', 'istri');
                      }}
                      message={istriInput.messages[inputKey]}
                    />
                    <View>
                      {show && currChange === 'istri' && (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={
                            moment(v, defaultFormatDateDMY, true).isValid()
                              ? new Date(
                                  moment(
                                    v,
                                    defaultFormatDateDMY,
                                    true
                                  ).toISOString()
                                )
                              : new Date(
                                  moment(
                                    defaultDateDMY,
                                    defaultFormatDateDMY,
                                    true
                                  ).toISOString()
                                )
                          }
                          maximumDate={new Date().setDate(
                            new Date().getDate() - 1
                          )}
                          mode={mode}
                          display="spinner"
                          is24Hour
                          textColor={Color.primary.light.primary90}
                          accentColor={Color.primary.light.primary90}
                          onChange={(event, selectedDate) => {
                            setShow(!show);
                            if (event.type !== 'dismissed') {
                              setIstriInput((prevState) => {
                                return {
                                  ...prevState,
                                  values: {
                                    ...prevState.values,
                                    dob: new Date(selectedDate),
                                    age: moment(new Date()).diff(
                                      moment(selectedDate),
                                      'years',
                                      false
                                    ),
                                  },
                                  messages: {
                                    ...prevState.messages,
                                    dob: validateFieldInput(
                                      'dob',
                                      prevState.errors,
                                      {
                                        ...prevState.values,
                                        dob: new Date(selectedDate),
                                      }
                                    ),
                                  },
                                };
                              });
                            }
                          }}
                        />
                      )}
                    </View>
                  </View>
                );
              }
              if (inputKey === 'gender') {
                return (
                  <View key={inputKey} style={style.mb16}>
                    <View style={[style.flexDirectionRow, style.mb4]}>
                      <Text
                        size={Size.text.caption1.size}
                        textStyle="semi"
                        line={18}
                        letterSpacing={0.5}
                        color={
                          v !== ''
                            ? Color.neutral.light.neutral90
                            : Color.mediumGray.light.mediumGray
                        }>
                        {trans(locale, lang, inputKey)}{' '}
                      </Text>
                      {istriInput?.errors[inputKey]?.includes(ERRORS.required)
                        ? requiredLabel
                        : null}
                    </View>
                    <View style={style.radioButton.radioButtonInputContainer}>
                      <RadioButton
                        desc={trans(locale, lang, 'lakiLaki')}
                        currValue={
                          matchTypoTolerance(v?.toString() || '', 'Laki-laki')
                            ? 'M'
                            : ''
                        }
                        optValue="M"
                        onPress={() => {
                          setIstriInput((prevState) => {
                            return {
                              ...prevState,
                              values: {
                                ...prevState.values,
                                [inputKey]: 'Laki-laki',
                              },
                              messages: {
                                ...prevState.messages,
                                [inputKey]: validateFieldInput(
                                  inputKey,
                                  prevState.errors,
                                  {
                                    ...prevState.values,
                                    [inputKey]: 'Laki-laki',
                                  }
                                ),
                              },
                            };
                          });
                        }}
                        isError={istriInput?.messages[inputKey] !== null}
                      />
                      <RadioButton
                        desc={trans(locale, lang, 'perempuan')}
                        currValue={
                          matchTypoTolerance(v?.toString() || '', 'Perempuan')
                            ? 'F'
                            : ''
                        }
                        optValue="F"
                        onPress={() => {
                          setIstriInput((prevState) => {
                            return {
                              ...prevState,
                              values: {
                                ...prevState.values,
                                [inputKey]: 'Perempuan',
                              },
                              messages: {
                                ...prevState.messages,
                                [inputKey]: validateFieldInput(
                                  inputKey,
                                  prevState.errors,
                                  {
                                    ...prevState.values,
                                    [inputKey]: 'Perempuan',
                                  }
                                ),
                              },
                            };
                          });
                        }}
                        isError={istriInput?.messages[inputKey] !== null}
                      />
                    </View>
                    {istriInput?.messages[inputKey] ? (
                      <Text
                        size={Size.text.caption2.size}
                        color={Color.primary.light.primary90}
                        textStyle="medium"
                        line={16.5}
                        style={style.mt6}>
                        {istriInput.messages[inputKey].error}
                      </Text>
                    ) : null}
                  </View>
                );
              }
              if (inputKey !== 'age') {
                return (
                  <View key={inputKey} style={style.mb16}>
                    <Input
                      height={56}
                      secondLabel={
                        istriInput?.errors[inputKey]?.includes(ERRORS.required)
                          ? requiredLabel
                          : null
                      }
                      keyboardType={
                        istriInput?.errors[inputKey].includes('numberOnly')
                          ? 'number-pad'
                          : 'default'
                      }
                      value={v ? v?.toString() || '' : ''}
                      label={trans(locale, lang, inputKey)}
                      placeholder={trans(locale, lang, inputKey)}
                      onChangeText={(text) => {
                        setIstriInput((prevState) => {
                          return {
                            ...prevState,
                            values: {
                              ...prevState.values,
                              [inputKey]: text,
                            },
                            messages: {
                              ...prevState.messages,
                              [inputKey]: validateFieldInput(
                                inputKey,
                                prevState.errors,
                                { ...prevState.values, [inputKey]: text }
                              ),
                            },
                          };
                        });
                      }}
                      message={istriInput.messages[inputKey]}
                    />
                  </View>
                );
              }
              return null;
            })}
          </View>
        </ListAccordion>
      );
    }
    return null;
  }

  function renderAnakAccordion() {
    if (!_.isEmpty(anaksInput)) {
      return (
        <ListAccordion
          header={
            <Text
              textStyle="semi"
              size={Size.text.body2.size}
              line={21}
              letterSpacing={0.5}>
              {`${trans(locale, lang, 'dataDiri')} - ${trans(
                locale,
                lang,
                'anak'
              )}`}
            </Text>
          }
          suffixIcon={<ArrowDownGray />}
          style={style.accordion.container}
          headerContainerStyle={style.accordion.header}>
          <View style={style.accordion.content}>
            {isSelectedChildrenInvalid() ? (
              <View style={style.mb16}>
                <AlertDialogue
                  title={trans(locale, lang, ERRORS.maxSelectedChildren3)}
                  type="warning"
                  leftIcon
                />
              </View>
            ) : null}
            {Object.entries(anaksInput).map(([key, value]) => (
              <View key={key} style={style.mb16}>
                <View style={style.dataAnak.header.container}>
                  <View style={style.dataAnak.header.label.container}>
                    <View
                      style={[
                        style.dataAnak.header.label.indicator,
                        validateRowAnak(anaksInput[key].values).length > 0
                          ? {
                              backgroundColor:
                                Color.grayButton.light.grayButton,
                            }
                          : { backgroundColor: Color.primary.light.primary90 },
                      ]}>
                      <Text
                        textStyle="semi"
                        size={Size.text.body2.size}
                        line={20}
                        letterSpacing={0.5}
                        align="center"
                        color={
                          validateRowAnak(anaksInput[key].values).length > 0
                            ? Color.grayTitleButton.light.grayTitleButton
                            : Color.main.light.white
                        }>
                        {Number(key) + 1}
                      </Text>
                    </View>
                    <Text
                      textStyle="semi"
                      size={Size.text.body2.size}
                      line={20}
                      letterSpacing={0.5}>
                      {trans(locale, lang, 'anak')}
                      {' - '}
                      {trans(
                        locale,
                        lang,
                        formatCapitalizeEachWord(
                          formatOrdinal(Number(key) + 1, lang)
                        )
                      )}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      if (selectedChildren.includes(key)) {
                        setSelectedChildren((prev) => {
                          return prev?.filter((item) => item !== key);
                        });
                        setAnaksInput((prevState) => {
                          return {
                            ...prevState,
                            [key]: {
                              ...prevState[key],
                              messages: {
                                ...prevState[key].messages,
                                ...anakInitialState.messages,
                              },
                            },
                          };
                        });
                      } else {
                        setSelectedChildren((prev) => [...prev, key]);
                        setAnaksInput((prevState) => {
                          return {
                            ...prevState,
                            [key]: {
                              ...prevState[key],
                              messages: {
                                ...prevState[key].messages,
                                idCardNumber: validateFieldInput(
                                  'idCardNumber',
                                  anaksInput[key].errors,
                                  anaksInput[key].values
                                ),
                                name: validateFieldInput(
                                  'name',
                                  anaksInput[key].errors,
                                  anaksInput[key].values
                                ),
                                gender: validateFieldInput(
                                  'gender',
                                  anaksInput[key].errors,
                                  anaksInput[key].values
                                ),
                                pob: validateFieldInput(
                                  'pob',
                                  anaksInput[key].errors,
                                  anaksInput[key].values
                                ),
                                dob: validateFieldInput(
                                  'dob',
                                  anaksInput[key].errors,
                                  anaksInput[key].values
                                ),
                                occupation: validateFieldInput(
                                  'occupation',
                                  anaksInput[key].errors,
                                  anaksInput[key].values
                                ),
                                familyRelationshipStatus: validateFieldInput(
                                  'familyRelationshipStatus',
                                  anaksInput[key].errors,
                                  anaksInput[key].values
                                ),
                                maritalStatus: validateFieldInput(
                                  'maritalStatus',
                                  anaksInput[key].errors,
                                  anaksInput[key].values
                                ),
                              },
                            },
                          };
                        });
                      }
                    }}>
                    {selectedChildren.includes(key) ? (
                      <Frame577 width={20} height={20} />
                    ) : (
                      <View style={style.dataAnak.header.button} />
                    )}
                  </TouchableOpacity>
                </View>
                {validateRowAnak(anaksInput[key].values).length > 0 &&
                  validateRowAnak(anaksInput[key].values).map((item) => (
                    <View key={item} style={style.mb16}>
                      <AlertDialogue
                        title={trans(locale, lang, `${ERRORS[item]}Row`)}
                        type="error"
                        leftIcon
                        style={style.alignItemsCenter}
                      />
                    </View>
                  ))}
                {Object.entries(value.values).map(([inputKey, v]) => {
                  if (inputKey === 'dob') {
                    return (
                      <View key={inputKey} style={style.mb16}>
                        <Input
                          height={56}
                          value={
                            moment(v, defaultFormatDateDMY, true).isValid()
                              ? moment(v, defaultFormatDateDMY, true).format(
                                  'DD MMMM YYYY'
                                )
                              : ''
                          }
                          editable={false}
                          pressable={
                            validateRowAnak(anaksInput[key].values).length > 0
                          }
                          disabled={
                            validateRowAnak(anaksInput[key].values).length > 0
                          }
                          suffixIconDisabled={
                            validateRowAnak(anaksInput[key].values).length > 0
                          }
                          defaultValue={
                            moment(v, defaultFormatDateDMY, true).isValid()
                              ? moment(v, defaultFormatDateDMY, true).format(
                                  'DD MMMM YYYY'
                                )
                              : ''
                          }
                          label={trans(locale, lang, inputKey)}
                          secondLabel={
                            anaksInput[key]?.errors[inputKey]?.includes(
                              ERRORS.required
                            ) && selectedChildren.includes(key)
                              ? requiredLabel
                              : null
                          }
                          placeholder={trans(locale, lang, inputKey)}
                          suffixIcon={<Calendar {...iconProps} />}
                          handleSuffixIcon={() => {
                            showMode('date', `anak${key}`);
                          }}
                          onInputPress={() => {
                            showMode('date', `anak${key}`);
                          }}
                          message={
                            anaksInput[key]?.messages[inputKey] &&
                            !validateRowAnak(anaksInput[key].values).length > 0
                              ? anaksInput[key]?.messages[inputKey]
                              : null
                          }
                        />
                        <View>
                          {show && currChange === `anak${key}` && (
                            <DateTimePicker
                              testID="dateTimePicker"
                              value={
                                moment(v, defaultFormatDateDMY, true).isValid()
                                  ? new Date(
                                      moment(
                                        v,
                                        defaultFormatDateDMY,
                                        true
                                      ).toISOString()
                                    )
                                  : new Date(
                                      moment(
                                        defaultDateDMY,
                                        defaultFormatDateDMY,
                                        true
                                      ).toISOString()
                                    )
                              }
                              maximumDate={new Date().setDate(
                                new Date().getDate() - 1
                              )}
                              mode={mode}
                              display="spinner"
                              is24Hour
                              textColor={Color.primary.light.primary90}
                              accentColor={Color.primary.light.primary90}
                              onChange={(event, selectedDate) => {
                                setShow(!show);
                                if (event.type !== 'dismissed') {
                                  setAnaksInput((prevState) => {
                                    return {
                                      ...prevState,
                                      [key]: {
                                        ...prevState[key],
                                        values: {
                                          ...prevState[key].values,
                                          [inputKey]: new Date(selectedDate),
                                          age: moment(new Date()).diff(
                                            moment(selectedDate),
                                            'years',
                                            false
                                          ),
                                        },
                                        messages: {
                                          ...prevState[key].messages,
                                          ...(selectedChildren.includes(
                                            key
                                          ) && {
                                            [inputKey]: validateFieldInput(
                                              inputKey,
                                              prevState[key].errors,
                                              {
                                                ...prevState[key].values,
                                                [inputKey]: selectedDate,
                                              }
                                            ),
                                          }),
                                        },
                                      },
                                    };
                                  });
                                }
                              }}
                            />
                          )}
                        </View>
                      </View>
                    );
                  }
                  if (inputKey === 'gender') {
                    return (
                      <View key={inputKey} style={style.mb16}>
                        <View style={[style.flexDirectionRow, style.mb4]}>
                          <Text
                            size={Size.text.caption1.size}
                            textStyle="semi"
                            line={18}
                            letterSpacing={0.5}
                            color={
                              v !== ''
                                ? Color.neutral.light.neutral90
                                : Color.mediumGray.light.mediumGray
                            }>
                            {trans(locale, lang, inputKey)}{' '}
                          </Text>
                          {anaksInput[key]?.errors[inputKey]?.includes(
                            ERRORS.required
                          ) && selectedChildren.includes(key)
                            ? requiredLabel
                            : null}
                        </View>
                        <View
                          style={style.radioButton.radioButtonInputContainer}>
                          <RadioButton
                            disabled={
                              validateRowAnak(anaksInput[key].values).length > 0
                            }
                            desc={trans(locale, lang, 'lakiLaki')}
                            currValue={
                              matchTypoTolerance(
                                v?.toString() || '',
                                'Laki-laki'
                              )
                                ? 'M'
                                : ''
                            }
                            optValue="M"
                            onPress={() => {
                              setAnaksInput((prevState) => {
                                return {
                                  ...prevState,
                                  [key]: {
                                    ...prevState[key],
                                    values: {
                                      ...prevState[key].values,
                                      [inputKey]: 'Laki-laki',
                                    },
                                    messages: {
                                      ...prevState[key].messages,
                                      ...(selectedChildren.includes(key) && {
                                        [inputKey]: validateFieldInput(
                                          inputKey,
                                          prevState[key].errors,
                                          {
                                            ...prevState[key].values,
                                            [inputKey]: 'Laki-laki',
                                          }
                                        ),
                                      }),
                                    },
                                  },
                                };
                              });
                            }}
                            isError={
                              anaksInput[key]?.messages[inputKey] !== null
                            }
                          />
                          <RadioButton
                            disabled={
                              validateRowAnak(anaksInput[key].values).length > 0
                            }
                            desc={trans(locale, lang, 'perempuan')}
                            currValue={
                              matchTypoTolerance(
                                v?.toString() || '',
                                'Perempuan'
                              )
                                ? 'F'
                                : ''
                            }
                            optValue="F"
                            onPress={() => {
                              setAnaksInput((prevState) => {
                                return {
                                  ...prevState,
                                  [key]: {
                                    ...prevState[key],
                                    values: {
                                      ...prevState[key].values,
                                      [inputKey]: 'Perempuan',
                                    },
                                    messages: {
                                      ...prevState[key].messages,
                                      ...(selectedChildren.includes(key) && {
                                        [inputKey]: validateFieldInput(
                                          inputKey,
                                          prevState[key].errors,
                                          {
                                            ...prevState[key].values,
                                            [inputKey]: 'Perempuan',
                                          }
                                        ),
                                      }),
                                    },
                                  },
                                };
                              });
                            }}
                            isError={
                              anaksInput[key]?.messages[inputKey] !== null
                            }
                          />
                        </View>
                        {anaksInput[key]?.messages[inputKey] &&
                        !validateRowAnak(anaksInput[key].values).length > 0 ? (
                          <Text
                            size={Size.text.caption2.size}
                            color={Color.primary.light.primary90}
                            textStyle="medium"
                            line={16.5}
                            style={style.mt6}>
                            {anaksInput[key]?.messages[inputKey].error}
                          </Text>
                        ) : null}
                      </View>
                    );
                  }
                  if (inputKey !== 'age') {
                    return (
                      <View key={inputKey} style={style.mb16}>
                        <Input
                          height={56}
                          disabled={
                            validateRowAnak(anaksInput[key].values).length > 0
                          }
                          secondLabel={
                            anaksInput[key]?.errors[inputKey]?.includes(
                              ERRORS.required
                            ) && selectedChildren.includes(key)
                              ? requiredLabel
                              : null
                          }
                          keyboardType={
                            anaksInput[key]?.errors[inputKey]?.includes(
                              'numberOnly'
                            )
                              ? 'number-pad'
                              : 'default'
                          }
                          value={v ? v?.toString() || '' : ''}
                          label={trans(locale, lang, inputKey)}
                          placeholder={trans(locale, lang, inputKey)}
                          onChangeText={(text) => {
                            setAnaksInput((prevState) => {
                              return {
                                ...prevState,
                                [key]: {
                                  ...prevState[key],
                                  values: {
                                    ...prevState[key].values,
                                    [inputKey]: text,
                                  },
                                  messages: {
                                    ...prevState[key].messages,
                                    ...(selectedChildren.includes(key) && {
                                      [inputKey]: validateFieldInput(
                                        inputKey,
                                        prevState[key].errors,
                                        {
                                          ...prevState[key].values,
                                          [inputKey]: text,
                                        }
                                      ),
                                    }),
                                  },
                                },
                              };
                            });
                          }}
                          message={anaksInput[key].messages[inputKey]}
                        />
                      </View>
                    );
                  }
                  return null;
                })}
              </View>
            ))}
          </View>
        </ListAccordion>
      );
    }
    return null;
  }

  function renderFooterContainer() {
    return (
      <Padder style={style.mb48}>
        <Button
          disabled={isFormInvalid() || isSubmit}
          type="linear-gradient"
          onPress={() => {
            setIsSubmit(true);
            setLoading(true);
            setUpdataCheckKKKTP({
              ...getPayload('checkKKAndKTP'),
              category: 'reminder',
              certificateNo: '',
              oldPolicyNo: '',
              source: '',
            });
            setUpdataTempState({
              verifyPengkinianPayload: {
                ...getPayload('verifyPengkinian'),
              },
            });
          }}>
          {trans(locale, lang, 'lanjut')}
        </Button>
      </Padder>
    );
  }

  const renderResponseModal = useCallback(() => {
    let icon = KKVerifikasi;
    let title = 'kamiTidakMenemukan';
    let subtitle = 'dataKartuKeluarga';
    if (
      setUpdataCheckKKKTPResponse?.data?.isChanged &&
      setUpdataCheckKKKTPResponse?.data?.isFamilyMembersChanged &&
      setUpdataCheckKKKTPResponse?.data?.familyMembersChangedType === 'kurang'
    ) {
      // Kurang
      icon = KKEdit;
      title = 'kamiMenemukanPerubahan';
      subtitle = 'dataLamaPada';
    }
    if (
      setUpdataCheckKKKTPResponse?.data?.isChanged &&
      setUpdataCheckKKKTPResponse?.data?.isFamilyMembersChanged &&
      setUpdataCheckKKKTPResponse?.data?.familyMembersChangedType === 'tambah'
    ) {
      // Tambah
      icon = KKVerifikasi;
      title = 'kamiMenemukanPerubahan';
      subtitle = 'dataBaruPada';
    }
    if (
      setUpdataCheckKKKTPResponse?.data?.isChanged &&
      !setUpdataCheckKKKTPResponse?.data?.isFamilyMembersChanged &&
      setUpdataCheckKKKTPResponse?.data?.familyMembersChangedType === ''
    ) {
      // Change
      icon = KKVerifikasi;
      title = 'kamiMenemukanPerubahan';
      subtitle = 'dataKamuAkan';
    }
    if (
      !setUpdataCheckKKKTPResponse?.data?.isChanged &&
      !setUpdataCheckKKKTPResponse?.data?.isFamilyMembersChanged &&
      setUpdataCheckKKKTPResponse?.data?.familyMembersChangedType === ''
    ) {
      // No Change
      icon = KKVerifikasi;
      title = 'kamiTidakMenemukan';
      subtitle = 'dataKartuKeluarga';
    }
    return (
      <BottomSheet
        isVisible={isResponseModal}
        swipeable={false}
        onClosePress={() => setIsResponseModal(false)}
        onRequestClose={() => setIsResponseModal(false)}>
        <View style={style.modal.noChange.container}>
          <View style={style.modal.noChange.image.container}>
            <Image
              source={icon}
              style={style.modal.noChange.image.image}
              resizeMode="contain"
            />
          </View>
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={27}
            letterSpacing={0.5}
            align="center"
            style={style.modal.noChange.title}>
            {trans(locale, lang, title)}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            align="center"
            color={Color.mediumGray.light.mediumGray}
            style={style.modal.noChange.subtitle}>
            {trans(locale, lang, subtitle)}
          </Text>
        </View>
        <Button
          outline
          onPress={() => {
            setIsResponseModal(false);
          }}
          style={style.mb16}>
          {trans(locale, lang, 'kembali')}
        </Button>
        <Button
          type="linear-gradient"
          onPress={() => {
            setIsResponseModal(false);
            navigation.navigate(NAVIGATION.UPDATA.UpdataInformation);
          }}>
          {trans(locale, lang, 'lanjut')}
        </Button>
      </BottomSheet>
    );
  }, [
    isResponseModal,
    lang,
    navigation,
    setUpdataCheckKKKTPResponse?.data?.familyMembersChangedType,
    setUpdataCheckKKKTPResponse?.data?.isChanged,
    setUpdataCheckKKKTPResponse?.data?.isFamilyMembersChanged,
  ]);

  function renderInvalidNIKModal() {
    return (
      <BottomSheet isVisible={isInvalidNIKModal} swipeable={false}>
        <View style={style.modal.invalidNIK.container}>
          <Image
            source={KTPTidakCocokKTP}
            style={style.modal.invalidNIK.image}
            resizeMode="contain"
          />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={27}
            letterSpacing={0.5}
            align="center"
            style={style.modal.invalidNIK.title}>
            {trans(locale, lang, 'oopsNIKKamu')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            align="center"
            color={Color.mediumGray.light.mediumGray}
            style={style.modal.invalidNIK.subtitle}>
            {trans(locale, lang, 'nikSaatVerifikasi')}
          </Text>
        </View>
        <Button
          type="linear-gradient"
          onPress={() => {
            setIsInvalidNIKModal(false);
          }}>
          {trans(locale, lang, 'cobaLagi')}
        </Button>
      </BottomSheet>
    );
  }

  function renderRightHeaderContent() {
    return (
      <TouchableOpacity
        style={style.me16}
        onPress={() => {
          navigation.navigate(NAVIGATION.PROFILE.ProfileHelpCenter);
        }}>
        <Headset2 fill={Color.main.light.white} />
      </TouchableOpacity>
    );
  }

  return (
    <Base15
      isScroll
      animated
      rightHeaderContent={renderRightHeaderContent()}
      onBackPress={() => navigation.pop()}
      title={trans(locale, lang, 'pengkinianData')}
      backgroundColor={Color.whiteBackground.light.whiteBackground}
      renderBottom={renderFooterContainer()}>
      <Padder style={style.container}>
        {renderStepsContainer()}
        {renderContentContainer()}
        {renderResponseModal()}
        {renderInvalidNIKModal()}
      </Padder>
    </Base15>
  );
}

export default UpdataReview;

UpdataReview.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  isKTPSame: PropTypes.bool.isRequired,
  isKKSame: PropTypes.bool.isRequired,
  updataAction: PropTypes.string.isRequired,
  getUpdataLastKTPInfoResponse: PropTypes.objectOf(Object).isRequired,
  getUpdataLastKKInfoResponse: PropTypes.objectOf(Object).isRequired,
  getUpdataLastKTPInfoFailed: PropTypes.objectOf(Object).isRequired,
  getUpdataLastKKInfoFailed: PropTypes.objectOf(Object).isRequired,
  setUpdataKTPResponse: PropTypes.objectOf(Object).isRequired,
  setUpdataKKResponse: PropTypes.objectOf(Object).isRequired,
  getUpdataLastKTPInfo: PropTypes.func.isRequired,
  getUpdataLastKKInfo: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  getUpdataLastKTPInfoClear: PropTypes.func.isRequired,
  getUpdataLastKKInfoClear: PropTypes.func.isRequired,
  setUpdataCheckKKKTPResponse: PropTypes.objectOf(Object).isRequired,
  setUpdataCheckKKKTPFailed: PropTypes.objectOf(Object).isRequired,
  setUpdataCheckKKKTP: PropTypes.func.isRequired,
  setUpdataCheckKKKTPClear: PropTypes.func.isRequired,
  setUpdataTempState: PropTypes.func.isRequired,
};
