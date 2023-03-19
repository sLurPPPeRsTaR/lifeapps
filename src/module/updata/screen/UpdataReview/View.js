import React, { useCallback, useMemo, useState } from 'react';
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
  Headset2,
  ArrowDownGray,
  Calendar,
  Father,
  Mother,
  Child,
  FatherGray,
  MotherGray,
  ChildGray,
  RedTick,
  ArrowDown,
  Attention3,
} from 'ca-config/Svg';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import { NAVIGATION, TOAST } from 'ca-util/constant';
import BottomSheet from 'ca-component-container/BottomSheet';
import moment from 'moment/min/moment-with-locales';
import {
  KKVerifikasi,
  KKEdit,
  KTPTidakCocokKTP,
  TrashBin,
} from 'ca-config/Image';
import DateTimePicker from '@react-native-community/datetimepicker';
import ListAccordion from 'ca-component-card/ListAccordion';
import Input from 'ca-component-generic/Input';
import _ from 'lodash';
import {
  matchTypoTolerance,
  regexBirthPlace,
  regexNameBachelorDegree,
  regexOccupation,
  removeColumnFromObject,
  useDefaultBackHandler,
} from 'ca-util/common';
import LinearGradient from 'react-native-linear-gradient';
import {
  GET_UPDATA_LAST_KK_INFO_FAILED,
  GET_UPDATA_LAST_KK_INFO_SUCCESS,
  GET_UPDATA_LAST_KTP_INFO_FAILED,
  GET_UPDATA_LAST_KTP_INFO_SUCCESS,
  SET_UPDATA_CHECK_KK_KTP_FAILED,
  SET_UPDATA_CHECK_KK_KTP_SUCCESS,
} from 'ca-module-updata/updataConstant';
import { useFocusEffect } from '@react-navigation/native';
import { formatCapitalizeEachWord, formatOrdinal } from 'ca-util/format';
import RadioButton from './components/RadioButton';
import style from './style';
import locale from './locale';

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

const familyMembersInitialState = {
  idCardNumber: '',
  name: '',
  gender: '',
  pob: '',
  dob: '',
  occupation: '',
  familyRelationshipStatus: '',
  maritalStatus: '',
  age: '',
};

const familyMembersInitialMessage = {
  idCardNumber: null,
  name: null,
  gender: null,
  pob: null,
  dob: null,
  occupation: null,
  familyRelationshipStatus: null,
  maritalStatus: null,
  age: null,
};

// Constant
const CONSTANT = {
  KEPALA_KELUARGA: 'KEPALA KELUARGA',
  ISTRI: 'ISTRI',
  ANAK: 'ANAK',
  ANAK_KANDUNG: 'ANAK KANDUNG',
  ANAK_ANGKAT: 'ANAK ANGKAT',
  ANAK_TIRI: 'ANAK TIRI',
  LAKI_LAKI: 'Laki-laki',
  PEREMPUAN: 'Perempuan',
};
const ERRORS = {
  required: 'required',
  invalid: 'invalid',
  numberOnly: 'numberOnly',
  notWorking: 'notWorking',
  notMarried: 'notMarried',
  headOfFamilyNull: 'headOfFamilyNull',
  dataUncompleted: 'dataUncompleted',
  maxBeneficiaryAge: 'maxBeneficiaryAge',
  maxBeneficiaryTotal5: 'maxBeneficiaryTotal5',
  maxSelectedChildren3: 'maxSelectedChildren3',
  maxHeadOfFamily1: 'maxHeadOfFamily1',
  maxWife1: 'maxWife1',
};
const KEYS = {
  familyCardNumber: 'familyCardNumber',
  familyRelationshipStatus: 'familyRelationshipStatus',
  idCardNumber: 'idCardNumber',
  name: 'name',
  gender: 'gender',
  pob: 'pob',
  dob: 'dob',
  occupation: 'occupation',
  maritalStatus: 'maritalStatus',
};
const RELATIONSHIP_STATUS = {
  HEAD_OF_FAMILY: [CONSTANT.KEPALA_KELUARGA],
  WIFE: [CONSTANT.ISTRI],
  CHILD: [
    CONSTANT.ANAK,
    CONSTANT.ANAK_KANDUNG,
    CONSTANT.ANAK_ANGKAT,
    CONSTANT.ANAK_TIRI,
  ],
};
const MARITAL_STATUS = {
  BELUM_KAWIN: 'BELUM KAWIN',
  KAWIN: 'KAWIN',
  CERAI_HIDUP: 'CERAI HIDUP',
  CERAI_MATI: 'CERAI MATI',
  KAWIN_TERCATAT: 'KAWIN TERCATAT',
  KAWIN_BELUM_TERCATAT: 'KAWIN BELUM TERCATAT',
};

// Config
const REGEXS_CONFIG = {
  name: regexNameBachelorDegree,
  pob: regexBirthPlace,
  occupation: regexOccupation,
};

const RULES_CONFIG = {
  FORMAT_DATE_INPUT: 'DD-MM-YYYY',
  FORMAT_DATE_OUTPUT: 'DD MMMM YYYY',
  DEFAULT_DATE: '01-01-1990',
  MAX_HEAD_OF_FAMILY: 1,
  MAX_WIFE: 1,
  MAX_BENEFICIARY_AGE: 25,
  MAX_BENEFICIARY: 5,
  MAX_CHILD: 3,
  ALLOWED_BENEFICIARY_OCCUPATION: [
    'BELUM/TIDAK BEKERJA',
    'MENGURUS RUMAH TANGGA',
    'PELAJAR/MAHASISWA',
  ],
  ALLOWED_BENEFICIARY_MARITAL_STATUS: [MARITAL_STATUS.BELUM_KAWIN],
};
const familyMembersInitialConfig = {
  familyRelationshipStatus: ['required'],
  idCardNumber: ['required', 'number', 'equalLength16'],
  name: ['required', 'validRegex'],
  gender: ['required'],
  pob: ['required', 'validRegex'],
  dob: ['required'],
  occupation: ['required', 'validRegex'],
  maritalStatus: ['required'],
  age: [],
};
const childsInitialConfig = {
  familyRelationshipStatus: ['required'],
  idCardNumber: ['required', 'number', 'equalLength16'],
  name: ['required', 'validRegex'],
  gender: ['required'],
  pob: ['required', 'validRegex'],
  dob: ['required'],
  occupation: ['required', 'validRegex'],
  maritalStatus: ['required'],
  age: [],
  // dob: ['required', 'limitAge'],
  // occupation: ['required', 'limitOccupation', 'validRegex'],
  // maritalStatus: ['required', 'limitMaritalStatus'],
};
const familyCardNumberInitialConfig = ['required', 'number', 'equalLength16'];

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
    *
  </Text>
);

function UpdataReview(props) {
  const {
    navigation,
    lang,
    isKKSame,
    isKTPSame,
    updataAction,

    setUpdataKTPResponse,
    setUpdataKKResponse,

    getUpdataLastKTPInfo,
    getUpdataLastKTPInfoClear,
    getUpdataLastKTPInfoFailed,
    getUpdataLastKTPInfoResponse,

    getUpdataLastKKInfo,
    getUpdataLastKKInfoClear,
    getUpdataLastKKInfoFailed,
    getUpdataLastKKInfoResponse,

    setUpdataCheckKKKTP,
    setUpdataCheckKKKTPClear,
    setUpdataCheckKKKTPFailed,
    setUpdataCheckKKKTPResponse,

    setLoading,
    setUpdataTempState,
    setToastMsg,

    route: { params },
  } = props;

  useDefaultBackHandler(navigation);

  const [isDark, setIsDark] = useState(false);

  // isSubmit
  const [isSubmit, setIsSubmit] = useState(false);

  // Input
  const [idCardInput, setIdCardInput] = useState({});
  const [familyMembersInput, setFamilyMembersInput] = useState([
    {
      values: {
        ...familyMembersInitialState,
        familyRelationshipStatus: CONSTANT.KEPALA_KELUARGA,
      },
      messages: { ...familyMembersInitialMessage },
      configs: { ...familyMembersInitialConfig },
    },
  ]);
  const [familyCardNumberInput, setFamilyCardNumberInput] = useState('');
  const [familyCardNumberMessage, setFamilyCardNumberMessage] = useState(null);

  // Modal
  const [isResponseModal, setIsResponseModal] = useState(false);
  const [isInvalidNIKModal, setIsInvalidNIKModal] = useState(false);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState({
    isShow: false,
    activeIndex: '',
    config: [],
  });

  // Dropdown
  const [dateTimePickerDropdown, setDateTimePickerDropdown] = useState({
    isShow: false,
    activeIndex: '',
    config: [],
  });
  const [
    familyRelationshipStatusDropdown,
    setFamilyRelationshipStatusDropdown,
  ] = useState({
    isShow: false,
    activeIndex: '',
    config: [],
  });
  const [maritalStatusDropdown, setMaritalStatusDropdown] = useState({
    isShow: false,
    activeIndex: '',
    config: [],
  });

  // Date
  moment.locale(lang);

  const todayDate = new Date();
  const yesterdayDate = todayDate.setDate(todayDate.getDate() - 1);

  // GET DATA KTP
  useFocusEffect(
    useCallback(() => {
      if (!isKTPSame) {
        setIdCardInput(setUpdataKTPResponse?.data?.user);
      } else {
        setLoading(true);
        const { category, certificateNo, policyNo, source } = params;
        getUpdataLastKTPInfo({ category, certificateNo, policyNo, source });
      }
    }, [
      getUpdataLastKTPInfo,
      isKTPSame,
      params,
      setLoading,
      setUpdataKTPResponse?.data?.user,
    ])
  );

  // GET DATA KK
  useFocusEffect(
    useCallback(() => {
      if (!isKKSame) {
        initSetupFamilyMembersData(
          setUpdataKKResponse?.data?.family?.familyMembers,
          setUpdataKKResponse?.data?.family?.familyCardNumber
        );
      } else {
        setLoading(true);
        const { category, certificateNo, policyNo, source } = params;
        getUpdataLastKKInfo({ category, certificateNo, policyNo, source });
      }
      return () => {
        setLoading(false);
      };
    }, [
      getUpdataLastKKInfo,
      initSetupFamilyMembersData,
      isKKSame,
      params,
      setLoading,
      setUpdataKKResponse?.data?.family?.familyCardNumber,
      setUpdataKKResponse?.data?.family?.familyMembers,
    ])
  );

  // API RESULT
  // Get Last KTP and KK info
  useFocusEffect(
    useCallback(() => {
      getUpdataResult(updataAction);
    }, [updataAction, getUpdataResult])
  );

  const getUpdataResult = useCallback(
    (act) => {
      if (act === GET_UPDATA_LAST_KTP_INFO_SUCCESS) {
        setLoading(false);
        getUpdataLastKTPInfoClear();
        setIdCardInput(getUpdataLastKTPInfoResponse?.data);
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
        initSetupFamilyMembersData(
          getUpdataLastKKInfoResponse?.data?.familyMembers,
          getUpdataLastKKInfoResponse?.data?.familyCardNumber
        );
        getUpdataLastKKInfoClear();
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
        setIsSubmit(false);
        setUpdataCheckKKKTPClear();
        // setIsSubmit(false);
        setIsResponseModal(true);
      }
      if (act === SET_UPDATA_CHECK_KK_KTP_FAILED) {
        setLoading(false);
        setIsSubmit(false);
        setUpdataCheckKKKTPClear();
        // setIsSubmit(false);
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
      getUpdataLastKKInfoResponse?.data?.familyCardNumber,
      getUpdataLastKKInfoResponse?.data?.familyMembers,
      getUpdataLastKTPInfoClear,
      getUpdataLastKTPInfoFailed?.message,
      getUpdataLastKTPInfoResponse?.data,
      initSetupFamilyMembersData,
      setLoading,
      setUpdataCheckKKKTPClear,
      setUpdataCheckKKKTPFailed?.message,
    ]
  );

  // Initial Setup Family Members Data & OCR Validation
  const initSetupFamilyMembersData = useCallback(
    (familyMembers, familyCardNumber) => {
      let tempHeadOfFamily = [];
      let tempWife = [];
      let tempChild = [];
      let tempAnotherFamily = [];

      const tempFamilyCardNumber = familyCardNumber;
      let tempFamilyCardNumberMessage = null;

      familyMembers.forEach((item) => {
        // eslint-disable-next-line no-nested-ternary
        const gender = matchTypoTolerance(item.gender, CONSTANT.LAKI_LAKI)
          ? CONSTANT.LAKI_LAKI
          : matchTypoTolerance(item.gender, CONSTANT.PEREMPUAN)
          ? CONSTANT.PEREMPUAN
          : null;
        const maritalStatus =
          matchTypoTolerance(
            item.maritalStatus,
            MARITAL_STATUS.KAWIN_TERCATAT
          ) ||
          matchTypoTolerance(
            item.maritalStatus,
            MARITAL_STATUS.KAWIN_BELUM_TERCATAT
          )
            ? MARITAL_STATUS.KAWIN
            : item.maritalStatus;
        const newItem = {
          rawValues: { ...item },
          values: {
            ...item,
            gender: gender,
            maritalStatus: maritalStatus,
            age: item.dob
              ? moment(new Date()).diff(
                  moment(item.dob, RULES_CONFIG.FORMAT_DATE_INPUT, true),
                  'years',
                  false
                )
              : null,
          },
          messages: { ...familyMembersInitialMessage },
          configs: { ...familyMembersInitialConfig },
        };
        if (
          RELATIONSHIP_STATUS.HEAD_OF_FAMILY.some((i) => {
            return matchTypoTolerance(
              i,
              newItem.values.familyRelationshipStatus
            );
          })
        ) {
          tempHeadOfFamily.push({
            ...newItem,
            values: {
              ...newItem.values,
              familyRelationshipStatus: CONSTANT.KEPALA_KELUARGA,
            },
          });
        } else if (
          RELATIONSHIP_STATUS.WIFE.some((i) => {
            return matchTypoTolerance(
              i,
              newItem.values.familyRelationshipStatus
            );
          })
        ) {
          tempWife.push({
            ...newItem,
            values: {
              ...newItem.values,
              familyRelationshipStatus: CONSTANT.ISTRI,
            },
          });
        } else if (
          RELATIONSHIP_STATUS.CHILD.some((i) => {
            return matchTypoTolerance(
              i,
              newItem.values.familyRelationshipStatus
            );
          })
        ) {
          tempChild.push({
            ...newItem,
            values: {
              ...newItem.values,
              familyRelationshipStatus: CONSTANT.ANAK,
            },
            configs: { ...childsInitialConfig },
          });
        } else {
          tempAnotherFamily.push({
            ...newItem,
            values: {
              ...newItem.values,
              familyRelationshipStatus: null,
            },
          });
        }
      });

      // Section Validation
      tempHeadOfFamily = tempHeadOfFamily.map((item) => {
        return {
          ...item,
          messages: validateFamilyMembersSection(item.values, item.configs),
        };
      });
      tempWife = tempWife.map((item) => {
        return {
          ...item,
          messages: validateFamilyMembersSection(item.values, item.configs),
        };
      });
      tempChild = tempChild.map((item) => {
        return {
          ...item,
          messages: validateFamilyMembersSection(item.values, item.configs),
        };
      });
      tempAnotherFamily = tempAnotherFamily.map((item) => {
        return {
          ...item,
          messages: validateFamilyMembersSection(item.values, item.configs),
        };
      });
      tempFamilyCardNumberMessage = validateInput(
        KEYS.familyCardNumber,
        tempFamilyCardNumber,
        familyCardNumberInitialConfig
      );

      // Data not completed validation
      const requiredKeys = [KEYS.idCardNumber, KEYS.name, KEYS.dob];
      const tempFamily = [
        ...tempHeadOfFamily,
        ...tempWife,
        ...tempChild,
        ...tempAnotherFamily,
      ];
      const isTempFamilyUncompleted = tempFamily.some((item) => {
        return Object.entries(item.values).some(([key, value]) => {
          if (requiredKeys.includes(key)) {
            return value === null;
          }
          return false;
        });
      });
      if (isTempFamilyUncompleted) {
        setToastMsg({
          type: TOAST.type.warning,
          text1: [
            {
              label: trans(locale, lang, ERRORS.dataUncompleted),
              textStyle: 'medium',
            },
          ],
        });
      }

      // Head of Family Validation
      // Kepala Keluarga hanya 1
      if (tempHeadOfFamily.length > RULES_CONFIG.MAX_HEAD_OF_FAMILY) {
        tempHeadOfFamily = tempHeadOfFamily.map((i) => ({
          ...i,
          messages: {
            ...i,
            familyRelationshipStatus: {
              error: trans(locale, lang, ERRORS.maxHeadOfFamily1),
            },
          },
        }));
      }

      // Wife Validation
      // Istri/Pasangan hanya 1
      if (tempWife.length > RULES_CONFIG.MAX_WIFE) {
        tempWife = tempWife.map((i) => ({
          ...i,
          messages: {
            ...i,
            familyRelationshipStatus: {
              error: trans(locale, lang, ERRORS.maxWife1),
            },
          },
        }));
      }

      // Child Validation
      // Anak maksimal 3
      // if (tempChild.length > RULES_CONFIG.MAX_CHILD) {
      //   tempChild = tempChild.map((i) => ({
      //     ...i,
      //     messages: {
      //       ...i.messages,
      //       familyRelationshipStatus: {
      //         error: trans(locale, lang, ERRORS.maxSelectedChildren3),
      //       },
      //     },
      //   }));
      //   setToastMsg({
      //     type: TOAST.type.warning,
      //     text1: [
      //       {
      //         label: trans(locale, lang, ERRORS.maxSelectedChildren3),
      //         textStyle: 'medium',
      //       },
      //     ],
      //   });
      // }

      // Penerima Manfaat maksimal 5
      // if (familyMembers.length > RULES_CONFIG.MAX_BENEFICIARY) {
      //   setToastMsg({
      //     type: TOAST.type.warning,
      //     text1: [
      //       {
      //         label: trans(locale, lang, ERRORS.maxBeneficiaryTotal5),
      //         textStyle: 'medium',
      //       },
      //     ],
      //   });
      // }

      // Sort Child by Age
      tempChild = tempChild.sort((a, b) => b.values.age - a.values.age);

      // Formatter
      setFamilyMembersInput([
        ...tempHeadOfFamily,
        ...tempWife,
        ...tempChild,
        ...tempAnotherFamily,
      ]);
      setFamilyCardNumberInput(tempFamilyCardNumber);
      setFamilyCardNumberMessage(tempFamilyCardNumberMessage);
    },
    [lang, setToastMsg, validateFamilyMembersSection, validateInput]
  );

  // Family Members Section Validation
  const validateFamilyMembersSection = useCallback(
    (values, configs) => {
      return {
        familyRelationshipStatus: validateInput(
          KEYS.familyRelationshipStatus,
          values.familyRelationshipStatus,
          configs.familyRelationshipStatus
        ),
        idCardNumber: validateInput(
          KEYS.idCardNumber,
          values.idCardNumber,
          configs.idCardNumber
        ),
        name: validateInput(KEYS.name, values.name, configs.name),
        gender: validateInput(KEYS.gender, values.gender, configs.gender),
        pob: validateInput(KEYS.pob, values.pob, configs.pob),
        dob: validateInput(KEYS.dob, values.dob, configs.dob),
        occupation: validateInput(
          KEYS.occupation,
          values.occupation,
          configs.occupation
        ),
        maritalStatus: validateInput(
          KEYS.maritalStatus,
          values.maritalStatus,
          configs.maritalStatus
        ),
      };
    },
    [validateInput]
  );

  // User Input Validations
  const validateInput = useCallback(
    (key, value, config) => {
      // required
      if (config.includes('required')) {
        if (!value) {
          return {
            error: `${trans(locale, lang, key)} ${trans(
              locale,
              lang,
              ERRORS.required
            )}`,
          };
        }
      }
      // validRegex
      if (config.includes('validRegex')) {
        if (key === KEYS.name) {
          if (!REGEXS_CONFIG.name.test(value)) {
            return {
              error: `${trans(locale, lang, key)} ${trans(
                locale,
                lang,
                ERRORS.invalid
              )}`,
            };
          }
        }
        if (key === KEYS.pob) {
          if (REGEXS_CONFIG.pob.test(value)) {
            return {
              error: `${trans(locale, lang, key)} ${trans(
                locale,
                lang,
                ERRORS.invalid
              )}`,
            };
          }
        }
        if (key === KEYS.occupation) {
          if (REGEXS_CONFIG.occupation.test(value)) {
            return {
              error: `${trans(locale, lang, key)} ${trans(
                locale,
                lang,
                ERRORS.invalid
              )}`,
            };
          }
        }
      }
      // number
      if (config.includes('number')) {
        if (Number.isNaN(Number(value))) {
          return {
            error: `${trans(locale, lang, key)} ${trans(
              locale,
              lang,
              ERRORS.numberOnly
            )}`,
          };
        }
      }
      // equalLength
      const equalLength = config.find((item) => {
        return item.match('equalLength');
      });
      if (equalLength) {
        if (value.length !== Number(equalLength.substring(11))) {
          return {
            error: `${trans(locale, lang, key)} ${trans(
              locale,
              lang,
              ERRORS.invalid
            )}`,
          };
        }
      }
      // limitAge
      if (config.includes('limitAge')) {
        const age = moment(new Date()).diff(
          moment(value, RULES_CONFIG.FORMAT_DATE_INPUT, true),
          'years',
          false
        );
        if (age >= RULES_CONFIG.MAX_BENEFICIARY_AGE) {
          setToastMsg({
            type: TOAST.type.warning,
            text1: [
              {
                label: trans(locale, lang, `${ERRORS.maxBeneficiaryAge}Row`),
                textStyle: 'medium',
              },
            ],
          });
          return {
            error: `${trans(locale, lang, ERRORS.maxBeneficiaryAge)}`,
          };
        }
      }
      // limitOccupation
      if (config.includes('limitOccupation')) {
        if (
          !RULES_CONFIG.ALLOWED_BENEFICIARY_OCCUPATION.some((item) => {
            return value.toUpperCase() === item.toUpperCase();
          })
        ) {
          setToastMsg({
            type: TOAST.type.warning,
            text1: [
              {
                label: trans(locale, lang, `${ERRORS.notWorking}Row`),
                textStyle: 'medium',
              },
            ],
          });
          return {
            error: `${trans(locale, lang, ERRORS.notWorking)}`,
          };
        }
      }
      // limitMaritalStatus
      if (config.includes('limitMaritalStatus')) {
        if (
          !RULES_CONFIG.ALLOWED_BENEFICIARY_MARITAL_STATUS.some((item) => {
            return value.toUpperCase() === item.toUpperCase();
          })
        ) {
          setToastMsg({
            type: TOAST.type.warning,
            text1: [
              {
                label: trans(locale, lang, `${ERRORS.notMarried}Row`),
                textStyle: 'medium',
              },
            ],
          });
          return {
            error: `${trans(locale, lang, ERRORS.notMarried)}`,
          };
        }
      }
      return null;
    },
    [lang, setToastMsg]
  );

  // Form Validation
  const isFormInvalid = useCallback(() => {
    const { headOfFamily } =
      getTotalFamilyRelationshipStatus(familyMembersInput);

    // Kepala Keluarga wajib
    const isHeadOfFamilyInvalid =
      headOfFamily < RULES_CONFIG.MAX_HEAD_OF_FAMILY;
    if (isHeadOfFamilyInvalid) {
      setToastMsg({
        type: TOAST.type.warning,
        text1: [
          {
            label: trans(locale, lang, ERRORS.headOfFamilyNull),
            textStyle: 'medium',
          },
        ],
      });
    }

    // const isMaxBeneficiaryInvalid = total > RULES_CONFIG.MAX_BENEFICIARY;
    // if (isMaxBeneficiaryInvalid) {
    //   setToastMsg({
    //     type: TOAST.type.warning,
    //     text1: [
    //       {
    //         label: trans(locale, lang, ERRORS.maxBeneficiaryTotal5),
    //         textStyle: 'medium',
    //       },
    //     ],
    //   });
    // }

    // const isMaxChildInvalid = child > RULES_CONFIG.MAX_CHILD;
    // if (isMaxChildInvalid) {
    //   setToastMsg({
    //     type: TOAST.type.warning,
    //     text1: [
    //       {
    //         label: trans(locale, lang, ERRORS.maxSelectedChildren3),
    //         textStyle: 'medium',
    //       },
    //     ],
    //   });
    // }

    const isFamilyCardNumberInputInvalid = familyCardNumberMessage !== null;

    const isFamilyMembersInputInvalid = familyMembersInput.some((item) => {
      return Object.values(item.messages).some((value) => value !== null);
    });

    return (
      isHeadOfFamilyInvalid ||
      // isMaxBeneficiaryInvalid ||
      // isMaxChildInvalid ||
      isFamilyCardNumberInputInvalid ||
      isFamilyMembersInputInvalid
    );
  }, [
    familyCardNumberMessage,
    familyMembersInput,
    getTotalFamilyRelationshipStatus,
    lang,
    setToastMsg,
  ]);

  // Set State
  // CREATE
  const addFamilyMembersInputState = useCallback(
    (familyRelationshipStatus) => {
      const newConfigs =
        familyRelationshipStatus !== CONSTANT.ANAK
          ? familyMembersInitialConfig
          : childsInitialConfig;
      const errorRequiredMsg = trans(locale, lang, ERRORS.required);
      const newFamilyMember = {
        values: {
          ...familyMembersInitialState,
          familyRelationshipStatus,
        },
        messages: {
          idCardNumber: {
            warning: `${trans(
              locale,
              lang,
              KEYS.idCardNumber
            )} ${errorRequiredMsg}`,
          },
          name: {
            warning: `${trans(locale, lang, KEYS.name)} ${errorRequiredMsg}`,
          },
          gender: {
            warning: `${trans(locale, lang, KEYS.gender)} ${errorRequiredMsg}`,
          },
          pob: {
            warning: `${trans(locale, lang, KEYS.pob)} ${errorRequiredMsg}`,
          },
          dob: {
            warning: `${trans(locale, lang, KEYS.dob)} ${errorRequiredMsg}`,
          },
          occupation: {
            warning: `${trans(
              locale,
              lang,
              KEYS.occupation
            )} ${errorRequiredMsg}`,
          },
          maritalStatus: {
            warning: `${trans(
              locale,
              lang,
              KEYS.maritalStatus
            )} ${errorRequiredMsg}`,
          },
          age: null,
        },
        configs: { ...newConfigs },
      };
      const updatedFamilyMembers = [...familyMembersInput, newFamilyMember];

      // Sort
      const sortedFamilyMembers =
        sortFamilyMembersInputState(updatedFamilyMembers);

      setFamilyMembersInput(sortedFamilyMembers);
    },
    [familyMembersInput, lang, sortFamilyMembersInputState]
  );
  // UPDATE
  const updateFamilyMembersInputState = useCallback(
    (index, inputKey, value, config) => {
      const updatedFamilyMembers = [...familyMembersInput];

      if (inputKey !== KEYS.familyRelationshipStatus) {
        updatedFamilyMembers[index] = {
          ...updatedFamilyMembers[index],
          values: {
            ...updatedFamilyMembers[index].values,
            [inputKey]: value,
          },
          messages: {
            ...updatedFamilyMembers[index].messages,
            [inputKey]: validateInput(inputKey, value, config),
          },
        };
      } else {
        updatedFamilyMembers[index] = {
          ...updatedFamilyMembers[index],
          configs:
            value === CONSTANT.ANAK
              ? { ...childsInitialConfig }
              : { ...familyMembersInitialConfig },
        };

        updatedFamilyMembers[index] = {
          ...updatedFamilyMembers[index],
          values: {
            ...updatedFamilyMembers[index].values,
            [inputKey]: value,
          },
          messages: {
            ...updatedFamilyMembers[index].messages,
            [inputKey]: validateInput(inputKey, value, config),
            [KEYS.dob]: validateInput(
              KEYS.dob,
              updatedFamilyMembers[index].values[KEYS.dob],
              updatedFamilyMembers[index].configs[KEYS.dob]
            ),
            [KEYS.occupation]: validateInput(
              KEYS.occupation,
              updatedFamilyMembers[index].values[KEYS.occupation],
              updatedFamilyMembers[index].configs[KEYS.occupation]
            ),
            [KEYS.maritalStatus]: validateInput(
              KEYS.maritalStatus,
              updatedFamilyMembers[index].values[KEYS.maritalStatus],
              updatedFamilyMembers[index].configs[KEYS.maritalStatus]
            ),
          },
        };
      }

      // Sort
      const sortedFamilyMembers =
        sortFamilyMembersInputState(updatedFamilyMembers);

      setFamilyMembersInput(sortedFamilyMembers);
    },
    [familyMembersInput, sortFamilyMembersInputState, validateInput]
  );
  // DELETE
  const deleteFamilyMembersInputState = useCallback(
    (index) => {
      if (index === '') {
        return;
      }
      const updatedFamilyMembers = [...familyMembersInput];

      // const isCurrentFamilyChild =
      //   updatedFamilyMembers[index].values.familyRelationshipStatus ===
      //   CONSTANT.ANAK;
      // const isMaxChildInvalid = totalFamily?.child - 1 > RULES_CONFIG.MAX_CHILD;

      updatedFamilyMembers.splice(index, 1);

      // Mapping Childs Messages
      // if (isCurrentFamilyChild && !isMaxChildInvalid) {
      //   updatedFamilyMembers = updatedFamilyMembers.map((item) => {
      //     if (item.values.familyRelationshipStatus === CONSTANT.ANAK) {
      //       return {
      //         ...item,
      //         messages: {
      //           ...item.messages,
      //           familyRelationshipStatus: null,
      //         },
      //       };
      //     }
      //     return item;
      //   });
      // }

      // Sort
      const sortedFamilyMembers =
        sortFamilyMembersInputState(updatedFamilyMembers);

      setFamilyMembersInput(sortedFamilyMembers);
    },
    [familyMembersInput, sortFamilyMembersInputState]
  );
  // SORT
  const sortFamilyMembersInputState = useCallback((newFamilyMembers) => {
    const tempHeadOfFamily = [];
    const tempWife = [];
    let tempChild = [];
    const tempAnotherFamily = [];

    newFamilyMembers.forEach((item) => {
      if (
        RELATIONSHIP_STATUS.HEAD_OF_FAMILY.some((i) => {
          return matchTypoTolerance(i, item.values.familyRelationshipStatus);
        })
      ) {
        tempHeadOfFamily.push(item);
      } else if (
        RELATIONSHIP_STATUS.WIFE.some((i) => {
          return matchTypoTolerance(i, item.values.familyRelationshipStatus);
        })
      ) {
        tempWife.push(item);
      } else if (
        RELATIONSHIP_STATUS.CHILD.some((i) => {
          return matchTypoTolerance(i, item.values.familyRelationshipStatus);
        })
      ) {
        tempChild.push(item);
      } else {
        tempAnotherFamily.push(item);
      }
    });

    // Sort Child by Age
    tempChild = tempChild.sort((a, b) => {
      const aAge = moment(new Date()).diff(
        moment(a.values.dob, RULES_CONFIG.FORMAT_DATE_INPUT, true),
        'years',
        false
      );
      const bAge = moment(new Date()).diff(
        moment(b.values.dob, RULES_CONFIG.FORMAT_DATE_INPUT, true),
        'years',
        false
      );
      return bAge - aAge;
    });

    return [
      ...tempHeadOfFamily,
      ...tempWife,
      ...tempChild,
      ...tempAnotherFamily,
    ];
  }, []);
  // COUNT TOTAL RELATIONSHIP STATUS
  const getTotalFamilyRelationshipStatus = useCallback((familyMembers) => {
    const tempHeadOfFamily = [];
    const tempWife = [];
    const tempChild = [];
    const tempAnotherFamily = [];

    familyMembers.forEach((item) => {
      if (
        RELATIONSHIP_STATUS.HEAD_OF_FAMILY.some((i) => {
          return matchTypoTolerance(i, item.values.familyRelationshipStatus);
        })
      ) {
        tempHeadOfFamily.push(item);
      } else if (
        RELATIONSHIP_STATUS.WIFE.some((i) => {
          return matchTypoTolerance(i, item.values.familyRelationshipStatus);
        })
      ) {
        tempWife.push(item);
      } else if (
        RELATIONSHIP_STATUS.CHILD.some((i) => {
          return matchTypoTolerance(i, item.values.familyRelationshipStatus);
        })
      ) {
        tempChild.push(item);
      } else {
        tempAnotherFamily.push(item);
      }
    });

    return {
      total: familyMembers.length,
      headOfFamily: tempHeadOfFamily.length,
      wife: tempWife.length,
      child: tempChild.length,
      anotherFamily: tempAnotherFamily.length,
    };
  }, []);
  const totalFamily = useMemo(() => {
    return getTotalFamilyRelationshipStatus(familyMembersInput);
  }, [familyMembersInput, getTotalFamilyRelationshipStatus]);

  // Mapping Payload
  const mappingPayload = useCallback(
    (type) => {
      const familyCardRes = !isKKSame
        ? setUpdataKKResponse?.data?.family
        : getUpdataLastKKInfoResponse?.data;

      const filteredFamilyCard = removeColumnFromObject(
        familyCardRes,
        'familyMembers'
      );

      // Filtered Family Members Input
      const sortedFamilyMembers =
        sortFamilyMembersInputState(familyMembersInput);
      let filteredFamilyMembers = [];
      filteredFamilyMembers = Object.values(sortedFamilyMembers).map((item) => {
        const { age, ...filteredFamilyMember } = item.values;
        return {
          ...filteredFamilyMember,
          dob: moment(
            filteredFamilyMember.dob,
            RULES_CONFIG.FORMAT_DATE_INPUT
          ).format(RULES_CONFIG.FORMAT_DATE_INPUT),
        };
      });

      // Filtered Family Members Raw
      let filteredFamilyMembersRaw = [];
      filteredFamilyMembersRaw = Object.values(sortedFamilyMembers).map(
        (item) => {
          if (item.rawValues) {
            const { age, ...filteredFamilyMember } = item.rawValues;
            return filteredFamilyMember;
          }
          const { age, ...filteredFamilyMember } = item.values;
          return {
            ...filteredFamilyMember,
            dob: moment(
              filteredFamilyMember.dob,
              RULES_CONFIG.FORMAT_DATE_INPUT
            ).format(RULES_CONFIG.FORMAT_DATE_INPUT),
          };
        }
      );

      if (type === 'verifyPengkinian') {
        const verifyPengkinianPayload = {
          user: {
            ...idCardInput,
            dob: moment(idCardInput.dob, RULES_CONFIG.FORMAT_DATE_INPUT).format(
              RULES_CONFIG.FORMAT_DATE_INPUT
            ),
          },
          family: {
            ...filteredFamilyCard,
            familyCardNumber: familyCardNumberInput,
            familyMembers: [...filteredFamilyMembers],
          },
        };
        return verifyPengkinianPayload;
      }

      if (type === 'checkKKAndKTP') {
        const checkKKAndKTPPayload = {
          KK: {
            familyCardData: {
              ...filteredFamilyCard,
              familyCardNumber: familyCardNumberInput,
            },
            rawFamilyMembers: [...filteredFamilyMembersRaw],
            familyMembers: [
              ...filteredFamilyMembers.map((data) => {
                return {
                  ...data,
                  gender: data.gender.toUpperCase() === 'PEREMPUAN' ? 'F' : 'M',
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
              ...idCardInput,
              dob: moment(
                idCardInput.dob,
                RULES_CONFIG.FORMAT_DATE_INPUT
              ).format(RULES_CONFIG.FORMAT_DATE_INPUT),
              gender:
                idCardInput.gender.toUpperCase() === 'PEREMPUAN' ? 'F' : 'M',
              maritalStatus: decodeMaritalStatus(idCardInput.maritalStatus),
            },
          },
        };
        return checkKKAndKTPPayload;
      }
      return null;
    },
    [
      decodeFamilyRelationshipStatus,
      decodeMaritalStatus,
      familyCardNumberInput,
      familyMembersInput,
      getUpdataLastKKInfoResponse?.data,
      idCardInput,
      isKKSame,
      setUpdataKKResponse?.data?.family,
      sortFamilyMembersInputState,
    ]
  );
  const decodeMaritalStatus = useCallback((maritalStatus) => {
    if (maritalStatus.toUpperCase() === MARITAL_STATUS.BELUM_KAWIN) {
      return 'B0';
    }
    if (
      maritalStatus.toUpperCase() === MARITAL_STATUS.KAWIN ||
      maritalStatus.toUpperCase() === MARITAL_STATUS.KAWIN_TERCATAT ||
      maritalStatus.toUpperCase() === MARITAL_STATUS.KAWIN_BELUM_TERCATAT
    ) {
      return 'K0';
    }
    if (
      maritalStatus.toUpperCase() === MARITAL_STATUS.CERAI_HIDUP ||
      maritalStatus.toUpperCase() === MARITAL_STATUS.CERAI_MATI
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
          {trans(locale, lang, 'reviewKartuKeluarga')}
        </Text>
      </View>
    );
  }
  function renderContentContainer() {
    if (_.isEmpty(familyMembersInput)) {
      return null;
    }
    return (
      <View style={style.py16}>
        {familyMembersInput.map((item, index) => {
          return renderItemAccordion(item, index);
        })}
      </View>
    );
  }
  function renderItemAccordion(item, index) {
    const { values, messages, configs } = item;

    let headerLabel =
      trans(locale, lang, values.familyRelationshipStatus) ||
      `${trans(locale, lang, 'keluarga')} ${index + 1}`;

    const isSectionError = Object.values(messages).some(
      (value) => value !== null
    );

    if (
      RELATIONSHIP_STATUS.CHILD.some((i) => {
        return matchTypoTolerance(i, values.familyRelationshipStatus);
      })
    ) {
      const { headOfFamily, wife } = totalFamily;
      const indexChild = index + 1 - headOfFamily - wife;
      // headerLabel =
      //   lang === 'id'
      //     ? `${trans(locale, lang, 'anak')} ${formatCapitalizeEachWord(
      //         formatOrdinal(Number(indexChild), lang)
      //       )}`
      //     : `${formatCapitalizeEachWord(
      //         formatOrdinal(Number(indexChild), lang)
      //       )} ${trans(locale, lang, 'anak')}`;
      headerLabel = `${trans(
        locale,
        lang,
        values.familyRelationshipStatus
      )} ${indexChild}`;
    }

    return (
      <ListAccordion
        key={index}
        header={
          <View style={style.accordion.headerContainer}>
            {isSectionError ? (
              <Attention3 style={style.me8} width={20} height={20} />
            ) : null}
            <Text
              textStyle="semi"
              size={Size.text.body2.size}
              line={21}
              letterSpacing={0.5}
              color={
                isSectionError
                  ? Color.primary.light.primary90
                  : Color.neutral.light.neutral90
              }>
              {`${trans(locale, lang, 'dataDiri')} - ${headerLabel}`}
            </Text>
          </View>
        }
        suffixIcon={
          <ArrowDown
            stroke={
              isSectionError
                ? Color.primary.light.primary90
                : Color.grayIcon.light.grayIcon
            }
          />
        }
        style={style.accordion.container}
        headerContainerStyle={[
          style.accordion.header,
          isSectionError
            ? { borderBottomColor: Color.primary.light.primary90 }
            : { borderBottomColor: Color.grayBorder.light.grayBorder },
        ]}>
        <View style={style.accordion.content}>
          {renderFamilyRelationshipStatusInput(
            index,
            values.familyRelationshipStatus,
            messages.familyRelationshipStatus,
            configs.familyRelationshipStatus
          )}
          {renderFamilyCardNumberInput(values.familyRelationshipStatus)}
          {renderIdCardNumberInput(
            index,
            values.idCardNumber,
            messages.idCardNumber,
            configs.idCardNumber
          )}
          {renderNameInput(index, values.name, messages.name, configs.name)}
          {renderGenderInput(
            index,
            values.gender,
            messages.gender,
            configs.gender
          )}
          {renderPobInput(index, values.pob, messages.pob, configs.pob)}
          {renderDobInput(index, values.dob, messages.dob, configs.dob)}
          {renderOccupationInput(
            index,
            values.occupation,
            messages.occupation,
            configs.occupation
          )}
          {renderMaritalStatusInput(
            index,
            values.maritalStatus,
            messages.maritalStatus,
            configs.maritalStatus
          )}
          {renderDeleteButton(index)}
        </View>
      </ListAccordion>
    );
  }
  function renderDeleteButton(index) {
    return (
      <View style={style.accordion.deleteButton.container}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            setDeleteConfirmationModal({
              isShow: true,
              activeIndex: index,
              config: [],
            });
          }}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#FF344C', '#E51931', '#CA0A21']}
            style={style.accordion.deleteButton.deleteButton}>
            <Text
              textStyle="semi"
              size={Size.text.body2.size}
              letterSpacing={0.5}
              color={Color.main.light.white}>
              {trans(locale, lang, 'hapusData')}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
  function renderFamilyRelationshipStatusInput(index, value, message, config) {
    const inputKey = KEYS.familyRelationshipStatus;
    const openDropdown = () => {
      setFamilyRelationshipStatusDropdown({
        isShow: true,
        activeIndex: index,
        config: config,
      });
    };
    return (
      <View style={style.mb16}>
        <Input
          height={56}
          value={trans(locale, lang, value)}
          keyboardType="number-pad"
          secondLabel={requiredLabel}
          label={trans(locale, lang, inputKey)}
          placeholder={trans(locale, lang, inputKey)}
          pressable
          editable={false}
          suffixIcon={<ArrowDownGray />}
          onInputPress={openDropdown}
          handleSuffixIcon={openDropdown}
          message={message}
        />
      </View>
    );
  }
  function renderFamilyCardNumberInput(value) {
    const inputKey = KEYS.familyCardNumber;
    if (!matchTypoTolerance(value, CONSTANT.KEPALA_KELUARGA)) {
      return null;
    }
    return (
      <View style={style.mb16}>
        <Input
          height={56}
          secondLabel={requiredLabel}
          keyboardType="number-pad"
          value={familyCardNumberInput}
          label={trans(locale, lang, KEYS.familyCardNumber)}
          placeholder={trans(locale, lang, KEYS.familyCardNumber)}
          onChangeText={(text) => {
            setFamilyCardNumberInput(text);
            setFamilyCardNumberMessage(
              validateInput(inputKey, text, familyCardNumberInitialConfig)
            );
          }}
          message={familyCardNumberMessage}
        />
      </View>
    );
  }
  function renderIdCardNumberInput(index, value, message, config) {
    const inputKey = KEYS.idCardNumber;
    return (
      <View style={style.mb16}>
        <Input
          height={56}
          secondLabel={requiredLabel}
          keyboardType="number-pad"
          value={value}
          label={trans(locale, lang, inputKey)}
          placeholder={trans(locale, lang, inputKey)}
          onChangeText={(text) => {
            updateFamilyMembersInputState(index, inputKey, text, config);
          }}
          message={message}
        />
      </View>
    );
  }
  function renderNameInput(index, value, message, config) {
    const inputKey = KEYS.name;
    return (
      <View style={style.mb16}>
        <Input
          height={56}
          secondLabel={requiredLabel}
          keyboardType="default"
          value={value}
          label={trans(locale, lang, inputKey)}
          placeholder={trans(locale, lang, inputKey)}
          onChangeText={(text) => {
            updateFamilyMembersInputState(index, inputKey, text, config);
          }}
          message={message}
        />
      </View>
    );
  }
  function renderGenderInput(index, value, message, config) {
    const inputKey = KEYS.gender;
    let errorType = [];
    let errorColor = Color.primary.light.primary90;
    if (message) {
      errorType = Object.keys(message);
      if (errorType[0] === 'success') {
        errorColor = Color.success.light.success90;
      }
      if (errorType[0] === 'warning') {
        errorColor = Color.warning.light.warning90;
      }
      if (errorType[0] === 'error') {
        errorColor = Color.primary.light.primary90;
      }
    }
    return (
      <View style={style.mb16}>
        <View style={[style.flexDirectionRow, style.mb4]}>
          <Text
            size={Size.text.caption1.size}
            textStyle="semi"
            line={18}
            letterSpacing={0.5}
            color={Color.mediumGray.light.mediumGray}>
            {trans(locale, lang, inputKey)}{' '}
          </Text>
          {requiredLabel}
        </View>
        <View style={style.radioButton.radioButtonInputContainer}>
          <RadioButton
            desc={trans(locale, lang, 'lakiLaki')}
            currValue={
              matchTypoTolerance(value?.toString() || '', CONSTANT.LAKI_LAKI)
                ? 'M'
                : ''
            }
            optValue="M"
            onPress={() => {
              updateFamilyMembersInputState(
                index,
                inputKey,
                CONSTANT.LAKI_LAKI,
                config
              );
            }}
            errorType={errorType[0]}
          />
          <RadioButton
            desc={trans(locale, lang, 'perempuan')}
            currValue={
              matchTypoTolerance(value?.toString() || '', CONSTANT.PEREMPUAN)
                ? 'F'
                : ''
            }
            optValue="F"
            onPress={() => {
              updateFamilyMembersInputState(
                index,
                inputKey,
                CONSTANT.PEREMPUAN,
                config
              );
            }}
            errorType={errorType[0]}
          />
        </View>
        {errorType[0] ? (
          <Text
            size={Size.text.caption2.size}
            color={errorColor}
            textStyle="medium"
            line={16.5}
            style={style.mt6}>
            {message[errorType[0]]}
          </Text>
        ) : null}
      </View>
    );
  }
  function renderPobInput(index, value, message, config) {
    const inputKey = KEYS.pob;
    return (
      <View style={style.mb16}>
        <Input
          height={56}
          secondLabel={requiredLabel}
          keyboardType="default"
          value={value}
          label={trans(locale, lang, inputKey)}
          placeholder={trans(locale, lang, inputKey)}
          onChangeText={(text) => {
            updateFamilyMembersInputState(index, inputKey, text, config);
          }}
          message={message}
        />
      </View>
    );
  }
  const renderDobInput = useCallback(
    (index, value, message, config) => {
      const inputKey = KEYS.dob;
      const { isShow, activeIndex } = dateTimePickerDropdown;

      const dobValue = moment(
        value,
        RULES_CONFIG.FORMAT_DATE_INPUT,
        true
      ).isValid()
        ? moment(value, RULES_CONFIG.FORMAT_DATE_INPUT, true).format(
            RULES_CONFIG.FORMAT_DATE_OUTPUT
          )
        : '';
      const dobDefaultValue = moment(
        value,
        RULES_CONFIG.FORMAT_DATE_INPUT,
        true
      ).isValid()
        ? new Date(
            moment(value, RULES_CONFIG.FORMAT_DATE_INPUT, true).toISOString()
          )
        : new Date(
            moment(
              RULES_CONFIG.DEFAULT_DATE,
              RULES_CONFIG.FORMAT_DATE_INPUT,
              true
            ).toISOString()
          );

      const showDateTimePicker = () => {
        setDateTimePickerDropdown({
          isShow: true,
          activeIndex: index,
          config: config,
        });
      };
      const hideDateTimePicker = () => {
        setDateTimePickerDropdown({
          isShow: false,
          activeIndex: '',
          config: [],
        });
      };

      return (
        <View style={style.mb16}>
          <Input
            height={56}
            value={dobValue}
            editable={false}
            pressable
            defaultValue={dobValue}
            label={trans(locale, lang, inputKey)}
            secondLabel={requiredLabel}
            placeholder={trans(locale, lang, inputKey)}
            suffixIcon={<Calendar {...iconProps} />}
            handleSuffixIcon={() => showDateTimePicker()}
            onInputPress={() => showDateTimePicker()}
            message={message}
          />
          <View>
            {isShow && activeIndex === index ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={dobDefaultValue}
                maximumDate={new Date(yesterdayDate)}
                mode="date"
                display="spinner"
                is24Hour
                textColor={Color.primary.light.primary90}
                accentColor={Color.primary.light.primary90}
                onChange={(event, selectedDate) => {
                  hideDateTimePicker();
                  if (event.type === 'set') {
                    const tempDate = new Date(selectedDate);
                    updateFamilyMembersInputState(
                      index,
                      inputKey,
                      tempDate,
                      config
                    );
                  }
                }}
              />
            ) : null}
          </View>
        </View>
      );
    },
    [dateTimePickerDropdown, lang, updateFamilyMembersInputState, yesterdayDate]
  );
  function renderOccupationInput(index, value, message, config) {
    const inputKey = KEYS.occupation;
    return (
      <View style={style.mb16}>
        <Input
          height={56}
          secondLabel={requiredLabel}
          keyboardType="default"
          value={value}
          label={trans(locale, lang, inputKey)}
          placeholder={trans(locale, lang, inputKey)}
          onChangeText={(text) => {
            updateFamilyMembersInputState(index, inputKey, text, config);
          }}
          message={message}
        />
      </View>
    );
  }
  function renderMaritalStatusInput(index, value, message, config) {
    const inputKey = KEYS.maritalStatus;
    const openDropdown = () => {
      setMaritalStatusDropdown({
        isShow: true,
        activeIndex: index,
        config: config,
      });
    };
    return (
      <View style={style.mb16}>
        <Input
          height={56}
          value={trans(locale, lang, value)}
          keyboardType="number-pad"
          secondLabel={requiredLabel}
          label={trans(locale, lang, inputKey)}
          placeholder={trans(locale, lang, inputKey)}
          pressable
          editable={false}
          suffixIcon={<ArrowDownGray />}
          onInputPress={openDropdown}
          handleSuffixIcon={openDropdown}
          message={message}
        />
      </View>
    );
  }

  const renderFamilyRelationshipStatusDropdown = useCallback(() => {
    const inputKey = KEYS.familyRelationshipStatus;
    const { isShow, activeIndex, config } = familyRelationshipStatusDropdown;
    const { headOfFamily, wife, child } = totalFamily;

    const closeDropdown = () => {
      setFamilyRelationshipStatusDropdown({
        isShow: false,
        activeIndex: '',
        config: [],
      });
    };
    const addData = (value) => {
      addFamilyMembersInputState(value);
    };
    const updateData = (value) => {
      updateFamilyMembersInputState(activeIndex, inputKey, value, config);
    };

    const options = [
      {
        disabled: headOfFamily >= RULES_CONFIG.MAX_HEAD_OF_FAMILY,
        label: trans(locale, lang, CONSTANT.KEPALA_KELUARGA),
        icon:
          headOfFamily >= RULES_CONFIG.MAX_HEAD_OF_FAMILY ? (
            <FatherGray style={style.dropDown.icon} />
          ) : (
            <Father style={style.dropDown.icon} />
          ),
        onPress: () => {
          if (activeIndex !== '') {
            updateData(CONSTANT.KEPALA_KELUARGA);
          } else {
            addData(CONSTANT.KEPALA_KELUARGA);
          }
          closeDropdown();
        },
      },
      {
        disabled: wife >= RULES_CONFIG.MAX_WIFE,
        label: trans(locale, lang, CONSTANT.ISTRI),
        icon:
          wife >= RULES_CONFIG.MAX_WIFE ? (
            <MotherGray style={style.dropDown.icon} />
          ) : (
            <Mother style={style.dropDown.icon} />
          ),
        onPress: () => {
          if (activeIndex !== '') {
            updateData(CONSTANT.ISTRI);
          } else {
            addData(CONSTANT.ISTRI);
          }
          closeDropdown();
        },
      },
      {
        // disabled: child >= RULES_CONFIG.MAX_CHILD,
        disabled: false,
        label: trans(locale, lang, CONSTANT.ANAK),
        // icon:
        //   child >= RULES_CONFIG.MAX_CHILD ? (
        //     <ChildGray style={style.dropDown.icon} />
        //   ) : (
        //     <Child style={style.dropDown.icon} />
        //   ),
        icon: <Child style={style.dropDown.icon} />,
        onPress: () => {
          if (activeIndex !== '') {
            updateData(CONSTANT.ANAK);
          } else {
            addData(CONSTANT.ANAK);
          }
          closeDropdown();
        },
      },
    ];
    return (
      <BottomSheet
        isVisible={isShow}
        leftTitle={false}
        swipeable={false}
        isPadder={false}
        title={trans(locale, lang, inputKey)}
        onClosePress={closeDropdown}
        onRequestClose={closeDropdown}>
        <View style={style.dropDown.container}>
          {options.map(({ disabled, label, icon, onPress }) => (
            <TouchableOpacity disabled={disabled} key={label} onPress={onPress}>
              <View style={style.dropDown.item}>
                {icon}
                <Text
                  textStyle="semi"
                  size={Size.text.body2.size}
                  line={20}
                  letterSpacing={0.5}
                  color={
                    disabled
                      ? Color.grayTextDisabled.light.grayTextDisabled
                      : Color.neutral.light.neutral90
                  }>
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheet>
    );
  }, [
    addFamilyMembersInputState,
    familyRelationshipStatusDropdown,
    lang,
    totalFamily,
    updateFamilyMembersInputState,
  ]);
  const renderMaritalStatusDropdown = useCallback(() => {
    const inputKey = KEYS.maritalStatus;
    const { isShow, activeIndex, config } = maritalStatusDropdown;

    const closeDropdown = () => {
      setMaritalStatusDropdown({
        isShow: false,
        activeIndex: '',
        config: [],
      });
    };

    const options = [
      {
        label: trans(locale, lang, MARITAL_STATUS.BELUM_KAWIN),
        onPress: () => {
          updateFamilyMembersInputState(
            activeIndex,
            inputKey,
            MARITAL_STATUS.BELUM_KAWIN,
            config
          );
          closeDropdown();
        },
      },
      {
        label: trans(locale, lang, MARITAL_STATUS.KAWIN),
        onPress: () => {
          updateFamilyMembersInputState(
            activeIndex,
            inputKey,
            MARITAL_STATUS.KAWIN,
            config
          );
          closeDropdown();
        },
      },
      {
        label: trans(locale, lang, MARITAL_STATUS.CERAI_HIDUP),
        onPress: () => {
          updateFamilyMembersInputState(
            activeIndex,
            inputKey,
            MARITAL_STATUS.CERAI_HIDUP,
            config
          );
          closeDropdown();
        },
      },
      {
        label: trans(locale, lang, MARITAL_STATUS.CERAI_MATI),
        onPress: () => {
          updateFamilyMembersInputState(
            activeIndex,
            inputKey,
            MARITAL_STATUS.CERAI_MATI,
            config
          );
          closeDropdown();
        },
      },
    ];
    return (
      <BottomSheet
        isVisible={isShow}
        leftTitle={false}
        swipeable={false}
        isPadder={false}
        title={trans(locale, lang, inputKey)}
        onClosePress={closeDropdown}
        onRequestClose={closeDropdown}>
        <View style={style.dropDown.container}>
          {options.map(({ label, onPress }) => (
            <TouchableOpacity key={label} onPress={onPress}>
              <View style={style.dropDown.item}>
                <Text
                  textStyle="semi"
                  size={Size.text.body2.size}
                  line={20}
                  letterSpacing={0.5}>
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheet>
    );
  }, [lang, maritalStatusDropdown, updateFamilyMembersInputState]);
  const renderDeleteConfirmationModal = useCallback(() => {
    const { isShow, activeIndex } = deleteConfirmationModal;
    const hideModal = () => {
      setDeleteConfirmationModal({
        isShow: false,
        activeIndex: '',
        config: [],
      });
    };
    const deleteData = () => {
      deleteFamilyMembersInputState(activeIndex);
      hideModal();
    };
    return (
      <BottomSheet
        isVisible={isShow}
        swipeable={false}
        onClosePress={hideModal}
        onRequestClose={hideModal}>
        <View style={style.modal.deleteConfirmation.container}>
          <Image
            source={TrashBin}
            style={style.modal.deleteConfirmation.image}
          />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={27}
            letterSpacing={0.5}
            align="center"
            style={style.modal.deleteConfirmation.text}>
            {trans(locale, lang, 'apakahKamuYakin')}
          </Text>
        </View>
        <Button
          outline
          style={style.modal.deleteConfirmation.button}
          onPress={hideModal}>
          {trans(locale, lang, 'kembali')}
        </Button>
        <Button type="linear-gradient" onPress={deleteData}>
          {trans(locale, lang, 'hapus')}
        </Button>
      </BottomSheet>
    );
  }, [deleteConfirmationModal, deleteFamilyMembersInputState, lang]);

  function renderRightHeaderContent() {
    return (
      <TouchableOpacity
        style={style.me16}
        onPress={() => {
          navigation.navigate(NAVIGATION.PROFILE.ProfileHelpCenter);
        }}>
        <Headset2
          fill={isDark ? Color.main.light.black : Color.main.light.white}
        />
      </TouchableOpacity>
    );
  }
  function renderFooterContainer() {
    const addData = () => {
      setFamilyRelationshipStatusDropdown({
        isShow: true,
        activeIndex: '',
        config: [],
      });
    };
    const submitData = () => {
      setIsSubmit(true);
      setLoading(true);
      const { category, certificateNo, policyNo, source } = params;
      setUpdataCheckKKKTP({
        category,
        certificateNo,
        policyNo,
        source,
        ...mappingPayload('checkKKAndKTP'),
      });
      setUpdataTempState({
        verifyPengkinianPayload: {
          ...mappingPayload('verifyPengkinian'),
        },
      });
    };
    return (
      <Padder style={style.footer.container}>
        <Button outline style={style.footer.button} onPress={addData}>
          {trans(locale, lang, 'plusPenerimaManfaat')}
        </Button>
        <Button disabled={isFormInvalid() || isSubmit} onPress={submitData}>
          {trans(locale, lang, 'lanjut')}
        </Button>
      </Padder>
    );
  }

  function renderInvalidNIKModal() {
    const onBackPress = () => setIsInvalidNIKModal(false);
    return (
      <BottomSheet
        isVisible={isInvalidNIKModal}
        swipeable={false}
        onClosePress={onBackPress}
        onRequestClose={onBackPress}>
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
  const renderResponseModal = useCallback(() => {
    let icon = KKVerifikasi;
    let title = 'kamiTidakMenemukan';
    let subtitle = 'dataKartuKeluarga';
    // if (
    //   setUpdataCheckKKKTPResponse?.data?.isChanged &&
    //   setUpdataCheckKKKTPResponse?.data?.isFamilyMembersChanged &&
    //   setUpdataCheckKKKTPResponse?.data?.familyMembersChangedType === 'kurang'
    // ) {
    //   // Kurang
    //   icon = KKEdit;
    //   title = 'kamiMenemukanPerubahan';
    //   subtitle = 'dataLamaPada';
    // }
    // if (
    //   setUpdataCheckKKKTPResponse?.data?.isChanged &&
    //   setUpdataCheckKKKTPResponse?.data?.isFamilyMembersChanged &&
    //   setUpdataCheckKKKTPResponse?.data?.familyMembersChangedType === 'tambah'
    // ) {
    //   // Tambah
    //   icon = KKVerifikasi;
    //   title = 'kamiMenemukanPerubahan';
    //   subtitle = 'dataBaruPada';
    // }
    // if (
    //   setUpdataCheckKKKTPResponse?.data?.isChanged &&
    //   !setUpdataCheckKKKTPResponse?.data?.isFamilyMembersChanged &&
    //   setUpdataCheckKKKTPResponse?.data?.familyMembersChangedType === ''
    // ) {
    //   // Change
    //   icon = KKVerifikasi;
    //   title = 'kamiMenemukanPerubahan';
    //   subtitle = 'dataKamuAkan';
    // }
    // if (
    //   !setUpdataCheckKKKTPResponse?.data?.isChanged &&
    //   !setUpdataCheckKKKTPResponse?.data?.isFamilyMembersChanged &&
    //   setUpdataCheckKKKTPResponse?.data?.familyMembersChangedType === ''
    // ) {
    //   // No Change
    //   icon = KKVerifikasi;
    //   title = 'kamiTidakMenemukan';
    //   subtitle = 'dataKartuKeluarga';
    // }

    if (setUpdataCheckKKKTPResponse?.data?.isChanged) {
      // Changed
      icon = KKEdit;
      title = 'kamiMenemukanPerubahan';
      subtitle = 'dataKamuAkan';
    } else {
      // No Change
      icon = KKVerifikasi;
      title = 'kamiTidakMenemukan';
      subtitle = 'dataKartuKeluarga';
    }

    const reviewRow = (row) => {
      return (
        <View style={style.modal.noChange.reviewRow.row}>
          <RedTick style={style.me4} />
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            letterSpacing={0.5}>
            {row}
          </Text>
        </View>
      );
    };

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
          <View style={style.modal.noChange.reviewRow.container}>
            {totalFamily.headOfFamily > 0 &&
              reviewRow(trans(locale, lang, CONSTANT.KEPALA_KELUARGA))}
            {totalFamily.wife > 0 &&
              reviewRow(trans(locale, lang, CONSTANT.ISTRI))}
            {totalFamily.child > 0 &&
              Array(totalFamily.child)
                .fill(CONSTANT.ANAK)
                .map((item, index) => {
                  const text =
                    lang === 'id'
                      ? `${trans(
                          locale,
                          lang,
                          item
                        )} ${formatCapitalizeEachWord(
                          formatOrdinal(Number(index) + 1, lang)
                        )}`
                      : `${formatCapitalizeEachWord(
                          formatOrdinal(Number(index) + 1, lang)
                        )} ${trans(locale, lang, 'anak')}`;
                  return reviewRow(text);
                })}
          </View>
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
    setUpdataCheckKKKTPResponse?.data?.isChanged,
    totalFamily.child,
    totalFamily.headOfFamily,
    totalFamily.wife,
  ]);

  return (
    <Base15
      isScroll
      animated
      rightHeaderContent={renderRightHeaderContent()}
      onBackPress={() => navigation.pop()}
      onChangeHeaderToDark={(value) => {
        setIsDark(value);
      }}
      title={trans(locale, lang, 'pengkinianData')}
      backgroundColor={Color.whiteBackground.light.whiteBackground}
      renderBottom={renderFooterContainer()}>
      <Padder style={style.container}>
        {renderStepsContainer()}
        {renderContentContainer()}
        {renderResponseModal()}
        {renderInvalidNIKModal()}
        {renderFamilyRelationshipStatusDropdown()}
        {renderMaritalStatusDropdown()}
        {renderDeleteConfirmationModal()}
      </Padder>
    </Base15>
  );
}

export default UpdataReview;

UpdataReview.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  isKKSame: PropTypes.bool.isRequired,
  isKTPSame: PropTypes.bool.isRequired,
  updataAction: PropTypes.string.isRequired,

  setUpdataKTPResponse: PropTypes.objectOf(Object).isRequired,
  setUpdataKKResponse: PropTypes.objectOf(Object).isRequired,

  getUpdataLastKTPInfo: PropTypes.func.isRequired,
  getUpdataLastKTPInfoClear: PropTypes.func.isRequired,
  getUpdataLastKTPInfoFailed: PropTypes.objectOf(Object).isRequired,
  getUpdataLastKTPInfoResponse: PropTypes.objectOf(Object).isRequired,

  getUpdataLastKKInfo: PropTypes.func.isRequired,
  getUpdataLastKKInfoClear: PropTypes.func.isRequired,
  getUpdataLastKKInfoFailed: PropTypes.objectOf(Object).isRequired,
  getUpdataLastKKInfoResponse: PropTypes.objectOf(Object).isRequired,

  setUpdataCheckKKKTP: PropTypes.func.isRequired,
  setUpdataCheckKKKTPClear: PropTypes.func.isRequired,
  setUpdataCheckKKKTPFailed: PropTypes.objectOf(Object).isRequired,
  setUpdataCheckKKKTPResponse: PropTypes.objectOf(Object).isRequired,

  setLoading: PropTypes.func.isRequired,
  setUpdataTempState: PropTypes.func.isRequired,
  setToastMsg: PropTypes.func.isRequired,

  route: PropTypes.objectOf(Object).isRequired,
};
